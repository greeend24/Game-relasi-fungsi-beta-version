import React, { useState, useEffect } from 'react';
import InstructorMascotGuide from './InstructorMascotGuide';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

export default function ConfirmLogoutModal({ isOpen, onClose, onConfirmLogout }) {
  const [reloText, setReloText] = useState('Mau mengganti akunmu, Detektif? 🔄🔥🐉');

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('10');
      if (res && res.text) {
        setReloText(res.text);
      } else {
        setReloText('Mau mengganti akunmu, Detektif? 🔄🔥🐉');
      }
    } else {
      try { reloVoiceService.stopVoice(); } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT */}
      <div 
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-4 overflow-hidden select-none"
        style={{ backgroundImage: `url('/assets/tampilan di logout/Asset/board logout@4x.png')` }}
      >
        
        {/* CIRCULAR CLOSE BUTTON AT TOP RIGHT CORNER OF BOARD */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
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
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white mt-1 uppercase tracking-wider">
            Keluar
          </h2>
        </div>

        {/* BOTTOM ACTION BUTTONS: RED IYA (YES) vs GREEN TIDAK (NO) */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 pt-4 pb-2 w-full">
          
          {/* RED "IYA" LOG OUT BUTTON */}
          <button
            onClick={() => { 
              try { audioEngine.playClick(); } catch {} 
              onConfirmLogout(); 
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="image-btn focus:outline-none cursor-pointer"
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
              reloVoiceService.stopVoice();
              onClose(); 
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="image-btn focus:outline-none cursor-pointer"
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

      {/* DETEKTIF RYU MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="standing"
        emotion="happy"
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={reloText || 'Mau mengganti akunmu, Detektif? 🔄🔥🐉'}
      />

    </div>
  );
}
