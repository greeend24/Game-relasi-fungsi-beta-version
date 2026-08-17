import React from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/audioEngine';

/**
 * AchievementUnlockedModal
 * Animated achievement popup when a player unlocks a new badge category!
 */
export default function AchievementUnlockedModal({ badge, onClose }) {
  if (!badge) return null;

  React.useEffect(() => {
    audioEngine.playBadgeUnlock();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  }, [badge]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-hand">
      <div className="w-full max-w-sm p-6 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-center space-y-4 animate-scale-up">
        
        <div className="w-20 h-20 mx-auto rounded-3xl border-3 border-[#2D241E] shadow-[4px_4px_0px_#2D241E] flex items-center justify-center text-4xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 animate-bounce">
          {badge.icon}
        </div>

        <div className="space-y-1">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-[#FEF3C7] text-[#78350F] font-extrabold text-xs border border-[#2D241E]">
            <Sparkles className="w-4 h-4 text-[#D97706] animate-spin-slow" />
            <span>LENCANA BARU TERBUKA!</span>
          </span>
          <h2 className="text-2xl font-bold font-pencil text-[#2D241E]">
            {badge.name}
          </h2>
          <p className="text-xs text-[#4A3E3D] font-bold">
            {badge.desc}
          </p>
        </div>

        <button
          onClick={() => { audioEngine.playClick(); onClose(); }}
          className="pencil-btn w-full py-3 bg-[#FDE68A] text-[#78350F] font-extrabold text-sm flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-5 h-5 text-[#D97706]" />
          <span>KLAIM LENCANA & LANJUT!</span>
        </button>

      </div>
    </div>
  );
}
