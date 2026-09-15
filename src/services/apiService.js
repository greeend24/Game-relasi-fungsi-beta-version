// API Service — Frontend HTTP client for the backend
// Handles all game API calls: progress, leaderboard, cheat

const PERMANENT_REMOTE_URL = 'https://scooter-thickness-stony.ngrok-free.dev';

function resolveApiBase() {
  // 1. Local Vite dev server on port 5173 -> point to local backend 3001
  if (typeof window !== 'undefined' && window.location && window.location.port === '5173') {
    return `http://${window.location.hostname}:3001`;
  }

  // 2. Explicit environment variable if provided
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 3. Web browser running on a remote domain (not file: or localhost)
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.startsWith('file:') && !origin.startsWith('app:') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }

  // 4. Default for Electron / Standalone apps -> permanent Ngrok domain
  return PERMANENT_REMOTE_URL;
}

const API_BASE = resolveApiBase();

/**
 * Generic fetch wrapper with JSON parsing and error handling.
 * Sends cookies (credentials: 'include') for session auth.
 */
async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || `HTTP ${res.status}`, data: null };
    }

    return { success: true, data: data.data || data, error: null };
  } catch (err) {
    console.error(`[apiService] ${path} error:`, err);
    return { success: false, error: 'Koneksi ke server gagal!', data: null };
  }
}

/**
 * Fetch all registered detective users for Pilih Akun board on ANY device.
 */
export async function fetchAllUsers() {
  const result = await apiFetch('/api/users/list');
  if (result.success && Array.isArray(result.data?.users)) {
    return { success: true, users: result.data.users };
  }
  const fallback = await apiFetch('/api/auth/all-users');
  if (fallback.success && Array.isArray(fallback.data?.users)) {
    return { success: true, users: fallback.data.users };
  }
  return { success: false, users: [] };
}

// ─────────────────────────────────────────────
// Progress API
// ─────────────────────────────────────────────

/**
 * GET /api/progress
 * Fetch full user progress profile from the server.
 * Returns: { username, fullname, totalScore, endlessHighScore, unlockedBadges, progress }
 */
export async function fetchProgress() {
  return apiFetch('/api/progress');
}

/**
 * POST /api/progress/stage
 * Report a stage completion to the server.
 * @param {number} subbabId - Subbab ID (1-7)
 * @param {number} stageNum - Stage number (1-21)
 * @param {number} scoreEarned - Points earned
 * @param {number} starsEarned - Stars earned (usually 3)
 * Returns: { data: updatedUserProgress, newBadges: string[] }
 */
export async function updateStageProgress(subbabId, stageNum, scoreEarned, starsEarned) {
  return apiFetch('/api/progress/stage', {
    method: 'POST',
    body: JSON.stringify({ subbabId, stageNum, scoreEarned, starsEarned }),
  });
}

/**
 * POST /api/progress/endless
 * Report endless mode high score.
 * @param {number} score - Total endless mode score
 */
export async function updateEndlessScore(score) {
  return apiFetch('/api/progress/endless', {
    method: 'POST',
    body: JSON.stringify({ score }),
  });
}

/**
 * POST /api/progress/reset
 * Reset all progress (New Game).
 */
export async function resetProgress() {
  return apiFetch('/api/progress/reset', {
    method: 'POST',
  });
}

/**
 * POST /api/progress/cheat
 * Apply cheat code (dev only).
 * @param {string} cheatCode
 */
export async function applyCheatCode(cheatCode) {
  return apiFetch('/api/progress/cheat', {
    method: 'POST',
    body: JSON.stringify({ cheatCode }),
  });
}

// ─────────────────────────────────────────────
// Quest Mode Exam API
// ─────────────────────────────────────────────

/**
 * POST /api/quest/submit
 * Submit Quest Mode exam result (0-100 score, correctCount, points, speed bonus).
 */
export async function submitQuestExamScore(subbabId, examData) {
  return apiFetch('/api/quest/submit', {
    method: 'POST',
    body: JSON.stringify({
      subbabId,
      score: examData.score,
      correctCount: examData.correctCount,
      totalQuestions: examData.totalQuestions || 30,
      pointsEarned: examData.pointsEarned || 0,
      timeRemainingSeconds: examData.timeRemainingSeconds || 0,
    }),
  });
}

/**
 * GET /api/quest
 * Fetch all quest exam scores for current user.
 */
export async function fetchUserQuestScores() {
  return apiFetch('/api/quest');
}

// ─────────────────────────────────────────────
// Leaderboard API
// ─────────────────────────────────────────────

/**
 * GET /api/leaderboard
 * Fetch global leaderboard.
 * @param {number} [limit=50]
 */
export async function fetchLeaderboard(limit = 50) {
  return apiFetch(`/api/leaderboard?limit=${limit}`);
}

/**
 * POST /api/progress/avatar
 * Update user avatar ID.
 * @param {string} avatarId
 */
export async function updateAvatar(avatarId) {
  return apiFetch('/api/progress/avatar', {
    method: 'POST',
    body: JSON.stringify({ avatarId }),
  });
}

/**
 * POST /api/progress/playtime
 * Send played duration in seconds to backend for analytics tracking.
 * @param {number} seconds
 * @param {string} [username]
 */
export async function recordPlayTime(seconds, username = '') {
  return apiFetch('/api/progress/playtime', {
    method: 'POST',
    body: JSON.stringify({ seconds, username }),
  });
}

/**
 * POST /api/progress/sync-offline
 * Bulk upload offline student data (accounts, stages, quest exams, total score) to server.
 */
export async function syncOfflineData(payload) {
  return apiFetch('/api/progress/sync-offline', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}



/**
 * GET /api/health
 * Check if the backend server is reachable.
 */
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { credentials: 'include' });
    return res.ok;
  } catch {
    return false;
  }
}


