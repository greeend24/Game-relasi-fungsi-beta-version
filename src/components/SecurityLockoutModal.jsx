import React, { useState, useEffect } from 'react';
import { Lock, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import { securityLockoutService } from '../services/securityLockoutService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';

export default function SecurityLockoutModal({ isLocked, remainingSeconds, currentUser, onUnlocked }) {
  const [timeLeft, setTimeLeft] = useState(remainingSeconds || 300);
  const [ryuText, setRyuText] = useState('');

  useEffect(() => {
    if (isLocked) {
      try {
        const res = reloVoiceService.playScene('security_lockout');
        if (res && res.text) setRyuText(res.text);
      } catch {}
    } else {
      try { reloVoiceService.stopVoice(); } catch {}
    }
  }, [isLocked]);

  useEffect(() => {
    setTimeLeft(remainingSeconds);
  }, [remainingSeconds]);

  useEffect(() => {
    if (!isLocked) return;

    // Tick every 1 second
    const interval = setInterval(() => {
      const status = securityLockoutService.checkStatus();
      if (!status.isLocked || status.remainingSeconds <= 0) {
        clearInterval(interval);
        securityLockoutService.clearLockout();
        try { audioEngine.playPowerUp(); } catch {}
        if (onUnlocked) onUnlocked();
      } else {
        setTimeLeft(status.remainingSeconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked, onUnlocked]);

  if (!isLocked) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalLockedSeconds = 300; // 5 minutes
  const progressPercent = Math.max(0, Math.min(100, ((totalLockedSeconds - timeLeft) / totalLockedSeconds) * 100));

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand select-none">
      
      {/* WOODEN BOARD CONTAINER MATCHING GAME AESTHETICS (board_exit@4x.png) */}
      <div 
        className="relative w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-3.5 sm:space-y-4 overflow-hidden select-none"
        style={{ backgroundImage: `url('/assets/tampilan di exit/Asset/board_exit@4x.png')` }}
      >
        {/* TOP WOODEN / COMIC LOCK BADGE */}
        <div className="flex flex-col items-center relative -mt-5 sm:-mt-6">
          <div className="w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center relative drop-shadow-md bg-[#FEF3C7] rounded-full border-4 border-[#2D241E] shadow-[4px_4px_0px_#2D241E]">
            <Lock className="w-10 h-10 sm:w-11 sm:h-11 text-[#D97706]" />
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-[#FEF3C7] mt-1 uppercase tracking-wider text-center drop-shadow-md">
            Akses Game Dikunci
          </h2>
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mt-1 bg-[#FEE2E2] text-[#991B1B] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
            ⚠️ Pelanggaran Integritas (3/3)
          </span>
        </div>

        {/* WARNING EXPLANATION CARD (WARM COMIC PARCHMENT) */}
        <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border-[3px] border-[#2D241E] shadow-[4px_4px_0px_#2D241E] text-left space-y-1.5">
          <div className="flex items-center space-x-2 text-[#C2410C] font-black text-xs sm:text-sm border-b-2 border-amber-200/80 pb-1">
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-[#EA580C]" />
            <span>TERDETEKSI PINDAH TAB / KELUAR 3X</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#451A03] leading-relaxed">
            Kamu terdeteksi berpindah tab atau keluar dari permainan sebanyak <b>3 kali</b>. 
            Demi menjaga kejujuran dan disiplin penyelidikan, game diistirahatkan sementara selama <b>5 Menit</b>.
          </p>
        </div>

        {/* WAKTU TUNGGU COUNTDOWN BOX (MATCHING GAME PARCHMENT & COMIC BORDERS) */}
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-[3px] border-[#2D241E] shadow-[4px_4px_0px_#2D241E] flex flex-col items-center space-y-2.5 text-center">
          <div className="px-3.5 py-1 rounded-full bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex items-center space-x-2 text-[#78350F] font-black text-xs sm:text-sm uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
            <span>Waktu Tunggu Tersisa</span>
          </div>
          
          <div className="font-pencil text-5xl sm:text-6xl font-black text-[#78350F] tracking-widest drop-shadow-sm py-0.5">
            {formattedTime}
          </div>

          {/* PROGRESS BAR (COMIC AMBER GRADIENT) */}
          <div className="w-full bg-[#FAF7F2] h-4 sm:h-5 rounded-full overflow-hidden border-2 border-[#2D241E] p-0.5 shadow-[2px_2px_0px_#2D241E]">
            <div 
              className="h-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] rounded-full transition-all duration-1000 ease-linear shadow-inner"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#78350F]">
            Game akan otomatis terbuka kembali setelah waktu tunggu selesai.
          </span>

          {securityLockoutService.isAdmin(currentUser) && (
            <button
              onClick={() => {
                securityLockoutService.clearLockout();
                try { audioEngine.playClick(); } catch {}
                if (onUnlocked) onUnlocked();
              }}
              className="mt-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl border-2 border-[#1B4332] shadow-[2px_3px_0px_#1B4332] cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center space-x-1.5"
            >
              <span>🔓 Buka Kunci Cepat (Admin)</span>
            </button>
          )}
        </div>

        {/* BOTTOM INTEGRITY NOTICE */}
        <div className="flex items-center space-x-2 text-xs font-bold text-[#FEF3C7] text-center drop-shadow">
          <AlertTriangle className="w-4 h-4 text-[#FDE68A] flex-shrink-0" />
          <span>Jangan menutup halaman ini agar hitungan mundur tetap berjalan lancar!</span>
        </div>

      </div>

      {/* DETEKTIF RYU INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="thinking"
        emotion="idle"
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={ryuText || "Jadilah detektif yang jujur dan pantang menyerah! Tunggu 5 menit ini untuk merenungkan strategimu ya! 🔥🐉"}
      />

    </div>
  );
}
