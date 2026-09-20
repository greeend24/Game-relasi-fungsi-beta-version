import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowLeft, BookOpen, CheckCircle2, ChevronRight, GitFork, Target, Layers, BarChart3, Link2 } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chapterLearningData';
import InstructorMascotGuide from './InstructorMascotGuide';
import NetworkStatusBadge from './NetworkStatusBadge';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

const CHAPTER_WORLD_NAMES = {
  1: '🪢 Markas Relasi (Relation Base)',
  2: '🎯 Gerbang Fungsi (Function Gate)',
  3: '📐 Benteng Rumus (Formula Fortress)',
  4: '📊 Puncak Grafik (Graph Summit)',
  5: '🔗 Jembatan Bijektif (Bijection Bridge)'
};

const CHAPTER_ICONS = {
  1: GitFork,
  2: Target,
  3: Layers,
  4: BarChart3,
  5: Link2
};

export default function StageSelector({
  userProgress,
  currentUser,
  onSelectChapter,
  onSelectExercise,
  onBackToMenu,
  currentSubbabId,
  setCurrentSubbabId,
  onOpenSubbabInfo,
  initialStep = 'SUBBAB_SELECT'
}) {
  const [reloText, setReloText] = useState('');

  const timer30Ref = useRef(null);
  const timer60Ref = useRef(null);

  const clearIdleTimers = () => {
    if (timer30Ref.current) clearTimeout(timer30Ref.current);
    if (timer60Ref.current) clearTimeout(timer60Ref.current);
  };

  const startIdleTimers = () => {
    clearIdleTimers();
    timer30Ref.current = setTimeout(() => {
      const res = reloVoiceService.playScene('2B');
      if (res.text) setReloText(res.text);
    }, 30000);
    timer60Ref.current = setTimeout(() => {
      const res = reloVoiceService.playScene('2C');
      if (res.text) setReloText(res.text);
    }, 60000);
  };

  useEffect(() => {
    startIdleTimers();
    // Auto-play mascot speech immediately upon entering chapter selector
    const timer = setTimeout(() => {
      const res = reloVoiceService.playScene('2A', false, true);
      if (res?.text) setReloText(res.text);
    }, 150);

    return () => {
      clearTimeout(timer);
      clearIdleTimers();
      reloVoiceService.stopVoice();
    };
  }, []);

  const handleChapterClick = (chapterId) => {
    audioEngine.playClick();
    clearIdleTimers();
    reloVoiceService.stopVoice();
    onSelectChapter(chapterId);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-3 sm:p-4 md:p-5 font-hand animate-fade-in overflow-hidden relative z-10">

      {/* Top Header Navigation */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl glass-header border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.1)] relative z-10 flex-shrink-0">
        <button
          onClick={() => { audioEngine.playClick(); clearIdleTimers(); onBackToMenu(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className="pencil-btn flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 glass-btn text-[#2D241E] font-black text-sm sm:text-base lg:text-[18px] w-fit hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
          <span>Kembali ke Menu Utama</span>
        </button>

        <h2 className="text-base sm:text-xl lg:text-2xl font-black font-pencil text-[#2D241E] tracking-wide">
          📖 Pilih Chapter Pembelajaran
        </h2>

        <div className="flex items-center">
          <NetworkStatusBadge compact={true} />
        </div>
      </div>

      {/* FRONT STANDING DETEKTIF RELO MASCOT & COMIC SPEECH BUBBLE */}
      <InstructorMascotGuide
        layout="floating"
        character="relo"
        pose="exploring"
        emotion="idle"
        title="PETUNJUK DETEKTIF RELO"
        icon="🕵️‍♂️"
        message={reloText || 'Pilih Chapter untuk mulai belajar Relasi & Fungsi! 📖🔍🦉'}
      />

      {/* CHAPTER SELECTION CARDS (5 CHAPTERS, FIXED, NO SCROLL) */}
      <div className="flex-1 min-h-0 flex flex-col justify-start items-center pt-2 sm:pt-4 md:pt-6 pb-2 relative z-10 overflow-hidden">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#78350F] max-w-6xl mx-auto w-full px-2 sm:px-4 mb-2.5 sm:mb-3.5">
          <span className="text-xs sm:text-sm md:text-base font-black uppercase text-[#9A3412] tracking-wider drop-shadow-sm flex items-center gap-2">
            <span>🔍</span>
            <span>PILIH CHAPTER UNTUK MULAI BELAJAR:</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 font-pencil w-full max-w-6xl mx-auto px-2 sm:px-4">
          {Object.values(CHAPTERS_DATA).map((ch) => {
            const chProgress = userProgress?.[ch.key] || userProgress?.[`subbab${ch.id}`];
            const completedSegments = chProgress?.completedSegments || (chProgress?.stars ? Object.keys(chProgress.stars).length : 0);
            const isCompleted = Boolean(chProgress?.completed || completedSegments >= ch.totalSegments);

            const prevCh = CHAPTERS_DATA[ch.id - 1];
            const prevProgress = userProgress?.[`chapter${ch.id - 1}`] || userProgress?.[`subbab${ch.id - 1}`];
            const prevCompleted = Boolean(
              prevProgress?.completed ||
              (prevProgress?.completedSegments >= (prevCh?.totalSegments || 10))
            );

            const isUserAdmin = Boolean(
              currentUser?.isAdmin ||
              (currentUser?.username || '').toLowerCase() === 'fikran02' ||
              (currentUser?.fullname || '').toLowerCase() === 'admin'
            );

            const isUnlocked = Boolean(
              isUserAdmin ||
              ch.id === 1 ||
              chProgress?.unlocked ||
              (ch.id > 1 && prevCompleted)
            );
            const IconComp = CHAPTER_ICONS[ch.id] || BookOpen;

            const isExerciseUnlocked = Boolean(isUserAdmin || isCompleted);
            const isExerciseCompleted = Boolean(userProgress?.exercises?.[`latihan${ch.id}`]?.completed);

            return (
              <div key={ch.id} className="flex flex-col gap-2 w-full min-w-0">
                {/* Chapter Card */}
                <button
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && handleChapterClick(ch.id)}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`pencil-btn p-3 sm:p-3.5 rounded-2xl border shadow-[0_6px_16px_rgba(0,0,0,0.08)] flex flex-col justify-between h-[175px] sm:h-[185px] md:h-[195px] min-h-[170px] transition-all text-left group relative overflow-hidden cursor-pointer w-full ${
                    isCompleted
                      ? 'glass-card border-emerald-400/70 text-[#2D241E] ring-2 ring-[#22C55E]/60 shadow-[0_6px_20px_rgba(34,197,94,0.15)]'
                      : isUnlocked
                      ? 'glass-card border-white/80 text-[#2D241E] hover:scale-[1.02]'
                      : 'glass-panel-subtle border-white/40 text-[#78716C] cursor-not-allowed opacity-75'
                  }`}
                >
                  {/* Header with Darumadrop One for Chapter Badge */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-xl text-white border border-[#2D241E] shadow-[1px_1px_0px_#2D241E] ${
                        isCompleted ? 'bg-[#22C55E]' : 'bg-[#D97706]'
                      }`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-daruma text-[#D97706] tracking-wide uppercase">
                        Chapter {ch.id}
                      </span>
                    </div>

                    {!isUnlocked ? (
                      <Lock className="w-4 h-4 text-[#A8A29E]" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                    ) : (
                      <div className="p-1 rounded-full glass-panel-subtle border border-[#2D241E] group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />
                      </div>
                    )}
                  </div>

                  {/* Title & subtitle */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center my-1 min-h-0">
                    <div className="text-xl mb-0.5">{ch.icon}</div>
                    <h3 className="text-xs sm:text-sm md:text-base font-black font-pencil text-[#2D241E] leading-tight break-words group-hover:text-[#D97706] transition-colors line-clamp-2">
                      {ch.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#78350F] mt-0.5 font-pencil font-medium leading-snug break-words line-clamp-2">
                      {ch.subtitle}
                    </p>
                  </div>

                  {/* Progress bar */}
                  {isUnlocked && (
                    <div className="relative z-10 w-full font-pencil mt-1 flex-shrink-0">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#78350F] mb-0.5">
                        <span>{completedSegments}/{ch.totalSegments}</span>
                        {isCompleted && <span className="text-[#22C55E]">✅ Selesai</span>}
                      </div>
                      <div className="w-full h-1.5 sm:h-2 bg-white/60 rounded-full border border-[#2D241E] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-[#22C55E]' : 'bg-[#D97706]'}`}
                          style={{ width: `${Math.min(100, (completedSegments / ch.totalSegments) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>

                {/* Box Latihan 1-5 di Bawah Chapter (Sesuai Kotak Merah Pengguna) */}
                <button
                  disabled={!isExerciseUnlocked}
                  onClick={() => {
                    if (isExerciseUnlocked && onSelectExercise) {
                      audioEngine.playClick();
                      clearIdleTimers();
                      onSelectExercise(ch.id);
                    }
                  }}
                  onMouseEnter={() => isExerciseUnlocked && audioEngine.playHover()}
                  className={`pencil-btn px-2.5 py-2 sm:py-2.5 rounded-xl border flex items-center justify-between transition-all text-left w-full cursor-pointer group shadow-sm ${
                    isExerciseCompleted
                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500/40 shadow-[0_3px_10px_rgba(16,185,129,0.2)]'
                      : isExerciseUnlocked
                      ? 'bg-gradient-to-r from-amber-100 via-amber-50 to-yellow-100 border-[#D97706]/70 text-[#78350F] hover:scale-[1.02] shadow-[0_3px_10px_rgba(217,119,6,0.18)] hover:border-[#D97706]'
                      : 'glass-panel-subtle border-white/40 text-stone-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base sm:text-lg flex-shrink-0">
                      {isExerciseCompleted ? '⭐' : isExerciseUnlocked ? '✏️' : '🔒'}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-black font-pencil tracking-wide leading-tight truncate">
                        Latihan {ch.id}
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] font-bold opacity-80 leading-none truncate">
                        {isExerciseCompleted ? '30 Soal Tuntas' : isExerciseUnlocked ? '30 Soal + Remedial' : 'Selesaikan Materi'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-1">
                    {isExerciseCompleted ? (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-200 text-emerald-800">
                        Selesai
                      </span>
                    ) : isExerciseUnlocked ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 group-hover:bg-amber-300 transition">
                        Mulai →
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
