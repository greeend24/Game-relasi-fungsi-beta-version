import React, { useState } from 'react';
import { 
  User, UserPlus, LogIn, CheckCircle, 
  Eye, EyeOff 
} from 'lucide-react';
import { Lottie } from 'lottie-react';
import NetworkStatusBadge from './NetworkStatusBadge';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import successAnimation from '../../public/assets/loading/success_animation.json';

export default function AuthScreen({ onLoginSuccess }) {
  // activeModal: null (menu 2 tombol), 'REGISTER' (modal buat akun), 'LOGIN' (modal pilih/masuk akun)
  const [activeModal, setActiveModal] = useState(null); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [absen, setAbsen] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [regSuccessUser, setRegSuccessUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show/hide password toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openCreateAccount = () => {
    try { audioEngine.playClick(); } catch {}
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setFullname('');
    setAbsen('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setActiveModal('REGISTER');
  };

  const openSelectAccount = () => {
    try { audioEngine.playClick(); } catch {}
    setErrorMsg('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setActiveModal('LOGIN');
  };

  const closeModal = () => {
    try { audioEngine.playMenuClose(); } catch {}
    setActiveModal(null);
    setErrorMsg('');
  };

  // Build username from fullname + 2-digit absen
  const buildUsername = (name, absenNum) => {
    const cleanName = name.trim().toLowerCase().split(' ')[0]; // ambil nama pertama
    const absenPadded = String(absenNum).padStart(2, '0').slice(0, 2);
    return `${cleanName}${absenPadded}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeModal === 'REGISTER') {
      if (!fullname.trim()) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Harap isi nama lengkap!');
        return;
      }
      if (!absen.trim() || isNaN(Number(absen)) || Number(absen) < 1 || Number(absen) > 99) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Harap isi nomor absen (1–99)!');
        return;
      }
      if (!password.trim()) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Harap isi kata sandi!');
        return;
      }
      if (password.length < 4) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Kata sandi minimal 4 karakter!');
        return;
      }
      if (password !== confirmPassword) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Kata sandi konfirmasi tidak cocok!');
        return;
      }

      const generatedUsername = buildUsername(fullname, absen);

      setIsSubmitting(true);
      try {
        const res = await storageService.register(generatedUsername, password, fullname.trim());
        if (res.success && res.user) {
          try { audioEngine.playStageClear(); } catch {}
          try { audioEngine.toggleBgm(true); } catch {}
          setRegSuccessUser(res.user);
          setTimeout(() => {
            onLoginSuccess(res.user);
          }, 2200);
        } else {
          try { audioEngine.playError(); } catch {}
          setErrorMsg(res.message || 'Gagal mendaftarkan akun!');
        }
      } finally {
        setIsSubmitting(false);
      }

    } else if (activeModal === 'LOGIN') {
      const loginUsername = username.trim();

      if (!loginUsername) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Harap masukkan username kamu!');
        return;
      }
      if (!password.trim()) {
        try { audioEngine.playError(); } catch {}
        setErrorMsg('Harap isi kata sandi!');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await storageService.login(loginUsername, password);
        if (res.success && res.user) {
          try { audioEngine.playCorrect(); } catch {}
          try { audioEngine.toggleBgm(true); } catch {}
          onLoginSuccess(res.user);
        } else {
          try { audioEngine.playError(); } catch {}
          setErrorMsg(res.message || 'Username atau password salah!');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between font-pencil relative z-10 overflow-hidden bg-transparent select-none animate-fade-in">
      
      {/* Network Status Badge (Online/Offline with Label) */}
      <div className="absolute top-2.5 right-3 sm:top-4 sm:right-6 z-40 pointer-events-auto">
        <NetworkStatusBadge showLabel={true} size="md" />
      </div>

      {/* 1. BOTTOM LANDSCAPE BACKGROUND ASSET */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full h-[68%] max-h-full bg-bottom bg-cover bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: `url('/assets/tampilan di lobby/Asset/asset_background@4x.png')` }}
      />

      {/* 2. TOP LOGO & BRANDING HEADER */}
      <div className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4 relative z-30 pointer-events-none flex-shrink-0">
        <img 
          src="/assets/Logo game/game_logo.png" 
          alt="Logo Game Detektif Relasi & Fungsi" 
          className="h-auto max-h-[48cqh] sm:max-h-[50cqh] w-[clamp(300px,46cqw,680px)] max-w-[90%] object-contain filter animate-logo-float drop-shadow-2xl"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 3. CENTER SECTION: 2 WOODEN BUTTONS */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-20 my-auto pb-4">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-3xl px-4 pointer-events-auto">
          
          {/* GREEN WOODEN BUTTON: BUAT AKUN */}
          <button
            onClick={openCreateAccount}
            onMouseEnter={() => audioEngine.playHover()}
            className="image-btn focus:outline-none cursor-pointer"
            title="Buat Akun Baru"
          >
            <img 
              src="/assets/tampilan sebelum masuk lobby/Asset/buat_akun_button.png" 
              alt="Buat Akun" 
              className="w-[clamp(140px,18cqw,260px)] h-auto object-contain filter hover:scale-106 active:scale-95 transition-transform drop-shadow-xl"
              onError={(e) => {
                e.target.src = '/assets/tampilan sebelum masuk lobby/Asset/buat akun_button _icon@4x.png';
              }}
            />
          </button>

          {/* BROWN WOODEN BUTTON: MASUK AKUN */}
          <button
            onClick={openSelectAccount}
            onMouseEnter={() => audioEngine.playHover()}
            className="image-btn focus:outline-none cursor-pointer"
            title="Masuk ke Akun"
          >
            <img 
              src="/assets/tampilan sebelum masuk lobby/Asset/pilih_akun_button.png" 
              alt="Masuk" 
              className="w-[clamp(140px,18cqw,260px)] h-auto object-contain filter hover:scale-106 active:scale-95 transition-transform drop-shadow-xl"
              onError={(e) => {
                e.target.src = '/assets/tampilan sebelum masuk lobby/Asset/pilih akun_button_icon@4x.png';
              }}
            />
          </button>

        </div>
      </div>

      {/* FOOTER SPACER */}
      <div className="h-2 sm:h-4 w-full pointer-events-none" />

      {/* 4. MODAL POPUP (FIXED BOARD, ZERO-SCROLL DESIGN) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in font-pencil overflow-hidden">
          
          <div 
            className="relative w-full max-w-[min(92vw,460px)] rounded-3xl bg-[length:100%_100%] bg-no-repeat border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] flex flex-col select-none overflow-hidden my-auto p-4 sm:p-6"
            style={{ backgroundImage: `url('/assets/tampilan sebelum masuk lobby/Asset/board_buat_akun_pilih_akun@4x.png')` }}
          >
            {/* CLOSE BUTTON - TOP RIGHT */}
            <button
              onClick={closeModal}
              onMouseEnter={() => audioEngine.playHover()}
              className="clean-icon-btn absolute top-3 right-3 sm:top-4 sm:right-4 z-40 cursor-pointer rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform"
              title="Tutup Menu"
            >
              <img 
                src="/assets/tampilan di logout/Asset/exit_button_of_menu@4x.png" 
                alt="Close" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full drop-shadow"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </button>

            {/* MODAL HEADER */}
            <div className="text-center pb-2.5 sm:pb-3 space-y-0.5 relative z-30 pr-7 pl-3">
              <h2 className="text-2xl sm:text-3xl font-black font-pencil text-[#FEF3C7] tracking-wide drop-shadow">
                {activeModal === 'REGISTER' ? '📝 BUAT AKUN BARU' : '🔑 MASUK KE AKUN'}
              </h2>
              <p className="text-xs sm:text-sm text-[#FDE68A] font-bold">
                {activeModal === 'REGISTER' 
                  ? 'Daftar sebagai detektif cilik matematika' 
                  : 'Masukkan username & kata sandi kamu'}
              </p>
            </div>

            {/* ERROR MESSAGE BANNER */}
            {errorMsg && (
              <div className="mb-2 p-1.5 sm:p-2 rounded-xl bg-[#FFE4E6] border-2 border-[#BE123C] text-[#BE123C] text-xs sm:text-sm font-bold text-center animate-shake shadow">
                {errorMsg}
              </div>
            )}

            {/* ══════════════════════════════════════ */}
            {/* ── MODE 1: BUAT AKUN (REGISTER) ── */}
            {/* ══════════════════════════════════════ */}
            {activeModal === 'REGISTER' && (
              <form onSubmit={handleSubmit} className="space-y-2 font-bold relative z-30">
                
                {/* ROW 1: NAMA LENGKAP & NO ABSEN (SIDE-BY-SIDE) */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-0.5">
                    <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block">
                      NAMA LENGKAP
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap..."
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full px-3 py-1.5 sm:py-2 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-xs sm:text-sm font-bold font-pencil"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-0.5">
                    <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block font-pencil">
                      NO. ABSEN
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        placeholder="1-99"
                        value={absen}
                        onChange={(e) => setAbsen(e.target.value)}
                        className="w-full px-2 py-1.5 sm:py-2 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-xs sm:text-sm font-bold text-center font-pencil"
                      />
                    </div>
                  </div>
                </div>

                {/* LIVE PREVIEW USERNAME */}
                {fullname.trim() && absen.trim() && Number(absen) >= 1 && Number(absen) <= 99 && (
                  <div className="py-1 px-2.5 rounded-lg bg-black/40 border border-[#FDE68A]/30 flex items-center justify-between text-xs text-[#FEF3C7]">
                    <span>Username kamu:</span>
                    <span className="font-mono font-black text-[#6EE7B7] text-xs sm:text-sm underline">
                      {buildUsername(fullname, absen)}
                    </span>
                  </div>
                )}

                {/* ROW 2: KATA SANDI */}
                <div className="space-y-0.5">
                  <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block">
                    KATA SANDI (MIN. 4 DIGIT)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan kata sandi..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-1.5 sm:py-2 pr-9 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-xs sm:text-sm font-bold font-pencil"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2 opacity-70 hover:opacity-100 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-[#78350F]" /> : <Eye className="w-4 h-4 text-[#78350F]" />}
                    </button>
                  </div>
                </div>

                {/* ROW 3: KONFIRMASI KATA SANDI */}
                <div className="space-y-0.5">
                  <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block">
                    ULANGI KATA SANDI
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Ketik ulang kata sandi..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-3 py-1.5 sm:py-2 pr-9 rounded-xl border-2 text-[#2D241E] focus:outline-none shadow-inner text-xs sm:text-sm font-bold font-pencil ${
                        confirmPassword && confirmPassword !== password
                          ? 'bg-[#FFE4E6] border-[#BE123C]'
                          : confirmPassword && confirmPassword === password
                          ? 'bg-[#ECFDF5] border-[#10B981]'
                          : 'bg-[#FFFDF9] border-[#2D241E] focus:bg-[#FEF3C7]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-2 opacity-70 hover:opacity-100 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-[#78350F]" /> : <Eye className="w-4 h-4 text-[#78350F]" />}
                    </button>
                  </div>
                </div>

                {/* TOMBOL DAFTAR */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="w-full py-2 sm:py-2.5 mt-1.5 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[0_3px_6px_rgba(0,0,0,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer rounded-xl border-2 border-[#047857] bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Mendaftarkan Akun...</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>BUAT AKUN DETEKTIF</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ══════════════════════════════════════ */}
            {/* ── MODE 2: MASUK AKUN (LOGIN) ── */}
            {/* ══════════════════════════════════════ */}
            {activeModal === 'LOGIN' && (
              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 font-bold relative z-30">
                
                {/* 1. INPUT USERNAME */}
                <div className="space-y-0.5 sm:space-y-1">
                  <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block font-pencil">
                    NAMA PENGGUNA (USERNAME)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-xs sm:text-sm font-bold font-pencil"
                      autoFocus
                    />
                    <User className="w-4 h-4 text-[#78350F] absolute right-3.5 top-2.5 sm:top-3 opacity-60" />
                  </div>
                </div>

                {/* 2. INPUT PASSWORD */}
                <div className="space-y-0.5 sm:space-y-1">
                  <label className="text-[11px] sm:text-xs text-[#FDE68A] font-black uppercase tracking-wider block font-pencil">
                    KATA SANDI (PASSWORD)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan kata sandi..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2 sm:py-2.5 pr-10 rounded-xl bg-[#FFFDF9] border-2 border-[#2D241E] text-[#2D241E] focus:outline-none focus:bg-[#FEF3C7] shadow-inner text-xs sm:text-sm font-bold font-pencil"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 sm:top-3 opacity-70 hover:opacity-100 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-[#78350F]" /> : <Eye className="w-4 h-4 text-[#78350F]" />}
                    </button>
                  </div>
                </div>

                {/* 3. TOMBOL MASUK */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="w-full py-2.5 sm:py-3 mt-1.5 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[0_3px_6px_rgba(0,0,0,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer rounded-xl border-2 border-[#B45309] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#2D241E] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Memverifikasi Akun...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>MASUK SEBAGAI DETEKTIF</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* SWITCH MODE LINK FOOTER */}
            <div className="text-center pt-2 mt-2 border-t border-white/20 relative z-30">
              {activeModal === 'REGISTER' ? (
                <button
                  type="button"
                  onClick={openSelectAccount}
                  className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer"
                >
                  Sudah punya akun? <span className="underline text-white font-black">Masuk di sini</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openCreateAccount}
                  className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer"
                >
                  Belum punya akun? <span className="underline text-white font-black">Buat Akun Baru</span>
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* 5. SUCCESS POPUP SETELAH BUAT AKUN */}
      {regSuccessUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in font-hand overflow-hidden">
          <div 
            className="relative w-full max-w-sm sm:max-w-md p-5 sm:p-7 rounded-3xl bg-[length:100%_100%] bg-no-repeat border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-center space-y-3 animate-scale-up select-none overflow-hidden my-auto"
            style={{ backgroundImage: `url('/assets/tampilan sebelum masuk lobby/Asset/board_buat_akun_pilih_akun@4x.png')` }}
          >
            <h3 className="text-xl sm:text-2xl font-black font-pencil text-[#FEF3C7] tracking-wide">
              🎉 AKUN BERHASIL DIBUAT!
            </h3>

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center -my-1">
              <Lottie 
                animationData={successAnimation} 
                loop={false} 
                autoplay={true} 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            <div className="space-y-1 px-2 text-[#FEF3C7]">
              <p className="text-xs sm:text-sm font-bold text-[#FDE68A]">
                Halo, <span className="text-white font-black underline">{regSuccessUser.fullname || regSuccessUser.username}</span>!
              </p>
              <div className="p-2 rounded-xl bg-black/35 border border-[#FED7AA]/40 text-xs font-semibold text-[#FEF3C7] shadow-inner space-y-0.5">
                <p>Username kamu: <span className="font-mono font-black text-[#6EE7B7] text-sm">{regSuccessUser.username}</span></p>
                <p className="text-[10.5px] opacity-80">Menghubungkan ke lobby...</p>
              </div>
            </div>

            <button
              onClick={() => {
                try { audioEngine.playClick(); } catch {}
                onLoginSuccess(regSuccessUser);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className="w-full py-2 sm:py-2.5 px-4 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm rounded-xl border-2 border-[#047857] shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>MASUK KE LOBBY</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
