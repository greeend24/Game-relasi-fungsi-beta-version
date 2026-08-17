import React, { useState } from 'react';
import StageHeader from './StageHeader';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { SUBBABS_DATA } from '../data/casesData';
import { audioEngine } from '../services/audioEngine';
import { HelpCircle, Award, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
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
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand">
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

      {/* Professor Owl Mascot Greeting */}
      <div className="flex justify-center">
        <ProfessorOwlMascot
          emotion={stageCleared ? 'happy' : errorDetails ? 'error' : 'thinking'}
          message={`Stage 21 — Puncak Penyelidikan! Saatnya merumuskan KESIMPULAN materi ${subbabData.title}.`}
          size="lg"
          isFlapping={stageCleared}
        />
      </div>

      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/40 space-y-6 shadow-2xl font-mono">
        
        {/* Header Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-cyan-950/60 border border-cyan-500/40 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 text-yellow-400 font-bold">
            <Award className="w-6 h-6 animate-bounce" />
            <span>STAGE 21: RUMUSAN KESIMPULAN KASUS</span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Pilih kesimpulan yang paling tepat berdasarkan pemahamanmu!
          </p>
        </div>

        {/* Detailed Error Analysis Card */}
        {errorDetails && (
          <div className="p-5 rounded-2xl bg-crimson/15 border-2 border-crimson/50 text-slate-100 font-mono space-y-3 animate-fade-in shadow-xl">
            <div className="flex items-center space-x-2 text-crimson font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
              <span>{errorDetails.title}</span>
            </div>
            
            <div className="space-y-2 text-xs font-sans">
              {errorDetails.reasons.map((reason, idx) => (
                <p key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-crimson/30 leading-relaxed font-semibold text-slate-200">
                  {reason}
                </p>
              ))}
            </div>

            <div className="pt-2 border-t border-crimson/30 flex items-center space-x-2 text-[11px] text-yellow-300 font-mono italic">
              <Lightbulb className="w-4 h-4 flex-shrink-0" />
              <span>{stageConfig.hint}</span>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-extrabold text-cyan-300 font-sans leading-relaxed">
            {stageConfig.question}
          </h3>
        </div>

        {/* Multiple Choice Options */}
        <form onSubmit={handleSubmitConclusion} className="space-y-3 font-sans">
          {stageConfig.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold leading-relaxed transition-all duration-200 flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 ring-4 ring-cyan-500/30 text-cyan-200 font-bold'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5 ${
                  isSelected ? 'border-cyan-400 bg-cyan-400 text-black font-extrabold' : 'border-slate-600 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}

          <button
            type="submit"
            className="w-full py-4 mt-4 rounded-2xl font-bold font-mono text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 text-black hover:brightness-110 transition shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>KIRIM KESIMPULAN</span>
          </button>
        </form>

      </div>
    </div>
  );
}
