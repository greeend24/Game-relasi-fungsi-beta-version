import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, AlertTriangle, Server } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';
import ServerConfigModal from './ServerConfigModal';

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

  // Server Connection Modal State
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD WRAPPER: Sized strictly by the image so it NEVER drifts or breaks aspect ratio on any device */}
      <div className="relative inline-flex items-center justify-center max-h-[88dvh] max-w-[min(480px,92vw)] drop-shadow-2xl select-none flex-shrink-0">
        
        {/* PHYSICAL BOARD IMAGE: Controls the true pixel boundaries */}
        <img 
          src="/assets/tampilan di setting/Asset/board_of_settings@4x.png" 
          alt="Settings Board" 
          className="block max-h-[88dvh] max-w-[min(480px,92vw)] w-auto h-auto object-contain select-none pointer-events-none"
        />

        {/* GREEN ROUND EXIT BUTTON (Locked directly to the top-right corner of the actual wooden board) */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-[3.5%] right-[4.5%] z-30 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          title="Tutup Menu Pengaturan"
        >
          <img 
            src="/assets/tampilan di setting/Asset/exit_button_of_menu@4x.png" 
            alt="Exit" 
            className="w-7 h-7 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* SETTINGS CONTENT OVERLAY: Locked directly within the wooden board surface, ZERO SCROLL */}
        <div className="absolute inset-0 flex flex-col justify-between pt-[4%] px-[7.5%] pb-[4%] overflow-hidden select-none">
          
          {/* TOP HEADER: CIRCLE WOODEN GEAR ICON BADGE + TITLE */}
          <div className="flex flex-col items-center relative -mt-0.5 sm:-mt-1">
            <div className="w-10 h-10 sm:w-15 sm:h-15 md:w-18 md:h-18 flex items-center justify-center relative drop-shadow-md flex-shrink-0">
              <img 
                src="/assets/tampilan di setting/Asset/option_icon@4x.png" 
                alt="Settings Gear Icon" 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <h2 className="font-pencil text-sm sm:text-2xl md:text-3xl font-black text-white mt-0.5 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Pengaturan
            </h2>
          </div>

          {/* 3 AUDIO CONTROL SECTIONS MATCHING SCREENSHOT */}
          <div className="w-full space-y-1 sm:space-y-2 md:space-y-2.5 px-1 sm:px-2">
            
            {/* 1. AUDIO (SFX) */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-pencil text-xs sm:text-base md:text-xl font-black text-white text-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Audio
              </h3>
              <div className="flex items-center space-x-2 sm:space-x-3">
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
                    className="w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain drop-shadow-md"
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
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-pencil text-xs sm:text-base md:text-xl font-black text-white text-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Sound
              </h3>
              <div className="flex items-center space-x-2 sm:space-x-3">
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
                    className="w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain drop-shadow-md"
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
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-pencil text-xs sm:text-base md:text-xl font-black text-white text-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Maskot Audio
              </h3>
              <div className="flex items-center space-x-2 sm:space-x-3">
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
                    className="w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain drop-shadow-md"
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

          {/* 4. SERVER & LAB CONNECTION BUTTON */}
          <div className="w-full px-1 sm:px-2 pt-0.5">
            <button
              type="button"
              onClick={() => {
                try { audioEngine.playClick(); } catch {}
                setIsServerModalOpen(true);
              }}
              className="w-full py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 rounded-xl sm:rounded-2xl bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-[#2D241E] sm:border-2 shadow-sm flex items-center justify-between transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl bg-[#3B82F6] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs md:text-sm font-black text-[#2D241E] leading-tight">
                    Koneksi Server & Lab
                  </div>
                  <div className="text-[8px] sm:text-[10px] text-[#4B5563] font-bold leading-tight hidden xs:block">
                    Atur IP Server Laptop Guru / LAN
                  </div>
                </div>
              </div>
              <span className="pencil-btn px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#2563EB] text-white text-[9px] sm:text-[11px] font-black shadow flex-shrink-0">
                Buka
              </span>
            </button>
          </div>

          {/* Footer with Secret Cheat Button */}
          <div className="pt-0.5 sm:pt-1 w-full flex items-center justify-between text-[9px] sm:text-xs text-white/70 font-bold border-t border-white/20 px-1 sm:px-2">
            <span>Pengaturan Detektif Data</span>
            
            <button
              onClick={() => {
                try { audioEngine.playClick(); } catch {}
                setIsSecretOpen(true);
              }}
              className="p-0.5 sm:p-1 rounded-full hover:bg-white/20 text-amber-300 transition-transform hover:scale-125 cursor-pointer"
              title="..."
            >
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

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

      {/* SERVER CONFIG MODAL */}
      <ServerConfigModal 
        isOpen={isServerModalOpen} 
        onClose={() => setIsServerModalOpen(false)} 
      />

    </div>
  );
}
