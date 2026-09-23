import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { BarChart3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab4GrafikFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[4]?.stages?.[stageNum - 1] || SUBBABS_DATA[4]?.stages?.[0];

  const [selectedChoice, setSelectedChoice] = useState('');
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedChoice('');
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const handleSelectChoice = (c) => {
    audioEngine.playClick();
    setSelectedChoice(c);
    setErrorDetails(null);
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!selectedChoice) {
      setErrorDetails({
        title: 'PILIHAN BELUM DITENTUKAN',
        reasons: ['Harap pilih salah satu analisis grafik fungsi linear terlebih dahulu!'],
        hint: stageConfig.conceptDef || 'Konsep: Grafik f(x) = ax + b selalu berupa garis lurus dengan gradien m = a.'
      });
      audioEngine.playError();
      return;
    }

    const isCorrect = selectedChoice === stageConfig.correctAns;

    if (isCorrect) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 140 + (stageNum - 1) * 5;
      setScoreEarned(pts);
      setStageCleared(true);
      onStageComplete('subbab4', stageNum, pts, 3);
    } else {
      audioEngine.playError();
      setErrorDetails({
        title: 'ANALISIS GRAFIK BELUM TEPAT',
        reasons: [
          'Jawaban analisis grafik yang kamu pilih belum sesuai dengan kaidah garis lurus Kartesius.',
          'Periksa kembali rumus fungsi f(x) = ax + b, titik potong sumbu X/Y, dan nilai gradien kemiringan (m).'
        ],
        hint: stageConfig.explanation || stageConfig.conceptDef
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-3 sm:p-4 md:p-5 font-hand animate-fade-in overflow-hidden relative z-10">
      
      {/* 1. COMPACT TOP HEADER */}
      <StageHeader
        subbabId={4}
        subbabTitle={SUBBABS_DATA[4].title}
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.explanation || stageConfig.conceptDef}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={onNextStage}
        onRetryStage={() => {
          setSelectedChoice('');
          setErrorDetails(null);
          setStageCleared(false);
        }}
      />

      {/* 2. MAIN WORKSPACE CARD */}
      <div className="flex-1 min-h-0 flex flex-col justify-center items-center py-2 relative z-10 max-w-5xl mx-auto w-full">
        <div className="w-full glass-card p-4 sm:p-6 rounded-3xl border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col justify-between max-h-[72vh] overflow-hidden">
          
          {/* Header Info */}
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-amber-100 text-[#D97706] border border-[#2D241E]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-daruma uppercase text-[#D97706] tracking-wider">
                  Bab 4: Grafik Fungsi Linear • Stage {stageNum}
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-black font-pencil text-[#2D241E] leading-tight">
                  Tantangan Investigasi Garis Lurus
                </h3>
              </div>
            </div>
          </div>

          {/* Story / Problem Prompt */}
          <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/60 p-3 sm:p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm md:text-base font-bold text-[#2D241E] mb-3 leading-relaxed shadow-sm">
            <span className="text-[#D97706] font-black mr-1.5">📈 Kasus:</span>
            {stageConfig.story}
          </div>

          {/* Multiple Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3">
            {(stageConfig.formulaOptions || []).map((opt, idx) => {
              const isSelected = selectedChoice === opt;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectChoice(opt)}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left font-pencil font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-100 border-[#D97706] text-[#78350F] ring-2 ring-[#D97706]/40 shadow-sm'
                      : 'bg-white/80 border-stone-200 text-[#2D241E] hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                >
                  <span className="leading-snug">{opt}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center flex-shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error Details Feedback */}
          {errorDetails && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-bold mb-3 animate-shake">
              <div className="font-black text-rose-900 mb-0.5">⚠️ {errorDetails.title}</div>
              <ul className="list-disc list-inside space-y-0.5 text-rose-700">
                {errorDetails.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Verification Button */}
          {!stageCleared && (
            <div className="flex justify-end pt-1">
              <button
                onClick={handleVerify}
                className="pencil-btn px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-amber-700"
              >
                <span>Konfirmasi Analisis</span>
                <span>➔</span>
              </button>
            </div>
          )}

          {stageCleared && (
            <div className="p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-500 text-emerald-900 text-xs sm:text-sm font-black flex items-center justify-between animate-fade-in">
              <span>🎉 Analisis grafik sempurna! Jawabanmu terverifikasi tepat.</span>
              <button
                onClick={onNextStage}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Stage Berikutnya →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. INSTRUCTOR GUIDE MASCOT (BOTTOM/FLOATING) */}
      <InstructorMascotGuide
        layout="floating"
        character="relo"
        pose={stageCleared ? 'celebrating' : 'thinking'}
        emotion="idle"
        title="PETUNJUK DETEKTIF RELO"
        icon="🕵️‍♂️"
        message={isHintVisible ? (stageConfig.explanation || stageConfig.conceptDef) : "Analisis karakteristik garis f(x) = ax + b pada bidang koordinat Kartesius! 📊🔍"}
      />
    </div>
  );
}
