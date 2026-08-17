// API Service — Frontend HTTP client for the backend
// Handles all game API calls: progress, leaderboard, cheat

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
 * Fetch all registered detective users for Pilih Akun board.
 */
export async function fetchAllUsers() {
  const result = await apiFetch('/api/auth/all-users');
  if (result.success && Array.isArray(result.data?.users)) {
    return { success: true, users: result.data.users };
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

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────

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
