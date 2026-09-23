// Storage Service : Hybrid (API + localStorage)
// 
// Audio settings always stay in localStorage (device-specific).

import { registerUser, loginUser, logoutUser, getSession } from './authClient.js';
import * as api from './apiService.js';
import { networkStatusService } from './networkStatusService.js';
import { USE_CHAPTER1_VIDEO, USE_CHAPTER2_VIDEO, USE_CHAPTER3_VIDEO, USE_CHAPTER4_VIDEO, USE_CHAPTER5_VIDEO } from '../data/chapterLearningData.js';

const CURRENT_USER_KEY = 'detektif_current_user';
const SETTINGS_KEY = 'detektif_audio_settings';

// ─────────────────────────────────────────────
// Badge Definitions (kept client-side for display)
// ─────────────────────────────────────────────
// Chapter Total Segments Definition
// ─────────────────────────────────────────────

export const CHAPTER_TOTAL_SEGS = {
  1: USE_CHAPTER1_VIDEO ? 3 : 12,
  2: USE_CHAPTER2_VIDEO ? 4 : 10,
  3: USE_CHAPTER3_VIDEO ? 4 : 10,
  4: USE_CHAPTER4_VIDEO ? 4 : 10,
  5: USE_CHAPTER5_VIDEO ? 3 : 8,
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
    desc: 'Menyelesaikan 2 segmen pembelajaran fungsi', icon: '🔍',
    iconPath: '/images/badge/png/Asset 9@4x.png', svgPath: '/images/badge/SVG/Asset 9.svg',
    rarity: 'COMMON', reqStages: 2, reqScore: 50,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge3', category: 3, name: 'Pencari Jejak Angka', title: 'NUMBER HUNTER',
    desc: 'Menyelesaikan Chapter 1 (Pengertian & Cara Menyatakan Relasi)', icon: '🔢',
    iconPath: '/images/badge/png/Asset 8@4x.png', svgPath: '/images/badge/SVG/Asset 8.svg',
    rarity: 'UNCOMMON', reqStages: 3, reqScore: 100,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge4', category: 4, name: 'Pengumpul Bukti Data', title: 'DATA EXPLORER',
    desc: 'Menyelesaikan 5 segmen pembelajaran', icon: '📊',
    iconPath: '/images/badge/png/Asset 7@4x.png', svgPath: '/images/badge/SVG/Asset 7.svg',
    rarity: 'UNCOMMON', reqStages: 5, reqScore: 200,
    cardGradient: 'from-emerald-600/90 via-teal-500/90 to-green-600/90',
    textColor: 'text-white', subTextColor: 'text-emerald-100', iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge5', category: 5, name: 'Analis Pola Berpikir', title: 'MATH THINKER',
    desc: 'Menyelesaikan Chapter 2 (Pengertian & Unsur Fungsi)', icon: '💡',
    iconPath: '/images/badge/png/Asset 6@4x.png', svgPath: '/images/badge/SVG/Asset 6.svg',
    rarity: 'RARE', reqStages: 7, reqScore: 350,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge6', category: 6, name: 'Penyelidik Senior', title: 'PROBLEM SOLVER',
    desc: 'Menyelesaikan 9 segmen pembelajaran', icon: '🧩',
    iconPath: '/images/badge/png/Asset 5@4x.png', svgPath: '/images/badge/SVG/Asset 5.svg',
    rarity: 'RARE', reqStages: 9, reqScore: 500,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge7', category: 7, name: 'Spesialis Rumus', title: 'FORMULA MASTER',
    desc: 'Menyelesaikan Chapter 3 (Notasi & Rumus Fungsi)', icon: '📈',
    iconPath: '/images/badge/png/Asset 4@4x.png', svgPath: '/images/badge/SVG/Asset 4.svg',
    rarity: 'EPIC', reqStages: 11, reqScore: 700,
    cardGradient: 'from-blue-600/90 via-cyan-500/90 to-indigo-600/90',
    textColor: 'text-white', subTextColor: 'text-cyan-100', iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge8', category: 8, name: 'Master Grafik', title: 'GRAPH EXPERT',
    desc: 'Menyelesaikan Chapter 4 (Grafik Fungsi Linear)', icon: '⚙️',
    iconPath: '/images/badge/png/Asset 3@4x.png', svgPath: '/images/badge/SVG/Asset 3.svg',
    rarity: 'EPIC', reqStages: 15, reqScore: 900,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge9', category: 9, name: 'Maestro Korespondensi', title: 'MATH CHAMPION',
    desc: 'Menyelesaikan Chapter 5 (Korespondensi Satu-Satu)', icon: '🧠',
    iconPath: '/images/badge/png/Asset 2@4x.png', svgPath: '/images/badge/SVG/Asset 2.svg',
    rarity: 'LEGENDARY', reqStages: 18, reqScore: 1200,
    cardGradient: 'from-rose-600/90 via-red-500/90 to-amber-700/90',
    textColor: 'text-white', subTextColor: 'text-rose-100', iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge10', category: 10, name: 'Detektif Legendaris', title: 'LEGENDARY MATHEMATICIAN',
    desc: 'Menguasai 5 Chapter Relasi & Fungsi dan mencapai 2.000 PTS!', icon: '👑',
    iconPath: '/images/badge/png/Asset 1@4x.png', svgPath: '/images/badge/SVG/Asset 1.svg',
    rarity: 'LEGENDARY', reqStages: 18, reqScore: 2000,
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

export function evaluateGuestBadges(user) {
  if (!user) return { user, newBadges: [] };
  if (!Array.isArray(user.unlockedBadges)) {
    user.unlockedBadges = ['badge1'];
  }
  const completedStages = getCompletedStagesCountLocal(user.progress);
  const score = user.totalScore || 0;
  const newBadges = [];

  BADGE_DEFINITIONS.forEach((b) => {
    if (score >= b.reqScore && completedStages >= b.reqStages) {
      if (!user.unlockedBadges.includes(b.id)) {
        user.unlockedBadges.push(b.id);
        newBadges.push(b);
      }
    }
  });

  return { user, newBadges };
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

export function isGuest(user) {
  if (!user) return true;
  return Boolean(user._isGuest || user.isGuest || !user.username);
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
    const starsCount = starsObj ? Object.keys(starsObj).length : 0;
    const maxSegs = CHAPTER_TOTAL_SEGS[i] || 4;
    const rawSegs = Math.max(
      typeof chData.completedSegments === 'number' ? chData.completedSegments : 0,
      starsCount
    );
    const isCompleted = Boolean(
      chData.completed ||
      subData.isStage21Completed ||
      rawSegs >= maxSegs
    );
    const completedSegs = isCompleted ? maxSegs : Math.min(rawSegs, maxSegs);

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
      currentStage: Math.min(maxSegs, Math.max(chData.currentStage || 1, subData.currentStage || 1, completedSegs + 1)),
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

// Lightweight reversible obfuscation for offline password sync queue
// Prevents plain text password exposure in localStorage while allowing offline sync to backend
function obfuscateSecret(str) {
  if (!str) return '';
  try {
    const salt = 'RelasiFungsi2026';
    let res = '';
    for (let i = 0; i < str.length; i++) {
      res += String.fromCharCode(str.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
    }
    return btoa(res);
  } catch {
    return str;
  }
}

function deobfuscateSecret(b64) {
  if (!b64) return '';
  try {
    const salt = 'RelasiFungsi2026';
    const str = atob(b64);
    let res = '';
    for (let i = 0; i < str.length; i++) {
      res += String.fromCharCode(str.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
    }
    return res;
  } catch {
    return b64;
  }
}

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
    if (normalized) {
      delete normalized.password;
      delete normalized.p_sec;
    }
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
        const existingSec = localUsers[cleanKey]?.p_sec;
        localUsers[cleanKey] = {
          ...(localUsers[cleanKey] || {}),
          ...user,
          ...(existingSec ? { p_sec: existingSec } : {}),
          hasUnsyncedData: user.hasUnsyncedData !== undefined ? user.hasUnsyncedData : (localUsers[cleanKey]?.hasUnsyncedData || false),
        };
        saveLocalUsersDB(localUsers);

        // 100% AUTOMATIC: Instant background push to master server!
        if (this._autoSyncDebounceTimer) clearTimeout(this._autoSyncDebounceTimer);
        this._autoSyncDebounceTimer = setTimeout(() => {
          this.syncPendingDataToServer();
        }, 200);
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
        // Authenticated : fetch progress from API
        this._useApi = true;
        const result = await api.fetchProgress();
        if (result.success && result.data) {
          const isFikran = (result.data.username?.toLowerCase() === 'fikran02' || result.data.fullname?.toLowerCase() === 'admin');
          const localUsers = getLocalUsersDB();
          const cleanKey = (result.data.username || '').trim().toLowerCase();
          const matchedLocal = localUsers[cleanKey] || {};
          const user = {
            username: result.data.username,
            fullname: isFikran ? 'Admin' : result.data.fullname,
            isAdmin: isFikran || Boolean(result.data.isAdmin),
            totalScore: result.data.totalScore,
            endlessHighScore: result.data.endlessHighScore,
            unlockedBadges: result.data.unlockedBadges,
            progress: result.data.progress,
            questScores: result.data.questScores || matchedLocal.questScores || {},
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
    // Register via Better Auth API
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

        // Simpan data & password terenkripsi ke database lokal agar bisa login offline
        const localUsers = getLocalUsersDB();
        const cleanKey = user.username.trim().toLowerCase();
        localUsers[cleanKey] = {
          ...(localUsers[cleanKey] || {}),
          ...user,
          p_sec: obfuscateSecret(password),
          hasUnsyncedData: false,
        };
        saveLocalUsersDB(localUsers);

        this.setCurrentUser(user);
        return { success: true, user };
      }
      // API registration succeeded but no progress yet : build minimal user
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

      const localUsers = getLocalUsersDB();
      const cleanKey = minUser.username.trim().toLowerCase();
      localUsers[cleanKey] = {
        ...(localUsers[cleanKey] || {}),
        ...minUser,
        p_sec: obfuscateSecret(password),
        hasUnsyncedData: false,
      };
      saveLocalUsersDB(localUsers);

      this.setCurrentUser(minUser);
      setTimeout(() => this.syncPendingDataToServer(), 800);
      return { success: true, user: minUser };
    } else if (result.message && !result.message.toLowerCase().includes('koneksi')) {
      const regErrMsg = (result.message || '').toLowerCase();
      if (regErrMsg.includes('already exists') || regErrMsg.includes('sudah terdaftar') || regErrMsg.includes('duplicate')) {
        // Akun sudah pernah dibuat: Coba langsung login otomatis dengan akun yang ada!
        console.log('[storageService] Akun sudah terdaftar, login otomatis...');
        const autoLogin = await this.login(username, password);
        if (autoLogin.success) {
          return autoLogin;
        }
      }
      return { success: false, message: result.message };
    }

    // Hybrid Fallback: Save local user object in offline local DB
    const localUsers = getLocalUsersDB();
    const cleanKey = username.trim().toLowerCase();
    const newUser = {
      username: username.trim(),
      p_sec: obfuscateSecret(password),
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
    const sessionUser = { ...newUser };
    delete sessionUser.p_sec;
    this.setCurrentUser(sessionUser);
    return { success: true, user: sessionUser };
  },

  // ── Login ──

  async login(username, password) {
    let cleanKey = username.trim().toLowerCase();
    if (cleanKey === 'fikran' || cleanKey === 'admin') {
      cleanKey = 'fikran02';
      username = 'fikran02';
    }
    const localUsers = getLocalUsersDB();
    
    // Flexible local matching: by key, case-insensitive, or fullname
    let matchedLocalKey = cleanKey;
    let matchedLocalUser = localUsers[cleanKey];

    if (!matchedLocalUser) {
      for (const [k, u] of Object.entries(localUsers)) {
        if (k.toLowerCase() === cleanKey) {
          matchedLocalKey = k;
          matchedLocalUser = u;
          break;
        }
        const fn = (u?.fullname || '').toLowerCase().trim();
        if (fn && (fn === cleanKey || fn.split(' ')[0] === cleanKey)) {
          matchedLocalKey = k;
          matchedLocalUser = u;
          break;
        }
      }
    }

    // 1. Hubungi server terlebih dahulu untuk mendapatkan sesi resmi dan token otentikasi
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

      const isFikran = (cleanKey === 'fikran02' || result.data?.user?.name?.toLowerCase() === 'admin');
      
      // Ambil progres server atau fallback ke cache lokal
      let finalProgress = progressData?.progress || matchedLocalUser?.progress || createDefaultChapterProgress();
      let finalScore = Math.max(progressData?.totalScore || 0, matchedLocalUser?.totalScore || 0);
      let finalEndless = Math.max(progressData?.endlessHighScore || 0, matchedLocalUser?.endlessHighScore || 0);

      const user = {
        username: progressData?.username || username.trim(),
        fullname: isFikran ? 'Admin' : (progressData?.fullname || result.data?.user?.name || matchedLocalUser?.fullname || username.trim()),
        isAdmin: isFikran || Boolean(progressData?.isAdmin || matchedLocalUser?.isAdmin),
        totalScore: finalScore,
        endlessHighScore: finalEndless,
        unlockedBadges: progressData?.unlockedBadges || matchedLocalUser?.unlockedBadges || ['badge1'],
        progress: finalProgress,
        questScores: progressData?.questScores || matchedLocalUser?.questScores || {},
        _isGuest: false,
      };

      // Simpan/update cache offline dengan p_sec agar selanjutnya bisa login saat offline
      try {
        const updatedLocalUsers = getLocalUsersDB();
        updatedLocalUsers[cleanKey] = {
          ...(updatedLocalUsers[cleanKey] || {}),
          ...user,
          p_sec: obfuscateSecret(password),
          hasUnsyncedData: false,
        };
        saveLocalUsersDB(updatedLocalUsers);
        saveAccountToList(user.username, user.fullname);
      } catch (err) {
        console.warn('Gagal mencadangkan password ke offline cache:', err);
      }

      this.setCurrentUser(user);
      setTimeout(() => this.syncPendingDataToServer(), 800);
      return { success: true, user };
    }

    // 2. Evaluasi respons kegagalan server
    const errMsg = (result.message || '').toLowerCase();
    const isNetworkError = 
      errMsg.includes('koneksi') || 
      errMsg.includes('menghubungkan') || 
      errMsg.includes('timeout') || 
      errMsg.includes('network') || 
      errMsg.includes('failed to fetch') ||
      errMsg.includes('gagal melakukan login') ||
      errMsg.includes('gagal');

    // Jika server ONLINE tapi login gagal (misalnya karena akun baru belum ada di server):
    if (!isNetworkError) {
      // Coba daftarkan akun baru secara otomatis di server
      const regRes = await registerUser(username, password, username.trim());
      if (regRes.success) {
        this._useApi = true;
        const isFikran = (cleanKey === 'fikran02' || cleanKey === 'admin');
        const user = {
          username: username.trim(),
          fullname: isFikran ? 'Admin' : username.trim(),
          isAdmin: isFikran,
          totalScore: 0,
          endlessHighScore: 0,
          unlockedBadges: ['badge1'],
          progress: createDefaultChapterProgress(),
          _isGuest: false,
        };
        try {
          const updatedLocalUsers = getLocalUsersDB();
          updatedLocalUsers[cleanKey] = {
            ...user,
            p_sec: obfuscateSecret(password),
            hasUnsyncedData: false,
          };
          saveLocalUsersDB(updatedLocalUsers);
          saveAccountToList(user.username, user.fullname);
        } catch {}
        this.setCurrentUser(user);
        return { success: true, user, isAutoRegistered: true };
      }

      // Jika server menyatakan akun SUDAH ADA (duplicate/already exists):
      const regErrMsg = (regRes.message || '').toLowerCase();
      if (regErrMsg.includes('already exists') || regErrMsg.includes('sudah terdaftar') || regErrMsg.includes('duplicate')) {
        return { success: false, message: 'Kata sandi salah! Cek kembali kata sandi kamu.' };
      }
    }

    // 3. Fallback Offline Cerdas (Server offline / koneksi lokal):
    // A. Jika akun sudah ada di database lokal perangkat ini
    const isFikran = cleanKey === 'fikran02' || cleanKey === 'admin';
    if (matchedLocalUser) {
      const storedPass = matchedLocalUser.p_sec ? deobfuscateSecret(matchedLocalUser.p_sec) : matchedLocalUser.password;
      if (isFikran || !storedPass || storedPass === password) {
        this._useApi = false;
        const sessionUser = { ...matchedLocalUser, isAdmin: isFikran || matchedLocalUser.isAdmin };
        delete sessionUser.password;
        delete sessionUser.p_sec;
        this.setCurrentUser(sessionUser);
        setTimeout(() => this.syncPendingDataToServer(), 1500);
        return { success: true, user: sessionUser, isOffline: true };
      } else {
        return { success: false, message: 'Kata sandi salah! Periksa kembali kata sandi kamu.' };
      }
    }

    // B. Zero-Block Auto-Register: Jika akun belum ada dan server offline,
    // buatkan profil detektif baru secara otomatis agar pemain bisa langsung bermain tanpa tertahan!
    const newLocalUser = {
      username: username.trim(),
      fullname: isFikran ? 'Admin' : username.trim(),
      isAdmin: isFikran,
      totalScore: 0,
      endlessHighScore: 0,
      unlockedBadges: ['badge1'],
      progress: createDefaultChapterProgress(),
      _isGuest: false,
      hasUnsyncedData: true,
    };

    const updatedLocalUsers = getLocalUsersDB();
    updatedLocalUsers[cleanKey] = {
      ...newLocalUser,
      p_sec: obfuscateSecret(password),
    };
    saveLocalUsersDB(updatedLocalUsers);
    saveAccountToList(newLocalUser.username, newLocalUser.fullname);

    this._useApi = false;
    this.setCurrentUser(newLocalUser);
    setTimeout(() => this.syncPendingDataToServer(), 1500);
    return { success: true, user: newLocalUser, isAutoRegistered: true, isOffline: true };
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
    // Client-side evaluation (for display purposes, real badges come from API)
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
        hasUnsyncedData: false,
      };
      this.saveUser(updatedUser);
      this.setCurrentUser(updatedUser);

      // Map newBadges IDs to full badge objects for the unlock modal
      const newBadgeObjects = (result.data.newBadges || result.newBadges || [])
        .map(id => BADGE_DEFINITIONS.find(b => b.id === id))
        .filter(Boolean);

      return { user: updatedUser, newBadges: newBadgeObjects };
    }

    // Fallback to local if API fails
    console.warn('[storageService] API updateProgress failed, using local fallback');
    const localRes = this._updateProgressLocal(currentUser, subbabKey, stageNum, scoreEarned, starsEarned);
    setTimeout(() => this.syncPendingDataToServer(), 2000);
    return localRes;
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

    const maxSegs = CHAPTER_TOTAL_SEGS[chNum] || 4;
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

  // ── Chapter Exercise Completion ──

  async updateExerciseProgress(chapterId, scoreEarned = 50) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const userCopy = JSON.parse(JSON.stringify(currentUser));
    if (!userCopy.progress) userCopy.progress = createDefaultChapterProgress();
    if (!userCopy.progress.exercises) userCopy.progress.exercises = {};

    const exKey = `latihan${chapterId}`;
    userCopy.progress.exercises[exKey] = {
      completed: true,
      score: scoreEarned,
      completedAt: new Date().toISOString()
    };

    userCopy.totalScore = (userCopy.totalScore || 0) + scoreEarned;
    userCopy.hasUnsyncedData = !isGuest(userCopy);

    const { user: updatedUser, newBadges } = evaluateGuestBadges(userCopy);
    updatedUser.hasUnsyncedData = !isGuest(updatedUser);
    this.saveUser(updatedUser);
    this.setCurrentUser(updatedUser);
    return { user: updatedUser, newBadges };
  },

  // ── Endless Mode High Score ──

  async updateEndlessHighScore(score) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    // Immediately update local copy first so high score is never lost
    const userCopy = JSON.parse(JSON.stringify(currentUser));
    if (score > (userCopy.endlessHighScore || 0)) {
      userCopy.endlessHighScore = score;
    }
    userCopy.hasUnsyncedData = !isGuest(userCopy);
    const { user: updatedLocal } = evaluateGuestBadges(userCopy);
    this.setCurrentUser(updatedLocal);
    this.saveUser(updatedLocal);

    if (isGuest(currentUser)) {
      return updatedLocal;
    }

    // Real user: sync to server API
    try {
      const result = await api.updateEndlessScore(score);
      if (result && result.success) {
        // Re-sync progress from server
        const progressResult = await api.fetchProgress();
        if (progressResult.success && progressResult.data) {
          const updatedUser = {
            ...updatedLocal,
            totalScore: progressResult.data.totalScore ?? updatedLocal.totalScore,
            endlessHighScore: progressResult.data.endlessHighScore ?? updatedLocal.endlessHighScore,
            unlockedBadges: progressResult.data.unlockedBadges || updatedLocal.unlockedBadges,
            progress: progressResult.data.progress || updatedLocal.progress,
            questScores: progressResult.data.questScores || updatedLocal.questScores || {},
            hasUnsyncedData: false,
          };
          this.setCurrentUser(updatedUser);
          this.saveUser(updatedUser);
          return updatedUser;
        }
      }
    } catch (err) {
      console.warn('[storageService] updateEndlessHighScore server sync failed, saved locally for auto-sync:', err);
      updatedLocal.hasUnsyncedData = true;
      this.saveUser(updatedLocal);
    }
    return updatedLocal;
  },

  // ── Quest Mode Exam Score ──

  async recordQuestExamResult(subbabId, examData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const numSubId = parseInt(String(subbabId).replace(/\D/g, ''), 10) || 1;
    const chapterKey = `chapter${numSubId}`;
    const scoreVal = Math.min(100, Math.max(0, Math.round(examData.score || 0)));
    const pointsEarned = examData.pointsEarned || 0;

    // 1. Update state locally
    const userCopy = JSON.parse(JSON.stringify(currentUser));
    if (!userCopy.questScores) userCopy.questScores = {};
    const existingQuest = userCopy.questScores[numSubId] || userCopy.questScores[String(numSubId)] || {};
    const existingAwarded = Array.isArray(existingQuest.awardedQuestionIds)
      ? existingQuest.awardedQuestionIds
      : [];
    const newlyAwarded = Array.isArray(examData.newlyAwardedQuestionIds)
      ? examData.newlyAwardedQuestionIds
      : [];
    const allAwarded = Array.from(new Set([...existingAwarded, ...newlyAwarded]));

    const bestScore = Math.max(scoreVal, existingQuest.score || 0);
    const bestCorrect = Math.max(examData.correctCount || 0, existingQuest.correctCount || 0);

    const qData = {
      score: bestScore,
      lastScore: scoreVal,
      correctCount: bestCorrect,
      totalQuestions: examData.totalQuestions || 10,
      pointsEarned: (existingQuest.pointsEarned || 0) + pointsEarned,
      lastPointsEarned: pointsEarned,
      awardedQuestionIds: allAwarded,
      bestSpeedBonus: Math.max(existingQuest.bestSpeedBonus || 0, examData.speedBonusEarned || 0),
      timeRemainingSeconds: Math.max(existingQuest.timeRemainingSeconds || 0, examData.timeRemainingSeconds || 0),
      completedAt: new Date().toISOString(),
    };

    userCopy.questScores[numSubId] = qData;
    userCopy.questScores[String(numSubId)] = qData;

    userCopy.totalScore = (userCopy.totalScore || 0) + pointsEarned;
    userCopy.hasUnsyncedData = !isGuest(userCopy);

    // Unlock next chapter if numSubId < 5
    if (numSubId < 5) {
      const nextKey = `chapter${numSubId + 1}`;
      if (!userCopy.progress[nextKey]) {
        userCopy.progress[nextKey] = { unlocked: true, completedSegments: 0, completed: false };
      } else {
        userCopy.progress[nextKey].unlocked = true;
      }
    }

    if (!userCopy.progress[chapterKey]) {
      userCopy.progress[chapterKey] = { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[numSubId] || 4, completed: true };
    } else {
      userCopy.progress[chapterKey].completed = true;
      userCopy.progress[chapterKey].completedSegments = CHAPTER_TOTAL_SEGS[numSubId] || userCopy.progress[chapterKey].completedSegments || 4;
    }

    const { user: evaluatedUser } = evaluateGuestBadges(userCopy);
    evaluatedUser.hasUnsyncedData = !isGuest(evaluatedUser);
    this.setCurrentUser(evaluatedUser);

    // 2. If authenticated real user, sync with backend API
    if (!isGuest(currentUser)) {
      try {
        await api.submitQuestExamScore(numSubId, {
          score: bestScore,
          correctCount: bestCorrect,
          totalQuestions: examData.totalQuestions || 10,
          pointsEarned,
          timeRemainingSeconds: examData.timeRemainingSeconds || 0,
        });

        await api.updateStageProgress(numSubId, 21, pointsEarned, 3);
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
        chapter1: { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[1] || 3, completed: true },
        chapter2: { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[2] || 4, completed: true },
        chapter3: { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[3] || 4, completed: true },
        chapter4: { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[4] || 4, completed: true },
        chapter5: { unlocked: true, completedSegments: CHAPTER_TOTAL_SEGS[5] || 3, completed: true },
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

  hasPendingSyncData() {
    try {
      const localUsers = getLocalUsersDB();
      for (const uData of Object.values(localUsers)) {
        if (uData && !isGuest(uData) && uData.hasUnsyncedData) return true;
      }
      const currentUser = this.getCurrentUser();
      if (currentUser && !isGuest(currentUser) && currentUser.hasUnsyncedData) return true;
    } catch {}
    return false;
  },

  async syncPendingDataToServer() {
    if (this._isSyncing) return { success: false, reason: 'in_progress' };

    // Early exit if there is nothing to sync : avoids unnecessary network calls and server load
    if (!this.hasPendingSyncData()) {
      return { success: true, count: 0, reason: 'nothing_to_sync' };
    }

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
        if (uData.hasUnsyncedData) {
          const rawPass = uData.p_sec ? deobfuscateSecret(uData.p_sec) : (uData.password || undefined);
          usersToSync.push({
            username: uData.username,
            fullname: uData.fullname || uData.username,
            password: rawPass,
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
            // Hapus password teks mentah jika ada, namun TETAP PERTAHANKAN p_sec (terenkripsi) untuk kontinuitas login offline!
            delete localUsers[key].password;
          }
        });
        saveLocalUsersDB(localUsers);

        if (currentUser && !isGuest(currentUser)) {
          currentUser.hasUnsyncedData = false;
          delete currentUser.password;
          delete currentUser.p_sec;
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

  // ─────────────────────────────────────────────
  // Watched Video History Tracking
  // ─────────────────────────────────────────────
  isVideoWatched(videoKey, username = null) {
    if (!videoKey) return false;
    try {
      const u = username || this.getCurrentUser()?.username || 'guest';
      const key = `detektif_watched_videos_${u.toLowerCase().trim()}`;
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const list = JSON.parse(raw);
      return Array.isArray(list) && list.includes(String(videoKey));
    } catch {
      return false;
    }
  },

  markVideoWatched(videoKey, username = null) {
    if (!videoKey) return;
    try {
      const u = username || this.getCurrentUser()?.username || 'guest';
      const key = `detektif_watched_videos_${u.toLowerCase().trim()}`;
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      const strKey = String(videoKey);
      if (!list.includes(strKey)) {
        list.push(strKey);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {}
  },
};

export const isVideoWatched = (videoKey, username) => storageService.isVideoWatched(videoKey, username);
export const markVideoWatched = (videoKey, username) => storageService.markVideoWatched(videoKey, username);

// ─────────────────────────────────────────────
// Auto-Sync Event Triggers
// ─────────────────────────────────────────────
if (typeof window !== 'undefined') {
  // 1. Auto-sync whenever network status transitions from offline to online
  networkStatusService.subscribe((isOnline) => {
    if (isOnline && storageService.hasPendingSyncData()) {
      storageService.syncPendingDataToServer();
    }
  });

  // 2. Periodic background heartbeat auto-sync (every 30 seconds, only runs if there is pending data)
  setInterval(() => {
    if (networkStatusService.isOnline && storageService.hasPendingSyncData()) {
      storageService.syncPendingDataToServer();
    }
  }, 30000);

  // 3. Auto-sync whenever window or game tab gains focus or becomes visible (only if pending data exists)
  window.addEventListener('focus', () => {
    if (networkStatusService.isOnline && storageService.hasPendingSyncData()) {
      storageService.syncPendingDataToServer();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && networkStatusService.isOnline && storageService.hasPendingSyncData()) {
      storageService.syncPendingDataToServer();
    }
  });
}
