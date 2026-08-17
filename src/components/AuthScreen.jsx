import React, { useState } from 'react';
import { ShieldCheck, User, Lock, UserPlus, LogIn, Sparkles, UserCheck } from 'lucide-react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import ProfessorOwlMascot from './ProfessorOwlMascot';

export default function AuthScreen({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      try { audioEngine.playError(); } catch {}
      setErrorMsg('Harap isi username dan password!');
      return;
    }

    if (isRegisterMode) {
      const res = storageService.register(username.trim(), password, fullname.trim());
      if (res.success && res.user) {
        try { audioEngine.playStageClear(); } catch {}
        try { audioEngine.toggleBgm(true); } catch {}
        onLoginSuccess(res.user);
      } else {
        try { audioEngine.playError(); } catch {}
        setErrorMsg(res.message || 'Gagal mendaftarkan akun!');
      }
    } else {
      const res = storageService.login(username.trim(), password);
      if (res.success && res.user) {
        try { audioEngine.playCorrect(); } catch {}
        try { audioEngine.toggleBgm(true); } catch {}
        onLoginSuccess(res.user);
      } else {
        try { audioEngine.playError(); } catch {}
        setErrorMsg(res.message || 'Username atau password salah!');
      }
    }
  };

  const handleGuestLogin = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try { audioEngine.playClick(); } catch {}

    // ALWAYS RESET Guest Mode data to a clean, fresh initial state upon entry!
    const freshGuestUser = {
      username: 'detektif_tamu',
      password: '123456',
      fullname: 'Detektif Tamu (Demo)',
      totalScore: 0,
      endlessHighScore: 0,
      unlockedBadges: ['badge1'],
      progress: {
        subbab1: { unlocked: true, currentStage: 1, stars: {} },
        subbab2: { unlocked: false, currentStage: 1, stars: {} },
        subbab3: { unlocked: false, currentStage: 1, stars: {} },
        subbab4: { unlocked: false, currentStage: 1, stars: {} },
        subbab5: { unlocked: false, currentStage: 1, stars: {} },
        subbab6: { unlocked: false, currentStage: 1, stars: {} },
        subbab7: { unlocked: false, currentStage: 1, stars: {} }
      }
    };

    // Save as active current user and navigate to MainMenu
    storageService.setCurrentUser(freshGuestUser);
    try { audioEngine.playStageClear(); } catch {}
    try { audioEngine.toggleBgm(true); } catch {}

    onLoginSuccess(freshGuestUser);
  };

  return (
    <div className="max-w-md mx-auto my-6 p-4 font-hand relative z-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] space-y-6 text-[#2D241E] relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FEF3C7] border-2.5 border-[#2D241E] shadow-[3px_3px_0px_#2D241E] flex items-center justify-center text-3xl font-bold">
            🦉
          </div>
          <h2 className="text-3xl font-extrabold font-pencil text-[#2D241E] tracking-wide">
            DETEKTIF DATA
          </h2>
          <p className="text-xs text-[#78350F] font-bold">
            Akademi Penyelidikan Relasi & Fungsi SMP Class VIII
          </p>
        </div>

        {/* Mascot */}
        <div className="flex justify-center">
          <ProfessorOwlMascot
            pose="welcoming"
            emotion="happy"
            message="Selamat datang Agen Detektif! Pilih Masuk Akun, Akun Demo, atau Buat Akun di bawah!"
            size="md"
          />
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-[#FFE4E6] border-2 border-[#2D241E] text-[#BE123C] text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm font-bold">
          
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="text-xs text-[#78350F]">NAMA LENGKAP DETEKTIF</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: GreeND24..."
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7]"
                />
                <User className="w-5 h-5 text-[#78350F] absolute right-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-[#78350F]">USERNAME DETEKTIF</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7]"
              />
              <ShieldCheck className="w-5 h-5 text-[#78350F] absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#78350F]">KATA SANDI (PASSWORD)</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7]"
              />
              <Lock className="w-5 h-5 text-[#78350F] absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* BUTTON 1: MASUK AKUN / DAFTARKAN AKUN */}
          <button
            type="submit"
            className="pencil-btn w-full py-3.5 bg-[#FDE68A] text-[#78350F] font-extrabold text-base flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] hover:scale-[1.02] active:translate-y-0.5 cursor-pointer"
          >
            {isRegisterMode ? <UserPlus className="w-5 h-5 text-[#D97706] animate-bounce" /> : <LogIn className="w-5 h-5 text-[#D97706] animate-bounce" />}
            <span>{isRegisterMode ? 'DAFTARKAN AKUN DETEKTIF' : 'MASUK AKUN DETEKTIF'}</span>
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t-2 border-[#EFECE6]"></div>
          <span className="flex-shrink mx-3 text-xs text-[#78350F] font-extrabold">OPSI LAINNYA</span>
          <div className="flex-grow border-t-2 border-[#EFECE6]"></div>
        </div>

        {/* BUTTON 2: AKUN DEMO */}
        <button
          type="button"
          onClick={handleGuestLogin}
          className="pencil-btn w-full py-3.5 bg-[#DBEAFE] text-[#1E40AF] font-extrabold text-sm flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] hover:scale-[1.02] active:translate-y-0.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#2563EB] animate-pulse" />
          <span>Akun Demo</span>
        </button>

        {/* BUTTON 3: BUAT AKUN / MASUK AKUN TOGGLE BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            try { audioEngine.playClick(); } catch {}
            setIsRegisterMode(!isRegisterMode);
            setErrorMsg('');
          }}
          className="pencil-btn w-full py-3.5 bg-[#D1FAE5] text-[#065F46] font-extrabold text-sm flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] hover:scale-[1.02] active:translate-y-0.5 cursor-pointer"
        >
          <UserCheck className="w-4 h-4 text-[#059669]" />
          <span>{isRegisterMode ? 'SUDAH PUNYA AKUN? MASUK DI SINI' : 'BELUM PUNYA AKUN? BUAT AKUN BARU'}</span>
        </button>

      </div>
    </div>
  );
}
