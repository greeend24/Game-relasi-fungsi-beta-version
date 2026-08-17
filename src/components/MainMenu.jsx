import React, { useState } from 'react';
import { Play, Map, Flame, Trophy, Settings, LogOut, Award, ArrowRight } from 'lucide-react';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import ConfirmExitModal from './ConfirmExitModal';
import { audioEngine } from '../services/audioEngine';
import { storageService, calculateBadge } from '../services/storageService';
import { reloVoiceService } from '../services/reloVoiceService';

export default function MainMenu({ 
  currentUser, 
  onNewGame, 
  onStartQuest,
  onStartEndless,
  onOpenSettings, 
  onOpenLeaderboard, 
  onOpenBadges,
  onLogout 
}) {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const completedCount = storageService.getCompletedStagesCount(currentUser?.progress);
  const badgeInfo = calculateBadge(completedCount, currentUser?.totalScore || 0);

  const [reloText, setReloText] = useState('');

  React.useEffect(() => {
    try {
      if (!audioEngine.isPlayingBgm && !audioEngine.isQuestBattleActive) {
        audioEngine.toggleBgm(true);
      }
    } catch {}

    // Determine if first login or returning login
    const isFirstTime = !currentUser?.lastLoginAt || (currentUser?.loginCount && currentUser.loginCount <= 1);
    const sceneId = isFirstTime ? '1A' : '1B';
    const res = reloVoiceService.playScene(sceneId);
    if (res.text) {
      setReloText(res.text);
    }
  }, [currentUser]);

  return (
    <div className="max-w-xl mx-auto my-2 p-3 font-hand space-y-3 animate-fade-in relative z-10">
      
      {/* Top Welcome Header Banner */}
      <div className="p-4 rounded-3xl bg-white/35 backdrop-blur-lg border-3 border-[#2D241E] shadow-[5px_6px_0px_#2D241E] text-center space-y-2 relative z-10">
        
        {/* Animated Badge Category Chip with Dynamic Category Gradient */}
        <button
          onClick={() => { audioEngine.playClick(); onOpenBadges(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className={`relative overflow-hidden inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border-2 font-bold text-[11px] sm:text-xs shadow-[2px_2px_0px_#2D241E] transition hover:scale-105 bg-gradient-to-r ${badgeInfo.cardGradient} ${badgeInfo.textColor} ${
            badgeInfo.category === 10 ? 'animate-legendary-glow ring-2 ring-yellow-300' : ''
          }`}
        >
          {badgeInfo.category === 10 && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-badge-shimmer pointer-events-none z-10" />
          )}
          <img src={badgeInfo.iconPath} alt={badgeInfo.name} className="w-5 h-5 object-contain filter drop-shadow-sm z-10" />
          <span className="z-10">Lencana: {currentUser?.fullname || currentUser?.username} ({badgeInfo.name})</span>
        </button>

        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-bold font-pencil text-[#2D241E] tracking-wide leading-none">
            DETEKTIF DATA
          </h1>
          <p className="text-[10px] sm:text-xs text-[#78350F] font-bold">
            Petualangan Matematika SMP Class VIII (Relasi & Fungsi)
          </p>
        </div>

        {/* Welcoming Mascot */}
        <div className="flex justify-center">
          <ProfessorOwlMascot
            pose="welcoming"
            emotion="happy"
            message={reloText || `Halo ${currentUser?.fullname || 'Detektif'}! Pilih mode penyelidikan di bawah ini!`}
            size="sm"
          />
        </div>
      </div>

      {/* COMPACT MENU GRID - ALL BUTTONS FROM START GAME TO EXIT FIT ON 1 SCREEN WITHOUT SCROLLING */}
      <div className="space-y-2 font-hand relative z-10">
        
        {/* 1. START GAME - PROMINENT FULL WIDTH BUTTON */}
        <button
          onClick={() => { audioEngine.playClick(); onNewGame(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className="pencil-btn w-full p-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-extrabold text-base flex items-center justify-between group hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[3px_4px_0px_#2D241E]"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#F59E0B] text-white border-1.5 border-[#2D241E] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <span className="font-pencil text-lg sm:text-xl text-[#2D241E]">Start Game</span>
          </div>
          <ArrowRight className="w-5 h-5 text-[#2D241E] group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* 2-COLUMN GRID FOR SECONDARY OPTIONS */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* QUEST MODE */}
          <button
            onClick={() => { audioEngine.playClick(); onStartQuest(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#2563EB] text-white border border-[#2D241E] flex-shrink-0">
                <Map className="w-4 h-4" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#2D241E] truncate">Quest Mode</span>
            </div>
          </button>

          {/* ENDLESS MODE */}
          <button
            onClick={() => { audioEngine.playClick(); onStartEndless(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#EA580C] text-white border border-[#2D241E] flex-shrink-0">
                <Flame className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#2D241E] truncate">Endless Mode</span>
            </div>
          </button>

          {/* LENCANA & ACHIEVEMENTS */}
          <button
            onClick={() => { audioEngine.playClick(); onOpenBadges(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#0284C7] text-white border border-[#2D241E] flex-shrink-0">
                <Award className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#2D241E] truncate">Lencana</span>
            </div>
          </button>

          {/* HIGH SCORE */}
          <button
            onClick={() => { audioEngine.playClick(); onOpenLeaderboard(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#D97706] text-white border border-[#2D241E] flex-shrink-0">
                <Trophy className="w-4 h-4 text-yellow-200" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#2D241E] truncate">High Score</span>
            </div>
          </button>

          {/* SETTINGS */}
          <button
            onClick={() => { audioEngine.playClick(); onOpenSettings(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 text-[#2D241E] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#7C3AED] text-white border border-[#2D241E] flex-shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#2D241E] truncate">Settings</span>
            </div>
          </button>

          {/* EXIT (LOGOUT) */}
          <button
            onClick={() => { audioEngine.playClick(); setIsExitModalOpen(true); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn p-2.5 bg-[#FFE4E6] text-[#BE123C] font-extrabold text-xs sm:text-sm flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-2 truncate">
              <div className="p-1.5 rounded-lg bg-[#BE123C] text-white border border-[#2D241E] flex-shrink-0">
                <LogOut className="w-4 h-4 text-white" />
              </div>
              <span className="font-pencil text-sm sm:text-base text-[#BE123C] truncate">Exit Game</span>
            </div>
          </button>

        </div>

      </div>

      {/* CONFIRM EXIT MODAL */}
      <ConfirmExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirmExit={() => {
          setIsExitModalOpen(false);
          onLogout();
        }}
      />

    </div>
  );
}
