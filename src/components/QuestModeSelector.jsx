import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Lock, Trophy, CheckCircle2 } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chapterLearningData';
import InstructorMascotGuide from './InstructorMascotGuide';
import NetworkStatusBadge from './NetworkStatusBadge';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import { fetchUserQuestScores } from '../services/apiService';
import { storageService } from '../services/storageService';

/**
 * QuestModeSelector
 * Displays 5 chapters in a grid menu.
 * Unlocks Quest Mode for a chapter if all segments of that chapter are completed.
 * Shows 'Sudah Dikerjakan' badge with score when completed, or 'Belum Dikerjakan'.
 */
export default function QuestModeSelector({ userProgress, onBackToMenu, onStartQuestSubbab, currentUser }) {
  const [reloText, setReloText] = useState('');
  const [questScores, setQuestScores] = useState(() => {
    const fromUser = currentUser?.questScores || {};
    const fromStorage = storageService.getCurrentUser()?.questScores || {};
    return { ...fromStorage, ...fromUser };
  });

  useEffect(() => {
    // Auto-play mascot speech immediately upon entering quest mode
    const timer = setTimeout(() => {
      const res = reloVoiceService.playScene('4', false, true);
      if (res && res.text) {
        setReloText(res.text);
      }
    }, 150);

    // Fetch quest scores from backend (non-blocking) and merge
    const activeUser = currentUser || storageService.getCurrentUser();
    if (activeUser && !activeUser._isGuest) {
      fetchUserQuestScores().then(result => {
        if (result && result.success && result.data) {
          const scores = {};
          // Format 1: { subbabs: { 1: { ... }, 2: { ... } } }
          if (result.data.subbabs && typeof result.data.subbabs === 'object') {
            Object.entries(result.data.subbabs).forEach(([sId, val]) => {
              if (val) {
                scores[Number(sId)] = {
                  score: val.score,
                  correctCount: val.correctCount ?? val.correct_count,
                  totalQuestions: val.totalQuestions ?? val.total_questions ?? 10,
                };
              }
            });
          }
          // Format 2: { rows: [ { subbabId, score, ... } ] }
          if (Array.isArray(result.data.rows)) {
            result.data.rows.forEach(s => {
              scores[Number(s.subbabId || s.subbab_id)] = {
                score: s.score,
                correctCount: s.correctCount ?? s.correct_count,
                totalQuestions: s.totalQuestions ?? s.total_questions ?? 10,
              };
            });
          }
          // Format 3: Array of items [ { subbabId, score, ... } ]
          if (Array.isArray(result.data)) {
            result.data.forEach(s => {
              scores[Number(s.subbabId || s.subbab_id)] = {
                score: s.score,
                correctCount: s.correctCount ?? s.correct_count,
                totalQuestions: s.totalQuestions ?? s.total_questions ?? 10,
              };
            });
          }
          setQuestScores(prev => {
            const merged = { ...prev };
            Object.entries(scores).forEach(([sId, sData]) => {
              const prevData = merged[sId] || merged[Number(sId)] || {};
              const bestScore = Math.max(prevData.score || 0, sData.score || 0);
              const bestCorrect = Math.max(prevData.correctCount || 0, sData.correctCount || 0);
              const combined = {
                ...prevData,
                ...sData,
                score: bestScore,
                correctCount: bestCorrect,
              };
              merged[sId] = combined;
              merged[Number(sId)] = combined;
            });
            return merged;
          });
        }
      }).catch(() => {});
    }

    return () => {
      clearTimeout(timer);
      reloVoiceService.stopVoice();
    };
  }, [currentUser]);

  /**
   * Returns badge color classes based on score (0-100):
   * - Red: < 60
   * - Yellow: 60–79
   * - Green: 80+
   */
  const getScoreBadgeStyle = (score) => {
    if (score >= 80) return 'bg-emerald-100/90 text-emerald-800 border-emerald-500';
    if (score >= 60) return 'bg-amber-100/90 text-amber-800 border-amber-500';
    return 'bg-rose-100/90 text-rose-800 border-rose-500';
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return '⭐';
    if (score >= 60) return '📝';
    return '📕';
  };

  return (
    <div className="h-full w-full flex flex-col justify-start p-2.5 sm:p-3.5 font-hand gap-2 sm:gap-3 animate-fade-in overflow-hidden relative">
      
      {/* Snowy's Ice Kingdom Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <img 
          src="/game asset/new_snowy_island.png" 
          alt="Snowy Island"
          className="w-full h-full object-cover object-bottom scale-[1.35] sm:scale-[1.42] -translate-x-[6%] sm:-translate-x-[8%] origin-bottom pointer-events-none select-none"
        />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between p-3 rounded-2xl sm:rounded-3xl glass-header border border-white/60 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] relative z-10 flex-shrink-0">
        <button
          onClick={() => { audioEngine.playClick(); reloVoiceService.stopVoice(); onBackToMenu(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className="pencil-btn px-4 py-2 glass-btn text-[#2D241E] font-black text-sm sm:text-base lg:text-[20px] flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5 text-[#2563EB]" />
          <span>Menu Utama</span>
        </button>

        <h2 className="text-base sm:text-lg lg:text-[20px] font-black font-pencil text-[#2D241E]">
          QUEST MODE: UJIAN 30 SOAL
        </h2>

        <div className="flex items-center">
          <NetworkStatusBadge compact={true} />
        </div>
      </div>

      {/* FRONT STANDING SNOWY MASCOT */}
      <InstructorMascotGuide
        layout="floating"
        character="snowy"
        pose="standing"
        emotion="idle"
        title="INSTRUKTUR SNOWY"
        icon="❄️"
        message={reloText || "Selamat datang di Quest Mode! Kamu punya waktu 30 menit untuk menyelesaikan misi Ujian Kasus! ⏱️❄️🐻"}
      />

      {/* Info Card */}
      <div className="p-2 sm:p-2.5 px-3 sm:px-4 rounded-2xl glass-card border border-amber-300/40 text-xs sm:text-sm font-bold text-[#78350F] relative z-10 flex-shrink-0 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-2 text-[#D97706] uppercase font-black text-xs sm:text-sm lg:text-base mb-0.5">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>KETENTUAN QUEST MODE:</span>
        </div>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#4A3E3D] font-bold leading-snug">
          • Terbuka setelah menyelesaikan semua materi Chapter • Durasi 30 Menit • 30 Soal Ujian • Skala Nilai 0-100
        </p>
      </div>

      {/* CHAPTER GRID (5 CHAPTERS, FIXED ZERO SCROLL) */}
      <div className="flex-1 min-h-0 flex flex-col justify-start pt-1 sm:pt-2 md:pt-3 relative z-10 overflow-hidden">
        <div className="grid grid-cols-5 gap-3.5 font-pencil w-full max-w-6xl mx-auto px-2 sm:px-4">
          {Object.values(CHAPTERS_DATA).map((ch) => {
            const chProgress = userProgress?.[ch.key] || userProgress?.[`subbab${ch.id}`];
            const completedSegs = chProgress?.completedSegments || (chProgress?.stars ? Object.keys(chProgress.stars).length : 0);
            const isAdmin = Boolean(
              currentUser?.isAdmin ||
              (currentUser?.username || '').toLowerCase() === 'fikran02' ||
              (currentUser?.fullname || '').toLowerCase() === 'admin'
            );
            const isUnlocked = isAdmin || ch.id === 1 || completedSegs >= ch.totalSegments || Boolean(chProgress?.completed);
            const chScore = questScores[ch.id] || questScores[String(ch.id)] || currentUser?.questScores?.[ch.id] || currentUser?.questScores?.[String(ch.id)] || storageService.getCurrentUser()?.questScores?.[ch.id] || storageService.getCurrentUser()?.questScores?.[String(ch.id)];

            return (
              <button
                key={ch.id}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playClick();
                    onStartQuestSubbab(ch.id);
                  } else {
                    audioEngine.playError();
                    const res = reloVoiceService.playScene('4_locked');
                    if (res && res.text) setReloText(res.text);
                  }
                }}
                onMouseEnter={() => { if (isUnlocked) audioEngine.playHover(); }}
                className={`pencil-btn p-3 sm:p-3.5 rounded-2xl border shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex flex-col justify-between h-[205px] min-h-[205px] transition-all text-left group relative overflow-hidden cursor-pointer ${
                  isUnlocked
                    ? 'glass-card border-white/80 hover:scale-[1.02]'
                    : 'glass-panel-subtle border-stone-300/50 text-[#78716C] cursor-not-allowed opacity-75 grayscale contrast-95'
                }`}
              >
                {/* Header Row: UJIAN BAB Box */}
                <div className="flex items-center justify-between w-full relative z-10">
                  <span className={`text-xs sm:text-sm font-daruma uppercase tracking-wider px-3.5 py-1.5 rounded-xl border-2 shadow-[2px_2px_0px_#2D241E] whitespace-nowrap ${
                    isUnlocked
                      ? 'bg-[#FEF3C7] text-[#D97706] border-[#2D241E]'
                      : 'bg-[#F3F4F6] text-[#78716C] border-[#A8A29E]'
                  }`}>
                    UJIAN BAB {ch.id}
                  </span>

                  {!isUnlocked && (
                    <div className="p-1.5 rounded-xl bg-[#E5E7EB] text-[#6B7280] font-black text-xs flex items-center justify-center border border-[#A8A29E]">
                      <Lock className="w-3.5 h-3.5 text-[#6B7280]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center w-full my-1.5 min-h-0 relative z-10">
                  <div className="text-2xl mb-1">{ch.icon}</div>
                  <h3 className={`text-xs sm:text-sm md:text-base font-black font-pencil leading-tight break-words group-hover:text-[#D97706] transition-colors ${
                    isUnlocked ? 'text-[#2D241E]' : 'text-[#78716C]'
                  }`}>
                    {ch.title}
                  </h3>
                </div>

                {/* Score Badge (bottom): 'Sudah Dikerjakan' vs 'Belum Dikerjakan' */}
                {isUnlocked && (
                  <div className="w-full flex-shrink-0 mt-1 relative z-10">
                    {chScore ? (
                      <div className={`flex items-center justify-between px-2.5 py-1 rounded-xl border-2 text-xs sm:text-sm font-black font-pencil shadow-xs ${getScoreBadgeStyle(chScore.score)}`}>
                        <div className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs">Sudah Dikerjakan</span>
                        </div>
                        <span className="font-mono text-xs sm:text-sm flex-shrink-0">{chScore.score}/100 {getScoreEmoji(chScore.score)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center px-2.5 py-1 rounded-xl border border-white/60 bg-white/40 text-xs font-bold text-[#78350F] italic font-pencil">
                        Belum Dikerjakan
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

