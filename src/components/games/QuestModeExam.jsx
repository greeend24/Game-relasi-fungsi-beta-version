import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, Play, Award, HelpCircle, Check, X, Zap } from 'lucide-react';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { reloVoiceService } from '../../services/reloVoiceService';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import confetti from 'canvas-confetti';

/**
 * QuestModeExam
 * Timed 30-minute exam challenge with 30 distinct questions & multiple interactive question types:
 * - Scoring: C3 = 50 pts, C4 = 80 pts, C5 = 120 pts + 1 pt per remaining second!
 */
export default function QuestModeExam({ subbabId = 1, onBackToQuestSelect, currentUser }) {
  const subData = SUBBABS_DATA[subbabId] || SUBBABS_DATA[1];

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

  // Generate 30 varied, non-repetitive questions for this subbab
  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => {
      const qNum = i + 1;
      const formatType = i % 4; // 0: Multiple Choice, 1: Connecting Arrows, 2: Matching Pairs, 3: True/False
      const level = i < 10 ? 'C3' : i < 20 ? 'C4' : 'C5';
      const pts = i < 10 ? 50 : i < 20 ? 80 : 120;

      if (formatType === 1) {
        // Connecting Arrows Question
        const setA = [(i % 3) + 1, (i % 3) + 2, (i % 3) + 3];
        const setB = [(i % 3) + 2, (i % 3) + 3, (i % 3) + 4];
        return {
          id: qNum,
          level,
          pts,
          type: 'ARROWS',
          question: `[Soal ${qNum} - ${level}] Hubungkan panah dari Himpunan A ke Himpunan B dengan aturan "Kurang Dari" (<)!`,
          setA,
          setB,
          rule: 'less_than',
          correctPairs: setA.flatMap(a => setB.filter(b => a < b).map(b => `${a}->${b}`))
        };
      }

      if (formatType === 2) {
        // Matching Pairs Question
        const aVal = (i % 4) + 2;
        const bVal = (i % 3) + 1;
        return {
          id: qNum,
          level,
          pts,
          type: 'MATCHING',
          question: `[Soal ${qNum} - ${level}] Jodohkan nilai x dengan hasil rumus fungsi f(x) = ${aVal}x + ${bVal}!`,
          pairs: [
            { x: 1, result: aVal * 1 + bVal },
            { x: 2, result: aVal * 2 + bVal },
            { x: 3, result: aVal * 3 + bVal }
          ]
        };
      }

      if (formatType === 3) {
        // True/False Verification Question
        const isTrue = i % 2 === 0;
        return {
          id: qNum,
          level,
          pts,
          type: 'TRUE_FALSE',
          question: `[Soal ${qNum} - ${level}] ${
            isTrue
              ? `Relasi f = {(1,2), (2,3), (3,4)} adalah fungsi bijeksi karena tiap anggota domain berpasangan tepat satu dengan kodomain.`
              : `Domain dari himpunan pasangan berurutan {(2,4), (3,6), (4,8)} adalah {4, 6, 8}.`
          }`,
          options: ['Benar', 'Salah'],
          correct: isTrue ? 'Benar' : 'Salah'
        };
      }

      // Default Multiple Choice
      const xInput = (i % 5) + 1;
      const ans = 2 * xInput + 3;
      return {
        id: qNum,
        level,
        pts,
        type: 'MULTIPLE_CHOICE',
        question: `[Soal ${qNum} - ${level}] Diketahui fungsi f(x) = 2x + 3. Nilai dari f(${xInput}) adalah...`,
        options: [
          `f(${xInput}) = ${ans}`,
          `f(${xInput}) = ${ans + 2}`,
          `f(${xInput}) = ${ans - 1}`,
          `f(${xInput}) = ${ans + 4}`
        ],
        correct: `f(${xInput}) = ${ans}`
      };
    });

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
        totalQuestPoints += q.pts;
      }
    });

    const speedBonus = timeRemaining;
    const finalCalculatedScore = totalQuestPoints + speedBonus;

    const currentScore = currentUser?.totalScore || 0;
    storageService.updateUserScore(currentUser?.username, Math.max(currentScore, finalCalculatedScore));
    storageService.updateProgress(`subbab${subbabId}`, 21, Math.min(100, Math.round((totalQuestPoints / 2500) * 100)), 3);
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

  const totalQuestScore = basePointsEarned + timeRemaining;

  return (
    <div className="max-w-4xl mx-auto my-4 p-4 font-hand space-y-6 animate-fade-in relative z-10">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E]">
        <button
          onClick={() => {
            audioEngine.playClick();
            if (hasStarted && !examSubmitted) {
              setShowExitConfirm(true); 
            } else {
              onBackToQuestSelect();
            }
          }}
          className="pencil-btn px-4 py-2 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-xs flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4 text-[#E11D48] animate-pulse" />
          <span>Kembali ke Quest Select</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E]">
          QUEST SUBBAB {subbabId}: {subData.title}
        </h2>
      </div>

      {/* BEFORE START SCREEN */}
      {!hasStarted && !examSubmitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-center space-y-6">
          <div className="flex justify-center">
            <ProfessorOwlMascot
              pose="exploring"
              message={reloText || "Selamat datang di Quest Mode! Kecepatan dan ketepatanmu menentukan skor!"}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D97706] uppercase">PETUNJUK & SISTEM PENILAIAN QUEST MODE</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-pencil text-[#2D241E]">{subData.title}</h3>
          </div>

          {/* DETAILED QUEST MODE INSTRUCTION & SCORING RULES */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] text-left space-y-3 text-xs sm:text-sm font-bold text-[#2D241E] shadow-[2px_3px_0px_#2D241E]">
            <div className="flex items-center space-x-2 text-[#D97706] font-extrabold text-base border-b pb-2">
              <Clock className="w-5 h-5" />
              <span>INFORMASI & BOBOT SKOR QUEST MODE:</span>
            </div>
            
            <ul className="space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 font-extrabold">•</span>
                <span><b>Waktu Ujian:</b> 30 Menit (1800 detik) hitung mundur untuk menyelesaikan 30 soal tantangan.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-extrabold">•</span>
                <span><b>Soal 1 – 10 (Tingkat C3):</b> Bernilai <b>50 Poin</b> per soal tepat.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-extrabold">•</span>
                <span><b>Soal 11 – 20 (Tingkat C4):</b> Bernilai <b>80 Poin</b> per soal tepat.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-extrabold">•</span>
                <span><b>Soal 21 – 30 (Tingkat C5):</b> Bernilai <b>120 Poin</b> per soal tepat.</span>
              </li>
              <li className="flex items-start space-x-2 bg-[#FEF3C7] p-2 rounded-xl border border-[#D97706]">
                <Zap className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <span><b>Bonus Kecepatan:</b> Setiap 1 detik tersisa saat menekan <i>"Selesaikan Quest"</i> menambahkan <b>+1 Poin Bonus</b> per detiknya!</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="pencil-btn w-full py-4 bg-[#FDE68A] text-[#78350F] font-extrabold text-lg flex items-center justify-center space-x-2 shadow-[4px_4px_0px_#2D241E] hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-[#D97706] text-[#D97706] animate-pulse" />
            <span>START UJIAN QUEST MODE (30 MENIT)</span>
          </button>
        </div>
      )}

      {/* DURING EXAM SCREEN */}
      {hasStarted && !examSubmitted && (
        <div className="space-y-6">
          
          {/* Timer & Navigation Bar */}
          <div className="p-4 rounded-3xl bg-[#FEF3C7] border-2.5 border-[#2D241E] shadow-[4px_4px_0px_#2D241E] flex items-center justify-between font-bold text-sm text-[#78350F]">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#D97706] animate-pulse" />
              <span>HITUNG MUNDUR WAKTU: {formatTimer(timeRemaining)}</span>
            </div>
            <div className="text-xs">
              <span>TERJAWAB: {Object.keys(answers).length} / 30</span>
            </div>
          </div>

          {/* QUESTION NAVIGATOR GRID (#1 to #30) - Freely jump between questions */}
          <div className="p-4 rounded-3xl bg-white border-2.5 border-[#2D241E] shadow-[4px_4px_0px_#2D241E] space-y-2">
            <span className="text-xs font-bold text-[#78350F] block">NAVIGASI SOAL 1 – 30 (KLIK NOMOR UNTUK PINDAH):</span>
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 font-bold text-xs">
              {questions.map((q, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAnsweredQ = answers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(idx); }}
                    className={`py-2 rounded-xl border-1.5 transition ${
                      isCurrent
                        ? 'bg-[#2563EB] text-[#FEF3C7] border-[#2D241E] ring-4 ring-[#2563EB]/40 font-extrabold scale-105'
                        : isAnsweredQ
                        ? 'bg-[#D1FAE5] text-[#065F46] border-[#2D241E] font-bold'
                        : 'bg-[#F3F4F6] text-[#2D241E] border-[#A8A29E]'
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
            <div className="p-6 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] space-y-5">
              
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#D97706]">
                  <span>SOAL NO #{currentQIndex + 1} / 30</span>
                  <span className="uppercase px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#2D241E]">
                    TIPE: {questions[currentQIndex].type}
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold font-pencil text-[#2D241E] leading-relaxed">
                  {questions[currentQIndex].question}
                </p>
              </div>

              {/* RENDER QUESTION VARIATIONS */}

              {/* 1. Multiple Choice / True-False */}
              {(questions[currentQIndex].type === 'MULTIPLE_CHOICE' || questions[currentQIndex].type === 'TRUE_FALSE') && (
                <div className="grid grid-cols-1 gap-3">
                  {questions[currentQIndex].options.map((opt, optIdx) => {
                    const isSelected = answers[currentQIndex] === opt;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(opt)}
                        className={`pencil-btn p-4 rounded-2xl text-left font-bold text-sm sm:text-base transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#FDE68A] text-[#2D241E] border-[#2D241E] ring-4 ring-[#F59E0B]/40 scale-[1.02] shadow-[3px_4px_0px_#2D241E]'
                            : 'bg-white border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {isSelected && <Check className="w-5 h-5 text-[#D97706] animate-bounce" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. Connecting Arrows Diagram */}
              {questions[currentQIndex].type === 'ARROWS' && (
                <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-3">
                  <RelationDiagramCanvas
                    setA={questions[currentQIndex].setA}
                    setB={questions[currentQIndex].setB}
                    connections={(answers[currentQIndex] || []).map(p => {
                      const [aStr, bStr] = p.split('->');
                      return [questions[currentQIndex].setA.indexOf(Number(aStr)), questions[currentQIndex].setB.indexOf(Number(bStr))];
                    })}
                    onSelectA={(idxA) => {
                      // Toggle arrow
                      const setAItem = questions[currentQIndex].setA[idxA];
                      const setBItem = questions[currentQIndex].setB[0];
                      const pStr = `${setAItem}->${setBItem}`;
                      handleToggleArrowPair(pStr);
                    }}
                  />
                  <div className="text-xs font-bold text-[#78350F] text-center">
                    Klik item di Himpunan A untuk menyambungkan panah!
                  </div>
                </div>
              )}

              {/* 3. Matching Pairs */}
              {questions[currentQIndex].type === 'MATCHING' && (
                <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {questions[currentQIndex].pairs.map((pairItem) => {
                      const userChoice = (answers[currentQIndex] || {})[pairItem.x];
                      return (
                        <div key={pairItem.x} className="p-3 rounded-xl bg-white border-2 border-[#2D241E] space-y-2">
                          <span className="font-bold text-xs text-[#2563EB] block">Input x = {pairItem.x}</span>
                          <div className="flex flex-col space-y-1">
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
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                                    isSel
                                      ? 'bg-[#FDE68A] border-[#2D241E] text-[#78350F] ring-2 ring-[#F59E0B]'
                                      : 'bg-white border-[#2D241E] text-[#2D241E]'
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

              {/* Prev / Next & Centered Selesaikan Quest Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#EFECE6]">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex - 1); }}
                  className="pencil-btn px-4 py-2.5 bg-[#F3F4F6] text-[#2D241E] font-bold text-xs disabled:opacity-40"
                >
                  ← Soal Sebelumnya
                </button>

                <button
                  onClick={() => { audioEngine.playClick(); handleSubmitExam(); }}
                  className="pencil-btn px-5 py-2.5 bg-[#059669] text-[#2D241E] font-extrabold text-xs shadow-[2px_3px_0px_#2D241E]"
                >
                  SELESAIKAN QUEST 🏁
                </button>

                {currentQIndex < 29 && (
                  <button
                    onClick={() => { audioEngine.playClick(); setCurrentQIndex(currentQIndex + 1); }}
                    className="pencil-btn px-5 py-2.5 bg-[#DBEAFE] text-[#1E40AF] font-extrabold text-xs"
                  >
                    Soal Selanjutnya →
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* FINAL EXAM RESULT SUMMARY (SCALE 100) */}
      {examSubmitted && (
        <div className="p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-center space-y-6 animate-fade-in">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FEF3C7] border-3 border-[#2D241E] flex items-center justify-center text-4xl shadow-[3px_3px_0px_#2D241E] animate-bounce">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D97706] uppercase">HASIL EVALUASI UJIAN QUEST MODE</span>
            <h2 className="text-3xl font-bold font-pencil text-[#2D241E]">
              NILAI SKALA 100: {score100} / 100
            </h2>
            <p className="text-xs font-bold text-[#4A3E3D]">
              Subbab {subbabId}: {subData.title}
            </p>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-4 font-bold text-sm">
            <div className="p-4 rounded-2xl bg-[#D1FAE5] border-2 border-[#2D241E] text-[#065F46]">
              <span className="block text-xs uppercase text-[#059669]">JUMLAH BENAR</span>
              <span className="text-3xl font-extrabold font-pencil">{correctCount} SOAL</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFE4E6] border-2 border-[#BE123C] text-[#BE123C]">
              <span className="block text-xs uppercase text-[#BE123C]">JUMLAH SALAH</span>
              <span className="text-3xl font-extrabold font-pencil">{wrongCount} SOAL</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              onBackToQuestSelect();
            }}
            className="pencil-btn w-full py-4 bg-[#FDE68A] text-[#78350F] font-extrabold text-base flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-5 h-5 text-[#D97706]" />
            <span>KEMBALI KE QUEST SELECT</span>
          </button>

        </div>
      )}

      {/* CONFIRMATION MODAL ON EXIT ("YAKIN KELUAR?") */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-center space-y-4 font-hand">
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFE4E6] border-2 border-[#2D241E] flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-pencil text-[#2D241E]">
                YAKIN INGIN KELUAR UJIAN?
              </h3>
              <p className="text-xs text-[#4A3E3D] font-bold leading-relaxed">
                Semua jawaban dan progres waktu 30 menit akan terulang dari awal jika kamu keluar sekarang!
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                }}
                className="pencil-btn flex-1 py-3 bg-[#D1FAE5] text-[#065F46] font-extrabold text-xs"
              >
                TIDAK, LANJUT UJIAN
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                  onBackToQuestSelect();
                }}
                className="pencil-btn flex-1 py-3 bg-[#FFE4E6] text-[#BE123C] font-extrabold text-xs"
              >
                YA, YAKIN KELUAR
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
