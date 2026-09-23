import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { CheckCircle2, CheckCheck, Scan } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab3PengertianFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[2]?.stages?.[stageNum - 1] || SUBBABS_DATA[2]?.stages?.[0];

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

      const pts = 120 + (stageNum - 1) * 5;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab3', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      
      if (falselySelected.length > 0) {
        reasons.push(`⚠️ Ada diagram yang kamu pilih padahal bukan fungsi (karena ada anggota himpunan asal yang bercabang atau tidak punya pasangan).`);
      }

      if (missedValid.length > 0) {
        reasons.push(`⚠️ Masih ada diagram fungsi yang benar namun belum kamu tandai.`);
      }

      setErrorDetails({
        title: 'PETUNJUK DETEKTIF: SYARAT FUNGSI',
        reasons,
        hint: stageConfig.conceptDef || 'Ingat syarat fungsi: (1) Semua anggota di Himpunan A harus punya pasangan, (2) Anggota di Himpunan A tidak boleh bercabang (hanya boleh punya 1 pasangan di B).'
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={3}
        subbabTitle="Pengertian Fungsi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Fungsi: Relasi khusus yang memasangkan SETIAP anggota Himpunan A TEPAT SATU ke Himpunan B.`}
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
        explanationText={stageConfig?.conceptDef || 'Syarat Fungsi: (1) Semua anggota di Himpunan A harus punya pasangan, (2) Anggota di Himpunan A tidak boleh bercabang lebih dari satu.'}
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
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || 'Audit keempat pemetaan di bawah. Manakah yang memenuhi kaidah FUNGSI TEPAT SATU?') : (stageCleared ? 'Mantap! Audit mesin fungsi berhasil diverifikasi! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          conceptDef={stageConfig.conceptDef}
          relationRule="Audit Validasi Pemetaan Fungsi"
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-1.5 font-hand">
            
            {/* Animated Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/3.png" alt="Subbab 3 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <CheckCheck className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <span>AUDIT PEMETAAN MESIN SIDIK JARI: MANA FUNGSI VALID?</span>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug">
                  Pilih seluruh mesin yang memenuhi syarat FUNGSI (Domain A habis terpasang dan tidak bercabang)!
                </p>
              </div>
            </div>

            {/* 4 Machine Diagram Cards in Compact 2x2 Grid */}
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-2.5 py-1">
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
                    className={`pencil-btn p-2 sm:p-2.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEF3C7] border-[#2D241E] ring-3 ring-[#F59E0B]/60 shadow-[3px_3px_0px_#2D241E]'
                        : 'glass-card border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                    }`}
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center space-x-1.5 text-sm sm:text-base font-black text-[#78350F]">
                        <Scan className="w-4 h-4 text-[#D97706]" />
                        <span>MESIN #{m.id}</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-lg text-xs sm:text-sm font-black border flex items-center space-x-1 ${
                        isSelected ? 'bg-[#D1FAE5] text-[#065F46] border-[#059669]' : 'bg-[#EFECE6] text-[#78716C] border-[#A8A29E]'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />}
                        <span>{isSelected ? 'FUNGSI' : 'PILIH'}</span>
                      </div>
                    </div>

                    {/* SVG Visual Diagram Threads */}
                    <div className="flex-1 min-h-0 flex items-center justify-center">
                      <RelationDiagramCanvas
                        setA={setA}
                        setB={setB}
                        connections={connIndices}
                        labelA="Domain A"
                        labelB="Kodomain B"
                        readOnly={true}
                        compact={true}
                        className="p-1.5 border-none shadow-none bg-transparent"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Verify Button */}
            <div className="flex justify-center pb-1 flex-shrink-0">
              <button
                onClick={handleInspect}
                className="pencil-btn px-10 sm:px-12 py-2.5 sm:py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-black text-xl sm:text-2xl shadow-[3px_4px_0px_#2D241E] rounded-2xl border-2.5 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <span>Yakin!?</span>
              </button>
            </div>

          </div>
        </PBLSyntaxPanel>
      </div>

    </div>
  );
}
