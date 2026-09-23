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
import { HpbBuilder, TableBuilder, ArrowBuilder2Step, MatchingSlotDiagram } from '../RelationFormsBuilder';

function shuffleArray(arr) {
  if (!arr || arr.length <= 1) return arr ? [...arr] : [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ChapterExercise({ 
  chapterId = 1, 
  currentUser, 
  onBackToStageSelect, 
  onCompleteExercise 
}) {
  const exerciseData = CHAPTER_EXERCISES[chapterId] || CHAPTER_EXERCISES[1];
  const originalQuestions = exerciseData.questions || [];

  // Phase: 'MAIN' | 'COMPLETED'
  const [phase, setPhase] = useState('MAIN');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Remedial state (Soal serupa on-the-spot)
  const [isRemedialActive, setIsRemedialActive] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Stats: first-attempt correct count vs remedial correct count
  const [correctCount, setCorrectCount] = useState(0);
  const [remedialCorrectCount, setRemedialCorrectCount] = useState(0);

  // Answer states
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [arrowConnections, setArrowConnections] = useState([]);
  const [selectedA, setSelectedA] = useState(null);
  const [userCartesianPoints, setUserCartesianPoints] = useState([]);

  // Active question: if isRemedialActive is true and base question has a remedialVariant, use it!
  const isRemedial = isRemedialActive;
  const currentBaseQ = originalQuestions[currentIndex];
  const hasRemedialVariant = Boolean(currentBaseQ?.remedialVariant);
  const currentQ = isRemedialActive && hasRemedialVariant 
    ? { 
        ...currentBaseQ, 
        ...currentBaseQ.remedialVariant,
        title: `🔄 Soal Serupa: ${currentBaseQ.remedialVariant.title || currentBaseQ.title}`,
        isRemedialVersion: true,
        clue: currentBaseQ.remedialVariant.clue || currentBaseQ.remedialVariant.wrongExplanation || currentBaseQ.clue
      }
    : currentBaseQ;

  // Randomized options per question to eliminate predictable answer patterns
  const [shuffledOptions, setShuffledOptions] = useState(() => {
    const q0 = originalQuestions[0];
    if (q0 && q0.options && q0.type !== 'TRUE_FALSE') {
      return shuffleArray(q0.options);
    }
    return q0?.options || [];
  });
  const [shuffledMatchingOptions, setShuffledMatchingOptions] = useState({});
  const [shuffledTokens, setShuffledTokens] = useState(() => {
    const q0 = originalQuestions[0];
    return q0?.tokens ? shuffleArray(q0.tokens) : [];
  });

  // Interactive mechanics states: Drag & Drop (Categories) & Slot Fill (Tokens)
  const [dragDropMapping, setDragDropMapping] = useState({});
  const [selectedDragItem, setSelectedDragItem] = useState(null);
  const [slotFillValues, setSlotFillValues] = useState({});
  const [selectedSlotToken, setSelectedSlotToken] = useState(null);

  // 2-Step Arrow Diagram states (Menempatkan nama anggota himpunan)
  const [arrowPlacedA, setArrowPlacedA] = useState({});
  const [arrowPlacedB, setArrowPlacedB] = useState({});

  // Dynamic feedback hint for open-ended validation mistakes
  const [dynamicClue, setDynamicClue] = useState(null);

  const totalMainQuestions = originalQuestions.length;

  useEffect(() => {
    try {
      audioEngine.toggleBgm(true);
    } catch {}
    return () => {
      try { reloVoiceService.stopVoice(); } catch {}
    };
  }, []);

  // Reset answer states & randomize options on question switch
  useEffect(() => {
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedOpt(null);
    setSelectedMultiple([]);
    setMatchingAnswers({});
    setArrowConnections([]);
    setSelectedA(null);
    setUserCartesianPoints([]);
    setDragDropMapping({});
    setSelectedDragItem(null);
    setSlotFillValues({});
    setSelectedSlotToken(null);
    setArrowPlacedA({});
    setArrowPlacedB({});
    setDynamicClue(null);

    // Randomize option order to eliminate predictable diagonal/positional patterns
    if (currentQ) {
      if (currentQ.type === 'TRUE_FALSE') {
        setShuffledOptions(currentQ.options || ['Benar', 'Salah']);
      } else if (currentQ.options && currentQ.options.length > 0) {
        setShuffledOptions(shuffleArray(currentQ.options));
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
          // If still at diagonal index by extreme chance, explicitly swap with adjacent position
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

      // Randomize token order for slot-based & builder questions (ensuring all needed answer duplicates exist)
      if (currentQ.tokens && currentQ.tokens.length > 0) {
        const rawTokens = currentQ.tokens || [];
        const slots = currentQ.slots || [];
        const neededCounts = {};
        slots.forEach(s => {
          const ans = s.answer ?? currentQ.correctSlots?.[s.id];
          if (ans !== undefined && ans !== null) {
            const key = String(ans).trim();
            if (key) neededCounts[key] = (neededCounts[key] || 0) + 1;
          }
        });
        const availableCounts = {};
        rawTokens.forEach(t => {
          const key = String(t).trim();
          availableCounts[key] = (availableCounts[key] || 0) + 1;
        });
        const fullTokens = [...rawTokens];
        for (const [ans, needed] of Object.entries(neededCounts)) {
          const current = availableCounts[ans] || 0;
          if (current < needed) {
            for (let i = 0; i < (needed - current); i++) {
              fullTokens.push(ans);
            }
          }
        }
        setShuffledTokens(shuffleArray(fullTokens));
      } else {
        setShuffledTokens([]);
      }
    }
  }, [currentIndex, isRemedialActive, retryCount, phase, currentQ?.id, currentQ?.question, currentQ?.isRemedialVersion]);

  // Mascot guidance reaction
  const getMascotProps = () => {
    if (phase === 'COMPLETED') {
      const totalCorrect = correctCount + remedialCorrectCount;
      const finalScore = Math.min(100, Math.round((totalCorrect / totalMainQuestions) * 100));
      const isPassed = finalScore >= 85;

      if (isPassed) {
        return {
          pose: 'celebrating',
          emotion: 'happy',
          title: 'DETEKTIF RELO BANGGA!',
          icon: '🏆',
          message: `Luar biasa! Skor kamu ${finalScore}% (Tuntas ≥ 85%). Kamu telah menuntaskan seluruh latihan ${exerciseData.title}! Chapter berikutnya siap dipelajari! 🎉🦉`
        };
      } else {
        return {
          pose: 'thinking',
          emotion: 'error',
          title: 'BELUM MEMENUHI SYARAT',
          icon: '💡',
          message: `Skor kamu ${finalScore}%. Syarat membuka Chapter berikutnya adalah minimal 85%. Jangan berkecil hati, ayo ulangi dan raih nilai terbaikmu! 🔍`
        };
      }
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
          title: 'PENJELASAN KESALAHAN',
          icon: '💡',
          message: dynamicClue ? dynamicClue : (currentQ?.wrongExplanation ? currentQ.wrongExplanation : (currentQ?.clue ? `Petunjuk: ${currentQ.clue}` : 'Kurang tepat. Pelajari penjelasannya dan selesaikan soal serupa ini!'))
        };
      }
    }
    return {
      pose: 'standing',
      emotion: 'idle',
      title: isRemedialActive ? 'SOAL SERUPA (PERBAIKAN)' : 'LATIHAN PEMAHAMAN',
      icon: isRemedialActive ? '🔄' : '📖',
      message: isRemedialActive 
        ? 'Ayo selesaikan soal serupa ini dengan teliti! Buktikan pemahamanmu sebelum lanjut ke soal berikutnya! 🦉'
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
    if (!isRemedialActive) {
      setCorrectCount(prev => prev + 1);
    } else {
      setRemedialCorrectCount(prev => prev + 1);
    }
  };

  const handleWrong = (customClue = null) => {
    audioEngine.playError();
    if (customClue) {
      setDynamicClue(customClue);
    }
    setIsCorrect(false);
    setIsAnswered(true);
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
    const allCorrect = currentQ.pairs.every(p => matchingAnswers[p.left] === p.right);
    if (allCorrect) handleCorrect();
    else handleWrong();
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

    // 1. Open-Ended Function Evaluator (Chapter 2 / Bank Soal)
    if (currentQ.ruleType === 'OPEN_ENDED_FUNCTION') {
      const setA = currentQ.setA || [];
      const outCounts = {};
      setA.forEach(a => { outCounts[String(a)] = 0; });

      arrowConnections.forEach(pair => {
        const [a] = pair.split('->');
        if (outCounts[String(a)] !== undefined) {
          outCounts[String(a)] += 1;
        }
      });

      const emptyA = setA.filter(a => outCounts[String(a)] === 0);
      if (emptyA.length > 0) {
        handleWrong(`Belum lengkap! Anggota [ ${emptyA.join(', ')} ] belum memiliki pasangan. Ingat: pada FUNGSI, SEMUA anggota daerah asal (domain) wajib memiliki pasangan!`);
        return;
      }

      const branchingA = setA.filter(a => outCounts[String(a)] > 1);
      if (branchingA.length > 0) {
        handleWrong(`Kurang tepat! Anggota [ ${branchingA.join(', ')} ] memiliki ${outCounts[String(branchingA[0])]} cabang panah. Ingat: pada FUNGSI, anggota daerah asal TIDAK BOLEH bercabang/mendua (harus tepat satu pasangan)!`);
        return;
      }

      // Valid Function!
      handleCorrect();
      return;
    }

    // 2. Open-Ended Bijection Evaluator (Chapter 5 Korespondensi Satu-Satu)
    if (currentQ.ruleType === 'OPEN_ENDED_BIJECTION') {
      const setA = currentQ.setA || [];
      const setB = currentQ.setB || [];
      const outCounts = {};
      const inCounts = {};
      setA.forEach(a => { outCounts[String(a)] = 0; });
      setB.forEach(b => { inCounts[String(b)] = 0; });

      arrowConnections.forEach(pair => {
        const [a, b] = pair.split('->');
        if (outCounts[String(a)] !== undefined) outCounts[String(a)] += 1;
        if (inCounts[String(b)] !== undefined) inCounts[String(b)] += 1;
      });

      // Check Domain (A)
      const emptyA = setA.filter(a => outCounts[String(a)] === 0);
      if (emptyA.length > 0) {
        handleWrong(`Belum lengkap! Anggota asal [ ${emptyA.join(', ')} ] belum terhubung panah. Pada korespondensi satu-satu, semua anggota domain wajib punya pasangan!`);
        return;
      }

      const branchingA = setA.filter(a => outCounts[String(a)] > 1);
      if (branchingA.length > 0) {
        handleWrong(`Kurang tepat! Anggota asal [ ${branchingA.join(', ')} ] memiliki lebih dari satu cabang panah. Korespondensi satu-satu melarang percabangan pada domain!`);
        return;
      }

      // Check Kodomain (B)
      const multiB = setB.filter(b => inCounts[String(b)] > 1);
      if (multiB.length > 0) {
        handleWrong(`Kurang tepat! Anggota kawan [ ${multiB.join(', ')} ] diperebutkan oleh lebih dari satu anggota asal. Pada korespondensi satu-satu, daerah kawan juga harus tepat satu (tidak boleh berebut/dobel)!`);
        return;
      }

      const emptyB = setB.filter(b => inCounts[String(b)] === 0);
      if (emptyB.length > 0) {
        handleWrong(`Belum lengkap! Anggota kawan [ ${emptyB.join(', ')} ] belum terpasang. Pada korespondensi satu-satu, semua anggota daerah kawan wajib memiliki pasangan!`);
        return;
      }

      // Perfect Bijection!
      handleCorrect();
      return;
    }

    // 3. Open-Ended Relation Evaluator (Chapter 1)
    if (currentQ.ruleType === 'OPEN_ENDED_RELATION') {
      const minConn = currentQ.minConnections || 1;
      if (arrowConnections.length < minConn) {
        handleWrong(`Hubungkan minimal ${minConn} panah relasi dari Himpunan A ke Himpunan B!`);
        return;
      }
      handleCorrect();
      return;
    }

    // Default: exact pairs match
    const normalizePair = (str) => {
      const parts = String(str || '').split('->');
      return parts.length >= 2 ? `${parts[0].trim()}->${parts[1].trim()}` : String(str || '').trim();
    };
    const normCorrectPairs = (currentQ.correctPairs || []).map(normalizePair);
    const normUserPairs = (arrowConnections || []).map(normalizePair);
    const isAllCorrect =
      normCorrectPairs.length === normUserPairs.length &&
      normCorrectPairs.every(p => normUserPairs.includes(p)) &&
      normUserPairs.every(p => normCorrectPairs.includes(p));
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
      return exists
        ? prev.filter(([px, py]) => !(Number(px) === numX && Number(py) === numY))
        : [...prev, [numX, numY]];
    });
  };

  const handleConfirmCartesian = () => {
    if (isAnswered || !currentQ) return;

    // Open-Ended Cartesian Line Evaluator (Chapter 4)
    if (currentQ.ruleType === 'OPEN_ENDED_CARTESIAN_LINE') {
      const minPoints = currentQ.minPoints || 2;
      if (userCartesianPoints.length < minPoints) {
        handleWrong(`Tandai minimal ${minPoints} titik koordinat pada bidang Kartesius yang dilalui garis fungsi!`);
        return;
      }

      const slope = Number(currentQ.slope ?? 1);
      const intercept = Number(currentQ.intercept ?? 0);
      const formulaFn = currentQ.formulaFn ? currentQ.formulaFn : ((x) => slope * x + intercept);

      const invalidPoints = userCartesianPoints.filter(([x, y]) => {
        const expectedY = formulaFn(Number(x));
        return Number(y) !== expectedY;
      });

      if (invalidPoints.length > 0) {
        const [badX, badY] = invalidPoints[0];
        const formulaLabel = currentQ.formulaLabel || `y = ${slope}x ${intercept >= 0 ? '+ ' + intercept : '- ' + Math.abs(intercept)}`;
        handleWrong(`Titik (${badX}, ${badY}) tidak berada pada garis ${formulaLabel} (karena saat x=${badX}, nilai y seharusnya ${formulaFn(Number(badX))}).`);
        return;
      }

      // All chosen points lie on the line!
      handleCorrect();
      return;
    }

    const targets = currentQ.targetPoints || [];
    const isAllCorrect =
      targets.length === userCartesianPoints.length &&
      userCartesianPoints.every(([ux, uy]) =>
        targets.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy))
      );
    if (isAllCorrect) handleCorrect();
    else handleWrong();
  };

  // DRAG_DROP Handlers (Memindahkan Kartu ke Zona/Kotak Target)
  const handleDragDropAssign = (item, category) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setDragDropMapping(prev => ({ ...prev, [item]: category }));
    setSelectedDragItem(null);
  };

  const handleDragDropRemove = (item) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setDragDropMapping(prev => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
  };

  const handleConfirmDragDrop = () => {
    if (isAnswered || !currentQ) return;
    const items = currentQ.items || [];
    const correctMap = currentQ.correctMapping || {};
    const allAssigned = items.length > 0 && items.every(it => dragDropMapping[it]);
    if (!allAssigned) return;

    const allCorrect = items.every(it => dragDropMapping[it] === correctMap[it]);
    if (allCorrect) handleCorrect();
    else handleWrong();
  };

  // SLOT_FILL Handlers (Memindahkan Token Angka/Simbol ke Slot Kosong)
  const handleSlotAssign = (slotId, tokenVal) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setSlotFillValues(prev => ({ ...prev, [slotId]: tokenVal }));
    setSelectedSlotToken(null);
  };

  const handleSlotRemove = (slotId) => {
    if (isAnswered) return;
    audioEngine.playClick();
    setSlotFillValues(prev => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  const handleConfirmSlotFill = () => {
    if (isAnswered || !currentQ) return;
    const slots = currentQ.slots || [];
    const allFilled = slots.length > 0 && slots.every(s => slotFillValues[s.id]);
    if (!allFilled) return;

    const allCorrect = slots.every(s => String(slotFillValues[s.id]) === String(s.answer));
    if (allCorrect) handleCorrect();
    else handleWrong();
  };

  // ── HPB_BUILDER Handlers (Himpunan Pasangan Berurutan) ─────────────
  const handleConfirmHpb = () => {
    if (isAnswered || !currentQ) return;
    const pairs = currentQ.pairs || [];
    const allFilled = pairs.length > 0 && pairs.every(p => {
      const hasX = p.fixedX !== null && p.fixedX !== undefined ? true : Boolean(slotFillValues[p.idX]);
      const hasY = p.fixedY !== null && p.fixedY !== undefined ? true : Boolean(slotFillValues[p.idY]);
      return hasX && hasY;
    });
    if (!allFilled) return;

    const allCorrect = pairs.every(p => {
      const checkX = p.fixedX !== null && p.fixedX !== undefined ? true : String(slotFillValues[p.idX]) === String(p.ansX);
      const checkY = p.fixedY !== null && p.fixedY !== undefined ? true : String(slotFillValues[p.idY]) === String(p.ansY);
      return checkX && checkY;
    });
    if (allCorrect) handleCorrect();
    else handleWrong();
  };

  // ── TABLE_BUILDER Handlers (Tabel Relasi) ──────────────────────────
  const handleConfirmTable = () => {
    if (isAnswered || !currentQ) return;
    const rows = currentQ.rows || [];
    const allFilled = rows.length > 0 && rows.every(r => {
      const hasX = !r.isSlotX ? true : Boolean(slotFillValues[r.idX]);
      const hasY = !r.isSlotY ? true : Boolean(slotFillValues[r.idY]);
      return hasX && hasY;
    });
    if (!allFilled) return;

    const allCorrect = rows.every(r => {
      const checkX = !r.isSlotX ? true : String(slotFillValues[r.idX]) === String(r.valX);
      const checkY = !r.isSlotY ? true : String(slotFillValues[r.idY]) === String(r.valY);
      return checkX && checkY;
    });
    if (allCorrect) handleCorrect();
    else handleWrong();
  };

  // ── ARROW_BUILDER_2STEP Handlers (Nama Anggota + Sambung Tali Panah)
  const handleArrowSlotAssign = (setKey, slotIdx, token) => {
    if (isAnswered) return;
    audioEngine.playClick();
    if (setKey === 'A') {
      setArrowPlacedA(prev => ({ ...prev, [slotIdx]: token }));
    } else {
      setArrowPlacedB(prev => ({ ...prev, [slotIdx]: token }));
    }
  };

  const handleArrowSlotRemove = (setKey, slotIdx) => {
    if (isAnswered) return;
    audioEngine.playClick();
    if (setKey === 'A') {
      setArrowPlacedA(prev => {
        const copy = { ...prev };
        delete copy[slotIdx];
        return copy;
      });
    } else {
      setArrowPlacedB(prev => {
        const copy = { ...prev };
        delete copy[slotIdx];
        return copy;
      });
    }
  };

  const handleConfirmArrow2Step = () => {
    if (isAnswered || !currentQ) return;
    const expA = currentQ.expectedSetA || [];
    const expB = currentQ.expectedSetB || [];
    
    // Step 1: all elements placed match set A and set B (unordered mathematical set equality)
    const placedValsA = Object.values(arrowPlacedA || {}).map(v => String(v).trim()).filter(Boolean);
    const placedValsB = Object.values(arrowPlacedB || {}).map(v => String(v).trim()).filter(Boolean);
    const expAStrings = expA.map(v => String(v).trim());
    const expBStrings = expB.map(v => String(v).trim());

    const isAllA = expAStrings.length > 0 &&
      expAStrings.length === placedValsA.length &&
      [...expAStrings].sort().every((v, i) => v === [...placedValsA].sort()[i]);

    const isAllB = expBStrings.length > 0 &&
      expBStrings.length === placedValsB.length &&
      [...expBStrings].sort().every((v, i) => v === [...placedValsB].sort()[i]);

    if (!isAllA || !isAllB) {
      handleWrong('Lengkapi penempatan nama anggota di Himpunan A dan B dengan benar terlebih dahulu!');
      return;
    }

    const normalizePair = (str) => {
      const parts = String(str || '').split('->');
      return parts.length >= 2 ? `${parts[0].trim()}->${parts[1].trim()}` : String(str || '').trim();
    };

    // Step 2: Open-ended rule checks
    if (currentQ.ruleType === 'OPEN_ENDED_RELATION') {
      const minConn = currentQ.minConnections || 1;
      if (arrowConnections.length < minConn) {
        handleWrong(`Hubungkan minimal ${minConn} tali panah relasi!`);
        return;
      }
      handleCorrect();
      return;
    }

    if (currentQ.ruleType === 'OPEN_ENDED_FUNCTION') {
      const outCounts = {};
      expAStrings.forEach(a => { outCounts[a] = 0; });
      arrowConnections.forEach(pair => {
        const [a] = pair.split('->').map(s => (s || '').trim());
        if (outCounts[a] !== undefined) outCounts[a] += 1;
      });

      const emptyA = expAStrings.filter(a => outCounts[a] === 0);
      if (emptyA.length > 0) {
        handleWrong(`Belum lengkap! Anggota [ ${emptyA.join(', ')} ] belum memiliki pasangan panah.`);
        return;
      }
      const multiA = expAStrings.filter(a => outCounts[a] > 1);
      if (multiA.length > 0) {
        handleWrong(`Kurang tepat! Anggota [ ${multiA.join(', ')} ] memiliki lebih dari satu panah. Pada fungsi, daerah asal tidak boleh bercabang!`);
        return;
      }
      handleCorrect();
      return;
    }

    if (currentQ.ruleType === 'OPEN_ENDED_BIJECTION') {
      const outCounts = {};
      const inCounts = {};
      expAStrings.forEach(a => { outCounts[a] = 0; });
      expBStrings.forEach(b => { inCounts[b] = 0; });
      arrowConnections.forEach(pair => {
        const [a, b] = pair.split('->').map(s => (s || '').trim());
        if (outCounts[a] !== undefined) outCounts[a] += 1;
        if (inCounts[b] !== undefined) inCounts[b] += 1;
      });

      const emptyA = expAStrings.filter(a => outCounts[a] === 0);
      if (emptyA.length > 0) {
        handleWrong(`Belum lengkap! Anggota asal [ ${emptyA.join(', ')} ] belum memiliki pasangan.`);
        return;
      }
      const multiA = expAStrings.filter(a => outCounts[a] > 1);
      if (multiA.length > 0) {
        handleWrong(`Kurang tepat! Anggota asal [ ${multiA.join(', ')} ] bercabang. Korespondensi satu-satu melarang percabangan!`);
        return;
      }
      const multiB = expBStrings.filter(b => inCounts[b] > 1);
      if (multiB.length > 0) {
        handleWrong(`Kurang tepat! Anggota kawan [ ${multiB.join(', ')} ] diperebutkan oleh lebih dari satu anggota asal.`);
        return;
      }
      const emptyB = expBStrings.filter(b => inCounts[b] === 0);
      if (emptyB.length > 0) {
        handleWrong(`Belum lengkap! Anggota kawan [ ${emptyB.join(', ')} ] belum memiliki pasangan.`);
        return;
      }

      handleCorrect();
      return;
    }

    // Default: all connections match correctPairs
    const normCorrectPairs = (currentQ.correctPairs || []).map(normalizePair);
    const normUserPairs = (arrowConnections || []).map(normalizePair);

    const isAllConnections =
      normCorrectPairs.length === normUserPairs.length &&
      normCorrectPairs.every(p => normUserPairs.includes(p)) &&
      normUserPairs.every(p => normCorrectPairs.includes(p));

    if (isAllConnections) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // Handle try similar question when wrong
  const handleTrySimilar = () => {
    audioEngine.playClick();
    if (!isRemedialActive) {
      setIsRemedialActive(true);
      setRetryCount(0);
    } else {
      setRetryCount(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedOpt(null);
      setSelectedMultiple([]);
      setMatchingAnswers({});
      setArrowConnections([]);
      setSelectedA(null);
      setUserCartesianPoints([]);
      setDragDropMapping({});
      setSelectedDragItem(null);
      setSlotFillValues({});
      setSelectedSlotToken(null);
      setArrowPlacedA({});
      setArrowPlacedB({});
      setDynamicClue(null);
      if (currentQ?.options && currentQ.options.length > 0 && currentQ.type !== 'TRUE_FALSE') {
        setShuffledOptions(shuffleArray(currentQ.options));
      }
      if (currentQ?.tokens && currentQ.tokens.length > 0) {
        setShuffledTokens(shuffleArray(currentQ.tokens));
      }
    }
  };

  // Advance to next question (only available after answered correctly)
  const handleNext = () => {
    audioEngine.playClick();
    if (currentIndex < totalMainQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRemedialActive(false);
      setRetryCount(0);
    } else {
      finishExercise();
    }
  };

  const finishExercise = async () => {
    // Score calculation: 100% for 1st-try correct, 85% for remedial mastery
    const rawScore = ((correctCount * 100) + (remedialCorrectCount * 85)) / totalMainQuestions;
    const finalScore = Math.min(100, Math.round(rawScore));
    const passed = finalScore >= 85;

    if (passed) {
      audioEngine.playVictoryMusic();
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      audioEngine.playError();
    }

    setPhase('COMPLETED');
    try {
      await storageService.updateExerciseProgress(chapterId, finalScore, passed);
      if (onCompleteExercise) onCompleteExercise(chapterId, finalScore, passed);
    } catch (e) {
      console.error('Error saving exercise progress:', e);
    }
  };

  const handleRestartExercise = () => {
    audioEngine.playClick();
    setPhase('MAIN');
    setCurrentIndex(0);
    setIsRemedialActive(false);
    setRetryCount(0);
    setCorrectCount(0);
    setRemedialCorrectCount(0);
    setIsAnswered(false);
    setIsCorrect(false);
    const q0 = originalQuestions[0];
    if (q0 && q0.options && q0.type !== 'TRUE_FALSE') {
      setShuffledOptions(shuffleArray(q0.options));
    }
    if (q0 && q0.tokens && q0.tokens.length > 0) {
      setShuffledTokens(shuffleArray(q0.tokens));
    }
  };

  const mascotInfo = getMascotProps();

  // ── Render Question Body per Type ──────────────────────────────────
  const renderQuestionBody = () => {
    if (!currentQ) return null;

    const displayedOptions = (shuffledOptions && shuffledOptions.length > 0) ? shuffledOptions : (currentQ.options || []);

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
              {displayedOptions.map((opt, idx) => {
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
              {displayedOptions.map((opt, idx) => {
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
              {displayedOptions.map((opt, idx) => {
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
          {displayedOptions.map((opt, idx) => {
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
            {displayedOptions.map((opt, idx) => {
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
              className="pencil-btn w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Jawaban</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'MATCHING') {
      const activeRightOptions = currentQ.rightOptions || Array.from(new Set(currentQ.pairs.map(p => p.right)));

      return (
        <div className="space-y-2">
          <MatchingSlotDiagram
            pairs={currentQ.pairs}
            rightOptions={activeRightOptions}
            answers={matchingAnswers}
            onSelectPair={handleMatchingSelect}
            onRemovePair={handleMatchingRemove}
            isAnswered={isAnswered}
            labelA={currentQ.labelA || "Himpunan A"}
            labelB={currentQ.labelB || "Himpunan B (Kotak Jawaban)"}
          />

          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-2 sm:py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 flex-shrink-0"
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
              className="pencil-btn w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 flex-shrink-0"
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
          <div className="flex flex-wrap items-center justify-between gap-1 px-1">
            <p className="text-xs sm:text-sm font-black text-[#2563EB] uppercase tracking-wide flex items-center gap-1.5">
              <span>📍</span>
              <span>Klik persilangan kisi untuk menandai koordinat!</span>
            </p>
            {userCartesianPoints.length > 0 && (
              <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-lg border border-amber-300">
                Terpilih: {userCartesianPoints.map(([x, y]) => {
                  const nameX = currentQ.xLabels?.[x] || x;
                  const nameY = currentQ.yLabels?.[y] || y;
                  return `(${nameX}, ${nameY})`;
                }).join(', ')}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center mx-auto w-full py-0.5">
            <RelationCartesianCanvas
              minX={currentQ.minX ?? 0}
              maxX={currentQ.maxX ?? 6}
              minY={currentQ.minY ?? 0}
              maxY={currentQ.maxY ?? 8}
              labelX={currentQ.labelX || 'Sumbu X (Asal)'}
              labelY={currentQ.labelY || 'Sumbu Y (Kawan)'}
              xLabels={currentQ.xLabels || null}
              yLabels={currentQ.yLabels || null}
              points={userCartesianPoints}
              userPoints={userCartesianPoints}
              onTogglePoint={handleToggleCartesianPoint}
              onPointToggle={handleToggleCartesianPoint}
              compact={true}
              showCoordinateBadges={false}
              disabled={isAnswered}
              readOnly={isAnswered}
            />
          </div>
          {!isAnswered && (
            <div className="flex gap-2 w-full max-w-[360px] sm:max-w-[400px] mx-auto">
              <button
                onClick={() => setUserCartesianPoints([])}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm rounded-xl cursor-pointer transition"
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

    // ── 5. DRAG_DROP (Memindahkan Kartu Objek ke Zona Target) ─────────
    if (currentQ.type === 'DRAG_DROP') {
      const items = currentQ.items || [];
      const categories = currentQ.categories || [];
      const correctMap = currentQ.correctMapping || {};
      const allAssigned = items.length > 0 && items.every(it => dragDropMapping[it]);
      const unassignedItems = items.filter(it => !dragDropMapping[it]);

      return (
        <div className="flex flex-col h-full gap-2 py-0.5 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
            <div className="text-center">
              <span className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide">
                🎯 {currentQ.subInstruction || "Pindahkan setiap kartu ke kotak kategori yang tepat!"}
              </span>
              <p className="text-[11px] sm:text-xs text-[#78350F] font-bold">
                💡 Cara: Klik kartu lalu klik kotak target, atau geser (drag) langsung ke dalam kotak.
              </p>
            </div>

            {/* Kotak-kotak Kategori (Drop Zones) */}
            <div className={`grid grid-cols-1 ${categories.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2`}>
              {categories.map((cat, cIdx) => {
                const catItems = items.filter(it => dragDropMapping[it] === cat);
                const isTargetActive = selectedDragItem !== null;
                
                const catColors = [
                  'bg-emerald-50/90 border-emerald-400 text-emerald-950',
                  'bg-rose-50/90 border-rose-400 text-rose-950',
                  'bg-sky-50/90 border-sky-400 text-sky-950'
                ];
                const boxStyle = catColors[cIdx % catColors.length];

                return (
                  <div
                    key={cIdx}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const itemData = e.dataTransfer.getData('text/plain');
                      if (itemData) handleDragDropAssign(itemData, cat);
                    }}
                    onClick={() => {
                      if (selectedDragItem) {
                        handleDragDropAssign(selectedDragItem, cat);
                      }
                    }}
                    className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all min-h-[75px] sm:min-h-[85px] max-h-[130px] overflow-y-auto no-scrollbar flex flex-col justify-between ${boxStyle} ${
                      isTargetActive ? 'ring-2 ring-amber-400 border-amber-500 cursor-pointer shadow-md' : 'shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1">
                      <span className="font-black text-xs sm:text-sm tracking-wide uppercase">{cat}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/80 border border-black/10">
                        {catItems.length}
                      </span>
                    </div>

                    {/* Items placed in this category */}
                    <div className="flex flex-wrap gap-1.5 flex-1 items-start py-1">
                      {catItems.map((item, itIdx) => {
                        const isItemCorrect = isAnswered && correctMap[item] === cat;
                        let badgeStyle = 'bg-white text-gray-800 border-gray-300';
                        if (isAnswered) {
                          badgeStyle = isItemCorrect
                            ? 'bg-emerald-200 border-emerald-500 text-emerald-900'
                            : 'bg-rose-200 border-rose-500 text-rose-900';
                        }

                        return (
                          <span
                            key={itIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isAnswered) handleDragDropRemove(item);
                            }}
                            className={`px-2 py-1 rounded-xl text-xs sm:text-[13px] font-pencil font-black border shadow-xs flex items-center gap-1.5 transition ${badgeStyle} ${
                              !isAnswered ? 'cursor-pointer hover:bg-rose-100 hover:border-rose-300 hover:scale-95' : ''
                            }`}
                            title={!isAnswered ? "Klik untuk mengembalikan kartu" : ""}
                          >
                            <span>{item}</span>
                            {!isAnswered && <span className="text-gray-400 text-xs font-bold">✕</span>}
                          </span>
                        );
                      })}
                      {catItems.length === 0 && (
                        <span className="text-xs text-gray-400 italic self-center mx-auto py-2">
                          {isTargetActive ? "Ketuk untuk taruh kartu di sini" : "Kotak kosong"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Baki Kartu yang Belum Dipindahkan (Unassigned Items Tray) */}
            <div className="p-2 rounded-2xl bg-amber-50/90 border border-amber-300">
              <span className="text-[11px] font-black text-[#78350F] uppercase tracking-wider block mb-1">
                📦 PILIHAN KARTU ({unassignedItems.length} TERSISA):
              </span>
              <div className="flex flex-wrap gap-1.5 min-h-[40px] items-center">
                {unassignedItems.map((item, idx) => {
                  const isSelected = selectedDragItem === item;
                  return (
                    <div
                      key={idx}
                      draggable={!isAnswered}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', item);
                      }}
                      onClick={() => {
                        if (!isAnswered) {
                          setSelectedDragItem(prev => prev === item ? null : item);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl font-pencil font-black text-xs sm:text-sm border-2 cursor-pointer transition-all select-none ${
                        isSelected
                          ? 'bg-amber-300 border-amber-600 text-amber-950 scale-105 shadow-md ring-2 ring-amber-400 animate-pulse'
                          : 'bg-white border-amber-300 text-gray-800 hover:border-amber-500 hover:shadow-xs hover:scale-102'
                      }`}
                    >
                      <span>{item}</span>
                    </div>
                  );
                })}
                {unassignedItems.length === 0 && (
                  <span className="text-xs font-bold text-emerald-700 py-1 flex items-center gap-1">
                    ✓ Semua kartu telah ditempatkan! Silakan periksa atau klik Konfirmasi.
                  </span>
                )}
              </div>
            </div>
          </div>

          {!isAnswered && (
            <div className="pt-1.5 flex-shrink-0">
              <button
                onClick={handleConfirmDragDrop}
                disabled={!allAssigned}
                className={`pencil-btn w-full py-2.5 px-4 font-black text-sm sm:text-base flex items-center justify-center gap-2 rounded-2xl shadow-[2px_3px_0px_#2D241E] transition-all cursor-pointer ${
                  allAssigned
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white animate-pulse ring-2 ring-emerald-400/80 shadow-md scale-[1.01]'
                    : 'bg-stone-200 text-stone-500 opacity-60 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{allAssigned ? '✓ Konfirmasi Jawaban Pengelompokan' : `Tempatkan Semua Kartu (${items.length - unassignedItems.length}/${items.length})`}</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // ── 6. SLOT_FILL (Memindahkan Token ke Slot Kosong) ───────────────
    if (currentQ.type === 'SLOT_FILL') {
      const tokens = shuffledTokens.length > 0 ? shuffledTokens : (currentQ.tokens || []);
      const slots = currentQ.slots || [];
      const allFilled = slots.length > 0 && slots.every(s => slotFillValues[s.id]);

      return (
        <div className="space-y-2 py-1 max-w-xl mx-auto w-full">
          <div className="text-center">
            <span className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wide">
              🧩 {currentQ.subInstruction || "Pindahkan kartu angka yang tepat ke dalam kotak pasangan!"}
            </span>
          </div>

          {/* Slot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slots.map((s, sIdx) => {
              const currentVal = slotFillValues[s.id];
              const isSlotActive = selectedSlotToken !== null;
              const isCorrectSlot = isAnswered && String(currentVal) === String(s.answer);

              let slotStyle = 'bg-white/95 border-amber-300';
              if (isAnswered) {
                slotStyle = isCorrectSlot ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500';
              } else if (currentVal) {
                slotStyle = 'bg-amber-100/90 border-amber-500';
              } else if (isSlotActive) {
                slotStyle = 'bg-amber-50 border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300';
              }

              return (
                <div
                  key={sIdx}
                  onClick={() => {
                    if (isAnswered) return;
                    if (selectedSlotToken) {
                      handleSlotAssign(s.id, selectedSlotToken);
                    } else if (currentVal) {
                      handleSlotRemove(s.id);
                    }
                  }}
                  className={`p-2.5 rounded-2xl border-2 flex items-center justify-between gap-2 transition cursor-pointer ${slotStyle}`}
                >
                  <span className="text-xs sm:text-sm font-black text-[#2D241E] font-pencil">
                    {s.label}
                  </span>
                  <div className="min-w-[50px] h-[34px] px-2.5 rounded-xl border flex items-center justify-center font-mono font-black text-sm bg-white shadow-inner">
                    {currentVal ? (
                      <span className="text-amber-900 font-bold">{currentVal}</span>
                    ) : (
                      <span className="text-gray-300 text-xs">[ ? ]</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Token Tray - hanya tampil saat siswa aktif menjawab */}
          {!isAnswered && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/95 border-2 border-amber-300 shadow-sm flex-shrink-0">
              <span className="text-xs sm:text-sm font-black text-[#78350F] uppercase tracking-wider block mb-1.5">
                🔘 PILIHAN KARTU JAWABAN:
              </span>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {(() => {
                  const assignedCounts = Object.values(slotFillValues).reduce((acc, t) => {
                    acc[t] = (acc[t] || 0) + 1;
                    return acc;
                  }, {});
                  const seenCounts = {};

                  return tokens.map((token, tIdx) => {
                    seenCounts[token] = (seenCounts[token] || 0) + 1;
                    const isUsed = seenCounts[token] <= (assignedCounts[token] || 0);
                    const isSelected = selectedSlotToken === token;
                    return (
                      <button
                        key={tIdx}
                        disabled={isAnswered || isUsed}
                        onClick={() => {
                          setSelectedSlotToken(prev => prev === token ? null : token);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl font-mono font-black text-sm border-2 transition-all cursor-pointer ${
                          isUsed
                            ? 'opacity-30 bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-amber-300 border-amber-600 text-amber-950 scale-110 shadow-md ring-2 ring-amber-400 animate-pulse'
                            : 'bg-white border-amber-300 text-gray-800 hover:border-amber-400 hover:scale-105'
                        }`}
                      >
                        <span>{token}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {!isAnswered && (
            <button
              onClick={handleConfirmSlotFill}
              disabled={!allFilled}
              className="pencil-btn w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Jawaban</span>
            </button>
          )}
        </div>
      );
    }

    // ── 7. HPB_BUILDER (Himpunan Pasangan Berurutan Taktil) ───────────
    if (currentQ.type === 'HPB_BUILDER') {
      const pairs = currentQ.pairs || [];
      const allFilled = pairs.length > 0 && pairs.every(p => {
        const hasX = p.fixedX !== null && p.fixedX !== undefined ? true : Boolean(slotFillValues[p.idX]);
        const hasY = p.fixedY !== null && p.fixedY !== undefined ? true : Boolean(slotFillValues[p.idY]);
        return hasX && hasY;
      });

      return (
        <div className="space-y-3">
          <HpbBuilder
            key={`hpb-${currentQ.id || currentIndex}-${isRemedialActive ? 'remedial' : 'main'}-${retryCount}`}
            setName={currentQ.setName || 'R'}
            pairs={pairs}
            tokens={shuffledTokens.length > 0 ? shuffledTokens : (currentQ.tokens || [])}
            values={slotFillValues}
            onAssign={handleSlotAssign}
            onRemove={handleSlotRemove}
            readOnly={isAnswered}
            isAnswered={isAnswered}
            subInstruction={currentQ.subInstruction}
          />
          {!isAnswered && (
            <button
              onClick={handleConfirmHpb}
              disabled={!allFilled}
              className="pencil-btn w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-base sm:text-lg disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 max-w-2xl mx-auto flex-shrink-0"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Konfirmasi Himpunan Pasangan Berurutan</span>
            </button>
          )}
        </div>
      );
    }

    // ── 8. TABLE_BUILDER (Tabel Relasi Taktil) ────────────────────────
    if (currentQ.type === 'TABLE_BUILDER') {
      const rows = currentQ.rows || [];
      const allFilled = rows.length > 0 && rows.every(r => {
        const hasX = !r.isSlotX ? true : Boolean(slotFillValues[r.idX]);
        const hasY = !r.isSlotY ? true : Boolean(slotFillValues[r.idY]);
        return hasX && hasY;
      });

      return (
        <div className="w-full flex flex-col items-center justify-center gap-2 max-w-lg mx-auto">
          <TableBuilder
            key={`table-${currentQ.id || currentIndex}-${isRemedialActive ? 'remedial' : 'main'}-${retryCount}`}
            title={currentQ.tableTitle || 'Tabel Relasi'}
            headers={currentQ.headers || ['Daerah Asal (x)', 'Daerah Kawan (y)']}
            rows={rows}
            tokens={shuffledTokens.length > 0 ? shuffledTokens : (currentQ.tokens || [])}
            values={slotFillValues}
            onAssign={handleSlotAssign}
            onRemove={handleSlotRemove}
            readOnly={isAnswered}
            isAnswered={isAnswered}
            subInstruction={currentQ.subInstruction}
          />
          {!isAnswered && (
            <button
              onClick={handleConfirmTable}
              disabled={!allFilled}
              className="pencil-btn w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-sm sm:text-base disabled:opacity-40 flex items-center justify-center gap-2 rounded-xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-[1.01] active:scale-95 max-w-lg mx-auto flex-shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Konfirmasi Tabel Relasi</span>
            </button>
          )}
        </div>
      );
    }

    // ── 9. ARROW_BUILDER_2STEP (Diagram Panah 2-Langkah) ───────────────
    if (currentQ.type === 'ARROW_BUILDER_2STEP') {
      const expA = currentQ.expectedSetA || [];
      const expB = currentQ.expectedSetB || [];
      const isStep1Ready = expA.length > 0 && expB.length > 0 && expA.every((_, i) => arrowPlacedA[i]) && expB.every((_, i) => arrowPlacedB[i]);
      const isReadyToConfirm = isStep1Ready && arrowConnections.length > 0;

      return (
        <div className="w-full flex flex-col items-center justify-center max-w-lg mx-auto">
          <ArrowBuilder2Step
            key={`arrow2step-${currentQ.id || currentIndex}-${isRemedialActive ? 'remedial' : 'main'}-${retryCount}`}
            labelA={currentQ.labelA || 'Himpunan A'}
            labelB={currentQ.labelB || 'Himpunan B'}
            expectedSetA={expA}
            expectedSetB={expB}
            availableTokens={currentQ.availableTokens || [...expA, ...expB]}
            placedA={arrowPlacedA}
            placedB={arrowPlacedB}
            connections={arrowConnections}
            onAssignSlot={handleArrowSlotAssign}
            onRemoveSlot={handleArrowSlotRemove}
            onToggleConnection={handleToggleArrowPair}
            rule={currentQ.rule || currentQ.question}
            readOnly={isAnswered}
            isAnswered={isAnswered}
            onConfirm={handleConfirmArrow2Step}
            isReadyToConfirm={isReadyToConfirm}
          />
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
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-2 mt-1.5 shadow-sm">
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
                        ? `Pilihan tersebut sebenarnya adalah ciri/pasangan dari "${actualOwner}", bukan "${p.left}". Pasangan yang benar untuk "${p.left}" adalah: "${p.right}".`
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
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm">
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
                `Opsi ini kurang tepat. Jawaban yang benar adalah "${currentQ.correct}". Periksa kembali rumus, tanda bilangan, atau konsep yang ditanyakan pada soal.`
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
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN CENTANG:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed space-y-1">
            {extraWrong.length > 0 && (
              <p className="text-rose-800">
                ❌ <strong>Opsi keliru yang kamu centang:</strong> {extraWrong.map(e => `"${e}"`).join(', ')}. Opsi ini tidak memenuhi syarat konsep.
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
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1 mt-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PILIHANMU:</span>
          </div>
          <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
            <p className="text-[#92400E]">
              💡 Kamu memilih <strong>"{selectedOpt}"</strong>. Pernyataan tersebut sebenarnya bernilai <strong>"{currentQ.correct}"</strong>. {currentQ.wrongExplanation || currentQ.clue}
            </p>
          </div>
        </div>
      );
    }

    if (currentQ.type === 'DRAG_DROP') {
      const items = currentQ.items || [];
      const correctMap = currentQ.correctMapping || {};
      const wrongItems = items.filter(it => dragDropMapping[it] && dragDropMapping[it] !== correctMap[it]);

      if (wrongItems.length === 0) return null;

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PENGELOMPOKAN KARTU:</span>
          </div>
          <div className="space-y-1.5">
            {wrongItems.map((it, idx) => {
              const userCat = dragDropMapping[it];
              const trueCat = correctMap[it];
              const customExp = currentQ.itemExplanations?.[it];
              return (
                <div key={idx} className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
                  <p className="font-black text-rose-800 mb-0.5">
                    ❌ Kartu <span className="underline font-mono bg-rose-50 px-1 rounded">"{it}"</span>:
                  </p>
                  <p className="text-gray-700 mb-0.5">
                    Kamu menaruh di kotak: <span className="font-bold text-rose-600">"{userCat}"</span>
                  </p>
                  <p className="text-[#92400E] bg-amber-50/60 p-1.5 rounded-md border border-amber-200/80">
                    💡 <strong>Kotak yang tepat:</strong> "{trueCat}". {customExp || `Kartu ini memenuhi syarat kategori ${trueCat}.`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (currentQ.type === 'SLOT_FILL') {
      const slots = currentQ.slots || [];
      const wrongSlots = slots.filter(s => slotFillValues[s.id] && String(slotFillValues[s.id]) !== String(s.answer));

      if (wrongSlots.length === 0) return null;

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>ANALISIS KESALAHAN PILIHAN KARTU:</span>
          </div>
          <div className="space-y-1.5">
            {wrongSlots.map((s, idx) => {
              const userVal = slotFillValues[s.id];
              return (
                <div key={idx} className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed">
                  <p className="text-rose-800 font-black">
                    ❌ Pada {s.label}: kamu memasukkan "{userVal}", jawaban yang tepat adalah "{s.answer}".
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (currentQ.type === 'HPB_BUILDER') {
      const pairs = currentQ.pairs || [];
      const wrongSlots = [];
      pairs.forEach(p => {
        if (p.idX && p.fixedX === null && String(slotFillValues[p.idX]) !== String(p.ansX)) {
          wrongSlots.push(`Nilai x pada pasangan: dipilih "${slotFillValues[p.idX] || 'kosong'}", seharusnya "${p.ansX}"`);
        }
        if (p.idY && p.fixedY === null && String(slotFillValues[p.idY]) !== String(p.ansY)) {
          wrongSlots.push(`Nilai y pada pasangan: dipilih "${slotFillValues[p.idY] || 'kosong'}", seharusnya "${p.ansY}"`);
        }
      });
      if (wrongSlots.length > 0) {
        return (
          <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
            <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
              <span>🔍</span>
              <span>ANALISIS KESALAHAN PASANGAN BERURUTAN:</span>
            </div>
            <div className="space-y-1">
              {wrongSlots.map((w, idx) => (
                <div key={idx} className="p-1.5 rounded-lg bg-white/95 border border-rose-200 text-rose-800 font-bold">
                  ❌ {w}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    if (currentQ.type === 'TABLE_BUILDER') {
      const rows = currentQ.rows || [];
      const wrongCells = [];
      rows.forEach((r, idx) => {
        if (r.isSlotX && String(slotFillValues[r.idX]) !== String(r.valX)) {
          wrongCells.push(`Baris ${idx + 1} Kolom X: dipilih "${slotFillValues[r.idX] || 'kosong'}", seharusnya "${r.valX}"`);
        }
        if (r.isSlotY && String(slotFillValues[r.idY]) !== String(r.valY)) {
          wrongCells.push(`Baris ${idx + 1} Kolom Y: dipilih "${slotFillValues[r.idY] || 'kosong'}", seharusnya "${r.valY}"`);
        }
      });
      if (wrongCells.length > 0) {
        return (
          <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
            <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
              <span>🔍</span>
              <span>ANALISIS KESALAHAN TABEL RELASI:</span>
            </div>
            <div className="space-y-1">
              {wrongCells.map((w, idx) => (
                <div key={idx} className="p-1.5 rounded-lg bg-white/95 border border-rose-200 text-rose-800 font-bold">
                  ❌ {w}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    if (currentQ.type === 'ARROW_BUILDER_2STEP') {
      const expA = (currentQ.expectedSetA || []).map(v => String(v).trim());
      const expB = (currentQ.expectedSetB || []).map(v => String(v).trim());
      const placedValsA = Object.values(arrowPlacedA || {}).map(v => String(v).trim()).filter(Boolean);
      const placedValsB = Object.values(arrowPlacedB || {}).map(v => String(v).trim()).filter(Boolean);
      
      const isSetACorrect = expA.length === placedValsA.length && [...expA].sort().every((v, i) => v === [...placedValsA].sort()[i]);
      const isSetBCorrect = expB.length === placedValsB.length && [...expB].sort().every((v, i) => v === [...placedValsB].sort()[i]);

      const normalizePair = (str) => {
        const parts = String(str || '').split('->');
        return parts.length >= 2 ? `${parts[0].trim()}->${parts[1].trim()}` : String(str || '').trim();
      };

      const normCorrect = (currentQ.correctPairs || []).map(normalizePair);
      const normUser = (arrowConnections || []).map(normalizePair);

      const wrongExtra = normUser.filter(p => !normCorrect.includes(p));
      const missed = normCorrect.filter(p => !normUser.includes(p));

      return (
        <div className="p-2.5 rounded-xl bg-amber-50/95 border-2 border-amber-300 text-[#78350F] text-xs sm:text-sm space-y-1.5 mt-1.5 shadow-sm text-left">
          <div className="flex items-center gap-1.5 font-black text-amber-900 border-b border-amber-200 pb-1">
            <span>🔍</span>
            <span>EVALUASI DIAGRAM PANAH:</span>
          </div>
          {(!isSetACorrect || !isSetBCorrect) && (
            <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed space-y-1">
              {!isSetACorrect && (
                <p className="text-rose-800">
                  ❌ <strong>Anggota {currentQ.labelA || 'Himpunan A'}:</strong> Belum sesuai. Anggota yang diharapkan: <strong>{expA.join(', ')}</strong>.
                </p>
              )}
              {!isSetBCorrect && (
                <p className="text-rose-800">
                  ❌ <strong>Anggota {currentQ.labelB || 'Himpunan B'}:</strong> Belum sesuai. Anggota yang diharapkan: <strong>{expB.join(', ')}</strong>.
                </p>
              )}
            </div>
          )}
          {isSetACorrect && isSetBCorrect && (wrongExtra.length > 0 || missed.length > 0) && (
            <div className="p-2 rounded-lg bg-white/95 border border-rose-200 text-xs sm:text-[13px] leading-relaxed space-y-1">
              {wrongExtra.length > 0 && (
                <p className="text-rose-800">
                  ❌ <strong>Panah yang keliru:</strong> {wrongExtra.join(', ')} (tidak sesuai cerita relasi).
                </p>
              )}
              {missed.length > 0 && (
                <p className="text-[#92400E]">
                  ⚠️ <strong>Panah yang belum ditarik:</strong> {missed.join(', ')}.
                </p>
              )}
            </div>
          )}
          <p className="text-gray-700 text-xs">
            Aturan relasi: <b>"{currentQ.rule || currentQ.question}"</b>.
          </p>
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

        {/* Right Content Area: Question or Completion */}
        {phase === 'MAIN' ? (
          <div className="flex-1 min-h-0 h-full p-2.5 sm:p-4 rounded-3xl glass-panel glass-sheen flex flex-col overflow-hidden gap-2 sm:gap-3">
            
            {/* Header / Progress Card */}
            <div className="flex items-center justify-between flex-shrink-0 text-xs sm:text-sm font-black">
              <span className={`px-2.5 py-0.5 rounded-xl border ${
                isRemedialActive 
                  ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse' 
                  : 'bg-blue-100 text-blue-900 border-blue-300'
              }`}>
                {isRemedialActive 
                  ? `🔄 SOAL SERUPA #${currentIndex + 1} DARI ${totalMainQuestions} (PERBAIKAN)` 
                  : `SOAL #${currentIndex + 1} DARI ${totalMainQuestions}`}
              </span>

              <span className="text-[#78350F]">
                {isRemedialActive ? '⚡ Selesaikan untuk Lanjut ke Soal Berikutnya' : `Benar Langsung: ${correctCount} / ${totalMainQuestions}`}
              </span>
            </div>

            {/* Question Prompt Card */}
            <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/95 border-2 border-[#D97706]/70 shadow-[0_4px_16px_rgba(217,119,6,0.14)] flex-shrink-0 text-center">
              {currentQ?.title && (
                <span className="text-[11px] sm:text-xs md:text-sm font-black text-[#D97706] uppercase tracking-wider block mb-0.5">
                  {currentQ.title}
                </span>
              )}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-black font-pencil text-[#2D241E] leading-snug sm:leading-normal">
                {currentQ?.question}
              </p>
            </div>

            {/* Answer Workspace */}
            <div className="flex-1 min-h-0 w-full flex flex-col justify-center items-center py-1 overflow-y-auto no-scrollbar">
              {renderQuestionBody()}
            </div>

            {/* Feedback & Explanation Pop-Up Modal */}
            {isAnswered && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
                <div className={`relative w-full max-w-lg p-4 sm:p-5 rounded-3xl border-4 shadow-[8px_10px_0px_#2D241E] flex flex-col gap-2.5 sm:gap-3 max-h-[92vh] overflow-hidden animate-scale-up ${
                  isCorrect 
                    ? 'bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] border-[#059669] text-[#065F46]' 
                    : 'bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
                }`}>
                  {/* Header Status */}
                  <div className="flex items-center gap-3 border-b pb-2.5 border-black/10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 shadow-inner ${
                      isCorrect ? 'bg-emerald-500/20 border-emerald-600' : 'bg-rose-500/20 border-rose-600'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 className="w-7 h-7 text-[#059669]" />
                      ) : (
                        <AlertTriangle className="w-7 h-7 text-[#BE123C]" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-black font-pencil tracking-wide ${
                        isCorrect ? 'text-emerald-950' : 'text-rose-950'
                      }`}>
                        {isCorrect ? '🎉 JAWABANMU BENAR!' : '❌ JAWABAN KURANG TEPAT!'}
                      </h3>
                      <p className={`text-xs sm:text-sm font-bold ${
                        isCorrect ? 'text-emerald-800' : 'text-rose-800'
                      }`}>
                        {isCorrect ? 'Penguatan Konsep Matematika' : 'Evaluasi & Penjelasan Kesalahan'}
                      </p>
                    </div>
                  </div>

                  {/* Body: Explanation & Clues (Never cuts off) */}
                  <div className="space-y-2 text-xs sm:text-sm font-bold leading-relaxed text-[#2D241E] flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
                    <div className="p-3.5 rounded-2xl bg-white/70 border border-black/10 shadow-xs">
                      <span className="font-black text-xs uppercase tracking-wider block mb-1 text-[#78350F]">
                        📖 Penjelasan Detektif:
                      </span>
                      <p className="whitespace-pre-line text-sm text-[#2D241E] leading-snug">
                        {isCorrect ? currentQ.correctReason : (dynamicClue || currentQ.wrongExplanation)}
                      </p>
                    </div>

                    {!isCorrect && renderDistractorAnalysis()}

                    {!isCorrect && currentQ.clue && (
                      <div className="p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-[#78350F] flex items-start gap-2 text-xs font-bold shadow-xs">
                        <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span><strong>💡 Petunjuk Khusus:</strong> {currentQ.clue}</span>
                      </div>
                    )}

                    {!isCorrect && (
                      <div className="p-2.5 rounded-xl bg-rose-200/70 border border-rose-300 text-rose-950 text-xs font-black flex items-center gap-2">
                        <span>🔒 Kerjakan soal varian serupa di bawah ini agar pemahamanmu tuntas!</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button (Always visible, never cut off) */}
                  <div className="pt-2 flex-shrink-0">
                    {isCorrect ? (
                      <button
                        onClick={handleNext}
                        className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-base sm:text-xl flex items-center justify-center gap-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-[1.02] active:scale-95"
                      >
                        <ShieldCheck className="w-6 h-6 text-[#D97706]" />
                        <span>
                          {currentIndex < totalMainQuestions - 1 ? `LANJUT KE SOAL #${currentIndex + 2} →` : '🏆 SELESAIKAN LATIHAN →'}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={handleTrySimilar}
                        className="pencil-btn w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-900 font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-[3px_4px_0px_#2D241E] rounded-2xl cursor-pointer transition hover:scale-[1.02] active:scale-95 animate-pulse"
                      >
                        <RotateCcw className="w-5 h-5 text-stone-900" />
                        <span>
                          {isRemedialActive ? '🔄 COBA LAGI SOAL SERUPA INI →' : '🔄 KERJAKAN SOAL SERUPA DENGAN ANGKA BARU →'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Completion Screen */
          (() => {
            const rawScore = ((correctCount * 100) + (remedialCorrectCount * 85)) / totalMainQuestions;
            const finalScore = Math.min(100, Math.round(rawScore));
            const isPassed = finalScore >= 85;

            return (
              <div className="flex-1 min-h-0 h-full p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center max-w-xl mx-auto w-full">
                {isPassed ? (
                  <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />
                ) : (
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center">
                    <AlertTriangle className="w-9 h-9 text-amber-600" />
                  </div>
                )}

                <div className="space-y-1">
                  <h2 className={`text-2xl sm:text-3xl font-black font-pencil ${isPassed ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {isPassed ? 'LATIHAN TUNTAS & LULUS! 🎉' : 'BELUM MEMENUHI SYARAT (85%)'}
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-[#78350F]">
                    {isPassed
                      ? `Selamat! Kamu telah menuntaskan seluruh tantangan pada ${exerciseData.title}. Semua konsep telah kamu kuasai dengan tuntas!`
                      : `Nilaimu belum mencapai batas kelulusan 85%. Syarat membuka Chapter berikutnya adalah tuntas minimal 85%.`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
                  <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                    <p className="text-xs font-black text-[#78350F]">SKOR AKHIR</p>
                    <p className={`text-2xl sm:text-3xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {finalScore}%
                    </p>
                    <p className="text-[10px] font-bold text-stone-500">Min. Kelulusan: 85%</p>
                  </div>
                  <div className="p-3 rounded-2xl glass-panel-subtle space-y-0.5">
                    <p className="text-xs font-black text-[#78350F]">SOAL DITUNTASKAN</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#2D241E]">
                      {totalMainQuestions} / {totalMainQuestions}
                    </p>
                    <p className="text-[10px] font-bold text-stone-500">Status: {isPassed ? '✅ Tuntas Sempurna' : '🔄 Perlu Perbaikan'}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-300 max-w-sm mx-auto w-full text-xs font-bold text-[#78350F]">
                  <span>⭐ Benar Langsung: <b>{correctCount}</b> soal • 🔄 Dikuasai Lewat Soal Serupa: <b>{remedialCorrectCount}</b> soal</span>
                </div>

                <div className="pt-2 max-w-sm mx-auto w-full space-y-2">
                  {!isPassed && (
                    <button
                      onClick={handleRestartExercise}
                      className="pencil-btn w-full py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#78350F] font-black text-base sm:text-lg flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95 animate-pulse"
                    >
                      <RotateCcw className="w-5 h-5 text-[#D97706]" />
                      <span>Ulangi Latihan Soal 🔄</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      onBackToStageSelect();
                    }}
                    className="pencil-btn w-full py-2.5 bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1E40AF] font-black text-sm sm:text-base flex items-center justify-center gap-2 rounded-2xl shadow-[2px_3px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Menu Chapter</span>
                  </button>
                </div>
              </div>
            );
          })()
        )}

      </div>

    </div>
  );
}
