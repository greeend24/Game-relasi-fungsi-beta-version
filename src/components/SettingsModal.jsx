import React, { useState, useEffect } from 'react';
import { X, Music, Sliders, Volume1, Volume2, AlertCircle, CheckCircle2, AlertTriangle, Mic } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';
import ProfessorOwlMascot from './ProfessorOwlMascot';

export default function SettingsModal({ isOpen, onClose, onCheatApplied }) {
  const [musicVol, setMusicVol] = useState(Math.round(audioEngine.musicVol * 100));
  const [sfxVol, setSfxVol] = useState(Math.round(audioEngine.sfxVol * 100));
  const [reloVol, setReloVol] = useState(Math.round(storageService.getAudioSettings().reloVol ?? 80));

  const [isMusicOn, setIsMusicOn] = useState(audioEngine.isMusicOn);
  const [isSfxOn, setIsSfxOn] = useState(audioEngine.isSfxOn);
  const [isReloOn, setIsReloOn] = useState(storageService.getAudioSettings().isReloOn ?? true);

  const [reloText, setReloText] = useState('');

  // Secret Exclamation Mark Modal State
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [cheatInput, setCheatInput] = useState('');
  const [cheatMsg, setCheatMsg] = useState(null);

  // Play Scene 7A (Settings - Masuk Menu) when settings modal opens
  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('7A');
      setReloText(res.text);
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMusicVolChange = (e) => {
    const val = Number(e.target.value);
    setMusicVol(val);
    audioEngine.setMusicVolume(val);
  };

  const handleSfxVolChange = (e) => {
    const val = Number(e.target.value);
    setSfxVol(val);
    audioEngine.setSfxVolume(val);
    const res = reloVoiceService.playScene('7B');
    if (res.text) setReloText(res.text);
  };

  const handleReloVolChange = (e) => {
    const val = Number(e.target.value);
    setReloVol(val);
    reloVoiceService.setReloVolume(val);
    const res = reloVoiceService.playScene('7B');
    if (res.text) setReloText(res.text);
  };

  const handleToggleMusic = () => {
    const state = audioEngine.toggleMusic();
    setIsMusicOn(state);
  };

  const handleToggleSfx = () => {
    const state = audioEngine.toggleSfx();
    setIsSfxOn(state);
  };

  const handleToggleRelo = () => {
    const state = reloVoiceService.toggleReloVoice();
    setIsReloOn(state);
    if (state) {
      const res = reloVoiceService.playScene('7B');
      if (res.text) setReloText(res.text);
    }
  };

  const handleApplyCheat = (e) => {
    e.preventDefault();
    try { audioEngine.playClick(); } catch {}

    if (!cheatInput.trim()) return;

    if (cheatInput.trim() === 'fikrangantengbeut123') {
      const updatedUser = storageService.unlockAllWithCheat(cheatInput.trim());
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] space-y-5 max-h-[90vh] overflow-y-auto drag-scroller">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#EFECE6]">
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-[#2563EB]" />
            <h2 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E]">SETTINGS SOUND & AUDIO</h2>
          </div>
          <button 
            onClick={() => { try { audioEngine.playClick(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
            className="pencil-btn p-1.5 bg-[#F3F4F6] text-[#374151]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Relo Mascot Speaking in Settings */}
        <div className="flex justify-center sm:justify-start">
          <ProfessorOwlMascot
            pose="welcoming"
            emotion="happy"
            message={reloText}
            size="md"
          />
        </div>

        {/* MUSIC, SFX & RELO VOICE VOLUME SLIDERS */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E] space-y-4">
          
          {/* Music Volume & Toggle */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#1E40AF]">
              <span className="flex items-center space-x-1">
                <Music className="w-4 h-4 text-[#2563EB]" />
                <span>MUSIC BGM VOLUME</span>
              </span>
              <div className="flex items-center space-x-2">
                <span>{musicVol}%</span>
                <button
                  onClick={handleToggleMusic}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold ${
                    isMusicOn ? 'bg-[#D1FAE5] text-[#065F46] border-[#059669]' : 'bg-[#FFE4E6] text-[#BE123C] border-[#BE123C]'
                  }`}
                >
                  {isMusicOn ? 'MUSIC ON' : 'MUSIC OFF'}
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVol}
              onChange={handleMusicVolChange}
              className="w-full accent-[#2563EB] cursor-pointer"
            />
          </div>

          {/* SFX Volume & Toggle */}
          <div className="space-y-1.5 pt-3 border-t border-[#EFECE6]">
            <div className="flex justify-between items-center text-xs font-bold text-[#065F46]">
              <span className="flex items-center space-x-1">
                <Volume1 className="w-4 h-4 text-[#059669]" />
                <span>SOUND EFFECTS (SFX) VOLUME</span>
              </span>
              <div className="flex items-center space-x-2">
                <span>{sfxVol}%</span>
                <button
                  onClick={handleToggleSfx}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold ${
                    isSfxOn ? 'bg-[#D1FAE5] text-[#065F46] border-[#059669]' : 'bg-[#FFE4E6] text-[#BE123C] border-[#BE123C]'
                  }`}
                >
                  {isSfxOn ? 'SFX ON' : 'SFX OFF'}
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVol}
              onChange={handleSfxVolChange}
              className="w-full accent-[#059669] cursor-pointer"
            />
          </div>

          {/* Suara Relo Volume & Toggle (SEBELAH BWAH SFX & BGM) */}
          <div className="space-y-1.5 pt-3 border-t border-[#EFECE6]">
            <div className="flex justify-between items-center text-xs font-bold text-[#D97706]">
              <span className="flex items-center space-x-1">
                <Mic className="w-4 h-4 text-[#D97706]" />
                <span>SUARA DETEKTIF RELO VOLUME</span>
              </span>
              <div className="flex items-center space-x-2">
                <span>{reloVol}%</span>
                <button
                  onClick={handleToggleRelo}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold ${
                    isReloOn && reloVol > 0 ? 'bg-[#FEF3C7] text-[#78350F] border-[#D97706]' : 'bg-[#FFE4E6] text-[#BE123C] border-[#BE123C]'
                  }`}
                >
                  {isReloOn && reloVol > 0 ? 'VOICE ON' : 'VOICE OFF'}
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={reloVol}
              onChange={handleReloVolChange}
              className="w-full accent-[#D97706] cursor-pointer"
            />
          </div>

        </div>

        {/* Footer with Tiny Exclamation Mark Icon at the Bottom Right */}
        <div className="pt-2 flex items-center justify-between border-t border-[#EFECE6] text-[11px] text-[#A8A29E] font-bold">
          <span>Detektif Data v1.0 • Kelas VIII SMP</span>
          
          {/* TINY EXCLAMATION MARK ICON (!) FOR SECRET POPUP */}
          <button
            onClick={() => {
              try { audioEngine.playClick(); } catch {}
              setIsSecretOpen(true);
            }}
            className="p-1 rounded-full hover:bg-[#FEF3C7] text-[#D97706] transition-transform hover:scale-125 cursor-pointer"
            title="S..."
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* MINIMALIST BLANK CANVAS SECRET POPUP */}
      {isSecretOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
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
                placeholder="..."
                value={cheatInput}
                onChange={(e) => setCheatInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-[#2D241E] text-xs font-bold text-[#2D241E] focus:outline-none text-center"
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

    </div>
  );
}
