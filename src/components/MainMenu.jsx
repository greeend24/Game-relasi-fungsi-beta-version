import React, { useState, useEffect } from 'react';
import { Trophy, Settings, LogOut, Award, Keyboard, Shield } from 'lucide-react';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import ConfirmExitModal from './ConfirmExitModal';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import AnimatedBackground, { InteractiveBlowingLeaves2D } from './AnimatedBackground';
import { audioEngine } from '../services/audioEngine';
import { storageService, calculateBadge } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';
import { getAvatarPath } from './AvatarModal';

export default function MainMenu({ 
  currentUser, 
  onNewGame, 
  onStartQuest,
  onStartEndless,
  onOpenSettings, 
  onOpenLeaderboard, 
  onOpenRank,
  onOpenBadges,
  onOpenAvatar,
  onLogout 
}) {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'pagi';
    if (hour >= 11 && hour < 15) return 'siang';
    if (hour >= 15 && hour < 18.5) return 'sore';
    return 'malam';
  };

  const timeOfDay = getTimeOfDay();

  const getInitialReloText = () => {
    const isFirstTime = !currentUser?.lastLoginAt || (currentUser?.loginCount && currentUser.loginCount <= 1);
    const greetings = {
      '1A_pagi': 'Selamat pagi! ☀️ Perkenalkan, aku Detektif Relo 🦉. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif? 🕵️‍♂️',
      '1A_siang': 'Halo, detektif! 👋 Selamat siang! 🌤️ Aku Relo, Detektif Relo 🦉. Mulai sekarang, kita akan memecahkan berbagai misteri matematika bersama! 🔍',
      '1A_sore': 'Selamat sore! 🌅 Aku Detektif Relo 🦉. Ada banyak misteri tentang Relasi dan Fungsi yang menunggu untuk kita pecahkan. Yuk, mulai penyelidikan! 🚀',
      '1A_malam': 'Hai, selamat malam! 🌙 Aku Detektif Relo 🦉. Senang akhirnya bertemu denganmu! Aku akan menjadi partner-mu dalam mengungkap rahasia Relasi dan Fungsi. 🔎',
      '1B_pagi': 'Selamat pagi! ☀️ Akhirnya kamu kembali juga, Detektif! 🕵️‍♂️ Relo sudah menunggumu 🦉.',
      '1B_siang': 'Hai! Selamat siang! 🌤️ Wah, partner-ku kembali lagi 🦉. Sudah siap melanjutkan penyelidikan? 🔍',
      '1B_sore': 'Selamat sore dan selamat datang kembali! 🌅 Aku tahu kamu belum menyerah mengungkap misteri Relasi dan Fungsi 🦉✨.',
      '1B_malam': 'Hei, kamu datang lagi! Selamat malam! 🌙 Sepertinya masih ada banyak misteri yang belum kita pecahkan 🔍.'
    };
    const key = `${isFirstTime ? '1A' : '1B'}_${timeOfDay}`;
    return greetings[key] || greetings['1B_siang'];
  };

  const [reloText, setReloText] = useState(getInitialReloText());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isReloSpeaking, setIsReloSpeaking] = useState(false);

  const completedCount = storageService.getCompletedStagesCount(currentUser?.progress);
  const badgeInfo = calculateBadge(completedCount, currentUser?.totalScore || 0);

  // Subscribe to Relo Voice speaking state
  useEffect(() => {
    const unsubscribe = reloVoiceService.subscribe((speaking) => {
      setIsReloSpeaking(speaking);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    try {
      if (!audioEngine.isPlayingBgm && !audioEngine.isQuestBattleActive) {
        audioEngine.toggleBgm(true);
      }
    } catch {}

    const isFirstTime = !currentUser?.lastLoginAt || (currentUser?.loginCount && currentUser.loginCount <= 1);
    const sceneId = isFirstTime ? '1A' : '1B';
    const res = reloVoiceService.playScene(sceneId);
    if (res?.text) {
      setReloText(res.text);
    }
  }, []);

  // Desktop Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isExitModalOpen) return;

      const key = e.key.toLowerCase();
      if (key === ' ' || key === 'enter') {
        e.preventDefault();
        audioEngine.playClick();
        onNewGame();
      } else if (key === 'q') {
        audioEngine.playClick();
        onStartQuest();
      } else if (key === 'e') {
        audioEngine.playClick();
        onStartEndless();
      } else if (key === 'l') {
        audioEngine.playClick();
        onOpenBadges();
      } else if (key === 'h') {
        audioEngine.playClick();
        onOpenLeaderboard();
      } else if (key === 's') {
        audioEngine.playClick();
        onOpenSettings();
      } else if (key === 'escape') {
        audioEngine.playClick();
        setIsExitModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExitModalOpen, onNewGame, onStartQuest, onStartEndless, onOpenBadges, onOpenLeaderboard, onOpenSettings]);

  // Match sky gradients exactly with AnimatedBackground (Quest / Stage Mode Sky)
  const skyGradients = {
    pagi: 'bg-gradient-to-b from-[#FEF08A] via-[#7DD3FC] to-[#FAF7F2]',
    siang: 'bg-gradient-to-b from-[#38BDF8] via-[#BAE6FD] to-[#FAF7F2]',
    sore: 'bg-gradient-to-b from-[#F472B6] via-[#FB923C] to-[#FDE68A]',
    malam: 'bg-gradient-to-b from-[#0B0F19] via-[#1E1B4B] to-[#1E293B]'
  };

  // Helper to check pixel alpha on PNG image for exact non-transparent hit testing
  const checkIsOverVisiblePixel = (e) => {
    const img = e.currentTarget.querySelector('img') || (e.target.tagName === 'IMG' ? e.target : null);
    if (!img || !(img instanceof HTMLImageElement)) return true;

    try {
      const rect = img.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (img.naturalWidth / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (img.naturalHeight / rect.height));

      if (x < 0 || x >= img.naturalWidth || y < 0 || y >= img.naturalHeight) {
        return false;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;

      return pixel[3] > 15; // Alpha > 15 means visible image pixel
    } catch (err) {
      return true;
    }
  };

  const handleModeMouseMove = (e, cardKey) => {
    const isVisible = checkIsOverVisiblePixel(e);
    if (isVisible) {
      if (hoveredCard !== cardKey) {
        audioEngine.playHover();
        setHoveredCard(cardKey);
      }
    } else {
      if (hoveredCard === cardKey) {
        setHoveredCard(null);
      }
    }
  };

  const handleNonTransparentClick = (e, callback) => {
    if (checkIsOverVisiblePixel(e)) {
      callback();
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between font-hand animate-fade-in relative z-10 overflow-hidden bg-transparent">
      
      {/* 1. DYNAMIC SKY BACKGROUND (SUN, MOON, STARS & HANGING LEAVES) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        
        {/* Top Hanging Foliage / Leaves */}
        <div className="absolute top-0 left-2 text-3xl sm:text-5xl opacity-80 pointer-events-none z-10 transform -rotate-12 filter drop-shadow-md">
          🍃🌿
        </div>
        <div className="absolute top-0 right-2 text-3xl sm:text-5xl opacity-80 pointer-events-none z-10 transform rotate-12 filter drop-shadow-md">
          🌿🍃
        </div>


        {/* Crescent Moon & Stars (Malam) */}
        {timeOfDay === 'malam' && (
          <>
            <div className="absolute top-10 left-1/4 text-5xl filter drop-shadow-[0_0_20px_#FDE047]">
              🌙
            </div>
            <div className="absolute top-12 left-1/3 text-white text-xs animate-ping">✨</div>
            <div className="absolute top-20 right-1/3 text-amber-200 text-sm animate-pulse">⭐</div>
            <div className="absolute top-8 left-1/2 text-white text-xs opacity-75">✨</div>
            <div className="absolute top-24 left-16 text-yellow-100 text-xs animate-ping">⭐</div>
          </>
        )}

        {/* Bottom Garden Field Background Asset (Tall Pine Trees, Grass & Fence 100% Uncropped) */}
        <div 
          className="absolute bottom-0 left-0 right-0 w-full h-[580px] sm:h-[750px] bg-bottom bg-contain sm:bg-cover bg-no-repeat z-10 pointer-events-none"
          style={{ backgroundImage: `url('/assets/tampilan di lobby/Asset/asset_background@4x.png')` }}
        />
      </div>

      {/* 2. TOP HEADER BANNER (CLEAR FROSTED WHITE / PUTIH BENING TRANSPARAN) */}
      <div className="w-full bg-white/20 backdrop-blur-md border-b-2.5 border-[#2D241E] px-4 py-2 flex items-center justify-between z-30 shadow-md relative">
        
        {/* Left Side: Avatar Box & Player Info (Clicking opens Avatar Selection Modal) */}
        <button
          onClick={() => { audioEngine.playClick(); onOpenAvatar ? onOpenAvatar() : onOpenBadges(); }}
          onMouseEnter={() => audioEngine.playHover()}
          title="Klik untuk memilih Avatar"
          className="avatar-btn flex items-center space-x-3 text-left cursor-pointer transition hover:scale-105"
        >
          {/* Wooden Avatar Border Frame displaying selected avatar & brown background */}
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 bg-contain bg-no-repeat bg-center flex items-center justify-center relative p-1 drop-shadow-md flex-shrink-0"
            style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_border@4x.png')` }}
          >
            <div 
              className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-lg bg-[#8A6746] bg-cover bg-center flex items-center justify-center overflow-hidden shadow-inner"
              style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_background@4x.png')` }}
            >
              <img 
                src={getAvatarPath(currentUser?.avatarId)} 
                alt="Player Avatar" 
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter drop-shadow-sm"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🦉'; }}
              />
            </div>
          </div>

          <div className="flex flex-col text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            <span className="font-pencil text-lg sm:text-xl font-bold leading-tight">
              {currentUser?.fullname || currentUser?.username || 'Nama Pemain'}
            </span>
            <span className="text-xs font-sans font-bold opacity-90 leading-none">
              Score: {currentUser?.totalScore || 0} ({badgeInfo.name || 'Detektif Pemula'})
            </span>
          </div>
        </button>

        {/* Right Side: Rank Button Emblem (No Grayscale, 100% Full Color Always) */}
        <button
          onClick={() => { audioEngine.playClick(); onOpenRank ? onOpenRank() : onOpenLeaderboard(); }}
          onMouseEnter={() => audioEngine.playHover()}
          title="Papan Peringkat Rank Detektif"
          className="rank-btn relative transition hover:scale-108 active:scale-95 cursor-pointer z-30"
        >
          <img 
            src="/assets/tampilan di lobby/Asset/Rank_Button@4x.png" 
            alt="Rank Button" 
            className="h-11 sm:h-13 w-auto object-contain filter drop-shadow-md" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </button>

      </div>

      {/* 3. TOP RIGHT FLOATING WOODEN CONTROL MENU PLANK (SHIFTED UP BY 1 BUTTON HEIGHT) */}
      <div className="absolute top-[120px] right-4 z-30 flex items-center">
        {isMenuOpen ? (
          <div className="flex items-center animate-fade-in">
            {/* Collapse Arrow Button (Touches board edge using margin, presses subtly on click) */}
            <button
              onClick={() => { audioEngine.playMenuClose(); setIsMenuOpen(false); }}
              onMouseEnter={() => audioEngine.playHover()}
              className="clean-icon-btn rounded-full overflow-hidden cursor-pointer z-20 hover:scale-105 active:scale-95 active:translate-y-0.5 transition-transform -mr-5 sm:-mr-6"
              title="Tutup Menu"
            >
              <img 
                src="/assets/tampilan di lobby/Asset/open_button_settings_highscore_exit_button@4x.png" 
                alt="Open Arrow" 
                className="h-20 sm:h-24 w-auto object-contain rounded-full drop-shadow-lg"
              />
            </button>

            {/* Wooden Plank Container with 4 Buttons inside (Kept same size, buttons reduced 5%) */}
            <div 
              className="flex items-center justify-center space-x-1.5 sm:space-x-2 pl-7 pr-6 py-2 bg-contain bg-no-repeat bg-center min-w-[350px] sm:min-w-[410px] h-20 sm:h-25"
              style={{ backgroundImage: `url('/assets/tampilan di lobby/Asset/board_settings_highscore_exit_buutton@4x.png')` }}
            >
              {/* Highscore Button (Star) */}
              <button
                onClick={() => { audioEngine.playMenuOpen(); onOpenLeaderboard(); }}
                onMouseEnter={() => audioEngine.playHover()}
                title="High Score Global"
                className="clean-icon-btn cursor-pointer hover:scale-110 transition-transform"
              >
                <img 
                  src="/assets/tampilan di lobby/Asset/highscore_button.png" 
                  alt="Highscore" 
                  className="h-[52px] sm:h-[65px] w-auto object-contain drop-shadow-md" 
                />
              </button>

              {/* Settings Option Button (Gear) */}
              <button
                onClick={() => { audioEngine.playMenuOpen(); onOpenSettings(); }}
                onMouseEnter={() => audioEngine.playHover()}
                title="Pengaturan Game"
                className="clean-icon-btn cursor-pointer hover:scale-110 transition-transform"
              >
                <img 
                  src="/assets/tampilan di lobby/Asset/option_button.png" 
                  alt="Settings" 
                  className="h-[52px] sm:h-[65px] w-auto object-contain drop-shadow-md" 
                />
              </button>

              {/* Log Out Button */}
              <button
                onClick={() => { audioEngine.playMenuOpen(); setIsLogoutModalOpen(true); }}
                onMouseEnter={() => audioEngine.playHover()}
                title="Log Out (Ganti Akun)"
                className="clean-icon-btn cursor-pointer hover:scale-110 transition-transform"
              >
                <img 
                  src="/assets/tampilan di logout/Asset/log out button@4x.png" 
                  alt="Log Out" 
                  className="h-[52px] sm:h-[65px] w-auto object-contain drop-shadow-md" 
                  onError={(e) => {
                    e.target.src = '/assets/tampilan di logout/Asset/log out icon@4x.png';
                  }}
                />
              </button>

              {/* Exit Button (Power) */}
              <button
                onClick={() => { audioEngine.playMenuOpen(); setIsExitModalOpen(true); }}
                onMouseEnter={() => audioEngine.playHover()}
                title="Exit Game"
                className="clean-icon-btn cursor-pointer hover:scale-110 transition-transform"
              >
                <img 
                  src="/assets/tampilan di lobby/Asset/off_button@4x.png" 
                  alt="Exit" 
                  className="h-[52px] sm:h-[65px] w-auto object-contain drop-shadow-md" 
                />
              </button>
            </div>
          </div>
        ) : (
          /* Expand Arrow Button */
          <button
            onClick={() => { audioEngine.playMenuOpen(); setIsMenuOpen(true); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="clean-icon-btn rounded-full overflow-hidden cursor-pointer z-10 animate-fade-in hover:scale-105 active:scale-95 transition-transform"
            title="Buka Menu"
          >
            <img 
              src="/assets/tampilan di lobby/Asset/close_button_settings_highscore_exit_button@4x.png" 
              alt="Close Arrow" 
              className="h-20 sm:h-24 w-auto object-contain rounded-full drop-shadow-lg"
            />
          </button>
        )}
      </div>

      {/* 3.5. PROMINENT FLOATING GAME TITLE LOGO (DIRECTLY ABOVE QUEST MODE & ISLANDS) */}
      <div className="w-full flex justify-center items-center z-20 pt-1.5 pb-0.5 pointer-events-none">
        <img 
          src="/assets/Logo game/game_logo.png" 
          alt="Logo Game Detektif Relasi & Fungsi" 
          className="w-64 sm:w-84 md:w-[410px] lg:w-[460px] h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] animate-logo-float"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 4. MIDDLE SECTION: 3 FLOATING MODE ISLANDS (QUEST, CHAPTER, ENDLESS) */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-1 relative z-20 -mt-28 sm:-mt-36">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-4xl w-full items-center justify-center">
          
          {/* 1. QUEST MODE ISLAND (LEFT - ICE CRYSTAL BLUE ISLAND) */}
          <div className="flex flex-col items-center justify-center relative -mt-20 sm:-mt-28">
            {/* Relo Maskot sitting DIRECTLY ON TOP of Quest Island button graphics */}
            <div className="absolute -top-6 sm:-top-8 z-10 pointer-events-none transform group-hover:-translate-y-2 transition-transform">
              <ProfessorOwlMascot
                pose="thinking"
                size="modeBox"
                animateOnHoverOnly={true}
                isHovered={hoveredCard === 'quest'}
                message=""
              />
            </div>

            <button
              onClick={(e) => handleNonTransparentClick(e, () => { audioEngine.playClick(); onStartQuest(); })}
              onMouseMove={(e) => handleModeMouseMove(e, 'quest')}
              onMouseLeave={() => setHoveredCard(null)}
              className="mode-btn group relative flex items-center justify-center transition-all cursor-pointer hover:scale-108 active:scale-95 p-0 border-none bg-transparent shadow-none"
            >
              {/* Quest Mode Island Button Asset */}
              <img 
                src="/assets/tampilan di lobby/Asset/quest mode button@4x.png" 
                alt="Quest Mode"
                className={`mode-btn-img w-48 sm:w-56 h-auto object-contain pointer-events-auto ${hoveredCard === 'quest' ? 'is-hovered' : ''}`}
              />
            </button>

            {/* COMIC SPEECH BUBBLE CHAT (APPEARS ONLY WHEN RELO IS SPEAKING AUDIO) */}
            {(isReloSpeaking && reloText) && (
              <div className="absolute top-[102%] left-1/2 -translate-x-1/2 ml-[-64px] sm:ml-[-70px] mt-[5px] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border-3 sm:border-4 border-[#2D241E] shadow-2xl text-[#2D241E] font-hand z-30 w-[260px] sm:w-[320px] text-center animate-fade-in pointer-events-auto">
                {/* Bubble Pointing Arrow Facing Left towards Relo */}
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[18px] border-r-[#2D241E] border-b-[10px] border-b-transparent" />
                <div className="absolute top-1/2 -left-[13px] -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-r-[14px] border-r-white border-b-[7px] border-b-transparent" />

                {/* Speech Text Content */}
                <p className="text-xs sm:text-sm md:text-base font-bold leading-snug text-[#2D241E]">
                  {reloText}
                </p>
              </div>
            )}
          </div>

          {/* 2. CHAPTER MODE ISLAND (CENTER - SHIFTED UP SLIGHTLY) */}
          <div className="flex flex-col items-center justify-center relative -mt-30 sm:-mt-40">
            {/* Relo Maskot sitting DIRECTLY ON TOP of Chapter Island button graphics */}
            <div className="absolute -top-6 sm:-top-8 z-10 pointer-events-none transform group-hover:-translate-y-2 transition-transform">
              <ProfessorOwlMascot
                pose="chapter"
                size="modeBox"
                animateOnHoverOnly={true}
                isHovered={hoveredCard === 'chapter'}
                message=""
              />
            </div>

            <button
              onClick={(e) => handleNonTransparentClick(e, () => { audioEngine.playClick(); onNewGame(); })}
              onMouseMove={(e) => handleModeMouseMove(e, 'chapter')}
              onMouseLeave={() => setHoveredCard(null)}
              className="mode-btn group relative flex items-center justify-center transition-all cursor-pointer hover:scale-108 active:scale-95 p-0 border-none bg-transparent shadow-none"
            >
              {/* Chapter Mode Island Button Asset */}
              <img 
                src="/assets/tampilan di lobby/Asset/chapter mode button@4x.png" 
                alt="Chapter Mode"
                className={`mode-btn-img w-52 sm:w-60 h-auto object-contain pointer-events-auto ${hoveredCard === 'chapter' ? 'is-hovered' : ''}`}
              />
            </button>
          </div>

          {/* 3. ENDLESS MODE ISLAND (RIGHT - VOLCANO LAVA ISLAND) */}
          <div className="flex flex-col items-center justify-center relative -mt-20 sm:-mt-28">
            {/* Relo Maskot sitting DIRECTLY ON TOP of Endless Island button graphics */}
            <div className="absolute -top-6 sm:-top-8 z-10 pointer-events-none transform group-hover:-translate-y-2 transition-transform">
              <ProfessorOwlMascot
                pose="flying"
                size="modeBox"
                animateOnHoverOnly={true}
                isHovered={hoveredCard === 'endless'}
                message=""
              />
            </div>

            <button
              onClick={(e) => handleNonTransparentClick(e, () => { audioEngine.playClick(); onStartEndless(); })}
              onMouseMove={(e) => handleModeMouseMove(e, 'endless')}
              onMouseLeave={() => setHoveredCard(null)}
              className="mode-btn group relative flex items-center justify-center transition-all cursor-pointer hover:scale-108 active:scale-95 p-0 border-none bg-transparent shadow-none"
            >
              {/* Endless Mode Island Button Asset */}
              <img 
                src="/assets/tampilan di lobby/Asset/endless mode button@4x.png" 
                alt="Endless Mode"
                className={`mode-btn-img w-48 sm:w-56 h-auto object-contain pointer-events-auto ${hoveredCard === 'endless' ? 'is-hovered' : ''}`}
              />
            </button>
          </div>

        </div>
      </div>

      {/* 5. LOWER SECTION: FRONT INSTRUKTUR RELO (SIZE -5% & SHIFTED LEFT 10 DIGITS) */}
      <div className="absolute -bottom-[225px] sm:-bottom-[264px] left-[-60px] sm:left-[-70px] scale-95 origin-bottom-left z-30 pointer-events-none">
        <ProfessorOwlMascot
          pose="default"
          emotion="happy"
          size="xxxxl"
          isInstructor={true}
          disableBodyAnimation={true}
          message=""
        />
      </div>

      {/* CONFIRM LOGOUT MODAL */}
      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
      />

      {/* CONFIRM EXIT MODAL */}
      <ConfirmExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirmExit={() => {
          setIsExitModalOpen(false);
          try {
            if (window.electronAPI && window.electronAPI.exitApp) {
              window.electronAPI.exitApp();
            } else {
              window.close();
            }
          } catch (e) {
            window.close();
          }
        }}
      />

      {/* TOP-MOST LAYER INTERACTIVE BLOWING LEAVES OVERLAY (FLOATS IN FRONT OF EVERYTHING AT 60FPS) */}
      <InteractiveBlowingLeaves2D />

    </div>
  );
}
