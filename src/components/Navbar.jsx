import React from 'react';
import { audioEngine } from '../services/audioEngine';
import { getAvatarPath } from './AvatarModal';

export default function Navbar({ currentUser, onHomeClick, onOpenAvatar }) {
  return (
    <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b-2.5 border-[#2D241E] px-3 sm:px-4 py-2 font-hand shadow-[0_4px_12px_rgba(45,36,30,0.1)]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { audioEngine.playClick(); onHomeClick?.(); }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div 
            className="w-8.5 h-8.5 bg-contain bg-no-repeat bg-center flex items-center justify-center relative p-0.5 drop-shadow-sm flex-shrink-0"
            style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_border@4x.png')` }}
          >
            <div 
              className="w-5.5 h-5.5 rounded-md bg-[#8A6746] bg-cover bg-center flex items-center justify-center overflow-hidden"
              style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_background@4x.png')` }}
            >
              <img 
                src={getAvatarPath(currentUser?.avatarId)} 
                alt="Avatar" 
                className="w-4 h-4 object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🦉'; }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold font-pencil text-[#2D241E] leading-none group-hover:text-[#D97706] transition">
              Detektif Data
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#78350F] font-bold">Relasi & Fungsi (Petualangan Data)</p>
          </div>
        </div>

        {/* User Badge Chip */}
        {currentUser && (
          <div 
            onClick={() => { audioEngine.playClick(); onOpenAvatar?.(); }}
            className="flex items-center space-x-1.5 text-xs font-bold cursor-pointer hover:scale-105 transition"
            title="Klik untuk memilih Avatar"
          >
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E]">
              <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center">
                <img 
                  src={getAvatarPath(currentUser?.avatarId)} 
                  alt="Avatar" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[#2D241E] font-extrabold text-xs">{currentUser.fullname || currentUser.username}</span>
              <span className="flex items-center space-x-1 px-2 py-0.5 rounded-xl bg-[#FEF3C7] text-[#78350F] text-xs font-extrabold border border-[#2D241E]">
                <span>⭐</span>
                <span>{currentUser.totalScore || 0}</span>
              </span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
