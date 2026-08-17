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
        reasons.push(`⚠️ Terdapat ${invalidMade.length} sambungan benang yang belum sesuai dengan aturan "${stageConfig.relationRule}".`);
      }

      if (userConnections.length < validPairs.length) {
        reasons.push(`⚠️ Masih ada pasangan relasi yang belum kamu hubungkan berdasarkan aturan.`);
      }

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL KESALAHAN RELASI',
        reasons,
        hint: stageConfig.conceptDef || `Konsep: Uji setiap elemen A satu per satu. Apakah benar-benar memenuhi aturan "${stageConfig.relationRule}" terhadap elemen B?`
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 space-y-2.5">
      <StageHeader
        subbabId={1}
        subbabTitle="Pengertian Relasi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Aturan: "${stageConfig.relationRule}". Hubungkan elemen A ke B jika memenuhi aturan.`}
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
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || stageConfig.story || `Aturan: "${stageConfig.relationRule}". Hubungkan elemen A ke B jika memenuhi aturan.`)}
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
        <div className="space-y-3 font-hand">
          
          {/* Compact Case Story Banner */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/1.png" alt="Subbab 1 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center justify-between gap-2 text-[#78350F] font-black text-xs sm:text-base mb-0.5">
                <div className="flex items-center space-x-1.5 truncate">
                  <GitFork className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                  <span className="truncate">ATURAN KASUS: "{stageConfig?.relationRule ? stageConfig.relationRule.toUpperCase() : ''}"</span>
                </div>
                {stageConfig?.bloomLevel && (
                  <span className="px-2 py-0.5 rounded-full bg-[#D97706] text-white text-[10px] sm:text-xs font-black shadow-sm flex-shrink-0">
                    {stageConfig.bloomLevel}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold">
                {stageConfig?.story || ''}
              </p>
            </div>
          </div>

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

          <button
            onClick={handleVerify}
            className="pencil-btn w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D241E] font-extrabold text-xs sm:text-sm shadow-[3px_3px_0px_#2D241E]"
          >
            VERIFIKASI SAMBUNGAN BENANG RELASI
          </button>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
