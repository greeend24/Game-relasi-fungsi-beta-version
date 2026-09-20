import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Layers, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab4UnsurFungsi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[4].stages[stageNum - 1];

  const [answers, setAnswers] = useState({});
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setAnswers({});
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);
  }, [stageNum]);

  if (!stageConfig) return null;

  const setA = stageConfig.setA;
  const setB = stageConfig.setB;
  const connIndices = stageConfig.mappedPairs.map(([a, b]) => [
    setA.indexOf(a),
    setB.indexOf(b)
  ]);

  const handleSelectQuizOption = (qIdx, opt) => {
    audioEngine.playClick();
    setAnswers({ ...answers, [qIdx]: opt });
    setErrorDetails(null);
  };

  const handleVerify = () => {
    const totalQuestions = stageConfig.quiz.length;
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < totalQuestions) {
      setErrorDetails({
        title: 'KUIS BELUM LENGKAP',
        reasons: ['Harap jawab seluruh pertanyaan audit unsur fungsi sebelum memverifikasi!'],
        hint: stageConfig.conceptDef || 'Konsep: Pahami beda Domain (asal A), Kodomain (seluruh B), dan Range (elemen B yang kena panah).'
      });
      audioEngine.playError();
      return;
    }

    let correctCount = 0;
    stageConfig.quiz.forEach((q, idx) => {
      if (answers[idx] === q.answer) correctCount++;
    });

    if (correctCount === totalQuestions) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 130 + (stageNum - 1) * 5;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab4', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      setErrorDetails({
        title: 'PETUNJUK DETEKTIF: DAERAH FUNGSI',
        reasons: [
          `⚠️ Ada jawaban yang belum tepat untuk daerah asal, kawan, atau hasil.`,
          `Ingat bedanya: Kodomain adalah SEMUA anggota di Himpunan Kawan, sedangkan Range (Hasil) HANYA anggota kawan yang kena panah.`
        ],
        hint: stageConfig.conceptDef || 'Petunjuk: Domain = semua anggota A. Kodomain = semua anggota B. Range = anggota B yang mendapat panah dari A.'
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
      <StageHeader
        subbabId={4}
        subbabTitle="Domain, Kodomain, & Range"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Domain = Himpunan A, Kodomain = Himpunan B, Range = Elemen B yang menerima panah.`}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setAnswers({});
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText="Domain adalah seluruh himpunan asal A, Kodomain adalah seluruh himpunan kawan B, dan Range adalah himpunan hasil elemen B yang menerima panah."
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
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || "Domain = Daerah Asal (A), Kodomain = Daerah Kawan (seluruh B), Range = Daerah Hasil (B yang kena panah).") : (stageCleared ? 'Sempurna! Unsur fungsi Domain, Kodomain, dan Range teridentifikasi! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          conceptDef={stageConfig.conceptDef}
          relationRule="Identifikasi Unsur-Unsur Pemetaan Fungsi"
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/4.png" alt="Subbab 4 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <Layers className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <span>PENENTUAN UNSUR FUNGSI: DOMAIN, KODOMAIN & RANGE</span>
                </div>
                <p className="text-base sm:text-lg lg:text-[20px] text-[#2D241E] font-bold leading-snug">
                  Kelompokkan elemen ke kategori Domain (Daerah Asal), Kodomain (Daerah Kawan), dan Range (Daerah Hasil)!
                </p>
              </div>
            </div>

            {/* Middle Section: Side-by-Side Diagram and Quiz */}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3.5 items-center py-1">
              
              {/* Left Side: Relation Diagram */}
              <div className="h-full flex items-center justify-center">
                <RelationDiagramCanvas
                  setA={setA}
                  setB={setB}
                  connections={connIndices}
                  labelA="Domain A"
                  labelB="Kodomain B"
                  highlightRange={true}
                  readOnly={true}
                  compact={true}
                  className="w-full"
                />
              </div>

              {/* Right Side: Quiz Questions */}
              <div className="space-y-2.5 font-sans overflow-hidden">
                {stageConfig.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-3 rounded-2xl glass-card border border-white/60 space-y-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <p className="text-base sm:text-lg lg:text-[20px] font-black text-[#2D241E]">{qIdx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-base">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = answers[qIdx] === opt;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(qIdx, opt)}
                            className={`pencil-btn p-2.5 rounded-xl text-left font-bold transition flex items-center justify-between text-sm sm:text-base lg:text-[18px] ${
                              isSelected
                                ? 'bg-[#FDE68A] text-[#2D241E] border-2 border-[#2D241E] ring-2 ring-[#F59E0B] shadow-[2px_2px_0px_#2D241E] font-black scale-[1.01]'
                                : 'glass-option text-[#2D241E] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                            }`}
                          >
                            <span className="break-words">{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#D97706] ml-1 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

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
