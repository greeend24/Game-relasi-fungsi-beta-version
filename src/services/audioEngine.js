// Web Audio API & HTML5 Music Engine for Menu, Battle, and Victory audio tracks

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

    // HTML5 Audio Elements for Music Tracks with Pre-buffering
    this.menuAudioEl = new Audio('/music/menu.mp3');
    this.menuAudioEl.loop = true;
    this.menuAudioEl.preload = 'auto';
    this.menuAudioEl.load();

    this.battleAudioEl = new Audio('/music/battle.mp3');
    this.battleAudioEl.loop = true;
    this.battleAudioEl.preload = 'auto';
    this.battleAudioEl.load();

    this.victoryAudioEl = new Audio('/music/victory.mp3');
    this.victoryAudioEl.loop = false;
    this.victoryAudioEl.preload = 'auto';
    this.victoryAudioEl.load();

    this.customAudioEl = new Audio();
    this.customAudioEl.loop = true;
    this.customAudioSrc = localStorage.getItem('detektif_custom_bgm') || '';

    if (this.customAudioSrc) {
      this.customAudioEl.src = this.customAudioSrc;
      this.customAudioEl.preload = 'auto';
    }

    this.updateVolumes();

    // Auto Ducking BGM volume whenever Relo Voice is speaking
    try {
      reloVoiceService.subscribe((isSpeaking) => {
        this.setDucking(isSpeaking);
      });
    } catch {}

    // Global listener to bypass browser autoplay blocks on first touch/click
    this.initAutoPlayOnFirstInteraction();
  }

  initAutoPlayOnFirstInteraction() {
    const handleFirstInteraction = () => {
      this.initCtx();
      if (this.isMusicOn && this.musicVol > 0 && !this.isQuestBattleActive) {
        this.menuAudioEl.play().then(() => {
          this.isPlayingBgm = true;
        }).catch(() => {});
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('mousedown', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
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
    this.musicVol = percent / 100;
    this.updateVolumes();
    this.saveCurrentSettings();
    if (this.musicVol > 0 && this.isMusicOn) {
      if (!this.isPlayingBgm && !this.isQuestBattleActive) {
        this.toggleBgm(true);
      }
    } else if (this.musicVol === 0) {
      this.stopBgm();
      if (this.battleAudioEl) this.battleAudioEl.pause();
    }
  }

  setSfxVolume(percent) {
    this.sfxVol = percent / 100;
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
      this.stopBgm();
      this.stopQuestBattleMusic();
    } else {
      if (this.isQuestBattleActive) {
        this.playQuestBattleMusic();
      } else {
        this.toggleBgm(true);
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

  updateVolumes() {
    const duckFactor = this.isDucking ? 0.25 : 1.0;
    const effectiveMusicVol = Math.max(0, Math.min(1, this.musicVol * duckFactor));
    const effectiveSfxVol = Math.max(0, Math.min(1, this.sfxVol));

    if (this.menuAudioEl) this.menuAudioEl.volume = effectiveMusicVol;
    if (this.customAudioEl) this.customAudioEl.volume = effectiveMusicVol;
    if (this.battleAudioEl) this.battleAudioEl.volume = Math.max(0, Math.min(1, 0.5 * effectiveMusicVol));
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

  playHover() {
    this.playNote(400, 'sine', 0.04, 0.05);
  }

  playClick() {
    this.playNote(523.25, 'triangle', 0.08, 0.1);
  }

  playMenuOpen() {
    this.playClick();
    this.playWoosh();
  }

  playMenuClose() {
    this.playClick();
    this.playSnap();
  }

  playNav() {
    this.playNote(600, 'sine', 0.06, 0.08);
  }

  playCorrect() {
    this.playNote(523.25, 'sine', 0.15, 0.15);
    setTimeout(() => this.playNote(659.25, 'sine', 0.15, 0.15), 90);
    setTimeout(() => this.playNote(783.99, 'sine', 0.25, 0.2), 180);
  }

  playError() {
    this.playNote(220, 'sawtooth', 0.2, 0.15);
    setTimeout(() => this.playNote(185, 'sawtooth', 0.3, 0.15), 140);
  }

  playTimerTick() {
    this.playNote(750, 'square', 0.05, 0.04);
  }

  playScan() {
    this.playNote(880, 'sine', 0.05, 0.08);
  }

  playBadgeUnlock() {
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 'triangle', 0.2, 0.2), i * 80);
    });
  }

  playTypewriter() {
    this.playNote(800 + Math.random() * 200, 'square', 0.03, 0.04);
  }

  playCamera() {
    this.playNote(1200, 'sawtooth', 0.05, 0.12);
    setTimeout(() => this.playNote(400, 'sine', 0.1, 0.1), 50);
  }

  playSnap() {
    this.playNote(950, 'triangle', 0.05, 0.15);
  }

  playWoosh() {
    if (!this.isSfxOn || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      const effectiveVol = Math.max(0, Math.min(1, 0.4 * this.sfxVol));
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(effectiveVol, this.ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.35);
    } catch {}
  }

  playStamp() {
    this.playNote(120, 'sawtooth', 0.25, 0.25);
    setTimeout(() => this.playNote(80, 'square', 0.15, 0.2), 40);
  }

  stopAllBgmTracks() {
    this.isPlayingBgm = false;
    this.isQuestBattleActive = false;
    if (this.menuAudioEl) {
      try {
        this.menuAudioEl.pause();
        this.menuAudioEl.currentTime = 0;
      } catch {}
    }
    if (this.battleAudioEl) {
      try {
        this.battleAudioEl.pause();
        this.battleAudioEl.currentTime = 0;
      } catch {}
    }
    if (this.customAudioEl) {
      try {
        this.customAudioEl.pause();
        this.customAudioEl.currentTime = 0;
      } catch {}
    }
  }

  // Play Victory Music Track (/music/victory.mp3) & Automatically Stop Battle Music!
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

  // STRICTLY PLAY BATTLE MUSIC ONLY WHEN PLAYING QUEST MODE AT 0.5X VOLUME
  playQuestBattleMusic() {
    this.stopAllBgmTracks();
    this.isQuestBattleActive = true;
    if (!this.isMusicOn || this.musicVol <= 0) return;

    this.battleAudioEl.currentTime = 0;
    this.battleAudioEl.volume = Math.max(0, Math.min(1, 0.5 * this.musicVol));
    this.battleAudioEl.play().catch(() => {});
  }

  // STOP BATTLE MUSIC AND RESUME PREVIOUS NORMAL BGM
  stopQuestBattleMusic() {
    this.stopAllBgmTracks();
    this.toggleBgm(true);
  }

  setCustomBgmSource(srcOrDataUrl) {
    this.customAudioSrc = srcOrDataUrl;
    if (srcOrDataUrl) {
      localStorage.setItem('detektif_custom_bgm', srcOrDataUrl);
      this.customAudioEl.src = srcOrDataUrl;
      this.updateVolumes();
      if (this.isMusicOn && !this.isQuestBattleActive) {
        this.toggleBgm(true);
      }
    } else {
      localStorage.removeItem('detektif_custom_bgm');
      this.customAudioEl.pause();
      this.customAudioEl.src = '';
      this.toggleBgm(true);
    }
  }

  toggleBgm(forceState) {
    this.initCtx();
    const targetState = forceState !== undefined ? forceState : !this.isPlayingBgm;

    if (!targetState || !this.isMusicOn || this.musicVol <= 0) {
      this.stopBgm();
      return false;
    }

    if (this.isQuestBattleActive) return true;

    // Ensure all other BGM tracks are paused before starting menu BGM
    if (this.battleAudioEl) {
      try {
        this.battleAudioEl.pause();
        this.battleAudioEl.currentTime = 0;
      } catch {}
    }

    this.isPlayingBgm = true;

    if (this.customAudioSrc) {
      this.updateVolumes();
      this.customAudioEl.play().catch(() => {
        this.playMenuBgmFile();
      });
    } else {
      this.playMenuBgmFile();
    }

    return true;
  }

  playMenuBgmFile() {
    this.updateVolumes();
    this.menuAudioEl.play().catch(() => {});
  }

  stopBgm() {
    this.stopAllBgmTracks();
  }
}

export const audioEngine = new AudioEngine();
