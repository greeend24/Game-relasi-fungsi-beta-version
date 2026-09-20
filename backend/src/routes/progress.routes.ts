import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  getUserFullProgress,
  updateStageProgress,
  updateEndlessHighScore,
  resetProgress,
  unlockAllWithCheat,
  initializeUserProgress,
  syncOfflineUserData,
} from "../services/progress.service.js";
import { recordStudentActivity } from "../services/admin.service.js";
import { env } from "../config/env.js";

import { db } from "../db/index.js";
import { user, userStats } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * POST /api/progress/heartbeat
 * Real-time active status ping from student game client.
 */
router.post("/heartbeat", (req: Request, res: Response) => {
  const { username, userId } = req.body || {};
  const identifier = username || userId || (req as any).user?.username || (req as any).user?.id;
  if (identifier) {
    recordStudentActivity(identifier);
  }
  res.json({ success: true, timestamp: Date.now() });
});

/**
 * POST /api/progress/sync-offline
 * Sync complete offline user progress (account, stages, quest exams, total score, play time).
 * Does not require prior session auth (can sync newly created offline users).
 */
router.post("/sync-offline", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload) {
      res.status(400).json({ success: false, error: "Empty sync payload" });
      return;
    }

    const usersToSync = Array.isArray(payload) ? payload : [payload];
    const results = [];

    for (const uData of usersToSync) {
      if (uData && uData.username) {
        const result = await syncOfflineUserData(uData);
        results.push(result);
      }
    }

    res.json({
      success: true,
      message: `Berhasil menyinkronkan ${results.length} data pengguna ke server.`,
      results,
    });
  } catch (error: any) {
    console.error("[progress.routes] POST /sync-offline error:", error);
    res.status(500).json({ success: false, error: error.message || "Gagal menyinkronkan data offline" });
  }
});

/**
 * POST /api/progress/playtime
 * Track played seconds for admin view.
 * Accepts session auth OR { username / userId, seconds } for offline/resumed sessions.
 */
router.post("/playtime", async (req: Request, res: Response) => {
  try {
    const { seconds, username, userId: rawUserId } = req.body || {};
    const secToAdd = Math.max(1, Math.min(300, Number(seconds) || 0));

    let targetUserId = (req as any).user?.id || rawUserId;

    if (!targetUserId && username) {
      const [foundUser] = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.username, String(username).trim()))
        .limit(1);
      if (foundUser) targetUserId = foundUser.id;
    }

    if (!targetUserId) {
      res.status(400).json({ success: false, error: "User not identified" });
      return;
    }

    const [stats] = await db.select().from(userStats).where(eq(userStats.id, targetUserId)).limit(1);
    const newTotal = (stats?.totalPlayTimeSeconds || 0) + secToAdd;

    await db.update(userStats).set({ totalPlayTimeSeconds: newTotal }).where(eq(userStats.id, targetUserId));
    await db.update(user).set({ totalPlayTimeSeconds: newTotal }).where(eq(user.id, targetUserId));

    res.json({ success: true, totalPlayTimeSeconds: newTotal });
  } catch (error) {
    console.error("[progress.routes] POST /playtime error:", error);
    res.status(500).json({ success: false, error: "Failed to update play time" });
  }
});

// All subsequent progress routes require authentication
router.use(requireAuth);

/**
 * GET /api/progress
 * Fetch the current user's full progress profile.
 * Performs lazy initialization if this is the user's first load.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // Lazy init: ensure stats/progress/badge rows exist
    await initializeUserProgress(userId);

    const progress = await getUserFullProgress(userId);
    const [userRecord] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
    const uName = ((req.user as any).username || userRecord?.username || "").toLowerCase();
    const isUserAdmin = Boolean(userRecord?.isAdmin || uName === "fikran02" || req.user!.name?.toLowerCase() === "admin");
    const displayName = isUserAdmin ? (req.user!.name || "Admin") : req.user!.name;

    res.json({
      success: true,
      data: {
        ...progress,
        username: (req.user as any).username || userRecord?.username || req.user!.name,
        fullname: displayName,
        isAdmin: isUserAdmin || progress.isAdmin,
      },
    });
  } catch (error) {
    console.error("[progress.routes] GET / error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch progress" });
  }
});

/**
 * POST /api/progress/stage
 * Update a specific stage completion.
 * Body: { subbabId: number, stageNum: number, scoreEarned: number, starsEarned: number }
 */
router.post("/stage", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { subbabId, stageNum, scoreEarned, starsEarned } = req.body;

    // Validate input
    if (
      typeof subbabId !== "number" ||
      subbabId < 1 ||
      subbabId > 5 ||
      typeof stageNum !== "number" ||
      stageNum < 1 ||
      stageNum > 21 ||
      typeof scoreEarned !== "number" ||
      typeof starsEarned !== "number"
    ) {
      res.status(400).json({
        success: false,
        error:
          "Invalid input. Required: subbabId (1-5), stageNum (1-21), scoreEarned (number), starsEarned (number)",
      });
      return;
    }

    const result = await updateStageProgress(
      userId,
      subbabId,
      stageNum,
      scoreEarned,
      starsEarned
    );

    // Return updated progress
    const updatedProgress = await getUserFullProgress(userId);

    res.json({
      success: true,
      data: {
        ...updatedProgress,
        username: (req.user as any).username || req.user!.name,
        fullname: req.user!.name,
      },
      newBadges: result.newBadges,
    });
  } catch (error) {
    console.error("[progress.routes] POST /stage error:", error);
    res.status(500).json({ success: false, error: "Failed to update stage progress" });
  }
});

/**
 * POST /api/progress/endless
 * Update the endless mode high score.
 * Body: { score: number }
 */
router.post("/endless", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { score } = req.body;

    if (typeof score !== "number" || score < 0) {
      res.status(400).json({
        success: false,
        error: "Invalid input. Required: score (non-negative number)",
      });
      return;
    }

    const result = await updateEndlessHighScore(userId, score);

    res.json({
      success: true,
      data: {
        updated: result.updated,
        newBadges: result.newBadges,
      },
    });
  } catch (error) {
    console.error("[progress.routes] POST /endless error:", error);
    res.status(500).json({ success: false, error: "Failed to update endless high score" });
  }
});

/**
 * POST /api/progress/reset
 * Reset all progress (New Game).
 */
router.post("/reset", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    await resetProgress(userId);

    const freshProgress = await getUserFullProgress(userId);

    res.json({
      success: true,
      data: {
        ...freshProgress,
        username: (req.user as any).username || req.user!.name,
        fullname: req.user!.name,
      },
    });
  } catch (error) {
    console.error("[progress.routes] POST /reset error:", error);
    res.status(500).json({ success: false, error: "Failed to reset progress" });
  }
});

/**
 * POST /api/progress/cheat
 * Dev-only cheat code to unlock everything.
 * Body: { cheatCode: string }
 */
router.post("/cheat", async (req: Request, res: Response) => {
  try {
    if (env.NODE_ENV === "production") {
      res.status(403).json({ success: false, error: "Cheat codes disabled in production" });
      return;
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const { cheatCode } = req.body || {};
    const validCheat = process.env.CHEAT_CODE || "fikrangantengbeut123";
    if (!cheatCode || cheatCode !== validCheat) {
      res.status(400).json({ success: false, error: "Invalid cheat code" });
      return;
    }

    await unlockAllWithCheat(userId);
    const updatedProgress = await getUserFullProgress(userId);

    res.json({
      success: true,
      data: {
        ...updatedProgress,
        username: (req.user as any).username || req.user!.name,
        fullname: req.user!.name,
      },
    });
  } catch (error) {
    console.error("[progress.routes] POST /cheat error:", error);
    res.status(500).json({ success: false, error: "Failed to apply cheat code" });
  }
});

export default router;
