import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

function getResolvedDistPath(): string | null {
  const candidateDistPaths = [
    process.env.ELECTRON_RESOURCES_PATH ? path.join(process.env.ELECTRON_RESOURCES_PATH, "frontend", "dist") : null,
    process.env.ELECTRON_RESOURCES_PATH ? path.join(process.env.ELECTRON_RESOURCES_PATH, "dist") : null,
    path.join(__dirname, "..", "..", "dist"),
    path.join(__dirname, "..", "..", "frontend", "dist"),
    path.join(process.cwd(), "dist"),
    path.join(process.cwd(), "frontend", "dist"),
  ].filter(Boolean) as string[];

  for (const p of candidateDistPaths) {
    if (p && fs.existsSync(path.join(p, "index.html"))) {
      return p;
    }
  }
  return null;
}

/**
 * GET /api/updates/manifest
 * Returns current build timestamp, index.html content, and list of JS/CSS bundle assets
 * so Electron clients on user laptops can automatically hot-sync updates without reinstalling.
 */
router.get("/manifest", (_req: Request, res: Response) => {
  try {
    const distPath = getResolvedDistPath();
    if (!distPath) {
      return res.status(404).json({ success: false, error: "Dist directory not found on server." });
    }

    const indexPath = path.join(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ success: false, error: "index.html not found on server." });
    }

    const indexStat = fs.statSync(indexPath);
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    // Scan assets directory (JS, CSS, chunk files)
    const assetsDir = path.join(distPath, "assets");
    let assetFiles: Array<{ path: string; size: number }> = [];

    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      assetFiles = files.map((name) => {
        const full = path.join(assetsDir, name);
        const stat = fs.statSync(full);
        return {
          path: `assets/${name}`,
          size: stat.size,
        };
      });
    }

    return res.json({
      success: true,
      appName: "detektif-data-relasi-fungsi",
      version: "1.0.0",
      buildTimestamp: Math.floor(indexStat.mtimeMs),
      indexHtml,
      assets: assetFiles,
    });
  } catch (err: any) {
    console.error("[update.routes] /manifest error:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

/**
 * GET /api/updates/status
 * Lightweight check for client connectivity & current build timestamp
 */
router.get("/status", (_req: Request, res: Response) => {
  try {
    const distPath = getResolvedDistPath();
    let buildTimestamp = 0;
    if (distPath) {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        buildTimestamp = Math.floor(fs.statSync(indexPath).mtimeMs);
      }
    }

    return res.json({
      success: true,
      status: "online",
      version: "1.0.0",
      buildTimestamp,
      serverTime: new Date().toISOString(),
    });
  } catch {
    return res.json({ success: true, status: "online", version: "1.0.0", buildTimestamp: 0 });
  }
});

export default router;
