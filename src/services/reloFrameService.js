/**
 * Relo Frame Animation Service
 * Manages frame preloading, caching, and state-to-frame path mapping
 * for Detektif Relo mascot animations with hardware acceleration.
 */

const BASE_PATH = '/relo/relo animation';

// Map of all frame relative paths and lightweight animated GIFs
// Map of lightweight animated GIFs for Detektif Relo
export const RELO_FRAMES = {
  gifs: {
    standingIdle: '/relo/gifs/relo_standing_blinking.gif',
    standingBlinking: '/relo/gifs/relo_standing_blinking.gif',
    standingBlinkingQuest: '/relo/gifs/relo_standing_blinking_quest.gif',
    standingBlinkingChapter: '/relo/gifs/relo_standing_blinking_chapter.gif',
    standingBlinkingEndless: '/relo/gifs/relo_standing_blinking_endless.gif',
    standing: '/relo/gifs/relo_standing_blinking.gif',
    standingTalking: '/relo/gifs/relo_standing_talking.gif',
    thinkingTalking: '/relo/gifs/relo_thinking_talking.gif',
    thinkingIdle: '/relo/gifs/relo_thinking_idle.gif',
    thinking: '/relo/gifs/relo_thinking.gif',
    chapterPointing: '/relo/gifs/relo_chapter_pointing.gif',
    pointing: '/relo/gifs/relo_chapter_pointing.gif',
    pointRightTalking: '/relo/gifs/relo_point_right_talking.gif',
    pointLeftTalking: '/relo/gifs/relo_point_left_talking.gif',
    flapping: '/relo/gifs/relo_flapping.gif',
  },
};

// Global in-memory image cache
const imageCache = new Map();
let isPreloaded = false;

/**
 * Preload all essential assets with progress callback (optimized lightweight initial bundle)
 */
export async function preloadAllGameAssets(onProgress) {
  if (isPreloaded) {
    onProgress?.(100);
    return;
  }

  // Critical assets needed immediately for the initial auth / lobby view
  const initialCriticalAssets = [
    '/assets/Logo game/game_logo.png',
    '/assets/tampilan di lobby/Asset/asset_background@4x.png',
    '/assets/tampilan sebelum masuk lobby/tampilan_start menu@4x.png',
    '/relo/gifs/relo_standing_blinking.gif',
    '/game asset/board_kayu.png',
  ];

  // Secondary assets to be preloaded smoothly on-demand/in background
  const secondaryAssets = [
    '/relo/gifs/relo_standing_talking.gif',
    '/relo/gifs/relo_chapter_pointing.gif',
    '/relo/gifs/relo_thinking_talking.gif',
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
    '/images/7.png',
  ];

  const uniqueUrls = [...new Set(initialCriticalAssets.filter(Boolean))];
  const total = uniqueUrls.length;
  let loaded = 0;

  const loadItem = (url) => {
    return new Promise((resolve) => {
      if (imageCache.has(url)) {
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100));
        return resolve();
      }

      const img = new Image();
      img.onload = () => {
        imageCache.set(url, img);
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100));
        resolve();
      };
      img.onerror = () => {
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100));
        resolve();
      };
      img.src = url;
    });
  };

  // Preload initial critical assets in parallel with 350ms safety timeout
  const preloadPromise = Promise.all(uniqueUrls.map(loadItem));
  const timeoutPromise = new Promise(resolve => setTimeout(resolve, 350));
  await Promise.race([preloadPromise, timeoutPromise]);
  isPreloaded = true;

  // Queue remaining secondary assets slowly in background to prevent CPU/RAM spikes
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      secondaryAssets.forEach(url => {
        if (!imageCache.has(url)) {
          const img = new Image();
          img.src = url;
          imageCache.set(url, img);
        }
      });
    }, { timeout: 3000 });
  }
}

/**
 * Preload Relo animation frames in background
 */
export function preloadReloFrames() {
  if (isPreloaded) return;
  preloadAllGameAssets();
}

// Auto preload after window load or immediate
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    setTimeout(preloadReloFrames, 300);
  } else {
    window.addEventListener('load', () => setTimeout(preloadReloFrames, 300), { once: true });
  }
}
