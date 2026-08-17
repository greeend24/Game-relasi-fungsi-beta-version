import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import ProfessorOwlMascot from './ProfessorOwlMascot';

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
    { fullname: 'Pencari Jejak Data', totalScore: 2500 },
    { fullname: 'Detektif Pemula', totalScore: 1800 }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING EXACT PNG ASPECT RATIO 2843:2628 */}
      <div 
        className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-[2843/2628] bg-contain bg-no-repeat bg-center text-[#2D241E] flex flex-col items-center drop-shadow-2xl overflow-hidden"
        style={{ backgroundImage: `url('/assets/tampilan di highscore/Asset/board_mark_high_score@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} reloVoiceService.stopVoice(); onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-[4%] right-[5%] z-30 cursor-pointer"
          title="Tutup Menu High Score"
        >
          <img 
            src="/assets/tampilan di highscore/Asset/exit_button_of_highscore@4x.png" 
            alt="Exit" 
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: CIRCLE WOODEN STAR ICON BADGE (SHIFTED UP 0.5 TABLE ROW HEIGHT) */}
        <div className="flex flex-col items-center absolute top-2 sm:top-3 z-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative drop-shadow-md">
            <img 
              src="/assets/tampilan di highscore/Asset/Highscore_icon@4x.png" 
              alt="Highscore Star Icon" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* PLAYER SCORES TABLE LIST (FIXED DISPLAY WITHOUT SCROLLING) */}
        <div className="w-full flex-1 flex flex-col min-h-0 pt-[31%] sm:pt-[30%] px-[6%] sm:px-[7%] pb-[6%]">
          <div className="space-y-1.5 w-full">
            {displayList.slice(0, 7).map((user, idx) => {
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
                  className={`grid grid-cols-12 gap-1 py-1 px-2 rounded-xl font-pencil text-base sm:text-lg font-bold drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)] items-center transition-all ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-amber-400/50 via-yellow-300/55 to-amber-500/50 border-2 border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.75)] text-yellow-100 ring-2 ring-yellow-300/50'
                      : 'bg-white/10 backdrop-blur-xs text-white hover:bg-white/20'
                  }`}
                >
                  <div className={`col-span-2 text-left pl-1 sm:pl-1.5 font-extrabold ${isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                    {rank}
                  </div>
                  <div className={`col-span-7 text-left pl-0 sm:pl-0.5 truncate font-bold flex items-center space-x-1.5 ${isCurrentUser ? 'text-yellow-100 font-black' : 'text-white'}`}>
                    <span className="truncate">{user.fullname || user.username || 'Pemain'}</span>
                    {isCurrentUser && (
                      <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-yellow-400 text-[#2D241E] font-sans font-black flex-shrink-0 shadow-sm animate-pulse">
                        KAMU ⭐
                      </span>
                    )}
                  </div>
                  <div className={`col-span-3 text-center pr-12 sm:pr-16 font-black ${isCurrentUser ? 'text-yellow-300 font-black' : 'text-amber-200'}`}>
                    {user.totalScore || user.score || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DETEKTIF RELO MASCOT (+50% LARGER) & ENLARGED COMIC SPEECH BUBBLE */}
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 pointer-events-none flex flex-col items-start animate-fade-in max-w-[320px] sm:max-w-[420px]">
        {reloText && (
          <div className="relative mb-3 p-4 sm:p-5 rounded-3xl bg-white border-4 border-[#2D241E] shadow-[6px_8px_0px_rgba(45,36,30,0.9)] text-[#2D241E] font-hand pointer-events-auto">
            <div className="absolute -bottom-4 left-10 w-0 h-0 border-t-[16px] border-t-[#2D241E] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent" />
            <div className="absolute -bottom-[11px] left-10 w-0 h-0 border-t-[12px] border-t-white border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-black text-[#9A3412] uppercase tracking-wider mb-1.5 border-b-2 border-[#FED7AA] pb-1">
              <span className="text-base sm:text-lg">🕵️‍♂️</span>
              <span>PETUNJUK RELO</span>
            </div>
            <p className="text-base sm:text-lg font-black leading-snug text-[#2D241E]">
              {reloText}
            </p>
          </div>
        )}

        <ProfessorOwlMascot
          pose="thinking"
          size="xxxl"
          animateOnHoverOnly={false}
          message=""
        />
      </div>

    </div>
  );
}
