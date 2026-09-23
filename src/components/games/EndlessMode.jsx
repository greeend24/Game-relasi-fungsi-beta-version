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
import MatchingSlotDiagram from '../MatchingSlotDiagram';
import confetti from 'canvas-confetti';

const LEVEL_BADGE = { C3: '🟢 Tantangan Terampil', C4: '🟡 Tantangan Logika', C5: '🔴 Tantangan Master Detektif' };
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

  // INPUT_NUMBER state
  const [inputNumberValue, setInputNumberValue] = useState('');

  // DRAG_DROP state
  const [dragDropMapping, setDragDropMapping] = useState({});

  // TABLE_FILL state
  const [tableFillValues, setTableFillValues] = useState({});

  // DETECT_ERROR state
  const [detectErrorSelected, setDetectErrorSelected] = useState(null);

  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray(ENDLESS_QUESTIONS));
  const currentQ = shuffledQuestions[questionIndex] || null;
  const totalQuestions = shuffledQuestions.length;

  // Randomized options per question to eliminate predictable answer patterns
  const [shuffledOptions, setShuffledOptions] = useState(() => {
    const q0 = shuffledQuestions[0];
    if (q0) {
      if (q0.options && q0.type !== 'TRUE_FALSE') {
        return shuffleArray(q0.options);
      }
      if (q0.type === 'MATCHING' && q0.pairs) {
        const baseOpts = q0.rightOptions || Array.from(new Set(q0.pairs.map(p => p.right)));
        return shuffleArray(baseOpts);
      }
      return q0?.options || [];
    }
    return [];
  });
  const [shuffledMatchingOptions, setShuffledMatchingOptions] = useState({});

  useEffect(() => {
    audioEngine.toggleBgm(true);
    return () => {
      audioEngine.toggleBgm(true);
      try { reloVoiceService.stopVoice(); } catch { }
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
    setInputNumberValue('');
    setDragDropMapping({});
    setTableFillValues({});
    setDetectErrorSelected(null);
    setIsCorrect(false);

    // Randomize option order to eliminate predictable diagonal/positional patterns
    if (currentQ) {
      if (currentQ.type === 'TRUE_FALSE') {
        setShuffledOptions(currentQ.options || ['Benar', 'Salah']);
      } else if (currentQ.options && currentQ.options.length > 0) {
        setShuffledOptions(shuffleArray(currentQ.options));
      } else if (currentQ.type === 'MATCHING' && currentQ.pairs) {
        const baseOpts = currentQ.rightOptions || Array.from(new Set(currentQ.pairs.map(p => p.right)));
        setShuffledOptions(shuffleArray(baseOpts));
      } else {
        setShuffledOptions([]);
      }

      if (currentQ.type === 'MATCHING' && currentQ.pairs) {
        const rowMap = {};
        const baseOpts = currentQ.rightOptions || currentQ.pairs.map(p => p.right);
        currentQ.pairs.forEach((pair, idx) => {
          let rowShuffled = shuffleArray(baseOpts);
          let attempts = 0;
          // Strictly prevent diagonal ladder: row i's correct answer must not be placed at button index i
          while (attempts < 10 && rowShuffled.length > 1 && rowShuffled.indexOf(pair.right) === (idx % rowShuffled.length)) {
            rowShuffled = shuffleArray(baseOpts);
            attempts++;
          }
          if (rowShuffled.length > 1 && rowShuffled.indexOf(pair.right) === (idx % rowShuffled.length)) {
            const curPos = rowShuffled.indexOf(pair.right);
            const targetPos = (curPos + 1) % rowShuffled.length;
            [rowShuffled[curPos], rowShuffled[targetPos]] = [rowShuffled[targetPos], rowShuffled[curPos]];
          }
          rowMap[pair.left] = rowShuffled;
        });
        setShuffledMatchingOptions(rowMap);
      } else {
        setShuffledMatchingOptions({});
      }
    }

    // Give generous time for interactive visual plotting & matching questions
    const isInteractive = ['CARTESIAN', 'ARROWS', 'MATCHING', 'DRAG_DROP', 'TABLE_FILL'].includes(currentQ?.type);
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
    try { reloVoiceService.playScene('endless_correct'); } catch { }
  }, [streak, currentQ]);

  const applyWrong = useCallback(() => {
    audioEngine.playError();
    setIsCorrect(false);
    setStreak(0);
    setMultiplier(1);
    try { reloVoiceService.playScene('endless_wrong'); } catch { }
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
    } else if (currentQ.type === 'INPUT_NUMBER') {
      if (String(inputNumberValue).trim() !== '' && Number(inputNumberValue) === Number(currentQ.correct)) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'DRAG_DROP') {
      const items = currentQ.items || [];
      const correctMap = currentQ.correctMapping || {};
      if (items.every(it => dragDropMapping[it]) && items.every(it => dragDropMapping[it] === correctMap[it])) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'TABLE_FILL') {
      const cv = currentQ.correctValues || {};
      if (Object.entries(cv).every(([k, v]) => String(tableFillValues[k] || '').trim() === String(v))) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    } else if (currentQ.type === 'DETECT_ERROR') {
      const errIdx = (currentQ.steps || []).findIndex(s => s.isError);
      if (detectErrorSelected === errIdx) {
        setIsAnswered(true);
        applyCorrect();
        return;
      }
    }

    setIsAnswered(true);
    applyWrong();
    setGameOverReason('timeout');
    setGameOver(true);
    storageService.updateEndlessHighScore(score);
    if (onUpdateUser) onUpdateUser(storageService.getCurrentUser());
    try { reloVoiceService.playScene('endless_gameover'); } catch { }
  }, [currentQ, isAnswered, userCartesianPoints, arrowConnections, matchingAnswers, selectedMultiple, inputNumberValue, dragDropMapping, tableFillValues, detectErrorSelected, applyCorrect, applyWrong, score, onUpdateUser]);

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

  // MATCHING select & remove
  const handleMatchingSelect = (leftItem, rightValue) => {
    if (isAnswered) return;
    setMatchingAnswers(prev => ({ ...prev, [leftItem]: rightValue }));
  };

  const handleMatchingRemove = (leftItem) => {
    if (isAnswered) return;
    setMatchingAnswers(prev => {
      const copy = { ...prev };
      delete copy[leftItem];
      return copy;
    });
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
      return prev.includes(pairStr) ? prev.filter(p => p !== pairStr) : [...prev, pairStr];
    });
  };

  const handleConfirmArrows = () => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);
    const normPair = p => {
      const parts = String(p || '').split('->');
      return parts.length >= 2 ? `${parts[0].trim()}->${parts[1].trim()}` : String(p || '').trim();
    };
    const normCorrect = (currentQ.correctPairs || []).map(normPair);
    const normUser = (arrowConnections || []).map(normPair);
    const isAllCorrect =
      normCorrect.length === normUser.length &&
      normCorrect.every(p => normUser.includes(p)) &&
      normUser.every(p => normCorrect.includes(p));
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
      return exists
        ? prev.filter(([px, py]) => !(Number(px) === numX && Number(py) === numY))
        : [...prev, [numX, numY]];
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

  // INPUT_NUMBER handler
  const handleInputNumberSubmit = () => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);
    const userVal = String(inputNumberValue).trim();
    const correctVal = String(currentQ.correct).trim();
    const tolerance = currentQ.tolerance || 0;
    const ok = tolerance > 0
      ? Math.abs(Number(userVal) - Number(correctVal)) <= tolerance
      : Number(userVal) === Number(correctVal);
    if (ok) applyCorrect();
    else applyWrong();
  };

  // DRAG_DROP handlers
  const handleDragDropAssign = (item, category) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setDragDropMapping(prev => {
      const next = { ...prev };
      // If already in same category, remove it
      if (next[item] === category) { delete next[item]; return next; }
      next[item] = category;
      return next;
    });
  };

  const handleConfirmDragDrop = () => {
    if (isAnswered || !currentQ) return;
    const items = currentQ.items || [];
    if (!items.every(it => dragDropMapping[it])) return;
    setIsAnswered(true);
    const cm = currentQ.correctMapping || {};
    if (items.every(it => dragDropMapping[it] === cm[it])) applyCorrect();
    else applyWrong();
  };

  // TABLE_FILL handlers
  const handleTableFillChange = (key, value) => {
    if (isAnswered) return;
    setTableFillValues(prev => ({ ...prev, [key]: value }));
  };

  const handleConfirmTableFill = () => {
    if (isAnswered || !currentQ) return;
    const cv = currentQ.correctValues || {};
    const keys = Object.keys(cv);
    if (!keys.every(k => String(tableFillValues[k] || '').trim() !== '')) return;
    setIsAnswered(true);
    if (keys.every(k => String(tableFillValues[k]).trim() === String(cv[k]))) applyCorrect();
    else applyWrong();
  };

  // DETECT_ERROR handler
  const handleDetectErrorSelect = (stepIdx) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setDetectErrorSelected(stepIdx);
    setIsAnswered(true);
    const errIdx = (currentQ?.steps || []).findIndex(s => s.isError);
    if (stepIdx === errIdx) applyCorrect();
    else applyWrong();
  };

  const handleNextQuestion = () => {
    if (questionIndex >= totalQuestions - 1) {
      audioEngine.playVictoryMusic();
      setGameOverReason('completed');
      setGameOver(true);
      storageService.updateEndlessHighScore(score);
      if (onUpdateUser) onUpdateUser(storageService.getCurrentUser());
      try { reloVoiceService.playScene('endless_gameover'); } catch { }
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleRestart = () => {
    try { audioEngine.playClick(); } catch { }
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

    const displayedOptions = (shuffledOptions && shuffledOptions.length > 0) ? shuffledOptions : (currentQ.options || []);

    if (currentQ.type === 'MCQ' || currentQ.type === 'TRUE_FALSE') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayedOptions.map((opt, idx) => {
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
            {displayedOptions.map((opt, idx) => {
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
      const allRightOpts = currentQ.rightOptions || Array.from(new Set(currentQ.pairs.map(p => p.right)));
      const activeRightOptions = (shuffledOptions && shuffledOptions.length > 0)
        ? shuffledOptions
        : allRightOpts;

      return (
        <div className="space-y-2">
          <MatchingSlotDiagram
            pairs={currentQ.pairs}
            rightOptions={activeRightOptions}
            answers={matchingAnswers}
            onSelectPair={handleMatchingSelect}
            onRemovePair={handleMatchingRemove}
            isAnswered={isAnswered}
            labelA="Himpunan A (Soal)"
            labelB="Himpunan B (Jawaban Target)"
          />

          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-lg sm:text-xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95"
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
            📍 Tandai {currentQ.targetPoints?.length || 3} titik koordinat pada diagram Kartesius berikut!
          </p>
          <div className="flex flex-col items-center justify-center py-1">
            <RelationCartesianCanvas
              minX={currentQ.minX ?? 0}
              maxX={currentQ.maxX ?? 4}
              minY={currentQ.minY ?? 0}
              maxY={currentQ.maxY ?? 5}
              userPoints={userCartesianPoints}
              onPointToggle={handleToggleCartesianPoint}
              drawLine={Boolean(currentQ.drawLine)}
              readOnly={isAnswered}
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E40AF] px-1">
            <span>Klik persilangan koordinat untuk menandai atau melepas titik</span>
            {!isAnswered && userCartesianPoints.length > 0 && (
              <button
                onClick={handleResetCartesian}
                className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-300 font-bold hover:bg-rose-200 cursor-pointer text-xs ml-auto"
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
              <span>Konfirmasi Titik Kartesius</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'INPUT_NUMBER') {
      return (
        <div className="space-y-2 py-1 max-w-md mx-auto w-full">
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide text-center">
            🔢 Masukkan angka jawabanmu pada kolom di bawah:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <input
              type="number"
              value={inputNumberValue}
              onChange={(e) => setInputNumberValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputNumberValue.trim() !== '' && !isAnswered) {
                  handleInputNumberSubmit();
                }
              }}
              disabled={isAnswered}
              placeholder="Ketik angka..."
              className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 text-center text-xl sm:text-2xl font-black font-pencil rounded-2xl border-2 border-amber-400 bg-white/95 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-inner"
              autoFocus
            />
            {!isAnswered && (
              <button
                onClick={handleInputNumberSubmit}
                disabled={inputNumberValue.trim() === ''}
                className="pencil-btn w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-lg sm:text-xl rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95 disabled:opacity-40"
              >
                Kirim
              </button>
            )}
          </div>
          {isAnswered && (
            <div className={`p-2 rounded-xl text-center font-bold text-xs sm:text-sm border ${isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}>
              {isCorrect ? '✓ Angka tepat!' : `Kunci jawaban: ${currentQ.correct}`}
            </div>
          )}
        </div>
      );
    }

    if (currentQ.type === 'DRAG_DROP') {
      const items = currentQ.items || [];
      const categories = currentQ.categories || [];
      const allAssigned = items.every(it => dragDropMapping[it]);

      return (
        <div className="space-y-2 py-1 flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide text-center">
            🎯 Kelompokkan setiap item ke kategori yang tepat!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item, idx) => {
              const currentCat = dragDropMapping[item];
              const isItemCorrect = isAnswered && currentCat === currentQ.correctMapping?.[item];
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-2xl border-2 transition-all flex flex-col justify-between gap-1.5 ${isAnswered
                      ? (isItemCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-400')
                      : (currentCat ? 'bg-amber-50/90 border-amber-400' : 'bg-white/80 border-dashed border-amber-300')
                    }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#2D241E] font-pencil">
                    {item}
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {categories.map((cat, cIdx) => {
                      const isSelected = currentCat === cat;
                      return (
                        <button
                          key={cIdx}
                          disabled={isAnswered}
                          onClick={() => handleDragDropAssign(item, cat)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${isSelected
                              ? 'bg-[#D97706] text-white shadow-sm scale-105'
                              : 'bg-white/90 text-[#78350F] border border-amber-200 hover:bg-amber-100'
                            }`}
                        >
                          {isSelected ? '✓ ' : ''}{cat}
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
              onClick={handleConfirmDragDrop}
              disabled={!allAssigned}
              className="pencil-btn w-full py-2.5 bg-[#D97706] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95 flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Pengelompokan ({Object.keys(dragDropMapping).length}/{items.length})</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'TABLE_FILL') {
      const headers = currentQ.headers || ['x', 'f(x)'];
      const rows = currentQ.rows || [];
      const cv = currentQ.correctValues || {};
      const allFilled = Object.keys(cv).every(k => String(tableFillValues[k] || '').trim() !== '');

      return (
        <div className="space-y-2 py-1 max-w-md mx-auto w-full">
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide text-center">
            📝 Lengkapi nilai yang kosong pada tabel berikut:
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-amber-300 bg-white/95 shadow-sm">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-amber-200/70 border-b border-amber-300 text-xs sm:text-sm font-black text-[#78350F]">
                  {headers.map((h, i) => (
                    <th key={i} className="py-1.5 px-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {rows.map((row, rIdx) => {
                  const isNeedsInput = cv[row.x] !== undefined;
                  const userVal = tableFillValues[row.x] || '';
                  const isRowCorrect = isAnswered && String(userVal).trim() === String(cv[row.x]);
                  return (
                    <tr key={rIdx} className="hover:bg-amber-50/50">
                      <td className="py-1.5 px-3 font-black text-sm sm:text-base text-[#2D241E]">{row.x}</td>
                      <td className="py-1.5 px-3">
                        {isNeedsInput ? (
                          <div className="flex items-center justify-center">
                            <input
                              type="number"
                              value={userVal}
                              disabled={isAnswered}
                              onChange={(e) => handleTableFillChange(row.x, e.target.value)}
                              placeholder="?"
                              className={`w-16 sm:w-20 py-1 px-2 text-center text-base sm:text-lg font-black font-pencil rounded-xl border-2 transition-all ${isAnswered
                                  ? (isRowCorrect ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800')
                                  : 'bg-white border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400'
                                }`}
                            />
                            {isAnswered && !isRowCorrect && (
                              <span className="ml-1.5 text-xs font-black text-emerald-600">({cv[row.x]})</span>
                            )}
                          </div>
                        ) : (
                          <span className="font-bold text-sm sm:text-base text-[#2D241E]">{row.fx}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmTableFill}
              disabled={!allFilled}
              className="pencil-btn w-full py-2.5 bg-[#D97706] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95 flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Tabel</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'DETECT_ERROR') {
      const steps = currentQ.steps || [];

      return (
        <div className="space-y-1.5 py-1 max-w-lg mx-auto w-full">
          <p className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide text-center">
            🔍 Klik baris langkah yang KELIRU di bawah ini:
          </p>
          <div className="space-y-1.5">
            {steps.map((step, idx) => {
              const isSelected = detectErrorSelected === idx;
              let borderClass = 'border-amber-200 hover:border-amber-400 bg-white/95';
              if (isAnswered) {
                if (step.isError) {
                  borderClass = 'border-rose-500 bg-rose-100 text-rose-900 ring-2 ring-rose-400';
                } else if (isSelected && !step.isError) {
                  borderClass = 'border-rose-400 bg-rose-50 text-rose-800';
                } else {
                  borderClass = 'border-gray-200 bg-white/60 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleDetectErrorSelect(idx)}
                  className={`w-full p-2 sm:p-2.5 rounded-2xl border-2 text-left font-pencil text-sm sm:text-base font-bold flex items-center justify-between transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-95 ${borderClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 text-[#78350F] flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <span>{step.text}</span>
                  </div>
                  {isAnswered && step.isError && (
                    <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-xs font-black">
                      ⚠️ Langkah Salah!
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  // ── Analisis Kesalahan & Miskonsepsi Pilihan Siswa ──────────────────
  const renderDistractorAnalysis = () => {
    if (!currentQ || isCorrect) return null;

    if (currentQ.type === 'MATCHING' && currentQ.pairs) {
      const wrongPairs = currentQ.pairs.filter(p => matchingAnswers[p.left] && matchingAnswers[p.left] !== p.right);
      if (wrongPairs.length === 0) return null;

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-2 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PASANGAN YANG KAMU PILIH:</span>
          </div>
          <div className="space-y-1.5">
            {wrongPairs.map((p, wIdx) => {
              const userPick = matchingAnswers[p.left];
              const actualOwner = currentQ.pairs.find(op => op.right === userPick)?.left;
              const customExp = currentQ.pairDistractorAnalysis?.[p.left]?.[userPick];

              return (
                <div key={wIdx} className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
                  <p className="font-black text-rose-800 mb-0.5">
                    ❌ Pada item <span className="underline font-mono bg-rose-50 px-1 rounded">{p.left}</span>:
                  </p>
                  <p className="text-gray-700 mb-1">
                    Kamu memilih: <span className="font-bold text-rose-600">"{userPick}"</span>
                  </p>
                  <p className="text-[#92400E] bg-amber-50/60 p-1.5 rounded-md border border-amber-200/80">
                    💡 <strong>Mengapa ini keliru?</strong> {customExp || (
                      actualOwner
                        ? `Pilihan tersebut sebenarnya adalah pasangan dari "${actualOwner}", bukan "${p.left}". Pasangan yang benar untuk "${p.left}" adalah: "${p.right}".`
                        : `Pilihan tersebut bukan pasangan yang tepat untuk "${p.left}". Pasangan yang benar adalah: "${p.right}".`
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (currentQ.type === 'MCQ' && selectedOpt && selectedOpt !== currentQ.correct) {
      const customAnalysis = currentQ.distractorAnalysis?.[selectedOpt];

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PILIHANMU:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
            <p className="font-black text-rose-800 mb-0.5">
              ❌ Kamu memilih: <span className="font-bold text-rose-600">"{selectedOpt}"</span>
            </p>
            <p className="text-[#92400E] bg-amber-50/60 p-1.5 rounded-md border border-amber-200/80">
              💡 <strong>Mengapa opsi ini keliru?</strong> {customAnalysis || (
                `Opsi ini kurang tepat. Jawaban yang benar adalah "${currentQ.correct}". Periksa kembali rumus atau konsep yang ditanyakan pada soal.`
              )}
            </p>
          </div>
        </div>
      );
    }

    if (currentQ.type === 'MCQ_COMPLEX') {
      const correctList = currentQ.correctMultiple || [];
      const missed = correctList.filter(c => !selectedMultiple.includes(c));
      const extraWrong = selectedMultiple.filter(c => !correctList.includes(c));

      if (missed.length === 0 && extraWrong.length === 0) return null;

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN CENTANG:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed space-y-1">
            {extraWrong.length > 0 && (
              <p className="text-rose-800">
                ❌ <strong>Opsi keliru yang kamu centang:</strong> {extraWrong.map(e => `"${e}"`).join(', ')}.
              </p>
            )}
            {missed.length > 0 && (
              <p className="text-[#92400E]">
                ⚠️ <strong>Opsi benar yang belum kamu centang:</strong> {missed.map(m => `"${m}"`).join(', ')}.
              </p>
            )}
          </div>
        </div>
      );
    }

    if (currentQ.type === 'TRUE_FALSE' && selectedOpt && selectedOpt !== currentQ.correct) {
      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PILIHANMU:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
            <p className="text-[#92400E]">
              💡 Kamu memilih <strong>"{selectedOpt}"</strong>. Pernyataan tersebut sebenarnya bernilai <strong>"{currentQ.correct}"</strong>.
            </p>
          </div>
        </div>
      );
    }

    if (currentQ.type === 'INPUT_NUMBER' && inputNumberValue && Number(inputNumberValue) !== Number(currentQ.correct)) {
      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN JAWABAN:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
            <p className="text-[#92400E]">
              💡 Jawaban yang kamu masukkan adalah <strong>"{inputNumberValue}"</strong>. Hasil perhitungan yang benar adalah <strong>"{currentQ.correct}"</strong>. Periksa kembali urutan operasi hitung (perkalian dahulu sebelum penjumlahan/pengurangan).
            </p>
          </div>
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
            try { audioEngine.playClick(); } catch { }
            try { reloVoiceService.stopVoice(); } catch { }
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
            <span>{score} Poin</span>
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
                ? `Waktu habis di Soal #${questionIndex + 1}! Kamu berhasil mengumpulkan skor ${score} Poin. Asah analisismu dan coba lagi! 🔥`
                : `Endless Mode Selesai! Kamu berhasil menuntaskan semua tantangan dengan skor ${score} Poin! 🔥🏆`)
              : (isAnswered && !isCorrect
                ? `Kurang tepat. ${currentQ?.explanation || 'Coba periksa kembali konsepnya!'}`
                : "")
          }
        />

        {/* Right Workspace: Question Card */}
        {currentQ && !gameOver && (
          <div className="flex-1 min-h-0 h-full p-3 sm:p-4 rounded-3xl glass-panel glass-sheen flex flex-col overflow-hidden gap-2 sm:gap-2.5">

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
                {currentQ.type === 'CARTESIAN' && '📍 Koordinat Kartesius'}
                {currentQ.type === 'INPUT_NUMBER' && '🔢 Input Angka'}
                {currentQ.type === 'DRAG_DROP' && '🎯 Kelompokkan Kategori'}
                {currentQ.type === 'TABLE_FILL' && '📝 Lengkapi Tabel'}
                {currentQ.type === 'DETECT_ERROR' && '🔍 Deteksi Kesalahan'}
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

            {/* Answer UI */}
            <div className="flex-1 min-h-0 w-full flex flex-col justify-center items-center py-1 overflow-y-auto no-scrollbar">
              {renderQuestionBody()}
            </div>

            {/* Feedback & Explanation Pop-Up Modal */}
            {isAnswered && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none animate-fade-in">
                <div className={`relative w-full max-w-lg p-4 sm:p-5 rounded-3xl border-4 shadow-[8px_10px_0px_#2D241E] flex flex-col gap-2.5 sm:gap-3 max-h-[92vh] overflow-hidden animate-scale-up ${
                  isCorrect
                    ? 'bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] border-[#059669] text-[#065F46]'
                    : 'bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
                }`}>
                  <div className="flex items-center gap-3 border-b pb-2.5 border-black/10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 shadow-inner ${
                      isCorrect ? 'bg-emerald-500/20 border-emerald-600' : 'bg-rose-500/20 border-rose-600'
                    }`}>
                      {isCorrect
                        ? <CheckCircle2 className="w-7 h-7 text-[#059669]" />
                        : <AlertTriangle className="w-7 h-7 text-[#BE123C]" />}
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-black font-pencil tracking-wide ${
                        isCorrect ? 'text-emerald-950' : 'text-rose-950'
                      }`}>
                        {isCorrect ? '🎉 BENAR! PETUNJUK TEPAT!' : '❌ JAWABAN KURANG TEPAT!'}
                      </h3>
                      <p className={`text-xs sm:text-sm font-bold ${
                        isCorrect ? 'text-emerald-800' : 'text-rose-800'
                      }`}>
                        {isCorrect ? '+10 Poin bertambah ke total skormu!' : 'Simak penjelasan di bawah untuk belajar:'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm font-bold leading-relaxed text-[#2D241E] flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
                    <div className="p-3.5 rounded-2xl bg-white/70 border border-black/10 shadow-xs">
                      <span className="font-black text-xs uppercase tracking-wider block mb-1 text-[#78350F]">
                        📖 Pembahasan Soal #{questionIndex + 1}:
                      </span>
                      <p className="whitespace-pre-line text-sm text-[#2D241E] leading-snug">
                        {currentQ.explanation}
                      </p>
                    </div>

                    {!isCorrect && renderDistractorAnalysis()}
                  </div>

                  <div className="pt-2 flex-shrink-0">
                    <button
                      onClick={handleNextQuestion}
                      className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-base sm:text-xl flex items-center justify-center gap-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-[1.02] active:scale-95"
                    >
                      <ShieldCheck className="w-6 h-6 text-[#D97706]" />
                      <span>
                        {questionIndex < totalQuestions - 1
                          ? `LANJUT KE SOAL #${questionIndex + 2} →`
                          : '🏆 LIHAT HASIL AKHIR →'}
                      </span>
                    </button>
                  </div>
                </div>
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
                <p className="text-2xl sm:text-3xl font-black text-[#D97706]">{score} Poin</p>
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
                  try { audioEngine.playClick(); } catch { }
                  try { reloVoiceService.stopVoice(); } catch { }
                  audioEngine.toggleBgm(true);
                  storageService.updateEndlessHighScore(score);
                  if (onUpdateUser) onUpdateUser(storageService.getCurrentUser());
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
