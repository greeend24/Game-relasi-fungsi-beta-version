import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Play, Check, Zap } from 'lucide-react';
import { CHAPTERS_DATA } from '../../data/chapterLearningData';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { reloVoiceService } from '../../services/reloVoiceService';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import NetworkStatusBadge from '../NetworkStatusBadge';
import confetti from 'canvas-confetti';

import { generateSubbabQuestions } from '../../services/questQuestionsService';

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

  // 30-Minute Timer Countdown & Auto-Finish on Expiry
  useEffect(() => {
    if (!hasStarted || examSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
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
    };
  }, []);

  const handleStartExam = () => {
    audioEngine.playClick();
    reloVoiceService.stopVoice();
    setHasStarted(true);
  };

  const handleSelectOption = (opt) => {
    if (examSubmitted) return;
    audioEngine.playClick();
    setAnswers({ ...answers, [currentQIndex]: opt });
  };

  const handleToggleArrowPair = (pairStr) => {
    if (examSubmitted) return;
    audioEngine.playClick();
    const currentPairs = answers[currentQIndex] || [];
    const newPairs = currentPairs.includes(pairStr)
      ? currentPairs.filter(p => p !== pairStr)
      : [...currentPairs, pairStr];
    setAnswers({ ...answers, [currentQIndex]: newPairs });
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    if (audioEngine.battleAudioEl) {
      audioEngine.battleAudioEl.pause();
      audioEngine.battleAudioEl.currentTime = 0;
    }
    audioEngine.isQuestBattleActive = false;
    audioEngine.stopBgm();
    audioEngine.playVictoryMusic(); 
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

    // Calculate score using exact point distribution:
    // C3 (Q1-10) = 50 pts, C4 (Q11-20) = 80 pts, C5 (Q21-30) = 120 pts + 1 pt per remaining second!
    let totalQuestPoints = 0;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      let isCorrect = false;
      if (q.type === 'ARROWS') {
        const userPairs = userAns || [];
        isCorrect = q.correctPairs.length === userPairs.length && q.correctPairs.every(p => userPairs.includes(p));
      } else if (q.type === 'MATCHING') {
        const userPairs = userAns || {};
        isCorrect = q.pairs.every(p => userPairs[p.x] === p.result);
      } else {
        isCorrect = userAns === q.correct;
      }
      if (isCorrect) {
        correctCount++;
        totalQuestPoints += q.pts;
      }
    });

    const totalQCount = questions.length || 30;
    const score100 = Math.round((correctCount / totalQCount) * 100);
    const speedBonus = timeRemaining;
    const finalCalculatedScore = totalQuestPoints + speedBonus;

    // Record quest exam result (saves 0-100 score, correct count, time, and points)
    storageService.recordQuestExamResult(subbabId, {
      score: score100,
      correctCount,
      totalQuestions: totalQCount,
      pointsEarned: finalCalculatedScore,
      timeRemainingSeconds: speedBonus,
    });
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
      <div className="flex items-center justify-between p-3 rounded-2xl sm:rounded-3xl glass-panel-subtle flex-shrink-0">
        <button
          onClick={() => {
            audioEngine.playClick();
            if (hasStarted && !examSubmitted) {
              setShowExitConfirm(true); 
            } else {
              onBackToQuestSelect();
            }
          }}
          className="pencil-btn px-4 py-2 glass-btn text-[#2D241E] font-black text-sm sm:text-base lg:text-[20px] flex items-center space-x-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-[#E11D48]" />
          <span>Kembali ke Quest Select</span>
        </button>

        <h2 className="text-base sm:text-lg lg:text-[20px] font-black font-pencil text-[#2D241E]">
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
          
          {/* Left Snowy Dock */}
          <InstructorMascotGuide
            layout="dock"
            character="snowy"
            pose="thinking"
            title="INSTRUKTUR SNOWY"
            icon="❄️"
            message=""
          />

          {/* Right Exam Workspace */}
          <div className="flex-1 min-h-0 h-full flex flex-col justify-between overflow-hidden space-y-2">
            
            {/* Timer & Answered Progress Bar */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex items-center justify-between font-black text-sm sm:text-base lg:text-[20px] text-[#78350F] flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#D97706] animate-pulse" />
                <span>WAKTU TERSISA: {formatTimer(timeRemaining)}</span>
              </div>
              <div className="flex items-center gap-3">
                <NetworkStatusBadge compact={true} />
                <span>TERJAWAB: {Object.keys(answers).length} / 30</span>
              </div>
            </div>

            {/* Question Navigator Grid (#1 to #30) */}
            <div className="p-2 rounded-2xl glass-panel-subtle space-y-1 flex-shrink-0">
              <div className="grid grid-cols-10 gap-1 font-black text-xs sm:text-sm">
                {questions.map((q, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isAnsweredQ = answers[idx] !== undefined;

                  return (
                    <button
                      key={idx}
                      onClick={() => { audioEngine.playClick(); setCurrentQIndex(idx); }}
                      className={`py-1 rounded-lg border transition cursor-pointer ${
                        isCurrent
                          ? 'bg-[#2563EB] text-[#FEF3C7] border-white/80 ring-2 ring-[#2563EB]/40 font-black scale-105 shadow-md'
                          : isAnsweredQ
                          ? 'bg-emerald-500/30 text-emerald-950 border-emerald-400/60 font-black'
                          : 'glass-btn text-[#2D241E] border-white/40'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question Card */}
            {questions[currentQIndex] && (
              <div className="flex-1 min-h-0 p-3.5 sm:p-4 rounded-3xl glass-panel glass-sheen flex flex-col justify-between overflow-hidden space-y-2">
                
                {/* Question Header & Title */}
                <div className="p-2.5 sm:p-3 rounded-2xl glass-panel-subtle space-y-1 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs sm:text-sm lg:text-base font-black text-[#D97706]">
                    <span>SOAL NO #{currentQIndex + 1} / 30</span>
                    <span className="uppercase px-2 py-0.5 rounded-lg bg-[#FEF3C7]/90 border border-amber-300 text-xs sm:text-sm font-black">
                      TIPE: {questions[currentQIndex].type}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg lg:text-[20px] font-black font-pencil text-[#2D241E] leading-snug">
                    {questions[currentQIndex].question}
                  </p>
                </div>

                {/* Question Variations Body */}
                <div className="flex-1 min-h-0 flex flex-col justify-center overflow-y-auto py-1 drag-scroller">
                  {/* 1. Multiple Choice / True-False */}
                  {(questions[currentQIndex].type === 'MULTIPLE_CHOICE' || questions[currentQIndex].type === 'TRUE_FALSE') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {questions[currentQIndex].options.map((opt, optIdx) => {
                        const isSelected = answers[currentQIndex] === opt;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(opt)}
                            className={`p-3 sm:p-3.5 rounded-2xl text-left font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FDE68A]/90 backdrop-blur-md text-[#2D241E] border-2 border-[#D97706] ring-2 ring-[#F59E0B]/50 scale-[1.01] shadow-lg font-black'
                                : 'glass-btn text-[#2D241E]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-base sm:text-lg lg:text-[20px] font-pencil leading-snug">{opt}</span>
                              {isSelected && <Check className="w-5 h-5 text-[#D97706] flex-shrink-0 ml-1" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 2. Connecting Arrows Diagram */}
                  {questions[currentQIndex].type === 'ARROWS' && (
                    <div className="p-2.5 rounded-2xl glass-panel-subtle space-y-1">
                      <RelationDiagramCanvas
                        setA={questions[currentQIndex].setA}
                        setB={questions[currentQIndex].setB}
                        connections={(answers[currentQIndex] || []).map(p => {
                          const [aStr, bStr] = p.split('->');
                          return [questions[currentQIndex].setA.indexOf(Number(aStr)), questions[currentQIndex].setB.indexOf(Number(bStr))];
                        })}
                        compact={true}
                        onSelectA={(idxA) => {
                          const setAItem = questions[currentQIndex].setA[idxA];
                          const setBItem = questions[currentQIndex].setB[0];
                          const pStr = `${setAItem}->${setBItem}`;
                          handleToggleArrowPair(pStr);
                        }}
                      />
                      <div className="text-xs sm:text-sm lg:text-base font-black text-[#78350F] text-center">
                        Klik item di Himpunan A untuk menyambungkan panah!
                      </div>
                    </div>
                  )}

                  {/* 3. Matching Pairs */}
                  {questions[currentQIndex].type === 'MATCHING' && (
                    <div className="p-2.5 rounded-2xl glass-panel-subtle space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {questions[currentQIndex].pairs.map((pairItem) => {
                          const userChoice = (answers[currentQIndex] || {})[pairItem.x];
                          return (
                            <div key={pairItem.x} className="p-2.5 rounded-xl glass-btn space-y-1.5">
                              <span className="font-black text-sm sm:text-base text-[#2563EB] block">Input x = {pairItem.x}</span>
                              <div className="flex flex-col space-y-1.5">
                                {[pairItem.result, pairItem.result + 2, pairItem.result - 1].sort().map((resOpt) => {
                                  const isSel = userChoice === resOpt;
                                  return (
                                    <button
                                      key={resOpt}
                                      onClick={() => {
                                        audioEngine.playClick();
                                        const currentMap = answers[currentQIndex] || {};
                                        setAnswers({
                                          ...answers,
                                          [currentQIndex]: { ...currentMap, [pairItem.x]: resOpt }
                                        });
                                      }}
                                      className={`px-3 py-1.5 rounded-xl border text-sm sm:text-base font-bold transition cursor-pointer ${
                                        isSel
                                          ? 'bg-[#FDE68A] border-[#D97706] text-[#78350F] ring-2 ring-[#F59E0B] font-black'
                                          : 'glass-btn text-[#2D241E]'
                                      }`}
                                    >
                                      f({pairItem.x}) = {resOpt}
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
                </div>

                {/* Prev / Selesaikan / Next Navigation Bar */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/40 flex-shrink-0">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex - 1); }}
                    className="px-5 py-2.5 glass-btn text-[#2D241E] font-black text-base lg:text-[18px] disabled:opacity-40 rounded-xl cursor-pointer"
                  >
                    Sebelumnya
                  </button>

                  <button
                    onClick={() => { audioEngine.playClick(); handleSubmitExam(); }}
                    className="pencil-btn px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-[#FEF3C7] font-black text-lg lg:text-[20px] shadow-[2px_3px_0px_#2D241E] rounded-xl cursor-pointer transition hover:scale-105 active:scale-95"
                  >
                    SELESAIKAN QUEST 🏁
                  </button>

                  <button
                    disabled={currentQIndex >= 29}
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex + 1); }}
                    className="px-5 py-2.5 glass-btn text-[#1E40AF] font-black text-base lg:text-[18px] disabled:opacity-40 rounded-xl cursor-pointer"
                  >
                    Selanjutnya →
                  </button>
                </div>

              </div>
            )}

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
              <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#D97706] uppercase">HASIL EVALUASI QUEST MODE</span>
              <h2 className="text-3xl sm:text-4xl font-black font-pencil text-[#2D241E]">
                NILAI SKALA 100: {score100} / 100
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#4A3E3D]">
                Chapter {subbabId}: {subData.title}
              </p>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 font-bold text-sm max-w-sm mx-auto w-full">
              <div className="p-3 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/60 text-[#065F46] shadow-sm">
                <span className="block text-xs uppercase font-black text-[#059669]">JUMLAH BENAR</span>
                <span className="text-2xl sm:text-3xl font-black font-pencil">{correctCount} SOAL</span>
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/20 backdrop-blur-md border border-rose-400/60 text-[#BE123C] shadow-sm">
                <span className="block text-xs uppercase font-black text-[#BE123C]">JUMLAH SALAH</span>
                <span className="text-2xl sm:text-3xl font-black font-pencil">{wrongCount} SOAL</span>
              </div>
            </div>

            <div className="pt-2 max-w-sm mx-auto w-full">
              <button
                onClick={() => {
                  audioEngine.playClick();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-hand">
          <div className="w-full max-w-md p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4">
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFE4E6] border-2 border-[#2D241E] flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black font-pencil text-[#2D241E]">
                YAKIN INGIN KELUAR UJIAN?
              </h3>
              <p className="text-base sm:text-lg text-[#4A3E3D] font-bold leading-relaxed">
                Semua jawaban dan progres waktu 30 menit akan terulang dari awal jika kamu keluar sekarang!
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                }}
                className="pencil-btn flex-1 py-3 bg-[#D1FAE5] text-[#065F46] font-black text-base sm:text-lg rounded-2xl"
              >
                TIDAK, LANJUT
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                  onBackToQuestSelect();
                }}
                className="pencil-btn flex-1 py-3 bg-[#FFE4E6] text-[#BE123C] font-black text-base sm:text-lg rounded-2xl"
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
