import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Award, AlertTriangle, Lightbulb, ShieldCheck, Check } from 'lucide-react';
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

      const pts = 200 + (10 - stageNum) * 15;
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
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand">
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

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || "Injektif (Satu-satu): max 1 panah per B. Surjektif (Pada): min 1 panah per B. Bijektif: tepat 1 panah per B.")}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        conceptDef={stageConfig.conceptDef}
        relationRule="Klasifikasi Jenis Fungsi: Injektif, Surjektif, Bijektif"
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/7.png" alt="Subbab 7 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <Award className="w-4 h-4 animate-bounce text-[#D97706] flex-shrink-0" />
                <span>UJIAN AKHIR DETEKTIF DATA: INJEKTIF, SURJEKTIF & BIJEKTIF</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                Klasifikasikan sifat pemetaan fungsi di atas secara tepat!
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
            setA={stageConfig.setA}
            setB={stageConfig.setB}
            connections={connIndices}
            labelA="Himpunan Domain A"
            labelB="Himpunan Kodomain B"
            readOnly={true}
          />

          {/* Diagram Case Description Card */}
          <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] space-y-1 text-xs shadow-[2px_2px_0px_#2D241E]">
            <span className="text-xs font-bold text-[#78350F] uppercase">PENJELASAN SKEMA PEMETAAN:</span>
            <p className="text-[#2D241E] font-bold text-xs leading-relaxed">
              {stageConfig.description}
            </p>
          </div>

          {/* Options with Vibrant Selection State */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#78350F]">KLASIFIKASIKAN DIAGRAM KE DALAM KAIDAH FUNGSI:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stageConfig.choices.map((c, idx) => {
                const isSelected = selectedChoice === c;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(c)}
                    className={`pencil-btn p-3.5 rounded-2xl text-center font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2 ${
                      isSelected
                        ? 'bg-[#FDE68A] text-[#2D241E] border-3 border-[#2D241E] ring-4 ring-[#F59E0B] shadow-[4px_5px_0px_#2D241E] font-extrabold scale-[1.02]'
                        : 'bg-white border-2 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7] shadow-[2px_2px_0px_#2D241E]'
                    }`}
                  >
                    <span>{c}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#D97706] animate-bounce" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleClassify}
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
