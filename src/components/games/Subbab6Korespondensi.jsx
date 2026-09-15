import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { ArrowRightLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab6Korespondensi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[6].stages[stageNum - 1];

  const [selectedIdxA, setSelectedIdxA] = useState(null);
  const [userConnections, setUserConnections] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedIdxA(null);
    setUserConnections([]);
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const setA = stageConfig.setA || stageConfig.witnesses || [];
  const setB = stageConfig.setB || stageConfig.seats || [];

  const handleSelectA = (idxA) => {
    audioEngine.playClick();
    setSelectedIdxA(idxA);
    setErrorDetails(null);
  };

  const handleSelectB = (idxB, overrideIdxA) => {
    const fromA = overrideIdxA !== undefined ? overrideIdxA : selectedIdxA;
    if (fromA === null || fromA === undefined) return;
    audioEngine.playClick();

    const filtered = userConnections.filter(([a, b]) => a !== fromA && b !== idxB);
    const updated = [...filtered, [fromA, idxB]];

    setUserConnections(updated);
    setSelectedIdxA(null);
    setErrorDetails(null);
  };

  const handleVerify = () => {
    const isAllMappedA = userConnections.length === setA.length;
    const targetBIndices = userConnections.map(([_, b]) => b);
    const isUniqueB = new Set(targetBIndices).size === setB.length;

    if (isAllMappedA && isUniqueB) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 150 + (stageNum - 1) * 5;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab6', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      if (!isAllMappedA) {
        reasons.push(`⚠️ Belum semua Saksi (Himpunan A) mendapatkan alokasi Kursi (Himpunan B).`);
      }
      if (!isUniqueB) {
        reasons.push(`⚠️ Terdapat dua Saksi yang menduduki Kursi yang sama! Syarat 1:1 mewajibkan tiap Kursi diisi tepat satu Saksi.`);
      }

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL KORESPONDENSI SATU-SATU',
        reasons,
        hint: stageConfig.conceptDef || 'Konsep: n(A) harus sama dengan n(B). Setiap elemen A terhubung ke TEPAT SATU elemen B yang unik.'
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={6}
        subbabTitle="Korespondensi Satu-Satu"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || "Syarat korespondensi satu-satu: n(A) = n(B). Setiap elemen A harus dipasangkan ke tepat satu elemen B yang berbeda."}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setUserConnections([]);
          setSelectedIdxA(null);
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText="Korespondensi Satu-Satu terjadi jika n(A) = n(B) dan setiap elemen A memiliki tepat satu pasangan unik di B tanpa ada yang tersisa."
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
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || "Hubungkan setiap Saksi (Kolom A) ke TEPAT SATU Kursi (Kolom B) secara unik tanpa ada pasangan ganda.") : (stageCleared ? 'Hebat! Korespondensi satu-satu terpasang sempurna! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          conceptDef={stageConfig.conceptDef}
          relationRule="Aturan Alokasi Pasangan 1:1"
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/6.png" alt="Subbab 6 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <ArrowRightLeft className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <span>PENATAAN KURSI SIDANG SAKSI: KORESPONDENSI SATU-SATU</span>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug">
                  Hubungkan setiap saksi di Kolom A ke tepat satu kursi di Kolom B tanpa ada yang tersisa atau ganda!
                </p>
              </div>
            </div>

            {/* SVG Arrow Canvas Visual Diagram */}
            <div className="flex-1 min-h-0 flex flex-col justify-center py-1">
              <RelationDiagramCanvas
                setA={setA}
                setB={setB}
                connections={userConnections}
                selectedA={selectedIdxA}
                onSelectA={handleSelectA}
                onSelectB={handleSelectB}
                labelA="SAKSI (Himpunan A)"
                labelB="KURSI (Himpunan B)"
              />
            </div>

            {/* Action Verify Button */}
            <div className="flex justify-center pb-1 flex-shrink-0">
              <button
                onClick={handleVerify}
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
