import React, { useState, useEffect } from 'react';
import { LogOut, X, Heart } from 'lucide-react';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

/**
 * ConfirmExitModal Component
 * Modal konfirmasi keluar game dengan dialog komik Detektif Relo:
 * "Kamu serius mau ninggalin aku? 🥺"
 */
export default function ConfirmExitModal({ isOpen, onClose, onConfirmExit }) {
  const [reloText, setReloText] = useState('Kamu serius mau ninggalin aku? 🥺');

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('8');
      if (res.text) setReloText(res.text);
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-md p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border-[3.5px] border-[#2D241E] shadow-[8px_10px_0px_#2D241E] space-y-5 animate-scale-up text-center">
        
        {/* Close Modal Button */}
        <button
          onClick={() => { audioEngine.playClick(); reloVoiceService.stopVoice(); onClose(); }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#FEF3C7] text-[#78350F] border-2 border-[#2D241E] hover:bg-[#FCD34D] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#FFE4E6] text-[#BE123C] font-extrabold text-xs border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
          <LogOut className="w-3.5 h-3.5" />
          <span>KONFIRMASI KELUAR GAME</span>
        </div>

        {/* Detective Relo Mascot & Pleading Comic Speech Bubble */}
        <div className="flex flex-col items-center space-y-2 py-1">
          <ProfessorOwlMascot
            pose="thinking"
            message={reloText}
            size="md"
          />
        </div>

        {/* Action Choice Buttons: Cancel vs Yes */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          
          {/* CANCEL / BATAL */}
          <button
            onClick={() => { audioEngine.playClick(); onClose(); }}
            className="pencil-btn py-2.5 px-4 bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] font-black text-sm sm:text-base border-2.5 border-[#2D241E] rounded-2xl shadow-[3px_4px_0px_#2D241E] flex items-center justify-center space-x-1.5 transition active:scale-95"
          >
            <Heart className="w-4 h-4 text-[#0284C7] fill-[#0284C7]/30" />
            <span>Cancel</span>
          </button>

          {/* YES / YA, KELUAR */}
          <button
            onClick={() => { audioEngine.playClick(); onConfirmExit(); }}
            className="pencil-btn py-2.5 px-4 bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#BE123C] font-black text-sm sm:text-base border-2.5 border-[#2D241E] rounded-2xl shadow-[3px_4px_0px_#2D241E] flex items-center justify-center space-x-1.5 transition active:scale-95"
          >
            <LogOut className="w-4 h-4 text-[#BE123C]" />
            <span>Yes</span>
          </button>

        </div>

      </div>
    </div>
  );
}
