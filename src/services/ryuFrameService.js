/**
 * Ryu Frame Animation Service
 * Manages frame preloading, caching, and state-to-frame path mapping
 * for Ryu mascot animations with hardware acceleration.
 */

const BASE_PATH = '/Ryu/frames';
const GIF_BASE_PATH = '/Ryu/gifs';

// Map of all frame relative paths and lightweight animated GIFs
// Map of lightweight animated GIFs for Detektif Ryu
export const RYU_FRAMES = {
  gifs: {
    standingIdle: `${GIF_BASE_PATH}/ryu_standing_blinking.gif`,
    standingBlinking: `${GIF_BASE_PATH}/ryu_standing_blinking.gif`,
    standingBlinkingQuest: `${GIF_BASE_PATH}/ryu_standing_blinking_quest.gif`,
    standingBlinkingChapter: `${GIF_BASE_PATH}/ryu_standing_blinking_chapter.gif`,
    standingBlinkingEndless: `${GIF_BASE_PATH}/ryu_standing_blinking_endless.gif`,
    standing: `${GIF_BASE_PATH}/ryu_standing_blinking.gif`,
    standingTalking: `${GIF_BASE_PATH}/ryu_standing_talking.gif`,
    
    thinkingTalking: `${GIF_BASE_PATH}/ryu_thinking_talking.gif`,
    thinkingIdle: `${GIF_BASE_PATH}/ryu_thinking_idle.gif`,
    thinkingBlinking: `${GIF_BASE_PATH}/ryu_thinking_blinking.gif`,
    thinking: `${GIF_BASE_PATH}/ryu_thinking.gif`,
    
    tanganPinggangIdle: `${GIF_BASE_PATH}/ryu_tangan_pinggang_idle.gif`,
    tanganPinggangBlinking: `${GIF_BASE_PATH}/ryu_tangan_pinggang_blinking.gif`,
    tanganPinggang: `${GIF_BASE_PATH}/ryu_tangan_pinggang.gif`,
    tanganPinggangTalking: `${GIF_BASE_PATH}/ryu_tangan_pinggang_talking.gif`,
    handsOnHipsIdle: `${GIF_BASE_PATH}/ryu_hands_on_hips_idle.gif`,
    handsOnHipsTalking: `${GIF_BASE_PATH}/ryu_hands_on_hips_talking.gif`,
    handsOnHipsWink: `${GIF_BASE_PATH}/ryu_hands_on_hips_wink.gif`,
    confidentIdle: `${GIF_BASE_PATH}/ryu_confident_idle.gif`,
    confidentTalking: `${GIF_BASE_PATH}/ryu_confident_talking.gif`,
    confidentWink: `${GIF_BASE_PATH}/ryu_confident_wink.gif`,
    
    winking: `${GIF_BASE_PATH}/ryu_winking.gif`,
    wink: `${GIF_BASE_PATH}/ryu_wink.gif`,
    celebrating: `${GIF_BASE_PATH}/ryu_celebrating.gif`,
    cheering: `${GIF_BASE_PATH}/ryu_cheering.gif`,
    success: `${GIF_BASE_PATH}/ryu_success.gif`,
    idea: `${GIF_BASE_PATH}/ryu_idea.gif`,
    aha: `${GIF_BASE_PATH}/ryu_aha.gif`,
    stanceShift: `${GIF_BASE_PATH}/ryu_stance_shift.gif`,
    poseTransition: `${GIF_BASE_PATH}/ryu_pose_transition.gif`,
  }
};

// Global image element cache to prevent reloading delay
const imageCache = new Map();
let isPreloaded = false;

/**
 * Preload essential Ryu animation assets
 */
export async function preloadRyuAssets(onProgress) {
  if (isPreloaded) {
    onProgress?.(100);
    return;
  }

  // Only preload initial standing / talking animations
  const critical = [
    RYU_FRAMES.gifs.standingBlinking,
    RYU_FRAMES.gifs.standingTalking
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
      const secondary = Object.values(RYU_FRAMES.gifs).filter(u => !critical.includes(u));
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

export function preloadRyuFrames() {
  if (isPreloaded) return;
  preloadRyuAssets();
}

