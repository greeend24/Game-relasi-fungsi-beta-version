/**
 * Relo Frame Animation Service
 * Manages frame preloading, caching, and state-to-frame path mapping
 * for Detektif Relo mascot animations.
 */

const BASE_PATH = '/relo/relo animation';

// Map of all frame relative paths and lightweight pre-baked animated GIFs
export const RELO_FRAMES = {
  // Pre-baked Animated GIFs for 0% CPU talking & flapping animations
  gifs: {
    standingTalking: '/relo/gifs/relo_standing_talking.gif',
    thinkingTalking: '/relo/gifs/relo_thinking_talking.gif',
    pointRightTalking: '/relo/gifs/relo_point_right_talking.gif',
    pointLeftTalking: '/relo/gifs/relo_point_left_talking.gif',
    flapping: '/relo/gifs/relo_flapping.gif',
  },

  // 1. Berdiri - Tanpa Aksi Sayap
  standing: {
    idle: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/DIAM.png`,
    blinks: [
      `${BASE_PATH}/Berdiri/tanpa aksi sayap/mengedip/mengedip 2 mata.png`,
      `${BASE_PATH}/Berdiri/tanpa aksi sayap/mengedip/mengedip mata kanan.png`,
      `${BASE_PATH}/Berdiri/tanpa aksi sayap/mengedip/mengedip mata kiri.png`,
    ],
    vowels: {
      a: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/a.png`,
      e: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/e.png`,
      i: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/i.png`,
      o: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/o.png`,
      u: `${BASE_PATH}/Berdiri/tanpa aksi sayap/tidak mengedip/u.png`,
    }
  },

  // 2. Berdiri - Menunjuk Sayap Kanan
  pointRight: {
    idle: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/2. DIAM 2 PER 2 SAYAP.png`,
    idleHalf: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/1. DIAM 1 PER 2 SAYAP.png`,
    vowels: {
      a: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/a.png`,
      e: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/e.png`,
      i: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/i.png`,
      o: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/o.png`,
      u: `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/u.png`,
    }
  },

  // 3. Berdiri - Menunjuk Sayap Kiri
  pointLeft: {
    idle: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/2. DIAM 2 PER 2 SAYAP.png`,
    idle2: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/2. DIAM 2 PER 2 SAYAP.png`,
    idleHalf: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/1. DIAM 1 PER 2 SAYAP.png`,
    vowels: {
      a: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/A.png`,
      e: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/E.png`,
      i: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/I.png`,
      o: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/O.png`,
      u: `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/U.png`,
    }
  },

  // 4. Pose Mikir (Thinking)
  thinking: {
    idle: `${BASE_PATH}/mikir/diam.png`,
    blinks: [
      `${BASE_PATH}/mikir/TUTUP MATA DUA DUANYA.png`,
      `${BASE_PATH}/mikir/TUTUP MATA KANAN.png`,
      `${BASE_PATH}/mikir/TUTUP MATA KIRI.png`,
    ],
    vowels: {
      a: `${BASE_PATH}/mikir/A.png`,
      e: `${BASE_PATH}/mikir/E.png`,
      i: `${BASE_PATH}/mikir/I.png`,
      o: `${BASE_PATH}/mikir/O.png`,
      u: `${BASE_PATH}/mikir/U.png`,
    }
  },

  // 5. Mengepakkan Sayap (Smooth Ping-Pong 10-Frame Loop: 1/5 -> 5/5 -> 1/5)
  flapping: [
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/1. sayap tertutup.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/2. 1 per 5 terbuka .png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/3. 2 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/4. 3 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/5. 4 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/6. 5 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/5. 4 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/4. 3 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/3. 2 per 5 terbuka.png`,
    `${BASE_PATH}/Mengepakkan sayap/tanpa aksi mata/2. 1 per 5 terbuka .png`,
  ],

  // 6. Chapter Mode Pointing Sequence (Right Wing 1/2 -> 2/2 -> Left Wing 1/2 -> 2/2)
  pointingSequence: [
    `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/1. DIAM 1 PER 2 SAYAP.png`,
    `${BASE_PATH}/Berdiri/menunjuuk dengan sayap kanan/2. DIAM 2 PER 2 SAYAP.png`,
    `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/1. DIAM 1 PER 2 SAYAP.png`,
    `${BASE_PATH}/Berdiri/menuunjuk dengan sayap kiri/2. DIAM 2 PER 2 SAYAP.png`,
  ]
};

// Global image element cache to prevent reloading delay
const imageCache = new Map();
let isPreloaded = false;

/**
 * Preload all Relo animation frames in background for smooth 60fps frame switches
 */
export function preloadReloFrames() {
  if (isPreloaded) return;
  isPreloaded = true;

  const urlsToPreload = [];

  // Helper to extract URLs recursively
  const extractUrls = (obj) => {
    if (typeof obj === 'string') {
      urlsToPreload.push(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(extractUrls);
    } else if (typeof obj === 'object' && obj !== null) {
      Object.values(obj).forEach(extractUrls);
    }
  };

  extractUrls(RELO_FRAMES);

  urlsToPreload.forEach((url) => {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.src = url;
      imageCache.set(url, img);
    }
  });
}

// Auto preload after window load or immediate
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    setTimeout(preloadReloFrames, 300);
  } else {
    window.addEventListener('load', () => setTimeout(preloadReloFrames, 300), { once: true });
  }
}
