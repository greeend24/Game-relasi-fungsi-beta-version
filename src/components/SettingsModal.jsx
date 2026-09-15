import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';

export default function SettingsModal({ isOpen, onClose, onCheatApplied }) {
  const [sfxVol, setSfxVol] = useState(Math.round(audioEngine.sfxVol * 100));
  const [musicVol, setMusicVol] = useState(Math.round(audioEngine.musicVol * 100));
  const [reloVol, setReloVol] = useState(Math.round(storageService.getAudioSettings().reloVol ?? 80));

  const [isSfxOn, setIsSfxOn] = useState(audioEngine.isSfxOn);
  const [isMusicOn, setIsMusicOn] = useState(audioEngine.isMusicOn);
  const [isReloOn, setIsReloOn] = useState(storageService.getAudioSettings().isReloOn ?? true);
  const [reloText, setReloText] = useState('');

  // Secret Exclamation Mark Modal State
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [cheatInput, setCheatInput] = useState('');
  const [cheatMsg, setCheatMsg] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('7A');
      if (res.text) setReloText(res.text);
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSfxVolChange = (e) => {
    const val = Number(e.target.value);
    setSfxVol(val);
    audioEngine.setSfxVolume(val);
  };

  const handleMusicVolChange = (e) => {
    const val = Number(e.target.value);
    setMusicVol(val);
    audioEngine.setMusicVolume(val);
  };

  const handleReloVolChange = (e) => {
    const val = Number(e.target.value);
    setReloVol(val);
    reloVoiceService.setReloVolume(val);
  };

  const handleReloVolTest = () => {
    if (reloVol > 0 && isReloOn) {
      const res = reloVoiceService.playScene('7B');
      if (res.text) setReloText(res.text);
    }
  };

  const handleToggleSfx = () => {
    const state = audioEngine.toggleSfx();
    setIsSfxOn(state);
  };

  const handleToggleMusic = () => {
    const state = audioEngine.toggleMusic();
    setIsMusicOn(state);
  };

  const handleToggleRelo = () => {
    const state = reloVoiceService.toggleReloVoice();
    setIsReloOn(state);
    if (state && reloVol > 0) {
      reloVoiceService.playScene('7B');
    }
  };

  const handleApplyCheat = async (e) => {
    e.preventDefault();
    try { audioEngine.playClick(); } catch {}

    if (!cheatInput.trim()) return;

    if (cheatInput.trim() === 'fikrangantengbeut123') {
      const updatedUser = await storageService.unlockAllWithCheat(cheatInput.trim());
      if (updatedUser) {
        try { audioEngine.playStageComplete(); } catch {}
        setCheatMsg({ type: 'success', text: '🔓 RAHASIA TERBUKA! SEMUA SUBBAB & 21 STAGE LENGKAP TERBUKA!' });
        onCheatApplied?.(updatedUser);
      } else {
        try { audioEngine.playError(); } catch {}
        setCheatMsg({ type: 'error', text: 'Pengguna tidak ditemukan.' });
      }
    } else {
      try { audioEngine.playError(); } catch {}
      setCheatMsg({ type: 'error', text: '⚠️ KODE RAHASIA TIDAK VALID!' });
    }
  };

  const isAudioActive = isSfxOn && sfxVol > 0;
  const isSoundActive = isMusicOn && musicVol > 0;
  const isReloActive = isReloOn && reloVol > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT (FIXED, ZERO SCROLL) */}
      <div 
        className="relative w-full max-w-lg max-h-[92dvh] p-4 sm:p-6 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-2.5 sm:space-y-4 overflow-y-auto select-none"
        style={{ backgroundImage: `url('/assets/tampilan di setting/Asset/board_of_settings@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer"
          title="Tutup Menu Pengaturan"
        >
          <img 
            src="/assets/tampilan di setting/Asset/exit_button_of_menu@4x.png" 
            alt="Exit" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN GEAR ICON BADGE (option_icon@4x.png) */}
        <div className="flex flex-col items-center relative -mt-3 sm:-mt-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di setting/Asset/option_icon@4x.png" 
              alt="Settings Gear Icon" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white mt-0.5 uppercase tracking-wider">
            Pengaturan
          </h2>
        </div>

        {/* 3 AUDIO CONTROL SECTIONS MATCHING SCREENSHOT */}
        <div className="w-full space-y-3 px-2 sm:px-4 py-1">
          
          {/* 1. AUDIO (SFX) */}
          <div className="space-y-1.5">
            <h3 className="font-pencil text-xl sm:text-2xl font-black text-white text-left">
              Audio
            </h3>
            <div className="flex items-center space-x-3">
              {/* Speaker Toggle Button */}
              <button
                onClick={handleToggleSfx}
                onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
                className="image-btn focus:outline-none cursor-pointer flex-shrink-0"
                title="Toggle Audio SFX"
              >
                <img 
                  src={isAudioActive ? "/assets/tampilan di setting/Asset/button_on_audio@4x.png" : "/assets/tampilan di setting/Asset/buutton_off_audio@4x.png"} 
                  alt={isAudioActive ? "Audio On" : "Audio Off"} 
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </button>

              {/* Range Slider Track */}
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isSfxOn ? sfxVol : 0}
                  onChange={handleSfxVolChange}
                  className="w-full custom-scroller cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 2. SOUND (BGM MUSIC) */}
          <div className="space-y-1.5">
            <h3 className="font-pencil text-xl sm:text-2xl font-black text-white text-left">
              Sound
            </h3>
            <div className="flex items-center space-x-3">
              {/* Speaker Toggle Button */}
              <button
                onClick={handleToggleMusic}
                onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
                className="image-btn focus:outline-none cursor-pointer flex-shrink-0"
                title="Toggle Sound BGM"
              >
                <img 
                  src={isSoundActive ? "/assets/tampilan di setting/Asset/button_on_audio@4x.png" : "/assets/tampilan di setting/Asset/buutton_off_audio@4x.png"} 
                  alt={isSoundActive ? "Sound On" : "Sound Off"} 
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </button>

              {/* Range Slider Track */}
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMusicOn ? musicVol : 0}
                  onChange={handleMusicVolChange}
                  className="w-full custom-scroller cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. MASKOT AUDIO (VOICE) */}
          <div className="space-y-1.5">
            <h3 className="font-pencil text-xl sm:text-2xl font-black text-white text-left">
              Maskot Audio
            </h3>
            <div className="flex items-center space-x-3">
              {/* Speaker Toggle Button */}
              <button
                onClick={handleToggleRelo}
                onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
                className="image-btn focus:outline-none cursor-pointer flex-shrink-0"
                title="Toggle Maskot Audio"
              >
                <img 
                  src={isReloActive ? "/assets/tampilan di setting/Asset/button_on_audio@4x.png" : "/assets/tampilan di setting/Asset/buutton_off_audio@4x.png"} 
                  alt={isReloActive ? "Maskot Audio On" : "Maskot Audio Off"} 
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </button>

              {/* Range Slider Track */}
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isReloOn ? reloVol : 0}
                  onChange={handleReloVolChange}
                  onMouseUp={handleReloVolTest}
                  onTouchEnd={handleReloVolTest}
                  className="w-full custom-scroller cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Footer with Secret Cheat Button */}
        <div className="pt-2 w-full flex items-center justify-between text-xs text-white/70 font-bold border-t border-white/20">
          <span>Pengaturan Detektif Data</span>
          
          <button
            onClick={() => {
              try { audioEngine.playClick(); } catch {}
              setIsSecretOpen(true);
            }}
            className="p-1 rounded-full hover:bg-white/20 text-amber-300 transition-transform hover:scale-125 cursor-pointer"
            title="..."
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* MINIMALIST BLANK CANVAS SECRET POPUP */}
      {isSecretOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-hand">
          <div className="relative w-full max-w-xs p-5 rounded-3xl bg-[#FFFDF9] border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] space-y-3">
            <div className="flex justify-end">
              <button 
                onClick={() => { setIsSecretOpen(false); setCheatMsg(null); }}
                className="pencil-btn p-1 bg-[#F3F4F6] text-[#374151]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyCheat} className="space-y-3">
              <input
                type="password"
                placeholder="...."
                value={cheatInput}
                onChange={(e) => setCheatInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold text-[#2D241E] focus:outline-none text-center"
              />
              <button
                type="submit"
                className="pencil-btn w-full py-2 bg-[#F59E0B] text-white font-extrabold text-xs"
              >
                OK
              </button>
            </form>

            {cheatMsg && (
              <div className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 text-center ${
                cheatMsg.type === 'success' ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]' : 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
              }`}>
                {cheatMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                <span>{cheatMsg.text}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DETEKTIF SNOWY MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="snowy"
        pose="thinking"
        emotion="happy"
        title="INSTRUKTUR SNOWY"
        icon="❄️"
        canSpeak={true}
        message={reloText || 'Sesuaikan pengaturan suaramu agar nyaman bermain! 🎧❄️🐻'}
      />

    </div>
  );
}
