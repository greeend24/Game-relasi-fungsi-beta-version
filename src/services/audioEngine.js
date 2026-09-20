// Web Audio API & HTML5 Music Engine for Menu, Battle, and Victory audio tracks
// ENFORCES STRICT EXCLUSIVE SINGLE AUDIO PLAYBACK CHANNEL

import { storageService } from './storageService';
import { reloVoiceService } from './reloVoiceService';

class AudioEngine {
  constructor() {
    this.ctx = null;
    const settings = storageService.getAudioSettings();
    
    this.masterVol = 1.0;
    this.musicVol = settings.musicVol !== undefined ? settings.musicVol / 100 : 0.5;
    this.sfxVol = settings.sfxVol !== undefined ? settings.sfxVol / 100 : 0.7;
    this.isMusicOn = settings.isMusicOn !== undefined ? settings.isMusicOn : true;
    this.isSfxOn = settings.isSfxOn !== undefined ? settings.isSfxOn : true;
    this.isMuted = false;
    this.isDucking = false;

    this.isPlayingBgm = false;
    this.isQuestBattleActive = false;
    this.hasInteracted = false;

    // Single persistent HTML5 Audio Elements
    this.menuAudioEl = new Audio(encodeURI('/music/menu pengganti.mp3'));
    this.menuAudioEl.loop = true;
    this.menuAudioEl.preload = 'auto';
    this.menuAudioEl.addEventListener('ended', () => {
      if (this.isPlayingBgm && !this.isQuestBattleActive) {
        this.menuAudioEl.currentTime = 0;
        this.menuAudioEl.play().catch(() => {});
      }
    });

    // Add-on Bird Chirping Track (active during pagi, siang, sore)
    this.birdsAudioEl = new Audio(encodeURI('/music/add ons menu pengganti birds charping.mp3'));
    this.birdsAudioEl.loop = true;
    this.birdsAudioEl.preload = 'auto';
    this.birdsAudioEl.addEventListener('ended', () => {
      if (this.isPlayingBgm && !this.isQuestBattleActive && this.isDaytime()) {
        this.birdsAudioEl.currentTime = 0;
        this.birdsAudioEl.play().catch(() => {});
      }
    });

    this.battleAudioEl = new Audio('/music/battle.mp3');
    this.battleAudioEl.loop = true;
    this.battleAudioEl.preload = 'auto';

    this.victoryAudioEl = new Audio('/music/victory.mp3');
    this.victoryAudioEl.loop = false;
    this.victoryAudioEl.preload = 'auto';

    this.customAudioEl = new Audio();
    this.customAudioEl.loop = true;
    this.customAudioSrc = localStorage.getItem('detektif_custom_bgm') || '';
    if (this.customAudioSrc) {
      this.customAudioEl.src = this.customAudioSrc;
    }

    this.updateVolumes();

    // Auto Ducking BGM volume whenever Relo Voice is speaking
    try {
      reloVoiceService.subscribe((isSpeaking) => {
        this.setDucking(isSpeaking);
      });
    } catch {}

    // Periodic time-of-day checker to transition birds chirping seamlessly (e.g. sore -> malam or malam -> pagi)
    if (typeof window !== 'undefined') {
      setInterval(() => {
        if (this.isPlayingBgm && !this.isQuestBattleActive) {
          this.syncBirdsPlayback();
        }
      }, 30000);
    }

    // Global listener to bypass browser autoplay blocks on first user gesture
    this.initAutoPlayOnFirstInteraction();
  }

  initAutoPlayOnFirstInteraction() {
    const handleFirstInteraction = () => {
      if (this.hasInteracted) return;
      this.hasInteracted = true;
      this.initCtx();

      if (this.isMusicOn && this.musicVol > 0 && !this.isQuestBattleActive && !this.isPlayingBgm) {
        this.playMenuBgmFile();
      }

      ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart'].forEach(evt => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
    };

    ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true });
    });
  }

  initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx({ latencyHint: 'interactive' });
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  saveCurrentSettings() {
    storageService.saveAudioSettings({
      masterVol: 100,
      musicVol: Math.round(this.musicVol * 100),
      sfxVol: Math.round(this.sfxVol * 100),
      isMusicOn: this.isMusicOn,
      isSfxOn: this.isSfxOn,
      isMuted: false
    });
  }

  setMusicVolume(percent) {
    this.musicVol = Math.max(0, Math.min(1, percent / 100));
    this.updateVolumes();
    this.saveCurrentSettings();

    if (this.musicVol > 0 && this.isMusicOn) {
      if (!this.isPlayingBgm && !this.isQuestBattleActive) {
        this.playMenuBgmFile();
      } else {
        this.syncBirdsPlayback();
      }
    } else if (this.musicVol === 0) {
      this.stopAllBgmTracks();
    }
  }

  setSfxVolume(percent) {
    this.sfxVol = Math.max(0, Math.min(1, percent / 100));
    this.updateVolumes();
    this.saveCurrentSettings();
    if (this.sfxVol > 0 && this.isSfxOn) {
      try { this.playClick(); } catch {}
    }
  }

  toggleMusic(state) {
    this.isMusicOn = state !== undefined ? state : !this.isMusicOn;
    this.saveCurrentSettings();

    if (!this.isMusicOn) {
      this.stopAllBgmTracks();
    } else {
      if (this.isQuestBattleActive) {
        this.playQuestBattleMusic();
      } else {
        this.playMenuBgmFile();
      }
    }
    return this.isMusicOn;
  }

  toggleSfx(state) {
    this.isSfxOn = state !== undefined ? state : !this.isSfxOn;
    this.saveCurrentSettings();
    return this.isSfxOn;
  }

  setDucking(state) {
    this.isDucking = state;
    this.updateVolumes();
  }

  // Helper: check if daytime (pagi, siang, sore)
  isDaytime() {
    try {
      if (reloVoiceService && typeof reloVoiceService.getTimeOfDay === 'function') {
        const tod = reloVoiceService.getTimeOfDay();
        return tod === 'pagi' || tod === 'siang' || tod === 'sore';
      }
    } catch {}
    const hour = new Date().getHours();
    return hour >= 4 && hour < 19;
  }

  // Synchronize birds chirping playback according to BGM state & time of day
  syncBirdsPlayback(forceRestart = false) {
    if (!this.birdsAudioEl) return;

    const isMenuTrackActive = !this.customAudioSrc;
    const shouldPlay = this.isMusicOn && 
                       this.musicVol > 0 && 
                       this.isPlayingBgm && 
                       !this.isQuestBattleActive && 
                       isMenuTrackActive && 
                       this.isDaytime();

    if (shouldPlay) {
      this.updateVolumes();
      if (forceRestart) {
        this.birdsAudioEl.currentTime = 0;
      }
      if (this.birdsAudioEl.paused) {
        this.birdsAudioEl.play().catch(() => {});
      }
    } else {
      if (!this.birdsAudioEl.paused) {
        this.birdsAudioEl.pause();
      }
      if (!this.isPlayingBgm || this.isQuestBattleActive || !this.isMusicOn || this.musicVol <= 0 || !isMenuTrackActive) {
        this.birdsAudioEl.currentTime = 0;
      }
    }
  }

  setVideoAudioActive(active) {
    this.isVideoPlaying = Boolean(active);
    if (this.isVideoPlaying) {
      if (this.menuAudioEl && !this.menuAudioEl.paused) this.menuAudioEl.pause();
      if (this.birdsAudioEl && !this.birdsAudioEl.paused) this.birdsAudioEl.pause();
      if (this.battleAudioEl && !this.battleAudioEl.paused) this.battleAudioEl.pause();
      if (this.customAudioEl && !this.customAudioEl.paused) this.customAudioEl.pause();
    } else {
      if (this.isMusicOn && this.musicVol > 0 && this.isPlayingBgm && !this.isQuestBattleActive) {
        if (this.menuAudioEl && this.menuAudioEl.paused) {
          this.menuAudioEl.play().catch(() => {});
        }
        this.syncBirdsPlayback();
      }
    }
  }

  updateVolumes() {
    const duckFactor = this.isDucking ? 0.22 : 1.0;
    const effectiveMusicVol = Math.max(0, Math.min(1, this.musicVol * duckFactor));
    const effectiveSfxVol = Math.max(0, Math.min(1, this.sfxVol));

    if (this.menuAudioEl) this.menuAudioEl.volume = effectiveMusicVol;
    if (this.birdsAudioEl) this.birdsAudioEl.volume = Math.max(0, Math.min(1, 0.70 * effectiveMusicVol));
    if (this.customAudioEl) this.customAudioEl.volume = effectiveMusicVol;
    if (this.battleAudioEl) this.battleAudioEl.volume = Math.max(0, Math.min(1, 0.45 * effectiveMusicVol));
    if (this.victoryAudioEl) this.victoryAudioEl.volume = effectiveSfxVol;
  }

  playNote(freq, type = 'sine', duration = 0.3, vol = 0.15) {
    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const effectiveVol = Math.max(0, Math.min(1, vol * this.sfxVol));
      gain.gain.setValueAtTime(effectiveVol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  playClick() {
    this.playNote(520, 'triangle', 0.08, 0.12);
  }

  playHover() {
    this.playNote(440, 'sine', 0.05, 0.04);
  }

  playCorrect() {
    this.playNote(587.33, 'triangle', 0.12, 0.15);
    setTimeout(() => this.playNote(880.00, 'triangle', 0.20, 0.2), 90);
  }

  playError() {
    this.playNote(220.00, 'sawtooth', 0.18, 0.2);
    setTimeout(() => this.playNote(164.81, 'sawtooth', 0.25, 0.25), 110);
  }

  playSnap() {
    this.playNote(800, 'triangle', 0.05, 0.15);
  }

  playToggle() {
    this.playNote(600, 'sine', 0.08, 0.1);
  }

  playStageClear() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playNote(freq, 'triangle', 0.25, 0.2), idx * 100);
    });
  }

  playMenuOpen() {
    this.playNote(440, 'sine', 0.08, 0.1);
    setTimeout(() => this.playNote(660, 'triangle', 0.12, 0.12), 60);
  }

  playMenuClose() {
    this.playNote(660, 'triangle', 0.08, 0.12);
    setTimeout(() => this.playNote(440, 'sine', 0.12, 0.1), 60);
  }

  playWoosh() {
    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
      filter.frequency.setValueAtTime(150, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.18);
      filter.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.45);

      const gain = this.ctx.createGain();
      const effectiveVol = Math.max(0, Math.min(1, 0.75 * this.sfxVol));
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(effectiveVol, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.45);
    } catch {}
  }

  playBoing() {
    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.25);

      const effectiveVol = Math.max(0, Math.min(1, 0.4 * this.sfxVol));
      gain.gain.setValueAtTime(effectiveVol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  playPowerUp() {
    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.4);

      const effectiveVol = Math.max(0, Math.min(1, 0.5 * this.sfxVol));
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(effectiveVol, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {}
  }

  playStamp() {
    this.playNote(120, 'sawtooth', 0.25, 0.25);
    setTimeout(() => this.playNote(80, 'square', 0.15, 0.2), 40);
  }


  stopAllBgmTracks() {
    this.isPlayingBgm = false;
    this.isQuestBattleActive = false;

    [this.menuAudioEl, this.birdsAudioEl, this.battleAudioEl, this.victoryAudioEl, this.customAudioEl].forEach(audio => {
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch {}
      }
    });
  }

  playVictoryMusic() {
    this.stopAllBgmTracks();

    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.victoryAudioEl.currentTime = 0;
    this.victoryAudioEl.volume = Math.max(0, Math.min(1, this.sfxVol));
    this.victoryAudioEl.play().catch(() => {
      this.playStageComplete();
    });
  }

  playStageComplete() {
    this.stopAllBgmTracks();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 'triangle', 0.25, 0.2), i * 120);
    });
  }

  playQuestBattleMusic() {
    this.stopAllBgmTracks();
    this.isQuestBattleActive = true;
    if (!this.isMusicOn || this.musicVol <= 0) return;

    this.updateVolumes();
    this.battleAudioEl.currentTime = 0;
    this.battleAudioEl.play().catch(() => {});
  }

  stopQuestBattleMusic() {
    if (this.battleAudioEl) {
      try {
        this.battleAudioEl.pause();
        this.battleAudioEl.currentTime = 0;
      } catch {}
    }
    this.isQuestBattleActive = false;
    if (this.isMusicOn && this.musicVol > 0) {
      this.playMenuBgmFile(false);
    }
  }

  playMenuBgmFile(forceRestart = false) {
    if (!this.isMusicOn || this.musicVol <= 0) return;

    // Stop battle music if active
    if (this.battleAudioEl && !this.battleAudioEl.paused) {
      try {
        this.battleAudioEl.pause();
        this.battleAudioEl.currentTime = 0;
      } catch {}
    }
    this.isQuestBattleActive = false;

    const activeEl = this.customAudioSrc ? this.customAudioEl : this.menuAudioEl;

    // If BGM is already playing and not forced to restart, DO NOT reset to 0:00!
    // Let the song play completely until the end before looping naturally.
    if (this.isPlayingBgm && activeEl && !activeEl.paused && !forceRestart) {
      this.updateVolumes();
      this.syncBirdsPlayback(false);
      return;
    }

    this.isPlayingBgm = true;
    this.updateVolumes();

    if (forceRestart && activeEl) {
      activeEl.currentTime = 0;
    }

    activeEl.play().catch(() => {});
    this.syncBirdsPlayback(forceRestart);
  }

  setCustomBgmSource(srcOrDataUrl) {
    this.customAudioSrc = srcOrDataUrl;
    if (srcOrDataUrl) {
      localStorage.setItem('detektif_custom_bgm', srcOrDataUrl);
      this.customAudioEl.src = srcOrDataUrl;
    } else {
      localStorage.removeItem('detektif_custom_bgm');
      this.customAudioEl.src = '';
    }

    if (this.isMusicOn && !this.isQuestBattleActive) {
      this.playMenuBgmFile(true);
    }
  }

  toggleBgm(forceState) {
    const targetState = forceState !== undefined ? forceState : !this.isPlayingBgm;
    if (targetState) {
      // Seamless resume/play without resetting currentTime
      this.playMenuBgmFile(false);
      return true;
    } else {
      this.stopAllBgmTracks();
      return false;
    }
  }

  stopBgm() {
    this.stopAllBgmTracks();
  }
}

export const audioEngine = new AudioEngine();
