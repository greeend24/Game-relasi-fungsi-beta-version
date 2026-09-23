import { db } from "../db/index.js";
import { user, userStats, userSubbabProgress, userBadges, questScores, account } from "../db/schema.js";
import { eq, and, sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// Badge Definitions (mirrors frontend BADGE_DEFINITIONS)
// ─────────────────────────────────────────────

const BADGE_DEFINITIONS = [
  { id: "badge1", reqStages: 1, reqScore: 0 },
  { id: "badge2", reqStages: 2, reqScore: 50 },
  { id: "badge3", reqStages: 3, reqScore: 100 },
  { id: "badge4", reqStages: 5, reqScore: 200 },
  { id: "badge5", reqStages: 7, reqScore: 350 },
  { id: "badge6", reqStages: 9, reqScore: 500 },
  { id: "badge7", reqStages: 11, reqScore: 700 },
  { id: "badge8", reqStages: 15, reqScore: 900 },
  { id: "badge9", reqStages: 18, reqScore: 1200 },
  { id: "badge10", reqStages: 18, reqScore: 2000 },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Parse stars from JSON text (SQLite stores as text) */
function parseStars(starsText: string | null): Record<string, number> {
  try {
    return JSON.parse(starsText || "{}") || {};
  } catch {
    return {};
  }
}

/** Generate a deterministic ID for subbab progress rows */
function subbabProgressId(userId: string, subbabId: number): string {
  return `${userId}_subbab${subbabId}`;
}

/** Generate a deterministic ID for badge rows */
function badgeId(userId: string, badge: string): string {
  return `${userId}_${badge}`;
}

/**
 * Count total completed stages across all subbabs for a user.
 * A completed stage is any key in the `stars` JSON string.
 */
async function getCompletedStagesCount(userId: string): Promise<number> {
  const rows = await db
    .select({ stars: userSubbabProgress.stars })
    .from(userSubbabProgress)
    .where(eq(userSubbabProgress.userId, userId));

  let count = 0;
  for (const row of rows) {
    const starsObj = parseStars(row.stars);
    count += Object.keys(starsObj).length;
  }
  return count;
}

/**
 * Evaluate which badges the user should have unlocked.
 * Inserts any newly qualifying badges.
 * Returns an array of newly unlocked badge IDs.
 */
async function evaluateAndGrantBadges(
  userId: string,
  completedStagesCount: number,
  totalScore: number
): Promise<string[]> {
  // Fetch currently owned badges
  const ownedRows = await db
    .select({ badgeId: userBadges.badgeId })
    .from(userBadges)
    .where(eq(userBadges.userId, userId));
  const ownedSet = new Set(ownedRows.map((r) => r.badgeId));

  const newlyUnlocked: string[] = [];

  for (const badge of BADGE_DEFINITIONS) {
    if (ownedSet.has(badge.id)) continue;

    const meetsStages = completedStagesCount >= badge.reqStages;
    const meetsScore = badge.reqScore > 0 && totalScore >= badge.reqScore;

    if (meetsStages || meetsScore) {
      await db.insert(userBadges).values({
        id: badgeId(userId, badge.id),
        userId,
        badgeId: badge.id,
        unlockedAt: new Date(),
      }).onConflictDoNothing();
      newlyUnlocked.push(badge.id);
    }
  }

  return newlyUnlocked;
}

// ─────────────────────────────────────────────
// Service Methods
// ─────────────────────────────────────────────

/**
 * Initialize default progress for a newly registered user.
 * Creates user_stats row and unlocks subbab 1.
 */
export async function initializeUserProgress(userId: string): Promise<void> {
  const now = new Date();

  // Create stats row
  await db.insert(userStats).values({
    id: userId,
    totalScore: 0,
    endlessHighScore: 0,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  // Create subbab 1 as unlocked
  await db
    .insert(userSubbabProgress)
    .values({
      id: subbabProgressId(userId, 1),
      userId,
      subbabId: 1,
      unlocked: true,
      currentStage: 1,
      stars: "{}",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing();

  // Grant badge1 (Detektif Pemula) by default
  await db
    .insert(userBadges)
    .values({
      id: badgeId(userId, "badge1"),
      userId,
      badgeId: "badge1",
      unlockedAt: now,
    })
    .onConflictDoNothing();
}

/**
 * Get the full user progress profile.
 * Returns stats, all subbab progress, and all badges.
 */
export async function getUserFullProgress(userId: string) {
  // Fetch stats
  const [stats] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.id, userId));

  // Fetch all subbab progress rows
  const progressRows = await db
    .select()
    .from(userSubbabProgress)
    .where(eq(userSubbabProgress.userId, userId));

  // Fetch user info to check admin status
  const [foundUser] = await db
    .select({ username: user.username, name: user.name, isAdmin: user.isAdmin })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);
  const isAdmin =
    Boolean(foundUser?.isAdmin) ||
    (foundUser?.username || "").toLowerCase() === "fikran02" ||
    (foundUser?.name || "").toLowerCase() === "admin";

  // Build the progress map matching frontend shape
  const progress: Record<
    string,
    { unlocked: boolean; currentStage: number; stars: Record<string, number> }
  > = {};

  // Initialize all 5 subbabs with defaults
  for (let i = 1; i <= 5; i++) {
    progress[`subbab${i}`] = {
      unlocked: isAdmin ? true : i === 1,
      currentStage: 1,
      stars: {},
    };
  }

  // Override with actual data
  for (const row of progressRows) {
    const key = `subbab${row.subbabId}`;
    progress[key] = {
      unlocked: isAdmin ? true : row.unlocked,
      currentStage: row.currentStage,
      stars: parseStars(row.stars),
    };
  }

  // Fetch badges
  const badgeRows = await db
    .select({ badgeId: userBadges.badgeId })
    .from(userBadges)
    .where(eq(userBadges.userId, userId));

  const unlockedBadges = badgeRows.map((r) => r.badgeId);

  // Fetch quest scores so quest progress syncs with the server
  const questRows = await db
    .select()
    .from(questScores)
    .where(eq(questScores.userId, userId));

  const questScoresMap: Record<number, any> = {};
  for (const q of questRows) {
    questScoresMap[q.subbabId] = {
      subbabId: q.subbabId,
      score: q.score,
      correctCount: q.correctCount,
      totalQuestions: q.totalQuestions,
      pointsEarned: q.pointsEarned,
      timeRemainingSeconds: q.timeRemainingSeconds,
      completedAt: q.completedAt,
    };
  }

  return {
    username: foundUser?.username,
    fullname: foundUser?.name,
    isAdmin,
    totalScore: stats?.totalScore ?? 0,
    endlessHighScore: stats?.endlessHighScore ?? 0,
    unlockedBadges,
    progress,
    questScores: questScoresMap,
  };
}

/**
 * Update progress after completing a stage.
 * Handles: star update (only if better), score increment,
 * current stage advancement, next subbab unlock, and badge evaluation.
 */
export async function updateStageProgress(
  userId: string,
  subbabId: number,
  stageNum: number,
  scoreEarned: number,
  starsEarned: number
): Promise<{ newBadges: string[] }> {
  const now = new Date();

  // Ensure user stats & initial rows exist
  await initializeUserProgress(userId);

  // Ensure subbab progress row exists
  await db
    .insert(userSubbabProgress)
    .values({
      id: subbabProgressId(userId, subbabId),
      userId,
      subbabId,
      unlocked: true,
      currentStage: 1,
      stars: "{}",
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing();

  // Fetch current progress for this subbab
  const [currentProgress] = await db
    .select()
    .from(userSubbabProgress)
    .where(
      and(
        eq(userSubbabProgress.userId, userId),
        eq(userSubbabProgress.subbabId, subbabId)
      )
    );

  if (!currentProgress) {
    throw new Error(`Progress row not found for user ${userId}, subbab ${subbabId}`);
  }

  const currentStars = parseStars(currentProgress.stars);
  const prevStars = currentStars[String(stageNum)] || 0;

  let scoreToAdd = 0;

  // Only update if new stars are better
  if (starsEarned > prevStars) {
    currentStars[String(stageNum)] = starsEarned;
    scoreToAdd = scoreEarned;
  }

  const CHAPTER_TOTAL_SEGS: Record<number, number> = {
    1: 3,
    2: 4,
    3: 4,
    4: 4,
    5: 3,
  };
  const maxStages = CHAPTER_TOTAL_SEGS[subbabId] || 4;

  // Advance currentStage
  let newCurrentStage = currentProgress.currentStage;
  if (stageNum >= currentProgress.currentStage && stageNum < maxStages) {
    newCurrentStage = stageNum + 1;
  }

  // Update subbab progress
  await db
    .update(userSubbabProgress)
    .set({
      stars: JSON.stringify(currentStars),
      currentStage: newCurrentStage,
      unlocked: true,
      updatedAt: now,
    })
    .where(
      and(
        eq(userSubbabProgress.userId, userId),
        eq(userSubbabProgress.subbabId, subbabId)
      )
    );

  // If chapter completed and subbabId < 5, unlock next subbab
  const isChapterDone = stageNum >= maxStages || Object.keys(currentStars).length >= maxStages || stageNum === 21;
  if (isChapterDone && subbabId < 5) {
    const nextSubbabId = subbabId + 1;
    await db
      .insert(userSubbabProgress)
      .values({
        id: subbabProgressId(userId, nextSubbabId),
        userId,
        subbabId: nextSubbabId,
        unlocked: true,
        currentStage: 1,
        stars: "{}",
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [userSubbabProgress.id],
        set: { unlocked: true, updatedAt: now },
      });
  }

  // Update total score
  if (scoreToAdd > 0) {
    await db
      .update(userStats)
      .set({
        totalScore: sql`${userStats.totalScore} + ${scoreToAdd}`,
        updatedAt: now,
      })
      .where(eq(userStats.id, userId));
  }

  // Evaluate badges
  const completedCount = await getCompletedStagesCount(userId);
  const [updatedStats] = await db
    .select({ totalScore: userStats.totalScore })
    .from(userStats)
    .where(eq(userStats.id, userId));

  const newBadges = await evaluateAndGrantBadges(
    userId,
    completedCount,
    updatedStats?.totalScore ?? 0
  );

  return { newBadges };
}

/**
 * Update endless mode high score.
 * Only updates if the new score beats the existing high score.
 */
export async function updateEndlessHighScore(
  userId: string,
  score: number
): Promise<{ updated: boolean; newBadges: string[] }> {
  const now = new Date();
  await initializeUserProgress(userId);

  const [stats] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.id, userId));

  if (!stats) {
    return { updated: false, newBadges: [] };
  }

  if (score > stats.endlessHighScore) {
    await db
      .update(userStats)
      .set({
        endlessHighScore: score,
        totalScore: sql`${userStats.totalScore} + ${score}`,
        updatedAt: now,
      })
      .where(eq(userStats.id, userId));

    // Re-evaluate badges
    const completedCount = await getCompletedStagesCount(userId);
    const [updatedStats] = await db
      .select({ totalScore: userStats.totalScore })
      .from(userStats)
      .where(eq(userStats.id, userId));

    const newBadges = await evaluateAndGrantBadges(
      userId,
      completedCount,
      updatedStats?.totalScore ?? 0
    );

    return { updated: true, newBadges };
  }

  return { updated: false, newBadges: [] };
}

/**
 * Reset all progress for a user (New Game).
 * Deletes all subbab progress and badges, resets stats, then re-initializes.
 */
export async function resetProgress(userId: string): Promise<void> {
  const now = new Date();

  await db
    .delete(userSubbabProgress)
    .where(eq(userSubbabProgress.userId, userId));

  await db.delete(userBadges).where(eq(userBadges.userId, userId));

  await db
    .update(userStats)
    .set({
      totalScore: 0,
      endlessHighScore: 0,
      updatedAt: now,
    })
    .where(eq(userStats.id, userId));

  // Re-initialize with defaults
  await initializeUserProgress(userId);
}

/**
 * Cheat code: Unlock all stages, all badges, max score.
 * Only allowed in development mode.
 */
export async function unlockAllWithCheat(userId: string): Promise<boolean> {
  const now = new Date();

  // Unlock all 5 subbabs with all 21 stages completed
  for (let i = 1; i <= 5; i++) {
    const allStars: Record<string, number> = {};
    for (let s = 1; s <= 21; s++) {
      allStars[String(s)] = 3;
    }

    await db
      .insert(userSubbabProgress)
      .values({
        id: subbabProgressId(userId, i),
        userId,
        subbabId: i,
        unlocked: true,
        currentStage: 21,
        stars: JSON.stringify(allStars),
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [userSubbabProgress.id],
        set: {
          unlocked: true,
          currentStage: 21,
          stars: JSON.stringify(allStars),
          updatedAt: now,
        },
      });
  }

  // Set max score
  await db
    .update(userStats)
    .set({
      totalScore: 99999,
      updatedAt: now,
    })
    .where(eq(userStats.id, userId));

  // Grant all badges
  for (const badge of BADGE_DEFINITIONS) {
    await db
      .insert(userBadges)
      .values({
        id: badgeId(userId, badge.id),
        userId,
        badgeId: badge.id,
        unlockedAt: now,
      })
      .onConflictDoNothing();
  }

  return true;
}

// ─────────────────────────────────────────────
// Offline-First Sync Service
// ─────────────────────────────────────────────

export interface OfflineSyncUserData {
  username: string;
  fullname?: string;
  password?: string;
  totalScore?: number;
  endlessHighScore?: number;
  unlockedBadges?: string[];
  progress?: Record<
    string,
    {
      unlocked?: boolean;
      completedSegments?: number;
      completed?: boolean;
      currentStage?: number;
      stars?: Record<string, number>;
      isStage21Completed?: boolean;
    }
  >;
  questScores?: Record<
    string | number,
    {
      score: number;
      correctCount: number;
      totalQuestions?: number;
      pointsEarned?: number;
      timeRemainingSeconds?: number;
      completedAt?: string;
    }
  >;
  playTimeSeconds?: number;
}

export async function syncOfflineUserData(data: OfflineSyncUserData) {
  if (!data || !data.username) {
    throw new Error("Username is required for offline sync");
  }

  const cleanUsername = data.username.trim();
  const cleanKey = cleanUsername.toLowerCase();
  const now = new Date();

  // 1. Check if user already exists in database
  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.username, cleanUsername));

  let userId: string;

  if (!existingUser) {
    // Generate new user ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const email = `${cleanKey}@detektifdata.local`;

    await db.insert(user).values({
      id: userId,
      name: data.fullname || cleanUsername,
      email,
      emailVerified: true,
      username: cleanUsername,
      plainPassword: data.password || null,
      totalPlayTimeSeconds: data.playTimeSeconds || 0,
      createdAt: now,
      updatedAt: now,
    });

    // Create account record if password is provided
    if (data.password) {
      try {
        const { hashPassword } = await import("@better-auth/utils/password");
        const hashedPassword = await hashPassword(data.password);
        await db.insert(account).values({
          id: `acc_${userId}`,
          accountId: userId,
          providerId: "credential",
          userId,
          password: hashedPassword,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err) {
        console.warn("[syncOfflineUserData] Error creating account record:", err);
      }
    }

    // Initialize user stats
    await db.insert(userStats).values({
      id: userId,
      totalScore: data.totalScore || 0,
      endlessHighScore: data.endlessHighScore || 0,
      createdAt: now,
      updatedAt: now,
    });
  } else {
    userId = existingUser.id;

    // Update play time if provided
    if (data.playTimeSeconds && data.playTimeSeconds > 0) {
      await db
        .update(user)
        .set({
          totalPlayTimeSeconds: (existingUser.totalPlayTimeSeconds || 0) + data.playTimeSeconds,
          updatedAt: now,
        })
        .where(eq(user.id, userId));
    }

    // Update stats: keep higher scores
    const [currentStats] = await db
      .select()
      .from(userStats)
      .where(eq(userStats.id, userId));

    if (currentStats) {
      await db
        .update(userStats)
        .set({
          totalScore: Math.max(currentStats.totalScore, data.totalScore || 0),
          endlessHighScore: Math.max(currentStats.endlessHighScore, data.endlessHighScore || 0),
          updatedAt: now,
        })
        .where(eq(userStats.id, userId));
    }
  }

  // 2. Merge chapter / subbab progress
  if (data.progress) {
    for (let subId = 1; subId <= 5; subId++) {
      const chKey = `chapter${subId}`;
      const subKey = `subbab${subId}`;
      const progData = data.progress[chKey] || data.progress[subKey];

      if (progData) {
        const progId = subbabProgressId(userId, subId);
        const [existingProg] = await db
          .select()
          .from(userSubbabProgress)
          .where(eq(userSubbabProgress.id, progId));

        const incomingStars = progData.stars || {};
        let mergedStars: Record<string, number> = {};

        if (existingProg) {
          try {
            mergedStars = JSON.parse(existingProg.stars || "{}");
          } catch {}
        }

        // Merge stars: keep max star per stage
        for (const [stg, star] of Object.entries(incomingStars)) {
          mergedStars[stg] = Math.max(mergedStars[stg] || 0, Number(star) || 3);
        }

        const maxStage = Math.max(
          existingProg?.currentStage || 1,
          progData.currentStage || 1,
          progData.completedSegments || 0,
          Object.keys(mergedStars).length
        );

        const isUnlocked = Boolean(
          subId === 1 ||
          existingProg?.unlocked ||
          progData.unlocked
        );

        if (!existingProg) {
          await db.insert(userSubbabProgress).values({
            id: progId,
            userId,
            subbabId: subId,
            unlocked: isUnlocked,
            currentStage: maxStage,
            stars: JSON.stringify(mergedStars),
            createdAt: now,
            updatedAt: now,
          });
        } else {
          await db
            .update(userSubbabProgress)
            .set({
              unlocked: isUnlocked,
              currentStage: maxStage,
              stars: JSON.stringify(mergedStars),
              updatedAt: now,
            })
            .where(eq(userSubbabProgress.id, progId));
        }
      }
    }
  }

  // 3. Merge Quest Exam Scores
  if (data.questScores) {
    for (const [sIdStr, qData] of Object.entries(data.questScores)) {
      const sId = parseInt(sIdStr.toString().replace(/\D/g, ""), 10);
      if (sId >= 1 && sId <= 5 && qData && typeof qData.score === "number") {
        const qId = `${userId}_quest_${sId}`;
        const [existingQuest] = await db
          .select()
          .from(questScores)
          .where(and(eq(questScores.userId, userId), eq(questScores.subbabId, sId)));

        const score = Math.min(100, Math.max(0, Math.round(qData.score)));
        const correctCount = qData.correctCount || 0;
        const totalQuestions = qData.totalQuestions || 30;
        const pointsEarned = qData.pointsEarned || 0;
        const timeRemainingSeconds = qData.timeRemainingSeconds || 0;
        const completedAt = qData.completedAt ? new Date(qData.completedAt) : now;

        if (!existingQuest) {
          await db.insert(questScores).values({
            id: qId,
            userId,
            subbabId: sId,
            score,
            correctCount,
            totalQuestions,
            pointsEarned,
            timeRemainingSeconds,
            completedAt,
            updatedAt: now,
          });
        } else if (score >= existingQuest.score) {
          await db
            .update(questScores)
            .set({
              score,
              correctCount,
              totalQuestions,
              pointsEarned: Math.max(existingQuest.pointsEarned, pointsEarned),
              timeRemainingSeconds: Math.max(existingQuest.timeRemainingSeconds, timeRemainingSeconds),
              updatedAt: now,
            })
            .where(eq(questScores.id, existingQuest.id));
        }
      }
    }
  }

  // 4. Re-evaluate badges
  const completedCount = await getCompletedStagesCount(userId);
  const [finalStats] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.id, userId));
  const newBadges = await evaluateAndGrantBadges(
    userId,
    completedCount,
    finalStats?.totalScore || 0
  );

  return {
    success: true,
    userId,
    username: cleanUsername,
    completedStagesCount: completedCount,
    totalScore: finalStats?.totalScore || 0,
    newBadges,
  };
}
