// API Service : Frontend HTTP client for the backend
// Handles all game API calls: progress, leaderboard, cheat, multi-device sync

export const CUSTOM_SERVER_URL_KEY = 'detektif_custom_server_url';
export const DEFAULT_LOCAL_URL = 'http://127.0.0.1:3001';
export const DEFAULT_NGROK_URL = 'https://scooter-thickness-stony.ngrok-free.dev';

export function resolveApiBase() {
  // 1. Explicit custom server URL set by teacher/user in settings or localStorage
  if (typeof window !== 'undefined') {
    try {
      const customUrl = localStorage.getItem(CUSTOM_SERVER_URL_KEY);
      if (customUrl && customUrl.trim()) {
        const clean = customUrl.trim().replace(/\/+$/, '');
        if (clean.startsWith('http://') || clean.startsWith('https://')) {
          return clean;
        }
        return `http://${clean}`;
      }
    } catch {}
  }

  // 2. Zero-config: Read from server_url.txt passed by Electron preload
  if (typeof window !== 'undefined' && window.electronAPI?.preconfiguredServerUrl) {
    const pre = window.electronAPI.preconfiguredServerUrl.trim().replace(/\/+$/, '');
    if (pre && pre.length > 0) {
      if (pre.startsWith('http://') || pre.startsWith('https://')) {
        return pre;
      }
      return `http://${pre}`;
    }
  }

  // 3. Web browser access (Remote Cloudflare tunnel, Ngrok, LAN IP, or Web domain)
  // When accessed via browser, frontend & backend are served from the same origin!
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const { origin, hostname, port } = window.location;
    const isViteDev = (hostname === 'localhost' || hostname === '127.0.0.1') && port && port !== '3001';

    // If running in browser on a real remote URL, LAN IP, Cloudflare tunnel, or Ngrok:
    if (!origin.startsWith('file:') && !origin.startsWith('app:') && !isViteDev) {
      return origin.replace(/\/+$/, '');
    }

    // In local Vite dev server (e.g. port 5173 / 3000), connect to backend port 3001:
    if (isViteDev) {
      return `http://${hostname}:3001`;
    }
  }

  // 4. Explicit environment variable if provided
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }

  // 5. Default fallback untuk Electron offline:
  return DEFAULT_LOCAL_URL;
}

export function getApiBase() {
  return resolveApiBase();
}

export function setCustomServerUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(CUSTOM_SERVER_URL_KEY);
    } else {
      let clean = url.trim().replace(/\/+$/, '');
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        clean = `http://${clean}`;
      }
      localStorage.setItem(CUSTOM_SERVER_URL_KEY, clean);
    }
  } catch {}
}

export function getCustomServerUrl() {
  try {
    return localStorage.getItem(CUSTOM_SERVER_URL_KEY) || window.electronAPI?.preconfiguredServerUrl || '';
  } catch {
    return '';
  }
}

export async function testServerConnection(targetUrl) {
  try {
    const base = targetUrl ? targetUrl.trim().replace(/\/+$/, '') : resolveApiBase();
    const cleanBase = (!base.startsWith('http://') && !base.startsWith('https://')) ? `http://${base}` : base;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(`${cleanBase}/api/health`, {
      signal: controller.signal,
      headers: { 'ngrok-skip-browser-warning': 'true' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data && data.status === 'ok') {
        return { success: true, data };
      }
    }
    return { success: false, status: res.status };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Generic fetch wrapper with JSON parsing and error handling.
 * Sends cookies (credentials: 'include') for session auth.
 */
async function apiFetch(path, options = {}) {
  try {
    const currentBase = resolveApiBase();
    const controller = new AbortController();
    const timeoutMs = options.timeoutMs || 8000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('detektif_auth_token') : null;
    const authHeaders = token ? { 'Authorization': `Bearer ${token}`, 'x-session-token': token } : {};

    const res = await fetch(`${currentBase}${path}`, {
      credentials: 'include',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...authHeaders,
        ...options.headers,
      },
      ...options,
    });
    clearTimeout(timeoutId);

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



export async function checkHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${resolveApiBase()}/api/health`, {
      signal: controller.signal,
      credentials: 'include',
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    clearTimeout(timeoutId);
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return Boolean(data && data.status === 'ok');
  } catch {
    return false;
  }
}


