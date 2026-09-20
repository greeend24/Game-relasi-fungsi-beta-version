import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';
import CustomWoodenScroller from './CustomWoodenScroller';

export const RANK_DEFINITIONS = [
  { level: 1, name: 'Rank 1: Detektif Pemula', reqScore: 0, path: '/assets/tampilan di rank/asset/rank_1@4x.png', desc: 'Awal mula petualangan detektif' },
  { level: 2, name: 'Rank 2: Pencari Jejak', reqScore: 300, path: '/assets/tampilan di rank/asset/rank_2@4x.png', desc: 'Syarat: Memiliki Rank 1 & Memperoleh 300 Skor' },
  { level: 3, name: 'Rank 3: Pengumpul Bukti', reqScore: 700, path: '/assets/tampilan di rank/asset/rank_3@4x.png', desc: 'Syarat: Memiliki Rank 2 & Memperoleh 700 Skor' },
  { level: 4, name: 'Rank 4: Analis Matematika', reqScore: 1200, path: '/assets/tampilan di rank/asset/rank_4@4x.png', desc: 'Syarat: Memiliki Rank 3 & Memperoleh 1.200 Skor' },
  { level: 5, name: 'Rank 5: Penyelidik Senior', reqScore: 1800, path: '/assets/tampilan di rank/asset/rank_5@4x.png', desc: 'Syarat: Memiliki Rank 4 & Memperoleh 1.800 Skor' },
  { level: 6, name: 'Rank 6: Ahli Pola Relasi', reqScore: 2500, path: '/assets/tampilan di rank/asset/rank_6@4x.png', desc: 'Syarat: Memiliki Rank 5 & Memperoleh 2.500 Skor' },
  { level: 7, name: 'Rank 7: Spesialis Fungsi', reqScore: 3200, path: '/assets/tampilan di rank/asset/rank_7@4x.png', desc: 'Syarat: Memiliki Rank 6 & Memperoleh 3.200 Skor' },
  { level: 8, name: 'Rank 8: Maestro Korespondensi', reqScore: 3900, path: '/assets/tampilan di rank/asset/rank_8@4x.png', desc: 'Syarat: Memiliki Rank 7 & Memperoleh 3.900 Skor' },
  { level: 9, name: 'Rank 9: Detektif Utama', reqScore: 4500, path: '/assets/tampilan di rank/asset/rank_9@4x.png', desc: 'Syarat: Memiliki Rank 8 & Memperoleh 4.500 Skor' },
  { level: 10, name: 'Rank 10: Detektif Legendaris', reqScore: 4760, path: '/assets/tampilan di rank/asset/rank_10_maks@4x.png', desc: 'Rank Maksimal! Syarat: Memiliki Rank 9 & Selesaikan Chapter, Quest, serta 50 Endless Battle!' },
];

export default function RankModal({ isOpen, onClose, currentUser }) {
  const [reloText, setReloText] = useState('');

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('5');
      if (res.text) setReloText(res.text);
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const completedStagesCount = storageService.getCompletedStagesCount(currentUser?.progress);
  const totalScore = currentUser?.totalScore || 0;

  // Sequential Rank Unlock Requirement: Rank N requires Rank N-1 unlocked + score requirement
  let prevUnlocked = true;
  const isUnlockedMap = {};
  RANK_DEFINITIONS.forEach((rank) => {
    if (rank.level === 1) {
      isUnlockedMap[rank.level] = true;
    } else {
      const unlocked = prevUnlocked && (totalScore >= rank.reqScore);
      isUnlockedMap[rank.level] = unlocked;
      if (!unlocked) prevUnlocked = false;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT - COMPACT BALANCED SIZING */}
      <div 
        className="relative w-full max-w-[420px] sm:max-w-[440px] p-3 sm:p-3.5 md:p-4 rounded-2xl sm:rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] flex flex-col items-center h-[460px] sm:h-[480px] max-h-[72vh] overflow-hidden"
        style={{ backgroundImage: `url('/assets/tampilan di rank/asset/rank_board@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playClick(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-30 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          title="Tutup Menu Rank"
        >
          <img 
            src="/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png" 
            alt="Exit" 
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN RANK ICON BADGE (Rank_Icon@4x.png) */}
        <div className="flex flex-col items-center relative -mt-1 mb-1 sm:mb-1.5">
          <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di rank/asset/Rank_Icon@4x.png" 
              alt="Rank Icon Badge" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="font-pencil text-lg sm:text-xl font-black text-white mt-0.5 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            Rank
          </h2>
        </div>

        {/* 10 RANKS SCROLLABLE LIST CONTAINER WITH WOODEN SCROLLER TRACK & PIN BUTTON */}
        <CustomWoodenScroller className="space-y-1.5 sm:space-y-2 px-1 pb-1 pr-1" containerClassName="w-full flex-1 min-h-0" pinSize={28}>
          {RANK_DEFINITIONS.map((rank) => {
            const isRank1 = rank.level === 1;
            const isRank10 = rank.level === 10;
            const isUnlocked = Boolean(isUnlockedMap[rank.level]);

            return (
              <div
                key={rank.level}
                className={`relative p-2 sm:p-2.5 rounded-xl border-2 flex items-center justify-between shadow-[2px_3px_0px_#2D241E] overflow-hidden transition-all ${
                  isUnlocked
                    ? isRank10
                      ? 'bg-gradient-to-r from-amber-300/90 via-yellow-400/90 to-amber-500/90 border-[#2D241E] text-[#2D241E] ring-2 ring-yellow-300/90 shadow-[0_0_15px_rgba(245,158,11,0.85)] animate-pulse'
                      : 'glass-card border-white/60 text-[#2D241E]'
                    : 'bg-black/40 border-white/20 text-white/70'
                }`}
              >
                {/* GLOW SPARKLES EFFECT FOR UNLOCKED MAX RANK 10 */}
                {isRank10 && isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-0">
                    <div className="absolute top-1 left-3 text-white animate-spin-slow text-xs">✨</div>
                    <div className="absolute bottom-1 right-5 text-amber-200 animate-ping text-[10px]">⭐</div>
                  </div>
                )}

                <div className="flex items-center space-x-2 sm:space-x-3 z-10 min-w-0 pr-1">
                  {/* Rank Shield Icon Asset */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center relative flex-shrink-0 transition-transform ${
                    isUnlocked ? 'hover:scale-105' : ''
                  }`}>
                    <img 
                      src={rank.path} 
                      alt={rank.name}
                      className={`w-full h-full object-contain filter ${
                        isUnlocked 
                          ? isRank10 
                            ? 'scale-105' 
                            : 'drop-shadow-sm'
                          : 'grayscale contrast-75 opacity-60'
                      }`}
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <Lock className="w-3.5 h-3.5 text-white/90" />
                      </div>
                    )}
                  </div>

                  {/* Rank Title & Description */}
                  <div className="flex flex-col min-w-0">
                    <h3 className={`font-pencil text-xs sm:text-sm font-extrabold leading-tight break-words ${
                      isUnlocked ? 'text-[#2D241E]' : 'text-white/90'
                    }`}>
                      {rank.name}
                    </h3>
                    <p className={`text-[10px] sm:text-[11px] font-bold leading-tight ${
                      isUnlocked ? 'text-[#78350F]' : 'text-white/60'
                    }`}>
                      {rank.desc}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="z-10 text-right flex-shrink-0 pl-1.5">
                  {isUnlocked ? (
                    <span className={`inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-sans font-black border border-[#2D241E] ${
                      isRank10 ? 'bg-amber-400 text-[#2D241E]' : 'bg-[#D1FAE5] text-[#065F46]'
                    }`}>
                      {isRank10 ? <Sparkles className="w-2.5 h-2.5 fill-current" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                      <span>{isRank10 ? 'MAX!' : 'TERCAPAI'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-sans font-extrabold bg-black/40 text-white/70 border border-white/20">
                      <Lock className="w-2.5 h-2.5" />
                      <span>TERKUNCI</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </CustomWoodenScroller>

      </div>
 
      {/* DETEKTIF RYU MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="happy"
        emotion="happy"
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={reloText || 'Tingkatkan prestasimu untuk meraih Rank tertinggi! 🎖️🔥🐉'}
      />

    </div>
  );
}
