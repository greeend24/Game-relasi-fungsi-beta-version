import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Flame, Trophy, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
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
            let btnStyle = 'bg-white border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7]';
            if (isAnswered) {
              if (isRight) btnStyle = 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-extrabold ring-4 ring-[#059669]/30';
              else if (isSelected) btnStyle = 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239] font-extrabold';
            }
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectMCQ(opt)}
                className={`pencil-btn p-4 text-left text-sm font-bold transition ${btnStyle}`}
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
          <p className="text-xs font-extrabold text-[#7C3AED] uppercase tracking-wide">
            ☑️ Pilih SEMUA jawaban yang benar, lalu tekan Konfirmasi!
          </p>
          <div className="grid grid-cols-1 gap-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedMultiple.includes(opt);
              const isCorrectOpt = currentQ.correctMultiple.includes(opt);
              let btnStyle = 'bg-white border-[#2D241E] text-[#2D241E]';
              if (isAnswered) {
                if (isCorrectOpt) btnStyle = 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-extrabold';
                else if (isSelected && !isCorrectOpt) btnStyle = 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239] font-extrabold';
              } else if (isSelected) {
                btnStyle = 'bg-[#EDE9FE] border-[#7C3AED] text-[#5B21B6] font-extrabold';
              }
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleToggleMultiple(opt)}
                  className={`pencil-btn p-3 text-left text-sm font-bold flex items-center gap-3 transition ${btnStyle}`}
                >
                  <span className="flex-shrink-0">
                    {isSelected || (isAnswered && isCorrectOpt)
                      ? <CheckSquare className="w-5 h-5" />
                      : <Square className="w-5 h-5 opacity-40" />}
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
              className="pencil-btn w-full py-3 bg-[#7C3AED] text-white font-extrabold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Konfirmasi Jawaban
            </button>
          )}
        </div>
      );
    }

    if (currentQ.type === 'MATCHING') {
      return (
        <div className="space-y-3">
          <p className="text-xs font-extrabold text-[#D97706] uppercase tracking-wide">
            🔗 Pasangkan setiap item di sebelah kiri dengan pilihan yang tepat!
          </p>
          <div className="space-y-3">
            {currentQ.pairs.map((pair, idx) => {
              const selected = matchingAnswers[pair.left];
              const isRight = selected === pair.right;
              const rowStyle = isAnswered
                ? isRight
                  ? 'border-[#059669] bg-[#D1FAE5]'
                  : selected
                  ? 'border-[#BE123C] bg-[#FFE4E6]'
                  : 'border-[#2D241E]'
                : 'border-[#2D241E]';

              return (
                <div key={idx} className={`rounded-2xl border-2 p-3 space-y-2 ${rowStyle}`}>
                  <p className="text-sm font-extrabold text-[#2D241E]">{pair.left}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.rightOptions.map((opt, oi) => {
                      const isPicked = selected === opt;
                      const isCorrectOpt = isAnswered && opt === pair.right;
                      let optStyle = 'bg-[#FFFDF9] border-[#2D241E] text-[#2D241E]';
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
                          className={`pencil-btn px-3 py-1.5 text-xs font-bold transition ${optStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && !isRight && (
                    <p className="text-xs font-bold text-[#059669]">✅ Jawaban benar: {pair.right}</p>
                  )}
                </div>
              );
            })}
          </div>
          {!isAnswered && (
            <button
              onClick={handleConfirmMatching}
              disabled={!currentQ.pairs.every(p => matchingAnswers[p.left])}
              className="pencil-btn w-full py-3 bg-[#D97706] text-white font-extrabold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Konfirmasi Pasangan
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  // ── Main Render ──────────────────────────────────────────────────
  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-2 overflow-hidden font-hand">

      {/* Top Bar */}
      <div className="flex items-center justify-between p-3 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E]">
        <button
          onClick={() => { audioEngine.playClick(); audioEngine.toggleBgm(true); onBackToMenu(); }}
          className="pencil-btn px-3 py-2 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-xs flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-extrabold">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] text-[#78350F]">
            <Flame className="w-4 h-4 text-[#D97706] animate-bounce" />
            <span>{streak}x{multiplier}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#DBEAFE] border-2 border-[#2D241E] text-[#1E40AF]">
            <Trophy className="w-4 h-4 text-[#2563EB]" />
            <span>{score} PTS</span>
          </div>
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          triggerKey={questionIndex}
          emotion={isAnswered ? (isCorrect ? 'happy' : 'error') : 'thinking'}
          message={
            isAnswered
              ? (isCorrect ? `Hebat! Jawabanmu benar! 🎉 Streak: ${streak}` : `Kurang tepat. ${currentQ?.explanation}`)
              : `Soal #${questionIndex + 1} dari ${totalQuestions}. Jawab dengan teliti!`
          }
          size="md"
        />
      </div>

      {/* Question Card */}
      {currentQ && !gameOver && (
        <div className="p-5 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] space-y-4 flex-1 overflow-y-auto min-h-0">

          {/* Progress + Timer */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#78350F]">
              <span>SOAL #{questionIndex + 1} / {totalQuestions}</span>
              <span className={timerSeconds <= 5 ? 'text-[#BE123C] animate-ping font-extrabold' : ''}>
                ⏱️ {timerSeconds}s
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#EFECE6] border border-[#2D241E] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-300"
                style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Level Badge + Type Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-xl border-2 text-xs font-extrabold ${LEVEL_COLOR[currentQ.level] || 'bg-gray-100 text-gray-700 border-gray-400'}`}>
              {LEVEL_BADGE[currentQ.level] || currentQ.level}
            </span>
            <span className="px-2.5 py-1 rounded-xl border-2 border-[#2D241E] bg-[#F3F4F6] text-[#374151] text-xs font-bold">
              {currentQ.type === 'MCQ' && '📝 Pilihan Ganda'}
              {currentQ.type === 'MCQ_COMPLEX' && '☑️ Pilihan Ganda Kompleks'}
              {currentQ.type === 'TRUE_FALSE' && '✅ Benar – Salah'}
              {currentQ.type === 'MATCHING' && '🔗 Menjodohkan'}
            </span>
          </div>

          {/* Question */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-1">
            <span className="text-xs font-extrabold text-[#D97706] uppercase tracking-wider block">{currentQ.title}</span>
            <p className="text-base sm:text-lg font-bold font-pencil text-[#2D241E] leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Answer UI */}
          {renderQuestionBody()}

          {/* Feedback + Next */}
          {isAnswered && (
            <div className="space-y-3 animate-fade-in">
              <div className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm ${
                isCorrect ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]' : 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
              }`}>
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  {isCorrect
                    ? <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                    : <AlertTriangle className="w-5 h-5 text-[#BE123C]" />}
                  <span>{isCorrect ? '🎉 BENAR! PETUNJUK KASUS TEPAT!' : '❌ SALAH / WAKTU HABIS!'}</span>
                </div>
                <p>{currentQ.explanation}</p>
              </div>
              <button
                onClick={handleNextQuestion}
                className="pencil-btn w-full py-3.5 bg-[#FDE68A] text-[#78350F] font-extrabold text-base flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#D97706]" />
                {questionIndex < totalQuestions - 1
                  ? `LANJUT KE SOAL #${questionIndex + 2} →`
                  : '🏆 LIHAT HASIL AKHIR →'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-center space-y-6 animate-fade-in flex-1 flex flex-col justify-center">
          <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-pencil text-[#2D241E]">ENDLESS MODE SELESAI! 🎉</h2>
            <p className="text-sm font-bold text-[#78350F]">Kamu telah menyelesaikan semua {totalQuestions} tantangan soal!</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] space-y-1">
            <p className="text-sm font-bold text-[#78350F]">TOTAL SKOR AKHIR</p>
            <p className="text-3xl font-extrabold text-[#D97706]">{score} PTS</p>
          </div>
          <button
            onClick={() => { audioEngine.playClick(); audioEngine.toggleBgm(true); onBackToMenu(); }}
            className="pencil-btn w-full py-3.5 bg-[#DBEAFE] text-[#1E40AF] font-bold text-base flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Kembali ke Menu Utama
          </button>
        </div>
      )}
    </div>
  );
}
