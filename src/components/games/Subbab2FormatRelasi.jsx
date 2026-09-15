import React, { useState, useEffect } from 'react';
import StageHeader from '../StageHeader';
import InstructorMascotGuide from '../InstructorMascotGuide';
import PBLSyntaxPanel from '../PBLSyntaxPanel';
import { SUBBABS_DATA } from '../../data/casesData';
import { audioEngine } from '../../services/audioEngine';
import { Kanban, Check } from 'lucide-react';
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

      const pts = 120 + (stageNum - 1) * 5;
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
    <div className="h-full w-full flex flex-col justify-between p-2 sm:p-3 space-y-1.5 overflow-hidden font-hand min-h-0">
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

      {/* GAMEPLAY LAYOUT: LEFT MASCOT DOCK & RIGHT WORKSPACE */}
      <div className="flex-1 w-full min-h-0 flex items-stretch gap-3 lg:gap-4 relative overflow-hidden">
        <InstructorMascotGuide
          layout="dock"
          character="relo"
          pose={stageCleared ? 'celebrating' : (errorDetails ? 'thinking' : 'default')}
          emotion={stageCleared ? 'happy' : (errorDetails ? 'error' : 'idle')}
          title={errorDetails ? "PETUNJUK DETEKTIF RELO" : "DETEKTIF RELO"}
          icon="🕵️‍♂️"
          message={errorDetails ? errorDetails.hint : (isHintVisible ? (stageConfig.conceptDef || `Ubah bentuk ${givenType} menjadi bentuk ${targetType}. Nilai (x, y) harus sama.`) : (stageCleared ? 'Hebat! Format relasi yang kamu pilih tepat! 🎉' : ''))}
        />

        <PBLSyntaxPanel
          stageNum={stageNum}
          conceptDef={stageConfig.conceptDef}
          relationRule={`Format ${givenType} ➔ ${targetType}`}
          errorDetails={errorDetails}
        >
          <div className="flex-1 flex flex-col justify-between min-h-0 space-y-1 sm:space-y-2 font-hand">
            
            {/* Topic Illustration */}
            <div className="rounded-2xl overflow-hidden border-2.5 border-[#2D241E] relative group p-2.5 sm:p-3 bg-[#FEF3C7] flex-shrink-0 shadow-[2px_3px_0px_#2D241E]">
              <img src="/images/2.png" alt="Subbab 2 Anime" className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-35 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FEF3C7] via-[#FEF3C7]/90 to-transparent/30 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-end">
                <div className="flex items-center space-x-2 text-[#78350F] font-black text-base sm:text-lg lg:text-[20px]">
                  <Kanban className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <span className="break-words">FORMAT DIMINTA: {stageConfig?.targetType ? stageConfig.targetType.toUpperCase() : ''}</span>
                </div>
              </div>
            </div>

            {/* Given Pairs Box */}
            <div className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] space-y-1.5 shadow-[2px_2px_0px_#2D241E] flex-shrink-0">
              <span className="text-sm sm:text-base lg:text-[18px] font-black text-[#78350F] uppercase tracking-wide">LAPORAN MASUK ({(givenType || '').toUpperCase()}):</span>
              <div className="flex flex-wrap gap-2 text-base font-extrabold text-[#D97706]">
                {pairs.map((p, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl glass-panel-subtle text-[#2D241E] text-base sm:text-lg lg:text-[20px] font-bold shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                    ({p.x}, {p.y})
                  </span>
                ))}
              </div>
            </div>

            {/* Options with 2-Column Grid */}
            <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2 py-1">
              <h4 className="text-base sm:text-lg lg:text-[20px] font-black text-[#78350F]">PILIH PASANGAN BERURUTAN IDENTIK:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((opt, idx) => {
                  const isSelected = selectedFormatChoice === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectChoice(opt)}
                      className={`pencil-btn p-3 sm:p-3.5 rounded-2xl text-left font-bold transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FDE68A] text-[#2D241E] border-2.5 border-[#2D241E] ring-3 ring-[#F59E0B] shadow-[3px_3px_0px_#2D241E] font-extrabold scale-[1.01]'
                          : 'glass-option text-[#2D241E] shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                      }`}
                    >
                      <span className="break-words text-wrap font-pencil text-base sm:text-lg lg:text-[20px]">{`R = { ${opt} }`}</span>
                      {isSelected && (
                        <span className="px-2 py-1 rounded-md bg-[#F59E0B] text-[#2D241E] font-black text-xs sm:text-sm border border-[#2D241E] flex items-center space-x-1 flex-shrink-0 ml-2">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
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
