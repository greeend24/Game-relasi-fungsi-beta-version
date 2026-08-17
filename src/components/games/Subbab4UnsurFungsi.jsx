import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import RelationDiagramCanvas from '../RelationDiagramCanvas';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Layers, AlertTriangle, Lightbulb, CheckCircle2, Check } from 'lucide-react';
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

      const pts = 130 + (10 - stageNum) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab4', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL UNSUR FUNGSI',
        reasons: [
          `⚠️ Terdapat jawaban yang belum tepat pada identifikasi unsur fungsi.`,
          `Periksa kembali perbedaan antara seluruh himpunan kawan (Kodomain) dan elemen yang benar-benar terpilih oleh panah (Range).`
        ],
        hint: stageConfig.conceptDef || 'Konsep: Domain = seluruh elemen A. Kodomain = seluruh elemen B. Range = sub-himpunan B yang punya panah dari A.'
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand">
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

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || "Domain = Daerah Asal (A), Kodomain = Daerah Kawan (seluruh B), Range = Daerah Hasil (B yang kena panah).")}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        conceptDef={stageConfig.conceptDef}
        relationRule="Identifikasi Unsur-Unsur Pemetaan Fungsi"
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/4.png" alt="Subbab 4 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <Layers className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span>PENENTUAN UNSUR FUNGSI: DOMAIN, KODOMAIN & RANGE</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                Kelompokkan elemen ke kategori Domain (Daerah Asal), Kodomain (Daerah Kawan), dan Range (Daerah Hasil)!
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
            connections={connIndices}
            labelA="Himpunan Asal A (Domain)"
            labelB="Himpunan Tujuan B (Kodomain)"
            highlightRange={true}
            readOnly={true}
          />

          {/* Quiz Questions */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-bold text-[#78350F]">KUIS PENGUATAN KONSEP UNSUR FUNGSI:</h4>
            
            {stageConfig.quiz.map((q, qIdx) => (
              <div key={qIdx} className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] space-y-2.5 shadow-[2px_2px_0px_#2D241E]">
                <p className="text-xs font-extrabold text-[#2D241E]">{qIdx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[qIdx] === opt;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(qIdx, opt)}
                        className={`pencil-btn p-3 rounded-xl text-left font-bold transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FDE68A] text-[#2D241E] border-2.5 border-[#2D241E] ring-4 ring-[#F59E0B] shadow-[3px_3px_0px_#2D241E] font-extrabold scale-[1.02]'
                            : 'bg-white border-2 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7]'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#D97706] animate-bounce" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

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
