import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';

/**
 * YouTubeAudioPlayer
 * Plays background audio from YouTube Video ID "6jSLH9CDPPQ" (Canon in D Piano)
 * Completely invisible (no video displayed) and syncs volume with audioEngine.
 */
export default function YouTubeAudioPlayer({ videoId = '6jSLH9CDPPQ' }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // If local BGM (menu.mp3 / battle.mp3) is active, do not play YouTube player to prevent double BGM overlay
    if (audioEngine.isPlayingBgm || audioEngine.isQuestBattleActive || !audioEngine.isMusicOn) {
      return;
    }

    // Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let player = null;

    const onYouTubeIframeAPIReady = () => {
      if (!iframeRef.current) return;
      player = new window.YT.Player(iframeRef.current, {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          disablekb: 1,
          fs: 0
        },
        events: {
          onReady: (event) => {
            // Only play if local BGM is not playing
            if (!audioEngine.isPlayingBgm && !audioEngine.isQuestBattleActive && audioEngine.isMusicOn) {
              const vol = Math.round(audioEngine.masterVol * audioEngine.musicVol * 100);
              event.target.setVolume(vol);
              event.target.playVideo();
            } else {
              event.target.pauseVideo();
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (player && player.destroy) {
        try { player.destroy(); } catch {}
      }
    };
  }, [videoId]);

  return (
    <div style={{ display: 'none', position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <div ref={iframeRef} id="youtube-audio-iframe" />
    </div>
  );
}
