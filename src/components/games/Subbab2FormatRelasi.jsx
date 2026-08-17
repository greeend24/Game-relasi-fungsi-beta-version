import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import ProfessorOwlMascot from '../ProfessorOwlMascot';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Kanban, AlertTriangle, Lightbulb, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Subbab2FormatRelasi({ stageNum, onStageComplete, onBackToStages, onNextStage, onOpenSubbabInfo }) {
  const stageConfig = SUBBABS_DATA[2].stages[stageNum - 1];

  const [selectedFormatChoice, setSelectedFormatChoice] = useState('');
  const [options, setOptions] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  useEffect(() => {
    setSelectedFormatChoice('');
    setErrorDetails(null);
    setIsHintVisible(false);
    setStageCleared(false);
    setScoreEarned(0);

    if (stageConfig) {
      const pairs = stageConfig.pairs || [];
      const correctOptionString = pairs.map(p => `(${p.x}, ${p.y})`).join(', ');
      const generatedOptions = [
        correctOptionString,
        pairs.map(p => `(${p.y}, ${p.x})`).join(', '),
        pairs.map(p => typeof p.x === 'number' ? `(${p.x + 1}, ${p.y})` : `(${p.x}*, ${p.y})`).join(', '),
        pairs.map(p => typeof p.y === 'number' ? `(${p.x}, ${p.y + 1})` : `(${p.x}, ${p.y}*)`).join(', ')
      ].sort(() => 0.5 - Math.random());
      setOptions(generatedOptions);
    }
  }, [stageNum]);

  if (!stageConfig) return null;

  const givenType = stageConfig.givenType;
  const targetType = stageConfig.targetType;
  const pairs = stageConfig.pairs;

  const correctOptionString = pairs.map(p => `(${p.x}, ${p.y})`).join(', ');

  const handleSelectChoice = (opt) => {
    audioEngine.playClick();
    setSelectedFormatChoice(opt);
    setErrorDetails(null);
  };

  const handleVerify = () => {
    if (!selectedFormatChoice) {
      setErrorDetails({
        title: 'BELUM ADA PILIHAN TERPILIH',
        reasons: ['Harap pilih salah satu opsi format laporan sebelum memverifikasi!'],
        hint: stageConfig.conceptDef || 'Konsep: Pilih opsi yang mempertahankan elemen asal x dan kawan y.'
      });
      audioEngine.playError();
      return;
    }

    if (selectedFormatChoice === correctOptionString) {
      audioEngine.playCorrect();
      audioEngine.playStageComplete();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const pts = 120 + (10 - stageNum) * 10;
      setScoreEarned(pts);
      setStageCleared(true);
      setErrorDetails(null);
      onStageComplete('subbab2', stageNum, pts, 3);
    } else {
      audioEngine.playError();

      setErrorDetails({
        title: 'EVALUASI KONSEPTUAL FORMAT RELASI',
        reasons: [
          '⚠️ Pilihan format yang kamu buat menukar posisi x dan y atau mengubah nilai elemen.',
          'Format relasi harus mempertahankan pasangan berurutan (x, y) tanpa mengubah urutan domain dan kodomain.'
        ],
        hint: stageConfig.conceptDef || 'Konsep: Dalam Pasangan Berurutan (x, y), elemen pertama x selalu Domain dan elemen kedua y selalu Kodomain.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 space-y-2.5">
      <StageHeader
        subbabId={2}
        subbabTitle="Bentuk Menyajikan Relasi"
        stageNum={stageNum}
        onBackToStages={onBackToStages}
        onShowHint={() => setIsHintVisible(!isHintVisible)}
        onOpenSubbabInfo={onOpenSubbabInfo}
        hintText={stageConfig.conceptDef || `Bentuk relasi: Diagram Panah, Pasangan Berurutan, Diagram Kartesius.`}
        isHintVisible={isHintVisible}
        stageCleared={stageCleared}
        scoreEarned={scoreEarned}
        starsEarned={3}
        onNextStage={() => { setStageCleared(false); onNextStage(); }}
        onRetryStage={() => {
          setSelectedFormatChoice('');
          setStageCleared(false);
          setErrorDetails(null);
        }}
        explanationText={stageConfig?.conceptDef || 'Relasi matematika dapat disajikan dalam 3 bentuk identik: Diagram Panah, Himpunan Pasangan Berurutan, dan Diagram Kartesius.'}
      />

      {/* Professor Owl Mascot: Compact & Helpful */}
      <div className="flex justify-center sm:justify-start animate-fade-in">
        <ProfessorOwlMascot
          pose="thinking"
          message={errorDetails ? errorDetails.hint : (stageConfig.conceptDef || `Ubah bentuk "${givenType}" menjadi bentuk "${targetType}". Nilai (x, y) harus sama.`)}
          size="sm"
        />
      </div>

      <PBLSyntaxPanel
        stageNum={stageNum}
        conceptDef={stageConfig.conceptDef}
        relationRule={`Format ${givenType} ➔ ${targetType}`}
        errorDetails={errorDetails}
      >
        <div className="space-y-3 font-hand">
          
          {/* Topic Illustration */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] relative group min-h-[60px] flex flex-col justify-end p-2.5 sm:p-3 bg-[#FEF3C7]">
            <img src="/images/2.png" alt="Subbab 2 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-[#78350F] font-black text-xs sm:text-base">
                <Kanban className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <span className="truncate">UBAH LAPORAN: MINTA FORMAT "{stageConfig?.targetType ? stageConfig.targetType.toUpperCase() : ''}"</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D241E] font-bold mt-0.5">
                Konversikan informasi laporan dari format <span className="text-[#D97706] font-black">{stageConfig?.givenType || ''}</span> ke format <span className="text-[#2563EB] font-black">{stageConfig?.targetType || ''}</span>!
              </p>
            </div>
          </div>

          {/* Given Pairs Box */}
          <div className="p-2.5 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] space-y-1 shadow-[2px_2px_0px_#2D241E]">
            <span className="text-[11px] font-bold text-[#78350F] uppercase">LAPORAN MASUK ({(givenType || '').toUpperCase()}):</span>
            <div className="flex flex-wrap gap-1.5 text-xs font-extrabold text-[#D97706]">
              {pairs.map((p, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-xl bg-white border border-[#2D241E] text-[#2D241E]">
                  ({p.x}, {p.y})
                </span>
              ))}
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

          {/* Options with Distinct Selected State */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#78350F]">PILIH SUSUNAN HIMPUNAN PASANGAN BERURUTAN YANG IDENTIK:</h4>
            <div className="grid grid-cols-1 gap-3">
              {options.map((opt, idx) => {
                const isSelected = selectedFormatChoice === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(opt)}
                    className={`pencil-btn p-4 rounded-2xl text-left font-bold text-xs sm:text-sm transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FDE68A] text-[#2D241E] border-3 border-[#2D241E] ring-4 ring-[#F59E0B] shadow-[4px_5px_0px_#2D241E] font-extrabold scale-[1.02]'
                        : 'bg-white border-2 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7] shadow-[2px_2px_0px_#2D241E]'
                    }`}
                  >
                    <span>{`R = { ${opt} }`}</span>
                    {isSelected && (
                      <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B] text-[#2D241E] font-extrabold text-xs border border-[#2D241E] flex items-center space-x-1 shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                        <span>TERPILIH</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="pencil-btn w-full py-3.5 bg-[#F59E0B] text-[#2D241E] font-extrabold text-sm shadow-[3px_4px_0px_#2D241E]"
          >
            KONFIRMASI FORMAT LAPORAN RELASI
          </button>

        </div>
      </PBLSyntaxPanel>

    </div>
  );
}
