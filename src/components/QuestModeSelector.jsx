import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, ShieldAlert, Award, Clock, Lock } from 'lucide-react';
import { SUBBABS_DATA } from '../data/casesData';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

/**
 * QuestModeSelector
 * Displays Subbabs in a grid menu.
 * Unlocks Quest Mode for a subbab if and only if stage 21 of that subbab is completed.
 * Plays Scene 4 Quest Mode audio and displays matching Relo bubblechat.
 */
export default function QuestModeSelector({ userProgress, onBackToMenu, onStartQuestSubbab }) {
  const [reloText, setReloText] = useState('');

  useEffect(() => {
    const res = reloVoiceService.playScene('4');
    if (res && res.text) {
      setReloText(res.text);
    }
    return () => reloVoiceService.stopVoice();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between p-2.5 sm:p-3 font-hand space-y-2 animate-fade-in overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border-2 border-[#2D241E] shadow-[3px_3px_0px_#2D241E]">
        <button
          onClick={() => { audioEngine.playClick(); reloVoiceService.stopVoice(); onBackToMenu(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className="pencil-btn px-3 py-1.5 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-xs flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563EB]" />
          <span>Menu Utama</span>
        </button>

        <h2 className="text-lg sm:text-xl font-bold font-pencil text-[#2D241E] truncate">
          QUEST MODE: UJIAN 30 SOAL
        </h2>
      </div>

      {/* DETEKTIF RELO MASCOT & SPEECH BUBBLE CHAT */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          pose="exploring"
          emotion="idle"
          message={reloText || "Selamat datang di Quest Mode! Kamu punya waktu 30 menit untuk menyelesaikan misi Ujian Kasus!"}
          size="sm"
        />
      </div>      {/* Info Card */}
      <div className="p-2.5 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E] space-y-0.5 text-xs font-bold text-[#78350F]">
        <div className="flex items-center space-x-1.5 text-[#D97706] uppercase">
          <Clock className="w-4 h-4" />
          <span>KETENTUAN QUEST MODE:</span>
        </div>
        <p className="text-[11px] text-[#4A3E3D] font-medium leading-tight">
          • Terbuka setelah menyelesaikan Stage 21 Subbab • Durasi 30 Menit • 30 Soal Ujian • Skala Nilai 0-100
        </p>
      </div>

      {/* SUBBAB GRID FOR DESKTOP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 font-hand flex-1 overflow-y-auto drag-scroller py-1">
        {Object.values(SUBBABS_DATA).map((sub) => {
          const subProg = userProgress?.[sub.key];
          const isUnlocked = Boolean(subProg?.stars?.[21]) || ((subProg?.currentStage || 1) > 21);

          return (
            <button
              key={sub.id}
              onClick={() => {
                if (isUnlocked) {
                  audioEngine.playClick();
                  onStartQuestSubbab(sub.id);
                } else {
                  audioEngine.playError();
                }
              }}
              onMouseEnter={() => { if (isUnlocked) audioEngine.playHover(); }}
              className={`pencil-btn p-2 border-2 shadow-[2px_2px_0px_#2D241E] flex items-center justify-between transition-all text-left ${
                isUnlocked
                  ? 'bg-white/80 border-[#2D241E] group hover:scale-[1.01]'
                  : 'bg-white/40 border-[#A8A29E] text-[#78716C] cursor-not-allowed opacity-80'
              }`}
            >
              <div className="truncate pr-2">
                <span className={`text-[10px] font-black uppercase block ${isUnlocked ? 'text-[#D97706]' : 'text-[#78716C]'}`}>
                  SUBBAB UJIAN {sub.id}
                </span>
                <h3 className={`text-xs sm:text-sm font-bold font-pencil truncate leading-tight ${isUnlocked ? 'text-[#2D241E]' : 'text-[#78716C]'}`}>
                  {sub.title}
                </h3>
              </div>

              {isUnlocked ? (
                <div className="px-2 py-1 rounded-xl bg-[#FDE68A] text-[#78350F] font-extrabold text-xs flex items-center space-x-1 border border-[#2D241E] flex-shrink-0 group-hover:bg-[#F59E0B] group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start</span>
                </div>
              ) : (
                <div className="px-2 py-1 rounded-xl bg-[#E5E7EB] text-[#6B7280] font-bold text-[10px] sm:text-xs flex items-center space-x-1 border border-[#A8A29E] flex-shrink-0">
                  <Lock className="w-3 h-3 text-[#6B7280]" />
                  <span>Terkunci (ST 21)</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}

