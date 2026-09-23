import React, { useState, useEffect } from 'react';
import { Award, Lock, CheckCircle2, Trophy } from 'lucide-react';
import { BADGE_DEFINITIONS, storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';

/**
 * BadgesModal
 * Displays all 10 Detective Badge Categories with crisp 2D cartoon styling:
 * 🔒 LOCKED (clean cream card + lock icon), 🔓 UNLOCKED, ⭐ RARE, 🏆 MASTERED.
 */
export default function BadgesModal({ isOpen, onClose, currentUser }) {
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

  const userToEvaluate = currentUser ? storageService.evaluateNewBadges(JSON.parse(JSON.stringify(currentUser))).user : null;
  const unlockedBadges = new Set(userToEvaluate?.unlockedBadges || ['badge1']);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-5xl max-h-[92dvh] p-3.5 sm:p-4 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col justify-between space-y-2 sm:space-y-2.5 overflow-y-auto no-scrollbar select-none"
        style={{ backgroundImage: "url('/assets/tampilan di avatar menu board/Assets/board_of_avatar@4x.png')" }}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-white/20">
          <div className="flex items-center space-x-2">
            <Award className="w-7 h-7 text-[#D97706]" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-pencil text-[#FEF3C7]">
                10 KATEGORI LENCANA DETEKTIF
              </h2>
              <p className="text-xs sm:text-sm text-[#FDE68A] font-bold">Tingkatkan stage & skor untuk membuka semua lencana!</p>
            </div>
          </div>
          <button 
            onClick={() => { try { audioEngine.playClick(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
            className="clean-icon-btn rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform"
            title="Tutup Menu"
          >
            <img 
              src="/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png" 
              alt="Close" 
              className="w-10 h-10 object-contain rounded-full drop-shadow-md"
            />
          </button>
        </div>

        {/* 10 Badge Cards Grid - 5 Columns x 2 Rows (FIXED ZERO SCROLL) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {BADGE_DEFINITIONS.map((badge) => {
            const isUnlocked = unlockedBadges.has(badge.id);
            const isCategory10 = badge.category === 10;

            return (
              <div
                key={badge.id}
                className={`relative p-2.5 rounded-2xl border-2 flex flex-col justify-between items-center text-center shadow-[2px_3px_0px_#2D241E] overflow-hidden transition-transform duration-200 backdrop-blur-md h-[135px] sm:h-[145px] ${
                  isUnlocked
                    ? `bg-gradient-to-br ${badge.cardGradient} border-[#2D241E] ${
                        isCategory10 ? 'ring-3 ring-yellow-300 animate-legendary-glow shadow-[0_0_20px_rgba(245,158,11,0.8)]' : ''
                      }`
                    : 'bg-[#FDFBF7]/90 border-[#78350F] text-[#2D241E]'
                }`}
              >
                {/* FLOATING LIGHT DUST PARTICLES EFFECT - STRICTLY ONLY FOR CATEGORY 10 */}
                {isCategory10 && isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                    <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFF] animate-sparkle-dust-1" />
                    <div className="absolute top-5 right-8 w-2.5 h-2.5 rounded-full bg-yellow-100 shadow-[0_0_12px_#FFF] animate-sparkle-dust-2" />
                    <div className="absolute bottom-3 left-1/3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFF] animate-sparkle-dust-3" />
                  </div>
                )}

                {/* Status Indicator Badge */}
                <div className="absolute right-2 top-2 z-20">
                  {isUnlocked ? (
                    isCategory10 ? (
                      <Trophy className="w-4 h-4 text-amber-950 animate-bounce" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )
                  ) : (
                    <Lock className="w-4 h-4 text-[#78350F]" />
                  )}
                </div>

                {/* Badge Icon Shield with HD PNG Asset */}
                <div className={`relative overflow-hidden w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-[#2D241E] flex items-center justify-center p-1 flex-shrink-0 shadow-[1px_1px_0px_#2D241E] z-10 ${
                  isUnlocked ? `bg-gradient-to-br ${badge.iconBg}` : 'bg-[#EFECE6] opacity-75'
                }`}>
                  {isCategory10 && isUnlocked && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-badge-shimmer pointer-events-none z-10" />
                  )}

                  <img
                    src={badge.iconPath}
                    alt={badge.name}
                    className={`w-full h-full object-contain filter drop-shadow-sm ${!isUnlocked ? 'grayscale contrast-125' : ''}`}
                  />
                </div>

                <div className="w-full space-y-0.5 z-10 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#78350F] border border-[#2D241E] inline-block mx-auto">
                    KATEGORI {badge.category}
                  </span>

                  <h4 className={`font-bold text-xs sm:text-sm font-pencil leading-tight line-clamp-1 ${isUnlocked ? badge.textColor : 'text-[#2D241E]'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-[10px] font-bold leading-tight line-clamp-1 ${isUnlocked ? badge.subTextColor : 'text-[#4A3E3D]'}`}>
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* DETEKTIF RYU MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="standing"
        emotion="happy"
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={reloText || 'Kumpulkan semua 10 lencana detektif dengan menuntaskan setiap tantangan! 🏅🔥🐉'}
      />

    </div>
  );
}
