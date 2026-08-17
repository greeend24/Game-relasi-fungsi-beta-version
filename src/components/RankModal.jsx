import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Sparkles, ShieldAlert } from 'lucide-react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import ProfessorOwlMascot from './ProfessorOwlMascot';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT */}
      <div 
        className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center max-h-[85vh] overflow-hidden"
        style={{ backgroundImage: `url('/assets/tampilan di rank/asset/rank_board@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playClick(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer"
          title="Tutup Menu Rank"
        >
          <img 
            src="/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png" 
            alt="Exit" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN RANK ICON BADGE (Rank_Icon@4x.png) */}
        <div className="flex flex-col items-center relative -mt-4 sm:-mt-5 mb-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di rank/asset/Rank_Icon@4x.png" 
              alt="Rank Icon Badge" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] mt-0.5 uppercase tracking-wider">
            Rank
          </h2>
        </div>

        {/* 10 RANKS SCROLLABLE LIST CONTAINER WITH WOODEN SCROLLER TRACK & PIN BUTTON */}
        <CustomWoodenScroller className="space-y-3 px-2 sm:px-3 pb-2 pr-2" containerClassName="w-full flex-1 min-h-0">
          {RANK_DEFINITIONS.map((rank) => {
            const isRank1 = rank.level === 1;
            const isRank10 = rank.level === 10;
            const isUnlocked = Boolean(isUnlockedMap[rank.level]);

            return (
              <div
                key={rank.level}
                className={`relative p-3 sm:p-4 rounded-2xl border-2 flex items-center justify-between shadow-[3px_4px_0px_#2D241E] overflow-hidden transition-all ${
                  isUnlocked
                    ? isRank10
                      ? 'bg-gradient-to-r from-amber-300/90 via-yellow-400/90 to-amber-500/90 border-[#2D241E] text-[#2D241E] ring-4 ring-yellow-300/90 shadow-[0_0_25px_rgba(245,158,11,0.85)] animate-pulse'
                      : 'bg-white/90 border-[#2D241E] text-[#2D241E]'
                    : 'bg-black/40 border-white/20 text-white/70'
                }`}
              >
                {/* GLOW SPARKLES EFFECT FOR UNLOCKED MAX RANK 10 */}
                {isRank10 && isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                    <div className="absolute top-2 left-4 text-white animate-spin-slow text-sm">✨</div>
                    <div className="absolute bottom-2 right-6 text-amber-200 animate-ping text-xs">⭐</div>
                  </div>
                )}

                <div className="flex items-center space-x-3 sm:space-x-4 z-10">
                  {/* Rank Shield Icon Asset */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative flex-shrink-0 transition-transform ${
                    isUnlocked ? 'hover:scale-110' : ''
                  }`}>
                    <img 
                      src={rank.path} 
                      alt={rank.name}
                      className={`w-full h-full object-contain filter ${
                        isUnlocked 
                          ? isRank10 
                            ? 'drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] scale-105' 
                            : 'drop-shadow-md'
                          : 'grayscale contrast-75 opacity-60'
                      }`}
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                        <Lock className="w-5 h-5 text-white/90 drop-shadow-md" />
                      </div>
                    )}
                  </div>

                  {/* Rank Title & Description */}
                  <div className="flex flex-col">
                    <h3 className={`font-pencil text-lg sm:text-xl font-extrabold leading-tight ${
                      isUnlocked ? 'text-[#2D241E]' : 'text-white/90'
                    }`}>
                      {rank.name}
                    </h3>
                    <p className={`text-xs font-bold ${
                      isUnlocked ? 'text-[#78350F]' : 'text-white/60'
                    }`}>
                      {rank.desc}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="z-10 text-right flex-shrink-0 pl-2">
                  {isUnlocked ? (
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-sans font-black border border-[#2D241E] ${
                      isRank10 ? 'bg-amber-400 text-[#2D241E]' : 'bg-[#D1FAE5] text-[#065F46]'
                    }`}>
                      {isRank10 ? <Sparkles className="w-3.5 h-3.5 fill-current" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{isRank10 ? 'MAX RANK!' : 'TERCAPAI'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-sans font-extrabold bg-black/40 text-white/70 border border-white/20">
                      <Lock className="w-3 h-3" />
                      <span>TERKUNCI</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </CustomWoodenScroller>

      </div>

      {/* DETEKTIF RELO MASCOT (+50% LARGER) & ENLARGED COMIC SPEECH BUBBLE */}
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 pointer-events-none flex flex-col items-start animate-fade-in max-w-[320px] sm:max-w-[420px]">
        {reloText && (
          <div className="relative mb-3 p-4 sm:p-5 rounded-3xl bg-white border-4 border-[#2D241E] shadow-[6px_8px_0px_rgba(45,36,30,0.9)] text-[#2D241E] font-hand pointer-events-auto">
            <div className="absolute -bottom-4 left-10 w-0 h-0 border-t-[16px] border-t-[#2D241E] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent" />
            <div className="absolute -bottom-[11px] left-10 w-0 h-0 border-t-[12px] border-t-white border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-black text-[#9A3412] uppercase tracking-wider mb-1.5 border-b-2 border-[#FED7AA] pb-1">
              <span className="text-base sm:text-lg">🕵️‍♂️</span>
              <span>PETUNJUK RELO</span>
            </div>
            <p className="text-base sm:text-lg font-black leading-snug text-[#2D241E]">
              {reloText}
            </p>
          </div>
        )}

        <ProfessorOwlMascot
          pose="happy"
          size="xxxl"
          animateOnHoverOnly={false}
          message=""
        />
      </div>

    </div>
  );
}
