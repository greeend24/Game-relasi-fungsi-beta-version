import React, { useEffect, useState } from 'react';
import { preloadAllGameAssets } from '../services/reloFrameService';

const LOADING_TIPS = [
  'Mempersiapkan Materi Relasi & Fungsi...',
  'Mengasah Logika Matematika...',
  'Menghubungkan Himpunan Relasi & Fungsi...',
  'Memuat 7 Dunia Petualangan...',
  'Menyiapkan Suara Detektif Relo...',
  'Detektif Relo, Snowy & Ryu Siap Beraksi! 🚀'
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(20);
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tips
  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % LOADING_TIPS.length);
    }, 450);
    return () => clearInterval(tipTimer);
  }, []);

  // Preload all assets and track real loading progress
  useEffect(() => {
    let isMounted = true;
    let visualProgress = 85;

    // Smooth and snappy visual ticker: advances smoothly to visualProgress
    const ticker = setInterval(() => {
      if (!isMounted) return;
      setProgress(prev => {
        if (prev < visualProgress) {
          return Math.min(visualProgress, prev + 5);
        }
        return prev;
      });
    }, 16);

    const startPreloading = async () => {
      try {
        await preloadAllGameAssets((percent) => {
          if (isMounted) {
            visualProgress = Math.max(visualProgress, Math.min(95, percent));
          }
        });
      } catch (err) {
        console.warn('Preload notice:', err);
      }

      // Complete to 100% smoothly
      if (isMounted) {
        visualProgress = 100;
        setProgress(100);
        setTimeout(() => {
          if (isMounted) {
            onFinish();
          }
        }, 120);
      }
    };

    startPreloading();

    return () => {
      isMounted = false;
      clearInterval(ticker);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-hand text-[#2D241E]">
      {/* 1. SOFT PARCHMENT & SKY AMBIENT BACKGROUND (MATCHES THE GAME'S STAGE & LOBBY) */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(120% 120% at 50% 20%, #FFFDF7 0%, #FAF7F2 60%, #F3ECE2 100%)' 
        }} 
      />

      {/* AMBIENT SOFT LIGHT ORBS (WARM AMBER & SOFT SKY BLUE) */}
      <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-amber-300/20 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-amber-400/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-sky-300/15 blur-[90px] pointer-events-none" />

      {/* SUBTLE DETECTIVE & MATH MOTIFS */}
      <div className="absolute top-8 left-10 text-[#78350F]/20 text-2xl font-bold font-mono pointer-events-none animate-pulse">
        f(x)
      </div>
      <div className="absolute bottom-10 left-12 text-[#78350F]/20 text-3xl font-bold font-mono pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}>
        ∑
      </div>
      <div className="absolute top-12 right-12 text-[#78350F]/20 text-2xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }}>
        ✨
      </div>
      <div className="absolute bottom-12 right-14 text-[#78350F]/20 text-2xl pointer-events-none animate-pulse" style={{ animationDelay: '0.5s' }}>
        🔍
      </div>

      {/* 2. AUTHENTIC CRYSTAL FROSTED GLASSMORPHIC CARD */}
      <div 
        className="glass-card glass-sheen relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center space-y-4 sm:space-y-5 overflow-hidden border-2 border-white/80 shadow-[0_20px_50px_rgba(45,36,30,0.12),inset_0_2px_4px_rgba(255,255,255,0.95)]"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.40) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}
      >
        
        {/* SPECULAR TOP GLASS HIGHLIGHT SHEEN */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* 3. HERO CIRCULAR GAME LOGO WITH AMBER GLASS FRAME */}
        <div className="relative flex items-center justify-center my-1">
          {/* Subtle Warm Amber Glow Aura */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-300/20 to-amber-500/25 blur-lg animate-pulse-glow pointer-events-none" />
          
          {/* Orbiting Dashed Ring (Amber Game Accent) */}
          <div className="absolute -inset-3.5 rounded-full border-2 border-dashed border-[#F59E0B]/45 animate-orbit-ring pointer-events-none" />
          
          {/* Inner Accent Ring */}
          <div className="absolute -inset-1.5 rounded-full border border-amber-300/60 pointer-events-none" />

          {/* Master Circular Logo Container with Comic-Pencil Border */}
          <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-full p-1 bg-gradient-to-b from-white via-amber-200 to-amber-400 border-[3px] border-[#2D241E] shadow-[3px_4px_0px_#2D241E] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] flex items-center justify-center shadow-inner">
              <img 
                src="/icon.png" 
                onError={(e) => { 
                  e.currentTarget.src = '/assets/Logo game/logo game icon.png'; 
                }}
                alt="Logo Detektif Data" 
                className="w-full h-full object-cover select-none pointer-events-none filter drop-shadow-md animate-logo-float" 
              />
            </div>

            {/* Corner Detective Magnifying Glass Badge */}
            <div className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF3C7] border-2 border-[#2D241E] flex items-center justify-center text-sm sm:text-base shadow-[2px_2px_0px_#2D241E] z-20">
              🔍
            </div>
          </div>
        </div>

        {/* 4. GAME BRANDING & THEMATIC BADGE */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider font-pencil text-[#2D241E] drop-shadow-sm uppercase">
            DETEKTIF DATA
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] border-2 border-[#2D241E] text-[#78350F] text-xs sm:text-sm font-black tracking-wider uppercase shadow-[1px_1px_0px_#2D241E]">
            <span>⚖️</span>
            <span>GAME RELASI &amp; FUNGSI</span>
          </div>
        </div>

        {/* 5. DYNAMIC DETECTIVE TIPS BANNER (FROSTED GLASS) */}
        <div className="w-full min-h-[38px] flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/70 border-2 border-[#2D241E]/30 text-[#78350F] text-xs sm:text-sm font-bold shadow-sm">
          <span className="text-[#D97706] animate-pulse">💡</span>
          <span className="transition-opacity duration-300 font-sans">{LOADING_TIPS[tipIndex]}</span>
        </div>

        {/* 6. ENLARGED & THICKER PROGRESS BAR (WARM AMBER PALETTE - NO RAINBOW) */}
        <div className="w-full space-y-2 pt-1">
          {/* Status and Percentage Row */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#2D241E] tracking-wider font-pencil">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D97706]"></span>
              </span>
              <span>MEMUAT DATA...</span>
            </div>
            
            <div className="px-3 py-0.5 rounded-full bg-[#FEF3C7] border-2 border-[#2D241E] text-[#78350F] font-mono font-black text-xs sm:text-sm shadow-[1px_1px_0px_#2D241E]">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Thick Progress Track with Pencil-Comic Border & Glass Inset */}
          <div className="w-full h-7 sm:h-8 rounded-full bg-white/65 border-[2.5px] border-[#2D241E] p-1 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(45,36,30,0.15),2px_2px_0px_#2D241E]">
            {/* Thematic Pure Amber & Gold Fill Bar (Strictly No Rainbow) */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-150 relative overflow-hidden shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${progress}%` }}
            >
              {/* Glossy Top Sheen Reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/40 rounded-t-full pointer-events-none" />
              
              {/* Soft White Shimmer Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-bar-shimmer pointer-events-none" />
            </div>
          </div>

          {/* Subtle Detective Footer Note */}
          <p className="text-[11px] sm:text-xs text-[#78350F]/75 tracking-wider font-pencil font-bold pt-0.5">
            Detektif Relo, Snowy &amp; Ryu Siap Beraksi! ✨
          </p>
        </div>

      </div>
    </div>
  );
}
