import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { GitFork, AlertTriangle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab1Relasi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[1].stages[stageNum - 1];

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

  const setA = stageConfig.setA;
  const setB = stageConfig.setB;
  const validPairs = stageConfig.validPairs;

  const handleSelectA = (idxA) => {
    audioEngine.playClick();
    setSelectedIdxA(idxA);
    setErrorDetails(null);
  };

  const handleSelectB = (idxB) => {
    if (selectedIdxA === null) return;
    audioEngine.playClick();

    const exists = userConnections.some(([a, b]) => a === selectedIdxA && b === idxB);
    let updated;
    if (exists) {
      updated = userConnections.filter(([a, b]) => !(a === selectedIdxA && b === idxB));
    } else {
      updated = [...userConnections, [selectedIdxA, idxB]];
    }

    setUserConnections(updated);
    setSelectedIdxA(null);
    setErrorDetails(null);
  };

  const handleVerify = () => {
    const isSameLength = userConnections.length === validPairs.length;
    const isAllValid = isSameLength && userConnections.every(([a, b]) =>
      validPairs.some(([va, vb]) => va === a && vb === b)
    );

    if (isAllValid) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 100 + (10 - stageNum) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab1', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      let reasons = [];
      const invalidMade = userConnections.filter(([a, b]) =>
        !validPairs.some(([va, vb]) => va === a && vb === b)
      );
      
      if (invalidMade.length > 0) {
        reasons.push(`⚠️ Terdapat ${invalidMade.length} sambungan benang yang belum sesuai dengan aturan: ${stageConfig.relationRule}.`);
      }

      if (userConnections.length < validPairs.length) {
        reasons.push(`⚠️ Masih ada pasangan relasi yang belum kamu hubungkan berdasarkan aturan.`);
      }

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL KESALAHAN RELASI',
        reasons,
        hint: stageConfig.conceptDef || `Konsep: Uji setiap elemen A satu per satu. Apakah benar-benar memenuhi aturan ${stageConfig.relationRule} terhadap elemen B?`
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-1.5 sm:p-2.5 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={1}
        subbabTitle="Pengertian Relasi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Aturan: ${stageConfig.relationRule}. Hubungkan elemen A ke B jika memenuhi aturan.`}
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
        explanationText={stageConfig?.conceptDef || 'Relasi memetakan setiap anggota Himpunan Asal A (Domain) ke Himpunan Kawan B (Kodomain) sesuai aturan pasangan berurutan.'}
      />

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in flex-shrink-0">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || stageConfig.story || `Aturan: ${stageConfig.relationRule}. Hubungkan elemen A ke B jika memenuhi aturan.`)}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        story={stageConfig.story}
        conceptDef={stageConfig.conceptDef}
        relationRule={stageConfig.relationRule}
        errorDetails={errorDetails}
      >
        <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1.5 font-hand">
          
          {/* Compact Case Story Banner */}
          <div className="rounded-xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[44px] flex flex-col justify-end p-2 bg-[#FEF3C7] flex-shrink-0">
            <img src="/images/1.png" alt="Subbab 1 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center justify-between gap-1 text-[#78350F] font-black text-xs mb-0.5">
                <div className="flex items-center space-x-1">
                  <GitFork className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" />
                  <span className="font-extrabold">ATURAN: {stageConfig?.relationRule ? stageConfig.relationRule.toUpperCase() : ''}</span>
                </div>
                {stageConfig?.bloomLevel && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D97706] text-white text-[9px] sm:text-[10px] font-black flex-shrink-0">
                    {stageConfig.bloomLevel}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-[#2D241E] font-bold leading-normal break-words">
                {stageConfig?.story || ''}
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-start mt-2 space-y-3">
            <RelationDiagramCanvas
              setA={setA}
              setB={setB}
              connections={userConnections}
              selectedA={selectedIdxA}
              onSelectA={handleSelectA}
              onSelectB={handleSelectB}
              labelA="HIMPUNAN A (Domain)"
              labelB="HIMPUNAN B (Kodomain)"
            />

            <div className="flex justify-center pt-1">
              <button
                onClick={handleVerify}
                className="pencil-btn px-10 py-3 bg-[#FDE68A] hover:bg-[#F59E0B] text-[#2D241E] font-extrabold text-lg sm:text-xl shadow-[4px_5px_0px_#2D241E] rounded-2xl border-3 border-[#2D241E] flex items-center space-x-2 cursor-pointer transition hover:scale-105 active:scale-95"
              >
                <span>Yakin!?</span>
              </button>
            </div>
          </div>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
