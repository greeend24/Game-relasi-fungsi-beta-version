import React, { useState, useEffect, useRef } from 'react';
import DetektifRelo from './DetektifRelo';
import InstructorMascotGuide from './InstructorMascotGuide';
import ConfirmExitModal from './ConfirmExitModal';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import NetworkStatusBadge from './NetworkStatusBadge';
import { audioEngine } from '../services/audioEngine';
import { storageService, calculateBadge } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';
import { getAvatarPath } from './AvatarModal';

export default function MainMenu({
  currentUser,
  isAnyModalOpen = false,
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
  const isAnyModalActive = isAnyModalOpen || isLogoutModalOpen || isExitModalOpen;

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
  const [isFlightBubbleActive, setIsFlightBubbleActive] = useState(false);

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
    } catch { }

    const isFirstTime = !currentUser?.lastLoginAt || (currentUser?.loginCount && currentUser.loginCount <= 1);
    const sceneId = isFirstTime ? '1A' : '1B';
    const res = reloVoiceService.playScene(sceneId, false, false);
    if (res?.text) {
      setReloText(res.text);
    }

    return () => {
      reloVoiceService.stopVoice();
    };
  }, []);

  // Desktop Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isExitModalOpen || isLogoutModalOpen || isAnyModalOpen) return;

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
  }, [isExitModalOpen, isLogoutModalOpen, isAnyModalOpen, onNewGame, onStartQuest, onStartEndless, onOpenBadges, onOpenLeaderboard, onOpenSettings]);

  const leaveTimerRef = useRef(null);

  // High-performance, zero-latency hover and touch & hold handlers
  const handleModeMouseEnter = (cardKey) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (hoveredCard !== cardKey) {
      audioEngine.playHover();
      setHoveredCard(cardKey);
    }
  };

  const handleModeMouseLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredCard(null);
    }, 150);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between font-hand animate-fade-in relative z-10 overflow-hidden bg-transparent">

      {/* 1. DYNAMIC SKY BACKGROUND (SUN, MOON, STARS & FIELD) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Crescent Moon & Stars (Malam) */}
        {timeOfDay === 'malam' && (
          <>
            <div className="absolute top-10 left-1/4 text-5xl filter">
              🌙
            </div>
            <div className="absolute top-12 left-1/3 text-white text-xs animate-ping">✨</div>
            <div className="absolute top-20 right-1/3 text-amber-200 text-sm animate-pulse">⭐</div>
            <div className="absolute top-8 left-1/2 text-white text-xs opacity-75">✨</div>
            <div className="absolute top-24 left-16 text-yellow-100 text-xs animate-ping">⭐</div>
          </>
        )}

        {/* Dynamic Theme Field Background Asset */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[68%] max-h-full bg-bottom bg-cover bg-no-repeat z-10 pointer-events-none transition-all duration-300"
          style={{
            backgroundImage: `url('/assets/tampilan di lobby/Asset/asset_background@4x.png')`
          }}
        />
      </div>

      {/* 2. TOP HEADER BANNER */}
      <div
        className="w-full glass-header border-b border-white/60 px-3 sm:px-6 md:px-10 py-1.5 sm:py-2 flex items-center justify-between z-30 shadow-[0_4px_16px_rgba(0,0,0,0.1)] relative"
      >
        {/* Left Side: Avatar Box & Player Info (High-Contrast Dark Theme) */}
        <button
          onClick={() => { audioEngine.playClick(); onOpenAvatar ? onOpenAvatar() : onOpenBadges(); }}
          onMouseEnter={() => audioEngine.playHover()}
          title="Klik untuk memilih Avatar"
          className="avatar-btn flex items-center space-x-2 sm:space-x-3 text-left cursor-pointer transition hover:scale-105 flex-shrink-0 max-w-[48%]"
        >
          {/* Wooden Avatar Border Frame */}
          <div
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-contain bg-no-repeat bg-center flex items-center justify-center relative p-1 drop-shadow-md flex-shrink-0"
            style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_border@4x.png')` }}
          >
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-[#8A6746] bg-cover bg-center flex items-center justify-center overflow-hidden shadow-inner"
              style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_background@4x.png')` }}
            >
              <img
                src={getAvatarPath(currentUser?.avatarId)}
                alt="Player Avatar"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain filter drop-shadow-sm"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🦉'; }}
              />
            </div>
          </div>

          <div className="flex flex-col text-[#2D241E] select-none min-w-0">
            <span className="font-pencil text-sm sm:text-base md:text-lg lg:text-xl font-black leading-tight text-[#2D241E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] tracking-wide truncate max-w-[150px] sm:max-w-[220px]">
              {((currentUser?.username || '').toLowerCase() === 'fikran02' || currentUser?.isAdmin) ? 'Admin' : (currentUser?.fullname || currentUser?.username || 'Nama Pemain')}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 flex-nowrap">
              <span className="text-[10px] sm:text-xs font-sans font-black bg-[#FEF3C7] text-[#78350F] px-2 py-0.5 rounded-full border border-[#D97706]/40 shadow-xs whitespace-nowrap">
                ⭐ Skor: {currentUser?.totalScore || 0}
              </span>
              <span className="text-[10px] sm:text-xs font-sans font-black bg-[#DBEAFE] text-[#1E40AF] px-2 py-0.5 rounded-full border border-[#3B82F6]/40 shadow-xs whitespace-nowrap">
                🏆 {badgeInfo.name || 'Detektif Pemula'}
              </span>
            </div>
          </div>
        </button>

        {/* Right Side: Single LED Light (Green = Connected, Red = Disconnected) */}
        <div className="flex items-center mr-16 sm:mr-20 md:mr-24 z-20">
          <NetworkStatusBadge size="md" />
        </div>

        {/* Right Side: SYSTEM CONTROLS (Menu Board: Rank, Highscore, Settings, Logout, Exit) */}
        <div className="absolute top-[calc(100%+8px)] sm:top-[calc(100%+12px)] md:top-[calc(100%+14px)] right-3 sm:right-6 md:right-8 z-50 flex items-center pointer-events-auto">
          {isMenuOpen ? (
            <div className="flex items-center animate-fade-in">
              {/* Collapse Arrow Button - Digeser nempel pas ke ujung kiri board (Ukuran 2x Lipat) */}
              <button
                onClick={() => { audioEngine.playMenuClose(); setIsMenuOpen(false); }}
                onMouseEnter={() => audioEngine.playHover()}
                className="clean-icon-btn rounded-full overflow-hidden cursor-pointer z-20 hover:scale-105 active:scale-95 transition-transform -mr-4 sm:-mr-5 flex-shrink-0"
                title="Tutup Menu"
              >
                <img
                  src="/assets/tampilan di lobby/Asset/close_button_settings_highscore_exit_button@4x.png"
                  alt="Tutup Menu"
                  className="h-16 sm:h-[76px] md:h-[84px] w-auto object-contain rounded-full drop-shadow-md"
                />
              </button>

              {/* Wooden Plank Container - 2x Lipat Ukuran, Berada di Bawah Bar Atas */}
              <div
                className="flex items-center justify-center pl-12 sm:pl-14 md:pl-16 pr-5 sm:pr-6 py-2 h-[72px] sm:h-[84px] md:h-[92px] select-none pointer-events-auto drop-shadow-xl"
                style={{
                  backgroundImage: `url('/assets/tampilan di lobby/Asset/board_settings_highscore_exit_buutton@4x.png')`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  {/* 1. Rank Button */}
                  <button
                    onClick={() => { audioEngine.playClick(); onOpenRank ? onOpenRank() : onOpenLeaderboard(); }}
                    onMouseEnter={() => audioEngine.playHover()}
                    title="Rank"
                    className="clean-icon-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
                  >
                    <img
                      src="/assets/tampilan di lobby/Asset/Rank_Button@4x.png"
                      alt="Rank"
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md hover:brightness-110 transition"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </button>

                  {/* 2. Highscore Button */}
                  <button
                    onClick={() => { audioEngine.playClick(); onOpenLeaderboard(); }}
                    onMouseEnter={() => audioEngine.playHover()}
                    title="Papan Peringkat Skor Tertinggi (Leaderboard)"
                    className="clean-icon-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
                  >
                    <img
                      src="/assets/tampilan di lobby/Asset/highscore_button.png"
                      alt="Highscore"
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md hover:brightness-110 transition"
                    />
                  </button>

                  {/* 3. Settings Option Button */}
                  <button
                    onClick={() => { audioEngine.playClick(); onOpenSettings(); }}
                    onMouseEnter={() => audioEngine.playHover()}
                    title="Pengaturan Game (Audio & Bantuan)"
                    className="clean-icon-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
                  >
                    <img
                      src="/assets/tampilan di lobby/Asset/option_button.png"
                      alt="Settings"
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md hover:brightness-110 transition"
                    />
                  </button>

                  {/* 4. Log Out / Ganti Akun Button */}
                  <button
                    onClick={() => { audioEngine.playClick(); setIsLogoutModalOpen(true); }}
                    onMouseEnter={() => audioEngine.playHover()}
                    title="Log Out (Ganti Akun)"
                    className="clean-icon-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
                  >
                    <img
                      src="/assets/tampilan di logout/Asset/log out button@4x.png"
                      alt="Log Out"
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md hover:brightness-110 transition"
                      onError={(e) => {
                        e.target.src = '/assets/tampilan di logout/Asset/log out icon@4x.png';
                      }}
                    />
                  </button>

                  {/* 5. Exit Game Button */}
                  <button
                    onClick={() => { audioEngine.playClick(); setIsExitModalOpen(true); }}
                    onMouseEnter={() => audioEngine.playHover()}
                    title="Keluar dari Game (Exit)"
                    className="clean-icon-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
                  >
                    <img
                      src="/assets/tampilan di lobby/Asset/off_button@4x.png"
                      alt="Exit"
                      className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md hover:brightness-110 transition"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Open Menu Arrow Button (Ukuran 2x Lipat) */
            <button
              onClick={() => { audioEngine.playMenuOpen(); setIsMenuOpen(true); }}
              onMouseEnter={() => audioEngine.playHover()}
              className="clean-icon-btn rounded-full overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Buka Menu"
            >
              <img
                src="/assets/tampilan di lobby/Asset/open_button_settings_highscore_exit_button@4x.png"
                alt="Buka Menu"
                className="h-16 sm:h-[76px] md:h-[84px] w-auto object-contain rounded-full drop-shadow-lg"
              />
            </button>
          )}
        </div>
      </div>



      {/* 4. 3 COMPACT MODE CARDS (CHARACTER + BOARD UNIFIED UNITS) */}
      <div className="mode-container absolute inset-x-0 bottom-[3%] sm:bottom-[4%] top-[26%] sm:top-[28%] flex items-center justify-center gap-[clamp(14px,3.5cqw,48px)] px-3 sm:px-6 z-[35] pointer-events-none">
        
        {/* 1. QUEST MODE CARD (PULAU QUEST + SNOWY MASCOT) */}
        <div
          className={`mode-card island-group relative flex flex-col items-center justify-center select-none pointer-events-auto transition-transform duration-200 ${hoveredCard === 'quest' ? 'is-hovered -translate-y-2' : ''}`}
        >
          <button
            onClick={() => { audioEngine.playClick(); onStartQuest(); }}
            onMouseEnter={() => handleModeMouseEnter('quest')}
            onMouseLeave={handleModeMouseLeave}
            onTouchStart={() => handleModeMouseEnter('quest')}
            onTouchEnd={handleModeMouseLeave}
            onTouchCancel={handleModeMouseLeave}
            className="mode-btn mode-board-btn group relative flex flex-col items-center justify-center cursor-pointer p-0 border-none bg-transparent shadow-none"
          >
            {/* Snowy Mascot on Quest Board */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[45%] select-none pointer-events-none z-30"
            >
              <DetektifRelo
                character="snowy"
                pose={hoveredCard === 'quest' ? 'active' : 'standing'}
                size="modeBox"
                islandType="quest"
                canSpeak={false}
                animateOnHoverOnly={false}
                isHovered={hoveredCard === 'quest'}
                message=""
              />
            </div>

            {/* Compact Quest Board */}
            <img
              src="/assets/tampilan di lobby/Asset/quest mode button@4x.png"
              alt="Quest Mode"
              className={`mode-btn-img mode-board-img quest-island-img w-[clamp(145px,17.5cqw,240px)] max-h-[38cqh] h-auto object-contain pointer-events-auto transition-all duration-200 drop-shadow-md ${hoveredCard === 'quest' ? 'is-hovered' : ''}`}
            />
          </button>
        </div>

        {/* 2. CHAPTER MODE CARD (PULAU CHAPTER + RELO MASCOT - CENTER & PROMINENT) */}
        <div
          className={`mode-card island-group relative flex flex-col items-center justify-center select-none pointer-events-auto -translate-y-1.5 sm:-translate-y-2 transition-transform duration-200 ${hoveredCard === 'chapter' ? 'is-hovered -translate-y-3.5' : ''}`}
        >
          <button
            onClick={() => { audioEngine.playClick(); onNewGame(); }}
            onMouseEnter={() => handleModeMouseEnter('chapter')}
            onMouseLeave={handleModeMouseLeave}
            onTouchStart={() => handleModeMouseEnter('chapter')}
            onTouchEnd={handleModeMouseLeave}
            onTouchCancel={handleModeMouseLeave}
            className="mode-btn mode-board-btn group relative flex flex-col items-center justify-center cursor-pointer p-0 border-none bg-transparent shadow-none"
          >
            {/* Relo Mascot on Chapter Board */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[18%] sm:-translate-y-[20%] scale-[1.3] sm:scale-[1.4] origin-bottom select-none pointer-events-none z-30"
            >
              <div className="translate-y-[6%]">
                <DetektifRelo
                  character="relo"
                  pose={hoveredCard === 'chapter' ? 'thinking' : 'standing'}
                  size="modeBox"
                  islandType="chapter"
                  canSpeak={false}
                  animateOnHoverOnly={false}
                  isHovered={hoveredCard === 'chapter'}
                  message=""
                />
              </div>
            </div>

            {/* Compact Chapter Board (Center & Slightly Prominent) */}
            <img
              src="/assets/tampilan di lobby/Asset/chapter mode button@4x.png"
              alt="Chapter Mode"
              className={`mode-btn-img mode-board-img chapter-island-img w-[clamp(160px,19.5cqw,265px)] max-h-[40cqh] h-auto object-contain pointer-events-auto transition-all duration-200 drop-shadow-md ${hoveredCard === 'chapter' ? 'is-hovered' : ''}`}
            />
          </button>
        </div>

        {/* 3. ENDLESS MODE CARD (PULAU ENDLESS + RYU MASCOT) */}
        <div
          className={`mode-card island-group relative flex flex-col items-center justify-center select-none pointer-events-auto transition-transform duration-200 ${hoveredCard === 'endless' ? 'is-hovered -translate-y-2' : ''}`}
        >
          <button
            onClick={() => { audioEngine.playClick(); onStartEndless(); }}
            onMouseEnter={() => handleModeMouseEnter('endless')}
            onMouseLeave={handleModeMouseLeave}
            onTouchStart={() => handleModeMouseEnter('endless')}
            onTouchEnd={handleModeMouseLeave}
            onTouchCancel={handleModeMouseLeave}
            className="mode-btn mode-board-btn group relative flex flex-col items-center justify-center cursor-pointer p-0 border-none bg-transparent shadow-none"
          >
            {/* Ryu Mascot on Endless Board */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[45%] select-none pointer-events-none z-30"
            >
              <DetektifRelo
                character="ryu"
                pose={hoveredCard === 'endless' ? 'active' : 'standing'}
                size="modeBox"
                islandType="endless"
                canSpeak={false}
                animateOnHoverOnly={false}
                isHovered={hoveredCard === 'endless'}
                message=""
              />
            </div>

            {/* Compact Endless Board */}
            <img
              src="/assets/tampilan di lobby/Asset/endless mode button@4x.png"
              alt="Endless Mode"
              className={`mode-btn-img mode-board-img endless-island-img w-[clamp(145px,17.5cqw,240px)] max-h-[38cqh] h-auto object-contain pointer-events-auto transition-all duration-200 drop-shadow-md ${hoveredCard === 'endless' ? 'is-hovered' : ''}`}
            />
          </button>
        </div>

      </div>

      {/* 5. FRONT INSTRUKTUR RELO & COMIC SPEECH BUBBLE (GROUNDED AT BOTTOM-LEFT) */}
      {!isAnyModalActive && (
        <InstructorMascotGuide
          layout="floating"
          character="relo"
          pose="default"
          emotion="happy"
          title="INSTRUKTUR RELO"
          icon="🕵️‍♂️"
          canSpeak={true}
          message={reloText || getInitialReloText()}
          onFlight={(flightMsg) => {
            setReloText(flightMsg || "Woooosh, Detektif Relo meluncur!!!! 🚀🦉✨");
            setIsFlightBubbleActive(true);
            setTimeout(() => {
              setIsFlightBubbleActive(false);
            }, 4500);
          }}
        />
      )}

      {/* 3.5. PROMINENT FLOATING GAME TITLE LOGO (FRONTMOST LAYER) */}
      <div
        className="absolute left-1/2 top-[2%] sm:top-[2.5%] -translate-x-1/2 pointer-events-none select-none z-[45] flex justify-center"
      >
        <img
          src="/assets/Logo game/game_logo.png"
          alt="Logo Game Detektif Relasi & Fungsi"
          className="w-[clamp(240px,40cqw,540px)] max-h-[22cqh] sm:max-h-[25cqh] h-auto object-contain filter drop-shadow-2xl animate-logo-float"
          onError={(e) => { e.target.style.display = 'none'; }}
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
          try { audioEngine.stopAllBgmTracks(); } catch { }
          try { reloVoiceService.stopAll(); } catch { }
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
    </div>
  );
}
