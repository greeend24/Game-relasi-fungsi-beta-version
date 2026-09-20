import React from 'react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../public/assets/loading/loading_animation.json';

export default function GameTransitionLoader({ 
  title = "Membuka Berkas Kasus...", 
  subtitle = "Detektif Relo sedang menyiapkan petunjuk...",
  isOpen = true 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2]/90 backdrop-blur-sm animate-fade-in font-hand select-none pointer-events-auto">
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-[3.5px] border-[#2D241E] shadow-[6px_8px_0px_#2D241E] flex flex-col items-center text-center max-w-sm mx-4 space-y-4 animate-scale-up">
        
        {/* Animated Badge */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <Lottie 
            animationData={loadingAnimation} 
            loop={true} 
            autoplay={true} 
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-black font-pencil text-[#2D241E] tracking-wide">
            {title}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#78350F] animate-pulse">
            {subtitle}
          </p>
        </div>

        {/* Mini Detective Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#E5E7EB] border-2 border-[#2D241E] overflow-hidden p-0.5 shadow-[1px_1px_0px_#2D241E]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
}
