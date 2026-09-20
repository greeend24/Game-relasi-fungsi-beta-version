import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, Flame } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';

export default function StrikeWarningModal({ isOpen, strikes = 1, onClose }) {
  const isLastWarning = strikes === 2;
  const [ryuText, setRyuText] = useState('');

  useEffect(() => {
    if (isOpen && strikes > 0 && strikes < 3) {
      try {
        const res = reloVoiceService.playScene('strike_warning');
        if (res && res.text) setRyuText(res.text);
      } catch {}
    } else {
      try { reloVoiceService.stopVoice(); } catch {}
    }
  }, [isOpen, strikes]);

  if (!isOpen || strikes <= 0 || strikes >= 3) return null;

  return (
    <div className="fixed inset-0 z-[999998] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand select-none">
      
      {/* WOODEN WARNING BOARD */}
      <div 
        className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-4 overflow-hidden select-none animate-scale-up"
        style={{ backgroundImage: `url('/assets/tampilan di exit/Asset/board_exit@4x.png')` }}
      >
        {/* TOP BADGE ICON */}
        <div className="flex flex-col items-center relative -mt-6">
          <div className={`w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center relative drop-shadow-xl rounded-full border-4 border-[#2D241E] p-3.5 ${isLastWarning ? 'bg-gradient-to-br from-red-500 to-rose-700 animate-pulse' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
            {isLastWarning ? (
              <Flame className="w-10 h-10 text-yellow-200 animate-bounce" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-yellow-200" />
            )}
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-[#FEF3C7] mt-1 uppercase tracking-wider text-center drop-shadow">
            {isLastWarning ? 'Peringatan Keras!' : 'Peringatan Integritas'}
          </h2>
          <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-0.5 ${isLastWarning ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-400 text-[#2D241E]'}`}>
            Pelanggaran {strikes} dari 3
          </span>
        </div>

        {/* EXPLANATION MESSAGE */}
        <div className="w-full p-4 rounded-2xl bg-[#FFFDF9] border-3 border-[#2D241E] shadow-[3px_4px_0px_#2D241E] text-left space-y-2">
          <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-xs sm:text-sm border-b-2 border-amber-200 pb-1.5">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>TERDETEKSI BERPINDAH TAB / APLIKASI</span>
          </div>
          
          <p className="text-xs sm:text-sm font-bold text-[#451A03] leading-relaxed">
            {isLastWarning ? (
              <>
                <b className="text-red-600">Perhatian!</b> Kamu sudah berpindah tab sebanyak <b>2 kali</b>. 
                Jika berpindah tab <b>1 kali lagi</b>, game akan <b className="text-red-700 underline">otomatis dikunci selama 5 menit!</b>
              </>
            ) : (
              <>
                Kamu terdeteksi berpindah tab atau meninggalkan jendela game. 
                Harap tetap fokus pada penyelidikan ini. Jangan berpindah tab 3 kali berturut-turut!
              </>
            )}
          </p>
        </div>

        {/* CONFIRM BUTTON */}
        <button
          onClick={() => {
            try { audioEngine.playClick(); } catch {}
            try { reloVoiceService.stopVoice(); } catch {}
            onClose();
          }}
          className={`pencil-btn w-full py-3 ${isLastWarning ? 'bg-[#FCA5A5] hover:bg-[#F87171] text-[#7F1D1D]' : 'bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F]'} font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer hover:scale-102 transition-transform`}
        >
          <span>SAYA MENGERTI & LANJUT MAIN</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* DETEKTIF RYU MASCOT VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="thinking"
        emotion={isLastWarning ? 'worried' : 'idle'}
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={ryuText || (isLastWarning 
          ? 'Hati-hati detektif! Satu kali lagi pindah tab, akses game akan terkunci 5 menit! 🔥⚠️' 
          : 'Fokus pada layarmu ya detektif! Jangan sering berpindah tab! 🧐🔥')}
      />

    </div>
  );
}
