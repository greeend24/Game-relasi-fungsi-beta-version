import React, { useState } from 'react';
import StageHeader from './StageHeader';
import InstructorMascotGuide from './InstructorMascotGuide';
import { SUBBABS_DATA } from '../data/casesData';
import { audioEngine } from '../services/audioEngine';
import { Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Stage21Conclusion({ subbabId, onStageComplete, onBackToStages, onNextSubbab }) {
  const subbabData = SUBBABS_DATA[subbabId];
  const stageConfig = subbabData?.stages?.[20]; // Stage 21 (0-indexed 20)

  const [selectedOption, setSelectedOption] = useState('');
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  if (!stageConfig || !stageConfig.isConclusionStage) return null;

  const handleSelectOption = (opt) => {
    audioEngine.playClick();
    setSelectedOption(opt);
    setErrorDetails(null);
  };

  const handleSubmitConclusion = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setErrorDetails({
        title: 'BELUM ADA KESIMPULAN TERPILIH',
        reasons: ['Harap pilih salah satu pernyataan kesimpulan sebelum menekan tombol konfirmasi!']
      });
      audioEngine.playError();
      return;
    }

    if (selectedOption === stageConfig.correctAnswer) {
      audioEngine.playCorrect();
      audioEngine.playStageClear();
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

      const pts = 300;
      setScoreEarned(pts);
      setStageCleared(true);
      onStageComplete(`subbab${subbabId}`, 21, pts, 3);
    } else {
      audioEngine.playError();
      setErrorDetails({
        title: 'KESIMPULAN BELUM TEPAT',
        reasons: [
          'Pernyataan yang kamu pilih belum menyampaikan sifat utama dari konsep materi ini.',
          'Gunakan petunjuk Detektif Relo untuk menemukan prinsip matematika yang tepat!'
        ]
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabTitle={`${subbabData.title} (Kesimpulan PBL)`}
        stageNum={21}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        hintText={stageConfig.hint}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextSubbab(); }}
        onRetryStage={() => {
          setSelectedOption('');
          setStageCleared(false);
          setErrorDetails(null);
        }}
      />

      {/* GAMEPLAY LAYOUT: LEFT MASCOT DOCK & RIGHT WORKSPACE */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
        <InstructorMascotGuide
          layout="dock"
          character="relo"
          pose={stageCleared ? 'celebrating' : (errorDetails ? 'thinking' : 'default')}
          emotion={stageCleared ? 'happy' : (errorDetails ? 'error' : 'idle')}
          title={errorDetails ? "PETUNJUK DETEKTIF RELO" : "DETEKTIF RELO"}
          icon="🕵️‍♂️"
          message={errorDetails ? (errorDetails.hint || errorDetails.reasons?.[0]) : (isHintVisible ? (stageConfig.hint || `Pikirkan kembali definisi utama materi ${subbabData.title}!`) : (stageCleared ? 'Selamat! Kamu berhasil menuntaskan kesimpulan akhir materi ini! 🎉' : ''))}
        />

        <div className="flex-1 h-full min-h-0 flex flex-col justify-between overflow-hidden space-y-2">
          
          {/* Header Banner */}
          <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
            <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
              <Award className="w-5 h-5 text-[#D97706] animate-bounce" />
              <span>STAGE 21: RUMUSAN KESIMPULAN MATERI {subbabData.title.toUpperCase()}</span>
            </div>
            <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug mt-1">
              Pilih kesimpulan paling tepat berdasarkan temuan penyelidikan kasusmu!
            </p>
          </div>

          {/* Question Prompt */}
          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] flex-shrink-0">
            <h3 className="text-base sm:text-lg lg:text-[20px] font-black font-pencil text-[#2D241E] leading-snug">
              {stageConfig.question}
            </h3>
          </div>

          {/* Multiple Choice Conclusion Options (FIXED ZERO SCROLL) */}
          <form onSubmit={handleSubmitConclusion} className="flex-1 min-h-0 flex flex-col justify-between space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-hidden min-h-0 py-1">
              {stageConfig.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`pencil-btn p-3 rounded-2xl border-2 text-left font-bold transition-all flex items-start space-x-2.5 ${
                      isSelected
                        ? 'bg-[#FDE68A] text-[#2D241E] border-[#2D241E] ring-3 ring-[#F59E0B] shadow-[3px_3px_0px_#2D241E] font-black scale-[1.01]'
                        : 'glass-option text-[#2D241E] shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full border-2 border-[#2D241E] flex items-center justify-center font-pencil text-base font-black flex-shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[#D97706] text-white' : 'bg-[#EFECE6] text-[#2D241E]'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-base sm:text-lg lg:text-[20px] font-pencil font-bold leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pb-1 flex-shrink-0">
              <button
                type="submit"
                className="pencil-btn px-10 sm:px-12 py-2.5 sm:py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-black text-xl sm:text-2xl shadow-[3px_4px_0px_#2D241E] rounded-2xl border-2.5 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <CheckCircle2 className="w-6 h-6 text-[#D97706]" />
                <span>KIRIM KESIMPULAN</span>
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}
