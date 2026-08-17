import React, { useEffect, useState } from 'react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../public/assets/loading/loading_animation.json';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 200);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 8;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 200);
          return 100;
        }
        return Math.min(100, next);
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] font-hand animate-fade-in text-[#2D241E]">
      
      {/* Floating Math Symbols */}
      <div className="absolute top-12 left-10 text-3xl font-pencil font-bold text-[#D97706] animate-bounce-slow">
        f(x)
      </div>
      <div className="absolute bottom-16 right-12 text-4xl font-pencil font-bold text-[#2563EB] animate-pulse">
        ⊆
      </div>
      <div className="absolute top-24 right-16 text-3xl font-pencil font-bold text-[#059669] animate-spin-slow">
        π
      </div>
      <div className="absolute bottom-20 left-16 text-3xl font-pencil font-bold text-[#BE123C] animate-bounce">
        √x
      </div>

      <div className="w-full max-w-sm text-center space-y-4">
        
        {/* LOTTIE LOADING ANIMATION (ASSET REQUESTED BY USER) */}
        <div className="flex justify-center items-center w-36 h-36 mx-auto">
          <Lottie 
            animationData={loadingAnimation} 
            loop={true} 
            autoplay={true} 
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-pencil text-[#2D241E]">
            DETEKTIF DATA
          </h2>
          <p className="text-sm font-bold text-[#78350F] animate-pulse">
            Menyiapkan Petualangan Matematikamu...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-4 rounded-full bg-white border-2 border-[#2D241E] overflow-hidden p-0.5 shadow-[2px_2px_0px_#2D241E]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#2D241E] font-mono">{progress}%</span>
        </div>

      </div>
    </div>
  );
}
