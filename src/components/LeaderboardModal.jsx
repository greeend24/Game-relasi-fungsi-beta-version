import React, { useState, useEffect } from 'react';
import { X, Trophy, Star, Flame } from 'lucide-react';
import { storageService, calculateBadge } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import ProfessorOwlMascot from './ProfessorOwlMascot';

export default function LeaderboardModal({ isOpen, onClose }) {
  const [reloText, setReloText] = useState('');

  useEffect(() => {
    if (isOpen) {
      const res = reloVoiceService.playScene('6');
      if (res.text) setReloText(res.text);
    } else {
      reloVoiceService.stopVoice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const leaderboard = storageService.getLeaderboard();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] space-y-5 max-h-[85vh] overflow-y-auto drag-scroller">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#EFECE6]">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-[#D97706]" />
            <h2 className="text-2xl font-bold font-pencil text-[#2D241E]">HIGH SCORE GLOBAL</h2>
          </div>
          <button 
            onClick={() => { audioEngine.playClick(); reloVoiceService.stopVoice(); onClose(); }}
            className="pencil-btn p-1.5 bg-[#F3F4F6] text-[#374151]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Relo Mascot */}
        <div className="flex justify-center sm:justify-start">
          <ProfessorOwlMascot
            pose="welcoming"
            emotion="happy"
            message={reloText || "Ini dia papan peringkat global! Coba lihat posisimu!"}
            size="sm"
          />
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-3">
          {leaderboard.map((user, idx) => {
            const rank = idx + 1;
            const badge = calculateBadge(user.completedStages || 0, user.totalScore || 0);

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between shadow-[2px_3px_0px_#2D241E] ${
                  rank === 1
                    ? 'bg-[#FEF3C7] border-[#2D241E] text-[#78350F]'
                    : rank === 2
                    ? 'bg-[#F3F4F6] border-[#2D241E] text-[#374151]'
                    : rank === 3
                    ? 'bg-[#FFEDD5] border-[#2D241E] text-[#9A3412]'
                    : 'bg-[#FFFDF9] border-[#2D241E] text-[#2D241E]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-1.5 border-[#2D241E] flex items-center justify-center font-bold text-sm">
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                  </div>
                  <div>
                    <h4 className="font-bold text-base leading-none text-[#2D241E]">
                      {user.fullname || user.username}
                    </h4>
                    <div className="flex items-center space-x-1 mt-1 text-[11px] font-bold text-[#78350F]">
                      <span>{badge.icon}</span>
                      <span>Lencana: {badge.name} ({user.completedStages || 0} Stage)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-extrabold text-sm space-y-0.5">
                  <div className="flex items-center justify-end space-x-1 text-[#D97706]">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{user.totalScore || 0} PTS</span>
                  </div>
                  {user.endlessHighScore > 0 && (
                    <div className="flex items-center justify-end space-x-1 text-xs text-[#EA580C]">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Endless: {user.endlessHighScore}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
