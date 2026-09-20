import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Flame, Trophy, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, CheckSquare, Square, TimerOff } from 'lucide-react';
import InstructorMascotGuide from '../InstructorMascotGuide';
import NetworkStatusBadge from '../NetworkStatusBadge';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { reloVoiceService } from '../../services/reloVoiceService';
import { ENDLESS_QUESTIONS } from '../../data/endlessQuestions';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import RelationCartesianCanvas from '../RelationCartesianCanvas';
import confetti from 'canvas-confetti';

const LEVEL_BADGE = { C3: '🟢 C3 Aplikasi', C4: '🟡 C4 Analisis', C5: '🔴 C5 Evaluasi' };
const LEVEL_COLOR = {
  C3: 'bg-emerald-100 text-emerald-800 border-emerald-400',
  C4: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  C5: 'bg-red-100 text-red-800 border-red-400',
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EndlessMode({ onBackToMenu, currentUser, onUpdateUser }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState(null); // 'timeout' | 'completed' | null
  const [timerSeconds, setTimerSeconds] = useState(30);

  // MCQ / TRUE_FALSE state
  const [selectedOpt, setSelectedOpt] = useState(null);

  // MCQ_COMPLEX state
  const [selectedMultiple, setSelectedMultiple] = useState([]);

  // MATCHING state
  const [matchingAnswers, setMatchingAnswers] = useState({});

  // ARROWS state
  const [arrowConnections, setArrowConnections] = useState([]);
  const [selectedA, setSelectedA] = useState(null);

  // CARTESIAN state
  const [userCartesianPoints, setUserCartesianPoints] = useState([]);

  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray(ENDLESS_QUESTIONS));
  const currentQ = shuffledQuestions[questionIndex] || null;
  const totalQuestions = shuffledQuestions.length;

  useEffect(() => {
    audioEngine.toggleBgm(true);
    return () => {
      audioEngine.toggleBgm(true);
      try { reloVoiceService.stopVoice(); } catch {}
    };
  }, []);

  // Reset state on new question
  useEffect(() => {
    setIsAnswered(false);
    setSelectedOpt(null);
    setSelectedMultiple([]);
    setMatchingAnswers({});
    setArrowConnections([]);
    setSelectedA(null);
    setUserCartesianPoints([]);
    setIsCorrect(false);
    
    // Give generous time for interactive visual plotting & matching questions
    const isInteractive = ['CARTESIAN', 'ARROWS', 'MATCHING'].includes(currentQ?.type);
    let baseTime = isInteractive ? 50 : 35;
    if (currentQ?.level === 'C5') baseTime += 10;
    const timeLimit = Math.max(isInteractive ? 35 : 20, baseTime - Math.floor(questionIndex / 10));
    setTimerSeconds(timeLimit);
  }, [questionIndex, currentQ]);

  const applyCorrect = useCallback(() => {
    audioEngine.playCorrect();
    setIsCorrect(true);
    confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
    const newStreak = streak + 1;
    setStreak(newStreak);
    const combo = Math.min(5, Math.max(1, newStreak));
    setMultiplier(combo);
    const basePts = currentQ?.level === 'C3' ? 5 : currentQ?.level === 'C4' ? 10 : 15;
    const ptsEarned = basePts * combo;
    setScore(prev => {
      const newScore = prev + ptsEarned;
      storageService.updateEndlessHighScore(newScore);
      return newScore;
    });
    try { reloVoiceService.playScene('endless_correct'); } catch {}
  }, [streak, currentQ]);

  const applyWrong = useCallback(() => {
    audioEngine.playError();
    setIsCorrect(false);
    setStreak(0);
    setMultiplier(1);
    try { reloVoiceService.playScene('endless_wrong'); } catch {}
  }, []);

  const handleTimeOut = useCallback(() => {
    if (isAnswered || !currentQ) return;
    
    // Auto-evaluate: if user already placed the correct answer on canvas/screen, reward them!
    if (currentQ.type === 'CARTESIAN') {
      const targets = currentQ.targetPoints || [];
      const isCartesianCorrect =
        targets.length > 0 &&
        targets.length === userCartesianPoints.length &&
        userCartesianPoints.every(([ux, uy]) =>
          targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
        );
      if (isCartesianCorrect) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'ARROWS') {
      const correctPairs = currentQ.correctPairs || [];
      const isArrowsCorrect =
        correctPairs.length > 0 &&
        correctPairs.length === arrowConnections.length &&
        correctPairs.every(p => arrowConnections.includes(p));
      if (isArrowsCorrect) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'MATCHING') {
      const isMatchingCorrect =
        currentQ.pairs &&
        currentQ.pairs.length > 0 &&
        currentQ.pairs.every(p => matchingAnswers[p.left] === p.right);
      if (isMatchingCorrect) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'MCQ_COMPLEX') {
      const isComplexCorrect =
        currentQ.correctMultiple &&
        currentQ.correctMultiple.length === selectedMultiple.length &&
        currentQ.correctMultiple.every(c => selectedMultiple.includes(c));
      if (isComplexCorrect) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    }

    setIsAnswered(true);
    applyWrong();
    setGameOverReason('timeout');
    setGameOver(true);
    try { reloVoiceService.playScene('endless_gameover'); } catch {}
  }, [currentQ, isAnswered, userCartesianPoints, arrowConnections, matchingAnswers, selectedMultiple, applyCorrect, applyWrong]);

  const handleTimeOutRef = useRef(handleTimeOut);
  handleTimeOutRef.current = handleTimeOut;

  // Timer countdown
  useEffect(() => {
    if (gameOver || isAnswered || !currentQ) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex, isAnswered, gameOver, currentQ]);

  // MCQ / TRUE_FALSE answer
  const handleSelectMCQ = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);
    if (opt === currentQ.correct) applyCorrect();
    else applyWrong();
  };

  // MCQ_COMPLEX toggle
  const handleToggleMultiple = (opt) => {
    if (isAnswered) return;
    setSelectedMultiple(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleConfirmMultiple = () => {
    if (isAnswered || selectedMultiple.length === 0) return;
    setIsAnswered(true);
    const correct = currentQ.correctMultiple;
    const allCorrect =
      correct.length === selectedMultiple.length &&
      correct.every(c => selectedMultiple.includes(c));
    if (allCorrect) applyCorrect();
    else applyWrong();
  };

  // MATCHING select
  const handleMatchingSelect = (leftItem, rightValue) => {
    if (isAnswered) return;
    setMatchingAnswers(prev => ({ ...prev, [leftItem]: rightValue }));
  };

  const handleConfirmMatching = () => {
    if (isAnswered) return;
    const allFilled = currentQ.pairs.every(p => matchingAnswers[p.left]);
    if (!allFilled) return;
    setIsAnswered(true);
    const allCorrect = currentQ.pairs.every(p => matchingAnswers[p.left] === p.right);
    if (allCorrect) applyCorrect();
    else applyWrong();
  };

  // ARROWS handlers
  const handleToggleArrowPair = (pairStr) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setArrowConnections(prev => {
      const next = prev.includes(pairStr) ? prev.filter(p => p !== pairStr) : [...prev, pairStr];
      const correctPairs = currentQ?.correctPairs || [];
      // Auto-validate if all required pairs are connected accurately!
      if (correctPairs.length > 0 && next.length === correctPairs.length) {
        const isAllMatch = correctPairs.every(p => next.includes(p));
        if (isAllMatch) {
          setTimeout(() => {
            setIsAnswered(true);
            applyCorrect();
          }, 250);
        }
      }
      return next;
    });
  };

  const handleConfirmArrows = () => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);
    const correctPairs = currentQ.correctPairs || [];
    const isAllCorrect =
      correctPairs.length === arrowConnections.length &&
      correctPairs.every(p => arrowConnections.includes(p));
    if (isAllCorrect) applyCorrect();
    else applyWrong();
  };

  // CARTESIAN handlers
  const handleToggleCartesianPoint = (x, y) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setUserCartesianPoints(prev => {
      const numX = Number(x);
      const numY = Number(y);
      const exists = prev.some(([px, py]) => Number(px) === numX && Number(py) === numY);
      const next = exists
        ? prev.filter(([px, py]) => !(Number(px) === numX && Number(py) === numY))
        : [...prev, [numX, numY]];

      // Auto-validate if all required target points are plotted correctly!
      const targets = currentQ?.targetPoints || [];
      if (targets.length > 0 && next.length === targets.length) {
        const isAllMatch = next.every(([ux, uy]) =>
          targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
        );
        if (isAllMatch) {
          setTimeout(() => {
            setIsAnswered(true);
            applyCorrect();
          }, 250);
        }
      }

      return next;
    });
  };

  const handleResetCartesian = () => {
    if (isAnswered) return;
    audioEngine.playClick();
    setUserCartesianPoints([]);
  };

  const handleConfirmCartesian = () => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);
    const targets = currentQ.targetPoints || [];
    const isAllCorrect =
      targets.length === userCartesianPoints.length &&
      userCartesianPoints.every(([ux, uy]) =>
        targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
      );
    if (isAllCorrect) applyCorrect();
    else applyWrong();
  };

  const handleNextQuestion = () => {
    if (questionIndex >= totalQuestions - 1) {
      audioEngine.playVictoryMusic();
      setGameOverReason('completed');
      setGameOver(true);
      try { reloVoiceService.playScene('endless_gameover'); } catch {}
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleRestart = () => {
    try { audioEngine.playClick(); } catch {}
    setShuffledQuestions(shuffleArray(ENDLESS_QUESTIONS));
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setMultiplier(1);
    setIsAnswered(false);
    setIsCorrect(false);
    setGameOver(false);
    setGameOverReason(null);
  };

  // ── Render question UI per type ──────────────────────────────────
  const renderQuestionBody = () => {
    if (!currentQ) return null;

    if (currentQ.type === 'MCQ' || currentQ.type === 'TRUE_FALSE') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            const isRight = opt === currentQ.correct;
            let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
            if (isAnswered) {
              if (isRight) btnStyle = 'bg-[#D1FAE5]/90 backdrop-blur-md border-emerald-500 text-[#065F46] font-black ring-4 ring-[#059669]/30';
              else if (isSelected) btnStyle = 'bg-[#FFE4E6]/90 backdrop-blur-md border-rose-500 text-[#9F1239] font-black';
            }
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectMCQ(opt)}
                className={`p-3.5 sm:p-4 text-left text-base sm:text-lg lg:text-[20px] font-bold font-pencil transition rounded-2xl cursor-pointer flex items-center gap-3 ${btnStyle}`}
              >
                {currentQ.type === 'MCQ' && (
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                    {String.fromCharCode(65 + idx)}
                  </span>
                )}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQ.type === 'MCQ_COMPLEX') {
      return (
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-black text-[#7C3AED] uppercase tracking-wide">
            ☑️ Pilih SEMUA jawaban yang benar, lalu tekan Konfirmasi!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedMultiple.includes(opt);
              const isCorrectOpt = currentQ.correctMultiple.includes(opt);
              let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
              if (isAnswered) {
                if (isCorrectOpt) btnStyle = 'bg-[#D1FAE5]/90 backdrop-blur-md border-emerald-500 text-[#065F46] font-black';
                else if (isSelected && !isCorrectOpt) btnStyle = 'bg-[#FFE4E6]/90 backdrop-blur-md border-rose-500 text-[#9F1239] font-black';
              } else if (isSelected) {
                btnStyle = 'bg-[#EDE9FE]/95 backdrop-blur-md border-[#7C3AED] text-[#5B21B6] font-black';
              }
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleToggleMultiple(opt)}
                  className={`p-2.5 sm:p-3 text-left text-xs sm:text-sm lg:text-base font-bold font-pencil flex items-center gap-2.5 transition rounded-2xl cursor-pointer ${btnStyle}`}
                >
                  <span className="flex-shrink-0">
                    {isSelected || (isAnswered && isCorrectOpt)
                      ? <CheckSquare className="w-5 h-5 text-[#7C3AED]" />
                      : <Square className="w-5 h-5 opacity-40" />}
                  </span>
                  <span className="leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMultiple}
              disabled={selectedMultiple.length === 0}
              className="pencil-btn w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-lg sm:text-xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Jawaban</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'MATCHING') {
      return (
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide">
            🔗 Pasangkan setiap item di sebelah kiri dengan pilihan yang tepat!
          </p>
          <div className="space-y-1.5">
            {currentQ.pairs.map((pair, idx) => {
              const selected = matchingAnswers[pair.left];
              const isRight = selected === pair.right;
              const rowStyle = isAnswered
                ? isRight
                  ? 'border-emerald-500 bg-[#D1FAE5]/90 backdrop-blur-md'
                  : selected
                  ? 'border-rose-500 bg-[#FFE4E6]/90 backdrop-blur-md'
                  : 'glass-panel-subtle'
                : 'glass-panel-subtle';

              return (
                <div key={idx} className={`rounded-xl p-1.5 sm:p-2 space-y-1 ${rowStyle}`}>
                  <p className="text-xs sm:text-sm font-black text-[#2D241E] leading-tight">{pair.left}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentQ.rightOptions.map((opt, oi) => {
                      const isPicked = selected === opt;
                      const isCorrectOpt = isAnswered && opt === pair.right;
                      let optStyle = 'glass-btn text-[#2D241E]';
                      if (isAnswered) {
                        if (isCorrectOpt) optStyle = 'bg-[#059669] text-white border-[#059669]';
                        else if (isPicked && !isCorrectOpt) optStyle = 'bg-[#BE123C] text-white border-[#BE123C]';
                      } else if (isPicked) {
                        optStyle = 'bg-[#D97706] text-white border-[#D97706]';
                      }
                      return (
                        <button
                          key={oi}
                          disabled={isAnswered}
                          onClick={() => handleMatchingSelect(pair.left, opt)}
                          className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${optStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && !isRight && (
                    <p className="text-xs font-black text-[#059669]">✅ Jawaban benar: {pair.right}</p>
                  )}
                </div>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-2 sm:py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-lg sm:text-xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Pasangan</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'ARROWS') {
      return (
        <div className="space-y-2">
          <p className="text-sm sm:text-base font-black text-[#D97706] uppercase tracking-wide">
            🏹 Hubungkan panah dari Himpunan A ke Himpunan B!
          </p>
          <div className="p-2 rounded-2xl glass-panel-subtle flex justify-center">
            <RelationDiagramCanvas
              setA={currentQ.setA}
              setB={currentQ.setB}
              connections={arrowConnections.map(p => {
                const [aStr, bStr] = p.split('->');
                const idxA = currentQ.setA.findIndex(v => String(v) === String(aStr));
                const idxB = currentQ.setB.findIndex(v => String(v) === String(bStr));
                return [idxA, idxB];
              }).filter(([a, b]) => a !== -1 && b !== -1)}
              selectedA={selectedA}
              onSelectA={(idxA) => !isAnswered && setSelectedA(idxA)}
              onSelectB={(idxB, draggedFromA) => {
                if (isAnswered) return;
                const fromA = draggedFromA !== undefined && draggedFromA !== null ? draggedFromA : selectedA;
                if (fromA !== null && fromA !== undefined) {
                  const setAItem = currentQ.setA[fromA];
                  const setBItem = currentQ.setB[idxB];
                  handleToggleArrowPair(`${setAItem}->${setBItem}`);
                  setSelectedA(null);
                }
              }}
              onDisconnectPair={(idxA, idxB) => {
                if (isAnswered) return;
                const setAItem = currentQ.setA[idxA];
                const setBItem = currentQ.setB[idxB];
                handleToggleArrowPair(`${setAItem}->${setBItem}`);
              }}
              compact={true}
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#78350F] px-1">
            <span>{selectedA !== null ? 'Pin A terpilih! Klik pin B untuk menyambung.' : 'Tarik benang / klik pin A lalu B.'}</span>
            <span>Terhubung: <b>{arrowConnections.length}</b> panah</span>
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmArrows}
              disabled={arrowConnections.length === 0}
              className="pencil-btn w-full py-3 sm:py-3.5 bg-[#D97706] text-white font-black text-xl sm:text-2xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ShieldCheck className="w-6 h-6" />
              <span>Konfirmasi Diagram Panah</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'CARTESIAN') {
      return (
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-black text-[#2563EB] uppercase tracking-wide">
            📍 Tandai {currentQ.targetPoints?.length || 3} titik koordinat pada diagram Cartesius berikut!
          </p>
          <div className="flex flex-col items-center justify-center p-1 rounded-2xl glass-panel-subtle">
            <RelationCartesianCanvas
              minX={currentQ.minX ?? 0}
              maxX={currentQ.maxX ?? 4}
              minY={currentQ.minY ?? 0}
              maxY={currentQ.maxY ?? 5}
              userPoints={userCartesianPoints}
              onPointToggle={handleToggleCartesianPoint}
              drawLine={Boolean(currentQ.drawLine)}
              readOnly={isAnswered}
              className="max-h-[175px] sm:max-h-[200px] max-w-[420px]"
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E40AF] px-1">
            <span>Titik terpasang: <b>{userCartesianPoints.length}</b> {currentQ.targetPoints ? `(Target: ${currentQ.targetPoints.length})` : ''}</span>
            {!isAnswered && userCartesianPoints.length > 0 && (
              <button
                onClick={handleResetCartesian}
                className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-300 font-bold hover:bg-rose-200 cursor-pointer text-xs"
              >
                Reset Titik
              </button>
            )}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmCartesian}
              disabled={userCartesianPoints.length === 0}
              className="pencil-btn w-full py-2.5 sm:py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-lg sm:text-xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Titik Cartesius</span>
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand relative z-10 min-h-0">

      {/* Ryu's Island Background Asset (16:9 full cover) */}
      <img 
        src="/game asset/ryu_island.png" 
        alt="Ryu Island"
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10 pointer-events-none select-none"
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl sm:rounded-3xl glass-panel-subtle flex-shrink-0">
        <button
          onClick={() => {
            try { audioEngine.playClick(); } catch {}
            try { reloVoiceService.stopVoice(); } catch {}
            audioEngine.toggleBgm(true);
            onBackToMenu();
          }}
          className="px-4 py-2 glass-btn text-[#2D241E] font-black text-sm sm:text-base lg:text-[20px] flex items-center space-x-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Keluar</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg lg:text-[20px] font-black">
          <NetworkStatusBadge compact={true} />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FEF3C7]/90 backdrop-blur-md border border-amber-300 text-[#78350F] shadow-sm">
            <Flame className="w-5 h-5 text-[#D97706] animate-bounce" />
            <span>{streak}x{multiplier}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DBEAFE]/90 backdrop-blur-md border border-blue-300 text-[#1E40AF] shadow-sm">
            <Trophy className="w-5 h-5 text-[#2563EB]" />
            <span>{score} PTS</span>
          </div>
        </div>
      </div>

      {/* GAMEPLAY LAYOUT: LEFT MASCOT DOCK & RIGHT WORKSPACE */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
        
        {/* Left Mascot Dock */}
        <InstructorMascotGuide
          layout="dock"
          character="ryu"
          pose={gameOver ? (gameOverReason === 'timeout' ? 'thinking' : 'celebrating') : (isAnswered && !isCorrect ? 'thinking' : (isAnswered && isCorrect ? 'celebrating' : 'standing'))}
          emotion={gameOver ? (gameOverReason === 'timeout' ? 'error' : 'happy') : (isAnswered && !isCorrect ? 'error' : (isAnswered && isCorrect ? 'happy' : 'idle'))}
          title={gameOver ? (gameOverReason === 'timeout' ? "WAKTU HABIS!" : "SELESAI!") : (isAnswered && !isCorrect ? "PETUNJUK DARI RYU" : "INSTRUKTUR RYU")}
          icon={gameOverReason === 'timeout' ? "⏱️" : "🔥"}
          message={
            gameOver
              ? (gameOverReason === 'timeout'
                  ? `Waktu habis di Soal #${questionIndex + 1}! Kamu berhasil mengumpulkan skor ${score} PTS. Asah analisismu dan coba lagi! 🔥`
                  : `Endless Mode Selesai! Kamu berhasil menuntaskan semua tantangan dengan skor ${score} PTS! 🔥🏆`)
              : (isAnswered && !isCorrect
                ? `Kurang tepat. ${currentQ?.explanation || 'Coba periksa kembali konsepnya!'}`
                : "")
          }
        />

        {/* Right Workspace: Question Card */}
        {currentQ && !gameOver && (
          <div className="flex-1 min-h-0 h-full p-3.5 sm:p-4 rounded-3xl glass-panel glass-sheen flex flex-col justify-between overflow-hidden space-y-2">

            {/* Progress + Timer */}
            <div className="space-y-1 flex-shrink-0">
              <div className="flex justify-between text-sm sm:text-base lg:text-[18px] font-black text-[#78350F]">
                <span>SOAL #{questionIndex + 1} / {totalQuestions}</span>
                <span className={timerSeconds <= 5 ? 'text-[#BE123C] animate-ping font-black' : ''}>
                  ⏱️ {timerSeconds}s
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/40 border border-white/60 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-300"
                  style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Level Badge + Type Badge */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <span className={`px-2.5 py-0.5 rounded-lg border-2 text-xs sm:text-sm font-black ${LEVEL_COLOR[currentQ.level] || 'bg-gray-100 text-gray-700 border-gray-400'}`}>
                {LEVEL_BADGE[currentQ.level] || currentQ.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg border border-white/60 glass-panel-subtle text-[#374151] text-xs sm:text-sm font-black">
                {currentQ.type === 'MCQ' && '📝 Pilihan Ganda'}
                {currentQ.type === 'MCQ_COMPLEX' && '☑️ Pilihan Ganda Kompleks'}
                {currentQ.type === 'TRUE_FALSE' && '✅ Benar – Salah'}
                {currentQ.type === 'MATCHING' && '🔗 Menjodohkan'}
                {currentQ.type === 'ARROWS' && '🏹 Diagram Panah'}
                {currentQ.type === 'CARTESIAN' && '📍 Koordinat Cartesius'}
              </span>
            </div>

            {/* Question Prompt (Prominent Card matching Quest Mode Exam) */}
            <div className="px-4 py-2.5 sm:py-3 rounded-2xl bg-white/95 border-2 border-[#D97706]/70 shadow-[0_3px_10px_rgba(217,119,6,0.15)] flex-shrink-0 flex flex-col justify-center text-center">
              {currentQ.title && (
                <span className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wider block mb-0.5">{currentQ.title}</span>
              )}
              <p className="text-base sm:text-lg lg:text-xl font-black font-pencil text-[#2D241E] leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Answer UI (NO SCROLL, FIXED VIEWPORT) */}
            <div className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden py-0.5">
              {renderQuestionBody()}
            </div>

            {/* Feedback + Next */}
            {isAnswered && (
              <div className="space-y-2 animate-fade-in flex-shrink-0">
                <div className={`p-3 rounded-2xl border font-bold ${
                  isCorrect ? 'bg-[#D1FAE5]/90 backdrop-blur-md border-[#059669] text-[#065F46]' : 'bg-[#FFE4E6]/90 backdrop-blur-md border-[#BE123C] text-[#9F1239]'
                }`}>
                  <div className="flex items-center gap-2 font-black text-sm sm:text-base lg:text-[18px] mb-0.5">
                    {isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      : <AlertTriangle className="w-5 h-5 text-[#BE123C]" />}
                    <span>{isCorrect ? '🎉 BENAR! PETUNJUK TEPAT!' : '❌ JAWABAN KURANG TEPAT!'}</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-[18px] leading-snug">{currentQ.explanation}</p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-105 active:scale-95"
                >
                  <ShieldCheck className="w-6 h-6 text-[#D97706]" />
                  <span>
                    {questionIndex < totalQuestions - 1
                      ? `LANJUT KE SOAL #${questionIndex + 2} →`
                      : '🏆 LIHAT HASIL AKHIR →'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="flex-1 min-h-0 h-full p-6 rounded-3xl glass-panel glass-sheen text-center space-y-3.5 animate-fade-in flex flex-col justify-center max-w-xl mx-auto w-full">
            {gameOverReason === 'timeout' ? (
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-300 shadow-sm animate-pulse">
                <TimerOff className="w-9 h-9 text-rose-600" />
              </div>
            ) : (
              <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />
            )}
            
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-black font-pencil text-[#2D241E]">
                {gameOverReason === 'timeout' ? 'WAKTU HABIS! GAME OVER ⏱️' : 'ENDLESS MODE SELESAI! 🎉'}
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#78350F]">
                {gameOverReason === 'timeout'
                  ? `Waktu berpikirmu habis di Soal #${questionIndex + 1}. Permainan berhenti!`
                  : `Hebat! Kamu telah menyelesaikan semua ${totalQuestions} tantangan soal!`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
              <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                <p className="text-xs font-black text-[#78350F]">TOTAL SKOR AKHIR</p>
                <p className="text-2xl sm:text-3xl font-black text-[#D97706]">{score} PTS</p>
              </div>
              <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                <p className="text-xs font-black text-[#78350F]">SOAL DIKERJAKAN</p>
                <p className="text-2xl sm:text-3xl font-black text-[#2563EB]">
                  {questionIndex + (gameOverReason === 'timeout' ? 0 : 1)} / {totalQuestions}
                </p>
              </div>
            </div>

            {/* If timed out on a question, show the question explanation card so student learns */}
            {gameOverReason === 'timeout' && currentQ?.explanation && (
              <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-300 text-left max-w-md mx-auto w-full text-xs sm:text-sm text-[#78350F] shadow-sm">
                <span className="font-black block text-[#B45309] mb-1">💡 Pembahasan Soal #{questionIndex + 1}:</span>
                <p className="font-medium whitespace-pre-line leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            <div className="pt-1 max-w-sm mx-auto w-full space-y-2">
              <button
                onClick={handleRestart}
                className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-xl sm:text-2xl flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-6 h-6 text-[#D97706]" />
                <span>Main Lagi (Acak Ulang)</span>
              </button>
              <button
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  try { reloVoiceService.stopVoice(); } catch {}
                  audioEngine.toggleBgm(true);
                  onBackToMenu();
                }}
                className="pencil-btn w-full py-3 bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1E40AF] font-black text-xl sm:text-2xl flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Kembali ke Menu Utama</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
