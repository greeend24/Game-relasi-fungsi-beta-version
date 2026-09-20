import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Trophy, CheckCircle2, RotateCcw, AlertTriangle, 
  ShieldCheck, CheckSquare, Square, Sparkles, Lightbulb, 
  BookOpen, ArrowRight, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import InstructorMascotGuide from '../InstructorMascotGuide';
import NetworkStatusBadge from '../NetworkStatusBadge';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { reloVoiceService } from '../../services/reloVoiceService';
import { CHAPTER_EXERCISES } from '../../data/exerciseData';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import RelationCartesianCanvas from '../RelationCartesianCanvas';
import MathVisualizer from '../visuals/MathVisualizer';

export default function ChapterExercise({ 
  chapterId = 1, 
  currentUser, 
  onBackToStageSelect, 
  onCompleteExercise 
}) {
  const exerciseData = CHAPTER_EXERCISES[chapterId] || CHAPTER_EXERCISES[1];
  const originalQuestions = exerciseData.questions || [];

  // Phase: 'MAIN' (1-30) | 'REMEDIAL_INTRO' | 'REMEDIAL' | 'COMPLETED'
  const [phase, setPhase] = useState('MAIN');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Queue of wrong questions from main phase
  const [wrongQueue, setWrongQueue] = useState([]);
  const [currentRemedialIndex, setCurrentRemedialIndex] = useState(0);

  // Stats
  const [correctCount, setCorrectCount] = useState(0);

  // Answer states
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [arrowConnections, setArrowConnections] = useState([]);
  const [selectedA, setSelectedA] = useState(null);
  const [userCartesianPoints, setUserCartesianPoints] = useState([]);

  // Active question depends on phase
  const isRemedial = phase === 'REMEDIAL';
  const currentBaseQ = isRemedial ? wrongQueue[currentRemedialIndex] : originalQuestions[currentIndex];
  const currentQ = isRemedial && currentBaseQ?.remedialVariant 
    ? { 
        ...currentBaseQ, 
        ...currentBaseQ.remedialVariant,
        title: `🔄 Remedial: ${currentBaseQ.title}`,
        isRemedialVersion: true 
      }
    : currentBaseQ;

  const totalMainQuestions = originalQuestions.length;

  useEffect(() => {
    try {
      audioEngine.toggleBgm(true);
    } catch {}
    return () => {
      try { reloVoiceService.stopVoice(); } catch {}
    };
  }, []);

  // Reset answer states on question switch
  useEffect(() => {
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedOpt(null);
    setSelectedMultiple([]);
    setMatchingAnswers({});
    setArrowConnections([]);
    setSelectedA(null);
    setUserCartesianPoints([]);
  }, [currentIndex, currentRemedialIndex, phase]);

  // Mascot guidance reaction
  const getMascotProps = () => {
    if (phase === 'COMPLETED') {
      return {
        pose: 'celebrating',
        emotion: 'happy',
        title: 'DETEKTIF RELO BANGGA!',
        icon: '🏆',
        message: `Luar biasa! Kamu telah menuntaskan seluruh latihan ${exerciseData.title} dengan pemahaman yang sangat kuat! 🎉🦉`
      };
    }
    if (phase === 'REMEDIAL_INTRO') {
      return {
        pose: 'exploring',
        emotion: 'happy',
        title: 'BABAK PERBAIKAN KONSEP',
        icon: '💡',
        message: `Detektif Relo telah menyiapkan variasi soal dengan angka berbeda untuk mematangkan konsep yang tadi keliru. Ayo kita taklukkan! 🔥`
      };
    }
    if (isAnswered) {
      if (isCorrect) {
        return {
          pose: 'celebrating',
          emotion: 'happy',
          title: 'PENJELASAN PENGUATAN',
          icon: '🌟',
          message: currentQ?.correctReason || 'Jawabanmu tepat sekali! Simak alasan penguatannya agar konsepmu makin kokoh.'
        };
      } else {
        return {
          pose: 'thinking',
          emotion: 'error',
          title: 'PETUNJUK DETEKTIF RELO',
          icon: '💡',
          message: currentQ?.clue ? `Petunjuk: ${currentQ.clue}` : 'Kurang tepat. Jangan khawatir, pelajari letak keliru dan nanti kita coba variasi angka barunya!'
        };
      }
    }
    return {
      pose: 'standing',
      emotion: 'idle',
      title: isRemedial ? 'SOAL PERBAIKAN' : 'LATIHAN PEMAHAMAN',
      icon: isRemedial ? '🔄' : '📖',
      message: isRemedial 
        ? 'Kerjakan soal variasi angka baru ini dengan teliti ya, Detektif! Kamu pasti bisa! 🦉'
        : 'Pahami soalnya dengan santai tanpa batas waktu. Jawab dengan penuh keyakinan! 🔍'
    };
  };

  const handleCorrect = () => {
    audioEngine.playCorrect();
    setIsCorrect(true);
    setIsAnswered(true);
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } catch {}
    if (!isRemedial) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleWrong = () => {
    audioEngine.playError();
    setIsCorrect(false);
    setIsAnswered(true);
    if (!isRemedial) {
      // Add this question to wrongQueue for remedial round
      setWrongQueue(prev => {
        if (!prev.some(q => q.id === currentBaseQ.id)) {
          return [...prev, currentBaseQ];
        }
        return prev;
      });
    }
  };

  // MCQ / TRUE_FALSE click
  const handleSelectMCQ = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    if (opt === currentQ.correct) {
      handleCorrect();
    } else {
      handleWrong();
    }
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
    const correct = currentQ.correctMultiple || [];
    const allCorrect =
      correct.length === selectedMultiple.length &&
      correct.every(c => selectedMultiple.includes(c));
    if (allCorrect) handleCorrect();
    else handleWrong();
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
    const allCorrect = currentQ.pairs.every(p => matchingAnswers[p.left] === p.right);
    if (allCorrect) handleCorrect();
    else handleWrong();
  };

  // ARROWS handlers
  const handleToggleArrowPair = (pairStr) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setArrowConnections(prev => {
      const next = prev.includes(pairStr) ? prev.filter(p => p !== pairStr) : [...prev, pairStr];
      const correctPairs = currentQ?.correctPairs || [];
      if (correctPairs.length > 0 && next.length === correctPairs.length) {
        const isAllMatch = correctPairs.every(p => next.includes(p));
        if (isAllMatch) {
          setTimeout(() => handleCorrect(), 200);
        }
      }
      return next;
    });
  };

  const handleConfirmArrows = () => {
    if (isAnswered || !currentQ) return;
    const correctPairs = currentQ.correctPairs || [];
    const isAllCorrect =
      correctPairs.length === arrowConnections.length &&
      correctPairs.every(p => arrowConnections.includes(p));
    if (isAllCorrect) handleCorrect();
    else handleWrong();
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

      const targets = currentQ?.targetPoints || [];
      if (targets.length > 0 && next.length === targets.length) {
        const isAllMatch = next.every(([ux, uy]) =>
          targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
        );
        if (isAllMatch) {
          setTimeout(() => handleCorrect(), 200);
        }
      }
      return next;
    });
  };

  const handleConfirmCartesian = () => {
    if (isAnswered || !currentQ) return;
    const targets = currentQ.targetPoints || [];
    const isAllCorrect =
      targets.length === userCartesianPoints.length &&
      userCartesianPoints.every(([ux, uy]) =>
        targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
      );
    if (isAllCorrect) handleCorrect();
    else handleWrong();
  };

  // Advance to next question
  const handleNext = () => {
    audioEngine.playClick();

    if (phase === 'MAIN') {
      if (currentIndex < totalMainQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Main phase completed!
        if (wrongQueue.length > 0) {
          setPhase('REMEDIAL_INTRO');
        } else {
          finishExercise();
        }
      }
    } else if (phase === 'REMEDIAL') {
      if (currentRemedialIndex < wrongQueue.length - 1) {
        setCurrentRemedialIndex(currentRemedialIndex + 1);
      } else {
        // Remedial phase completed!
        finishExercise();
      }
    }
  };

  const startRemedialPhase = () => {
    audioEngine.playClick();
    setCurrentRemedialIndex(0);
    setPhase('REMEDIAL');
  };

  const finishExercise = async () => {
    audioEngine.playVictoryMusic();
    setPhase('COMPLETED');
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch {}
    try {
      await storageService.updateExerciseProgress(chapterId, 50);
      if (onCompleteExercise) onCompleteExercise(chapterId);
    } catch (e) {
      console.error('Error saving exercise progress:', e);
    }
  };

  const mascotInfo = getMascotProps();

  // ── Render Question Body per Type ──────────────────────────────────
  const renderQuestionBody = () => {
    if (!currentQ) return null;

    if (currentQ.type === 'MCQ' || currentQ.type === 'TRUE_FALSE') {
      const isTrueFalse = currentQ.type === 'TRUE_FALSE';
      const visual = currentQ.visual;
      const hasVisual = Boolean(visual && visual.type);
      const isWideVisual = visual?.type === 'relation_table' || visual?.type === 'ordered_pairs';

      // Layout 1: TRUE_FALSE
      if (isTrueFalse) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto py-0.5">
            {hasVisual && (
              <div className="w-full max-w-lg flex items-center justify-center flex-shrink-0">
                <MathVisualizer visual={visual} compact={true} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto flex-shrink-0">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isRight = opt === currentQ.correct;
                const isBenar = opt.toLowerCase() === 'benar';
                let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
                if (isAnswered) {
                  if (isRight) btnStyle = 'bg-[#D1FAE5]/95 border-emerald-500 text-[#065F46] font-black ring-4 ring-[#059669]/30';
                  else if (isSelected) btnStyle = 'bg-[#FFE4E6]/95 border-rose-500 text-[#9F1239] font-black';
                } else if (isSelected) {
                  btnStyle = isBenar ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black' : 'bg-rose-100 border-rose-500 text-rose-900 font-black';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectMCQ(opt)}
                    className={`py-2.5 sm:py-3 px-5 text-center text-sm sm:text-base lg:text-lg font-bold font-pencil transition rounded-2xl cursor-pointer flex items-center justify-center gap-2.5 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // Layout 2: Wide Visual (Table / Ordered Pairs) -> Stack visual on top + 2x2 grid
      if (hasVisual && isWideVisual) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto py-0.5">
            <div className="w-full max-w-xl flex items-center justify-center flex-shrink-0">
              <MathVisualizer visual={visual} compact={true} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl mx-auto flex-shrink-0">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isRight = opt === currentQ.correct;
                let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
                if (isAnswered) {
                  if (isRight) btnStyle = 'bg-[#D1FAE5]/95 border-emerald-500 text-[#065F46] font-black ring-4 ring-[#059669]/30';
                  else if (isSelected) btnStyle = 'bg-[#FFE4E6]/95 border-rose-500 text-[#9F1239] font-black';
                } else if (isSelected) {
                  btnStyle = 'bg-[#FDE68A]/90 border-[#D97706] text-[#2D241E] font-black';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectMCQ(opt)}
                    className={`p-2.5 text-left text-xs sm:text-sm lg:text-base font-bold font-pencil transition rounded-2xl cursor-pointer flex items-center gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-tight break-words">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // Layout 3: Tall / Square Visual (Arrow Diagram, Cartesian Graph) -> Side-by-side
      if (hasVisual) {
        return (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-2.5 lg:gap-4 py-0.5">
            <div className="flex-1 w-full min-w-0 max-w-[400px] flex items-center justify-center flex-shrink-0">
              <MathVisualizer visual={visual} compact={true} />
            </div>
            <div className="w-full md:w-[48%] flex flex-col gap-1.5 flex-shrink-0">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isRight = opt === currentQ.correct;
                let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
                if (isAnswered) {
                  if (isRight) btnStyle = 'bg-[#D1FAE5]/95 border-emerald-500 text-[#065F46] font-black ring-4 ring-[#059669]/30';
                  else if (isSelected) btnStyle = 'bg-[#FFE4E6]/95 border-rose-500 text-[#9F1239] font-black';
                } else if (isSelected) {
                  btnStyle = 'bg-[#FDE68A]/90 border-[#D97706] text-[#2D241E] font-black';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectMCQ(opt)}
                    className={`p-2 sm:p-2.5 text-left text-xs sm:text-sm font-bold font-pencil transition rounded-xl cursor-pointer flex items-center gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-tight break-words">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // Layout 4: No Visual -> Default 2x2 grid
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            const isRight = opt === currentQ.correct;
            let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
            if (isAnswered) {
              if (isRight) btnStyle = 'bg-[#D1FAE5]/95 border-emerald-500 text-[#065F46] font-black ring-4 ring-[#059669]/30';
              else if (isSelected) btnStyle = 'bg-[#FFE4E6]/95 border-rose-500 text-[#9F1239] font-black';
            } else if (isSelected) {
              btnStyle = 'bg-[#FDE68A]/90 border-[#D97706] text-[#2D241E] font-black';
            }
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectMCQ(opt)}
                className={`p-3 sm:p-3.5 text-left text-sm sm:text-base lg:text-lg font-bold font-pencil transition rounded-2xl cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
              >
                {currentQ.type === 'MCQ' && (
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
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
      const visual = currentQ.visual;
      return (
        <div className="space-y-2">
          {visual && (
            <div className="w-full max-w-lg mx-auto flex items-center justify-center flex-shrink-0">
              <MathVisualizer visual={visual} compact={true} />
            </div>
          )}
          <p className="text-xs sm:text-sm font-black text-[#7C3AED] uppercase tracking-wide">
            ☑️ Pilih SEMUA jawaban yang benar, lalu klik Konfirmasi!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedMultiple.includes(opt);
              const isCorrectOpt = (currentQ.correctMultiple || []).includes(opt);
              let btnStyle = 'glass-btn text-[#2D241E] hover:border-white';
              if (isAnswered) {
                if (isCorrectOpt) btnStyle = 'bg-[#D1FAE5]/90 border-emerald-500 text-[#065F46] font-black';
                else if (isSelected && !isCorrectOpt) btnStyle = 'bg-[#FFE4E6]/90 border-rose-500 text-[#9F1239] font-black';
              } else if (isSelected) {
                btnStyle = 'bg-[#EDE9FE]/95 border-[#7C3AED] text-[#5B21B6] font-black';
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
              className="pencil-btn w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95"
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
                  ? 'border-emerald-500 bg-[#D1FAE5]/90'
                  : selected
                  ? 'border-rose-500 bg-[#FFE4E6]/90'
                  : 'glass-panel-subtle'
                : 'glass-panel-subtle';

              return (
                <div key={idx} className={`rounded-xl p-2 space-y-1 ${rowStyle}`}>
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
                </div>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-2 sm:py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95"
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
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide">
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
              disabled={isAnswered}
            />
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmArrows}
              disabled={arrowConnections.length === 0}
              className="pencil-btn w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Diagram Panah ({arrowConnections.length} Panah)</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'CARTESIAN') {
      return (
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-black text-[#2563EB] uppercase tracking-wide">
            📍 Klik pada perpotongan garis kisi koordinat untuk menandai titik!
          </p>
          <div className="p-2 rounded-2xl glass-panel-subtle flex justify-center">
            <RelationCartesianCanvas
              minX={currentQ.minX ?? 0}
              maxX={currentQ.maxX ?? 6}
              minY={currentQ.minY ?? 0}
              maxY={currentQ.maxY ?? 8}
              points={userCartesianPoints}
              onTogglePoint={handleToggleCartesianPoint}
              compact={true}
              disabled={isAnswered}
            />
          </div>
          {!isAnswered && (
            <div className="flex gap-2">
              <button
                onClick={() => setUserCartesianPoints([])}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm rounded-xl cursor-pointer"
              >
                Hapus Titik
              </button>
              <button
                onClick={handleConfirmCartesian}
                disabled={userCartesianPoints.length === 0}
                className="pencil-btn flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Konfirmasi Plot ({userCartesianPoints.length} Titik)</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2.5 sm:p-3.5 space-y-2 overflow-hidden font-hand relative z-10 min-h-0">
      
      {/* Background Image */}
      <img 
        src="/game asset/relo_island.png" 
        alt="Relo Island"
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10 pointer-events-none select-none"
      />

      {/* Top Header */}
      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl glass-panel-subtle flex-shrink-0">
        <button
          onClick={() => {
            audioEngine.playClick();
            onBackToStageSelect();
          }}
          className="px-3.5 py-1.5 sm:py-2 glass-btn text-[#2D241E] font-black text-xs sm:text-sm lg:text-base flex items-center space-x-1.5 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
          <span>Menu Chapter</span>
        </button>

        <div className="flex items-center gap-2 text-center">
          <BookOpen className="w-5 h-5 text-[#D97706] hidden sm:block" />
          <h2 className="text-base sm:text-lg lg:text-xl font-black font-pencil text-[#2D241E] tracking-wide">
            {exerciseData.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-black">
            <span>🌿 Mode Santai</span>
          </div>
          <NetworkStatusBadge compact={true} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
        
        {/* Left Mascot Dock */}
        <InstructorMascotGuide
          layout="dock"
          character="relo"
          pose={mascotInfo.pose}
          emotion={mascotInfo.emotion}
          title={mascotInfo.title}
          icon={mascotInfo.icon}
          message={mascotInfo.message}
        />

        {/* Right Content Area: Question or Phase Transition */}
        {phase === 'MAIN' || phase === 'REMEDIAL' ? (
          <div className="flex-1 min-h-0 h-full p-3 sm:p-4 rounded-3xl glass-panel glass-sheen flex flex-col justify-between overflow-hidden space-y-2">
            
            {/* Header / Progress Card */}
            <div className="flex items-center justify-between flex-shrink-0 text-xs sm:text-sm font-black">
              <span className={`px-2.5 py-1 rounded-xl border ${
                isRemedial 
                  ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse' 
                  : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {isRemedial 
                  ? `🔄 REMEDIAL: SOAL #${currentRemedialIndex + 1} DARI ${wrongQueue.length}`
                  : `SOAL #${currentIndex + 1} DARI ${totalMainQuestions}`}
              </span>

              <span className="text-[#78350F]">
                {isRemedial ? 'Fase Perbaikan Angka Berbeda' : `Benar: ${correctCount} / ${totalMainQuestions}`}
              </span>
            </div>

            {/* Question Prompt Card */}
            <div className="px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 border-2 border-[#D97706]/70 shadow-[0_3px_10px_rgba(217,119,6,0.15)] flex-shrink-0 text-center">
              {currentQ?.title && (
                <span className="text-xs font-black text-[#D97706] uppercase tracking-wider block mb-0.5">
                  {currentQ.title}
                </span>
              )}
              <p className="text-sm sm:text-base lg:text-lg font-black font-pencil text-[#2D241E] leading-snug">
                {currentQ?.question}
              </p>
            </div>

            {/* Answer Workspace */}
            <div className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden py-0.5">
              {renderQuestionBody()}
            </div>

            {/* Feedback & Explanation Card */}
            {isAnswered && (
              <div className="space-y-2 animate-fade-in flex-shrink-0">
                <div className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm ${
                  isCorrect 
                    ? 'bg-[#D1FAE5]/95 border-[#059669] text-[#065F46]' 
                    : 'bg-[#FFE4E6]/95 border-[#BE123C] text-[#9F1239]'
                }`}>
                  <div className="flex items-center gap-2 font-black text-sm sm:text-base mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                        <span>🎉 JAWABANMU BENAR! (PENGUATAN KONSEP)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-[#BE123C]" />
                        <span>❌ KURANG TEPAT & PETUNJUK</span>
                      </>
                    )}
                  </div>

                  <p className="leading-snug mb-1.5 whitespace-pre-line">
                    {isCorrect ? currentQ.correctReason : currentQ.wrongExplanation}
                  </p>

                  {!isCorrect && currentQ.clue && (
                    <div className="p-2 rounded-xl bg-amber-100/90 border border-amber-300 text-[#78350F] flex items-start gap-1.5 mt-1.5 text-xs font-bold">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Clue Berpikir:</strong> {currentQ.clue}</span>
                    </div>
                  )}

                  {!isCorrect && !isRemedial && (
                    <div className="mt-1.5 text-xs font-black text-amber-800 flex items-center gap-1">
                      <span>📌 Soal ini ditandai untuk babak remedial dengan variasi angka baru di akhir.</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="pencil-btn w-full py-2.5 sm:py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-base sm:text-xl flex items-center justify-center gap-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-[1.01] active:scale-95"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D97706]" />
                  <span>
                    {isRemedial
                      ? (currentRemedialIndex < wrongQueue.length - 1 ? 'LANJUT SOAL REMEDIAL BERIKUTNYA →' : '🏆 SELESAIKAN LATIHAN →')
                      : (currentIndex < totalMainQuestions - 1 ? `LANJUT KE SOAL #${currentIndex + 2} →` : '🏆 LIHAT HASIL SESI UTAMA →')}
                  </span>
                </button>
              </div>
            )}

          </div>
        ) : phase === 'REMEDIAL_INTRO' ? (
          /* Transition Screen to Remedial Phase */
          <div className="flex-1 min-h-0 h-full p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center max-w-xl mx-auto w-full">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center shadow-sm animate-bounce">
              <Lightbulb className="w-9 h-9 text-amber-600" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black font-pencil text-[#2D241E]">
                SESI 30 SOAL UTAMA SELESAI!
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#78350F]">
                Kamu berhasil menjawab <strong className="text-emerald-700">{correctCount} dari {totalMainQuestions}</strong> soal dengan benar pada percobaan pertama!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-left space-y-2 text-xs sm:text-sm text-[#78350F]">
              <span className="font-black text-amber-900 block flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Babak Perbaikan Konsep ({wrongQueue.length} Soal)</span>
              </span>
              <p className="leading-relaxed font-medium">
                Ada {wrongQueue.length} soal yang tadi sempat kurang tepat. Detektif Relo telah menyiapkan soal-soal tersebut dengan <strong>angka dan variasi baru</strong> agar kamu dapat memperbaiki pemahamanmu hingga tuntas 100%!
              </p>
            </div>

            <button
              onClick={startRemedialPhase}
              className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-lg sm:text-xl flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5 text-[#D97706]" />
              <span>Mulai Babak Remedial (Angka Baru) →</span>
            </button>
          </div>
        ) : (
          /* Completion Screen */
          <div className="flex-1 min-h-0 h-full p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center max-w-xl mx-auto w-full">
            <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black font-pencil text-[#2D241E]">
                LATIHAN SELESAI & TUNTAS! 🎉
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#78350F]">
                Selamat! Kamu telah menguasai seluruh konsep pada {exerciseData.title}!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
              <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                <p className="text-xs font-black text-[#78350F]">SOAL DIKUASAI</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">30 / 30</p>
              </div>
              <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                <p className="text-xs font-black text-[#78350F]">BONUS POIN</p>
                <p className="text-2xl sm:text-3xl font-black text-[#D97706]">+50 PTS</p>
              </div>
            </div>

            <div className="pt-2 max-w-sm mx-auto w-full space-y-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onBackToStageSelect();
                }}
                className="pencil-btn w-full py-3 bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1E40AF] font-black text-lg sm:text-xl flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali ke Menu Chapter</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
