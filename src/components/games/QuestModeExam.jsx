import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Play, Check, Zap } from 'lucide-react';
import { CHAPTERS_DATA } from '../../data/chapterLearningData';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { reloVoiceService } from '../../services/reloVoiceService';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import RelationCartesianCanvas from '../RelationCartesianCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import DetektifRelo from '../DetektifRelo';
import NetworkStatusBadge from '../NetworkStatusBadge';
import confetti from 'canvas-confetti';

import { generateSubbabQuestions } from '../../services/questQuestionsService';
import MathVisualizer from '../visuals/MathVisualizer';

/**
 * QuestModeExam
 * Timed 30-minute exam challenge with 30 distinct questions & multiple interactive question types:
 * - Scoring: C3 = 50 pts, C4 = 80 pts, C5 = 120 pts + 1 pt per remaining second!
 */
export default function QuestModeExam({ subbabId = 1, onBackToQuestSelect, currentUser }) {
  const subData = CHAPTERS_DATA[subbabId] || CHAPTERS_DATA[1];

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0); // 0 to 29
  const [answers, setAnswers] = useState({}); // qIndex -> selectedOption or pairs object
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [reloText, setReloText] = useState('');
  const [selectedA, setSelectedA] = useState(null);

  // Sync refs to prevent stale closure during auto-submission or timer ticks
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const timeRemainingRef = useRef(timeRemaining);
  timeRemainingRef.current = timeRemaining;

  const questionsRef = useRef(questions);
  questionsRef.current = questions;

  useEffect(() => {
    setSelectedA(null);
  }, [currentQIndex]);

  // Play Scene 4 (Quest Mode) on mount
  useEffect(() => {
    const res = reloVoiceService.playScene('4');
    if (res.text) setReloText(res.text);
    return () => reloVoiceService.stopVoice();
  }, []);

  // Generate 30 varied, non-repetitive, curriculum-accurate questions for this subbab
  useEffect(() => {
    const generated = generateSubbabQuestions(subbabId);
    setQuestions(generated);
  }, [subbabId]);

  const handleSubmitExam = useCallback((overrideTime = null) => {
    setExamSubmitted(true);
    if (audioEngine.battleAudioEl) {
      audioEngine.battleAudioEl.pause();
      audioEngine.battleAudioEl.currentTime = 0;
    }
    audioEngine.isQuestBattleActive = false;
    audioEngine.stopBgm();
    audioEngine.playVictoryMusic(); 
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

    const currentAnswers = answersRef.current;
    const currentQuestions = questionsRef.current;
    const speedBonus = typeof overrideTime === 'number' ? overrideTime : timeRemainingRef.current;

    // Calculate score using exact point distribution:
    // C3 (Q1-10) = 50 pts, C4 (Q11-20) = 80 pts, C5 (Q21-30) = 120 pts + 1 pt per remaining second!
    let totalQuestPoints = 0;
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      const userAns = currentAnswers[idx];
      let isCorrect = false;
      if (q.type === 'ARROWS') {
        const userPairs = userAns || [];
        isCorrect = q.correctPairs.length === userPairs.length && q.correctPairs.every(p => userPairs.includes(p));
      } else if (q.type === 'MATCHING') {
        const userPairs = userAns || {};
        isCorrect = q.pairs.every(p => userPairs[p.x] === p.result);
      } else if (q.type === 'CARTESIAN') {
        const userPts = userAns || [];
        isCorrect = q.targetPoints.length === userPts.length && userPts.every(([ux, uy]) => q.targetPoints.some(([tx, ty]) => tx === ux && ty === uy));
      } else {
        isCorrect = userAns === q.correct;
      }
      if (isCorrect) {
        correctCount++;
        totalQuestPoints += q.pts;
      }
    });

    const totalQCount = currentQuestions.length || 30;
    const score100 = Math.round((correctCount / totalQCount) * 100);
    const finalCalculatedScore = totalQuestPoints + speedBonus;

    // Play exam result voice from Snowy
    try {
      if (score100 >= 75) {
        const res = reloVoiceService.playScene('quest_exam_pass');
        if (res?.text) setReloText(res.text);
      } else {
        const res = reloVoiceService.playScene('quest_exam_fail');
        if (res?.text) setReloText(res.text);
      }
    } catch {}

    // Record quest exam result (saves 0-100 score, correct count, time, and points)
    storageService.recordQuestExamResult(subbabId, {
      score: score100,
      correctCount,
      totalQuestions: totalQCount,
      pointsEarned: finalCalculatedScore,
      timeRemainingSeconds: speedBonus,
    });
  }, [subbabId]);

  const handleSubmitExamRef = useRef(handleSubmitExam);
  handleSubmitExamRef.current = handleSubmitExam;

  // 30-Minute Timer Countdown & Auto-Finish on Expiry
  useEffect(() => {
    if (!hasStarted || examSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === 61) {
          try {
            const res = reloVoiceService.playScene('quest_exam_time_warning');
            if (res?.text) setReloText(res.text);
          } catch {}
        }
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExamRef.current(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, examSubmitted]);

  // Handle quest battle music
  useEffect(() => {
    audioEngine.playQuestBattleMusic();
    return () => {
      audioEngine.stopQuestBattleMusic();
      try { reloVoiceService.stopVoice(); } catch {}
    };
  }, []);

  const handleStartExam = () => {
    audioEngine.playClick();
    reloVoiceService.stopVoice();
    try {
      const res = reloVoiceService.playScene('quest_exam_start');
      if (res?.text) setReloText(res.text);
    } catch {}
    setHasStarted(true);
  };

  const handleSelectOption = (opt) => {
    if (examSubmitted) return;
    audioEngine.playClick();
    setAnswers(prev => ({ ...prev, [currentQIndex]: opt }));
  };

  const handleToggleArrowPair = (pairStr) => {
    if (examSubmitted) return;
    audioEngine.playClick();
    setAnswers(prev => {
      const currentPairs = prev[currentQIndex] || [];
      const newPairs = currentPairs.includes(pairStr)
        ? currentPairs.filter(p => p !== pairStr)
        : [...currentPairs, pairStr];
      return { ...prev, [currentQIndex]: newPairs };
    });
  };

  const handleToggleCartesianPoint = (x, y) => {
    if (examSubmitted) return;
    audioEngine.playClick();
    setAnswers(prev => {
      const currentPts = prev[currentQIndex] || [];
      const exists = currentPts.some(([px, py]) => px === x && py === y);
      const newPts = exists
        ? currentPts.filter(([px, py]) => !(px === x && py === y))
        : [...currentPts, [x, y]];
      return { ...prev, [currentQIndex]: newPts };
    });
  };

  const handleResetCartesianPoints = () => {
    if (examSubmitted) return;
    audioEngine.playClick();
    setAnswers(prev => ({ ...prev, [currentQIndex]: [] }));
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Calculate results for summary
  let correctCount = 0;
  let basePointsEarned = 0;
  questions.forEach((q, idx) => {
    const userAns = answers[idx];
    let isCorrect = false;
    if (q.type === 'ARROWS') {
      const userPairs = userAns || [];
      isCorrect = q.correctPairs.length === userPairs.length && q.correctPairs.every(p => userPairs.includes(p));
    } else if (q.type === 'MATCHING') {
      const userPairs = userAns || {};
      isCorrect = q.pairs.every(p => userPairs[p.x] === p.result);
    } else if (q.type === 'CARTESIAN') {
      const userPts = userAns || [];
      isCorrect = q.targetPoints.length === userPts.length && userPts.every(([ux, uy]) => q.targetPoints.some(([tx, ty]) => tx === ux && ty === uy));
    } else {
      isCorrect = userAns === q.correct;
    }
    if (isCorrect) {
      correctCount++;
      basePointsEarned += q.pts;
    }
  });

  const totalQCount = questions.length || 30;
  const wrongCount = totalQCount - correctCount;
  const score100 = Math.round((correctCount / totalQCount) * 100);
  const totalQuestScore = basePointsEarned + timeRemaining;

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand relative z-10 min-h-0">
      
      {/* Snowy's Ice Kingdom Background Asset (Enlarged & shifted left to eliminate any empty/bolong areas) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <img 
          src="/game asset/new_snowy_island.png" 
          alt="Snowy Island"
          className="w-full h-full object-cover object-bottom scale-[1.35] sm:scale-[1.42] -translate-x-[6%] sm:-translate-x-[8%] origin-bottom pointer-events-none select-none"
        />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between py-1.5 px-3 rounded-2xl glass-panel-subtle flex-shrink-0">
        <button
          onClick={() => {
            audioEngine.playClick();
            if (hasStarted && !examSubmitted) {
              setShowExitConfirm(true); 
            } else {
              onBackToQuestSelect();
            }
          }}
          className="pencil-btn px-3 py-1.5 glass-btn text-[#2D241E] font-black text-xs sm:text-sm lg:text-base flex items-center space-x-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#E11D48]" />
          <span>Kembali ke Quest Select</span>
        </button>

        <h2 className="text-sm sm:text-base lg:text-lg font-black font-pencil text-[#2D241E]">
          QUEST CHAPTER {subbabId}: {subData.title}
        </h2>

        <div className="flex items-center">
          <NetworkStatusBadge compact={true} />
        </div>
      </div>

      {/* BEFORE START SCREEN */}
      {!hasStarted && !examSubmitted && (
        <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
          <InstructorMascotGuide
            layout="dock"
            character="snowy"
            pose="thumbsUp"
            title="INSTRUKTUR SNOWY"
            icon="❄️"
            message={reloText || "Selamat datang di Quest Mode! ⏱️ 30 menit, 30 soal. Kecepatan dan ketepatanmu menentukan skor! ❄️🎯🐻"}
          />

          <div className="glass-panel glass-sheen flex-1 min-h-0 h-full p-4 sm:p-5 rounded-3xl flex flex-col justify-between overflow-hidden space-y-2">
            <div className="space-y-1">
              <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#D97706] uppercase">PETUNJUK & SISTEM PENILAIAN QUEST MODE</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-pencil text-[#2D241E]">{subData.title}</h3>
            </div>

            {/* DETAILED QUEST MODE INSTRUCTION & SCORING RULES */}
            <div className="glass-panel-subtle p-3 sm:p-4 rounded-2xl text-left space-y-2.5 text-base sm:text-lg lg:text-[20px] font-bold text-[#2D241E] overflow-y-auto drag-scroller flex-1 min-h-0">
              <div className="flex items-center space-x-2 text-[#D97706] font-black border-b-2 border-[#FED7AA] pb-1.5">
                <Clock className="w-5 h-5" />
                <span>INFORMASI & BOBOT SKOR QUEST MODE:</span>
              </div>
              
              <ul className="space-y-2 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-amber-600 font-black">•</span>
                  <span><b>Waktu Ujian:</b> 30 Menit (1800 detik) hitung mundur untuk menyelesaikan 30 soal tantangan.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-black">•</span>
                  <span><b>Soal 1 – 10 (Tingkat C3):</b> Bernilai <b>50 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-black">•</span>
                  <span><b>Soal 11 – 20 (Tingkat C4):</b> Bernilai <b>80 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-black">•</span>
                  <span><b>Soal 21 – 30 (Tingkat C5):</b> Bernilai <b>120 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2 bg-[#FEF3C7] p-2.5 rounded-xl border-2 border-[#D97706]">
                  <Zap className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span><b>Bonus Kecepatan:</b> Setiap 1 detik tersisa saat menekan <i>"Selesaikan Quest"</i> menambahkan <b>+1 Poin Bonus</b> per detiknya!</span>
                </li>
              </ul>
            </div>

            <div className="pt-1 flex-shrink-0">
              <button
                onClick={handleStartExam}
                className="pencil-btn w-full py-3 sm:py-3.5 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-xl sm:text-2xl flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <Play className="w-6 h-6 fill-[#D97706] text-[#D97706] animate-pulse" />
                <span>MULAI UJIAN QUEST (30 MENIT)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DURING EXAM SCREEN */}
      {hasStarted && !examSubmitted && (
        <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
          
          {/* Left Side Panel: 30 Questions Grid (#1 - #30) + Standing Mascot */}
          <div className="w-[160px] sm:w-[175px] lg:w-[185px] flex-shrink-0 h-full flex flex-col justify-between gap-1.5 sm:gap-2 overflow-hidden z-20">
            {/* Question Navigator Card (5 columns x 6 rows) */}
            <div className="p-2 sm:p-2.5 rounded-2xl glass-panel glass-sheen border-2 border-white/80 shadow-md flex flex-col items-center justify-start flex-shrink-0">
              <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-black text-[#78350F] mb-1.5 pb-1 border-b border-amber-300/40 font-pencil">
                <span>DAFTAR SOAL</span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#FEF3C7] border border-amber-300 text-[#D97706] font-black text-[10px] sm:text-[11px]">
                  {currentQIndex + 1} / 30
                </span>
              </div>
              
              <div className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full justify-items-center">
                {questions.map((q, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isAnsweredQ = answers[idx] !== undefined;

                  return (
                    <button
                      key={idx}
                      onClick={() => { audioEngine.playClick(); setCurrentQIndex(idx); }}
                      className={`w-6.5 h-6.5 sm:w-7 sm:h-7 aspect-square rounded-lg border flex items-center justify-center p-0 text-[11px] sm:text-xs font-black font-pencil transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white border-white/90 ring-2 ring-[#2563EB]/40 scale-105 shadow-md z-10'
                          : isAnsweredQ
                          ? 'bg-emerald-500/35 text-emerald-950 border-emerald-500/70 font-black'
                          : 'glass-btn text-[#2D241E] border-white/50 hover:bg-white/80'
                      }`}
                      title={`Pindah ke Soal #${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Standing Snowy at bottom */}
            <div className="flex-1 min-h-0 flex items-end justify-center overflow-visible pb-1 pointer-events-auto">
              <DetektifRelo
                character="snowy"
                pose="thinking"
                size="instructorDock"
                isInstructor={true}
                canSpeak={false}
                disableBodyAnimation={false}
                message=""
              />
            </div>
          </div>

          {/* Right Exam Workspace (Full Height for Questions) */}
          <div className="flex-1 min-h-0 h-full flex flex-col justify-between overflow-hidden gap-1.5 sm:gap-2">
            
            {/* Timer & Answered Progress Bar */}
            <div className="py-1 px-3 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex items-center justify-between font-black text-xs sm:text-sm lg:text-base text-[#78350F] flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span>WAKTU TERSISA: {formatTimer(timeRemaining)}</span>
              </div>
              <div className="flex items-center gap-3">
                <NetworkStatusBadge compact={true} />
                <span>TERJAWAB: {Object.keys(answers).length} / 30</span>
              </div>
            </div>

            {/* Current Question Card */}
            {questions[currentQIndex] && (() => {
              const currentQ = questions[currentQIndex];
              const rawQuestion = currentQ.question || '';
              const matchLevel = rawQuestion.match(/\[(?:Soal\s*\d+\s*-\s*)?([A-Za-z0-9_]+)\]/i);
              const qLevel = currentQ.level || (matchLevel ? matchLevel[1] : null);
              const cleanText = rawQuestion.replace(/^\[(?:Soal\s*\d+\s*-\s*)?[^\]]+\]\s*/i, '').trim();

              return (
                <div className="flex-1 min-h-0 p-2 sm:p-2.5 rounded-2xl glass-panel glass-sheen flex flex-col justify-between overflow-hidden gap-1 sm:gap-1.5">
                  
                  {/* Question Metadata Header (Subtle Top Bar) */}
                  <div className="flex items-center justify-between px-3 py-1 rounded-xl glass-panel-subtle flex-shrink-0 text-xs font-black text-[#D97706]">
                    <div className="flex items-center gap-2">
                      <span className="font-daruma text-sm sm:text-base tracking-wide text-[#B45309]">
                        SOAL NO #{currentQIndex + 1} <span className="font-pencil text-xs opacity-75">/ 30</span>
                      </span>
                      {qLevel && (
                        <span className="font-daruma px-2.5 py-0.5 rounded-md bg-amber-100/95 border border-amber-300 text-xs sm:text-sm text-amber-900 uppercase tracking-wider">
                          LEVEL {qLevel}
                        </span>
                      )}
                    </div>
                    <span className="uppercase px-2.5 py-0.5 rounded-md bg-[#FEF3C7]/90 border border-amber-300 text-[10px] sm:text-[11px] font-black tracking-wide">
                      TIPE: {currentQ.type}
                    </span>
                  </div>

                  {/* Main Prominent Question Prompt (Occupies upper space with high visibility, PURE QUESTION TEXT ONLY) */}
                  <div className="px-4 py-2.5 sm:py-3 rounded-2xl bg-white/95 border-2 border-[#D97706]/70 shadow-[0_3px_10px_rgba(217,119,6,0.15)] flex-shrink-0 flex items-center justify-center text-center">
                    <p className="text-base sm:text-lg lg:text-xl font-black font-pencil text-[#2D241E] leading-snug">
                      {cleanText}
                    </p>
                  </div>

                {/* Question Variations Body (No scrollbar, perfectly balanced, fills remaining space) */}
                <div className="flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden py-0.5 w-full">
                  {/* 1. Multiple Choice / True-False */}
                  {(questions[currentQIndex].type === 'MULTIPLE_CHOICE' || questions[currentQIndex].type === 'TRUE_FALSE') && (() => {
                    const opts = questions[currentQIndex].options || [];
                    const isTrueFalse = questions[currentQIndex].type === 'TRUE_FALSE' || opts.length === 2;
                    const visual = questions[currentQIndex].visual;
                    const hasVisual = Boolean(visual);
                    const isWideVisual = hasVisual && (visual.type === 'relation_table' || visual.type === 'ordered_pairs');

                    // Case 1: True/False (2 options) -> Centered vertical layout with prominent Benar/Salah buttons
                    if (isTrueFalse) {
                      return (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 max-w-2xl mx-auto py-1">
                          {hasVisual && (
                            <div className="w-full max-w-lg flex items-center justify-center flex-shrink-0">
                              <MathVisualizer visual={visual} compact={false} />
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto flex-shrink-0">
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              const isBenar = opt.toLowerCase() === 'benar';
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`py-2.5 sm:py-3 px-5 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                                    isSelected
                                      ? isBenar
                                        ? 'bg-[#10B981] text-white border-2 border-[#059669] ring-2 ring-emerald-400 scale-102 shadow-lg'
                                        : 'bg-[#EF4444] text-white border-2 border-[#DC2626] ring-2 ring-rose-400 scale-102 shadow-lg'
                                      : isBenar
                                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                                      : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-2 border-rose-300'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <Check className="w-5 h-5 flex-shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Case 2: Wide Visual (Table / Ordered Pairs) -> Vertical stack with 2x2 grid options below
                    if (hasVisual && isWideVisual) {
                      return (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto py-1">
                          <div className="w-full max-w-lg flex items-center justify-center flex-shrink-0">
                            <MathVisualizer visual={visual} compact={true} />
                          </div>
                          <div className="grid grid-cols-2 gap-2 w-full max-w-2xl mx-auto flex-shrink-0">
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`p-2 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#FDE68A]/90 backdrop-blur-md text-[#2D241E] border-2 border-[#D97706] ring-1 ring-[#F59E0B]/50 shadow-md font-black'
                                      : 'glass-btn text-[#2D241E]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-[13px] lg:text-sm font-pencil leading-snug break-words">{opt}</span>
                                    {isSelected && <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 ml-1" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Case 3: Tall / Square Visual (Arrow Diagram, Function Machine, Cartesian Graph) -> Side-by-side
                    if (hasVisual) {
                      const isShortOpts = opts.every(opt => opt.length <= 22);
                      return (
                        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 lg:gap-5 py-1">
                          <div className="flex-1 w-full min-w-0 max-w-[420px] flex items-center justify-center">
                            <MathVisualizer visual={visual} compact={true} />
                          </div>
                          <div className={`flex-shrink-0 ${
                            isShortOpts
                              ? 'w-full md:w-auto md:min-w-[260px] md:max-w-[360px] grid grid-cols-2 gap-1.5'
                              : 'w-full md:w-[44%] lg:w-[42%] md:min-w-[260px] md:max-w-[420px] flex flex-col gap-1.5'
                          }`}>
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`p-1.5 sm:p-2 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#FDE68A]/90 backdrop-blur-md text-[#2D241E] border-2 border-[#D97706] ring-1 ring-[#F59E0B]/50 shadow-md font-black'
                                      : 'glass-btn text-[#2D241E]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-[13px] lg:text-sm font-pencil leading-snug break-words">{opt}</span>
                                    {isSelected && <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 ml-1" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Case 4: No Visual -> Centered 2x2 grid
                    return (
                      <div className="w-full h-full flex flex-col items-center justify-center max-w-2xl mx-auto py-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                          {opts.map((opt, optIdx) => {
                            const isSelected = answers[currentQIndex] === opt;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(opt)}
                                className={`p-2.5 sm:p-3 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FDE68A]/90 backdrop-blur-md text-[#2D241E] border-2 border-[#D97706] ring-1 ring-[#F59E0B]/50 shadow-md font-black'
                                    : 'glass-btn text-[#2D241E]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm sm:text-base font-pencil leading-snug break-words">{opt}</span>
                                  {isSelected && <Check className="w-4 h-4 text-[#D97706] flex-shrink-0 ml-1" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 2. Connecting Arrows Diagram */}
                  {questions[currentQIndex].type === 'ARROWS' && (
                    <div className="w-full max-w-xl flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl glass-panel-subtle">
                      <RelationDiagramCanvas
                        setA={questions[currentQIndex].setA}
                        setB={questions[currentQIndex].setB}
                        connections={(answers[currentQIndex] || []).map(p => {
                          const [aStr, bStr] = p.split('->');
                          const idxA = questions[currentQIndex].setA.findIndex(v => String(v) === String(aStr));
                          const idxB = questions[currentQIndex].setB.findIndex(v => String(v) === String(bStr));
                          return [idxA, idxB];
                        }).filter(([a, b]) => a !== -1 && b !== -1)}
                        selectedA={selectedA}
                        onSelectA={(idxA) => setSelectedA(idxA)}
                        onSelectB={(idxB, draggedFromA) => {
                          const fromA = draggedFromA !== undefined && draggedFromA !== null ? draggedFromA : selectedA;
                          if (fromA !== null && fromA !== undefined) {
                            const setAItem = questions[currentQIndex].setA[fromA];
                            const setBItem = questions[currentQIndex].setB[idxB];
                            const pStr = `${setAItem}->${setBItem}`;
                            handleToggleArrowPair(pStr);
                            setSelectedA(null);
                          }
                        }}
                        onDisconnectPair={(idxA, idxB) => {
                          const setAItem = questions[currentQIndex].setA[idxA];
                          const setBItem = questions[currentQIndex].setB[idxB];
                          const pStr = `${setAItem}->${setBItem}`;
                          handleToggleArrowPair(pStr);
                        }}
                        compact={false}
                      />
                      <div className="text-xs sm:text-sm font-black text-[#78350F] text-center font-pencil px-3 py-1 rounded-lg bg-amber-50/80 border border-amber-200 shadow-xs">
                        {selectedA !== null 
                          ? 'Pin Himpunan A terpilih! Klik pin di Himpunan B untuk menyambung panah.'
                          : '💡 Hubungkan: Klik pin A lalu klik pin B (atau tarik benang). Putus: Klik pin B terpasang atau klik tali merah.'}
                      </div>
                    </div>
                  )}

                  {/* 3. Matching Pairs */}
                  {questions[currentQIndex].type === 'MATCHING' && (
                    <div className="p-1.5 sm:p-2 rounded-xl glass-panel-subtle space-y-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {questions[currentQIndex].pairs.map((pairItem) => {
                          const userChoice = (answers[currentQIndex] || {})[pairItem.x];
                          const optionsList = Array.from(new Set(questions[currentQIndex].pairs.map(p => p.result)));
                          return (
                            <div key={String(pairItem.x)} className="p-1.5 sm:p-2 rounded-xl glass-btn space-y-1">
                              <span className="font-black text-xs sm:text-sm text-[#2563EB] block break-words">
                                {typeof pairItem.x === 'number' ? `Input x = ${pairItem.x}` : pairItem.x}
                              </span>
                              <div className="flex flex-col space-y-1">
                                {optionsList.map((resOpt) => {
                                  const isSel = userChoice === resOpt;
                                  const labelText = typeof pairItem.x === 'number' ? `f(${pairItem.x}) = ${resOpt}` : String(resOpt);
                                  return (
                                    <button
                                      key={String(resOpt)}
                                      onClick={() => {
                                        audioEngine.playClick();
                                        setAnswers(prev => {
                                          const currentMap = prev[currentQIndex] || {};
                                          return {
                                            ...prev,
                                            [currentQIndex]: { ...currentMap, [pairItem.x]: resOpt }
                                          };
                                        });
                                      }}
                                      className={`px-2.5 py-1 rounded-lg border text-xs sm:text-[13px] font-bold transition cursor-pointer text-left ${
                                        isSel
                                          ? 'bg-[#FDE68A] border-[#D97706] text-[#78350F] ring-1 ring-[#F59E0B] font-black'
                                          : 'glass-btn text-[#2D241E]'
                                      }`}
                                    >
                                      {labelText}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 4. Interactive Cartesian Coordinate Plotting */}
                  {questions[currentQIndex].type === 'CARTESIAN' && (() => {
                    const q = questions[currentQIndex];
                    const userPts = answers[currentQIndex] || [];
                    return (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 py-1 max-w-xl mx-auto">
                        <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                          <RelationCartesianCanvas
                            minX={q.minX ?? 0}
                            maxX={q.maxX ?? 4}
                            minY={q.minY ?? 0}
                            maxY={q.maxY ?? 5}
                            userPoints={userPts}
                            onPointToggle={handleToggleCartesianPoint}
                            drawLine={Boolean(q.drawLine)}
                            className="max-h-[220px] sm:max-h-[250px]"
                          />
                        </div>
                        <div className="flex items-center justify-between w-full px-2 text-[11px] sm:text-xs font-black text-[#78350F] flex-shrink-0">
                          <span>
                            Titik terpasang: <b className="text-blue-700">{userPts.length}</b> {q.targetPoints ? `(Target: ${q.targetPoints.length} titik)` : ''}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-800 hidden sm:inline">{q.hint || 'Klik persilangan koordinat untuk pasang/lepas titik.'}</span>
                            {userPts.length > 0 && (
                              <button
                                onClick={handleResetCartesianPoints}
                                className="px-2 py-0.5 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 font-bold transition text-[11px] cursor-pointer"
                              >
                                Reset Titik
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Prev / Selesaikan / Next Navigation Bar */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/40 flex-shrink-0">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex - 1); }}
                    className="px-4 py-1.5 sm:py-2 glass-btn text-[#2D241E] font-black text-xs sm:text-sm lg:text-base disabled:opacity-40 rounded-xl cursor-pointer"
                  >
                    Sebelumnya
                  </button>

                  <button
                    onClick={() => { audioEngine.playClick(); handleSubmitExam(); }}
                    className="pencil-btn px-5 py-1.5 sm:py-2 bg-[#059669] hover:bg-[#047857] text-[#FEF3C7] font-black text-xs sm:text-sm lg:text-base shadow-[2px_3px_0px_#2D241E] rounded-xl cursor-pointer transition hover:scale-105 active:scale-95"
                  >
                    SELESAIKAN QUEST 🏁
                  </button>

                  <button
                    disabled={currentQIndex >= 29}
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex + 1); }}
                    className="px-4 py-1.5 sm:py-2 glass-btn text-[#1E40AF] font-black text-xs sm:text-sm lg:text-base disabled:opacity-40 rounded-xl cursor-pointer"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            );
          })()}

          </div>

        </div>
      )}

      {/* FINAL EXAM RESULT SUMMARY (SCALE 100) */}
      {examSubmitted && (
        <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
          <InstructorMascotGuide
            layout="dock"
            character="snowy"
            pose={score100 >= 70 ? 'celebrating' : 'thinking'}
            emotion={score100 >= 70 ? 'happy' : 'thinking'}
            title="INSTRUKTUR SNOWY"
            icon="❄️"
            message={score100 >= 70 ? "Luar biasa! Misi Ujian Quest Mode berhasil kamu selesaikan dengan gemilang! 🎉" : "Kerja bagus! Terus asah kemampuanmu untuk meraih skor 100! 💪"}
          />

          <div className="flex-1 min-h-0 h-full p-5 sm:p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center">
            
            <div className="space-y-1">
              <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#D97706] uppercase">HASIL MISI QUEST MODE</span>
              <h2 className="text-3xl sm:text-4xl font-black font-pencil text-[#2D241E]">
                NILAI SKALA 100: {score100} / 100
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#78350F]">
                Chapter {subbabId}: {subData.title}
              </p>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 font-bold text-sm max-w-sm mx-auto w-full">
              <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-[#065F46] shadow-sm">
                <span className="block text-xs uppercase font-black text-[#059669]">JUMLAH BENAR</span>
                <span className="text-2xl sm:text-3xl font-black font-pencil">{correctCount} SOAL</span>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-400 text-[#BE123C] shadow-sm">
                <span className="block text-xs uppercase font-black text-[#BE123C]">JUMLAH SALAH</span>
                <span className="text-2xl sm:text-3xl font-black font-pencil">{wrongCount} SOAL</span>
              </div>
            </div>

            <div className="pt-2 max-w-sm mx-auto w-full">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  try { reloVoiceService.stopVoice(); } catch {}
                  onBackToQuestSelect();
                }}
                className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-xl sm:text-2xl flex items-center justify-center space-x-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <ShieldCheck className="w-6 h-6 text-[#D97706]" />
                <span>KEMBALI KE QUEST SELECT</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL ON EXIT ("YAKIN KELUAR?") */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in font-hand">
          <div className="w-full max-w-md p-6 sm:p-7 rounded-3xl bg-[#FFFDF9] border-3 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-center space-y-4 animate-scale-up select-none">
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFE4E6] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black font-pencil text-[#2D241E]">
                YAKIN INGIN KELUAR UJIAN?
              </h3>
              <p className="text-sm sm:text-base text-[#78350F] font-bold leading-relaxed">
                Semua jawaban dan progres waktu 30 menit akan terulang dari awal jika kamu keluar sekarang!
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                }}
                className="pencil-btn flex-1 py-3 bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#065F46] font-black text-base sm:text-lg rounded-2xl shadow-[2px_3px_0px_#2D241E] cursor-pointer transition hover:scale-102 active:scale-98"
              >
                TIDAK, LANJUT
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  try { reloVoiceService.stopVoice(); } catch {}
                  setShowExitConfirm(false);
                  onBackToQuestSelect();
                }}
                className="pencil-btn flex-1 py-3 bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#BE123C] font-black text-base sm:text-lg rounded-2xl shadow-[2px_3px_0px_#2D241E] cursor-pointer transition hover:scale-102 active:scale-98"
              >
                YA, KELUAR
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
