import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Trophy, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import { audioEngine } from '../../services/audioEngine';
import { storageService } from '../../services/storageService';
import confetti from 'canvas-confetti';

export default function EndlessMode({ onBackToMenu, currentUser, onUpdateUser }) {
  const [questionIndex, setQuestionIndex] = useState(0); // 0 to 199 (200 total)
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQ, setCurrentQ] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(25);

  useEffect(() => {
    audioEngine.toggleBgm(true);
    return () => {
      audioEngine.toggleBgm(true);
    };
  }, []);

  useEffect(() => {
    generateNextQuestion(questionIndex);
  }, [questionIndex]);

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

  const handleTimeOut = () => {
    audioEngine.playError();
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);
    setMultiplier(1);
  };

  const generateNextQuestion = (idx) => {
    setIsAnswered(false);
    setSelectedOpt(null);
    setIsCorrect(false);
    
    const timeLimit = Math.max(10, 25 - Math.floor(idx / 15));
    setTimerSeconds(timeLimit);

    const levelGroup = Math.floor(idx / 30);
    let qObj;

    if (levelGroup === 0 || idx % 7 === 0) {
      const a = (idx % 4) + 1;
      const b1 = a + (idx % 3) + 1;
      qObj = {
        title: `Penyelidikan Relasi #${idx + 1}`,
        question: `Apakah angka ${a} di Himpunan A berhubungan dengan ${b1} di Himpunan B jika aturannya "Kurang dari"?`,
        options: ['Ya, memenuhi aturan', 'Tidak, melanggar aturan'],
        correct: a < b1 ? 'Ya, memenuhi aturan' : 'Tidak, melanggar aturan',
        explanation: `${a} < ${b1} adalah ${a < b1 ? 'BENAR' : 'SALAH'}.`
      };
    } else if (levelGroup === 1 || idx % 7 === 1) {
      const x = (idx % 6) + 1;
      const y = x * 2 + 1;
      qObj = {
        title: `Format Pasangan Berurutan #${idx + 1}`,
        question: `Manakah pasangan berurutan (x, y) yang sesuai untuk x = ${x} dan y = ${y}?`,
        options: [`(${x}, ${y})`, `(${y}, ${x})`, `(${x + 1}, ${y})`, `(${x}, ${y + 1})`],
        correct: `(${x}, ${y})`,
        explanation: 'Format pasangan berurutan selalu (Domain x, Kodomain y).'
      };
    } else if (levelGroup === 2 || idx % 7 === 2) {
      const isBranching = idx % 2 === 0;
      qObj = {
        title: `Audit Pemetaan Fungsi #${idx + 1}`,
        question: isBranching 
          ? `Elemen 1 di Domain A memiliki 2 panah pasangan ke B1 dan B2. Apakah ini FUNGSI yang valid?` 
          : `Setiap elemen di Domain A memiliki tepat 1 panah ke B. Apakah ini FUNGSI yang valid?`,
        options: ['Bukan Fungsi (Melanggar)', 'Valid Fungsi (Memenuhi)'],
        correct: isBranching ? 'Bukan Fungsi (Melanggar)' : 'Valid Fungsi (Memenuhi)',
        explanation: 'Syarat fungsi: Domain A tidak boleh bercabang >1 panah.'
      };
    } else if (levelGroup === 3 || idx % 7 === 3) {
      qObj = {
        title: `Identifikasi Unsur Fungsi #${idx + 1}`,
        question: `Diberikan Himpunan Asal A = {1, 2, 3} dan Himpunan Tujuan B = {4, 5, 6, 7}. Disebut apakah seluruh Himpunan B?`,
        options: ['Kodomain (Daerah Kawan)', 'Domain (Daerah Asal)', 'Range (Daerah Hasil)'],
        correct: 'Kodomain (Daerah Kawan)',
        explanation: 'Seluruh Himpunan Tujuan B dinamakan Kodomain.'
      };
    } else if (levelGroup === 4 || idx % 7 === 4) {
      const aCoeff = (idx % 3) + 2;
      const bConst = (idx % 5) + 1;
      const xInput = (idx % 4) + 2;
      const ansVal = aCoeff * xInput + bConst;
      qObj = {
        title: `Kalkulasi Rumus Fungsi #${idx + 1}`,
        question: `Jika rumus fungsi f(x) = ${aCoeff}x + ${bConst}, berapakah nilai f(${xInput})?`,
        options: [`${ansVal}`, `${ansVal + 2}`, `${ansVal - 3}`, `${ansVal * 2}`].sort(() => 0.5 - Math.random()),
        correct: `${ansVal}`,
        explanation: `f(${xInput}) = ${aCoeff}(${xInput}) + ${bConst} = ${ansVal}.`
      };
    } else if (levelGroup === 5 || idx % 7 === 5) {
      const countA = (idx % 3) + 3;
      const countB = idx % 2 === 0 ? countA : countA + 1;
      qObj = {
        title: `Audit Korespondensi 1-1 #${idx + 1}`,
        question: `Apakah Himpunan A (n = ${countA}) dan Himpunan B (n = ${countB}) dapat membentuk Korespondensi Satu-Satu?`,
        options: countA === countB ? ['Bisa (n(A) = n(B))', 'Tidak Bisa'] : ['Tidak Bisa (n(A) ≠ n(B))', 'Bisa'],
        correct: countA === countB ? 'Bisa (n(A) = n(B))' : 'Tidak Bisa (n(A) ≠ n(B))',
        explanation: 'Syarat Korespondensi 1-1: Jumlah n(A) WAJIB sama dengan n(B).'
      };
    } else {
      qObj = {
        title: `Klasifikasi Jenis Fungsi #${idx + 1}`,
        question: `Jika setiap elemen B menerima MAKSIMAL 1 panah dari A (tidak ada B bercabang, meski ada B kosong), jenis fungsi apakah ini?`,
        options: ['Fungsi Injektif (Satu-Satu)', 'Fungsi Surjektif (Pada)', 'Fungsi Bijektif'],
        correct: 'Fungsi Injektif (Satu-Satu)',
        explanation: 'Fungsi Injektif mensyaratkan tidak ada elemen B yang menerima >1 panah.'
      };
    }

    setCurrentQ(qObj);
  };

  const handleSelectAnswer = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);

    if (opt === currentQ.correct) {
      audioEngine.playCorrect();
      setIsCorrect(true);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });

      const newStreak = streak + 1;
      setStreak(newStreak);

      // Combo Multiplier: 1 -> x1, 2 -> x2, 3 -> x3, 4 -> x4, 5+ -> x5 (Max x5)
      const comboMultiplier = Math.min(5, Math.max(1, newStreak));
      setMultiplier(comboMultiplier);

      // Base points: C3 = 5, C4 = 10, C5 = 15
      const basePts = questionIndex < 60 ? 5 : questionIndex < 130 ? 10 : 15;
      const ptsEarned = basePts * comboMultiplier;

      const newScore = score + ptsEarned;
      setScore(newScore);

      storageService.updateEndlessHighScore(newScore);
    } else {
      audioEngine.playError();
      setIsCorrect(false);
      setStreak(0);
      setMultiplier(1);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex >= 199) {
      audioEngine.playVictoryMusic(); // Victory music!
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 my-2 space-y-5 font-hand animate-fade-in">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E]">
        <button
          onClick={() => {
            audioEngine.playClick();
            audioEngine.toggleBgm(true);
            onBackToMenu();
          }}
          className="pencil-btn px-4 py-2 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-xs flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar Endless Mode</span>
        </button>

        <div className="flex items-center space-x-3 text-xs font-extrabold">
          <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] text-[#78350F]">
            <Flame className="w-4 h-4 text-[#D97706] animate-bounce" />
            <span>STREAK: {streak} (x{multiplier})</span>
          </div>

          <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#DBEAFE] border-2 border-[#2D241E] text-[#1E40AF]">
            <Trophy className="w-4 h-4 text-[#2563EB]" />
            <span>SKOR: {score} PTS</span>
          </div>
        </div>
      </div>

      {/* Mascot Assistant */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          triggerKey={questionIndex}
          emotion={isAnswered ? (isCorrect ? 'happy' : 'error') : 'thinking'}
          message={
            isAnswered 
              ? (isCorrect ? `Hebat! Jawabanmu benar. Pertahankan streak!` : `Kurang tepat. ${currentQ?.explanation}`)
              : `Endless Mode Soal #${questionIndex + 1}. Jawab pertanyaan dengan teliti!`
          }
          size="md"
        />
      </div>

      {/* Main Question Card */}
      {currentQ && !gameOver && (
        <div className="p-6 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] space-y-6">
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#78350F]">
              <span>TANTANGAN SOAL #{questionIndex + 1}</span>
              <span className={timerSeconds <= 5 ? 'text-[#BE123C] animate-ping font-extrabold' : ''}>
                ⏱️ Waktu: {timerSeconds}s
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#EFECE6] border-1.5 border-[#2D241E] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-300"
                style={{ width: `${((questionIndex + 1) / 200) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-2">
            <span className="text-xs font-extrabold text-[#D97706] uppercase tracking-wider">{currentQ.title}</span>
            <h3 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E] leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isRight = opt === currentQ.correct;

              let btnStyle = 'bg-white border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7]';
              if (isAnswered) {
                if (isRight) {
                  btnStyle = 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-extrabold ring-4 ring-[#059669]/30';
                } else if (isSelected) {
                  btnStyle = 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239] font-extrabold';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`pencil-btn p-4 text-left text-sm sm:text-base font-bold transition ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="space-y-3 animate-fade-in">
              <div className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm ${
                isCorrect ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]' : 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
              }`}>
                <div className="flex items-center space-x-2 font-extrabold text-sm mb-1">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-[#059669]" /> : <AlertTriangle className="w-5 h-5 text-[#BE123C]" />}
                  <span>{isCorrect ? 'BENAR! PETUNJUK KASUS TEPAT!' : 'SALAH / WAKTU HABIS!'}</span>
                </div>
                <p>{currentQ.explanation}</p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="pencil-btn w-full py-3.5 bg-[#FDE68A] text-[#78350F] font-extrabold text-base flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#D97706]" />
                <span>LANJUT KE SOAL #{questionIndex + 2} →</span>
              </button>
            </div>
          )}

        </div>
      )}

      {gameOver && (
        <div className="p-8 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-center space-y-6 animate-fade-in">
          <Trophy className="w-16 h-16 mx-auto text-[#D97706] animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-pencil text-[#2D241E]">ENDLESS MODE SELESAI!</h2>
            <p className="text-sm font-bold text-[#78350F]">Kamu telah menyelesaikan seluruh tantangan!</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] text-xl font-extrabold text-[#D97706]">
            TOTAL SKOR ENDLESS: {score} PTS
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              audioEngine.toggleBgm(true);
              onBackToMenu();
            }}
            className="pencil-btn w-full py-3.5 bg-[#DBEAFE] text-[#1E40AF] font-bold text-base flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Kembali ke Menu Utama</span>
          </button>
        </div>
      )}

    </div>
  );
}
