import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { ArrowRightLeft, AlertTriangle, Lightbulb } from 'lucide-react';
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

  const handleSelectB = (idxB) => {
    if (selectedIdxA === null) return;
    audioEngine.playClick();

    const filtered = userConnections.filter(([a, b]) => a !== selectedIdxA && b !== idxB);
    const updated = [...filtered, [selectedIdxA, idxB]];

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

      const pts = 150 + (10 - stageNum) * 10;
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
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand">
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

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || "Hubungkan setiap Saksi (Kolom A) ke TEPAT SATU Kursi (Kolom B) secara unik tanpa ada pasangan ganda.")}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        conceptDef={stageConfig.conceptDef}
        relationRule="Aturan Alokasi Pasangan 1:1"
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/6.png" alt="Subbab 6 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <Repeat className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span>PENATAAN KURSI SIDANG SAKSI: KORESPONDENSI SATU-SATU</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                Hubungkan setiap saksi di Kolom A ke tepat satu kursi di Kolom B tanpa ada yang tersisa atau ganda!
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

          {/* SVG Arrow Canvas Visual Diagram */}
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

          <div className="flex justify-center pt-2">
            <button
              onClick={handleVerify}
              className="pencil-btn px-10 py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-extrabold text-lg sm:text-xl shadow-[4px_5px_0px_#2D241E] rounded-2xl border-3 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <span>Yakin!?</span>
            </button>
          </div>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
