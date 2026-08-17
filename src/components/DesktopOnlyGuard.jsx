import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Maximize2, AlertTriangle } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export default function DesktopOnlyGuard() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Flag as small screen if width is less than 1024px (standard tablet portrait / phone)
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isSmallScreen || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-[#2D241E]/80 backdrop-blur-md flex items-center justify-center p-4 font-hand animate-fade-in">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border-4 border-[#2D241E] shadow-[10px_12px_0px_#2D241E] text-[#2D241E] space-y-6 text-center relative overflow-hidden">
        
        {/* Header Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FEF3C7] border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E] flex items-center justify-center text-4xl">
            💻
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#EF4444] text-white border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
            <Smartphone className="w-5 h-5" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#FEE2E2] border-2 border-[#2D241E] text-xs font-black text-[#991B1B]">
            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            <span>MODE KHUSUS DESKTOP & LAPTOP</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-pencil text-[#2D241E] leading-tight">
            Optimal di Layar Komputer / Laptop
          </h2>

          <p className="text-xs sm:text-sm text-[#4A3E3D] font-bold leading-relaxed">
            Game <strong className="text-[#D97706]">Detektif Data</strong> telah disetel khusus untuk perangkat <strong className="text-[#2563EB]">Desktop & Laptop</strong> agar diagram relasi dan papan penyelidikan dapat dimainkan secara optimal.
          </p>
        </div>

        {/* Suggestion Box */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2.5 border-[#2D241E] shadow-[3px_4px_0px_#2D241E] text-left space-y-2 text-xs font-bold text-[#78350F]">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
            <span>Petunjuk Penggunaan:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#4A3E3D] text-[11px] font-semibold">
            <li>Buka situs ini di PC / Desktop / Laptop Anda.</li>
            <li>Jika menggunakan laptop, perbesar (Maximize) jendela browser.</li>
            <li>Resolusi layar direkomendasikan minimal <strong>1024 pixel</strong>.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              try { audioEngine.playClick(); } catch {}
              setIsDismissed(true);
            }}
            className="pencil-btn flex-1 py-3 px-4 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E]"
          >
            <Maximize2 className="w-4 h-4 text-[#78350F]" />
            <span>Lanjutkan Tampilan Ini</span>
          </button>
        </div>

      </div>
    </div>
  );
}
