import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Award, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab7JenisFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[7].stages[stageNum - 1];

  const [selectedChoice, setSelectedChoice] = useState('');
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedChoice('');
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const setA = stageConfig.setA || [];
  const setB = stageConfig.setB || [];

  const connIndices = (stageConfig.mappedPairs || []).map(([a, b]) => {
    const idxA = typeof a === 'number' ? a : setA.indexOf(a);
    const idxB = typeof b === 'number' ? b : setB.indexOf(b);
    return [idxA >= 0 ? idxA : 0, idxB >= 0 ? idxB : 0];
  });

  const handleSelectChoice = (c) => {
    audioEngine.playClick();
    setSelectedChoice(c);
    setErrorDetails(null);
  };

  const handleClassify = () => {
    if (!selectedChoice) {
      setErrorDetails({
        title: 'BELUM ADA KLASIFIKASI TERPILIH',
        reasons: ['Harap pilih salah satu opsi label jenis fungsi (Injektif, Surjektif, Bijektif, atau Bukan Ketiganya).'],
        hint: stageConfig.conceptDef || 'Konsep: Amati apakah elemen B dipetakan maksimal 1 kali, minimal 1 kali, atau tepat 1 kali.'
      });
      audioEngine.playError();
      return;
    }

    if (selectedChoice === stageConfig.answer) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });

      const pts = 200 + (stageNum - 1) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab7', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL KLASIFIKASI FUNGSI',
        reasons: [
          `⚠️ Kategori ${selectedChoice} yang kamu pilih belum sesuai dengan ciri pemetaan pada diagram.`,
          `Amati kembali jumlah panah yang masuk ke setiap elemen pada Himpunan Kodomain B!`
        ],
        hint: stageConfig.conceptDef || 'Konsep: Injektif = max 1 panah per B; Surjektif = min 1 panah per B (Range=Kodomain); Bijektif = pas 1 panah per B.'
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={7}
        subbabTitle="Jenis-Jenis Fungsi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || "Injektif (Satu-satu): max 1 panah per B. Surjektif (Pada): min 1 panah per B. Bijektif: tepat 1 panah per B."}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setSelectedChoice('');
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText={`Relasi ini terklasifikasi sebagai FUNGSI ${stageConfig.answer.toUpperCase()} sesuai kaidah formal pemetaan elemen domain ke kodomain.`}
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
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || "Injektif (Satu-satu): max 1 panah per B. Surjektif (Pada): min 1 panah per B. Bijektif: tepat 1 panah per B.") : (stageCleared ? 'Luar biasa! Klasifikasi jenis fungsi terpecahkan! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          conceptDef={stageConfig.conceptDef}
          relationRule="Klasifikasi Jenis Fungsi: Injektif, Surjektif, Bijektif"
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/7.png" alt="Subbab 7 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <Award className="w-5 h-5 animate-bounce text-[#D97706] flex-shrink-0" />
                  <span>UJIAN AKHIR DETEKTIF DATA: INJEKTIF, SURJEKTIF & BIJEKTIF</span>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug">
                  Klasifikasikan sifat pemetaan fungsi di atas secara tepat!
                </p>
              </div>
            </div>

            {/* Middle Section: Side-by-Side Diagram and Choices */}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3.5 items-center py-1">
              
              {/* Left Side: Relation Diagram */}
              <div className="h-full flex items-center justify-center">
                <RelationDiagramCanvas
                  setA={stageConfig.setA}
                  setB={stageConfig.setB}
                  connections={connIndices}
                  labelA="Domain A"
                  labelB="Kodomain B"
                  readOnly={true}
                  compact={true}
                  className="w-full"
                />
              </div>

              {/* Right Side: Case Description + Classification Choices */}
              <div className="space-y-2.5 flex flex-col justify-center">
                {/* Description Card */}
                <div className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] space-y-1 shadow-[2px_2px_0px_#2D241E]">
                  <span className="text-xs sm:text-sm lg:text-base font-black text-[#78350F] uppercase">PENJELASAN SKEMA PEMETAAN:</span>
                  <p className="text-[#2D241E] font-bold text-base sm:text-lg lg:text-[20px] leading-snug">
                    {stageConfig.description}
                  </p>
                </div>

                {/* 2x2 Grid Choices */}
                <div className="grid grid-cols-2 gap-2.5">
                  {stageConfig.choices.map((c, idx) => {
                    const isSelected = selectedChoice === c;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectChoice(c)}
                        className={`pencil-btn p-3 sm:p-3.5 rounded-2xl text-center font-bold transition flex items-center justify-center space-x-2 ${
                          isSelected
                            ? 'bg-[#FDE68A] text-[#2D241E] border-2.5 border-[#2D241E] ring-3 ring-[#F59E0B] shadow-[3px_3px_0px_#2D241E] font-black scale-[1.01]'
                            : 'glass-option text-[#2D241E] shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                        }`}
                      >
                        <span className="font-pencil text-base sm:text-lg lg:text-[20px]">{c}</span>
                        {isSelected && <Check className="w-5 h-5 text-[#D97706] ml-1 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Action Verify Button */}
            <div className="flex justify-center pb-1 flex-shrink-0">
              <button
                onClick={handleClassify}
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
