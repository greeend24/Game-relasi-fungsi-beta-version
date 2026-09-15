import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Flame, Trophy, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import InstructorMascotGuide from '../InstructorMascotGuide';
import NetworkStatusBadge from '../NetworkStatusBadge';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import { ENDLESS_QUESTIONS } from '../../data/endlessQuestions';
import confetti from 'canvas-confetti';

const LEVEL_BADGE = { C3: '🟢 C3 Aplikasi', C4: '🟡 C4 Analisis', C5: '🔴 C5 Evaluasi' };
const LEVEL_COLOR = {
  C3: 'bg-emerald-100 text-emerald-800 border-emerald-400',
  C4: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  C5: 'bg-red-100 text-red-800 border-red-400',
};

export default function EndlessMode({ onBackToMenu, currentUser, onUpdateUser }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);

  // MCQ / TRUE_FALSE state
  const [selectedOpt, setSelectedOpt] = useState(null);

  // MCQ_COMPLEX state
  const [selectedMultiple, setSelectedMultiple] = useState([]);

  // MATCHING state
  const [matchingAnswers, setMatchingAnswers] = useState({});

  const currentQ = ENDLESS_QUESTIONS[questionIndex] || null;
  const totalQuestions = ENDLESS_QUESTIONS.length;

  useEffect(() => {
    audioEngine.toggleBgm(true);
    return () => { audioEngine.toggleBgm(true); };
  }, []);

  // Reset state on new question
  useEffect(() => {
    setIsAnswered(false);
    setSelectedOpt(null);
    setSelectedMultiple([]);
    setMatchingAnswers({});
    setIsCorrect(false);
    const timeLimit = Math.max(20, 35 - Math.floor(questionIndex / 10));
    setTimerSeconds(timeLimit);
  }, [questionIndex]);

  // Timer countdown
  useEffect(() => {
    if (gameOver || isAnswered || !currentQ) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex, isAnswered, gameOver, currentQ]);

  const handleTimeOut = useCallback(() => {
    audioEngine.playError();
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);
    setMultiplier(1);
  }, []);

  const applyCorrect = useCallback(() => {
    audioEngine.playCorrect();
    setIsCorrect(true);
    confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
    const newStreak = streak + 1;
    setStreak(newStreak);
    const combo = Math.min(5, Math.max(1, newStreak));
    setMultiplier(combo);
    const basePts = questionIndex < 35 ? 5 : questionIndex < 70 ? 10 : 15;
    const ptsEarned = basePts * combo;
    const newScore = score + ptsEarned;
    setScore(newScore);
    storageService.updateEndlessHighScore(newScore);
  }, [streak, score, questionIndex]);

  const applyWrong = useCallback(() => {
    audioEngine.playError();
    setIsCorrect(false);
    setStreak(0);
    setMultiplier(1);
  }, []);

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

  const handleNextQuestion = () => {
    if (questionIndex >= totalQuestions - 1) {
      audioEngine.playVictoryMusic();
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
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
                className={`p-3.5 sm:p-4 text-left text-base sm:text-lg lg:text-[20px] font-bold font-pencil transition rounded-2xl cursor-pointer ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    if (currentQ.type === 'MCQ_COMPLEX') {
      return (
        <div className="space-y-3">
          <p className="text-sm sm:text-base font-black text-[#7C3AED] uppercase tracking-wide">
            ☑️ Pilih SEMUA jawaban yang benar, lalu tekan Konfirmasi!
          </p>
          <div className="grid grid-cols-1 gap-2.5">
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
                  className={`p-3 sm:p-3.5 text-left text-base sm:text-lg lg:text-[20px] font-bold font-pencil flex items-center gap-3 transition rounded-2xl cursor-pointer ${btnStyle}`}
                >
                  <span className="flex-shrink-0">
                    {isSelected || (isAnswered && isCorrectOpt)
                      ? <CheckSquare className="w-6 h-6 text-[#7C3AED]" />
                      : <Square className="w-6 h-6 opacity-40" />}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMultiple}
              disabled={selectedMultiple.length === 0}
              className="pencil-btn w-full py-3 sm:py-3.5 bg-[#7C3AED] text-white font-black text-xl sm:text-2xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ShieldCheck className="w-6 h-6" />
              <span>Konfirmasi Jawaban</span>
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'MATCHING') {
      return (
        <div className="space-y-3">
          <p className="text-sm sm:text-base font-black text-[#D97706] uppercase tracking-wide">
            🔗 Pasangkan setiap item di sebelah kiri dengan pilihan yang tepat!
          </p>
          <div className="space-y-3">
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
                <div key={idx} className={`rounded-2xl p-3 space-y-2 ${rowStyle}`}>
                  <p className="text-base sm:text-lg lg:text-[20px] font-black text-[#2D241E]">{pair.left}</p>
                  <div className="flex flex-wrap gap-2">
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
                          className={`px-4 py-2 text-sm sm:text-base lg:text-[18px] font-bold rounded-xl transition cursor-pointer ${optStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && !isRight && (
                    <p className="text-sm sm:text-base font-black text-[#059669]">✅ Jawaban benar: {pair.right}</p>
                  )}
                </div>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-3 sm:py-3.5 bg-[#D97706] text-white font-black text-xl sm:text-2xl disabled:opacity-40 flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <ShieldCheck className="w-6 h-6" />
              <span>Konfirmasi Pasangan</span>
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
          onClick={() => { audioEngine.playClick(); audioEngine.toggleBgm(true); onBackToMenu(); }}
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
          pose={gameOver ? 'celebrating' : (isAnswered && !isCorrect ? 'thinking' : (isAnswered && isCorrect ? 'celebrating' : 'standing'))}
          emotion={gameOver ? 'happy' : (isAnswered && !isCorrect ? 'error' : (isAnswered && isCorrect ? 'happy' : 'idle'))}
          title={isAnswered && !isCorrect ? "EVALUASI INSTRUKTUR RYU" : "INSTRUKTUR RYU"}
          icon="🔥"
          message={
            gameOver
              ? `Endless Mode Selesai! Kamu meraih total skor ${score} PTS! 🔥🏆`
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
              </span>
            </div>

            {/* Question Prompt */}
            <div className="p-3 sm:p-3.5 rounded-2xl glass-panel-subtle space-y-1 flex-shrink-0">
              <span className="text-xs sm:text-sm font-black text-[#D97706] uppercase tracking-wider block">{currentQ.title}</span>
              <p className="text-base sm:text-lg lg:text-[20px] font-black font-pencil text-[#2D241E] leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Answer UI */}
            <div className="flex-1 min-h-0 flex flex-col justify-center overflow-y-auto py-1 drag-scroller">
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
                    <span>{isCorrect ? '🎉 BENAR! PETUNJUK TEPAT!' : '❌ SALAH / WAKTU HABIS!'}</span>
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
          <div className="flex-1 min-h-0 h-full p-6 rounded-3xl glass-panel glass-sheen text-center space-y-4 animate-fade-in flex flex-col justify-center">
            <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-black font-pencil text-[#2D241E]">ENDLESS MODE SELESAI! 🎉</h2>
              <p className="text-base sm:text-lg font-bold text-[#78350F]">Kamu telah menyelesaikan semua {totalQuestions} tantangan soal!</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel-subtle space-y-1 max-w-sm mx-auto w-full">
              <p className="text-sm font-black text-[#78350F]">TOTAL SKOR AKHIR</p>
              <p className="text-3xl sm:text-4xl font-black text-[#D97706]">{score} PTS</p>
            </div>
            <div className="pt-2 max-w-sm mx-auto w-full">
              <button
                onClick={() => { audioEngine.playClick(); audioEngine.toggleBgm(true); onBackToMenu(); }}
                className="pencil-btn w-full py-3.5 bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1E40AF] font-black text-xl sm:text-2xl flex items-center justify-center gap-2 rounded-2xl shadow-[3px_4px_0px_#2D241E] cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Kembali ke Menu Utama</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
