import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Binary, AlertTriangle, Lightbulb, KeyRound, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab5RumusFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[5].stages[stageNum - 1];

  const [selectedFormula, setSelectedFormula] = useState('');
  const [calculatedAns, setCalculatedAns] = useState('');
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedFormula('');
    setCalculatedAns('');
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const handleSelectFormula = (f) => {
    audioEngine.playClick();
    setSelectedFormula(f);
    setErrorDetails(null);
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!selectedFormula) {
      setErrorDetails({
        title: 'FORMULA BELUM TERPILIH',
        reasons: ['Harap pilih salah satu rumus notasi fungsi f(x) terlebih dahulu!'],
        hint: stageConfig.conceptDef || 'Konsep: Notasi f(x) = ax + b menunjukkan perubahan nilai variabel x.'
      });
      audioEngine.playError();
      return;
    }

    const numVal = Number(calculatedAns.trim());
    if (isNaN(numVal) || calculatedAns.trim() === '') {
      setErrorDetails({
        title: 'NILAI HITUNGAN BELUM VALID',
        reasons: ['Harap masukkan angka hasil perhitungan f(x) pada kolom jawaban!'],
        hint: stageConfig.conceptDef || 'Konsep: Substitusikan angka x ke dalam posisi x pada rumus yang dipilih.'
      });
      audioEngine.playError();
      return;
    }

    const isFormulaCorrect = selectedFormula === stageConfig.correctFormula;
    const isValueCorrect = numVal === stageConfig.correctAns;

    if (isFormulaCorrect && isValueCorrect) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 140 + (10 - stageNum) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab5', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      if (!isFormulaCorrect) {
        reasons.push(`⚠️ Rumus notasi f(x) yang kamu pilih belum tepat menyimbolkan kasus cerita.`);
      }
      if (!isValueCorrect) {
        reasons.push(`⚠️ Hasil perhitungan nilai f(${stageConfig.xVal}) belum pas dengan operasi aljabar.`);
      }

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL NOTASI & RUMUS FUNGSI',
        reasons,
        hint: stageConfig.conceptDef || `Konsep: f(x) = ax + b. Gantikan posisi x dengan angka ${stageConfig.xVal}, lalu kalikan dengan koefisien a dan tambah konstanta b.`
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand">
      <StageHeader
        subbabId={5}
        subbabTitle="Notasi, Rumus, & Nilai Fungsi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Rumus fungsi: f(x) = ax + b. Substitusikan nilai x ke dalam rumus.`}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setSelectedFormula('');
          setCalculatedAns('');
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText={`Nilai fungsi f(${stageConfig.xVal}) diperoleh secara aljabar dengan menyubstitusikan variabel x = ${stageConfig.xVal} ke rumus fungsi f(x) = ${stageConfig.correctFormula}.`}
      />

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || `Substitusikan nilai x = ${stageConfig.xVal} ke dalam rumus fungsi f(x) = ax + b.`)}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        story={stageConfig.story}
        conceptDef={stageConfig.conceptDef}
        relationRule={`Notasi & Nilai f(${stageConfig.xVal})`}
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/5.png" alt="Subbab 5 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <Binary className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span>MEMECAHKAN KODE FUNGSI TERSANGKA: NOTASI & SUBSTITUSI</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                {stageConfig?.story || ''}
              </p>
            </div>
          </div>

          {/* Conceptual Error Analysis Card */}
          {errorDetails && (
            <div className="p-4 rounded-2xl bg-[#FFE4E6] border-2 border-[#BE123C] text-[#2D241E] space-y-2.5 animate-fade-in shadow-[2px_3px_0px_#2D241E]">
              <div className="flex items-center space-x-2 text-[#BE123C] font-extrabold text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-bounce" />
                <span>{errorDetails.title}</span>
              </div>
              
              <div className="space-y-1.5 text-xs font-bold">
                {errorDetails.reasons.map((reason, idx) => (
                  <p key={idx} className="p-2 rounded-xl bg-white border border-[#BE123C]/40 text-[#BE123C]">
                    {reason}
                  </p>
                ))}
              </div>

              <div className="pt-2 border-t border-[#BE123C]/30 flex items-center space-x-2 text-xs text-[#991B1B] font-bold">
                <Lightbulb className="w-4 h-4 flex-shrink-0 text-[#D97706]" />
                <span>{errorDetails.hint}</span>
              </div>
            </div>
          )}

          {/* Step 1: Select Formula */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#78350F]">LANGKAH 1: PILIH NOTASI RUMUS FUNGSI f(x) YANG TEPAT</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {stageConfig.formulaOptions.map((f, idx) => {
                const isSelected = selectedFormula === f;
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectFormula(f)}
                    className={`pencil-btn p-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FDE68A] text-[#2D241E] border-2.5 border-[#2D241E] ring-4 ring-[#F59E0B] shadow-[3px_3px_0px_#2D241E] font-extrabold scale-[1.02]'
                        : 'bg-white border-2 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7]'
                    }`}
                  >
                    <span>{f}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#D97706] animate-bounce" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Input Calculated Value */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#78350F]">
                LANGKAH 2: HITUNG HASIL NILAI f({stageConfig.xVal}) = ...
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={`Masukkan hasil angka f(${stageConfig.xVal})...`}
                  value={calculatedAns}
                  onChange={(e) => {
                    setCalculatedAns(e.target.value);
                    setErrorDetails(null);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[#2D241E] text-[#2D241E] text-sm font-extrabold focus:outline-none shadow-[2px_2px_0px_#2D241E]"
                />
                <KeyRound className="w-5 h-5 text-[#D97706] absolute right-4 top-3.5" />
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="pencil-btn px-10 py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-extrabold text-lg sm:text-xl shadow-[4px_5px_0px_#2D241E] rounded-2xl border-3 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <span>Yakin!?</span>
              </button>
            </div>
          </form>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
