import React from 'react';
import { RotateCcw, Maximize, ArrowRight } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export default function RotatePhoneOverlay({ onEnterFullscreen, onDismiss }) {
  const handleFullscreen = async () => {
    try {
      audioEngine.playClick();
    } catch {}

    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen();
        }
      }
      if (window.screen?.orientation?.lock) {
        await window.screen.orientation.lock('landscape').catch(() => {});
      }
    } catch {}

    if (onEnterFullscreen) onEnterFullscreen();
  };

  const handleDismiss = () => {
    try {
      audioEngine.playClick();
    } catch {}
    if (onDismiss) onDismiss();
  };

  return (
    <div className="fixed inset-0 z-[9999999] bg-[#1c1815] text-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center select-none font-sans overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F59E0B]/20 via-[#1c1815]/80 to-[#0d0c0a] pointer-events-none" />

      <div className="relative z-10 max-w-sm w-full flex flex-col items-center space-y-6">
        {/* Animated Phone Graphic (Rotating 0deg -> 90deg) */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute inset-0 rounded-full bg-[#FFE4A0]/20 animate-ping opacity-40" />

          {/* Phone Frame that rotates */}
          <div className="relative w-20 h-28 rounded-2xl bg-[#FFE4A0] border-4 border-[#2D241E] shadow-[6px_6px_0px_#2D241E] flex flex-col items-center justify-between p-2 animate-[rotatePhone_3s_ease-in-out_infinite]">
            {/* Speaker bar */}
            <div className="w-6 h-1 rounded-full bg-[#2D241E]/40" />
            
            {/* Screen content (Owl icon) */}
            <div className="w-full flex-1 my-1 rounded-lg bg-[#FAF7F2] border-2 border-[#2D241E]/30 flex items-center justify-center text-3xl">
              🦉
            </div>

            {/* Home button/bar */}
            <div className="w-8 h-1 rounded-full bg-[#2D241E]/40" />
          </div>

          {/* Rotating badge indicator */}
          <div className="absolute -bottom-1 -right-1 w-11 h-11 rounded-full bg-[#3B82F6] border-2 border-white flex items-center justify-center text-white shadow-lg animate-spin" style={{ animationDuration: '4s' }}>
            <RotateCcw className="w-5 h-5" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-pencil text-[#FDE68A] tracking-wide leading-snug">
            PUTAR HP KE POSISI MENDATAR (LANSKAP)
          </h2>
          <p className="text-sm text-[#FAF7F2]/85 font-medium leading-relaxed">
            Game <strong>Detektif Data</strong> dirancang dengan rasio bioskop <strong>16:9</strong> (persis seperti di laptop). Putar HP Anda ke posisi mendatar agar diagram dan papan tantangan tampil <strong>penuh, jernih, dan tidak terpotong</strong>!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-2">
          <button
            onClick={handleFullscreen}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#2D241E] font-black text-base border-3 border-[#2D241E] shadow-[4px_4px_0px_#2D241E] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Maximize className="w-5 h-5" />
            <span>Layar Penuh (Fullscreen)</span>
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2]/80 hover:text-white font-bold text-xs border border-white/20 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Tetap Lanjut Tanpa Putar Layar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Friendly Auto-Rotate tip */}
        <div className="p-2.5 rounded-xl bg-[#2D241E]/80 border border-[#FDE68A]/20">
          <p className="text-xs text-[#FDE68A]/80 font-mono">
            💡 <strong>Tips:</strong> Cukup aktifkan <em>Rotasi Otomatis</em> di HP Anda dan miringkan layar secara mendatar.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes rotatePhone {
          0%, 15% { transform: rotate(0deg); }
          50%, 85% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
