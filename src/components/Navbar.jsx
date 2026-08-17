import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export default function Navbar({ currentUser, onHomeClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b-2.5 border-[#2D241E] px-3 sm:px-4 py-2 font-hand shadow-[0_4px_12px_rgba(45,36,30,0.1)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { audioEngine.playClick(); onHomeClick?.(); }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex items-center justify-center font-bold text-base">
            🦉
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold font-pencil text-[#2D241E] leading-none group-hover:text-[#D97706] transition">
              Detektif Data
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#78350F] font-bold">Relasi & Fungsi (Petualangan Data)</p>
          </div>
        </div>

        {/* User Badge Only (Top Text Action Buttons Removed as Requested) */}
        {currentUser && (
          <div className="flex items-center space-x-1.5 text-xs font-bold">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-md border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="text-[#2D241E] font-bold text-[11px] sm:text-xs">{currentUser.fullname || currentUser.username}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#FEF3C7]/60 backdrop-blur-sm text-[#78350F] text-[10px] font-extrabold border border-[#2D241E]">
                ⭐ {currentUser.totalScore || 0}
              </span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
