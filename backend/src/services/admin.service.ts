import { db } from "../db/index.js";
import { user, userStats, userSubbabProgress, questScores, userBadges, session, account } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

export const CHAPTER_TOTAL_SEGS: Record<number, number> = {
  1: 3,
  2: 4,
  3: 4,
  4: 4,
  5: 3,
};

export interface StudentSummary {
  id: string;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isOnline: boolean;
  lastActiveAgo: string;
  lastActiveMs?: number;
  plainPassword?: string | null;
  totalPlayTimeSeconds: number;
  formattedPlayTime: string;
  isEstimatedPlayTime?: boolean;
  createdAt: Date;
  totalScore: number;
  endlessHighScore: number;
  stagesCompletedTotal: number;
  chaptersCompletedTotal: number;
  chaptersProgress: Record<
    number,
    {
      currentStage: number;
      starsCount: number;
      isStage21Completed: boolean;
      questScore: number | null;
      questCorrectCount: number | null;
      questCompletedAt: Date | null;
    }
  >;
}

// ─────────────────────────────────────────────
// Real-Time Online / Offline Student Activity Tracker
// ─────────────────────────────────────────────
export const activeStudentsLastSeen = new Map<string, number>();

export function recordStudentActivity(identifier: string) {
  if (!identifier) return;
  const key = identifier.trim().toLowerCase();
  activeStudentsLastSeen.set(key, Date.now());
}

export function isStudentOnline(username: string, userId?: string, thresholdMs = 35000): boolean {
  const now = Date.now();
  if (username) {
    const ts = activeStudentsLastSeen.get(username.trim().toLowerCase());
    if (ts && now - ts <= thresholdMs) return true;
  }
  if (userId) {
    const ts = activeStudentsLastSeen.get(userId.trim().toLowerCase());
    if (ts && now - ts <= thresholdMs) return true;
  }
  return false;
}

export function getStudentLastActiveMs(username: string, userId?: string): number | undefined {
  if (username) {
    const ts = activeStudentsLastSeen.get(username.trim().toLowerCase());
    if (ts) return ts;
  }
  if (userId) {
    const ts = activeStudentsLastSeen.get(userId.trim().toLowerCase());
    if (ts) return ts;
  }
  return undefined;
}

export function formatDurationIndonesian(seconds: number): string {
  if (!seconds || seconds <= 0) return "0 Menit";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} Jam`);
  if (minutes > 0) parts.push(`${minutes} Menit`);
  if (remainingSeconds > 0 && hours === 0) parts.push(`${remainingSeconds} Detik`);
  return parts.join(" ") || "0 Menit";
}

export async function getAllStudentsData(): Promise<StudentSummary[]> {
  // Fetch all users
  const users = await db.select().from(user).orderBy(desc(user.createdAt));
  const statsList = await db.select().from(userStats);
  const progressList = await db.select().from(userSubbabProgress);
  const questList = await db.select().from(questScores);

  const statsMap = new Map(statsList.map((s) => [s.id, s]));

  return users.map((u) => {
    const s = statsMap.get(u.id);
    const uProgress = progressList.filter((p) => p.userId === u.id);
    const uQuests = questList.filter((q) => q.userId === u.id);

    let totalStagesCount = 0;
    let chaptersCompletedCount = 0;
    const chaptersProgress: StudentSummary["chaptersProgress"] = {};

    for (let subId = 1; subId <= 5; subId++) {
      const prog = uProgress.find((p) => p.subbabId === subId);
      const quest = uQuests.find((q) => q.subbabId === subId);
      const maxSeg = CHAPTER_TOTAL_SEGS[subId] || 4;

      let starsCount = 0;
      let isStage21Completed = false;

      if (prog) {
        try {
          const parsed = JSON.parse(prog.stars || "{}");
          starsCount = Object.keys(parsed).length;
          isStage21Completed = Boolean(parsed["21"]) || prog.currentStage >= maxSeg || starsCount >= maxSeg;
        } catch {}
      }

      totalStagesCount += starsCount;
      if (isStage21Completed) {
        chaptersCompletedCount++;
      }

      chaptersProgress[subId] = {
        currentStage: prog?.currentStage || 1,
        starsCount,
        isStage21Completed,
        questScore: quest ? quest.score : null,
        questCorrectCount: quest ? quest.correctCount : null,
        questCompletedAt: quest ? quest.completedAt : null,
      };
    }

    // Play time calculation: use recorded seconds if > 0, otherwise calculate realistic activity estimate
    const estimatedSeconds = totalStagesCount * 150 + uQuests.length * 600;
    const recordedSeconds = s?.totalPlayTimeSeconds || u.totalPlayTimeSeconds || 0;
    const finalSeconds = recordedSeconds > 0 ? recordedSeconds : estimatedSeconds;

    const plainPassword = u.plainPassword || s?.plainPassword || null;

    const isOnline = isStudentOnline(u.username, u.id);
    const lastActiveMs = getStudentLastActiveMs(u.username, u.id);
    const lastActiveAgo = lastActiveMs
      ? formatDurationIndonesian(Math.max(0, Math.floor((Date.now() - lastActiveMs) / 1000))) + " lalu"
      : u.updatedAt
      ? formatDurationIndonesian(Math.max(0, Math.floor((Date.now() - new Date(u.updatedAt).getTime()) / 1000))) + " lalu"
      : "Belum ada catatan";

    const isUserAdmin = Boolean(
      u.isAdmin ||
      u.username?.toLowerCase() === "fikran02" ||
      (u.name && u.name.toLowerCase() === "admin")
    );

    return {
      id: u.id,
      name: u.name || u.username,
      username: u.username,
      email: u.email,
      isAdmin: isUserAdmin,
      isOnline,
      lastActiveAgo,
      lastActiveMs,
      plainPassword,
      totalPlayTimeSeconds: finalSeconds,
      formattedPlayTime: formatDurationIndonesian(finalSeconds),
      isEstimatedPlayTime: recordedSeconds <= 0 && estimatedSeconds > 0,
      createdAt: u.createdAt,
      totalScore: s?.totalScore || 0,
      endlessHighScore: s?.endlessHighScore || 0,
      stagesCompletedTotal: totalStagesCount,
      chaptersCompletedTotal: chaptersCompletedCount,
      chaptersProgress,
    };
  });
}

export async function setStudentAdminRole(userId: string, isAdmin: boolean): Promise<void> {
  await db.update(user).set({ isAdmin }).where(eq(user.id, userId));
}

export async function getAdminOverview() {
  const students = await getAllStudentsData();
  const totalStudents = students.length;
  const onlineStudentsCount = students.filter((s) => s.isOnline).length;
  const offlineStudentsCount = totalStudents - onlineStudentsCount;

  if (totalStudents === 0) {
    return {
      totalStudents: 0,
      onlineStudentsCount: 0,
      offlineStudentsCount: 0,
      averageScore: 0,
      averageEndless: 0,
      topScorer: null,
      totalQuestExamsTaken: 0,
    };
  }

  const totalScoreSum = students.reduce((acc, s) => acc + s.totalScore, 0);
  const totalEndlessSum = students.reduce((acc, s) => acc + s.endlessHighScore, 0);
  const sortedByScore = [...students].sort((a, b) => b.totalScore - a.totalScore);

  let totalQuestExamsTaken = 0;
  students.forEach((s) => {
    Object.values(s.chaptersProgress).forEach((c) => {
      if (c.questScore !== null) totalQuestExamsTaken++;
    });
  });

  return {
    totalStudents,
    onlineStudentsCount,
    offlineStudentsCount,
    averageScore: Math.round(totalScoreSum / totalStudents),
    averageEndless: Math.round(totalEndlessSum / totalStudents),
    topScorer: {
      name: sortedByScore[0]?.name || "-",
      username: sortedByScore[0]?.username || "-",
      score: sortedByScore[0]?.totalScore || 0,
    },
    totalQuestExamsTaken,
  };
}

export async function generateStudentsCsv(): Promise<string> {
  const students = await getAllStudentsData();

  // CSV Headers - Designed specifically for Game Data Analysis (5 Chapters Relasi & Fungsi)
  const headers = [
    "No",
    "Status Koneksi",
    "Terakhir Aktif",
    "ID Database Siswa",
    "Nama Lengkap Siswa",
    "Username",
    "Kata Sandi (Password)",
    "Lama Waktu Bermain",
    "Total Detik Bermain",
    "Email",
    "Total Bab Tamat (0-5)",
    "Total Segmen Selesai (0-18)",
    "Bab 1: Relasi & Cara Menyatakan (3 Segmen)",
    "Bab 1: Nilai Ujian Quest (0-100)",
    "Bab 2: Pengertian & Unsur Fungsi (4 Segmen)",
    "Bab 2: Nilai Ujian Quest (0-100)",
    "Bab 3: Notasi & Rumus Fungsi (4 Segmen)",
    "Bab 3: Nilai Ujian Quest (0-100)",
    "Bab 4: Grafik Fungsi Linear (4 Segmen)",
    "Bab 4: Nilai Ujian Quest (0-100)",
    "Bab 5: Korespondensi Satu-Satu (3 Segmen)",
    "Bab 5: Nilai Ujian Quest (0-100)",
    "High Score Endless Mode",
    "Total Skor Game",
    "Tanggal Pendaftaran",
  ];

  const rows = students.map((s, idx) => {
    const c = s.chaptersProgress;
    const formatDate = s.createdAt
      ? new Date(s.createdAt).toISOString().split("T")[0]
      : "-";

    const formatBabProgress = (subId: number) => {
      const ch = c[subId];
      const maxSeg = CHAPTER_TOTAL_SEGS[subId] || 4;
      if (!ch || (!ch.starsCount && !ch.isStage21Completed)) return `0/${maxSeg} Segmen (Belum)`;
      if (ch.isStage21Completed || ch.starsCount >= maxSeg) return `Tamat (${maxSeg}/${maxSeg} Segmen)`;
      return `${ch.starsCount}/${maxSeg} Segmen`;
    };

    return [
      idx + 1,
      s.isOnline ? '"Online (Aktif)"' : '"Offline"',
      `"${(s.lastActiveAgo || "").replace(/"/g, '""')}"`,
      `"${(s.id || "").replace(/"/g, '""')}"`,
      `"${(s.name || "").replace(/"/g, '""')}"`,
      `"${(s.username || "").replace(/"/g, '""')}"`,
      `"${(s.plainPassword || "").replace(/"/g, '""')}"`,
      `"${(s.formattedPlayTime || "").replace(/"/g, '""')}"`,
      s.totalPlayTimeSeconds,
      `"${(s.email || "").replace(/"/g, '""')}"`,
      s.chaptersCompletedTotal,
      s.stagesCompletedTotal,
      `"${formatBabProgress(1)}"`,
      c[1]?.questScore !== null && c[1]?.questScore !== undefined ? c[1].questScore : "-",
      `"${formatBabProgress(2)}"`,
      c[2]?.questScore !== null && c[2]?.questScore !== undefined ? c[2].questScore : "-",
      `"${formatBabProgress(3)}"`,
      c[3]?.questScore !== null && c[3]?.questScore !== undefined ? c[3].questScore : "-",
      `"${formatBabProgress(4)}"`,
      c[4]?.questScore !== null && c[4]?.questScore !== undefined ? c[4].questScore : "-",
      `"${formatBabProgress(5)}"`,
      c[5]?.questScore !== null && c[5]?.questScore !== undefined ? c[5].questScore : "-",
      s.endlessHighScore,
      s.totalScore,
      formatDate,
    ].join(",");
  });

  // Prepend UTF-8 BOM so Microsoft Excel correctly renders all Indonesian characters
  return "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
}

export async function deleteStudentById(userId: string) {
  await db.delete(questScores).where(eq(questScores.userId, userId));
  await db.delete(userSubbabProgress).where(eq(userSubbabProgress.userId, userId));
  await db.delete(userBadges).where(eq(userBadges.userId, userId));
  await db.delete(userStats).where(eq(userStats.id, userId));
  await db.delete(session).where(eq(session.userId, userId));
  await db.delete(account).where(eq(account.userId, userId));
  await db.delete(user).where(eq(user.id, userId));
  return { success: true };
}

export async function resetAllStudentsData() {
  await db.delete(questScores);
  await db.delete(userSubbabProgress);
  await db.delete(userBadges);
  await db.delete(userStats);
  await db.delete(session);
  await db.delete(account);
  await db.delete(user);
  return { success: true };
}
