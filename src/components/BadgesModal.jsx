import React, { useState, useEffect } from 'react';
import { X, Award, Lock, CheckCircle2, Trophy } from 'lucide-react';
import { BADGE_DEFINITIONS, storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import ProfessorOwlMascot from './ProfessorOwlMascot';

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

  const unlockedBadges = new Set(currentUser?.unlockedBadges || ['badge1']);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] space-y-6 max-h-[88vh] overflow-y-auto drag-scroller">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#EFECE6]">
          <div className="flex items-center space-x-2">
            <Award className="w-7 h-7 text-[#D97706]" />
            <div>
              <h2 className="text-2xl font-bold font-pencil text-[#2D241E]">
                10 KATEGORI LENCANA DETEKTIF
              </h2>
              <p className="text-xs text-[#78350F] font-bold">Tingkatkan stage & skor untuk membuka semua lencana!</p>
            </div>
          </div>
          <button 
            onClick={() => { try { audioEngine.playClick(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
            className="pencil-btn p-1.5 bg-[#F3F4F6] text-[#374151]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot */}
        <div className="flex justify-center sm:justify-start">
          <ProfessorOwlMascot
            pose="hero"
            emotion="happy"
            message={reloText || "Koleksi lencanamu adalah bukti perjalananmu sebagai detektif. Mampukah kamu mendapatkan semuanya?"}
            size="sm"
          />
        </div>

        {/* 10 Badge Cards Grid - GRADIENT BOXES BY CATEGORY & LIGHT DUST FOR CAT 10 ONLY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {BADGE_DEFINITIONS.map((badge) => {
            const isUnlocked = unlockedBadges.has(badge.id);
            const isCategory10 = badge.category === 10;

            return (
              <div
                key={badge.id}
                className={`relative p-4 rounded-2xl border-2 flex items-center space-x-3.5 shadow-[3px_4px_0px_#2D241E] overflow-hidden transition-transform duration-200 ${
                  isUnlocked
                    ? `bg-gradient-to-br ${badge.cardGradient} border-[#2D241E] ${
                        isCategory10 ? 'ring-4 ring-yellow-300/90 animate-legendary-glow shadow-[0_0_30px_rgba(245,158,11,0.9)]' : ''
                      }`
                    : 'bg-[#FDFBF7] border-[#78350F] text-[#2D241E]'
                }`}
              >
                {/* FLOATING LIGHT DUST PARTICLES EFFECT - STRICTLY ONLY FOR CATEGORY 10 */}
                {isCategory10 && isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                    <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFF] animate-sparkle-dust-1" />
                    <div className="absolute top-5 right-8 w-2.5 h-2.5 rounded-full bg-yellow-100 shadow-[0_0_12px_#FFF] animate-sparkle-dust-2" />
                    <div className="absolute bottom-3 left-1/3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFF] animate-sparkle-dust-3" />
                    <div className="absolute bottom-2 right-6 w-2 h-2 rounded-full bg-amber-100 shadow-[0_0_10px_#FFF] animate-sparkle-dust-4" />
                    <div className="absolute top-1/2 left-8 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFF] animate-sparkle-dust-2" />
                    <div className="absolute top-3 right-1/4 w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#FFF] animate-sparkle-dust-1" />
                  </div>
                )}

                {/* Badge Icon Shield with HD PNG Asset */}
                <div className={`relative overflow-hidden w-14 h-14 rounded-2xl border-2 border-[#2D241E] flex items-center justify-center p-1.5 flex-shrink-0 shadow-[2px_2px_0px_#2D241E] z-10 ${
                  isUnlocked ? `bg-gradient-to-br ${badge.iconBg}` : 'bg-[#EFECE6] opacity-75'
                }`}>
                  {/* Dazzling Golden Glint Sheen Overlay - STRICTLY ONLY FOR CATEGORY 10 */}
                  {isCategory10 && isUnlocked && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-badge-shimmer pointer-events-none z-10" />
                  )}

                  <img
                    src={badge.iconPath}
                    alt={badge.name}
                    className={`w-full h-full object-contain filter drop-shadow-sm ${!isUnlocked ? 'grayscale contrast-125' : ''}`}
                  />
                </div>

                <div className="flex-1 space-y-1 pr-4 z-10">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#78350F] border border-[#2D241E]">
                      KATEGORI {badge.category}
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-[#2D241E] ${
                      badge.rarity === 'LEGENDARY' ? 'bg-[#FDE68A] text-[#78350F]' : badge.rarity === 'EPIC' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>

                  <h4 className={`font-bold text-sm sm:text-base font-pencil leading-tight ${isUnlocked ? badge.textColor : 'text-[#2D241E]'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-[11px] font-bold leading-tight ${isUnlocked ? badge.subTextColor : 'text-[#4A3E3D]'}`}>
                    {badge.desc}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="absolute right-3 top-3 z-10">
                  {isUnlocked ? (
                    isCategory10 ? (
                      <Trophy className="w-5 h-5 text-amber-950 animate-bounce" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-200 drop-shadow-md" />
                    )
                  ) : (
                    <Lock className="w-5 h-5 text-[#78350F]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
