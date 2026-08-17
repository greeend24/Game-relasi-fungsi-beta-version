import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Lightbulb, Star, ShieldCheck, CheckCircle2, RotateCcw, BookOpen, Info, HelpCircle } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';
import { SUBBAB_SYMBOL_EXPLANATIONS } from '../data/casesData';

export default function StageHeader({ 
  subbabId = 1,
  subbabTitle, 
  stageNum, 
  onBackToStages, 
  onShowHint, 
  onOpenSubbabInfo,
  hintText, 
  isHintVisible,
  stageCleared,
  scoreEarned,
  starsEarned,
  onNextStage,
  onRetryStage,
  explanationText = 'Penalaran relasi & fungsi matematika pada stage ini sangat akurat! Setiap konsep telah terpenuhi sesuai kaidah matematika.'
}) {
  const [hasAcknowledgedExplanation, setHasAcknowledgedExplanation] = useState(false);

  React.useEffect(() => {
    if (stageCleared) {
      try {
        audioEngine.playStamp();
      } catch {}
    }
  }, [stageCleared]);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-2 font-hand relative z-10">
      
      {/* COMPACT TOP CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-white border-2.5 border-[#2D241E] shadow-[3px_3px_0px_#2D241E] text-xs gap-1.5">
        <button
          onClick={() => {
            audioEngine.playClick();
            if (!stageCleared) {
              reloVoiceService.playScene('9');
            }
            onBackToStages();
          }}
          className="pencil-btn flex items-center space-x-1 px-2.5 py-1 bg-[#FFFDF9] text-[#2D241E] font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Daftar Stage</span>
        </button>

        {/* Subbab & Stage Indicator */}
        <div className="flex items-center space-x-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-xl bg-[#FEF3C7] text-[#78350F] font-bold border-1.5 border-[#2D241E] flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SUBBAB {subbabId}: {subbabTitle}</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-[#DBEAFE] text-[#1E40AF] font-bold border-1.5 border-[#2D241E]">
            STAGE {stageNum} / 21
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {onOpenSubbabInfo && (
            <button
              onClick={() => { audioEngine.playClick(); onOpenSubbabInfo(); }}
              className="pencil-btn flex items-center space-x-1 px-2.5 py-1 bg-[#E0F2FE] text-[#0369A1] font-bold"
            >
              <Info className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Info</span>
            </button>
          )}

          {onShowHint && (
            <button
              onClick={() => { audioEngine.playClick(); onShowHint(); }}
              className="pencil-btn flex items-center space-x-1 px-2.5 py-1 bg-[#FEF3C7] text-[#B45309] font-bold"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Hint</span>
            </button>
          )}
        </div>
      </div>

      {/* Hint Alert (Only shown when student triggers hint / answers wrong) */}
      {isHintVisible && (
        <div className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E] text-[#78350F] text-xs font-semibold animate-fade-in space-y-1.5">
          {hintText && (
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
              <span>💡 PETUNJUK: {hintText}</span>
            </div>
          )}
          {SUBBAB_SYMBOL_EXPLANATIONS[subbabId] && (
            <div className="pt-1.5 border-t border-[#F59E0B]/40 text-[#1E3A8A] font-bold text-[11px] flex items-start space-x-1.5">
              <span className="flex-shrink-0">🕵️‍♂️</span>
              <span className="whitespace-pre-line">{SUBBAB_SYMBOL_EXPLANATIONS[subbabId]}</span>
            </div>
          )}
        </div>
      )}

      {stageCleared && createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-hand pointer-events-auto">
          
          {/* CONGRATULATORY CELEBRATION PARTICLES FLOATING IN FRONT AT Z-[9999999] */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999999]">
            {Array.from({ length: 35 }).map((_, i) => {
              const colors = ['#F59E0B', '#10B981', '#38BDF8', '#EC4899', '#8B5CF6', '#F97316', '#EAB308'];
              const color = colors[i % colors.length];
              const left = Math.floor((i * 100) / 35) + (i % 3) * 1.5;
              const delay = (i % 7) * 0.25;
              const duration = 2.2 + (i % 5) * 0.4;
              const size = 12 + (i % 4) * 4;

              return (
                <div
                  key={i}
                  className="absolute animate-confetti-fall"
                  style={{
                    left: `${left}%`,
                    top: `-25px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    animationIterationCount: 'infinite'
                  }}
                >
                  {i % 3 === 0 ? (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      <polygon points="12 0 15 8 24 9 17 15 19 24 12 19 5 24 7 15 0 9 9 8" />
                    </svg>
                  ) : i % 3 === 1 ? (
                    <div 
                      className="rounded-sm shadow-md"
                      style={{
                        width: `${size}px`,
                        height: `${size * 1.6}px`,
                        backgroundColor: color,
                        transform: `rotate(${i * 35}deg)`
                      }}
                    />
                  ) : (
                    <div 
                      className="rounded-full shadow-md"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full max-w-md p-6 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-center space-y-4 relative z-[1000000]">
            
            {/* OFFICIAL DETECTIVE CASE SOLVED RUBBER STAMP */}
            <div className="absolute -top-5 -right-4 z-[1000002] transform rotate-[-12deg] pointer-events-none animate-stamp-drop">
              <div className="border-4 border-dashed border-[#DC2626] text-[#DC2626] bg-[#FEF2F2]/95 font-black px-3.5 py-1.5 rounded-xl text-base sm:text-lg uppercase tracking-widest shadow-[0_4px_12px_rgba(220,38,38,0.3)]">
                ✔ TERBUKTI VALID
                <div className="text-[9px] font-bold text-[#991B1B] text-center tracking-normal">DETEKTIF DATA MATH</div>
              </div>
            </div>

            <div className="w-16 h-16 mx-auto rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E]">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-pencil text-[#059669] tracking-wide">
                JAWABANMU BENAR! 🎉
              </h2>
              <p className="text-xs font-semibold text-[#4A3E3D] mt-0.5">
                Stage {stageNum} berhasil dipecahkan sempurna!
              </p>
            </div>

            {/* Explanation & Positive Reinforcement (Deep Mathematical Concept Focus) */}
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#059669] text-left space-y-1.5 text-sm text-[#065F46] font-bold shadow-[2px_2px_0px_#2D241E]">
              <div className="flex items-center space-x-2 text-[#047857] font-extrabold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span>PENJELASAN KONSEP MATEMATIKA</span>
              </div>
              <p className="font-bold text-xs sm:text-sm leading-relaxed text-[#065F46]">
                {explanationText || 'Setiap elemen pada domain telah dipetakan secara akurat sesuai dengan definisi dan sifat formal matematika.'}
              </p>
            </div>

            {/* Stars & Points */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-6 h-6 ${
                      starIdx <= starsEarned
                        ? 'text-[#F59E0B] fill-[#F59E0B]'
                        : 'text-[#D1D5DB]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#D97706] font-extrabold text-base">+{scoreEarned} PTS</span>
            </div>

            {/* IMMEDIATELY VISIBLE NEXT STAGE ACTION BUTTONS (FRONT & TOP Z-INDEX) */}
            <div className="space-y-2.5 pt-1 text-sm relative z-[1000001]">
              <button
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  onNextStage();
                }}
                className="pencil-btn w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-base flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] hover:-translate-y-0.5 transition-all ring-2 ring-[#059669]"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{stageNum < 21 ? 'LANJUTKAN KE STAGE BERIKUTNYA →' : 'TANTANGAN KESIMPULAN STAGE 21! 🎉'}</span>
              </button>

              <button
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  onBackToStages();
                }}
                className="pencil-btn w-full py-3 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-sm flex items-center justify-center space-x-1.5 shadow-[2px_2px_0px_#2D241E] hover:bg-[#F3F4F6]"
              >
                <ArrowLeft className="w-4 h-4 text-[#2563EB]" />
                <span>Kembali ke Daftar Stage</span>
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
