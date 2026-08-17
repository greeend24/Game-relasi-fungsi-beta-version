// Storage Service — Hybrid (API + localStorage)
// 
// For REAL users (authenticated via Better Auth): All data is synced with the backend API.
// For GUEST users (detektif_tamu): Data stays in localStorage/memory only.
// Audio settings always stay in localStorage (device-specific).

import { registerUser, loginUser, logoutUser, getSession } from './authClient.js';
import * as api from './apiService.js';

const CURRENT_USER_KEY = 'detektif_current_user';
const SETTINGS_KEY = 'detektif_audio_settings';

// ─────────────────────────────────────────────
// Badge Definitions (kept client-side for display)
// ─────────────────────────────────────────────

export const BADGE_DEFINITIONS = [
  {
    id: 'badge1', category: 1, name: 'Detektif Pemula', title: 'BEGINNER',
    desc: 'Menyelesaikan stage pertama petualangan relasi', icon: '🌱',
    iconPath: '/images/badge/png/Asset 10@4x.png', svgPath: '/images/badge/SVG/Asset 10.svg',
    rarity: 'COMMON', reqStages: 1, reqScore: 0,
    cardGradient: 'from-slate-100/90 via-white/90 to-slate-200/90',
    textColor: 'text-[#2D241E]', subTextColor: 'text-slate-700', iconBg: 'from-slate-200 to-slate-300'
  },
  {
    id: 'badge2', category: 2, name: 'Detektif Magang', title: 'EXPLORER',
    desc: 'Menyelesaikan 6 stage penyelidikan matematika', icon: '🔍',
    iconPath: '/images/badge/png/Asset 9@4x.png', svgPath: '/images/badge/SVG/Asset 9.svg',
    rarity: 'COMMON', reqStages: 6, reqScore: 0,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge3', category: 3, name: 'Pencari Jejak Angka', title: 'NUMBER HUNTER',
    desc: 'Menyelesaikan 16 stage berbasis pola relasi', icon: '🔢',
    iconPath: '/images/badge/png/Asset 8@4x.png', svgPath: '/images/badge/SVG/Asset 8.svg',
    rarity: 'UNCOMMON', reqStages: 16, reqScore: 200,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge4', category: 4, name: 'Pengumpul Bukti Data', title: 'DATA EXPLORER',
    desc: 'Menyelesaikan 31 stage penyelidikan relasi & fungsi', icon: '📊',
    iconPath: '/images/badge/png/Asset 7@4x.png', svgPath: '/images/badge/SVG/Asset 7.svg',
    rarity: 'UNCOMMON', reqStages: 31, reqScore: 500,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge5', category: 5, name: 'Analis Pola Berpikir', title: 'MATH THINKER',
    desc: 'Mencapai total skor di atas 1.000 PTS', icon: '💡',
    iconPath: '/images/badge/png/Asset 6@4x.png', svgPath: '/images/badge/SVG/Asset 6.svg',
    rarity: 'RARE', reqStages: 51, reqScore: 1000,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge6', category: 6, name: 'Penyelidik Senior', title: 'PROBLEM SOLVER',
    desc: 'Menyelesaikan 71 stage dengan akurasi tinggi', icon: '🧩',
    iconPath: '/images/badge/png/Asset 5@4x.png', svgPath: '/images/badge/SVG/Asset 5.svg',
    rarity: 'RARE', reqStages: 71, reqScore: 1800,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge7', category: 7, name: 'Spesialis Relasi', title: 'RELATIONS MASTER',
    desc: 'Menyelesaikan 91 stage dan menguasai format relasi', icon: '🔗',
    iconPath: '/images/badge/png/Asset 4@4x.png', svgPath: '/images/badge/SVG/Asset 4.svg',
    rarity: 'EPIC', reqStages: 91, reqScore: 2600,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge8', category: 8, name: 'Master Fungsi', title: 'FUNCTION EXPERT',
    desc: 'Menyelesaikan 111 stage notasi & rumus fungsi', icon: '⚙️',
    iconPath: '/images/badge/png/Asset 3@4x.png', svgPath: '/images/badge/SVG/Asset 3.svg',
    rarity: 'EPIC', reqStages: 111, reqScore: 3400,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge9', category: 9, name: 'Maestro Logika', title: 'MATH CHAMPION',
    desc: 'Menyelesaikan 131 stage korespondensi 1-1', icon: '🧠',
    iconPath: '/images/badge/png/Asset 2@4x.png', svgPath: '/images/badge/SVG/Asset 2.svg',
    rarity: 'LEGENDARY', reqStages: 131, reqScore: 4000,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge10', category: 10, name: 'Detektif Legendaris', title: 'LEGENDARY MATHEMATICIAN',
    desc: 'Mencapai skor maksimal 4.760 PTS dan menyelesaikan seluruh 147 stage 7 subbab!', icon: '👑',
    iconPath: '/images/badge/png/Asset 1@4x.png', svgPath: '/images/badge/SVG/Asset 1.svg',
    rarity: 'LEGENDARY', reqStages: 147, reqScore: 4760,
    cardGradient: 'from-amber-300/90 via-yellow-400/90 to-amber-500/90',
    textColor: 'text-[#2D241E]', subTextColor: 'text-amber-950', iconBg: 'from-amber-400 to-yellow-300'
  }
];

export function calculateBadge(completedStagesCount = 0, score = 0) {
  let matched = BADGE_DEFINITIONS[0];
  // Sequential rank unlock rule: previous rank MUST be unlocked first & score requirement met
  for (let i = 1; i < BADGE_DEFINITIONS.length; i++) {
    const b = BADGE_DEFINITIONS[i];
    if (score >= b.reqScore) {
      matched = b;
    } else {
      break; // Sequential rank chain stops if score requirement not met
    }
  }
  return matched;
}

// ─────────────────────────────────────────────
// Guest Mode Helpers (localStorage only)
// ─────────────────────────────────────────────

function isGuest(user) {
  return user?.username?.toLowerCase() === 'detektif_tamu';
}

function createFreshGuestUser() {
  return {
    username: 'detektif_tamu',
    fullname: 'Detektif Tamu (Demo)',
    totalScore: 0,
    endlessHighScore: 0,
    unlockedBadges: ['badge1'],
    progress: {
      subbab1: { unlocked: true, currentStage: 1, stars: {} },
      subbab2: { unlocked: false, currentStage: 1, stars: {} },
      subbab3: { unlocked: false, currentStage: 1, stars: {} },
      subbab4: { unlocked: false, currentStage: 1, stars: {} },
      subbab5: { unlocked: false, currentStage: 1, stars: {} },
      subbab6: { unlocked: false, currentStage: 1, stars: {} },
      subbab7: { unlocked: false, currentStage: 1, stars: {} },
    },
    _isGuest: true,
  };
}

function evaluateGuestBadges(guestUser) {
  const completedCount = getCompletedStagesCountLocal(guestUser.progress);
  const score = guestUser.totalScore || 0;
  const currentUnlocked = new Set(guestUser.unlockedBadges || ['badge1']);
  const newlyUnlocked = [];

  BADGE_DEFINITIONS.forEach(b => {
    if (!currentUnlocked.has(b.id)) {
      if (completedCount >= b.reqStages || (b.reqScore > 0 && score >= b.reqScore)) {
        currentUnlocked.add(b.id);
        newlyUnlocked.push(b);
      }
    }
  });

  guestUser.unlockedBadges = Array.from(currentUnlocked);
  return { user: guestUser, newBadges: newlyUnlocked };
}

function getCompletedStagesCountLocal(userProgress) {
  if (!userProgress) return 0;
  let count = 0;
  try {
    Object.values(userProgress).forEach(sub => {
      if (sub && sub.stars) {
        count += Object.keys(sub.stars).length;
      }
    });
  } catch {}
  return count;
}

// ─────────────────────────────────────────────
// Hybrid Storage Service
// ─────────────────────────────────────────────

const SAVED_ACCOUNTS_KEY = 'detektif_saved_accounts_list';

function saveAccountToList(username, fullname = '') {
  try {
    const listData = localStorage.getItem(SAVED_ACCOUNTS_KEY);
    let list = listData ? JSON.parse(listData) : [];
    const cleanKey = username.trim().toLowerCase();
    
    list = list.filter(item => item.username.trim().toLowerCase() !== cleanKey);
    list.unshift({
      username: username.trim(),
      fullname: fullname.trim() || username.trim(),
      lastActive: new Date().toISOString(),
    });

    localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(list));
  } catch {}
}

export const storageService = {
  // Internal state: tracks whether we're using API or guest mode
  _useApi: false,
  _cachedUser: null,

  async getSavedAccounts() {
    try {
      const listData = localStorage.getItem(SAVED_ACCOUNTS_KEY);
      let list = listData ? JSON.parse(listData) : [];

      const localUsers = getLocalUsersDB();
      const existingKeys = new Set(list.map(a => a.username.trim().toLowerCase()));

      Object.values(localUsers).forEach(u => {
        const key = u.username.trim().toLowerCase();
        if (!existingKeys.has(key)) {
          list.push({
            username: u.username,
            fullname: u.fullname || u.username,
          });
          existingKeys.add(key);
        }
      });

      // Also merge all users registered in backend API database
      try {
        const apiRes = await api.fetchAllUsers();
        if (apiRes && apiRes.success && Array.isArray(apiRes.users)) {
          apiRes.users.forEach(u => {
            if (u.username) {
              const key = u.username.trim().toLowerCase();
              if (!existingKeys.has(key)) {
                list.push({
                  username: u.username,
                  fullname: u.fullname || u.username,
                });
                existingKeys.add(key);
              }
            }
          });
        }
      } catch {}

      return list;
    } catch {
      return [];
    }
  },

  removeSavedAccount(username) {
    try {
      const cleanKey = username.trim().toLowerCase();
      const listData = localStorage.getItem(SAVED_ACCOUNTS_KEY);
      if (listData) {
        const list = JSON.parse(listData).filter(a => a.username.trim().toLowerCase() !== cleanKey);
        localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(list));
      }

      const localUsers = getLocalUsersDB();
      delete localUsers[cleanKey];
      saveLocalUsersDB(localUsers);
      return true;
    } catch {
      return false;
    }
  },

  // ── Audio Settings (always localStorage) ──

  getAudioSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) return JSON.parse(data);
    } catch {}
    return {
      masterVol: 80, musicVol: 30, sfxVol: 70, reloVol: 80,
      isMusicOn: true, isSfxOn: true, isReloOn: true, isMuted: false,
    };
  },

  saveAudioSettings(settings) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
  },

  // ── Session & User ──

  /**
   * Get the current user. Checks API session first, falls back to localStorage cache.
   * This is called synchronously in many places, so we use cached data.
   * Call `syncSession()` async first to populate the cache.
   */
  getCurrentUser() {
    return this._cachedUser;
  },

  setCurrentUser(user) {
    this._cachedUser = user;
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        if (!user._isGuest && user.username) {
          saveAccountToList(user.username, user.fullname);
        }
      }
    } catch {}
  },

  /**
   * Async: Check the backend session and sync cached user.
   * Called once on app startup.
   * Returns the user object or null.
   */
  async syncSession() {
    try {
      const sessionData = await getSession();
      if (sessionData?.user) {
        // Authenticated — fetch progress from API
        this._useApi = true;
        const result = await api.fetchProgress();
        if (result.success && result.data) {
          const user = {
            username: result.data.username,
            fullname: result.data.fullname,
            totalScore: result.data.totalScore,
            endlessHighScore: result.data.endlessHighScore,
            unlockedBadges: result.data.unlockedBadges,
            progress: result.data.progress,
            _isGuest: false,
          };
          this.setCurrentUser(user);
          return user;
        }
      }
    } catch (err) {
      console.warn('[storageService] syncSession failed, using local cache:', err);
    }

    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      const parsed = data ? JSON.parse(data) : null;
      if (parsed) {
        this._useApi = false;
        this._cachedUser = parsed;
        return parsed;
      }
    } catch {}

    this._useApi = false;
    this._cachedUser = null;
    return null;
  },

  // ── Registration ──

  async register(username, password, fullname = '') {
    // Guest mode — no API call
    if (username.toLowerCase() === 'detektif_tamu') {
      const guestUser = createFreshGuestUser();
      this._useApi = false;
      this.setCurrentUser(guestUser);
      return { success: true, user: guestUser };
    }

    // Real user — register via Better Auth API
    const result = await registerUser(username, password, fullname);
    if (result.success) {
      this._useApi = true;
      const progressResult = await api.fetchProgress();
      if (progressResult.success && progressResult.data) {
        const user = {
          username: progressResult.data.username,
          fullname: progressResult.data.fullname,
          totalScore: progressResult.data.totalScore,
          endlessHighScore: progressResult.data.endlessHighScore,
          unlockedBadges: progressResult.data.unlockedBadges,
          progress: progressResult.data.progress,
          _isGuest: false,
        };
        this.setCurrentUser(user);
        return { success: true, user };
      }
    } else if (result.message && !result.message.toLowerCase().includes('koneksi')) {
      return { success: false, message: result.message };
    }

    // Hybrid Fallback: Save local user object in offline local DB
    const localUsers = getLocalUsersDB();
    const cleanKey = username.trim().toLowerCase();
    const newUser = {
      username: username.trim(),
      password,
      fullname: fullname.trim() || username.trim(),
      totalScore: 0,
      endlessHighScore: 0,
      unlockedBadges: ['badge1'],
      progress: {
        subbab1: { unlocked: true, currentStage: 1, stars: {} },
        subbab2: { unlocked: false, currentStage: 1, stars: {} },
        subbab3: { unlocked: false, currentStage: 1, stars: {} },
        subbab4: { unlocked: false, currentStage: 1, stars: {} },
        subbab5: { unlocked: false, currentStage: 1, stars: {} },
        subbab6: { unlocked: false, currentStage: 1, stars: {} },
        subbab7: { unlocked: false, currentStage: 1, stars: {} },
      },
      _isGuest: false,
    };

    localUsers[cleanKey] = newUser;
    saveLocalUsersDB(localUsers);

    this._useApi = false;
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  // ── Login ──

  async login(username, password) {
    const result = await loginUser(username, password);
    if (result.success) {
      this._useApi = true;
      let progressData = null;
      try {
        const progressResult = await api.fetchProgress();
        if (progressResult && progressResult.success) {
          progressData = progressResult.data;
        }
      } catch {}

      const user = {
        username: progressData?.username || username.trim(),
        fullname: progressData?.fullname || result.data?.user?.name || username.trim(),
        totalScore: progressData?.totalScore || 0,
        endlessHighScore: progressData?.endlessHighScore || 0,
        unlockedBadges: progressData?.unlockedBadges || ['badge1'],
        progress: progressData?.progress || {
          subbab1: { unlocked: true, currentStage: 1, stars: {} },
          subbab2: { unlocked: false, currentStage: 1, stars: {} },
          subbab3: { unlocked: false, currentStage: 1, stars: {} },
          subbab4: { unlocked: false, currentStage: 1, stars: {} },
          subbab5: { unlocked: false, currentStage: 1, stars: {} },
          subbab6: { unlocked: false, currentStage: 1, stars: {} },
          subbab7: { unlocked: false, currentStage: 1, stars: {} },
        },
        _isGuest: false,
      };

      this.setCurrentUser(user);
      return { success: true, user };
    } else if (result.message && !result.message.toLowerCase().includes('koneksi')) {
      return { success: false, message: result.message };
    }

    // Hybrid Fallback: Check local user database if offline or network issue
    const localUsers = getLocalUsersDB();
    const cleanKey = username.trim().toLowerCase();
    const localUser = localUsers[cleanKey];

    if (localUser && localUser.password === password) {
      this._useApi = false;
      this.setCurrentUser(localUser);
      return { success: true, user: localUser };
    }

    if (localUser && localUser.password !== password) {
      return { success: false, message: 'Password salah!' };
    }

    return { success: false, message: result.message || 'Username atau password salah!' };
  },

  // ── Logout ──

  async logout() {
    if (this._useApi) {
      await logoutUser();
    }
    this._useApi = false;
    this._cachedUser = null;
    try { localStorage.removeItem(CURRENT_USER_KEY); } catch {}
  },

  // ── Progress Helpers ──

  getCompletedStagesCount(userProgress) {
    return getCompletedStagesCountLocal(userProgress);
  },

  evaluateNewBadges(user) {
    if (!user) return { user, newBadges: [] };
    // Client-side evaluation (for display purposes — real badges come from API)
    return evaluateGuestBadges(JSON.parse(JSON.stringify(user)));
  },

  // ── Update Progress (Stage Completion) ──

  async updateProgress(subbabKey, stageNum, scoreEarned, starsEarned = 3) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    // GUEST MODE: Purely local
    if (isGuest(currentUser)) {
      return this._updateProgressLocal(currentUser, subbabKey, stageNum, scoreEarned, starsEarned);
    }

    // REAL USER: Call backend API
    const subbabId = parseInt(subbabKey.replace('subbab', ''), 10);
    const result = await api.updateStageProgress(subbabId, stageNum, scoreEarned, starsEarned);

    if (result.success && result.data) {
      const updatedUser = {
        ...currentUser,
        totalScore: result.data.totalScore,
        endlessHighScore: result.data.endlessHighScore,
        unlockedBadges: result.data.unlockedBadges,
        progress: result.data.progress,
      };
      this.setCurrentUser(updatedUser);

      // Map newBadges IDs to full badge objects for the unlock modal
      const newBadgeObjects = (result.data.newBadges || result.newBadges || [])
        .map(id => BADGE_DEFINITIONS.find(b => b.id === id))
        .filter(Boolean);

      return { user: updatedUser, newBadges: newBadgeObjects };
    }

    // Fallback to local if API fails
    console.warn('[storageService] API updateProgress failed, using local fallback');
    return this._updateProgressLocal(currentUser, subbabKey, stageNum, scoreEarned, starsEarned);
  },

  // Local progress update (for guest or fallback)
  _updateProgressLocal(currentUser, subbabKey, stageNum, scoreEarned, starsEarned) {
    const userCopy = JSON.parse(JSON.stringify(currentUser));
    if (!userCopy.progress[subbabKey]) {
      userCopy.progress[subbabKey] = { unlocked: true, currentStage: 1, stars: {} };
    }

    const sub = userCopy.progress[subbabKey];
    const prevStars = sub.stars[stageNum] || 0;

    if (starsEarned > prevStars) {
      sub.stars[stageNum] = starsEarned;
      userCopy.totalScore = (userCopy.totalScore || 0) + scoreEarned;
    }

    if (stageNum >= sub.currentStage && stageNum < 21) {
      sub.currentStage = stageNum + 1;
    } else if (stageNum === 21) {
      const subbabNumber = parseInt(subbabKey.replace('subbab', ''), 10);
      if (subbabNumber < 7) {
        const nextSubKey = `subbab${subbabNumber + 1}`;
        if (!userCopy.progress[nextSubKey]) {
          userCopy.progress[nextSubKey] = { unlocked: true, currentStage: 1, stars: {} };
        } else {
          userCopy.progress[nextSubKey].unlocked = true;
        }
      }
    }

    const { user: updatedUser, newBadges } = evaluateGuestBadges(userCopy);
    this.setCurrentUser(updatedUser);
    return { user: updatedUser, newBadges };
  },

  // ── Endless Mode High Score ──

  async updateEndlessHighScore(score) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    if (isGuest(currentUser)) {
      const userCopy = JSON.parse(JSON.stringify(currentUser));
      if (score > (userCopy.endlessHighScore || 0)) {
        userCopy.endlessHighScore = score;
      }
      userCopy.totalScore = (userCopy.totalScore || 0) + score;
      const { user: updatedGuest } = evaluateGuestBadges(userCopy);
      this.setCurrentUser(updatedGuest);
      return;
    }

    // Real user: API call
    const result = await api.updateEndlessScore(score);
    if (result.success) {
      // Re-sync progress from server
      const progressResult = await api.fetchProgress();
      if (progressResult.success && progressResult.data) {
        const updatedUser = {
          ...currentUser,
          totalScore: progressResult.data.totalScore,
          endlessHighScore: progressResult.data.endlessHighScore,
          unlockedBadges: progressResult.data.unlockedBadges,
          progress: progressResult.data.progress,
        };
        this.setCurrentUser(updatedUser);
      }
    }
  },

  // ── Cheat Code ──

  async unlockAllWithCheat(cheatCode) {
    if (cheatCode !== 'fikrangantengbeut123') return null;

    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    if (isGuest(currentUser)) {
      const userCopy = JSON.parse(JSON.stringify(currentUser));
      for (let i = 1; i <= 7; i++) {
        const subKey = `subbab${i}`;
        const starsObj = {};
        for (let s = 1; s <= 21; s++) starsObj[s] = 3;
        userCopy.progress[subKey] = { unlocked: true, currentStage: 21, stars: starsObj };
      }
      userCopy.totalScore = 99999;
      userCopy.unlockedBadges = BADGE_DEFINITIONS.map(b => b.id);
      this.setCurrentUser(userCopy);
      return userCopy;
    }

    // Real user: API call
    const result = await api.applyCheatCode(cheatCode);
    if (result.success && result.data) {
      const updatedUser = {
        ...currentUser,
        totalScore: result.data.totalScore,
        endlessHighScore: result.data.endlessHighScore,
        unlockedBadges: result.data.unlockedBadges,
        progress: result.data.progress,
      };
      this.setCurrentUser(updatedUser);
      return updatedUser;
    }

    return null;
  },

  // ── Avatar Update ──
  async updateAvatar(avatarId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const userCopy = { ...currentUser, avatarId };
    this.setCurrentUser(userCopy);

    if (!isGuest(currentUser)) {
      try {
        await api.updateAvatar?.(avatarId);
      } catch (err) {
        console.warn('API updateAvatar fallback to local update:', err);
      }
    }

    return userCopy;
  },

  // ── Leaderboard ──

  async getLeaderboard() {
    // Always try API first (leaderboard is a global public endpoint)
    const result = await api.fetchLeaderboard(50);
    if (result.success && result.data) {
      return result.data;
    }

    // Fallback: empty
    return [];
  },
};
