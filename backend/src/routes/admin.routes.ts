import { Router, Request, Response, NextFunction } from "express";
import {
  getAdminOverview,
  getAllStudentsData,
  generateStudentsCsv,
  deleteStudentById,
  resetAllStudentsData,
  setStudentAdminRole,
} from "../services/admin.service.js";
import { env } from "../config/env.js";
import { db } from "../db/index.js";
import { user, userStats, account } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { hashPassword } from "@better-auth/utils/password";
import { getTunnelStatus, startTunnel, stopTunnel } from "../services/tunnel.service.js";
import fs from "fs";
import path from "path";
import os from "os";

const router = Router();

/**
 * Get active IPv4 addresses of the host machine (e.g. Wi-Fi or LAN IP)
 */
export function getLocalIpAddresses(): string[] {
  const nets = os.networkInterfaces();
  const results: string[] = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        results.push(net.address);
      }
    }
  }
  return results;
}

/**
 * Otomatis sinkronkan perubahan database dari Dashboard Admin ke Game Electron AppData
 * agar perubahan (ganti password, hapus siswa, dll) langsung aktif di dist Electron tanpa manual copy!
 */
function mirrorToElectronAppData(): void {
  try {
    const appData = process.env.APPDATA;
    if (!appData) return;
    const electronDb = path.join(appData, "detektif-data-relasi-fungsi", "detektif_data.db");
    const candidateDbs = [
      path.join(process.cwd(), "detektif_data.db"),
      path.join(process.cwd(), "backend", "detektif_data.db"),
      "D:\\File Penting\\File S2\\Thesis Project\\Game-Relasi-Fungsi\\backend\\detektif_data.db",
    ];
    for (const srcDb of candidateDbs) {
      if (fs.existsSync(srcDb) && fs.existsSync(path.dirname(electronDb))) {
        if (path.resolve(srcDb).toLowerCase() !== path.resolve(electronDb).toLowerCase()) {
          fs.copyFileSync(srcDb, electronDb);
          console.log("[admin.routes] Auto-mirrored database changes to Electron AppData:", electronDb);
          break;
        }
      }
    }
  } catch (e: any) {
    console.warn("[admin.routes] Auto-mirror database notice:", e?.message);
  }
}

/**
 * Middleware to verify admin password via Header ('x-admin-key' or Authorization) or query param (?key=...)
 */
function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["x-admin-key"] || req.headers["authorization"];
  const queryKey = req.query.key as string;
  const provided = (authHeader ? String(authHeader).replace("Bearer ", "") : queryKey)?.trim();

  if (!provided || provided !== env.ADMIN_PASSWORD) {
    res.status(401).json({
      success: false,
      error: "Akses Ditolak: Password admin salah atau tidak disertakan!",
    });
    return;
  }
  next();
}

/**
 * POST /api/admin/login
 * Verify admin password.
 */
router.post("/login", (req: Request, res: Response) => {
  const { password } = req.body;
  if (password && password.trim() === env.ADMIN_PASSWORD) {
    res.json({ success: true, message: "Login admin berhasil!" });
  } else {
    res.status(401).json({ success: false, message: "Password admin salah!" });
  }
});

/**
 * GET /api/admin/tunnel/status
 * Check if ngrok is active and return public URL + local URL (publicly readable).
 */
router.get("/tunnel/status", async (_req: Request, res: Response) => {
  try {
    const status = await getTunnelStatus();
    const port = env.PORT || 3001;
    const allIps = getLocalIpAddresses();
    const lanIp = allIps.find((ip) => !ip.startsWith("169.254.")) || allIps[0] || "127.0.0.1";
    res.json({
      success: true,
      data: {
        ...status,
        localUrl: `http://localhost:${port}`,
        lanIp,
        lanUrl: `http://${lanIp}:${port}`,
        allLanIps: allIps,
      },
    });
  } catch (error) {
    console.error("[admin.routes] GET /tunnel/status error:", error);
    res.status(500).json({ success: false, error: "Gagal memeriksa status tunnel" });
  }
});

// All routes below require valid admin authentication
router.use(requireAdminAuth);

/**
 * GET /api/admin/overview
 * Overview stats for researcher dashboard.
 */
router.get("/overview", async (_req: Request, res: Response) => {
  try {
    const stats = await getAdminOverview();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("[admin.routes] GET /overview error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch admin overview" });
  }
});

/**
 * GET /api/admin/students
 * List of all students with chapter/stage progress, credentials, and play time.
 */
router.get("/students", async (_req: Request, res: Response) => {
  try {
    const students = await getAllStudentsData();
    res.json({ success: true, data: students });
  } catch (error) {
    console.error("[admin.routes] GET /students error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch student data" });
  }
});

/**
 * POST /api/admin/set-password
 * Allows researcher to set or reset a student's password directly from dashboard.
 * Body: { userId: string, newPassword: string }
 */
router.post("/set-password", async (req: Request, res: Response) => {
  try {
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword || String(newPassword).trim().length < 4) {
      res.status(400).json({ success: false, error: "Password minimal 4 karakter!" });
      return;
    }
    const cleanPass = String(newPassword).trim();

    // 1. Update user.plainPassword and userStats.plainPassword
    await db.update(user).set({ plainPassword: cleanPass }).where(eq(user.id, userId));
    await db.update(userStats).set({ plainPassword: cleanPass }).where(eq(userStats.id, userId));

    // 2. Hash and update account.password so student can immediately log in with new password
    try {
      const hashed = await hashPassword(cleanPass);
      await db.update(account).set({ password: hashed }).where(eq(account.userId, userId));
    } catch (e) {
      console.warn("[admin.routes] Hash password update fallback:", e);
    }

    // Auto-mirror perubahan ke database Game Electron AppData
    mirrorToElectronAppData();

    res.json({ success: true, message: "Password berhasil diperbarui!" });
  } catch (error) {
    console.error("[admin.routes] POST /set-password error:", error);
    res.status(500).json({ success: false, error: "Gagal mengubah password siswa" });
  }
});

/**
 * POST /api/admin/set-role
 * Set or toggle a student's admin role.
 * Body: { userId: string, isAdmin: boolean }
 */
router.post("/set-role", async (req: Request, res: Response) => {
  try {
    const { userId, isAdmin } = req.body;
    if (!userId || typeof isAdmin !== "boolean") {
      res.status(400).json({ success: false, error: "userId dan status isAdmin (boolean) diperlukan!" });
      return;
    }
    await setStudentAdminRole(userId, isAdmin);
    mirrorToElectronAppData();
    res.json({
      success: true,
      message: `Hak akses admin berhasil ${isAdmin ? "diberikan kepada" : "dicabut dari"} pengguna!`,
    });
  } catch (error) {
    console.error("[admin.routes] POST /set-role error:", error);
    res.status(500).json({ success: false, error: "Gagal memperbarui status admin pengguna" });
  }
});

/**
 * GET /api/admin/export-csv
 * Direct download of student scores formatted for Microsoft Excel & SPSS.
 */
router.get("/export-csv", async (_req: Request, res: Response) => {
  try {
    const csvContent = await generateStudentsCsv();
    const filename = `rekap_nilai_siswa_relasi_fungsi_${new Date().toISOString().split("T")[0]}.csv`;

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("[admin.routes] GET /export-csv error:", error);
    res.status(500).json({ success: false, error: "Failed to generate CSV export" });
  }
});

/**
 * DELETE /api/admin/students/:id
 * Delete a specific student and all related progress, scores, and badges.
 */
router.delete("/students/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    if (!id) {
      res.status(400).json({ success: false, error: "Student ID required" });
      return;
    }
    await deleteStudentById(id);
    mirrorToElectronAppData();
    res.json({ success: true, message: "Data siswa berhasil dihapus!" });
  } catch (error) {
    console.error("[admin.routes] DELETE /students/:id error:", error);
    res.status(500).json({ success: false, error: "Gagal menghapus data siswa" });
  }
});

/**
 * POST /api/admin/reset-all
 * Reset all student records (clean slate for new research trial).
 */
router.post("/reset-all", async (_req: Request, res: Response) => {
  try {
    await resetAllStudentsData();
    mirrorToElectronAppData();
    res.json({ success: true, message: "Seluruh data siswa berhasil dibersihkan!" });
  } catch (error) {
    console.error("[admin.routes] POST /reset-all error:", error);
    res.status(500).json({ success: false, error: "Gagal membersihkan data siswa" });
  }
});


/**
 * GET /api/admin/tunnel/status
 * Return current status of the online tunnel (Cloudflare) and local IP addresses
 */
router.get("/tunnel/status", async (_req: Request, res: Response) => {
  const port = env.PORT || 3001;
  const localUrl = `http://localhost:${port}`;
  const allIps = getLocalIpAddresses();
  const lanIp = allIps.find((ip) => !ip.startsWith("169.254.")) || allIps[0] || "127.0.0.1";
  const lanUrl = `http://${lanIp}:${port}`;

  const tunnel = await getTunnelStatus();
  res.json({
    success: true,
    data: {
      isRunning: tunnel.isRunning,
      publicUrl: tunnel.publicUrl,
      localUrl,
      lanIp,
      lanUrl,
      allLanIps: allIps,
      gameUrl: tunnel.publicUrl || lanUrl || localUrl,
    },
  });
});

/**
 * POST /api/admin/launch
 * One-click launch: ensures online Cloudflare tunnel is up and returns ready URLs for the game.
 */
router.post("/launch", async (_req: Request, res: Response) => {
  const port = env.PORT || 3001;
  const localUrl = `http://localhost:${port}`;
  const allIps = getLocalIpAddresses();
  const lanIp = allIps.find((ip) => !ip.startsWith("169.254.")) || allIps[0] || "127.0.0.1";
  const lanUrl = `http://${lanIp}:${port}`;
  try {
    const tunnelResult = await startTunnel();
    res.json({
      success: true,
      status: "online",
      isTunnelRunning: true,
      publicUrl: tunnelResult.publicUrl,
      localUrl,
      lanIp,
      lanUrl,
      allLanIps: allIps,
      gameUrl: tunnelResult.publicUrl || lanUrl || localUrl,
      message: tunnelResult.message,
    });
  } catch (error: any) {
    console.warn("[admin.routes] POST /launch tunnel fallback:", error.message);
    // Even if Ngrok fails (e.g. offline or no ngrok.exe), allow game to be used locally!
    res.json({
      success: true,
      status: "local_only",
      isTunnelRunning: false,
      publicUrl: null,
      localUrl,
      lanIp,
      lanUrl,
      allLanIps: allIps,
      gameUrl: lanUrl || localUrl,
      message: "Game siap dimainkan secara lokal. (Catatan koneksi internet: " + (error.message || "Offline") + ")",
    });
  }
});

/**
 * POST /api/admin/tunnel/stop
 * Stop the ngrok tunnel process.
 */
router.post("/tunnel/stop", (_req: Request, res: Response) => {
  try {
    const result = stopTunnel();
    res.json({ success: true, message: result.message });
  } catch (error) {
    console.error("[admin.routes] POST /tunnel/stop error:", error);
    res.status(500).json({ success: false, error: "Gagal menghentikan tunnel Ngrok" });
  }
});

export default router;

