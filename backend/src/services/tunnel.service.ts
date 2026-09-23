import { spawn, execSync, ChildProcess } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { env } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TunnelStatus {
  isRunning: boolean;
  publicUrl: string | null;
  staticDomain: string;
  localPort: number;
}

let activeTunnelProcess: ChildProcess | null = null;
let activeTunnelUrl: string | null = null;

function findServerUrlTxt(): string | null {
  const candidates = [
    path.resolve(process.cwd(), "server_url.txt"),
    path.resolve(process.cwd(), "..", "server_url.txt"),
    path.resolve(__dirname, "..", "..", "server_url.txt"),
    path.resolve(__dirname, "..", "..", "..", "server_url.txt"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

export function readLiveServerUrl(): string | null {
  try {
    const file = findServerUrlTxt();
    if (file && fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf8");
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
          return trimmed.replace(/\/+$/, "");
        }
      }
    }
  } catch {}
  return null;
}

export function writeLiveServerUrl(url: string): void {
  try {
    const file = findServerUrlTxt() || path.resolve(process.cwd(), "server_url.txt");
    fs.writeFileSync(file, `# Cloudflare Live URL\n${url}\n`, "utf8");
  } catch {}
}

export function isCloudflaredProcessRunning(): boolean {
  if (activeTunnelProcess && activeTunnelProcess.exitCode === null) {
    return true;
  }
  try {
    const stdout = execSync('tasklist /FI "IMAGENAME eq cloudflared.exe" /NH', { encoding: "utf8" });
    return stdout.toLowerCase().includes("cloudflared.exe");
  } catch {
    return false;
  }
}

export function findCloudflaredPath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), "cloudflared.exe"),
    path.resolve(process.cwd(), "..", "cloudflared.exe"),
    path.resolve(__dirname, "..", "..", "cloudflared.exe"),
    path.resolve(__dirname, "..", "..", "..", "cloudflared.exe"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

/**
 * Check active status of Cloudflare Tunnel
 */
export async function getTunnelStatus(): Promise<TunnelStatus> {
  const port = Number(env.PORT) || 3001;

  // Cloud deployment environment (Render, etc.)
  if (process.env.RENDER_EXTERNAL_URL) {
    return {
      isRunning: true,
      publicUrl: process.env.RENDER_EXTERNAL_URL.replace(/\/+$/, ""),
      staticDomain: "onrender.com",
      localPort: port,
    };
  }

  const isRunning = isCloudflaredProcessRunning();
  const liveUrl = activeTunnelUrl || readLiveServerUrl();

  if (isRunning && liveUrl) {
    return {
      isRunning: true,
      publicUrl: liveUrl,
      staticDomain: "trycloudflare.com",
      localPort: port,
    };
  }

  return {
    isRunning,
    publicUrl: isRunning ? liveUrl : null,
    staticDomain: "trycloudflare.com",
    localPort: port,
  };
}

/**
 * Launches Cloudflare Tunnel if not already running, and returns the live public URL
 */
export async function startTunnel(): Promise<{ success: boolean; isRunning: boolean; publicUrl: string; message: string }> {
  const status = await getTunnelStatus();
  if (status.isRunning && status.publicUrl) {
    return {
      success: true,
      isRunning: true,
      publicUrl: status.publicUrl,
      message: "Server online Cloudflare sudah aktif!",
    };
  }

  const cloudflaredPath = findCloudflaredPath();
  if (!cloudflaredPath) {
    throw new Error("File cloudflared.exe tidak ditemukan di folder game.");
  }

  const port = String(env.PORT || 3001);

  return new Promise((resolve, reject) => {
    let settled = false;

    try {
      activeTunnelProcess = spawn(
        cloudflaredPath,
        ["tunnel", "--url", `http://localhost:${port}`, "--no-autoupdate"],
        { stdio: ["ignore", "pipe", "pipe"] }
      );
    } catch (err: any) {
      return reject(new Error(`Gagal menjalankan cloudflared: ${err.message}`));
    }

    const parseOutput = (chunk: Buffer | string) => {
      const text = chunk.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match && !settled) {
        settled = true;
        activeTunnelUrl = match[0];
        writeLiveServerUrl(activeTunnelUrl);
        return resolve({
          success: true,
          isRunning: true,
          publicUrl: activeTunnelUrl,
          message: "Server online Cloudflare berhasil diaktifkan!",
        });
      }
    };

    activeTunnelProcess.stdout?.on("data", parseOutput);
    activeTunnelProcess.stderr?.on("data", parseOutput);

    activeTunnelProcess.on("exit", (code) => {
      activeTunnelProcess = null;
      if (!settled) {
        settled = true;
        reject(new Error(`Cloudflare Tunnel terhenti dengan kode: ${code}`));
      }
    });

    // Timeout setelah 20 detik jika URL belum didapat
    setTimeout(() => {
      if (!settled) {
        settled = true;
        const live = readLiveServerUrl();
        if (live) {
          return resolve({
            success: true,
            isRunning: true,
            publicUrl: live,
            message: "Server online Cloudflare sedang aktif.",
          });
        }
        reject(new Error("Timeout menunggu Cloudflare Tunnel merespons URL publik"));
      }
    }, 20000);
  });
}

/**
 * Stops any running cloudflared processes
 */
export function stopTunnel(): { success: boolean; message: string } {
  try {
    if (activeTunnelProcess) {
      try { activeTunnelProcess.kill(); } catch {}
      activeTunnelProcess = null;
    }
    execSync("taskkill /F /IM cloudflared.exe", { stdio: "ignore" });
    activeTunnelUrl = null;
    return { success: true, message: "Koneksi internet Cloudflare berhasil dihentikan." };
  } catch {
    return { success: true, message: "Tidak ada proses Cloudflare yang berjalan." };
  }
}
