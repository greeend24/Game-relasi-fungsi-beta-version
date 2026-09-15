import React, { useState, useEffect } from 'react';
import InstructorMascotGuide from './InstructorMascotGuide';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

export default function ConfirmExitModal({ isOpen, onClose, onConfirmExit }) {
  const [reloText, setReloText] = useState('Kamu mau meninggalkan Relo sendirian? 🥺🦉');

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('8');
      if (res && res.text) {
        setReloText(res.text);
      } else {
        setReloText('Kamu mau meninggalkan Relo sendirian? 🥺🦉');
      }
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT */}
      <div 
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-4 overflow-hidden select-none"
        style={{ backgroundImage: `url('/assets/tampilan di exit/Asset/board_exit@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer"
          title="Tutup Menu Keluar"
        >
          <img 
            src="/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png" 
            alt="Exit" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN POWER ICON BADGE (Exit_Icon@4x.png) */}
        <div className="flex flex-col items-center relative -mt-5 sm:-mt-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di exit/Asset/Exit_Icon@4x.png" 
              alt="Exit Icon" 
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
          
          {/* RED "IYA" BUTTON (yes_button_exit@4x.png) */}
          <button
            onClick={() => {
              try { audioEngine.playClick(); } catch {}
              try { audioEngine.stopAllBgmTracks(); } catch {}
              try { reloVoiceService.stopAll(); } catch {}
              if (onConfirmExit) onConfirmExit();
              try {
                if (window.electronAPI && window.electronAPI.exitApp) {
                  window.electronAPI.exitApp();
                } else if (window.electronAPI && window.electronAPI.quitApp) {
                  window.electronAPI.quitApp();
                } else {
                  window.close();
                }
              } catch (e) {
                window.close();
              }
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="image-btn focus:outline-none cursor-pointer"
            title="Iya, Keluar Game"
          >
            <img 
              src="/assets/tampilan di exit/Asset/yes_button_exit@4x.png" 
              alt="Iya" 
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </button>

          {/* GREEN "TIDAK" BUTTON (No_button_exit@4x.png) */}
          <button
            onClick={() => { audioEngine.playClick(); reloVoiceService.stopVoice(); onClose(); }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="image-btn focus:outline-none cursor-pointer"
            title="Tidak, Batal Keluar"
          >
            <img 
              src="/assets/tampilan di exit/Asset/No_button_exit@4x.png" 
              alt="Tidak" 
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </button>

        </div>

      </div>

      {/* DETEKTIF RELO MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="relo"
        pose="standing"
        emotion="sad"
        title="INSTRUKTUR RELO"
        icon="🕵️‍♂️"
        canSpeak={true}
        message={reloText || 'Kamu mau meninggalkan Relo sendirian? 🥺🦉'}
      />

    </div>
  );
}
