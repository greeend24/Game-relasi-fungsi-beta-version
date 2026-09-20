/**
 * Snowy Frame Animation Service
 * Manages frame preloading, caching, and state-to-frame path mapping
 * for Snowy mascot animations with hardware acceleration.
 */

const BASE_PATH = '/Snowy/frames';
const GIF_BASE_PATH = '/Snowy/gifs';

// Map of all frame relative paths and lightweight animated GIFs
// Map of lightweight animated GIFs for Detektif Snowy
export const SNOWY_FRAMES = {
  gifs: {
    standingIdle: `${GIF_BASE_PATH}/snowy_standing_blinking.gif`,
    standingBlinking: `${GIF_BASE_PATH}/snowy_standing_blinking.gif`,
    standingBlinkingQuest: `${GIF_BASE_PATH}/snowy_standing_blinking_quest.gif`,
    standingBlinkingChapter: `${GIF_BASE_PATH}/snowy_standing_blinking_chapter.gif`,
    standingBlinkingEndless: `${GIF_BASE_PATH}/snowy_standing_blinking_endless.gif`,
    standing: `${GIF_BASE_PATH}/snowy_standing_blinking.gif`,
    standingTalking: `${GIF_BASE_PATH}/snowy_standing_talking.gif`,
    
    thinkingTalking: `${GIF_BASE_PATH}/snowy_thinking_talking.gif`,
    thinkingIdle: `${GIF_BASE_PATH}/snowy_thinking_idle.gif`,
    thinkingBlinking: `${GIF_BASE_PATH}/snowy_thinking_blinking.gif`,
    thinking: `${GIF_BASE_PATH}/snowy_thinking.gif`,
    
    thumbsUpIdle: `${GIF_BASE_PATH}/snowy_thumbsup_idle.gif`,
    thumbsUpBlinking: `${GIF_BASE_PATH}/snowy_thumbsup_blinking.gif`,
    thumbsUp: `${GIF_BASE_PATH}/snowy_thumbsup.gif`,
    thumbsUpTalking: `${GIF_BASE_PATH}/snowy_thumbsup_talking.gif`,
    jempol: `${GIF_BASE_PATH}/snowy_jempol.gif`,
    jempolTalking: `${GIF_BASE_PATH}/snowy_jempol_talking.gif`,
    
    winking: `${GIF_BASE_PATH}/snowy_winking.gif`,
    celebrating: `${GIF_BASE_PATH}/snowy_celebrating.gif`,
    cheering: `${GIF_BASE_PATH}/snowy_cheering.gif`,
    success: `${GIF_BASE_PATH}/snowy_success.gif`,
    idea: `${GIF_BASE_PATH}/snowy_idea.gif`,
    aha: `${GIF_BASE_PATH}/snowy_aha.gif`,
  }
};

// Global image element cache to prevent reloading delay
const imageCache = new Map();
let isPreloaded = false;

/**
 * Preload essential Snowy animation assets
 */
export async function preloadSnowyAssets(onProgress) {
  if (isPreloaded) {
    onProgress?.(100);
    return;
  }

  // Only preload the main standing animation initially
  const critical = [
    SNOWY_FRAMES.gifs.standingBlinking,
    SNOWY_FRAMES.gifs.standingTalking
  ];

  for (const url of critical) {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.src = url;
      imageCache.set(url, img);
    }
  }

  isPreloaded = true;
  onProgress?.(100);

  // Load secondary GIFs slowly on idle
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const secondary = Object.values(SNOWY_FRAMES.gifs).filter(u => !critical.includes(u));
      secondary.forEach(url => {
        if (!imageCache.has(url)) {
          const img = new Image();
          img.src = url;
          imageCache.set(url, img);
        }
      });
    }, { timeout: 4000 });
  }
}

export function preloadSnowyFrames() {
  if (isPreloaded) return;
  preloadSnowyAssets();
}
