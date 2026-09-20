import { spawn, execSync } from "child_process";
import path from "path";
import fs from "fs";
import http from "http";
import { fileURLToPath } from "url";
import { env } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const STATIC_DOMAIN = "scooter-thickness-stony.ngrok-free.dev";
export const PUBLIC_URL = `https://${STATIC_DOMAIN}`;

export interface TunnelStatus {
  isRunning: boolean;
  publicUrl: string | null;
  staticDomain: string;
  localPort: number;
}

/**
 * Locate ngrok executable in project root or current working directory
 */
export function findNgrokPath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), "..", "ngrok.exe"),
    path.resolve(process.cwd(), "ngrok.exe"),
    path.resolve(__dirname, "..", "..", "ngrok.exe"),
    path.resolve(__dirname, "..", "..", "..", "ngrok.exe"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

/**
 * Queries local ngrok client web inspection API on port 4040
 */
export async function getTunnelStatus(): Promise<TunnelStatus> {
  const port = Number(env.PORT) || 3001;
  return new Promise((resolve) => {
    const req = http.get("http://127.0.0.1:4040/api/tunnels", (res) => {
      if (res.statusCode === 200) {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            const tunnels = data.tunnels || [];
            if (tunnels.length > 0) {
              const httpsTunnel = tunnels.find((t: any) => t.public_url?.startsWith("https")) || tunnels[0];
              return resolve({
                isRunning: true,
                publicUrl: httpsTunnel.public_url || PUBLIC_URL,
                staticDomain: STATIC_DOMAIN,
                localPort: port,
              });
            }
          } catch {}
          resolve({
            isRunning: true,
            publicUrl: PUBLIC_URL,
            staticDomain: STATIC_DOMAIN,
            localPort: port,
          });
        });
      } else {
        resolve({
          isRunning: false,
          publicUrl: null,
          staticDomain: STATIC_DOMAIN,
          localPort: port,
        });
      }
    });

    req.on("error", () => {
      resolve({
        isRunning: false,
        publicUrl: null,
        staticDomain: STATIC_DOMAIN,
        localPort: port,
      });
    });

    req.setTimeout(800, () => {
      req.destroy();
      resolve({
        isRunning: false,
        publicUrl: null,
        staticDomain: STATIC_DOMAIN,
        localPort: port,
      });
    });
  });
}

/**
 * Launches Ngrok if not already running, and waits for it to become ready
 */
export async function startTunnel(): Promise<{ success: boolean; isRunning: boolean; publicUrl: string; message: string }> {
  // 1. Check if already running
  const status = await getTunnelStatus();
  if (status.isRunning) {
    return {
      success: true,
      isRunning: true,
      publicUrl: status.publicUrl || PUBLIC_URL,
      message: "Server online Ngrok sudah aktif!",
    };
  }

  // 2. Find ngrok.exe
  const ngrokPath = findNgrokPath();
  if (!ngrokPath) {
    throw new Error("File ngrok.exe tidak ditemukan di folder project.");
  }

  const port = String(env.PORT || 3001);

  // 3. Spawn detached ngrok process
  try {
    const child = spawn(
      ngrokPath,
      ["http", port, "--url", STATIC_DOMAIN, "--log", "stdout", "--log-format", "json"],
      {
        detached: true,
        stdio: "ignore",
      }
    );
    child.unref();
  } catch (err: any) {
    throw new Error(`Gagal menjalankan ngrok: ${err.message}`);
  }

  // 4. Poll until ngrok API responds (up to 7 seconds)
  const maxAttempts = 15;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const currentStatus = await getTunnelStatus();
    if (currentStatus.isRunning) {
      return {
        success: true,
        isRunning: true,
        publicUrl: currentStatus.publicUrl || PUBLIC_URL,
        message: "Server online Ngrok berhasil diaktifkan!",
      };
    }
  }

  // If timeout occurred, still assume it's starting up with the configured static domain
  return {
    success: true,
    isRunning: true,
    publicUrl: PUBLIC_URL,
    message: "Server online Ngrok sedang dihubungkan ke domain tetap.",
  };
}

/**
 * Stops any running ngrok processes
 */
export function stopTunnel(): { success: boolean; message: string } {
  try {
    execSync("taskkill /F /IM ngrok.exe", { stdio: "ignore" });
    return { success: true, message: "Koneksi internet (Ngrok) berhasil dihentikan." };
  } catch {
    return { success: true, message: "Tidak ada proses Ngrok yang berjalan." };
  }
}
