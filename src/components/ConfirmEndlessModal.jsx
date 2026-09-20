import React, { useState, useEffect } from 'react';
import DetektifRelo from './DetektifRelo';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import { Flame, AlertTriangle } from 'lucide-react';

export default function ConfirmEndlessModal({ isOpen, onClose, onConfirm }) {
  const [ryuText, setRyuText] = useState(
    'Yo, Detektif! Di Endless Mode ini kita bakal maraton tantangan tanpa henti! Yakin sudah siap tempur bareng Ryu? 🔥🐉'
  );

  useEffect(() => {
    if (isOpen) {
      try {
        const res = reloVoiceService.playScene('endless_intro');
        if (res && res.text) {
          setRyuText(res.text);
        }
      } catch (err) {
        console.error('Error playing endless voice scene:', err);
      }
    } else {
      try {
        reloVoiceService.stopVoice();
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-hand select-none overflow-y-auto">
      
      {/* BRIEFING CONTAINER: DETEKTIF RYU + WOODEN BOARD */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-3 sm:gap-6 w-full max-w-4xl mx-auto my-auto py-2">

        {/* 1. DETEKTIF RYU MASCOT PRESENTATION (LEFT COLUMN) */}
        <div className="flex flex-col items-center justify-end flex-shrink-0 relative z-20">
          
          {/* Ryu's Comic Speech Bubble directly above him */}
          <div className="relative p-3 sm:p-3.5 rounded-2xl glass-bubble border border-white/85 shadow-[0_8px_24px_rgba(0,0,0,0.20)] text-[#2D241E] max-w-[260px] sm:max-w-[290px] mb-2 animate-fade-in text-center">
            <div className="flex items-center justify-center gap-1.5 text-[#9A3412] font-black text-xs sm:text-sm uppercase tracking-wider mb-1 border-b border-amber-300/50 pb-0.5">
              <span>🔥 INSTRUKTUR RYU</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2D241E] leading-snug">
              {ryuText}
            </p>
            {/* Downward SVG tail pointing straight to Ryu's head */}
            <svg 
              className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-[18px] h-[14px] pointer-events-none overflow-visible z-10"
              viewBox="0 0 24 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0C6 10 12 18 16 20C18 14 20 6 24 0H0Z" fill="rgba(255, 255, 255, 0.72)" />
              <path d="M0 0C6 10 12 18 16 20C18 14 20 6 24 0" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Detektif Ryu Animated Mascot */}
          <div 
            onClick={() => {
              try { audioEngine.playBoing(); } catch {}
              try {
                const res = reloVoiceService.playScene('endless_intro', false, true);
                if (res?.text) setRyuText(res.text);
              } catch {}
            }}
            className="cursor-pointer hover:scale-105 active:scale-95 transition-transform filter drop-shadow-2xl"
            title="Klik Ryu untuk mendengar suaranya!"
          >
            <DetektifRelo
              character="ryu"
              pose="confident"
              emotion="happy"
              size="instructor"
              isInstructor={true}
              canSpeak={true}
              disableBodyAnimation={false}
              message=""
            />
          </div>
        </div>

        {/* 2. WOODEN BOARD CONTAINER (RIGHT COLUMN) */}
        <div 
          className="relative w-full max-w-lg p-4 sm:p-6 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_12px_0px_#2D241E] text-[#2D241E] flex flex-col items-center overflow-hidden z-10"
          style={{ backgroundImage: `url('/assets/tampilan di logout/Asset/board logout@4x.png')` }}
        >
          
          {/* CIRCULAR CLOSE BUTTON AT TOP RIGHT CORNER */}
          <button 
            onClick={() => {
              try { audioEngine.playMenuClose(); } catch {}
              try { reloVoiceService.stopVoice(); } catch {}
              onClose();
            }}
            onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
            className="clean-icon-btn rounded-full overflow-hidden absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-30 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            title="Tutup & Batal"
          >
            <img 
              src="/assets/tampilan di logout/Asset/exit_button_of_menu@4x.png" 
              alt="Close" 
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md rounded-full"
              onError={(e) => {
                e.target.src = '/assets/tampilan di rank/asset/exit_button_menu_rank@4x.png';
              }}
            />
          </button>

          {/* TOP HEADER: FLAME ICON & TITLE */}
          <div className="flex flex-col items-center relative -mt-2 sm:-mt-3 mb-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative drop-shadow-lg">
              <img 
                src="/assets/tampilan di lobby/Asset/endless mode button@4x.png" 
                alt="Endless Mode Badge" 
                className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white mt-0.5 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
              ENDLESS MODE
            </h2>
            <span className="text-xs sm:text-sm font-bold text-amber-200 tracking-wide bg-[#2D241E]/75 px-3 py-0.5 rounded-full mt-0.5 border border-amber-400/40">
              Tantangan Maraton Relasi & Fungsi 🔥
            </span>
          </div>

          {/* PARCHMENT INNER CARD */}
          <div className="w-full bg-[#FFFBEB]/95 rounded-2xl border-2 border-[#D97706]/60 p-3 sm:p-4 shadow-inner space-y-2.5 text-left">
            
            {/* 1. PENJELASAN ENDLESS MODE */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#9A3412] font-black text-xs sm:text-sm border-b border-amber-200 pb-0.5">
                <Flame className="w-4 h-4 text-orange-600 animate-pulse flex-shrink-0" />
                <span>Tantangan Tanpa Henti</span>
              </div>
              <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed font-sans font-medium">
                Uji kemampuan analisismu lewat maraton soal cepat! Jawab benar beruntun untuk membangun <strong>Streak Combo Multiplier</strong> demi melipatgandakan skormu dan merebut puncak <strong>Leaderboard Global</strong>!
              </p>
            </div>

            {/* 2. PERINGATAN RESET SKOR KE 0 */}
            <div className="p-2.5 rounded-xl bg-amber-100/90 border-2 border-amber-500/80 text-[#78350F] space-y-0.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-red-700 font-black text-xs sm:text-sm uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 animate-bounce" />
                <span>Aturan Permainan:</span>
              </div>
              <p className="text-xs sm:text-sm text-red-900 leading-snug font-sans font-semibold">
                Jika kamu keluar atau mengakhiri sesi, giliranmu selesai dan <span className="text-red-700 font-black underline">nilaimu akan dihitung ulang dari 0 pada game berikutnya!</span>
              </p>
              <p className="text-[10px] sm:text-xs text-amber-800 font-sans italic">
                *Skor rekor tertinggi yang pernah kamu raih tetap aman tersimpan di Papan Peringkat.
              </p>
            </div>

          </div>

          {/* BOTTOM ACTION BUTTONS: IYA (START) vs TIDAK (CANCEL) */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-3 sm:pt-4 pb-1 w-full">
            
            {/* IYA / MASUK BUTTON */}
            <button
              onClick={() => { 
                try { audioEngine.playClick(); } catch {} 
                try { reloVoiceService.stopVoice(); } catch {}
                onConfirm(); 
              }}
              onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
              className="image-btn focus:outline-none cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
              title="Iya, Masuk Endless Mode"
            >
              <img 
                src="/assets/tampilan di endlessmode/iya endless.png" 
                alt="Iya, Masuk" 
                className="h-10 sm:h-12 md:h-13 w-auto object-contain drop-shadow-md"
                onError={(e) => {
                  e.target.src = '/assets/tampilan di logout/Asset/yes_button_log out.png';
                }}
              />
            </button>

            {/* TIDAK / BATAL BUTTON */}
            <button
              onClick={() => { 
                try { audioEngine.playClick(); } catch {} 
                try { reloVoiceService.stopVoice(); } catch {}
                onClose(); 
              }}
              onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
              className="image-btn focus:outline-none cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
              title="Tidak, Batal"
            >
              <img 
                src="/assets/tampilan di endlessmode/tidak endless.png" 
                alt="Tidak, Batal" 
                className="h-10 sm:h-12 md:h-13 w-auto object-contain drop-shadow-md"
                onError={(e) => {
                  e.target.src = '/assets/tampilan di logout/Asset/No_button_log out.png';
                }}
              />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
