// Storage Service — Hybrid (API + localStorage)
// 
// For REAL users (authenticated via Better Auth): All data is synced with the backend API.
// For GUEST users (detektif_tamu): Data stays in localStorage/memory only.
// Audio settings always stay in localStorage (device-specific).

import { registerUser, loginUser, logoutUser, getSession } from './authClient.js';
import * as api from './apiService.js';
import { networkStatusService } from './networkStatusService.js';

const CURRENT_USER_KEY = 'detektif_current_user';
const SETTINGS_KEY = 'detektif_audio_settings';

// ─────────────────────────────────────────────
// Badge Definitions (kept client-side for display)
// ─────────────────────────────────────────────
// Chapter Total Segments Definition
// ─────────────────────────────────────────────

export const CHAPTER_TOTAL_SEGS = {
  1: 12,
  2: 10,
  3: 10,
  4: 10,
  5: 8,
};

export const BADGE_DEFINITIONS = [
  {
    id: 'badge1', category: 1, name: 'Detektif Pemula', title: 'BEGINNER',
    desc: 'Memulai petualangan belajar fungsi', icon: '🌱',
    iconPath: '/images/badge/png/Asset 10@4x.png', svgPath: '/images/badge/SVG/Asset 10.svg',
    rarity: 'COMMON', reqStages: 1, reqScore: 0,
    cardGradient: 'from-slate-100/90 via-white/90 to-slate-200/90',
    textColor: 'text-[#2D241E]', subTextColor: 'text-slate-700', iconBg: 'from-slate-200 to-slate-300'
  },
  {
    id: 'badge2', category: 2, name: 'Detektif Magang', title: 'EXPLORER',
    desc: 'Menyelesaikan 5 segmen pembelajaran fungsi', icon: '🔍',
    iconPath: '/images/badge/png/Asset 9@4x.png', svgPath: '/images/badge/SVG/Asset 9.svg',
    rarity: 'COMMON', reqStages: 5, reqScore: 50,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge3', category: 3, name: 'Pencari Jejak Angka', title: 'NUMBER HUNTER',
    desc: 'Menyelesaikan Chapter 1 (Pengertian & Cara Menyatakan Relasi)', icon: '🔢',
    iconPath: '/images/badge/png/Asset 8@4x.png', svgPath: '/images/badge/SVG/Asset 8.svg',
    rarity: 'UNCOMMON', reqStages: 10, reqScore: 100,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge4', category: 4, name: 'Pengumpul Bukti Data', title: 'DATA EXPLORER',
    desc: 'Menyelesaikan 15 segmen pembelajaran', icon: '📊',
    iconPath: '/images/badge/png/Asset 7@4x.png', svgPath: '/images/badge/SVG/Asset 7.svg',
    rarity: 'UNCOMMON', reqStages: 15, reqScore: 200,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge5', category: 5, name: 'Analis Pola Berpikir', title: 'MATH THINKER',
    desc: 'Menyelesaikan Chapter 2 (Pengertian & Unsur Fungsi)', icon: '💡',
    iconPath: '/images/badge/png/Asset 6@4x.png', svgPath: '/images/badge/SVG/Asset 6.svg',
    rarity: 'RARE', reqStages: 20, reqScore: 400,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge6', category: 6, name: 'Penyelidik Senior', title: 'PROBLEM SOLVER',
    desc: 'Menyelesaikan 25 segmen pembelajaran', icon: '🧩',
    iconPath: '/images/badge/png/Asset 5@4x.png', svgPath: '/images/badge/SVG/Asset 5.svg',
    rarity: 'RARE', reqStages: 25, reqScore: 600,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge7', category: 7, name: 'Spesialis Rumus', title: 'FORMULA MASTER',
    desc: 'Menyelesaikan Chapter 3 (Notasi & Rumus Fungsi)', icon: '📈',
    iconPath: '/images/badge/png/Asset 4@4x.png', svgPath: '/images/badge/SVG/Asset 4.svg',
    rarity: 'EPIC', reqStages: 30, reqScore: 800,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge8', category: 8, name: 'Master Grafik', title: 'GRAPH EXPERT',
    desc: 'Menyelesaikan Chapter 4 (Grafik Fungsi Linear)', icon: '⚙️',
    iconPath: '/images/badge/png/Asset 3@4x.png', svgPath: '/images/badge/SVG/Asset 3.svg',
    rarity: 'EPIC', reqStages: 40, reqScore: 1000,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge9', category: 9, name: 'Maestro Bijektif', title: 'MATH CHAMPION',
    desc: 'Menyelesaikan Chapter 5 (Korespondensi Satu-Satu)', icon: '🧠',
    iconPath: '/images/badge/png/Asset 2@4x.png', svgPath: '/images/badge/SVG/Asset 2.svg',
    rarity: 'LEGENDARY', reqStages: 48, reqScore: 1500,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge10', category: 10, name: 'Detektif Legendaris', title: 'LEGENDARY MATHEMATICIAN',
    desc: 'Menguasai 5 Chapter Relasi & Fungsi dan mencapai 2.500 PTS!', icon: '👑',
    iconPath: '/images/badge/png/Asset 1@4x.png', svgPath: '/images/badge/SVG/Asset 1.svg',
    rarity: 'LEGENDARY', reqStages: 48, reqScore: 2500,
    cardGradient: 'from-amber-300/90 via-yellow-400/90 to-amber-500/90',
    textColor: 'text-[#2D241E]', subTextColor: 'text-amber-950', iconBg: 'from-amber-400 to-yellow-300'
  }
];

export function calculateBadge(completedStagesCount = 0, score = 0) {
  let matched = BADGE_DEFINITIONS[0];
  // Sequential rank unlock rule: previous rank MUST be unlocked first & BOTH score + stages met
  for (let i = 1; i < BADGE_DEFINITIONS.length; i++) {
    const b = BADGE_DEFINITIONS[i];
    if (score >= b.reqScore && completedStagesCount >= b.reqStages) {
      matched = b;
    } else {
      break; // Sequential rank chain stops if requirements not met
    }
  }
  return matched;
}

// ─────────────────────────────────────────────
// Guest Mode Helpers (localStorage only)
// ─────────────────────────────────────────────

export function createDefaultChapterProgress() {
  return {
    chapter1: { unlocked: true, completedSegments: 0, completed: false },
    chapter2: { unlocked: false, completedSegments: 0, completed: false },
    chapter3: { unlocked: false, completedSegments: 0, completed: false },
    chapter4: { unlocked: false, completedSegments: 0, completed: false },
    chapter5: { unlocked: false, completedSegments: 0, completed: false },
  };
}

export function isUserAdmin(user) {
  if (!user) return false;
  if (user.isAdmin) return true;
  const u = (user.username || user.fullname || user.name || '').toLowerCase().trim();
  return u === 'fikran02' || u === 'admin';
}

export function normalizeUserProgress(user) {
  if (!user) return user;

  const isAdmin = isUserAdmin(user);
  if (isAdmin) {
    user.isAdmin = true;
    user.fullname = 'Admin';
  }

  if (!user.progress) {
    user.progress = createDefaultChapterProgress();
  }

  const defaultProg = createDefaultChapterProgress();
  const normalized = {};

  for (let i = 1; i <= 5; i++) {
    const chKey = `chapter${i}`;
    const subKey = `subbab${i}`;

    const chData = user.progress[chKey] || {};
    const subData = user.progress[subKey] || {};

    // Determine stars and completed segments
    const starsObj = chData.stars || subData.stars || {};
    const starsCount = Object.keys(starsObj).length;
    const completedSegs = Math.max(
      typeof chData.completedSegments === 'number' ? chData.completedSegments : 0,
      starsCount
    );

    const maxSegs = CHAPTER_TOTAL_SEGS[i] || 10;
    const isCompleted = Boolean(
      chData.completed ||
      subData.isStage21Completed ||
      completedSegs >= maxSegs
    );

    // Chapter 1 is always unlocked; subsequent unlock if explicitly unlocked, previous is completed, or user is admin
    const isUnlocked = Boolean(
      isAdmin ||
      i === 1 ||
      chData.unlocked ||
      subData.unlocked ||
      (i > 1 && normalized[`chapter${i - 1}`]?.completed)
    );

    normalized[chKey] = {
      unlocked: isUnlocked,
      completedSegments: completedSegs,
      completed: isCompleted,
      currentStage: Math.max(chData.currentStage || 1, subData.currentStage || 1, completedSegs + 1),
      stars: starsObj,
    };

    // Also mirror to subbabKey for backward/backend compatibility
    normalized[subKey] = {
      unlocked: isUnlocked,
      currentStage: normalized[chKey].currentStage,
      stars: starsObj,
      isStage21Completed: isCompleted,
    };
  }

  user.progress = normalized;
  return user;
}

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
    progress: createDefaultChapterProgress(),
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
      if (completedCount >= b.reqStages && (b.reqScore === 0 || score >= b.reqScore)) {
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
    for (let i = 1; i <= 5; i++) {
      const ch = userProgress[`chapter${i}`] || userProgress[`subbab${i}`];
      if (ch) {
        const segs = typeof ch.completedSegments === 'number' ? ch.completedSegments : 0;
        const stars = ch.stars ? Object.keys(ch.stars).length : 0;
        count += Math.max(segs, stars);
      }
    }
  } catch {}
  return count;
}

// ─────────────────────────────────────────────
// Local Users DB Helpers (offline/fallback)
// ─────────────────────────────────────────────

const LOCAL_USERS_DB_KEY = 'detektif_local_users_db';

function getLocalUsersDB() {
  try {
    const data = localStorage.getItem(LOCAL_USERS_DB_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveLocalUsersDB(db) {
  try {
    localStorage.setItem(LOCAL_USERS_DB_KEY, JSON.stringify(db));
  } catch {}
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
    const normalized = normalizeUserProgress(user);
    this._cachedUser = normalized;
    try {
      if (normalized) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalized));
        if (!normalized._isGuest && normalized.username) {
          saveAccountToList(normalized.username, normalized.fullname);
        }
      }
    } catch {}
  },

  saveUser(user) {
    if (!user) return;
    this.setCurrentUser(user);
    if (!user._isGuest && user.username) {
      try {
        const localUsers = getLocalUsersDB();
        const cleanKey = user.username.trim().toLowerCase();
        localUsers[cleanKey] = {
          ...(localUsers[cleanKey] || {}),
          ...user,
          hasUnsyncedData: user.hasUnsyncedData !== undefined ? user.hasUnsyncedData : (localUsers[cleanKey]?.hasUnsyncedData || false),
        };
        saveLocalUsersDB(localUsers);
      } catch (e) {
        console.warn('saveUser local db error:', e);
      }
    }
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
          const isFikran = (result.data.username?.toLowerCase() === 'fikran02' || result.data.fullname?.toLowerCase() === 'admin');
          const user = {
            username: result.data.username,
            fullname: isFikran ? 'Admin' : result.data.fullname,
            isAdmin: isFikran || Boolean(result.data.isAdmin),
            totalScore: result.data.totalScore,
            endlessHighScore: result.data.endlessHighScore,
            unlockedBadges: result.data.unlockedBadges,
            progress: result.data.progress,
            _isGuest: false,
          };
          this.setCurrentUser(user);

          // Flush any offline queue in background
          setTimeout(() => this.syncPendingDataToServer(), 1200);
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

        // Try syncing pending data in background if server becomes reachable
        setTimeout(() => this.syncPendingDataToServer(), 1500);
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
        // Save to account list so user appears in Pilih Akun
        saveAccountToList(user.username, user.fullname);
        this.setCurrentUser(user);
        return { success: true, user };
      }
      // API registration succeeded but no progress yet — build minimal user
      const minUser = {
        username: username.trim(),
        fullname: fullname.trim() || username.trim(),
        totalScore: 0,
        endlessHighScore: 0,
        unlockedBadges: ['badge1'],
        progress: createDefaultChapterProgress(),
        _isGuest: false,
      };
      saveAccountToList(minUser.username, minUser.fullname);
      this.setCurrentUser(minUser);
      setTimeout(() => this.syncPendingDataToServer(), 800);
      return { success: true, user: minUser };
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
      progress: createDefaultChapterProgress(),
      _isGuest: false,
      hasUnsyncedData: true,
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

      const isFikran = (username.trim().toLowerCase() === 'fikran02' || result.data?.user?.name?.toLowerCase() === 'admin');
      const user = {
        username: progressData?.username || username.trim(),
        fullname: isFikran ? 'Admin' : (progressData?.fullname || result.data?.user?.name || username.trim()),
        isAdmin: isFikran || Boolean(progressData?.isAdmin),
        totalScore: progressData?.totalScore || 0,
        endlessHighScore: progressData?.endlessHighScore || 0,
        unlockedBadges: progressData?.unlockedBadges || ['badge1'],
        progress: progressData?.progress || createDefaultChapterProgress(),
        _isGuest: false,
      };

      this.setCurrentUser(user);
      setTimeout(() => this.syncPendingDataToServer(), 800);
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
      setTimeout(() => this.syncPendingDataToServer(), 1200);
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
    const subbabId = parseInt(subbabKey.toString().replace('chapter', '').replace('subbab', ''), 10);
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
    if (!userCopy.progress) userCopy.progress = createDefaultChapterProgress();

    const chKey = subbabKey.startsWith('chapter') ? subbabKey : `chapter${subbabKey.replace('subbab', '')}`;
    const chNum = parseInt(chKey.replace('chapter', ''), 10) || 1;

    if (!userCopy.progress[chKey]) {
      userCopy.progress[chKey] = { unlocked: true, completedSegments: 0, completed: false, stars: {} };
    }

    const ch = userCopy.progress[chKey];
    ch.completedSegments = Math.max(ch.completedSegments || 0, stageNum);
    if (!ch.stars) ch.stars = {};
    ch.stars[String(stageNum)] = starsEarned || 3;

    const maxSegs = CHAPTER_TOTAL_SEGS[chNum] || 10;
    if (stageNum >= maxSegs) {
      ch.completed = true;
      if (chNum < 5) {
        const nextKey = `chapter${chNum + 1}`;
        if (!userCopy.progress[nextKey]) {
          userCopy.progress[nextKey] = { unlocked: true, completedSegments: 0, completed: false, stars: {} };
        } else {
          userCopy.progress[nextKey].unlocked = true;
        }
      }
    }

    userCopy.totalScore = (userCopy.totalScore || 0) + scoreEarned;
    userCopy.hasUnsyncedData = !isGuest(userCopy);

    const { user: updatedUser, newBadges } = evaluateGuestBadges(userCopy);
    updatedUser.hasUnsyncedData = !isGuest(updatedUser);
    this.saveUser(updatedUser);
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
    try {
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
            hasUnsyncedData: false,
          };
          this.setCurrentUser(updatedUser);
          return;
        }
      }
    } catch {
      currentUser.hasUnsyncedData = true;
      this.saveUser(currentUser);
    }
  },

  // ── Quest Mode Exam Score ──

  async recordQuestExamResult(subbabId, examData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const chapterKey = `chapter${subbabId}`;
    const scoreVal = Math.min(100, Math.max(0, Math.round(examData.score || 0)));
    const pointsEarned = examData.pointsEarned || 0;

    // 1. Update state locally
    const userCopy = JSON.parse(JSON.stringify(currentUser));
    if (!userCopy.questScores) userCopy.questScores = {};
    userCopy.questScores[subbabId] = {
      score: scoreVal,
      correctCount: examData.correctCount,
      totalQuestions: examData.totalQuestions || 30,
      pointsEarned,
      timeRemainingSeconds: examData.timeRemainingSeconds || 0,
      completedAt: new Date().toISOString(),
    };

    userCopy.totalScore = (userCopy.totalScore || 0) + pointsEarned;
    userCopy.hasUnsyncedData = !isGuest(userCopy);

    // Unlock next chapter if subbabId < 5
    if (subbabId < 5) {
      const nextKey = `chapter${subbabId + 1}`;
      if (!userCopy.progress[nextKey]) {
        userCopy.progress[nextKey] = { unlocked: true, completedSegments: 0, completed: false };
      } else {
        userCopy.progress[nextKey].unlocked = true;
      }
    }

    if (!userCopy.progress[chapterKey]) {
      userCopy.progress[chapterKey] = { unlocked: true, completedSegments: 10, completed: true };
    } else {
      userCopy.progress[chapterKey].completed = true;
    }

    const { user: evaluatedUser } = evaluateGuestBadges(userCopy);
    evaluatedUser.hasUnsyncedData = !isGuest(evaluatedUser);
    this.setCurrentUser(evaluatedUser);

    // 2. If authenticated real user, sync with backend API
    if (!isGuest(currentUser)) {
      try {
        await api.submitQuestExamScore(subbabId, {
          score: scoreVal,
          correctCount: examData.correctCount,
          totalQuestions: examData.totalQuestions || 30,
          pointsEarned,
          timeRemainingSeconds: examData.timeRemainingSeconds || 0,
        });

        await api.updateStageProgress(subbabId, 21, pointsEarned, 3);
        evaluatedUser.hasUnsyncedData = false;
      } catch (err) {
        console.warn('[storageService] submitQuestExamScore API call failed, saved locally for auto-sync:', err);
        evaluatedUser.hasUnsyncedData = true;
      }
      this.saveUser(evaluatedUser);
    }

    return evaluatedUser;
  },

  updateUserScore(username, score) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;
    const userCopy = { ...currentUser, totalScore: Math.max(currentUser.totalScore || 0, score) };
    this.setCurrentUser(userCopy);
  },

  // ── Cheat Code ──

  async unlockAllWithCheat(cheatCode) {
    if (cheatCode !== 'fikrangantengbeut123') return null;

    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    if (isGuest(currentUser)) {
      const userCopy = JSON.parse(JSON.stringify(currentUser));
      userCopy.progress = {
        chapter1: { unlocked: true, completedSegments: 10, completed: true },
        chapter2: { unlocked: true, completedSegments: 10, completed: true },
        chapter3: { unlocked: true, completedSegments: 10, completed: true },
        chapter4: { unlocked: true, completedSegments: 10, completed: true },
        chapter5: { unlocked: true, completedSegments: 8, completed: true },
      };
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

  // ── Offline-First Auto Sync ──
  _isSyncing: false,

  async syncPendingDataToServer() {
    if (this._isSyncing) return { success: false, reason: 'in_progress' };

    // Check if network is online and server responds
    const isOnline = await api.checkHealth();
    if (!isOnline) {
      return { success: false, reason: 'offline' };
    }

    this._isSyncing = true;
    try {
      const localUsers = getLocalUsersDB();
      const usersToSync = [];

      for (const [cleanKey, uData] of Object.entries(localUsers)) {
        if (!uData || isGuest(uData)) continue;
        if (
          uData.hasUnsyncedData ||
          (uData.totalScore && uData.totalScore > 0) ||
          (uData.questScores && Object.keys(uData.questScores).length > 0)
        ) {
          usersToSync.push({
            username: uData.username,
            fullname: uData.fullname || uData.username,
            password: uData.password || undefined,
            totalScore: uData.totalScore || 0,
            endlessHighScore: uData.endlessHighScore || 0,
            progress: uData.progress,
            questScores: uData.questScores,
            unlockedBadges: uData.unlockedBadges,
          });
        }
      }

      const currentUser = this.getCurrentUser();
      if (currentUser && !isGuest(currentUser) && currentUser.hasUnsyncedData) {
        const currentKey = currentUser.username.trim().toLowerCase();
        if (!usersToSync.some(u => u.username.toLowerCase() === currentKey)) {
          usersToSync.push({
            username: currentUser.username,
            fullname: currentUser.fullname || currentUser.username,
            totalScore: currentUser.totalScore || 0,
            endlessHighScore: currentUser.endlessHighScore || 0,
            progress: currentUser.progress,
            questScores: currentUser.questScores,
            unlockedBadges: currentUser.unlockedBadges,
          });
        }
      }

      if (usersToSync.length === 0) {
        this._isSyncing = false;
        return { success: true, count: 0 };
      }

      console.log(`[storageService] 🔄 Mengirim ${usersToSync.length} akun/data siswa offline ke server...`);
      const res = await api.syncOfflineData(usersToSync);

      if (res.success) {
        console.log('[storageService] ✅ Semua data offline di komputer siswa berhasil masuk ke server!', res);

        usersToSync.forEach(u => {
          const key = u.username.trim().toLowerCase();
          if (localUsers[key]) {
            localUsers[key].hasUnsyncedData = false;
          }
        });
        saveLocalUsersDB(localUsers);

        if (currentUser && !isGuest(currentUser)) {
          currentUser.hasUnsyncedData = false;
          this.setCurrentUser(currentUser);
        }

        this._isSyncing = false;
        return { success: true, count: usersToSync.length };
      } else {
        console.warn('[storageService] Gagal sinkronisasi data offline:', res.error);
        this._isSyncing = false;
        return { success: false, error: res.error };
      }
    } catch (err) {
      console.error('[storageService] syncPendingDataToServer exception:', err);
      this._isSyncing = false;
      return { success: false, error: err };
    }
  },
};

// ─────────────────────────────────────────────
// Auto-Sync Event Triggers
// ─────────────────────────────────────────────
if (typeof window !== 'undefined') {
  // 1. Auto-sync whenever network status transitions from offline to online
  networkStatusService.subscribe((isOnline) => {
    if (isOnline) {
      storageService.syncPendingDataToServer();
    }
  });

  // 2. Background heartbeat sync every 20 seconds
  setInterval(() => {
    if (networkStatusService.isOnline) {
      storageService.syncPendingDataToServer();
    }
  }, 20000);
}
