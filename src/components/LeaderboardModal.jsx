import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import InstructorMascotGuide from './InstructorMascotGuide';

export default function LeaderboardModal({ isOpen, onClose, currentUser }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [reloText, setReloText] = useState('');

  // Default high score players fallback to populate table if empty
  const defaultPlayers = [
    { fullname: 'Detektif Fikran (Maestro)', totalScore: 4760 },
    { fullname: 'Agen Bintang Matematika', totalScore: 4250 },
    { fullname: 'Penyelidik Relo Pro', totalScore: 3890 },
    { fullname: 'Detektif Pintar VIII', totalScore: 3400 },
    { fullname: 'Master Fungsi SMP', totalScore: 2950 },
  ];

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('6');
      if (res.text) setReloText(res.text);

      storageService.getLeaderboard().then(data => {
        if (data && data.length > 0) {
          setLeaderboard(data);
        } else {
          // Fallback with current user included
          const userEntry = currentUser ? { fullname: currentUser.fullname || currentUser.username, totalScore: currentUser.totalScore || 0, isCurrentUser: true } : null;
          const combined = userEntry ? [userEntry, ...defaultPlayers] : defaultPlayers;
          setLeaderboard(combined);
        }
      });
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const displayList = leaderboard.length > 0 ? leaderboard : defaultPlayers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD WRAPPER: Sized strictly by the image so it NEVER drifts or breaks aspect ratio on any device */}
      <div className="relative inline-flex items-center justify-center max-h-[85dvh] max-w-[min(480px,92vw)] drop-shadow-2xl select-none flex-shrink-0">
        
        {/* PHYSICAL BOARD IMAGE: Controls the true pixel boundaries */}
        <img 
          src="/assets/tampilan di highscore/Asset/board_mark_high_score@4x.png" 
          alt="High Score Board"
          className="block max-h-[85dvh] max-w-[min(480px,92vw)] w-auto h-auto object-contain select-none pointer-events-none"
        />

        {/* GREEN ROUND EXIT BUTTON (Locked inside the top right corner of the actual wooden board) */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-[4%] right-[5%] z-30 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          title="Tutup Menu High Score"
        >
          <img 
            src="/assets/tampilan di highscore/Asset/exit_button_of_highscore@4x.png" 
            alt="Exit" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN STAR ICON BADGE (Perfect horizontal center at top cutout) */}
        <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di highscore/Asset/Highscore_icon@4x.png" 
              alt="Highscore Star Icon" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* PLAYER SCORES TABLE LIST (Locked directly within the wooden board surface) */}
        <div className="absolute inset-0 flex flex-col justify-start pt-[31%] px-[6.5%] pb-[6%] overflow-hidden">
          <div className="space-y-1 sm:space-y-1.5 w-full">
            {displayList.slice(0, 5).map((user, idx) => {
              const rank = idx + 1;
              const isCurrentUser = Boolean(
                user.isCurrentUser ||
                (currentUser?.id && user.id === currentUser.id) ||
                (currentUser?.username && user.username === currentUser.username) ||
                (currentUser?.fullname && user.fullname && (user.fullname === currentUser.fullname || user.fullname === currentUser.username))
              );

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-12 gap-1 py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-lg sm:rounded-xl font-pencil text-xs sm:text-sm md:text-base font-bold items-center transition-all ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-amber-400/50 via-yellow-300/55 to-amber-500/50 border border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.75)] text-yellow-100 ring-1 ring-yellow-300/50'
                      : 'bg-white/10 backdrop-blur-xs text-white hover:bg-white/20'
                  }`}
                >
                  {/* Column 1: No */}
                  <div className={`col-span-2 text-center font-extrabold ${isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                    {rank}
                  </div>

                  {/* Column 2: Nama Pemain */}
                  <div className={`col-span-6 text-left pl-1 sm:pl-2 truncate font-bold flex items-center space-x-1.5 ${isCurrentUser ? 'text-yellow-100 font-black' : 'text-white'}`}>
                    <span className="truncate">{user.fullname || user.username || 'Pemain'}</span>
                    {isCurrentUser && (
                      <span className="text-[9px] sm:text-[10px] px-1 py-0.2 rounded-full bg-yellow-400 text-[#2D241E] font-sans font-black flex-shrink-0 shadow-sm animate-pulse">
                        KAMU ⭐
                      </span>
                    )}
                  </div>

                  {/* Column 3: Score */}
                  <div className={`col-span-4 text-center font-black ${isCurrentUser ? 'text-yellow-300 font-black' : 'text-amber-200'}`}>
                    {user.totalScore || user.score || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DETEKTIF RYU MASCOT & SPEECH BUBBLE VIA UNIFIED INSTRUCTOR GUIDE */}
      <InstructorMascotGuide
        layout="floating"
        character="ryu"
        pose="thinking"
        emotion="happy"
        title="INSTRUKTUR RYU"
        icon="🔥"
        canSpeak={true}
        message={reloText || 'Papan peringkat para detektif terhebat! 🏆🔥🐉'}
      />

    </div>
  );
}
