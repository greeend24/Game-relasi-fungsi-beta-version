// Storage Service for Accounts, Progress, 10 Badges System, Leaderboard, and Audio Settings

const USERS_KEY = 'detektif_users';
const CURRENT_USER_KEY = 'detektif_current_user';
const SETTINGS_KEY = 'detektif_audio_settings';

export const BADGE_DEFINITIONS = [
  {
    id: 'badge1',
    category: 1,
    name: 'Detektif Pemula',
    title: 'BEGINNER',
    desc: 'Menyelesaikan stage pertama petualangan relasi',
    icon: '🌱',
    iconPath: '/images/badge/png/Asset 10@4x.png',
    svgPath: '/images/badge/SVG/Asset 10.svg',
    rarity: 'COMMON',
    reqStages: 1,
    reqScore: 0,
    cardGradient: 'from-slate-100 via-white to-slate-200',
    textColor: 'text-[#2D241E]',
    subTextColor: 'text-slate-700',
    iconBg: 'from-slate-200 to-slate-300'
  },
  {
    id: 'badge2',
    category: 2,
    name: 'Detektif Magang',
    title: 'EXPLORER',
    desc: 'Menyelesaikan 6 stage penyelidikan matematika',
    icon: '🔍',
    iconPath: '/images/badge/png/Asset 9@4x.png',
    svgPath: '/images/badge/SVG/Asset 9.svg',
    rarity: 'COMMON',
    reqStages: 6,
    reqScore: 0,
    cardGradient: 'from-emerald-600 via-teal-500 to-green-600',
    textColor: 'text-white',
    subTextColor: 'text-emerald-100',
    iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge3',
    category: 3,
    name: 'Pencari Jejak Angka',
    title: 'NUMBER HUNTER',
    desc: 'Menyelesaikan 16 stage berbasis pola relasi',
    icon: '🔢',
    iconPath: '/images/badge/png/Asset 8@4x.png',
    svgPath: '/images/badge/SVG/Asset 8.svg',
    rarity: 'UNCOMMON',
    reqStages: 16,
    reqScore: 200,
    cardGradient: 'from-emerald-600 via-teal-500 to-green-600',
    textColor: 'text-white',
    subTextColor: 'text-emerald-100',
    iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge4',
    category: 4,
    name: 'Pengumpul Bukti Data',
    title: 'DATA EXPLORER',
    desc: 'Menyelesaikan 31 stage penyelidikan relasi & fungsi',
    icon: '📊',
    iconPath: '/images/badge/png/Asset 7@4x.png',
    svgPath: '/images/badge/SVG/Asset 7.svg',
    rarity: 'UNCOMMON',
    reqStages: 31,
    reqScore: 500,
    cardGradient: 'from-emerald-600 via-teal-500 to-green-600',
    textColor: 'text-white',
    subTextColor: 'text-emerald-100',
    iconBg: 'from-emerald-700 to-teal-800'
  },
  {
    id: 'badge5',
    category: 5,
    name: 'Analis Pola Berpikir',
    title: 'MATH THINKER',
    desc: 'Mencapai total skor di atas 1.000 PTS',
    icon: '💡',
    iconPath: '/images/badge/png/Asset 6@4x.png',
    svgPath: '/images/badge/SVG/Asset 6.svg',
    rarity: 'RARE',
    reqStages: 51,
    reqScore: 1000,
    cardGradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    textColor: 'text-white',
    subTextColor: 'text-cyan-100',
    iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge6',
    category: 6,
    name: 'Penyelidik Senior',
    title: 'PROBLEM SOLVER',
    desc: 'Menyelesaikan 71 stage dengan akurasi tinggi',
    icon: '🧩',
    iconPath: '/images/badge/png/Asset 5@4x.png',
    svgPath: '/images/badge/SVG/Asset 5.svg',
    rarity: 'RARE',
    reqStages: 71,
    reqScore: 1800,
    cardGradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    textColor: 'text-white',
    subTextColor: 'text-cyan-100',
    iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge7',
    category: 7,
    name: 'Spesialis Relasi',
    title: 'RELATIONS MASTER',
    desc: 'Menyelesaikan 91 stage dan menguasai format relasi',
    icon: '🔗',
    iconPath: '/images/badge/png/Asset 4@4x.png',
    svgPath: '/images/badge/SVG/Asset 4.svg',
    rarity: 'EPIC',
    reqStages: 91,
    reqScore: 2600,
    cardGradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    textColor: 'text-white',
    subTextColor: 'text-cyan-100',
    iconBg: 'from-blue-700 to-indigo-800'
  },
  {
    id: 'badge8',
    category: 8,
    name: 'Master Fungsi',
    title: 'FUNCTION EXPERT',
    desc: 'Menyelesaikan 111 stage notasi & rumus fungsi',
    icon: '⚙️',
    iconPath: '/images/badge/png/Asset 3@4x.png',
    svgPath: '/images/badge/SVG/Asset 3.svg',
    rarity: 'EPIC',
    reqStages: 111,
    reqScore: 3400,
    cardGradient: 'from-rose-600 via-red-500 to-amber-700',
    textColor: 'text-white',
    subTextColor: 'text-rose-100',
    iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge9',
    category: 9,
    name: 'Maestro Logika',
    title: 'MATH CHAMPION',
    desc: 'Menyelesaikan 131 stage korespondensi 1-1',
    icon: '🧠',
    iconPath: '/images/badge/png/Asset 2@4x.png',
    svgPath: '/images/badge/SVG/Asset 2.svg',
    rarity: 'LEGENDARY',
    reqStages: 131,
    reqScore: 4000,
    cardGradient: 'from-rose-600 via-red-500 to-amber-700',
    textColor: 'text-white',
    subTextColor: 'text-rose-100',
    iconBg: 'from-rose-700 to-red-800'
  },
  {
    id: 'badge10',
    category: 10,
    name: 'Detektif Legendaris',
    title: 'LEGENDARY MATHEMATICIAN',
    desc: 'Mencapai skor maksimal 4.760 PTS dan menyelesaikan seluruh 147 stage 7 subbab!',
    icon: '👑',
    iconPath: '/images/badge/png/Asset 1@4x.png',
    svgPath: '/images/badge/SVG/Asset 1.svg',
    rarity: 'LEGENDARY',
    reqStages: 147,
    reqScore: 4760,
    cardGradient: 'from-amber-300 via-yellow-400 to-amber-500',
    textColor: 'text-[#2D241E]',
    subTextColor: 'text-amber-950',
    iconBg: 'from-amber-400 to-yellow-300'
  }
];

export function calculateBadge(completedStagesCount = 0, score = 0) {
  let matched = BADGE_DEFINITIONS[0];
  for (const b of BADGE_DEFINITIONS) {
    if (completedStagesCount >= b.reqStages || (b.reqScore > 0 && score >= b.reqScore)) {
      matched = b;
    }
  }
  return matched;
}

export const storageService = {
  getUsers() {
    try {
      const data = localStorage.getItem(USERS_KEY);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed.filter(u => u && typeof u === 'object') : [];
    } catch {
      return [];
    }
  },

  saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {}
  },

  getCurrentUser() {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      const parsed = data ? JSON.parse(data) : null;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    try {
      if (user && typeof user === 'object') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      }
    } catch {}
  },

  getAudioSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) return JSON.parse(data);
    } catch {}
    return {
      masterVol: 80,
      musicVol: 30,
      sfxVol: 70,
      reloVol: 80,
      isMusicOn: true,
      isSfxOn: true,
      isReloOn: true,
      isMuted: false
    };
  },

  saveAudioSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  },

  register(username, password, fullname = '') {
    try {
      const users = this.getUsers();
      if (users.some(u => u?.username && u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: 'Username sudah digunakan!' };
      }

      const newUser = {
        username,
        password,
        fullname: fullname || username,
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
          subbab7: { unlocked: false, currentStage: 1, stars: {} }
        }
      };

      // If registered account is NOT guest, save to persistent storage
      if (username.toLowerCase() !== 'detektif_tamu') {
        users.push(newUser);
        this.saveUsers(users);
      }
      this.setCurrentUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, message: 'Gagal membuat akun!' };
    }
  },

  login(username, password) {
    try {
      const users = this.getUsers();
      const user = users.find(
        u => u?.username && u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (!user) {
        return { success: false, message: 'Username atau password salah!' };
      }

      this.setCurrentUser(user);
      return { success: true, user };
    } catch {
      return { success: false, message: 'Gagal melakukan login!' };
    }
  },

  logout() {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch {}
  },

  getCompletedStagesCount(userProgress) {
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
  },

  evaluateNewBadges(user) {
    if (!user) return { user, newBadges: [] };
    const completedCount = this.getCompletedStagesCount(user.progress);
    const score = user.totalScore || 0;
    const currentUnlocked = new Set(user.unlockedBadges || ['badge1']);
    const newlyUnlocked = [];

    BADGE_DEFINITIONS.forEach(b => {
      if (!currentUnlocked.has(b.id)) {
        if (completedCount >= b.reqStages || (b.reqScore > 0 && score >= b.reqScore)) {
          currentUnlocked.add(b.id);
          newlyUnlocked.push(b);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      user.unlockedBadges = Array.from(currentUnlocked);
    }

    return { user, newBadges: newlyUnlocked };
  },

  updateProgress(subbabKey, stageNum, scoreEarned, starsEarned = 3) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    // GUEST MODE (detektif_tamu): Progress is temporary in memory, NEVER saved to disk!
    if (currentUser.username.toLowerCase() === 'detektif_tamu') {
      const userCopy = JSON.parse(JSON.stringify(currentUser));
      if (!userCopy.progress[subbabKey]) {
        userCopy.progress[subbabKey] = { unlocked: true, currentStage: 1, stars: {} };
      }
      userCopy.progress[subbabKey].stars[stageNum] = starsEarned;
      userCopy.totalScore = (userCopy.totalScore || 0) + scoreEarned;
      if (stageNum >= userCopy.progress[subbabKey].currentStage && stageNum < 21) {
        userCopy.progress[subbabKey].currentStage = stageNum + 1;
      }
      this.setCurrentUser(userCopy);
      return { user: userCopy, newBadges: [] };
    }

    const users = this.getUsers();
    const userIdx = users.findIndex(u => u?.username === currentUser.username);
    if (userIdx === -1) return null;

    const user = users[userIdx];
    if (!user.progress[subbabKey]) {
      user.progress[subbabKey] = { unlocked: true, currentStage: 1, stars: {} };
    }

    const sub = user.progress[subbabKey];
    const prevStars = sub.stars[stageNum] || 0;

    if (starsEarned > prevStars) {
      sub.stars[stageNum] = starsEarned;
      user.totalScore = (user.totalScore || 0) + scoreEarned;
    }

    if (stageNum >= sub.currentStage && stageNum < 21) {
      sub.currentStage = stageNum + 1;
    } else if (stageNum === 21) {
      const subbabNumber = parseInt(subbabKey.replace('subbab', ''), 10);
      if (subbabNumber < 7) {
        const nextSubKey = `subbab${subbabNumber + 1}`;
        if (!user.progress[nextSubKey]) {
          user.progress[nextSubKey] = { unlocked: true, currentStage: 1, stars: {} };
        } else {
          user.progress[nextSubKey].unlocked = true;
        }
      }
    }

    const { user: updatedUser, newBadges } = this.evaluateNewBadges(user);
    users[userIdx] = updatedUser;
    this.saveUsers(users);
    this.setCurrentUser(updatedUser);
    return { user: updatedUser, newBadges };
  },

  updateEndlessHighScore(score) {
    const currentUser = this.getCurrentUser();
    if (!currentUser || currentUser.username.toLowerCase() === 'detektif_tamu') return;
    
    const users = this.getUsers();
    const idx = users.findIndex(u => u?.username === currentUser.username);
    if (idx !== -1) {
      if (score > (users[idx].endlessHighScore || 0)) {
        users[idx].endlessHighScore = score;
        this.saveUsers(users);
        this.setCurrentUser(users[idx]);
      }
    }
  },

  unlockAllWithCheat(cheatCode) {
    if (cheatCode !== 'fikrangantengbeut123') return null;

    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    if (currentUser.username.toLowerCase() === 'detektif_tamu') {
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

    const users = this.getUsers();
    const userIdx = users.findIndex(u => u?.username === currentUser.username);
    if (userIdx === -1) return null;

    const user = users[userIdx];
    for (let i = 1; i <= 7; i++) {
      const subKey = `subbab${i}`;
      const starsObj = {};
      for (let s = 1; s <= 21; s++) {
        starsObj[s] = 3;
      }
      user.progress[subKey] = {
        unlocked: true,
        currentStage: 21,
        stars: starsObj
      };
    }
    user.totalScore = 99999;
    user.unlockedBadges = BADGE_DEFINITIONS.map(b => b.id);

    users[userIdx] = user;
    this.saveUsers(users);
    this.setCurrentUser(user);
    return user;
  },

  // LEADERBOARD EXCLUDES GUEST MODE (detektif_tamu)
  getLeaderboard() {
    const users = this.getUsers();
    return users
      .filter(u => u && u.username && u.username.toLowerCase() !== 'detektif_tamu')
      .map(u => ({
        username: u.username,
        fullname: u.fullname || u.username,
        totalScore: u.totalScore || 0,
        endlessHighScore: u.endlessHighScore || 0,
        completedStages: this.getCompletedStagesCount(u.progress),
        badgeCount: (u.unlockedBadges || []).length
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  }
};
