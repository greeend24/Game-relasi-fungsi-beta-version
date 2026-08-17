import React, { useState, useEffect } from 'react';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

export default function ConfirmLogoutModal({ isOpen, onClose, onConfirmLogout }) {
  const [reloText, setReloText] = useState('Mau Mengganti Akunmu?');

  useEffect(() => {
    if (isOpen) {
      setReloText('Mau Mengganti Akunmu?');
    } else {
      try { reloVoiceService.stopVoice(); } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT */}
      <div 
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-4 max-h-[85vh] overflow-y-auto drag-scroller"
        style={{ backgroundImage: `url('/assets/tampilan di logout/Asset/board logout@4x.png')` }}
      >
        
        {/* CIRCULAR CLOSE BUTTON AT TOP RIGHT CORNER OF BOARD */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer hover:scale-110 transition-transform"
          title="Tutup Menu Log Out"
        >
          <img 
            src="/assets/tampilan di logout/Asset/exit_button_of_menu@4x.png" 
            alt="Close" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md rounded-full"
            onError={(e) => {
              e.target.src = '/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png';
            }}
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN LOGOUT ICON BADGE */}
        <div className="flex flex-col items-center relative -mt-5 sm:-mt-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di logout/Asset/log out icon@4x.png" 
              alt="Log Out Icon" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1 uppercase tracking-wider">
            Keluar
          </h2>
        </div>

        {/* MIDDLE CONTENT: QUESTION TEXT MESSAGE */}
        <div className="flex items-center justify-center py-3 w-full px-4 text-center">
          <p className="font-pencil text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] leading-snug max-w-sm">
            {reloText}
          </p>
        </div>

        {/* BOTTOM ACTION BUTTONS: RED IYA (YES) vs GREEN TIDAK (NO) */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-2 w-full">
          
          {/* RED "IYA" LOG OUT BUTTON */}
          <button
            onClick={() => { 
              try { audioEngine.playClick(); } catch {} 
              onConfirmLogout(); 
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="pencil-btn p-0 bg-transparent border-none shadow-none hover:scale-108 active:scale-95 transition-transform cursor-pointer"
            title="Iya, Ganti Akun"
          >
            <img 
              src="/assets/tampilan di logout/Asset/yes_button_log out.png" 
              alt="Iya" 
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </button>

          {/* GREEN "TIDAK" BUTTON */}
          <button
            onClick={() => { 
              try { audioEngine.playClick(); } catch {} 
              onClose(); 
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="pencil-btn p-0 bg-transparent border-none shadow-none hover:scale-108 active:scale-95 transition-transform cursor-pointer"
            title="Tidak, Batal"
          >
            <img 
              src="/assets/tampilan di logout/Asset/No_button_log out.png" 
              alt="Tidak" 
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </button>

        </div>

      </div>

      {/* DETEKTIF RELO MASCOT & SPEECH BUBBLE */}
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 pointer-events-none flex flex-col items-start animate-fade-in max-w-[320px] sm:max-w-[420px]">
        {reloText && (
          <div className="relative mb-3 p-4 sm:p-5 rounded-3xl bg-white border-4 border-[#2D241E] shadow-[6px_8px_0px_rgba(45,36,30,0.9)] text-[#2D241E] font-hand pointer-events-auto">
            <div className="absolute -bottom-4 left-10 w-0 h-0 border-t-[16px] border-t-[#2D241E] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent" />
            <div className="absolute -bottom-[11px] left-10 w-0 h-0 border-t-[12px] border-t-white border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-black text-[#9A3412] uppercase tracking-wider mb-1.5 border-b-2 border-[#FED7AA] pb-1">
              <span className="text-base sm:text-lg">🕵️‍♂️</span>
              <span>PETUNJUK RELO</span>
            </div>
            <p className="text-base sm:text-lg font-black leading-snug text-[#2D241E]">
              {reloText}
            </p>
          </div>
        )}

        <ProfessorOwlMascot
          pose="thinking"
          size="xxxl"
          animateOnHoverOnly={false}
          message=""
        />
      </div>

    </div>
  );
}
