import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { GitFork } from 'lucide-react';
import confetti from 'canvas-confetti';
import Game1KantinBuAni from './Game1KantinBuAni';

export default function Subbab1Relasi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  if (stageNum === 1) {
    return (
      <Game1KantinBuAni
        onBack={onBackToStages}
        onComplete={(score) => {
          if (onStageComplete) onStageComplete('subbab1', 1, score || 100, 3);
        }}
      />
    );
  }

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
    setSelectedIdxA(prev => prev === idxA ? null : idxA);
    setErrorDetails(null);
  };

  const handleSelectB = (idxB, overrideIdxA) => {
    const fromA = overrideIdxA !== undefined ? overrideIdxA : selectedIdxA;

    // KASUS 1: Tidak ada Domain A yang dipilih (pemain klik langsung di Kodomain B)
    // Putus tali jika Kodomain B yang dipencet sudah dipasangkan
    if (fromA === null || fromA === undefined) {
      const hasConnection = userConnections.some(([, b]) => b === idxB);
      if (hasConnection) {
        audioEngine.playHover();
        setUserConnections(prev => prev.filter(([, b]) => b !== idxB));
        setErrorDetails(null);
      }
      return;
    }

    // KASUS 2: Ada Domain A yang dipilih (Menyambungkan Domain A ke Kodomain B)
    // Menambahkan pasangan baru tanpa memutus sambungan Domain A ke Kodomain lain!
    audioEngine.playClick();

    const alreadyConnected = userConnections.some(([a, b]) => a === fromA && b === idxB);
    if (!alreadyConnected) {
      setUserConnections(prev => [...prev, [fromA, idxB]]);
    }

    setSelectedIdxA(null);
    setErrorDetails(null);
  };

  const handleDisconnectPair = (idxA, idxB) => {
    audioEngine.playHover();
    setUserConnections(prev => prev.filter(([a, b]) => !(a === idxA && b === idxB)));
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

      const pts = 100 + (stageNum - 1) * 5;
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
        title: 'PETUNJUK DETEKTIF: CEK ATURAN RELASI',
        reasons,
        hint: stageConfig.conceptDef || `Petunjuk: Coba cek setiap anggota A satu per satu. Apakah sudah sesuai aturan ${stageConfig.relationRule} dengan anggota B?`
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={1}
        subbabTitle="Pengertian Relasi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Aturan: ${stageConfig.relationRule}. Hubungkan anggota A ke B jika memenuhi aturan.`}
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

      {/* GAMEPLAY LAYOUT: LEFT MASCOT DOCK & RIGHT WORKSPACE */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
        <InstructorMascotGuide
          layout="dock"
          character="relo"
          pose={stageCleared ? 'celebrating' : (errorDetails ? 'thinking' : 'default')}
          emotion={stageCleared ? 'happy' : (errorDetails ? 'error' : 'idle')}
          title={errorDetails ? "PETUNJUK DETEKTIF RELO" : "DETEKTIF RELO"}
          icon="🕵️‍♂️"
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || `Aturan: ${stageConfig.relationRule}. Hubungkan anggota A ke B jika memenuhi aturan.`) : (stageCleared ? 'Luar biasa! Sambungan relasimu tepat sasaran! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          story={stageConfig.story}
          conceptDef={stageConfig.conceptDef}
          relationRule={stageConfig.relationRule}
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Compact Case Story Banner */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/1.png" alt="Subbab 1 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center gap-1 text-[#78350F] font-black mb-1">
                  <div className="flex items-center space-x-1.5 text-base sm:text-lg lg:text-[20px]">
                    <GitFork className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                    <span className="font-black">ATURAN: {stageConfig?.relationRule ? stageConfig.relationRule.toUpperCase() : ''}</span>
                  </div>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug break-words">
                  {stageConfig?.story || ''}
                </p>
              </div>
            </div>

            {/* Interactive Relation Canvas */}
            <div className="flex-1 min-h-0 flex flex-col justify-center py-1">
              <RelationDiagramCanvas
                setA={setA}
                setB={setB}
                connections={userConnections}
                selectedA={selectedIdxA}
                onSelectA={handleSelectA}
                onSelectB={handleSelectB}
                onDisconnectPair={handleDisconnectPair}
                labelA="HIMPUNAN A (Domain)"
                labelB="HIMPUNAN B (Kodomain)"
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
