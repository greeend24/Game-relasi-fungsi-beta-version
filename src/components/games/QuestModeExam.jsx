import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Clock, ShieldCheck, Play, Check, Zap, Eye, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';
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
import { HpbBuilder, TableBuilder, MatchingSlotDiagram } from '../RelationFormsBuilder';

function formatQuestionType(type) {
  switch (type) {
    case 'TABLE_BUILDER': return 'Lengkapi Tabel';
    case 'HPB_BUILDER': return 'Pasangan Berurutan';
    case 'ARROWS': return 'Diagram Panah';
    case 'CARTESIAN': return 'Diagram Kartesius';
    case 'SLOT_FILL': return 'Isian Nilai';
    case 'DRAG_DROP': return 'Kelompokkan Kartu';
    case 'MULTIPLE_CHOICE':
    case 'MCQ': return 'Pilihan Ganda';
    case 'TRUE_FALSE': return 'Benar / Salah';
    case 'MATCHING': return 'Pasangan Nilai';
    default: return type || 'Tantangan';
  }
}

/**
 * Universal evaluator for Quest questions supporting both standard & open-ended creative responses.
 */
export function evaluateSingleQuestion(q, userAns, idx = 0) {
  let isCorrect = false;
  let userText = '';
  let correctText = '';
  let diagnosis = null;
  let explanation = q.explanation || '';

  // ─────────────────────────────────────────────────────────────
  // 1. OPEN-ENDED QUESTIONS EVALUATION (SOAL TERBUKA & CREATIVE RELATIONS)
  // ─────────────────────────────────────────────────────────────
  if (q.isOpenEnded && q.openEndedRules) {
    if (q.type === 'HPB_BUILDER') {
      const userMap = userAns || {};
      const slots = q.openEndedRules.slots || {};
      const slotKeys = Object.keys(slots);
      const unfilled = slotKeys.filter(sId => !userMap[sId] || String(userMap[sId]).trim() === '');
      const invalid = slotKeys.filter(sId => {
        const val = String(userMap[sId] || '').trim();
        if (!val) return false;
        const rule = slots[sId];
        return rule?.validTokens && !rule.validTokens.includes(val);
      });

      let duplicateX = false;
      if (q.openEndedRules.distinctX) {
        const allX = (q.pairs || []).map(p => {
          return p.fixedX !== null && p.fixedX !== undefined ? p.fixedX : (userMap[p.idX] || null);
        }).filter(Boolean);
        duplicateX = new Set(allX).size !== allX.length;
      }

      isCorrect = slotKeys.length > 0 && unfilled.length === 0 && invalid.length === 0 && !duplicateX;

      const userPairs = (q.pairs || []).map(p => {
        const xVal = p.fixedX ?? (userMap[p.idX] || '?');
        const yVal = p.fixedY ?? (userMap[p.idY] || '?');
        return `(${xVal}, ${yVal})`;
      }).join(', ');

      userText = `{ ${userPairs} }`;
      correctText = `Relasi Terbuka: ${q.openEndedRules.criteriaDescription || 'Semua kotak pasangan terisi kartu yang sah'}`;

      if (!isCorrect) {
        const diagList = [];
        if (unfilled.length > 0) diagList.push(`Masih ada ${unfilled.length} kotak [ ? ] yang belum kamu isi.`);
        if (invalid.length > 0) diagList.push(`Ada kartu yang tidak sesuai posisi asal atau kawan.`);
        if (duplicateX) diagList.push(`Terdapat nama siswa di posisi depan (domain) yang berulang.`);
        diagnosis = diagList.join(' • ');
      } else {
        explanation = q.explanation || 'Luar biasa! Pada soal terbuka (open-ended), kamu bebas memasangkan elemen relasi sesuai pilihanmu.';
      }
    } else if (q.type === 'TABLE_BUILDER') {
      const userMap = userAns || {};
      const cells = q.openEndedRules.cells || {};
      const cellKeys = Object.keys(cells);
      const unfilled = cellKeys.filter(cId => !userMap[cId] || String(userMap[cId]).trim() === '');
      const invalid = cellKeys.filter(cId => {
        const val = String(userMap[cId] || '').trim();
        if (!val) return false;
        const rule = cells[cId];
        return rule?.validTokens && !rule.validTokens.includes(val);
      });

      let duplicateX = false;
      if (q.openEndedRules.distinctX) {
        const allX = (q.rows || []).map(r => {
          return r.isSlotX ? (userMap[r.idX] || null) : r.valX;
        }).filter(Boolean);
        duplicateX = new Set(allX).size !== allX.length;
      }

      isCorrect = cellKeys.length > 0 && unfilled.length === 0 && invalid.length === 0 && !duplicateX;

      const userRows = (q.rows || []).map(r => {
        const xVal = r.isSlotX ? (userMap[r.idX] || '?') : r.valX;
        const yVal = r.isSlotY ? (userMap[r.idY] || '?') : r.valY;
        return `${xVal} ➔ ${yVal}`;
      }).join(' | ');

      userText = userRows;
      correctText = `Tabel Relasi Terbuka: ${q.openEndedRules.criteriaDescription || 'Tabel lengkap terisi sesuai kategori'}`;

      if (!isCorrect) {
        const diagList = [];
        if (unfilled.length > 0) diagList.push(`Masih ada ${unfilled.length} sel tabel [ ? ] yang kosong.`);
        if (invalid.length > 0) diagList.push(`Ada kartu yang tidak sesuai kelompok baris atau kolom.`);
        if (duplicateX) diagList.push(`Elemen di kolom asal tidak boleh ada yang berulang.`);
        diagnosis = diagList.join(' • ');
      } else {
        explanation = q.explanation || 'Penyusunan tabel relasi terbuka kamu berhasil memenuhi kriteria!';
      }
    } else if (q.type === 'ARROWS') {
      const userPairs = Array.isArray(userAns) ? userAns : [];
      const fmt = (p) => String(p).replace('->', ' ➔ ');
      userText = userPairs.length > 0 ? userPairs.map(fmt).join(', ') : '(Belum ada panah ditarik)';

      const setAStr = (q.setA || []).map(String);
      const setBStr = (q.setB || []).map(String);

      let validConnections = true;
      const domainCount = {};
      setAStr.forEach(a => { domainCount[a] = 0; });

      userPairs.forEach(p => {
        const parts = String(p).split('->');
        if (parts.length >= 2) {
          const from = parts[0].trim();
          const to = parts[1].trim();
          if (!setAStr.includes(from) || !setBStr.includes(to)) {
            validConnections = false;
          }
          if (domainCount[from] !== undefined) {
            domainCount[from]++;
          }
        } else {
          validConnections = false;
        }
      });

      if (q.openEndedRules.requireFunction) {
        const unassigned = setAStr.filter(a => domainCount[a] === 0);
        const branching = setAStr.filter(a => domainCount[a] > 1);
        isCorrect = validConnections && unassigned.length === 0 && branching.length === 0;

        correctText = `Syarat Fungsi Sah: ${q.openEndedRules.criteriaDescription || 'Setiap anggota Domain A memiliki tepat 1 kawan di Kodomain B'}`;
        if (!isCorrect) {
          const diagList = [];
          if (unassigned.length > 0) diagList.push(`Anggota domain yang belum berpasangan: { ${unassigned.join(', ')} }`);
          if (branching.length > 0) diagList.push(`Anggota domain yang bercabang lebih dari 1 panah: { ${branching.join(', ')} }`);
          if (!validConnections) diagList.push(`Ada panah yang tidak terhubung dengan benar.`);
          diagnosis = diagList.join(' • ');
        } else {
          explanation = q.explanation || 'Fungsi terbuka yang kamu bangun sah! Setiap elemen domain memiliki tepat 1 kawan di kodomain.';
        }
      } else if (q.openEndedRules.minArrows) {
        const minA = q.openEndedRules.minArrows;
        isCorrect = validConnections && userPairs.length >= minA;
        correctText = `Relasi Diagram Panah Bebas: ${q.openEndedRules.criteriaDescription || `Minimal ${minA} tali panah terhubung`}`;
        if (!isCorrect) {
          if (userPairs.length < minA) {
            diagnosis = `Tali panah yang terpasang baru ${userPairs.length}, pasang minimal ${minA} tali panah.`;
          } else if (!validConnections) {
            diagnosis = `Ada tali panah yang tidak menghubungkan anggota himpunan A dan B secara valid.`;
          }
        } else {
          explanation = q.explanation || 'Relasi panah terbuka yang kamu hubungkan sah dan memenuhi kriteria!';
        }
      }
    } else if (q.type === 'CARTESIAN') {
      const userPts = Array.isArray(userAns) ? userAns : [];
      const fmt = ([x, y]) => {
        const xText = q.xLabels?.[x] || x;
        const yText = q.yLabels?.[y] || y;
        return `(${xText}, ${yText})`;
      };
      userText = userPts.length > 0 ? userPts.map(fmt).join(', ') : '(Belum ada titik ditandai)';

      const minP = q.openEndedRules.minPoints || 1;
      const inBounds = userPts.every(([ux, uy]) => {
        const numX = Number(ux);
        const numY = Number(uy);
        return numX >= 1 && numX <= (q.maxX || 10) && numY >= 1 && numY <= (q.maxY || 10);
      });

      isCorrect = inBounds && userPts.length >= minP;
      correctText = `Diagram Kartesius Bebas: ${q.openEndedRules.criteriaDescription || `Tandai minimal ${minP} titik koordinat`}`;

      if (!isCorrect) {
        if (userPts.length < minP) {
          diagnosis = `Titik koordinat yang ditandai baru ${userPts.length}, pasang minimal ${minP} titik koordinat.`;
        } else if (!inBounds) {
          diagnosis = `Ada titik koordinat yang berada di luar rentang diagram.`;
        }
      } else {
        explanation = q.explanation || 'Titik koordinat relasi pada diagram Kartesius berhasil kamu buat sesuai kreasimu!';
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. STANDARD QUESTION TYPES EVALUATION
  // ─────────────────────────────────────────────────────────────
  else if (q.type === 'ARROWS') {
    const normPair = p => {
      const parts = String(p || '').split('->');
      return parts.length >= 2 ? `${parts[0].trim()}->${parts[1].trim()}` : String(p || '').trim();
    };
    const userPairs = (Array.isArray(userAns) ? userAns : []).map(normPair);
    const correctPairs = (q.correctPairs || []).map(normPair);
    const missing = correctPairs.filter(p => !userPairs.includes(p));
    const extra = userPairs.filter(p => !correctPairs.includes(p));
    isCorrect = missing.length === 0 && extra.length === 0;

    const fmt = (p) => p.replace('->', ' ➔ ');
    userText = userPairs.length > 0 ? userPairs.map(fmt).join(', ') : '(Belum ada panah ditarik)';
    correctText = correctPairs.map(fmt).join(', ');

    const diagList = [];
    if (missing.length > 0) diagList.push(`Panah yang belum ditarik: ${missing.map(fmt).join(', ')}`);
    if (extra.length > 0) diagList.push(`Panah yang keliru: ${extra.map(fmt).join(', ')}`);
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Pasangan panah yang tepat berdasarkan aturan relasi adalah: ${correctText}.`;
  } else if (q.type === 'MATCHING') {
    const userPairs = userAns || {};
    const pairs = q.pairs || [];
    const wrongPairs = pairs.filter(p => String(userPairs[p.x] ?? '').trim() !== String(p.result ?? '').trim());
    isCorrect = pairs.length > 0 && wrongPairs.length === 0;

    userText = pairs.map(p => `x=${p.x} ➔ ${userPairs[p.x] || '(?)'}`).join('; ');
    correctText = pairs.map(p => `x=${p.x} ➔ ${p.result}`).join('; ');

    const diagList = [];
    wrongPairs.forEach(p => {
      const entered = userPairs[p.x] || '(kosong)';
      diagList.push(`x=${p.x} dipasangkan ke "${entered}", seharusnya "${p.result}"`);
    });
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Hasil pasangan nilai fungsi yang tepat: ${correctText}.`;
  } else if (q.type === 'CARTESIAN') {
    const userPts = Array.isArray(userAns) ? userAns : [];
    const targetPoints = q.targetPoints || [];
    const missing = targetPoints.filter(([tx, ty]) => !userPts.some(([ux, uy]) => Number(ux) === Number(tx) && Number(uy) === Number(ty)));
    const extra = userPts.filter(([ux, uy]) => !targetPoints.some(([tx, ty]) => Number(tx) === Number(ux) && Number(ty) === Number(uy)));
    isCorrect = missing.length === 0 && extra.length === 0;

    const fmt = ([x, y]) => {
      const xText = q.xLabels?.[x] || x;
      const yText = q.yLabels?.[y] || y;
      return `(${xText}, ${yText})`;
    };
    userText = userPts.length > 0 ? userPts.map(fmt).join(', ') : '(Belum ada titik ditandai)';
    correctText = targetPoints.map(fmt).join(', ');

    const diagList = [];
    if (missing.length > 0) diagList.push(`Titik koordinat yang terlewat: ${missing.map(fmt).join(', ')}`);
    if (extra.length > 0) diagList.push(`Titik koordinat yang keliru: ${extra.map(fmt).join(', ')}`);
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Titik-titik koordinat yang tepat pada bidang Kartesius adalah: ${correctText}.`;
  } else if (q.type === 'DRAG_DROP') {
    const userMap = userAns || {};
    const correctMap = q.correctMapping || {};
    const items = q.items || [];
    const wrongItems = items.filter(it => userMap[it] !== correctMap[it]);
    isCorrect = items.length > 0 && wrongItems.length === 0;

    userText = items.map(it => `${it} ➔ ${userMap[it] || '(Belum dikelompokkan)'}`).join('; ');
    correctText = items.map(it => `${it} ➔ ${correctMap[it]}`).join('; ');

    const diagList = [];
    wrongItems.forEach(it => {
      const entered = userMap[it] || '(kosong)';
      diagList.push(`"${it}" dimasukkan ke "${entered}", seharusnya ke "${correctMap[it]}"`);
    });
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Pengelompokan kategori yang tepat adalah: ${correctText}.`;
  } else if (q.type === 'SLOT_FILL') {
    const userSlots = userAns || {};
    const slots = q.slots || [];
    const wrongSlots = slots.filter(s => {
      const expected = s.answer ?? q.correctSlots?.[s.id] ?? '';
      return String(userSlots[s.id] ?? '').trim() !== String(expected).trim();
    });
    isCorrect = slots.length > 0 && wrongSlots.length === 0;

    userText = slots.map(s => `${s.label} [ ${userSlots[s.id] || '?'} ]`).join('; ');
    correctText = slots.map(s => `${s.label} [ ${s.answer} ]`).join('; ');

    const diagList = [];
    wrongSlots.forEach(s => {
      const entered = userSlots[s.id] || '(kosong)';
      diagList.push(`Isian "${s.label}" diisi "${entered}", seharusnya "${s.answer}"`);
    });
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Hasil perhitungan yang tepat: ${correctText}.`;
  } else if (q.type === 'HPB_BUILDER') {
    const userMap = userAns || {};
    const correctMap = q.correctSlots || {};
    const slots = Object.keys(correctMap);
    const wrongSlots = slots.filter(sId => String(userMap[sId] ?? '').trim() !== String(correctMap[sId] ?? '').trim());
    isCorrect = slots.length > 0 && wrongSlots.length === 0;

    const userPairs = (q.pairs || []).map(p => {
      const xVal = p.fixedX ?? (userMap[p.idX] || '?');
      const yVal = p.fixedY ?? (userMap[p.idY] || '?');
      return `(${xVal}, ${yVal})`;
    }).join(', ');

    const correctPairs = (q.pairs || []).map(p => {
      const xVal = p.fixedX ?? p.ansX;
      const yVal = p.fixedY ?? p.ansY;
      return `(${xVal}, ${yVal})`;
    }).join(', ');

    userText = `{ ${userPairs} }`;
    correctText = `{ ${correctPairs} }`;

    const diagList = [];
    wrongSlots.forEach(sId => {
      const entered = userMap[sId] || '(kosong)';
      diagList.push(`Kotak kurung [?] diisi "${entered}", seharusnya "${correctMap[sId]}"`);
    });
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Himpunan pasangan berurutan yang tepat: ${correctText}.`;
  } else if (q.type === 'TABLE_BUILDER') {
    const userMap = userAns || {};
    const correctMap = q.correctCells || {};
    const cells = Object.keys(correctMap);
    const wrongCells = cells.filter(cId => String(userMap[cId] ?? '').trim() !== String(correctMap[cId] ?? '').trim());
    isCorrect = cells.length > 0 && wrongCells.length === 0;

    const userRows = (q.rows || []).map(r => {
      const xVal = r.isSlotX ? (userMap[r.idX] || '?') : r.valX;
      const yVal = r.isSlotY ? (userMap[r.idY] || '?') : r.valY;
      return `x=${xVal} ➔ y=${yVal}`;
    }).join(' | ');

    const correctRows = (q.rows || []).map(r => {
      const xVal = r.isSlotX ? (correctMap[r.idX] || r.valX) : r.valX;
      const yVal = r.isSlotY ? (correctMap[r.idY] || r.valY) : r.valY;
      return `x=${xVal} ➔ y=${yVal}`;
    }).join(' | ');

    userText = userRows;
    correctText = correctRows;

    const diagList = [];
    wrongCells.forEach(cId => {
      const entered = userMap[cId] || '(kosong)';
      diagList.push(`Sel tabel [?] diisi "${entered}", seharusnya "${correctMap[cId]}"`);
    });
    if (diagList.length > 0) diagnosis = diagList.join(' • ');
    if (!explanation) explanation = `Isian tabel nilai yang tepat: ${correctText}.`;
  } else {
    isCorrect = userAns === q.correct;
    userText = userAns || '(Tidak dijawab / kosong)';
    correctText = q.correct || '';
    if (!isCorrect) {
      diagnosis = userAns 
        ? `Kamu memilih pilihan: "${userAns}".`
        : `Soal ini belum kamu jawab.`;
    }
    if (!explanation) explanation = `Jawaban yang tepat adalah "${q.correct}".`;
  }

  return {
    index: idx,
    q,
    isCorrect,
    userText,
    correctText,
    diagnosis,
    explanation
  };
}

export default function QuestModeExam({ subbabId = 1, onBackToQuestSelect, currentUser }) {
  const subData = CHAPTERS_DATA[subbabId] || CHAPTERS_DATA[1];

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0); // 0 to 9
  const [answers, setAnswers] = useState({}); // qIndex -> selectedOption or pairs object
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds for 10 questions
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [resultTab, setResultTab] = useState('SUMMARY'); // 'SUMMARY' | 'REVIEW'
  const [reviewFilter, setReviewFilter] = useState('ALL'); // 'ALL' | 'WRONG' | 'CORRECT'
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [reloText, setReloText] = useState('');
  const [selectedA, setSelectedA] = useState(null);
  const [selectedDragItem, setSelectedDragItem] = useState(null);
  const [selectedSlotToken, setSelectedSlotToken] = useState(null);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Sync refs to prevent stale closure during auto-submission or timer ticks
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const timeRemainingRef = useRef(timeRemaining);
  timeRemainingRef.current = timeRemaining;

  const questionsRef = useRef(questions);
  questionsRef.current = questions;

  const [shuffledMatchingMap, setShuffledMatchingMap] = useState({});

  useEffect(() => {
    setSelectedA(null);
    setSelectedDragItem(null);
    setSelectedSlotToken(null);
    const q = questions[currentQIndex];
    if (q && q.type === 'MATCHING' && q.pairs) {
      const allResults = Array.from(new Set(q.pairs.map(p => p.result)));
      const map = {};
      q.pairs.forEach((p, idx) => {
        let shuf = [...allResults];
        for (let i = shuf.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuf[i], shuf[j]] = [shuf[j], shuf[i]];
        }
        let attempts = 0;
        // Strictly prevent diagonal ladder across cards
        while (attempts < 10 && shuf.length > 1 && shuf.indexOf(p.result) === (idx % shuf.length)) {
          for (let i = shuf.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuf[i], shuf[j]] = [shuf[j], shuf[i]];
          }
          attempts++;
        }
        if (shuf.length > 1 && shuf.indexOf(p.result) === (idx % shuf.length)) {
          const curPos = shuf.indexOf(p.result);
          const targetPos = (curPos + 1) % shuf.length;
          [shuf[curPos], shuf[targetPos]] = [shuf[targetPos], shuf[curPos]];
        }
        map[String(p.x)] = shuf;
      });
      setShuffledMatchingMap(map);
    } else {
      setShuffledMatchingMap({});
    }
  }, [currentQIndex, questions]);

  // Play Quest Mode Before Start Voice (Snowy) on mount
  useEffect(() => {
    const res = reloVoiceService.playScene('quest_before_start');
    if (res?.text) setReloText(res.text);
    return () => reloVoiceService.stopVoice();
  }, []);

  // Sideways keyboard navigation for review tab (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (resultTab !== 'REVIEW') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setReviewIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setReviewIndex(prev => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resultTab]);

  const handleSnowyBriefingClick = () => {
    audioEngine.playClick();
    const res = reloVoiceService.playScene('quest_before_start');
    if (res?.text) setReloText(res.text);
  };

  // Generate 10 varied, non-repetitive, curriculum-accurate questions for this subbab
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

    // Check existing progress to prevent duplicate points for previously solved questions
    const currentUser = storageService.getCurrentUser();
    const chKey = String(subbabId);
    const existingQuestData = currentUser?.questScores?.[subbabId] || currentUser?.questScores?.[chKey];
    const previouslyAwarded = Array.isArray(existingQuestData?.awardedQuestionIds)
      ? existingQuestData.awardedQuestionIds
      : [];

    let newlyEarnedPoints = 0;
    let correctCount = 0;
    const newlyAwardedQuestionIds = [];

    currentQuestions.forEach((q, idx) => {
      const userAns = currentAnswers[idx];
      const evalRes = evaluateSingleQuestion(q, userAns, idx);
      if (evalRes.isCorrect) {
        correctCount++;
        const qId = q.id !== undefined ? q.id : (idx + 1);
        if (!previouslyAwarded.includes(qId)) {
          newlyEarnedPoints += (q.pts || 0);
          newlyAwardedQuestionIds.push(qId);
        }
      }
    });

    const totalQCount = currentQuestions.length || 10;
    const score100 = Math.round((correctCount / totalQCount) * 100);

    // Speed bonus: only award difference if player beat their previous best time
    let speedBonusToAdd = 0;
    const prevBestSpeed = existingQuestData?.bestSpeedBonus || 0;
    if (speedBonus > prevBestSpeed) {
      speedBonusToAdd = speedBonus - prevBestSpeed;
    }

    const finalPointsToAdd = newlyEarnedPoints + speedBonusToAdd;
    setEarnedPoints(finalPointsToAdd);

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

    // Record quest exam result (saves 0-100 score, correct count, time, points, and awarded question IDs)
    storageService.recordQuestExamResult(subbabId, {
      score: score100,
      correctCount,
      totalQuestions: totalQCount,
      pointsEarned: finalPointsToAdd,
      newlyAwardedQuestionIds,
      speedBonusEarned: speedBonus,
      timeRemainingSeconds: speedBonus,
    }).catch(err => {
      console.warn('[QuestModeExam] recordQuestExamResult error:', err);
    });
  }, [subbabId]);

  const handleSubmitExamRef = useRef(handleSubmitExam);
  handleSubmitExamRef.current = handleSubmitExam;

  // 15-Minute Timer Countdown & Auto-Finish on Expiry
  useEffect(() => {
    if (!hasStarted || examSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
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
    setReloText('');
    const freshQuestions = generateSubbabQuestions(subbabId);
    setQuestions(freshQuestions);
    setAnswers({});
    setCurrentQIndex(0);
    setResultTab('SUMMARY');
    setReviewFilter('ALL');
    setEarnedPoints(0);
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

  const handleQuestDragAssign = (item, cat) => {
    if (examSubmitted) return;
    try { audioEngine.playPop(); } catch {}
    setAnswers(prev => {
      const curMap = prev[currentQIndex] || {};
      return {
        ...prev,
        [currentQIndex]: { ...curMap, [item]: cat }
      };
    });
    setSelectedDragItem(null);
  };

  const handleQuestDragRemove = (item) => {
    if (examSubmitted) return;
    try { audioEngine.playTrash(); } catch {}
    setAnswers(prev => {
      const curMap = { ...(prev[currentQIndex] || {}) };
      delete curMap[item];
      return {
        ...prev,
        [currentQIndex]: curMap
      };
    });
  };

  const handleQuestSlotAssign = (slotId, token) => {
    if (examSubmitted) return;
    try { audioEngine.playPop(); } catch {}
    setAnswers(prev => {
      const curMap = prev[currentQIndex] || {};
      return {
        ...prev,
        [currentQIndex]: { ...curMap, [slotId]: token }
      };
    });
    setSelectedSlotToken(null);
  };

  const handleQuestSlotRemove = (slotId) => {
    if (examSubmitted) return;
    try { audioEngine.playTrash(); } catch {}
    setAnswers(prev => {
      const curMap = { ...(prev[currentQIndex] || {}) };
      delete curMap[slotId];
      return {
        ...prev,
        [currentQIndex]: curMap
      };
    });
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Detailed Question-by-Question Evaluation for Summary & Review
  const evaluatedQuestions = questions.map((q, idx) => {
    const userAns = answers[idx];
    return evaluateSingleQuestion(q, userAns, idx);
  });

  const correctCount = evaluatedQuestions.filter(e => e.isCorrect).length;
  const basePointsEarned = evaluatedQuestions.filter(e => e.isCorrect).reduce((sum, e) => sum + e.q.pts, 0);
  const totalQCount = questions.length || 10;
  const wrongCount = totalQCount - correctCount;
  const score100 = Math.round((correctCount / totalQCount) * 100);
  const totalQuestScore = basePointsEarned + timeRemaining;

  const displayedReviews = evaluatedQuestions.filter(e => {
    if (reviewFilter === 'WRONG') return !e.isCorrect;
    if (reviewFilter === 'CORRECT') return e.isCorrect;
    return true;
  });

  const safeReviewIndex = displayedReviews.length > 0
    ? Math.min(Math.max(0, reviewIndex), displayedReviews.length - 1)
    : 0;
  const activeReview = displayedReviews[safeReviewIndex] || null;

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
          <span>Kembali ke Pilihan Misi</span>
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
            message={reloText || "Selamat datang di Quest Mode! ⏱️ 15 menit, 10 soal interaktif. Kecepatan dan ketepatanmu menentukan skor! ❄️🎯🐻"}
            onMascotClick={handleSnowyBriefingClick}
          />

          <div className="glass-panel glass-sheen flex-1 min-h-0 h-full p-4 sm:p-5 rounded-3xl flex flex-col justify-between overflow-hidden space-y-2">
            <div className="space-y-1">
              <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#D97706] uppercase">PETUNJUK & SISTEM PENILAIAN QUEST MODE</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-pencil text-[#2D241E]">{subData.title}</h3>
            </div>

            {/* DETAILED QUEST MODE INSTRUCTION & SCORING RULES */}
            <div className="glass-panel-subtle p-3 sm:p-4 rounded-2xl text-left space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-bold text-[#2D241E] flex-1 min-h-0 overflow-y-auto no-scrollbar">
              <div className="flex items-center space-x-2 text-[#D97706] font-black border-b-2 border-[#FED7AA] pb-1.5">
                <Clock className="w-5 h-5" />
                <span>INFORMASI & BOBOT SKOR QUEST MODE:</span>
              </div>
              
              <ul className="space-y-2 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-amber-600 font-black">•</span>
                  <span><b>Waktu Ujian:</b> 15 Menit (900 detik) hitung mundur untuk menyelesaikan 10 soal interaktif tantangan.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-black">•</span>
                  <span><b>Soal 1 – 3:</b> Bernilai <b>50 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-black">•</span>
                  <span><b>Soal 4 – 7:</b> Bernilai <b>80 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-black">•</span>
                  <span><b>Soal 8 – 10:</b> Bernilai <b>120 Poin</b> per soal tepat.</span>
                </li>
                <li className="flex items-start space-x-2 glass-card-amber p-2.5 rounded-xl border border-amber-400/60 shadow-xs">
                  <Zap className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span><b>Bonus Kecepatan:</b> Setiap 1 detik tersisa saat menekan <i>"Selesaikan Quest"</i> menambahkan <b>+1 Poin Bonus</b> per detiknya!</span>
                </li>
              </ul>
            </div>

            <div className="pt-1 flex-shrink-0">
              <button
                onClick={handleStartExam}
                className="glass-btn-amber w-full py-3 sm:py-3.5 text-xl sm:text-2xl flex items-center justify-center space-x-2 rounded-2xl cursor-pointer font-black transition-all hover:scale-102 active:scale-98 shadow-lg"
              >
                <Play className="w-6 h-6 fill-[#D97706] text-[#D97706] animate-pulse" />
                <span>MULAI UJIAN QUEST (10 SOAL)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DURING EXAM SCREEN */}
      {hasStarted && !examSubmitted && (
        <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
          
          {/* Left Side Panel: Questions Grid + Standing Mascot */}
          <div className="w-[160px] sm:w-[175px] lg:w-[185px] flex-shrink-0 h-full flex flex-col justify-between gap-1.5 sm:gap-2 overflow-hidden z-20">
            {/* Question Navigator Card (5 columns x 2 rows) */}
            <div className="p-2 sm:p-2.5 rounded-2xl glass-panel glass-sheen border-2 border-white/80 shadow-md flex flex-col items-center justify-start flex-shrink-0">
              <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-black text-[#78350F] mb-1.5 pb-1 border-b border-amber-300/40 font-pencil">
                <span>DAFTAR SOAL</span>
                <span className="px-2 py-0.5 rounded-md glass-card-amber border border-amber-300/70 text-[#78350F] font-black text-[10px] sm:text-[11px]">
                  {currentQIndex + 1} / {questions.length}
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
                          ? 'glass-btn-blue text-white ring-2 ring-blue-400/60 scale-105 shadow-md z-10 font-black'
                          : isAnsweredQ
                          ? 'glass-card-emerald text-emerald-950 border-emerald-400/80 font-black'
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
            <div className="py-1.5 px-3.5 rounded-2xl glass-panel-subtle flex items-center justify-between font-black text-xs sm:text-sm lg:text-base text-[#78350F] flex-shrink-0 border border-white/70 shadow-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span>WAKTU TERSISA: {formatTimer(timeRemaining)}</span>
              </div>
              <div className="flex items-center">
                <span>TERJAWAB: {Object.keys(answers).length} / {questions.length}</span>
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
                        SOAL NO #{currentQIndex + 1} <span className="font-pencil text-xs opacity-75">/ {questions.length}</span>
                      </span>
                      {currentQ.isOpenEnded && (
                        <span className="font-pencil px-2.5 py-0.5 rounded-md glass-card-emerald border border-emerald-400/80 text-[10px] sm:text-xs font-black text-emerald-950 uppercase tracking-wide">
                          ✨ SOAL TERBUKA
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md glass-panel-subtle border border-amber-300/60 text-[10px] sm:text-[11px] font-black tracking-wide text-amber-950">
                      Tipe: {formatQuestionType(currentQ.type)}
                    </span>
                  </div>

                  {/* Main Prominent Question Prompt (Occupies upper space with high visibility, PURE QUESTION TEXT ONLY) */}
                  <div className="px-3 py-1.5 sm:py-2 rounded-xl glass-panel glass-sheen border border-white/80 shadow-xs flex-shrink-0 flex items-center justify-center text-center">
                    <p className="text-xs sm:text-sm lg:text-base font-black font-pencil text-[#2D241E] leading-snug">
                      {cleanText}
                    </p>
                  </div>

                {/* Question Variations Body (Guaranteed fit without scrollbar) */}
                <div className="flex-1 min-h-0 flex flex-col justify-center items-center overflow-y-auto no-scrollbar py-0.5 w-full">
                  {/* 1. Multiple Choice / True-False */}
                  {(questions[currentQIndex].type === 'MULTIPLE_CHOICE' || questions[currentQIndex].type === 'MCQ' || questions[currentQIndex].type === 'TRUE_FALSE') && (() => {
                    const opts = questions[currentQIndex].options || [];
                    const isTrueFalse = questions[currentQIndex].type === 'TRUE_FALSE' || opts.length === 2;
                    const visual = questions[currentQIndex].visual;
                    const hasVisual = Boolean(visual);
                    const isWideVisual = hasVisual && (visual.type === 'relation_table' || visual.type === 'ordered_pairs');

                    // Case 1: True/False (2 options) -> Centered vertical layout with prominent Benar/Salah buttons
                    if (isTrueFalse) {
                      return (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 max-w-xl mx-auto py-1">
                          {hasVisual && (
                            <div className="w-full max-w-md flex items-center justify-center flex-shrink-0">
                              <MathVisualizer visual={visual} compact={true} />
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto flex-shrink-0">
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              const isBenar = opt.toLowerCase() === 'benar';
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`py-2 px-4 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                                    isSelected
                                      ? isBenar
                                        ? 'glass-btn-emerald scale-102 ring-2 ring-emerald-400/80 shadow-md text-emerald-950 font-black'
                                        : 'glass-btn-rose scale-102 ring-2 ring-rose-400/80 shadow-md text-rose-950 font-black'
                                      : isBenar
                                      ? 'glass-card-emerald hover:border-emerald-500 text-emerald-950 font-bold'
                                      : 'glass-card-rose hover:border-rose-500 text-rose-950 font-bold'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
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
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 max-w-xl mx-auto py-0.5">
                          <div className="w-full max-w-md flex items-center justify-center flex-shrink-0">
                            <MathVisualizer visual={visual} compact={true} />
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 w-full max-w-xl mx-auto flex-shrink-0">
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`p-1.5 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'glass-card-amber text-[#2D241E] border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-xs font-black'
                                      : 'glass-btn text-[#2D241E]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      <span className="w-5 h-5 rounded-lg glass-panel-subtle border border-amber-300/80 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="text-xs sm:text-[13px] font-pencil leading-snug break-words">{opt}</span>
                                    </div>
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
                        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-2 lg:gap-4 py-0.5">
                          <div className="flex-1 w-full min-w-0 max-w-[360px] flex items-center justify-center">
                            <MathVisualizer visual={visual} compact={true} />
                          </div>
                          <div className={`flex-shrink-0 ${
                            isShortOpts
                              ? 'w-full md:w-auto md:min-w-[240px] md:max-w-[320px] grid grid-cols-2 gap-1.5'
                              : 'w-full md:w-[44%] lg:w-[42%] md:min-w-[240px] md:max-w-[380px] flex flex-col gap-1.5'
                          }`}>
                            {opts.map((opt, optIdx) => {
                              const isSelected = answers[currentQIndex] === opt;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(opt)}
                                  className={`p-1.5 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'glass-card-amber text-[#2D241E] border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-xs font-black'
                                      : 'glass-btn text-[#2D241E]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      <span className="w-5 h-5 rounded-lg glass-panel-subtle border border-amber-300/80 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="text-xs sm:text-[13px] font-pencil leading-snug break-words">{opt}</span>
                                    </div>
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
                      <div className="w-full h-full flex flex-col items-center justify-center max-w-xl mx-auto py-0.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                          {opts.map((opt, optIdx) => {
                            const isSelected = answers[currentQIndex] === opt;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(opt)}
                                className={`p-2 rounded-xl text-left font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'glass-card-amber text-[#2D241E] border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-xs font-black'
                                    : 'glass-btn text-[#2D241E]'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg glass-panel-subtle border border-amber-300/80 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span className="text-xs sm:text-sm font-pencil leading-snug break-words">{opt}</span>
                                  </div>
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
                    <div className="w-full max-w-lg flex flex-col items-center justify-center gap-1 p-1 rounded-xl glass-panel-subtle flex-shrink-0">
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
                        labelA={questions[currentQIndex].labelA || 'Himpunan A'}
                        labelB={questions[currentQIndex].labelB || 'Himpunan B'}
                        compact={true}
                      />
                      <div className="text-[10px] sm:text-[11px] font-black text-[#78350F] text-center font-pencil px-2.5 py-0.5 rounded-lg glass-panel-subtle border border-amber-300/60 shadow-xs flex-shrink-0">
                        {selectedA !== null 
                          ? 'Pin Himpunan A terpilih! Klik pin di Himpunan B untuk menyambung panah.'
                          : '💡 Hubungkan: Klik pin A lalu klik pin B (atau tarik benang). Putus: Klik pin B terpasang.'}
                      </div>
                    </div>
                  )}

                  {/* 3. Matching Pairs */}
                  {questions[currentQIndex].type === 'MATCHING' && (
                    <div className="p-1 sm:p-1.5 rounded-xl glass-panel-subtle space-y-1 w-full max-w-lg mx-auto flex flex-col justify-center flex-1 min-h-0">
                      <MatchingSlotDiagram
                        pairs={questions[currentQIndex].pairs}
                        rightOptions={Array.from(new Set(questions[currentQIndex].pairs.map(p => p.result)))}
                        answers={answers[currentQIndex] || {}}
                        onSelectPair={(leftKey, opt) => {
                          audioEngine.playClick?.();
                          setAnswers(prev => {
                            const currentMap = prev[currentQIndex] || {};
                            return {
                              ...prev,
                              [currentQIndex]: { ...currentMap, [leftKey]: opt }
                            };
                          });
                        }}
                        onRemovePair={(leftKey) => {
                          audioEngine.playPop?.();
                          setAnswers(prev => {
                            const currentMap = { ...(prev[currentQIndex] || {}) };
                            delete currentMap[leftKey];
                            return {
                              ...prev,
                              [currentQIndex]: currentMap
                            };
                          });
                        }}
                        isAnswered={examSubmitted}
                        labelA="Domain x"
                        labelB="Kotak Nilai f(x)"
                      />
                    </div>
                  )}

                  {/* 4. Interactive Cartesian Coordinate Plotting */}
                  {questions[currentQIndex].type === 'CARTESIAN' && (() => {
                    const q = questions[currentQIndex];
                    const userPts = answers[currentQIndex] || [];
                    return (
                      <div className="w-full flex flex-col items-center justify-center gap-1 py-0.5 max-w-md mx-auto flex-shrink-0">
                        <div className="w-full flex items-center justify-center flex-shrink-0">
                          <RelationCartesianCanvas
                            minX={q.minX ?? 0}
                            maxX={q.maxX ?? 4}
                            minY={q.minY ?? 0}
                            maxY={q.maxY ?? 5}
                            labelX={q.labelX || 'Sumbu X'}
                            labelY={q.labelY || 'Sumbu Y'}
                            xLabels={q.xLabels || null}
                            yLabels={q.yLabels || null}
                            userPoints={userPts}
                            onPointToggle={handleToggleCartesianPoint}
                            drawLine={Boolean(q.drawLine)}
                            compact={true}
                          />
                        </div>
                        <div className="flex items-center justify-between w-full px-2 text-[10px] sm:text-[11px] font-black text-[#78350F] flex-shrink-0">
                          <span className="text-amber-800">{q.hint || 'Klik persilangan koordinat untuk menandai atau melepas titik.'}</span>
                          {userPts.length > 0 && (
                            <button
                              onClick={handleResetCartesianPoints}
                              className="px-2 py-0.5 rounded-md glass-card-rose text-rose-900 border border-rose-300 font-bold transition-all hover:scale-105 text-[10px] cursor-pointer ml-auto"
                            >
                              Reset Titik
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 5. Drag & Drop Card Classification */}
                  {questions[currentQIndex].type === 'DRAG_DROP' && (() => {
                    const q = questions[currentQIndex];
                    const items = q.items || [];
                    const categories = q.categories || [];
                    const userMapping = answers[currentQIndex] || {};
                    const unassignedItems = items.filter(it => !userMapping[it]);

                    return (
                      <div className="w-full flex flex-col gap-1.5 py-0.5 max-w-2xl mx-auto flex-1 min-h-0 justify-center">
                        <div className="text-center">
                          <span className="text-xs sm:text-[13px] font-black text-[#D97706] uppercase tracking-wide">
                            🎯 {q.subInstruction || "Pindahkan setiap kartu ke kotak kategori yang tepat!"}
                          </span>
                        </div>

                        {/* Category Drop Zones */}
                        <div className={`grid grid-cols-1 ${categories.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-1.5`}>
                          {categories.map((cat, cIdx) => {
                            const catItems = items.filter(it => userMapping[it] === cat);
                            const isTargetActive = selectedDragItem !== null;
                            const catColors = [
                              'glass-card-emerald text-emerald-950',
                              'glass-card-rose text-rose-950',
                              'glass-card-blue text-blue-950'
                            ];
                            const boxStyle = catColors[cIdx % catColors.length];

                            return (
                              <div
                                key={cIdx}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const itemData = e.dataTransfer.getData('text/plain');
                                  if (itemData) handleQuestDragAssign(itemData, cat);
                                }}
                                onClick={() => {
                                  if (selectedDragItem) {
                                    handleQuestDragAssign(selectedDragItem, cat);
                                  }
                                }}
                                className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all min-h-[58px] sm:min-h-[66px] flex flex-col justify-between ${boxStyle} ${
                                  isTargetActive ? 'ring-2 ring-amber-400 border-amber-500 cursor-pointer shadow-md' : 'shadow-xs'
                                }`}
                              >
                                <div className="flex items-center justify-between border-b border-black/10 pb-0.5 mb-1">
                                  <span className="font-black text-xs sm:text-[13px] tracking-wide uppercase">{cat}</span>
                                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black glass-panel-subtle border border-white/60">
                                    {catItems.length}
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-1 flex-1 items-start py-0.5">
                                  {catItems.map((item, itIdx) => (
                                    <span
                                      key={itIdx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuestDragRemove(item);
                                      }}
                                      className="px-2 py-0.5 rounded-lg text-xs font-pencil font-black glass-panel text-[#2D241E] border border-white/80 shadow-xs flex items-center gap-1 cursor-pointer hover:border-rose-400 hover:text-rose-700 transition"
                                      title="Klik untuk kembalikan kartu ke kotak pilihan"
                                    >
                                      <span>{item}</span>
                                      <span className="text-gray-400 text-xs font-bold">✕</span>
                                    </span>
                                  ))}
                                  {catItems.length === 0 && (
                                    <span className="text-[11px] text-gray-400 italic self-center mx-auto py-1">
                                      {isTargetActive ? "Ketuk untuk taruh kartu di sini" : "Kotak kosong"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Unassigned Card Tray */}
                        <div className="p-1.5 sm:p-2 rounded-xl glass-panel-subtle border border-amber-300/60">
                          <span className="text-[10px] sm:text-[11px] font-black text-[#78350F] uppercase tracking-wider block mb-0.5">
                            📦 PILIHAN KARTU ({unassignedItems.length} TERSISA):
                          </span>
                          <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                            {unassignedItems.map((item, idx) => {
                              const isSelected = selectedDragItem === item;
                              return (
                                <div
                                  key={idx}
                                  draggable={true}
                                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
                                  onClick={() => setSelectedDragItem(prev => prev === item ? null : item)}
                                  className={`px-2.5 py-1 rounded-lg font-pencil font-black text-xs border transition-all cursor-pointer select-none ${
                                    isSelected
                                      ? 'glass-card-amber border-2 border-amber-400 text-amber-950 scale-105 shadow-md ring-2 ring-amber-400 animate-pulse'
                                      : 'glass-panel text-[#2D241E] border border-white/80 hover:border-amber-400 hover:scale-102'
                                  }`}
                                >
                                  <span>{item}</span>
                                </div>
                              );
                            })}
                            {unassignedItems.length === 0 && (
                              <span className="text-xs font-bold text-emerald-700 py-0.5 flex items-center gap-1">
                                ✓ Semua kartu telah ditempatkan ke dalam kotak!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 6. Slot Fill Puzzle & Machine */}
                  {questions[currentQIndex].type === 'SLOT_FILL' && (() => {
                    const q = questions[currentQIndex];
                    const rawTokens = q.tokens || [];
                    const slots = q.slots || [];
                    const userSlots = answers[currentQIndex] || {};

                    // Auto-heal / Guarantee: ensure tokens tray always has at least as many cards as needed for all slot answers!
                    const neededCounts = {};
                    slots.forEach(s => {
                      const ans = s.answer ?? q.correctSlots?.[s.id];
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

                    const tokens = [...rawTokens];
                    for (const [ans, needed] of Object.entries(neededCounts)) {
                      const current = availableCounts[ans] || 0;
                      if (current < needed) {
                        for (let i = 0; i < (needed - current); i++) {
                          tokens.push(ans);
                        }
                      }
                    }

                    // Count assigned tokens so duplicate cards are disabled one-by-one
                    const assignedCounts = Object.values(userSlots).reduce((acc, t) => {
                      if (t !== undefined && t !== null) {
                        const key = String(t).trim();
                        acc[key] = (acc[key] || 0) + 1;
                      }
                      return acc;
                    }, {});
                    const seenCounts = {};

                    return (
                      <div className="w-full flex flex-col gap-1.5 py-0.5 max-w-lg mx-auto flex-1 min-h-0 justify-center">
                        <div className="text-center">
                          <span className="text-xs sm:text-[13px] font-black text-[#D97706] uppercase tracking-wide">
                            🧩 {q.subInstruction || "Pilih kartu angka di bawah, lalu klik kotak [ ? ] yang tepat!"}
                          </span>
                        </div>

                        {/* Slots */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {slots.map((s, sIdx) => {
                            const currentVal = userSlots[s.id];
                            const isSlotActive = selectedSlotToken !== null;

                            let slotStyle = 'glass-panel-subtle border border-amber-300/70';
                            if (currentVal) {
                              slotStyle = 'glass-card-amber border border-amber-400';
                            } else if (isSlotActive) {
                              slotStyle = 'glass-card-amber border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300';
                            }

                            return (
                              <div
                                key={sIdx}
                                onClick={() => {
                                  if (selectedSlotToken) {
                                    handleQuestSlotAssign(s.id, selectedSlotToken);
                                  } else if (currentVal) {
                                    handleQuestSlotRemove(s.id);
                                  }
                                }}
                                className={`p-2 rounded-xl border-2 flex items-center justify-between gap-2 transition cursor-pointer ${slotStyle}`}
                              >
                                <span className="text-xs sm:text-sm font-black text-[#2D241E] font-pencil">
                                  {s.label}
                                </span>
                                <div className="min-w-[44px] h-[30px] px-2 rounded-lg border flex items-center justify-center font-mono font-black text-xs sm:text-sm glass-panel border-white/70 shadow-inner">
                                  {currentVal ? (
                                    <span className="text-amber-900 font-bold">{currentVal}</span>
                                  ) : (
                                    <span className="text-gray-400 text-xs">[ ? ]</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Token Tray */}
                        <div className="p-2 rounded-xl glass-panel-subtle border border-amber-300/60">
                          <span className="text-[10px] sm:text-[11px] font-black text-[#78350F] uppercase tracking-wider block mb-1 text-center">
                            🔘 PILIHAN KARTU JAWABAN:
                          </span>
                          <div className="flex flex-wrap gap-1.5 items-center justify-center">
                            {tokens.map((token, tIdx) => {
                              const key = String(token).trim();
                              const seenSoFar = seenCounts[key] || 0;
                              const isUsed = (assignedCounts[key] || 0) > seenSoFar;
                              seenCounts[key] = seenSoFar + 1;
                              const isSelected = selectedSlotToken === token;
                              return (
                                <button
                                  key={tIdx}
                                  disabled={isUsed}
                                  onClick={() => setSelectedSlotToken(prev => prev === token ? null : token)}
                                  className={`px-3 py-1 rounded-lg font-mono font-black text-xs sm:text-sm border transition-all cursor-pointer ${
                                    isUsed
                                      ? 'opacity-30 glass-panel border-gray-300 text-gray-400 cursor-not-allowed'
                                      : isSelected
                                      ? 'glass-btn-amber ring-2 ring-amber-400 scale-105 shadow-md animate-pulse'
                                      : 'glass-btn text-[#2D241E] hover:scale-105'
                                  }`}
                                >
                                  {token}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 7. HPB_BUILDER (Himpunan Pasangan Berurutan Taktil) */}
                  {questions[currentQIndex].type === 'HPB_BUILDER' && (
                    <div className="w-full max-w-xl py-0.5 flex flex-col justify-center flex-1 min-h-0">
                      <HpbBuilder
                        setName={questions[currentQIndex].setName || 'R'}
                        pairs={questions[currentQIndex].pairs || []}
                        tokens={questions[currentQIndex].tokens || []}
                        values={answers[currentQIndex] || {}}
                        onAssign={handleQuestSlotAssign}
                        onRemove={handleQuestSlotRemove}
                        readOnly={examSubmitted}
                        isAnswered={examSubmitted}
                        subInstruction={questions[currentQIndex].subInstruction}
                      />
                    </div>
                  )}

                  {/* 8. TABLE_BUILDER (Tabel Relasi Taktil) */}
                  {questions[currentQIndex].type === 'TABLE_BUILDER' && (
                    <div className="w-full max-w-md py-0.5 flex flex-col justify-center flex-1 min-h-0">
                      <TableBuilder
                        title={questions[currentQIndex].tableTitle || 'Tabel Relasi Bukti'}
                        headers={questions[currentQIndex].headers || ['Domain (x)', 'Kodomain (y)']}
                        rows={questions[currentQIndex].rows || []}
                        tokens={questions[currentQIndex].tokens || []}
                        values={answers[currentQIndex] || {}}
                        onAssign={handleQuestSlotAssign}
                        onRemove={handleQuestSlotRemove}
                        readOnly={examSubmitted}
                        isAnswered={examSubmitted}
                        subInstruction={questions[currentQIndex].subInstruction}
                      />
                    </div>
                  )}
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
                    className="glass-btn-emerald px-5 py-1.5 sm:py-2 text-white font-black text-xs sm:text-sm lg:text-base rounded-xl cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    SELESAIKAN QUEST 🏁
                  </button>

                  <button
                    disabled={currentQIndex >= questions.length - 1}
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

      {/* FINAL EXAM RESULT SUMMARY & REVIEW DASHBOARD */}
      {examSubmitted && (
        <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
          <InstructorMascotGuide
            layout="dock"
            character="snowy"
            pose={score100 >= 70 ? 'celebrating' : 'thinking'}
            emotion={score100 >= 70 ? 'happy' : 'thinking'}
            title="INSTRUKTUR SNOWY"
            icon="❄️"
            message={
              resultTab === 'REVIEW'
                ? (wrongCount === 0
                    ? "Hebat sekali! Semua 10 soal berhasil kamu jawab dengan benar tanpa kesalahan! 🏆🐻"
                    : `Yuk pelajari ${wrongCount} soal yang masih keliru di bawah agar semakin paham konsepnya! 🐻🔍`)
                : (score100 >= 70 
                    ? "Luar biasa! Misi Ujian Quest Mode berhasil kamu selesaikan dengan gemilang! 🎉" 
                    : "Kerja bagus! Evaluasi bagian yang keliru lewat tombol review dan asah kemampuanmu! 💪")
            }
          />

          {resultTab === 'SUMMARY' ? (
            /* TAB 1: SUMMARY SCORE CARD */
            <div className="flex-1 min-h-0 h-full p-5 sm:p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center">
              
              <div className="space-y-1">
                <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#D97706] uppercase">HASIL MISI QUEST MODE</span>
                <h2 className="text-3xl sm:text-4xl font-black font-pencil text-[#2D241E]">
                  NILAI SKALA 100: {score100} / 100
                </h2>
                <p className="text-base sm:text-lg font-bold text-[#78350F]">
                  Chapter {subbabId}: {subData.title}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl glass-card-amber border border-amber-300 shadow-sm mx-auto mt-1">
                  <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span className="font-pencil font-black text-sm sm:text-base text-[#78350F]">
                    POIN DIPEROLEH: <b className="text-amber-800 text-base sm:text-lg">+{earnedPoints}</b> Poin
                  </span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 font-bold text-sm max-w-sm mx-auto w-full">
                <div className="p-3.5 rounded-2xl glass-card-emerald text-[#064E3B] shadow-md">
                  <span className="block text-xs uppercase font-black text-[#059669]">JUMLAH BENAR</span>
                  <span className="text-2xl sm:text-3xl font-black font-pencil">{correctCount} SOAL</span>
                </div>

                <div className="p-3.5 rounded-2xl glass-card-rose text-[#881337] shadow-md">
                  <span className="block text-xs uppercase font-black text-[#BE123C]">JUMLAH SALAH</span>
                  <span className="text-2xl sm:text-3xl font-black font-pencil">{wrongCount} SOAL</span>
                </div>
              </div>

              {/* Action Buttons: 1. Review Answers, 2. Back to Quest Select */}
              <div className="pt-2 max-w-md mx-auto w-full space-y-2.5">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setResultTab('REVIEW');
                  }}
                  className="glass-btn-blue w-full py-3 text-white font-black text-base sm:text-lg lg:text-xl flex items-center justify-center space-x-2 rounded-2xl cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-lg"
                >
                  <Eye className="w-6 h-6 text-white flex-shrink-0" />
                  <span>PERIKSA SEMUA JAWABAN & PEMBAHASAN</span>
                </button>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    try { reloVoiceService.stopVoice(); } catch {}
                    onBackToQuestSelect();
                  }}
                  className="glass-btn-amber w-full py-2.5 text-[#78350F] font-black text-base sm:text-lg flex items-center justify-center space-x-2 rounded-2xl cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-md"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D97706]" />
                  <span>KEMBALI KE PILIHAN MISI</span>
                </button>
              </div>

            </div>
          ) : (
            /* TAB 2: DETAILED QUESTION-BY-QUESTION REVIEW DASHBOARD (SIDEWAYS PER-SOAL) */
            <div className="flex-1 min-h-0 h-full p-2.5 sm:p-3 rounded-3xl glass-panel glass-sheen flex flex-col justify-between overflow-hidden gap-1.5 sm:gap-2 animate-fade-in">
              
              {/* Review Top Header Bar */}
              <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl glass-panel-subtle flex-shrink-0">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setResultTab('SUMMARY');
                  }}
                  className="pencil-btn px-3 py-1.5 glass-btn text-[#2D241E] font-black text-xs sm:text-sm flex items-center space-x-1.5 rounded-xl cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#E11D48]" />
                  <span>Ringkasan Skor</span>
                </button>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 font-pencil">
                  <button
                    onClick={() => { audioEngine.playClick(); setReviewFilter('ALL'); setReviewIndex(0); }}
                    className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                      reviewFilter === 'ALL'
                        ? 'glass-btn-blue text-white shadow-sm'
                        : 'glass-btn text-[#2D241E]'
                    }`}
                  >
                    Semua Soal ({evaluatedQuestions.length})
                  </button>
                  <button
                    onClick={() => { audioEngine.playClick(); setReviewFilter('WRONG'); setReviewIndex(0); }}
                    className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1 ${
                      reviewFilter === 'WRONG'
                        ? 'glass-btn-rose text-white shadow-sm'
                        : 'glass-card-rose text-rose-950 border border-rose-300 hover:border-rose-400'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Salah ({wrongCount})</span>
                  </button>
                  <button
                    onClick={() => { audioEngine.playClick(); setReviewFilter('CORRECT'); setReviewIndex(0); }}
                    className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1 ${
                      reviewFilter === 'CORRECT'
                        ? 'glass-btn-emerald text-white shadow-sm'
                        : 'glass-card-emerald text-emerald-950 border border-emerald-300 hover:border-emerald-400'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Benar ({correctCount})</span>
                  </button>
                </div>

                <div className="text-right flex items-center justify-end gap-2 sm:gap-2.5 flex-shrink-0">
                  <div className="px-2.5 py-1 rounded-xl glass-card-amber border border-amber-300/80 flex items-center gap-1 shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span className="font-pencil font-black text-xs sm:text-sm text-[#78350F]">
                      POIN: <b className="text-amber-800 text-xs sm:text-sm">+{earnedPoints}</b>
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl glass-card-emerald border border-emerald-300/80 flex items-center gap-1 shadow-sm">
                    <span className="font-pencil font-black text-xs sm:text-sm text-[#78350F]">
                      SKOR: <b className="text-[#059669] text-xs sm:text-sm">{score100}</b> / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Horizontal Question Selector Bar (Cek Kesamping) */}
              {displayedReviews.length > 0 && (
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl glass-panel-subtle flex-shrink-0 border border-white/60">
                  <div className="flex items-center gap-1.5 text-xs font-black font-pencil text-[#78350F] flex-shrink-0">
                    <span className="hidden sm:inline">PILIH SOAL:</span>
                    <span className="px-2 py-0.5 rounded-md glass-card-amber border border-amber-300/70 text-[#78350F]">
                      Soal {safeReviewIndex + 1} / {displayedReviews.length}
                    </span>
                  </div>

                  {/* Horizontal Scroll / Wrap Number Pills (No ugly scrollbar) */}
                  <div className="flex items-center gap-1.5 overflow-hidden py-1 px-1 max-w-full">
                    {displayedReviews.map((item, idx) => {
                      const isActive = idx === safeReviewIndex;
                      return (
                        <button
                          key={item.index}
                          onClick={() => {
                            audioEngine.playClick();
                            setReviewIndex(idx);
                          }}
                          title={`Lihat Soal #${item.index + 1} (${item.isCorrect ? 'Benar' : 'Salah'})`}
                          className={`relative px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1 flex-shrink-0 ${
                            isActive
                              ? (item.isCorrect
                                  ? 'glass-btn-emerald ring-2 ring-emerald-400 scale-105 shadow-md'
                                  : 'glass-btn-rose ring-2 ring-rose-400 scale-105 shadow-md')
                              : (item.isCorrect
                                  ? 'glass-card-emerald text-emerald-950 border border-emerald-300/80 hover:scale-102'
                                  : 'glass-card-rose text-rose-950 border border-rose-300/80 hover:scale-102')
                          }`}
                        >
                          {item.isCorrect ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600 inline" />
                          )}
                          <span>#{item.index + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Single Question Display Card (Per-Soal View) */}
              <div className="flex-1 min-h-0 flex flex-col justify-start overflow-hidden">
                {displayedReviews.length === 0 ? (
                  <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 glass-panel-subtle rounded-2xl border border-white/80 shadow-inner">
                    <span className="text-3xl sm:text-4xl mb-2">🎉</span>
                    <p className="text-base sm:text-lg font-black font-pencil text-[#2D241E]">
                      {reviewFilter === 'WRONG' ? 'Luar biasa! Tidak ada soal yang salah pada ujian ini!' : 'Tidak ada soal pada kategori ini.'}
                    </p>
                  </div>
                ) : activeReview ? (() => {
                  const cleanPrompt = (activeReview.q.question || '').replace(/^\[(?:Soal\s*\d+\s*-\s*)?[^\]]+\]\s*/i, '').trim();

                  return (
                    <div
                      key={activeReview.index}
                      className={`flex-1 min-h-0 p-3 sm:p-4 rounded-2xl transition shadow-md font-hand flex flex-col justify-between overflow-hidden animate-fade-in ${
                        activeReview.isCorrect
                          ? 'glass-card-emerald glass-sheen shadow-[0_8px_24px_rgba(16,185,129,0.18)]'
                          : 'glass-card-rose glass-sheen shadow-[0_8px_24px_rgba(244,63,94,0.18)]'
                      }`}
                    >
                      <div className="space-y-2 sm:space-y-2.5 flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5">
                        {/* Header: Soal #, Level, Tipe, and Status Badge */}
                        <div className="flex items-center justify-between pb-1.5 border-b border-black/10">
                          <div className="flex items-center gap-2">
                            <span className="font-daruma text-base sm:text-lg font-black text-[#B45309]">
                              SOAL #{activeReview.index + 1}
                            </span>
                            {activeReview.q.isOpenEnded && (
                              <span className="font-pencil px-2 py-0.5 rounded-md glass-card-emerald border border-emerald-400/80 text-xs font-black text-emerald-950 uppercase tracking-wide">
                                ✨ SOAL TERBUKA
                              </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-md glass-panel-subtle border border-amber-200/60 text-xs font-black text-[#78350F]">
                              Tipe: {formatQuestionType(activeReview.q.type)}
                            </span>
                          </div>

                          {activeReview.isCorrect ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-btn-emerald text-emerald-950 text-xs sm:text-sm font-black shadow-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>BENAR (+{activeReview.q.pts} Poin)</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-btn-rose text-rose-950 text-xs sm:text-sm font-black shadow-xs">
                              <XCircle className="w-4 h-4 text-rose-700" />
                              <span>SALAH (0 / {activeReview.q.pts} Poin)</span>
                            </span>
                          )}
                        </div>

                        {/* Question Prompt */}
                        <div className="p-2.5 sm:p-3 rounded-xl glass-panel-subtle border border-white/70 shadow-xs">
                          <p className="text-sm sm:text-base lg:text-lg font-black font-pencil text-[#2D241E] leading-relaxed">
                            {cleanPrompt}
                          </p>
                        </div>

                        {/* Comparison Boxes: Jawaban Kamu vs Kunci Jawaban Benar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                          {/* Box Jawaban Siswa */}
                          <div
                            className={`p-2.5 sm:p-3 rounded-xl border ${
                              activeReview.isCorrect
                                ? 'glass-card-emerald border-emerald-400/70 text-[#064E3B]'
                                : 'glass-card-rose border-rose-400/70 text-[#881337]'
                            }`}
                          >
                            <div className="flex items-center gap-1 font-black text-xs uppercase tracking-wide opacity-80 mb-1">
                              <span>✏️ Jawaban Kamu:</span>
                            </div>
                            <p className="font-pencil font-black text-xs sm:text-sm break-words leading-relaxed">
                              {activeReview.userText}
                            </p>
                          </div>

                          {/* Box Kunci Jawaban / Kriteria Terbuka */}
                          <div className="p-2.5 sm:p-3 rounded-xl border glass-card-amber border-amber-400/70 text-[#78350F]">
                            <div className="flex items-center gap-1 font-black text-xs uppercase tracking-wide opacity-80 mb-1">
                              <span>{activeReview.q.isOpenEnded ? '✨ Kriteria Soal Terbuka:' : '🎯 Kunci Jawaban Benar:'}</span>
                            </div>
                            <p className="font-pencil font-black text-xs sm:text-sm break-words leading-relaxed">
                              {activeReview.correctText}
                            </p>
                          </div>
                        </div>

                        {/* Letak Kesalahan / Diagnosis (Khusus kalau Salah) */}
                        {!activeReview.isCorrect && activeReview.diagnosis && (
                          <div className="p-2 sm:p-2.5 rounded-xl glass-card-rose border border-rose-400/80 text-rose-950 text-xs sm:text-[13px] font-bold flex items-start gap-2 shadow-xs">
                            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-black text-rose-800 uppercase mr-1">Bagian yang Keliru:</span>
                              <span className="font-pencil">{activeReview.diagnosis}</span>
                            </div>
                          </div>
                        )}

                        {/* Pembahasan / Penjelasan */}
                        {activeReview.explanation && (
                          <div className="p-2 sm:p-2.5 rounded-xl glass-card-amber border border-amber-400/70 text-[#78350F] text-xs sm:text-[13px] flex items-start gap-2 shadow-xs">
                            <Lightbulb className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-black uppercase text-[#B45309] mr-1">Pembahasan:</span>
                              <span className="font-pencil leading-relaxed">{activeReview.explanation}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })() : null}
              </div>

              {/* Bottom Navigation Bar (Cek Kesamping: Prev, Next, Exit) */}
              <div className="pt-1.5 flex items-center justify-between flex-shrink-0 border-t border-amber-300/40 gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setResultTab('SUMMARY');
                    }}
                    className="px-3.5 py-1.5 glass-btn text-[#2D241E] font-black text-xs sm:text-sm rounded-xl cursor-pointer"
                  >
                    ← Ringkasan
                  </button>

                  {/* Previous Question Button */}
                  <button
                    disabled={safeReviewIndex <= 0}
                    onClick={() => {
                      audioEngine.playClick();
                      setReviewIndex(safeReviewIndex - 1);
                    }}
                    className="px-4 py-1.5 glass-btn-amber text-[#78350F] font-black text-xs sm:text-sm rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Soal Sebelumnya</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Next Question Button */}
                  <button
                    disabled={safeReviewIndex >= displayedReviews.length - 1}
                    onClick={() => {
                      audioEngine.playClick();
                      setReviewIndex(safeReviewIndex + 1);
                    }}
                    className="px-4 py-1.5 glass-btn-blue text-white font-black text-xs sm:text-sm rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  >
                    <span>Soal Selanjutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      try { reloVoiceService.stopVoice(); } catch {}
                      onBackToQuestSelect();
                    }}
                    className="px-4 py-1.5 glass-btn text-[#78350F] font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-all hover:scale-102"
                  >
                    Pilihan Misi 🏁
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* CONFIRMATION MODAL ON EXIT ("YAKIN KELUAR?") */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in font-hand">
          <div className="w-full max-w-md p-6 sm:p-7 rounded-3xl glass-panel glass-sheen border-2 border-white/80 shadow-[0_24px_50px_rgba(0,0,0,0.35)] text-center space-y-4 animate-scale-up select-none">
            
            <div className="w-16 h-16 mx-auto rounded-2xl glass-card-rose border-2 border-rose-400/80 shadow-md flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black font-pencil text-[#2D241E]">
                YAKIN INGIN KELUAR UJIAN?
              </h3>
              <p className="text-sm sm:text-base text-[#78350F] font-bold leading-relaxed">
                Semua jawaban dan progres waktu 15 menit akan terulang dari awal jika kamu keluar sekarang!
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setShowExitConfirm(false);
                }}
                className="flex-1 py-3 glass-btn-emerald font-black text-base sm:text-lg rounded-2xl cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-md"
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
                className="flex-1 py-3 glass-btn-rose font-black text-base sm:text-lg rounded-2xl cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-md"
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
