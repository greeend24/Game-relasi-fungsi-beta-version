import React, { useState } from 'react';
import { ShieldCheck, User, Lock, UserPlus, LogIn, X, CheckCircle, Trash2, UserCheck, KeyRound, ArrowLeft } from 'lucide-react';
import { Lottie } from 'lottie-react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import LottieLoader from './LottieLoader';
import successAnimation from '../../public/assets/loading/success_animation.json';

export default function AuthScreen({ onLoginSuccess }) {
  // activeModal: null (menu 2 tombol), 'REGISTER' (modal buat akun), 'LOGIN' (modal pilih akun)
  const [activeModal, setActiveModal] = useState(null); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [regSuccessUser, setRegSuccessUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Saved accounts state for Pilih Akun modal
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isManualInput, setIsManualInput] = useState(false);

  const openCreateAccount = () => {
    try { audioEngine.playClick(); } catch {}
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setFullname('');
    setActiveModal('REGISTER');
  };

  const openSelectAccount = async () => {
    try { audioEngine.playClick(); } catch {}
    setErrorMsg('');
    const list = await storageService.getSavedAccounts();
    setSavedAccounts(list);
    setPassword('');

    if (list.length > 0) {
      setSelectedAccount(list[0]);
      setUsername(list[0].username);
      setIsManualInput(false);
    } else {
      setSelectedAccount(null);
      setUsername('');
      setIsManualInput(true);
    }

    setActiveModal('LOGIN');
  };

  const handleDeleteAccount = async (e, accUsername) => {
    e.stopPropagation();
    try { audioEngine.playClick(); } catch {}
    storageService.removeSavedAccount(accUsername);
    const updated = await storageService.getSavedAccounts();
    setSavedAccounts(updated);

    if (selectedAccount?.username.toLowerCase() === accUsername.toLowerCase()) {
      if (updated.length > 0) {
        setSelectedAccount(updated[0]);
        setUsername(updated[0].username);
      } else {
        setSelectedAccount(null);
        setUsername('');
        setIsManualInput(true);
      }
    }
  };

  const closeModal = () => {
    try { audioEngine.playMenuClose(); } catch {}
    setActiveModal(null);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      try { audioEngine.playError(); } catch {}
      setErrorMsg('Harap isi username dan password!');
      return;
    }

    if (activeModal === 'REGISTER') {
      const res = await storageService.register(username.trim(), password, fullname.trim());
      if (res.success && res.user) {
        try { audioEngine.playStageClear(); } catch {}
        try { audioEngine.toggleBgm(true); } catch {}
        // Show success animation popup and automatically enter lobby
        setRegSuccessUser(res.user);
        setTimeout(() => {
          onLoginSuccess(res.user);
        }, 1200);
      } else {
        try { audioEngine.playError(); } catch {}
        setErrorMsg(res.message || 'Gagal mendaftarkan akun!');
      }
    } else if (activeModal === 'LOGIN') {
      const res = await storageService.login(username.trim(), password);
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

  return (
    <div className="h-full w-full flex flex-col justify-between font-hand relative z-10 overflow-hidden bg-transparent select-none animate-fade-in">
      
      {/* 1. BOTTOM LANDSCAPE BACKGROUND ASSET (PINE TREES, GRASS & FENCE FROM LOBBY / MAIN MENU) */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full h-[580px] sm:h-[750px] bg-bottom bg-contain sm:bg-cover bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: `url('/assets/tampilan di lobby/Asset/asset_background@4x.png')` }}
      />

      {/* 2. TOP LOGO & BRANDING HEADER */}
      <div className="w-full flex flex-col items-center justify-center pt-6 sm:pt-10 z-20 pointer-events-none">
        <img 
          src="/assets/Logo game/game_logo.png" 
          alt="Logo Game Detektif Relasi & Fungsi" 
          className="w-64 sm:w-84 md:w-[420px] lg:w-[480px] h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] animate-logo-float"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 3. CENTER SECTION: MENU AWAL WITH 2 WOODEN BUTTONS ("Buat Akun" & "Pilih Akun") */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-20 -mt-16 sm:-mt-24">
        
        {/* 2 WOODEN PLANK BUTTONS CONTAINER (POSITIONED HIGHER WHERE RELO WAS) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-3xl px-4 pointer-events-auto">
          
          {/* GREEN WOODEN BUTTON: BUAT AKUN */}
          <button
            onClick={openCreateAccount}
            onMouseEnter={() => audioEngine.playHover()}
            className="image-btn focus:outline-none"
            title="Buat Akun Baru"
          >
            <img 
              src="/assets/tampilan sebelum masuk lobby/Asset/buat_akun_button.png" 
              alt="Buat Akun" 
              className="w-64 sm:w-72 md:w-80 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              onError={(e) => {
                e.target.src = '/assets/tampilan sebelum masuk lobby/Asset/buat akun_button _icon@4x.png';
              }}
            />
          </button>

          {/* BROWN WOODEN BUTTON: PILIH AKUN */}
          <button
            onClick={openSelectAccount}
            onMouseEnter={() => audioEngine.playHover()}
            className="image-btn focus:outline-none"
            title="Pilih / Masuk Akun"
          >
            <img 
              src="/assets/tampilan sebelum masuk lobby/Asset/pilih_akun_button.png" 
              alt="Pilih Akun" 
              className="w-64 sm:w-72 md:w-80 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              onError={(e) => {
                e.target.src = '/assets/tampilan sebelum masuk lobby/Asset/pilih akun_button_icon@4x.png';
              }}
            />
          </button>

        </div>
      </div>

      {/* FOOTER SPACER */}
      <div className="h-8 sm:h-12 w-full pointer-events-none" />

      {/* 4. MODAL POPUP FORM (BUAT AKUN / PILIH AKUN BOARD POPUP) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          
          {/* WOODEN BOARD WRAPPER WITH REAL PNG BOARD IMAGE */}
          <div className="relative w-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center p-6 sm:p-10">
            
            {/* REAL WOODEN BOARD IMAGE ASSET (board_buat_akun_pilih_akun@4x.png FOR BOTH MODALS) */}
            <img 
              src="/assets/tampilan sebelum masuk lobby/Asset/board_buat_akun_pilih_akun@4x.png" 
              alt="Board Background"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              onError={(e) => {
                e.target.src = '/assets/tampilan sebelum masuk lobby/Asset/board_buat_akun.png';
              }}
            />

            {/* CLOSE BUTTON (X) AT TOP RIGHT CORNER OF BOARD (IDENTICAL FOR BOTH MODALS) */}
            <button
              onClick={closeModal}
              onMouseEnter={() => audioEngine.playHover()}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40 cursor-pointer rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform"
              title="Tutup Menu"
            >
              <img 
                src="/assets/tampilan di logout/Asset/exit_button_of_menu@4x.png" 
                alt="Close" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </button>

            {/* INNER CONTENT OVERLAY CENTERED OVER BOARD */}
            <div className={`relative z-30 w-full max-w-sm px-4 ${activeModal === 'REGISTER' ? 'pt-10 pb-5 sm:pt-12 sm:pb-7 space-y-2.5' : 'py-8 sm:py-10 space-y-4'} text-[#2D241E]`}>
              
              {/* MODAL HEADER */}
              <div className="text-center space-y-1 pb-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-pencil text-[#FEF3C7] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide">
                  {activeModal === 'REGISTER' ? '📝 BUAT AKUN BARU' : '🔑 PILIH / MASUK AKUN'}
                </h2>
                <p className="text-xs sm:text-sm text-[#FDE68A] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {activeModal === 'REGISTER' 
                    ? 'Daftarkan ID Kelas & Absen (misal: VIIIA0005)' 
                    : 'Masukkan ID (Kelas & Absen) dan password'}
                </p>
              </div>

              {/* ERROR MESSAGE DISPLAY */}
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-[#FFE4E6] border-2 border-[#BE123C] text-[#BE123C] text-xs sm:text-sm font-bold text-center animate-shake shadow-md">
                  {errorMsg}
                </div>
              )}

              {/* INPUT FORM */}
              <form onSubmit={handleSubmit} className="space-y-3 font-bold text-sm sm:text-base">
                
                {/* ── PILIH AKUN TERSIMPAN MODE ── */}
                {activeModal === 'LOGIN' && savedAccounts.length > 0 && !isManualInput ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[#FDE68A] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] uppercase">
                        📋 PILIH AKUN TERSIMPAN
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsManualInput(true);
                          setUsername('');
                        }}
                        className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                      >
                        + Input ID Lain
                      </button>
                    </div>

                    {/* SCROLLABLE SAVED ACCOUNTS LIST */}
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                      {savedAccounts.map((acc) => {
                        const isSelected = selectedAccount?.username.toLowerCase() === acc.username.toLowerCase();
                        return (
                          <div
                            key={acc.username}
                            onClick={() => {
                              try { audioEngine.playClick(); } catch {}
                              setSelectedAccount(acc);
                              setUsername(acc.username);
                            }}
                            className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#FEF3C7] border-[#F59E0B] shadow-md'
                                : 'bg-white/90 border-[#2D241E] hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-2 overflow-hidden pr-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold ${
                                isSelected ? 'bg-[#F59E0B] text-white' : 'bg-[#E5E7EB] text-[#78350F]'
                              }`}>
                                {isSelected ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                              </div>
                              <div className="truncate text-left">
                                <p className="text-xs font-black text-[#2D241E] truncate uppercase">{acc.username}</p>
                                {acc.fullname && acc.fullname !== acc.username && (
                                  <p className="text-[11px] text-[#78350F] font-bold truncate leading-none">{acc.fullname}</p>
                                )}
                              </div>
                            </div>

                            {/* DELETE BUTTON (TRASH ICON) */}
                            <button
                              type="button"
                              onClick={(e) => handleDeleteAccount(e, acc.username)}
                              title="Hapus Akun dari Daftar"
                              className="p-1 rounded-lg text-[#BE123C] hover:bg-[#FFE4E6] hover:scale-110 active:scale-90 transition-transform cursor-pointer flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* PASSWORD INPUT FOR SELECTED ACCOUNT */}
                    <div className="space-y-1 pt-1">
                      <label className="text-xs text-[#FDE68A] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        🔒 KATA SANDI UNTUK <span className="text-white font-mono uppercase underline">{username}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Masukkan kata sandi..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-sm"
                          autoFocus
                        />
                        <Lock className="w-5 h-5 text-[#78350F] absolute right-3 top-3 opacity-70" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── MANUAL INPUT MODE (OR REGISTER MODE) ── */
                  <>
                    {/* FULLNAME INPUT (REGISTER ONLY) */}
                    {activeModal === 'REGISTER' && (
                      <div className="space-y-1">
                        <label className="text-xs text-[#FDE68A] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">NAMA LENGKAP DETEKTIF</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Contoh: GreeND24..."
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-sm"
                            autoFocus
                          />
                          <User className="w-5 h-5 text-[#78350F] absolute right-3 top-3 opacity-70" />
                        </div>
                      </div>
                    )}

                    {/* USERNAME / ID DETEKTIF INPUT (FORMAT: KELAS + 4 DIGIT ABSEN, e.g. VIIIA0005) */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-[#FDE68A] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">USERNAME DETEKTIF (KELAS & ABSEN)</label>
                        {activeModal === 'LOGIN' && savedAccounts.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setIsManualInput(false)}
                            className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer"
                          >
                            ← Daftar Akun
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Contoh: VIIIA0005..."
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toUpperCase())}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-sm font-bold uppercase tracking-wide"
                          autoFocus={activeModal === 'LOGIN'}
                        />
                        <ShieldCheck className="w-5 h-5 text-[#78350F] absolute right-3 top-3 opacity-70" />
                      </div>
                      <p className="text-xs text-[#FEF3C7] font-bold opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        💡 Format: Nama Kelas + 4 Digit Absen (contoh: <span className="underline font-black">VIIIA0005</span>)
                      </p>
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="space-y-1">
                      <label className="text-xs text-[#FDE68A] font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">KATA SANDI (PASSWORD)</label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Masukkan password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-sm"
                        />
                        <Lock className="w-5 h-5 text-[#78350F] absolute right-3 top-3 opacity-70" />
                      </div>
                    </div>
                  </>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`w-full py-3 mt-2 font-extrabold text-base flex items-center justify-center space-x-2 shadow-[0_4px_8px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-95 cursor-pointer rounded-xl border-2 border-[#2D241E] transition-all ${
                    activeModal === 'REGISTER'
                      ? 'bg-[#10B981] hover:bg-[#059669] text-white'
                      : 'bg-[#F59E0B] hover:bg-[#D97706] text-white'
                  }`}
                >
                  {activeModal === 'REGISTER' ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  <span>{activeModal === 'REGISTER' ? 'BUAT AKUN DETEKTIF' : 'MASUK AKUN DETEKTIF'}</span>
                </button>

              </form>

              {/* MODAL FOOTER SWITCH LINK */}
              <div className="text-center pt-2 border-t border-white/20">
                {activeModal === 'REGISTER' ? (
                  <button
                    type="button"
                    onClick={openSelectAccount}
                    className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    Sudah punya akun? <span className="underline text-white font-extrabold">Pilih Akun di sini</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openCreateAccount}
                    className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    Belum punya akun? <span className="underline text-white font-extrabold">Buat Akun Baru di sini</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 5. ACCOUNT CREATION SUCCESS POPUP WITH LOTTIE ANIMATION */}
      {regSuccessUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm p-6 rounded-3xl bg-[#FFFDF9] border-[4px] border-[#10B981] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center space-y-4 animate-scale-up">
            
            {/* LOTTIE SUCCESS ANIMATION */}
            <div className="w-32 h-32 mx-auto flex items-center justify-center">
              <Lottie 
                animationData={successAnimation} 
                loop={false} 
                autoplay={true} 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold font-pencil text-[#065F46] tracking-wide">
                🎉 AKUN BERHASIL DIBUAT!
              </h3>
              <p className="text-sm font-bold text-[#4A3E3D]">
                Selamat datang, <span className="text-[#10B981] font-black">{regSuccessUser.fullname || regSuccessUser.username}</span>!
              </p>
              <p className="text-xs text-[#78716C] font-semibold">
                ID Detektif kamu: <span className="font-mono font-bold text-[#065F46]">{regSuccessUser.username}</span>
              </p>
            </div>

            <button
              onClick={() => {
                try { audioEngine.playClick(); } catch {}
                onLoginSuccess(regSuccessUser);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className="w-full py-3.5 px-4 bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-base rounded-2xl border-2 border-[#047857] shadow-[0_4px_12px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>MASUK KE LOBBY GAME</span>
              <CheckCircle className="w-5 h-5" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
