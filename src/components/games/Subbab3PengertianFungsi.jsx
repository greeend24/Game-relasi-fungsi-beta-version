import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Fingerprint, CheckCircle2, Scan, AlertTriangle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab3PengertianFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[3].stages[stageNum - 1];

  const [selectedMachineIds, setSelectedMachineIds] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedMachineIds([]);
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const toggleMachine = (id) => {
    audioEngine.playScan();
    let updated = [...selectedMachineIds];
    if (updated.includes(id)) {
      updated = updated.filter(mId => mId !== id);
    } else {
      updated.push(id);
    }
    setSelectedMachineIds(updated);
    setErrorDetails(null);
  };

  const handleInspect = () => {
    const validMachineIds = stageConfig.machines.filter(m => m.isFunction).map(m => m.id);

    const falselySelected = selectedMachineIds.filter(id => !validMachineIds.includes(id));
    const missedValid = validMachineIds.filter(id => !selectedMachineIds.includes(id));

    const isExactMatch = falselySelected.length === 0 && missedValid.length === 0;

    if (isExactMatch) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 120 + (10 - stageNum) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab3', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      
      if (falselySelected.length > 0) {
        reasons.push(`⚠️ Terdapat mesin yang kamu tandai sebagai Fungsi, padahal melanggar syarat pemetaan (input bercabang atau tidak terpasang).`);
      }

      if (missedValid.length > 0) {
        reasons.push(`⚠️ Masih ada mesin valid fungsi yang belum kamu tandai.`);
      }

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL KAIDAH FUNGSI',
        reasons,
        hint: stageConfig.conceptDef || 'Konsep: Fungsi mensyaratkan (1) Seluruh elemen Domain A habis terpasang, (2) Tidak ada elemen A yang bercabang ke >1 pasangan di B.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 space-y-2.5">
      <StageHeader
        subbabId={3}
        subbabTitle="Pengertian Fungsi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Fungsi (Pemetaan): Relasi khusus yang memasangkan SETIAP elemen Himpunan A TEPAT SATU ke Himpunan B.`}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setSelectedMachineIds([]);
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText={stageConfig?.conceptDef || 'Syarat formal Fungsi (Pemetaan): (1) Seluruh elemen Domain A terhubung habis, (2) Tidak ada elemen Domain A yang bercabang lebih dari satu.'}
      />

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || 'Audit keempat pemetaan di bawah. Manakah yang memenuhi kaidah FUNGSI TEPAT SATU?')}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        conceptDef={stageConfig.conceptDef}
        relationRule="Audit Validasi Pemetaan Fungsi"
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Animated 2D Anime Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/3.png" alt="Subbab 3 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <CheckCheck className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span className="truncate">AUDIT PEMETAAN MESIN SIDIK JARI: MANA FUNGSI VALID?</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                Periksa seluruh mesin pemindai di bawah dan pilih mesin yang memenuhi kaidah FUNGSI (Domain A terpasang habis dan tidak bercabang)!
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

          {/* 4 Machine Diagram Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stageConfig.machines.map((m) => {
              const isSelected = selectedMachineIds.includes(m.id);

              const setA = Array.from(new Set(m.pairs.map(p => p[0])));
              const setB = Array.from(new Set(m.pairs.map(p => p[1])));
              const connIndices = m.pairs.map(([a, b]) => [
                setA.indexOf(a),
                setB.indexOf(b)
              ]);

              return (
                <div
                  key={m.id}
                  onClick={() => toggleMachine(m.id)}
                  className={`pencil-btn p-4 rounded-3xl border-2 transition-all duration-300 space-y-3 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-[#FEF3C7] border-[#2D241E] ring-4 ring-[#F59E0B]/40 shadow-[4px_5px_0px_#2D241E]'
                      : 'bg-white border-[#2D241E] hover:bg-[#FFFDF9] shadow-[2px_3px_0px_#2D241E]'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#78350F]">
                      <Scan className="w-4 h-4 text-[#D97706]" />
                      <span>DIAGRAM MESIN #{m.id}</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border flex items-center space-x-1 ${
                      isSelected ? 'bg-[#D1FAE5] text-[#065F46] border-[#059669]' : 'bg-[#EFECE6] text-[#78716C] border-[#A8A29E]'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />}
                      <span>{isSelected ? 'DITANDAI FUNGSI' : 'KLIK UNTUK TANDAI'}</span>
                    </div>
                  </div>

                  {/* SVG Visual Diagram Threads */}
                  <RelationDiagramCanvas
                    setA={setA}
                    setB={setB}
                    connections={connIndices}
                    labelA="Domain A"
                    labelB="Kodomain B"
                    readOnly={true}
                  />
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <button
            onClick={handleInspect}
            className="pencil-btn w-full py-3.5 bg-[#F59E0B] text-[#2D241E] font-extrabold text-sm shadow-[3px_4px_0px_#2D241E]"
          >
            KONFIRMASI HASIL AUDIT MESIN FUNGSI
          </button>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
