import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Binary, KeyRound, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab5RumusFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[3]?.stages?.[stageNum - 1] || SUBBABS_DATA[3]?.stages?.[0];

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
        hint: stageConfig.conceptDef || 'Konsep: Masukkan (ganti) angka x ke dalam posisi x pada rumus yang dipilih.'
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

      const pts = 140 + (stageNum - 1) * 5;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab5', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      if (!isFormulaCorrect) {
        reasons.push(`⚠️ Rumus notasi f(x) yang kamu pilih belum cocok dengan cerita kasusnya.`);
      }
      if (!isValueCorrect) {
        reasons.push(`⚠️ Hasil hitungan nilai f(${stageConfig.xVal}) masih kurang tepat.`);
      }

      setErrorDetails({
        title: 'PETUNJUK DETEKTIF: RUMUS & NILAI',
        reasons,
        hint: stageConfig.conceptDef || `Petunjuk: f(x) = ax + b. Ganti huruf x dengan angka ${stageConfig.xVal}, lalu kalikan dan jumlahkan hasilnya.`
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={5}
        subbabTitle="Notasi, Rumus, & Nilai Fungsi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Rumus fungsi: f(x) = ax + b. Masukkan angka x ke dalam rumus untuk mencari nilainya.`}
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
        explanationText={`Nilai fungsi f(${stageConfig.xVal}) didapat dengan memasukkan nilai x = ${stageConfig.xVal} ke dalam rumus f(x) = ${stageConfig.correctFormula}.`}
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
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || `Masukkan nilai x = ${stageConfig.xVal} ke dalam rumus fungsi f(x) = ax + b.`) : (stageCleared ? 'Luar biasa! Pemecahan rumus fungsi dan hasil perhitunganmu akurat! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          story={stageConfig.story}
          conceptDef={stageConfig.conceptDef}
          relationRule={`Notasi & Nilai f(${stageConfig.xVal})`}
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/5.png" alt="Subbab 5 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <Binary className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <span>MEMECAHKAN KODE FUNGSI TERSANGKA: RUMUS & NILAI FUNGSI</span>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug">
                  {stageConfig?.story || ''}
                </p>
              </div>
            </div>

            {/* Step 1: Select Formula */}
            <div className="space-y-1.5 p-3 rounded-2xl glass-card border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex-shrink-0">
              <label className="text-sm sm:text-base lg:text-[18px] font-black text-[#78350F]">LANGKAH 1: PILIH NOTASI RUMUS FUNGSI f(x) YANG TEPAT</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {stageConfig.formulaOptions.map((f, idx) => {
                  const isSelected = selectedFormula === f;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSelectFormula(f)}
                      className={`pencil-btn p-2.5 sm:p-3 rounded-xl font-bold transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FDE68A] text-[#2D241E] border-2 border-[#2D241E] ring-3 ring-[#F59E0B] shadow-[2px_2px_0px_#2D241E] font-black scale-[1.01]'
                          : 'glass-option text-[#2D241E] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                      }`}
                    >
                      <span className="font-pencil text-base sm:text-lg lg:text-[20px]">{f}</span>
                      {isSelected && <Check className="w-5 h-5 text-[#D97706]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Input Calculated Value */}
            <form onSubmit={handleVerify} className="space-y-2 flex-1 min-h-0 flex flex-col justify-center">
              <div className="space-y-1.5 p-3 rounded-2xl glass-card border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <label className="text-sm sm:text-base lg:text-[18px] font-black text-[#78350F]">
                  LANGKAH 2: HITUNG HASIL NILAI f({stageConfig.xVal}) = ...
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={`Masukkan angka hasil f(${stageConfig.xVal})...`}
                    value={calculatedAns}
                    onChange={(e) => {
                      setCalculatedAns(e.target.value);
                      setErrorDetails(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-[#2D241E] text-base sm:text-lg lg:text-[20px] font-black focus:outline-none shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  />
                  <KeyRound className="w-5 h-5 text-[#D97706] absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="flex justify-center pt-1 flex-shrink-0">
                <button
                  type="submit"
                  className="pencil-btn px-10 sm:px-12 py-2.5 sm:py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-black text-xl sm:text-2xl shadow-[3px_4px_0px_#2D241E] rounded-2xl border-2.5 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
                >
                  <span>Yakin!?</span>
                </button>
              </div>
            </form>

          </div>
        </PBLSyntaxPanel>
      </div>

    </div>
  );
}
