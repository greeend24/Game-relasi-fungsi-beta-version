import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, ChevronLeft, ChevronRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chapterLearningData';
import RelationDiagramCanvas from './RelationDiagramCanvas';
import RelationCartesianCanvas from './RelationCartesianCanvas';
import RelationTableCanvas from './RelationTableCanvas';
import NetworkStatusBadge from './NetworkStatusBadge';
import InstructorMascotGuide from './InstructorMascotGuide';
import MathVisualizer from './visuals/MathVisualizer';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import confetti from 'canvas-confetti';
import ChapterVideoPlayer from './ChapterVideoPlayer';
import { CHAPTER3_VIDEOS } from '../data/chapter3Subtitles';

/**
 * ChapterLearning : Interactive Learning Controller
 * Fixed viewport, no scroll. Lesson slides + interactive cable/string connect + Cartesian grid + table + adaptive quizzes.
 * Enhanced with modern Glassmorphism aesthetics and persistent progression.
 */
export default function ChapterLearning({ chapterId = 1, onBack, onBackToMenu, onChapterComplete, onSegmentComplete, currentUser }) {
  const chapter = CHAPTERS_DATA[chapterId];
  const segments = chapter?.segments || [];
  const totalSegs = segments.length;

  const chProgress = currentUser?.progress?.[`chapter${chapterId}`] || currentUser?.progress?.[`subbab${chapterId}`];
  const savedCompletedCount = chProgress?.completedSegments || (chProgress?.stars ? Object.keys(chProgress.stars).length : 0);
  const isAlreadyFinished = Boolean(chProgress?.completed || savedCompletedCount >= totalSegs);

  const isAdmin = Boolean(
    currentUser?.isAdmin ||
    (currentUser?.username || '').toLowerCase() === 'fikran02' ||
    (currentUser?.fullname || '').toLowerCase() === 'admin'
  );

  // Initialize current segment index:
  // If already finished, start at 0 (allows review from start without being stuck at end).
  // If in-progress, resume at the next uncompleted segment.
  const [currentSegIdx, setCurrentSegIdx] = useState(() => {
    if (!isAlreadyFinished && savedCompletedCount > 0 && savedCompletedCount < totalSegs) {
      return savedCompletedCount;
    }
    return 0;
  });

  const [quizState, setQuizState] = useState('unanswered'); // 'unanswered' | 'correct' | 'wrong' | 'remedial' | 'retry'
  const [selectedOption, setSelectedOption] = useState(null);

  // State for Interactive Red String / Pin Connecting segments
  const [userConnections, setUserConnections] = useState([]);
  const [selectedIdxA, setSelectedIdxA] = useState(null);
  const [connectVerified, setConnectVerified] = useState(false);
  const [connectError, setConnectError] = useState(null);

  // State for Interactive Cartesian Coordinate plotting
  const [userCartesianPoints, setUserCartesianPoints] = useState([]);
  const [cartesianVerified, setCartesianVerified] = useState(false);
  const [cartesianError, setCartesianError] = useState(null);

  // State for Interactive Table & Ordered Pairs
  const [userTableAssignments, setUserTableAssignments] = useState({});
  const [tableVerified, setTableVerified] = useState(false);
  const [tableError, setTableError] = useState(null);

  // State for HOTS / Quiz Detective Clue
  const [showClue, setShowClue] = useState(false);

  // State for Chapter 3 Video Subtitles & Audio Lip-sync
  const [videoSubtitle, setVideoSubtitle] = useState('');
  const [videoSpeaking, setVideoSpeaking] = useState(false);

  // Pre-fill completedSegments set from saved progress (if already finished, mark all completed)
  const [completedSegments, setCompletedSegments] = useState(() => {
    const s = new Set();
    const count = isAlreadyFinished ? totalSegs : savedCompletedCount;
    for (let i = 0; i < count; i++) {
      s.add(i);
    }
    return s;
  });

  const [quizScore, setQuizScore] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [reloText, setReloText] = useState('');

  const seg = segments[currentSegIdx];
  const isLastSeg = currentSegIdx === totalSegs - 1;

  // Mascot Emotion & Pose Derivation (aligned with Endless Mode Instructor setup)
  const isSuccess = connectVerified || cartesianVerified || tableVerified || quizState === 'correct' || showComplete;
  const isError = Boolean(connectError || cartesianError || tableError || quizState === 'wrong');

  const reloPose = showComplete
    ? 'celebrating'
    : isSuccess
    ? 'celebrating'
    : isError
    ? 'thinking'
    : (seg?.type === 'quiz' && quizState === 'unanswered')
    ? 'thinking'
    : 'standing';

  const reloEmotion = (showComplete || isSuccess)
    ? 'happy'
    : isError
    ? 'error'
    : 'idle';

  const reloTitle = isError
    ? 'PETUNJUK DETEKTIF RELO'
    : isSuccess
    ? 'CATATAN DETEKTIF RELO'
    : 'DETEKTIF RELO';

  // Navigation validation states
  const isSegmentComplete = completedSegments.has(currentSegIdx);
  const canAdvance = Boolean(
    isSegmentComplete ||
    seg?.type === 'lesson' ||
    (seg?.type === 'video' && completedSegments.has(currentSegIdx)) ||
    (seg?.type === 'interactive_connect' && connectVerified) ||
    (seg?.type === 'interactive_cartesian' && cartesianVerified) ||
    (seg?.type === 'interactive_table' && tableVerified) ||
    (seg?.type === 'quiz' && quizState === 'correct')
  );

  const disabledReason = 
    seg?.type === 'video' ? 'Selesaikan video dan kuis kasus terlebih dahulu' :
    seg?.type === 'interactive_connect' ? 'Hubungkan benang merah sesuai aturan kasus' :
    seg?.type === 'interactive_cartesian' ? 'Pasang titik koordinat pada diagram' :
    seg?.type === 'interactive_table' ? 'Lengkapi kolom tabel yang kosong' :
    seg?.type === 'quiz' ? 'Jawab kuis kasus ini terlebih dahulu' : '';

  // Restore states ONLY when chapterId changes (App.jsx mounts with key={currentSubbabId})
  // DO NOT include currentUser here: updating currentUser on slide completion must NEVER wipe showComplete or reset slide position!
  useEffect(() => {
    const p = currentUser?.progress?.[`chapter${chapterId}`] || currentUser?.progress?.[`subbab${chapterId}`];
    const count = p?.completedSegments || (p?.stars ? Object.keys(p.stars).length : 0);
    const finished = Boolean(p?.completed || count >= totalSegs);
    const initialIdx = (!finished && count > 0 && count < totalSegs) ? count : 0;
    setCurrentSegIdx(initialIdx);
    setQuizState('unanswered');
    setSelectedOption(null);
    setUserConnections([]);
    setSelectedIdxA(null);
    setConnectVerified(false);
    setConnectError(null);
    setUserCartesianPoints([]);
    setCartesianVerified(false);
    setCartesianError(null);
    setUserTableAssignments({});
    setTableVerified(false);
    setTableError(null);
    const s = new Set();
    const totalCount = finished ? totalSegs : count;
    for (let i = 0; i < totalCount; i++) s.add(i);
    setCompletedSegments(s);
    setQuizScore(0);
    setShowComplete(false);
    setShowClue(false);
  }, [chapterId]);

  // Reset quiz, connect, cartesian, & table state on segment change
  useEffect(() => {
    setQuizState('unanswered');
    setSelectedOption(null);
    setSelectedIdxA(null);
    setConnectError(null);
    setCartesianError(null);
    setTableError(null);
    setShowClue(false);

    // Setup interactive connect
    if (seg?.type === 'interactive_connect') {
      if (completedSegments.has(currentSegIdx) && seg.validPairs) {
        setUserConnections(seg.validPairs);
        setConnectVerified(true);
      } else {
        setUserConnections([]);
        setConnectVerified(false);
      }
    } else {
      setUserConnections([]);
      setConnectVerified(false);
    }

    // Setup interactive cartesian
    if (seg?.type === 'interactive_cartesian') {
      if (completedSegments.has(currentSegIdx) && seg.targetPoints) {
        setUserCartesianPoints(seg.targetPoints);
        setCartesianVerified(true);
      } else {
        setUserCartesianPoints([]);
        setCartesianVerified(false);
      }
    } else {
      setUserCartesianPoints([]);
      setCartesianVerified(false);
    }

    // Setup interactive table
    if (seg?.type === 'interactive_table') {
      if (completedSegments.has(currentSegIdx) && seg.expectedAssignments) {
        setUserTableAssignments(seg.expectedAssignments);
        setTableVerified(true);
      } else {
        setUserTableAssignments({});
        setTableVerified(false);
      }
    } else {
      setUserTableAssignments({});
      setTableVerified(false);
    }
  }, [currentSegIdx, completedSegments]);

  // Set mascot text based on segment
  useEffect(() => {
    if (!seg) return;
    if (seg.type === 'lesson') {
      setReloText(seg.hint || `Halo Detektif! Pelajari materi "${seg.title}" ini dengan teliti ya. Setelah paham, tekan tombol Lanjut!`);
    } else if (seg.type === 'interactive_connect') {
      if (connectVerified) setReloText(seg.successMessage || '🎉 Luar biasa! Sambungan benang merahmu tepat sasaran!');
      else if (connectError) setReloText(connectError);
      else setReloText(seg.instruction || '📌 Tarik benang merah dari pin A ke pin B sesuai aturan berkas kasus!');
    } else if (seg.type === 'interactive_cartesian') {
      if (cartesianVerified) setReloText(seg.successMessage || '🎉 Luar biasa! Seluruh titik koordinat terpasang akurat!');
      else if (cartesianError) setReloText(cartesianError);
      else setReloText(seg.instruction || '📍 Klik perpotongan garis untuk memasang titik koordinat (x, y)!');
    } else if (seg.type === 'interactive_table') {
      if (tableVerified) setReloText(seg.successMessage || '🎉 Keren! Tabel bukti dan pasangan berurutan lengkap!');
      else if (tableError) setReloText(tableError);
      else setReloText(seg.instruction || '📊 Pilih chip untuk melengkapi kolom tabel yang kosong!');
    } else if (seg.type === 'quiz') {
      if (quizState === 'unanswered') setReloText('🤔 Coba jawab kuis kasus ini! Pilih opsi yang menurutmu paling tepat.');
      else if (quizState === 'correct') setReloText(`🎉 Hebat! Jawabanmu benar! ${seg.explanation || ''}`);
      else if (quizState === 'wrong') setReloText('😅 Belum tepat, Detektif. Yuk cermati pembahasannya bersama!');
      else if (quizState === 'remedial') setReloText('💡 Ini penjelasan yang lebih mudah untuk memperjelas analisismu...');
      else if (quizState === 'retry') setReloText('🔄 Ayo coba lagi dengan soal serupa! Kamu pasti bisa!');
    }
  }, [seg, quizState, connectVerified, connectError, cartesianVerified, cartesianError, tableVerified, tableError]);

  // Clean up any playing mascot voice when navigating away or unmounting
  useEffect(() => {
    return () => {
      try { reloVoiceService.stopVoice(); } catch {}
    };
  }, []);

  const handleNext = useCallback(() => {
    const completedSegNum = currentSegIdx + 1;
    setCompletedSegments(prev => new Set([...prev, currentSegIdx]));

    // Persist completed segment immediately to storage and backend
    onSegmentComplete?.(chapterId, completedSegNum, 10);

    if (currentSegIdx < totalSegs - 1) {
      setCurrentSegIdx(prev => prev + 1);
      audioEngine.playClick?.() || audioEngine.playHover?.();
    } else {
      // Chapter complete!
      setShowComplete(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      audioEngine.playSuccess?.();
      const totalChapters = Object.keys(CHAPTERS_DATA).length;
      const isLastChapter = chapterId >= totalChapters;
      try {
        let res;
        if (isLastChapter) {
          res = reloVoiceService.playScene('chapter_final_conclusion');
        } else {
          res = reloVoiceService.playScene('chapter_complete');
        }
        if (res?.text) {
          setReloText(res.text);
        }
      } catch {}
      // Instantly persist progress & unlock next chapter
      onChapterComplete?.(chapterId, false);
    }
  }, [currentSegIdx, totalSegs, chapterId, onSegmentComplete, onChapterComplete]);

  const handlePrev = useCallback(() => {
    if (currentSegIdx > 0) {
      setCurrentSegIdx(prev => prev - 1);
      audioEngine.playClick?.() || audioEngine.playHover?.();
    }
  }, [currentSegIdx]);

  // Interactive Connect Handlers
  const handleSelectA = (idxA) => {
    audioEngine.playClick?.();
    setSelectedIdxA(prev => prev === idxA ? null : idxA);
    setConnectError(null);
  };

  const handleSelectB = (idxB, overrideIdxA) => {
    const fromA = overrideIdxA !== undefined ? overrideIdxA : selectedIdxA;

    // KASUS 1: Tidak ada Domain A yang dipilih (klik langsung di Kodomain B)
    if (fromA === null || fromA === undefined) {
      const hasConnection = userConnections.some(([, b]) => b === idxB);
      if (hasConnection) {
        audioEngine.playHover?.();
        setUserConnections(prev => prev.filter(([, b]) => b !== idxB));
        setConnectError(null);
        setConnectVerified(false);
      }
      return;
    }

    // KASUS 2: Ada Domain A yang dipilih (sambungkan tanpa memutus sambungan Domain A yang lain)
    audioEngine.playClick?.();

    const alreadyConnected = userConnections.some(([a, b]) => a === fromA && b === idxB);
    if (!alreadyConnected) {
      setUserConnections(prev => [...prev, [fromA, idxB]]);
    }

    setSelectedIdxA(null);
    setConnectError(null);
    setConnectVerified(false);
  };

  const handleDisconnectPair = (idxA, idxB) => {
    audioEngine.playHover?.();
    setUserConnections(prev => prev.filter(([a, b]) => !(a === idxA && b === idxB)));
    setConnectError(null);
    setConnectVerified(false);
  };

  const handleVerifyConnect = () => {
    if (!seg?.validPairs) return;
    const validPairs = seg.validPairs;
    const isSameLength = userConnections.length === validPairs.length;
    const isAllValid = isSameLength && userConnections.every(([a, b]) =>
      validPairs.some(([va, vb]) => va === a && vb === b)
    );

    if (isAllValid) {
      audioEngine.playCorrect?.() || audioEngine.playSuccess?.();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setConnectVerified(true);
      setConnectError(null);
      setReloText(seg.successMessage || '🎉 Luar biasa! Sambungan benang merahmu tepat sasaran!');
      try { reloVoiceService.playScene('case_correct'); } catch {}
    } else {
      audioEngine.playError?.();
      setConnectVerified(false);
      let errMsg = '';
      if (userConnections.length === 0) {
        errMsg = 'Tarik benang dari pin A ke pin B terlebih dahulu sebelum memeriksa.';
      } else if (userConnections.length < validPairs.length) {
        errMsg = 'Masih ada pin yang belum kamu hubungkan sesuai aturan kasus. ' + (seg.hint || '');
      } else {
        errMsg = 'Terdapat sambungan benang yang belum sesuai dengan aturan kasus. ' + (seg.hint || '');
      }
      setConnectError(errMsg);
      setReloText(errMsg);
      try { reloVoiceService.playScene('case_wrong'); } catch {}
    }
  };

  // Interactive Cartesian Handlers
  const handleCartesianPointToggle = (x, y) => {
    setCartesianError(null);
    setUserCartesianPoints(prev => {
      const exists = prev.some(([px, py]) => px === x && py === y);
      if (exists) {
        return prev.filter(([px, py]) => !(px === x && py === y));
      } else {
        return [...prev, [x, y]];
      }
    });
  };

  const handleVerifyCartesian = () => {
    if (!seg?.targetPoints) return;
    const targets = seg.targetPoints;
    const isSameCount = userCartesianPoints.length === targets.length;
    const isAllMatch = isSameCount && userCartesianPoints.every(([ux, uy]) =>
      targets.some(([tx, ty]) => tx === ux && ty === uy)
    );

    if (isAllMatch) {
      audioEngine.playCorrect?.() || audioEngine.playSuccess?.();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setCartesianVerified(true);
      setCartesianError(null);
      setReloText(seg.successMessage || '🎉 Luar biasa! Seluruh titik koordinat terplot dengan tepat!');
      try { reloVoiceService.playScene('case_correct'); } catch {}
    } else {
      audioEngine.playError?.();
      setCartesianVerified(false);
      let errMsg = '';
      if (userCartesianPoints.length === 0) {
        errMsg = 'Pasang titik koordinat pada diagram terlebih dahulu sebelum memeriksa.';
      } else if (userCartesianPoints.length < targets.length) {
        errMsg = 'Masih ada titik koordinat yang belum kamu pasang. ' + (seg.hint || '');
      } else {
        errMsg = 'Ada titik koordinat yang belum tepat posisinya. ' + (seg.hint || '');
      }
      setCartesianError(errMsg);
      setReloText(errMsg);
      try { reloVoiceService.playScene('case_wrong'); } catch {}
    }
  };

  // Interactive Table Handlers
  const handleTableAssignChip = (rowId, chip) => {
    setTableError(null);
    setUserTableAssignments(prev => ({
      ...prev,
      [rowId]: chip,
    }));
  };

  const handleTableRemoveChip = (rowId) => {
    setTableError(null);
    setUserTableAssignments(prev => {
      const next = { ...prev };
      delete next[rowId];
      return next;
    });
  };

  const handleVerifyTable = () => {
    if (!seg?.expectedAssignments) return;
    const expected = seg.expectedAssignments;
    const requiredKeys = Object.keys(expected);
    const isAllAssigned = requiredKeys.every(k => userTableAssignments[k]);

    if (!isAllAssigned) {
      audioEngine.playError?.();
      setTableVerified(false);
      setTableError('Lengkapi semua baris kosong pada tabel bukti sebelum memeriksa.');
      setReloText('🔍 Masih ada kolom tabel yang belum kamu isi!');
      try { reloVoiceService.playScene('case_wrong'); } catch {}
      return;
    }

    const isAllCorrect = requiredKeys.every(k => userTableAssignments[k] === expected[k]);

    if (isAllCorrect) {
      audioEngine.playCorrect?.() || audioEngine.playSuccess?.();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTableVerified(true);
      setTableError(null);
      setReloText(seg.successMessage || '🎉 Mantap! Tabel bukti dan pasangan berurutan tersusun tepat!');
      try { reloVoiceService.playScene('case_correct'); } catch {}
    } else {
      audioEngine.playError?.();
      setTableVerified(false);
      const errMsg = 'Masih ada nilai atau pasangan yang belum cocok dengan aturan relasi. ' + (seg.hint || '');
      setTableError(errMsg);
      setReloText(errMsg);
      try { reloVoiceService.playScene('case_wrong'); } catch {}
    }
  };

  const handleQuizAnswer = (option) => {
    if (quizState !== 'unanswered' && quizState !== 'retry') return;
    setSelectedOption(option);

    const correctAnswer = quizState === 'retry' ? seg.remedial?.retryQuestion?.correct : seg.correct;

    if (option === correctAnswer) {
      setQuizState('correct');
      setQuizScore(prev => prev + 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      audioEngine.playSuccess?.();
      try { reloVoiceService.playScene('case_correct'); } catch {}
    } else {
      if (quizState === 'retry') {
        // Second attempt wrong : just show correct answer and let them proceed
        setQuizState('correct');
        audioEngine.playError?.();
        try { reloVoiceService.playScene('case_wrong'); } catch {}
      } else {
        setQuizState('wrong');
        audioEngine.playError?.();
        try { reloVoiceService.playScene('case_wrong'); } catch {}
      }
    }
  };

  const handleShowRemedial = () => {
    setQuizState('remedial');
    setSelectedOption(null);
  };

  const handleRetry = () => {
    setQuizState('retry');
    setSelectedOption(null);
  };

  // Render markdown-like bold text
  const renderText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-[#D97706] font-black">{part.slice(2, -2)}</strong>;
      }
      // Handle newlines
      const lines = part.split('\n');
      return lines.map((line, j) => (
        <React.Fragment key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </React.Fragment>
      ));
    });
  };

  // ═══════════════════════════════════════
  // CHAPTER COMPLETE SCREEN (GLASSMORPHISM)
  // ═══════════════════════════════════════
  if (showComplete) {
    const totalQuizzes = segments.filter(s => s.type === 'quiz').length;
    const totalChapters = Object.keys(CHAPTERS_DATA).length;
    const isLastChapter = chapterId >= totalChapters;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 relative z-20 animate-fade-in select-none">
        <div className="rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 animate-scale-up glass-panel glass-sheen border-2 border-white/80 shadow-[0_24px_50px_rgba(0,0,0,0.25)] select-none">
          <div className="text-5xl sm:text-6xl animate-bounce">🎓</div>

          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full glass-panel-subtle border border-amber-400/60 text-[#D97706] text-xs font-black tracking-wider uppercase">
              {chapter.icon} CHAPTER {chapterId} SELESAI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-pencil">
              Misi Penyelidikan Tuntas! 🎉
            </h2>
            <p className="text-sm sm:text-base text-[#78350F] font-bold">
              {chapter.title}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-base sm:text-lg glass-panel-subtle p-3 rounded-2xl border border-amber-400/50 shadow-[0_4px_16px_rgba(217,119,6,0.12)]">
            <Trophy className="w-6 h-6 text-[#D97706]" />
            <span className="font-black text-[#2D241E]">
              Kuis Berhasil: {quizScore}/{totalQuizzes}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#78350F] font-bold">
            {isLastChapter 
              ? 'Hebat sekali, Detektif! Kamu telah menuntaskan seluruh Chapter Relasi & Fungsi!' 
              : `Chapter ${chapterId + 1} sekarang telah terbuka dan siap kamu pelajari!`}
          </p>

          {/* Action Buttons: Lanjut Chapter Berikutnya & Menu Awal */}
          <div className="flex flex-col gap-2.5 pt-2">
            {!isLastChapter ? (
              <button
                onClick={() => {
                  try { audioEngine.playClick?.(); } catch {}
                  setShowComplete(false);
                  onChapterComplete?.(chapterId, true);
                }}
                className="glass-btn glass-btn-amber w-full py-3.5 px-5 rounded-2xl text-amber-950 font-black shadow-[0_10px_28px_rgba(245,158,11,0.30)] hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xl"
              >
                <span>Lanjut ke Chapter {chapterId + 1}</span>
                <span>➔</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  try { audioEngine.playClick?.(); } catch {}
                  if (onBackToMenu) onBackToMenu();
                  else onBack();
                }}
                className="glass-btn glass-btn-emerald w-full py-3.5 px-5 rounded-2xl text-emerald-950 font-black shadow-[0_10px_28px_rgba(16,185,129,0.30)] hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xl"
              >
                <span>🏆 Kembali ke Menu Utama</span>
              </button>
            )}

            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  try { audioEngine.playClick?.(); } catch {}
                  try { reloVoiceService.stopVoice(); } catch {}
                  onChapterComplete?.(chapterId, false);
                  if (onBackToMenu) onBackToMenu();
                  else onBack();
                }}
                className="flex-1 py-3 px-3 rounded-xl glass-btn text-[#2D241E] font-black text-xs sm:text-sm border border-[#2D241E]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>🏠</span>
                <span>Menu Awal</span>
              </button>

              <button
                onClick={() => {
                  try { audioEngine.playClick?.(); } catch {}
                  try { reloVoiceService.stopVoice(); } catch {}
                  onChapterComplete?.(chapterId, false);
                  onBack();
                }}
                className="flex-1 py-3 px-3 rounded-xl glass-btn text-[#78350F] font-bold text-xs sm:text-sm border border-[#2D241E]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📖</span>
                <span>Pilih Chapter</span>
              </button>
            </div>
          </div>
        </div>

        {/* DETEKTIF RELO CELEBRATING MASCOT ON CHAPTER COMPLETION */}
        <InstructorMascotGuide
          layout="floating"
          character="relo"
          pose="celebrating"
          emotion="happy"
          title="DETEKTIF RELO"
          icon="🦉"
          canSpeak={true}
          message={reloText || (isLastChapter 
            ? "Luar biasa, Detektif Hebat! Kamu telah berhasil menaklukkan seluruh materi Relasi dan Fungsi dari awal sampai akhir! Relo sangat bangga padamu! 🏆🎉🦉" 
            : "Luar biasa! Satu bab materi sudah berhasil kamu kuasai. Pemahamanmu tentang relasi dan fungsi semakin tajam, Detektif! 📖🎓🦉")}
        />
      </div>
    );
  }

  if (!seg) return null;

  // ═══════════════════════════════════════
  // MAIN LEARNING VIEW (FIXED VIEWPORT + GLASSMORPHISM)
  // ═══════════════════════════════════════
  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative z-20">
      {/* ── TOP BAR: Chapter info + progress (Authentic Frosted Glass) ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 sm:px-5 py-2 glass-panel-subtle z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              try { reloVoiceService.stopVoice(); } catch {}
              onBack();
            }}
            className="p-1.5 rounded-lg glass-btn transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#2D241E]" />
          </button>
          <span className="text-sm sm:text-base font-black text-[#D97706] uppercase tracking-wide">
            {chapter.icon} Ch.{chapterId}
          </span>
          <span className="text-sm sm:text-base font-bold text-[#2D241E] break-words">
            {chapter.title}
          </span>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NetworkStatusBadge compact={true} />
          <span className="text-xs sm:text-sm font-bold text-[#78350F]">
            {currentSegIdx + 1}/{totalSegs}
          </span>
          {/* Segment dots (desktop) */}
          <div className="hidden sm:flex items-center gap-1.5">
            {chapter.segments.map((s, idx) => {
              const isCompleted = completedSegments.has(idx) || idx < currentSegIdx;
              const canClick = isAdmin || isCompleted || idx <= currentSegIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!canClick}
                  onClick={() => {
                    if (canClick) {
                      setCurrentSegIdx(idx);
                      audioEngine.playClick?.() || audioEngine.playHover?.();
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSegIdx
                      ? 'bg-[#D97706] scale-125 ring-2 ring-[#D97706]/40 cursor-default'
                      : isCompleted || isAdmin
                      ? 'bg-[#22C55E] hover:scale-125 cursor-pointer'
                      : 'bg-white/40 border border-white/60 cursor-not-allowed opacity-50'
                  }`}
                  title={`Segmen ${idx + 1}: ${s.title}${isCompleted ? ' (Selesai)' : ''}`}
                />
              );
            })}
          </div>
          {/* Mobile progress bar */}
          <div className="sm:hidden w-20 h-2 bg-white/40 rounded-full border border-white/60 overflow-hidden">
            <div
              className="h-full bg-[#D97706] rounded-full transition-all duration-300"
              style={{ width: `${((currentSegIdx + 1) / totalSegs) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA (FIXED, NO SCROLL: LEFT MASCOT DOCK & CENTER SLIDE WORKSPACE WITH SIDE CHEVRONS) ── */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-3.5 relative overflow-hidden">
        {/* Left Mascot Dock: Detektif Relo (Tampil konsisten di sisi kiri untuk semua slide & video materi) */}
        <InstructorMascotGuide
          layout="dock"
          character="relo"
          pose={seg?.type === 'video' ? 'standing' : reloPose}
          emotion={seg?.type === 'video' ? 'happy' : reloEmotion}
          title={seg?.type === 'video' ? 'SUBTITLE MATERI' : reloTitle}
          icon={seg?.type === 'video' ? '🎬' : '🕵️‍♂️'}
          message={seg?.type === 'video' ? (videoSubtitle || '') : reloText}
          isSpeaking={seg?.type === 'video' ? videoSpeaking : undefined}
          canSpeak={seg?.type !== 'video'}
          disableAutoDismiss={seg?.type === 'video'}
        />

        {/* ── SLIDE WORKSPACE WITH SIDE NAVIGATION BUTTONS (< Sebelumnya & Lanjut >) ── */}
        <div className="flex-1 min-h-0 h-full flex items-center justify-between gap-1.5 sm:gap-2.5 relative overflow-hidden">

          {/* ── TOMBOL SEBELUMNYA (<) ── */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSegIdx === 0}
            title={currentSegIdx === 0 ? "Ini segmen pertama" : "Kembali ke segmen sebelumnya"}
            className={`glass-btn w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 z-30 select-none flex-shrink-0 ml-0.5 sm:ml-1 backdrop-blur-xl ${
              currentSegIdx === 0
                ? 'bg-white/10 border-white/20 text-slate-400 shadow-none cursor-not-allowed opacity-30'
                : 'bg-white/35 hover:bg-white/60 text-[#1E293B] border-white/80 shadow-md hover:scale-110 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* ── CENTER SLIDE CARD WORKSPACE ── */}
          <div className="flex-1 min-w-0 h-full flex flex-col justify-center overflow-hidden">

          {/* ═══ VIDEO SEGMENT (CHAPTER 3 VIDEO LEARNING) ═══ */}
          {seg?.type === 'video' && (
            <div className="w-full h-full flex flex-col justify-center animate-fade-in overflow-hidden">
              <ChapterVideoPlayer
                videoData={CHAPTER3_VIDEOS[seg.videoKey] || CHAPTER3_VIDEOS['3.1']}
                onQuizPassed={(videoId) => {
                  setCompletedSegments(prev => new Set([...prev, currentSegIdx]));
                  setQuizScore(prev => prev + 1);
                  onSegmentComplete?.(chapterId, currentSegIdx + 1, 10);
                }}
                onNextSegment={handleNext}
                onPrevSegment={handlePrev}
                onSubtitleChange={setVideoSubtitle}
                onSpeakingChange={setVideoSpeaking}
                isFirstSegment={currentSegIdx === 0}
                isLastSegment={isLastSeg}
                isAdmin={isAdmin}
              />
            </div>
          )}

          {/* ═══ LESSON SLIDE (AUTHENTIC CRYSTAL GLASS) ═══ */}
          {seg.type === 'lesson' && (
            <div className="glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-4 sm:p-6 animate-fade-in flex flex-col h-full max-h-full justify-between">
              {/* Title */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-shrink-0">
                <span className="text-2xl sm:text-3xl">{seg.emoji}</span>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#2D241E] font-pencil leading-tight">
                  {seg.title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 flex flex-col justify-start overflow-y-auto drag-scroller space-y-2 pr-1">
                {seg.content.map((text, i) => (
                  <p key={i} className="text-base sm:text-lg leading-relaxed text-[#2D241E]">
                    {renderText(text)}
                  </p>
                ))}
              </div>

              {/* Visualizer (if visual is defined) */}
              {seg.visual && (
                <div className="mt-2 flex-shrink-0">
                  <MathVisualizer visual={seg.visual} compact={true} />
                </div>
              )}

              {/* Diagram fallback (renders authentic detective red rope diagram) */}
              {!seg.visual && seg.diagram && (
                <div className="mt-2 flex-shrink-0">
                  <MathVisualizer
                    visual={{
                      type: 'arrow_diagram',
                      setA: seg.diagram.setA || [],
                      setB: seg.diagram.setB || [],
                      pairs: seg.diagram.arrows || [],
                      labelA: seg.diagram.labelA || 'Himpunan A',
                      labelB: seg.diagram.labelB || 'Himpunan B',
                      statusBadge: seg.diagram.title || ''
                    }}
                    compact={true}
                  />
                  {seg.diagram.caption && (
                    <p className="text-xs text-[#78350F] mt-1 text-center italic font-bold">{seg.diagram.caption}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ═══ INTERACTIVE CONNECT (DETECTIVE RED STRING BOARD) ═══ */}
          {seg.type === 'interactive_connect' && (
            <div className="glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-3 sm:p-5 animate-fade-in flex flex-col h-full max-h-full justify-between overflow-hidden">
              {/* Header banner */}
              <div className="flex items-center justify-between gap-2 flex-shrink-0 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{seg.emoji || '📌'}</span>
                  <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#2D241E] font-pencil">
                    {seg.title}
                  </h2>
                </div>
                {connectVerified && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-500 font-black text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi
                  </span>
                )}
              </div>

              {/* Rule & Instruction Box */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-300/80 text-xs sm:text-sm font-bold text-[#78350F] flex-shrink-0 flex items-center justify-between gap-2">
                <div>
                  <span className="font-black text-[#B45309] uppercase mr-1.5">📌 Kasus:</span>
                  <span className="text-[#2D241E]">{seg.ruleText || seg.instruction}</span>
                </div>
              </div>

              {/* Live Canvas Area */}
              <div className="flex-1 min-h-0 flex flex-col justify-center py-1">
                <RelationDiagramCanvas
                  setA={seg.setA}
                  setB={seg.setB}
                  connections={userConnections}
                  selectedA={selectedIdxA}
                  onSelectA={handleSelectA}
                  onSelectB={handleSelectB}
                  onDisconnectPair={handleDisconnectPair}
                  labelA={seg.labelA || "Himpunan A"}
                  labelB={seg.labelB || "Himpunan B"}
                  compact={true}
                />
              </div>

              {/* Feedback Alert */}
              {connectError && (
                <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-400 text-xs text-rose-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{connectError}</span>
                </div>
              )}

              {connectVerified && (
                <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-400 text-xs text-emerald-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{seg.successMessage || 'Benang merah terhubung sempurna!'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setUserConnections([]);
                    setSelectedIdxA(null);
                    setConnectVerified(false);
                    setConnectError(null);
                    audioEngine.playClick?.();
                  }}
                  className="px-3 py-1.5 rounded-xl glass-btn text-[#78350F] text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Benang
                </button>

                <button
                  type="button"
                  onClick={handleVerifyConnect}
                  className={`glass-btn px-6 sm:px-8 py-2.5 rounded-2xl border text-sm sm:text-base font-black transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-xl ${
                    connectVerified
                      ? 'glass-btn-emerald ring-2 ring-emerald-400/50'
                      : 'glass-btn-amber hover:scale-105 active:scale-95'
                  }`}
                >
                  <span>{connectVerified ? '✓ Sudah Tepat' : 'Periksa Sambungan'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ═══ INTERACTIVE CARTESIAN (COORDINATE GRID CANVAS) ═══ */}
          {seg.type === 'interactive_cartesian' && (
            <div className="glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-3 sm:p-5 animate-fade-in flex flex-col h-full max-h-full justify-between overflow-hidden">
              {/* Header banner */}
              <div className="flex items-center justify-between gap-2 flex-shrink-0 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{seg.emoji || '📍'}</span>
                  <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#2D241E] font-pencil">
                    {seg.title}
                  </h2>
                </div>
                {cartesianVerified && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-500 font-black text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi
                  </span>
                )}
              </div>

              {/* Rule & Instruction Box */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-300/80 text-xs sm:text-sm font-bold text-[#78350F] flex-shrink-0 flex items-center justify-between gap-2">
                <div>
                  <span className="font-black text-[#B45309] uppercase mr-1.5">📌 Kasus:</span>
                  <span className="text-[#2D241E]">{seg.ruleText || seg.instruction}</span>
                </div>
              </div>

              {/* Live Cartesian Canvas */}
              <div className="flex-1 min-h-0 flex flex-col justify-center py-1 overflow-hidden">
                <RelationCartesianCanvas
                  minX={seg.minX ?? 0}
                  maxX={seg.maxX ?? 5}
                  minY={seg.minY ?? 0}
                  maxY={seg.maxY ?? 7}
                  stepX={seg.stepX ?? 1}
                  stepY={seg.stepY ?? 1}
                  labelX={seg.labelX || "Sumbu X"}
                  labelY={seg.labelY || "Sumbu Y"}
                  userPoints={userCartesianPoints}
                  onPointToggle={handleCartesianPointToggle}
                  drawLine={seg.drawLine || false}
                />
              </div>

              {/* Feedback Alert */}
              {cartesianError && (
                <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-400 text-xs text-rose-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{cartesianError}</span>
                </div>
              )}

              {cartesianVerified && (
                <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-400 text-xs text-emerald-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{seg.successMessage || 'Titik koordinat berhasil diplot dengan tepat!'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setUserCartesianPoints([]);
                    setCartesianVerified(false);
                    setCartesianError(null);
                    audioEngine.playClick?.();
                  }}
                  className="px-3 py-1.5 rounded-xl glass-btn text-[#78350F] text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Titik
                </button>

                <button
                  type="button"
                  onClick={handleVerifyCartesian}
                  className={`glass-btn px-6 sm:px-8 py-2.5 rounded-2xl border text-sm sm:text-base font-black transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-xl ${
                    cartesianVerified
                      ? 'glass-btn-emerald ring-2 ring-emerald-400/50'
                      : 'glass-btn-amber hover:scale-105 active:scale-95'
                  }`}
                >
                  <span>{cartesianVerified ? '✓ Sudah Tepat' : 'Periksa Koordinat'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ═══ INTERACTIVE TABLE (LEDGER TABLE & PAIRS) ═══ */}
          {seg.type === 'interactive_table' && (
            <div className="glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-3 sm:p-5 animate-fade-in flex flex-col h-full max-h-full justify-between overflow-hidden">
              {/* Header banner */}
              <div className="flex items-center justify-between gap-2 flex-shrink-0 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{seg.emoji || '📊'}</span>
                  <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#2D241E] font-pencil">
                    {seg.title}
                  </h2>
                </div>
                {tableVerified && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-500 font-black text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi
                  </span>
                )}
              </div>

              {/* Rule & Instruction Box */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-300/80 text-xs sm:text-sm font-bold text-[#78350F] flex-shrink-0 flex items-center justify-between gap-2">
                <div>
                  <span className="font-black text-[#B45309] uppercase mr-1.5">📌 Kasus:</span>
                  <span className="text-[#2D241E]">{seg.ruleText || seg.instruction}</span>
                </div>
              </div>

              {/* Live Table Area */}
              <div className="flex-1 min-h-0 flex flex-col justify-center py-1 overflow-auto">
                <RelationTableCanvas
                  columns={seg.columns}
                  rows={seg.rows}
                  availableChips={seg.availableChips}
                  userAssignments={userTableAssignments}
                  onAssignChip={handleTableAssignChip}
                  onRemoveChip={handleTableRemoveChip}
                  isVerified={tableVerified}
                />
              </div>

              {/* Feedback Alert */}
              {tableError && (
                <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-400 text-xs text-rose-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{tableError}</span>
                </div>
              )}

              {tableVerified && (
                <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-400 text-xs text-emerald-800 font-bold flex items-center gap-1.5 flex-shrink-0 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{seg.successMessage || 'Tabel bukti tersusun sempurna!'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setUserTableAssignments({});
                    setTableVerified(false);
                    setTableError(null);
                    audioEngine.playClick?.();
                  }}
                  className="px-3 py-1.5 rounded-xl glass-btn text-[#78350F] text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Tabel
                </button>

                <button
                  type="button"
                  onClick={handleVerifyTable}
                  className={`glass-btn px-6 sm:px-8 py-2.5 rounded-2xl border text-sm sm:text-base font-black transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-xl ${
                    tableVerified
                      ? 'glass-btn-emerald ring-2 ring-emerald-400/50'
                      : 'glass-btn-amber hover:scale-105 active:scale-95'
                  }`}
                >
                  <span>{tableVerified ? '✓ Sudah Tepat' : 'Periksa Tabel'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ═══ QUIZ (AUTHENTIC CRYSTAL GLASS) ═══ */}
          {seg.type === 'quiz' && (
            <div className="glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-3 sm:p-5 animate-fade-in flex flex-col h-full max-h-full justify-start gap-2 overflow-hidden">
              {/* Quiz title & Action bar */}
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-amber-900/10 flex-shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{seg.emoji}</span>
                  <h2 className="text-base sm:text-lg font-black text-[#2D241E] font-pencil truncate leading-tight">{seg.title}</h2>
                  {seg.isHots && (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white text-[10px] sm:text-xs font-black shadow-xs tracking-wide animate-pulse flex-shrink-0">
                      🔥 {seg.hotsBadge || 'TANTANGAN HOTS'}
                    </span>
                  )}
                </div>

                {/* Clue button toggle */}
                {seg.clue && (quizState === 'unanswered' || quizState === 'retry') && (
                  <button
                    type="button"
                    onClick={() => {
                      try { audioEngine.playClick?.(); } catch {}
                      setShowClue(prev => !prev);
                    }}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex-shrink-0 cursor-pointer ${
                      showClue
                        ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-500/50 shadow-amber-300/40'
                        : 'glass-btn text-amber-900 border border-amber-300/70 hover:shadow-xs'
                    }`}
                    title={showClue ? 'Tutup petunjuk' : 'Buka petunjuk detektif'}
                  >
                    <Lightbulb className={`w-3.5 h-3.5 ${showClue ? 'text-amber-950 fill-amber-300' : 'text-amber-600'}`} />
                    <span>{showClue ? 'Tutup Clue' : '💡 Butuh Clue?'}</span>
                  </button>
                )}
              </div>

              {/* Clue Card Banner (Compact & non-intrusive) */}
              {showClue && seg.clue && (quizState === 'unanswered' || quizState === 'retry') && (
                <div className="flex-shrink-0 p-2 sm:p-2.5 rounded-xl glass-panel-subtle border border-amber-400/60 shadow-xs flex items-start gap-2 animate-fade-in">
                  <span className="text-sm sm:text-base flex-shrink-0 leading-none mt-0.5">💡</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                      Petunjuk Analisis Detektif Relo:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-amber-950 leading-snug break-words">
                      {seg.clue}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── UNANSWERED STATE ─── */}
              {quizState === 'unanswered' && (
                <div className="flex-1 min-h-0 flex flex-col justify-start gap-2.5 overflow-y-auto drag-scroller pr-1 pt-0.5">
                  <div className="px-4 py-2.5 sm:py-3 rounded-2xl glass-panel-subtle border border-[#D97706]/50 shadow-[0_4px_16px_rgba(217,119,6,0.12),inset_0_1px_2px_rgba(255,255,255,0.85)] flex-shrink-0 flex items-center justify-center text-center">
                    <p className="text-sm sm:text-base lg:text-lg font-black font-pencil text-[#2D241E] leading-snug whitespace-pre-line">
                      {seg.question}
                    </p>
                  </div>

                  {(() => {
                    const isShortOptions = seg.options && seg.options.every(opt => opt.length <= 22);
                    return (
                      <div className={seg.visual 
                        ? 'flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 items-center gap-4 lg:gap-6 py-0.5 w-full' 
                        : 'flex-1 min-h-0 flex flex-col justify-center py-0.5 w-full max-w-4xl mx-auto'}>
                        {seg.visual && (
                          <div className="w-full h-full flex items-center justify-center min-w-0">
                            <MathVisualizer visual={seg.visual} compact={false} className="w-full" />
                          </div>
                        )}
                        <div className={`w-full flex flex-col justify-center gap-2 sm:gap-2.5 ${
                          !seg.visual ? 'grid grid-cols-1 sm:grid-cols-2' : ''
                        }`}>
                          {seg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuizAnswer(opt)}
                              onMouseEnter={() => audioEngine.playHover?.()}
                              className="w-full py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl glass-btn text-left text-xs sm:text-sm md:text-base font-bold text-[#2D241E] cursor-pointer flex items-center leading-snug transition-all hover:scale-[1.01] active:scale-95 shadow-xs"
                            >
                              <span className="text-[#D97706] font-black mr-2.5 flex-shrink-0 text-sm sm:text-base">{String.fromCharCode(65 + i)}.</span>
                              <span className="flex-1 min-w-0 break-words font-pencil">{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ─── CORRECT STATE ─── */}
              {quizState === 'correct' && (
                <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3">
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-emerald-100/90 backdrop-blur-md border-2 border-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base sm:text-lg font-black text-emerald-900">Benar! 🎉</p>
                      <p className="text-sm sm:text-base text-emerald-800 whitespace-pre-line">{seg.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── WRONG STATE ─── */}
              {quizState === 'wrong' && (
                <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3">
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-rose-100/90 backdrop-blur-md border-2 border-rose-500 shadow-sm">
                    <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base sm:text-lg font-black text-rose-900">Belum Tepat 😅</p>
                      <p className="text-sm sm:text-base text-rose-800">
                        Jawabanmu: <strong>{selectedOption}</strong><br />
                        Jawaban benar: <strong>{seg.correct}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleShowRemedial}
                    className="py-3 px-4 rounded-xl glass-btn text-[#78350F] font-bold flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
                  >
                    <Lightbulb className="w-5 h-5 text-[#D97706]" />
                    Lihat Penjelasan Sederhana
                  </button>
                </div>
              )}

              {/* ─── REMEDIAL STATE ─── */}
              {quizState === 'remedial' && seg.remedial && (
                <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3">
                  <div className="p-3 sm:p-4 rounded-xl glass-panel-subtle shadow-sm">
                    <p className="text-base sm:text-lg font-black text-[#78350F] mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[#D97706]" /> Penjelasan Sederhana:
                    </p>
                    <div className="space-y-1">
                      {seg.remedial.content.map((line, i) => (
                        <p key={i} className="text-sm sm:text-base text-[#78350F] leading-relaxed">
                          {renderText(line)}
                        </p>
                      ))}
                    </div>
                  </div>
                  {seg.remedial.retryQuestion && (
                    <button
                      onClick={handleRetry}
                      className="glass-btn glass-btn-amber py-3 px-5 rounded-2xl text-amber-950 font-black shadow-[0_8px_24px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer backdrop-blur-xl"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Coba Soal Serupa
                    </button>
                  )}
                </div>
              )}

              {/* ─── RETRY STATE ─── */}
              {quizState === 'retry' && seg.remedial?.retryQuestion && (
                <div className="flex-1 min-h-0 flex flex-col justify-center space-y-3">
                  <p className="text-base sm:text-lg font-bold text-[#2D241E] whitespace-pre-line leading-relaxed">
                    {seg.remedial.retryQuestion.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {seg.remedial.retryQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(opt)}
                        onMouseEnter={() => audioEngine.playHover?.()}
                        className="p-3 sm:p-3.5 rounded-xl glass-btn text-left text-base sm:text-lg font-bold text-[#2D241E] cursor-pointer"
                      >
                        <span className="text-[#D97706] mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

          {/* ── TOMBOL LANJUT (>) ── */}
          <button
            type="button"
            onClick={() => {
              if (canAdvance) {
                handleNext();
              }
            }}
            disabled={!canAdvance}
            title={!canAdvance ? disabledReason : (isLastSeg ? "Selesaikan Chapter" : "Lanjut ke segmen berikutnya")}
            className={`glass-btn w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 z-30 select-none flex-shrink-0 mr-0.5 sm:mr-1 backdrop-blur-xl ${
              canAdvance
                ? (isLastSeg || isSuccess
                    ? 'glass-btn-emerald ring-2 ring-emerald-400/50 shadow-md animate-pulse hover:scale-110 active:scale-95 cursor-pointer text-white'
                    : 'glass-btn-amber shadow-md hover:scale-110 active:scale-95 cursor-pointer text-amber-950')
                : 'bg-white/10 border-white/20 text-slate-400 opacity-30 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
