import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Lightbulb, Star, ShieldCheck, CheckCircle2, BookOpen, Info, HelpCircle } from 'lucide-react';
import NetworkStatusBadge from './NetworkStatusBadge';
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
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 space-y-2 font-hand relative z-10">
      
      {/* COMPACT TOP CONTROLS BAR (SCALED FOR 16:9 VIEWPORT) */}
      <div className="flex flex-wrap items-center justify-between p-2 sm:p-2.5 rounded-2xl glass-header border border-white/60 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] gap-2">
        <button
          onClick={() => {
            audioEngine.playClick();
            if (!stageCleared) {
              reloVoiceService.playScene('9');
            }
            onBackToStages();
          }}
          className="pencil-btn flex items-center space-x-1.5 px-3 py-1.5 glass-btn text-[#2D241E] font-black text-base sm:text-lg lg:text-[20px] hover:scale-105 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#2563EB]" />
          <span>Daftar Stage</span>
        </button>

        {/* Subbab & Stage Indicator */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="px-3.5 py-1.5 rounded-xl bg-[#FEF3C7] text-[#78350F] font-black text-base sm:text-lg lg:text-[20px] border-2 border-[#2D241E] flex items-center space-x-1.5">
            <BookOpen className="w-5 h-5 text-[#D97706]" />
            <span>SUBBAB {subbabId}: {subbabTitle}</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-[#DBEAFE] text-[#1E40AF] font-black text-base sm:text-lg lg:text-[20px] border-2 border-[#2D241E]">
            STAGE {stageNum} / 21
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <NetworkStatusBadge compact={true} />
          {onOpenSubbabInfo && (
            <button
              onClick={() => { audioEngine.playClick(); onOpenSubbabInfo(); }}
              className="pencil-btn flex items-center space-x-1.5 px-3 py-1.5 bg-[#E0F2FE] text-[#0369A1] font-black text-base sm:text-lg lg:text-[20px] hover:scale-105 active:scale-95 transition-transform"
            >
              <Info className="w-5 h-5 text-[#0284C7]" />
              <span>Info</span>
            </button>
          )}

          {onShowHint && (
            <button
              onClick={() => { 
                audioEngine.playClick(); 
                try { reloVoiceService.playScene('case_hint'); } catch {}
                onShowHint(); 
              }}
              className="pencil-btn flex items-center space-x-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#B45309] font-black text-base sm:text-lg lg:text-[20px] hover:scale-105 active:scale-95 transition-transform"
            >
              <Lightbulb className="w-5 h-5 text-[#D97706]" />
              <span>Hint</span>
            </button>
          )}
        </div>
      </div>

      {/* Hint Alert (Only shown when student triggers hint / answers wrong) */}
      {isHintVisible && (
        <div className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E] text-[#78350F] text-base sm:text-lg lg:text-[20px] font-bold animate-fade-in space-y-2">
          {hintText && (
            <div className="flex items-start space-x-2.5">
              <Lightbulb className="w-6 h-6 text-[#D97706] flex-shrink-0 mt-0.5" />
              <span>💡 PETUNJUK: {hintText}</span>
            </div>
          )}
          {SUBBAB_SYMBOL_EXPLANATIONS[subbabId] && (
            <div className="pt-2 border-t border-[#F59E0B]/40 text-[#1E3A8A] font-extrabold text-base sm:text-lg lg:text-[20px] flex items-start space-x-2">
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
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="filter">
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

          <div 
            className="w-full max-w-3xl lg:max-w-4xl overflow-hidden p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-cover bg-center border-[3.5px] sm:border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] relative z-[1000000] select-none my-auto"
            style={{ backgroundImage: "url('/assets/tampilan di exit/Asset/board_exit@4x.png')" }}
          >
            {/* OFFICIAL DETECTIVE CASE SOLVED RUBBER STAMP */}
            <div className="absolute -top-2.5 -right-2 sm:-top-3 sm:-right-3 z-[1000002] transform rotate-[-8deg] pointer-events-none animate-stamp-drop">
              <div className="border-[3px] sm:border-4 border-dashed border-[#DC2626] text-[#DC2626] bg-[#FEF2F2]/95 font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl text-xs sm:text-base uppercase tracking-widest shadow-[0_4px_12px_rgba(220,38,38,0.3)] whitespace-nowrap select-none">
                ✔ TERBUKTI VALID
                <div className="text-[9px] sm:text-[10px] font-bold text-[#991B1B] text-center tracking-normal">DETEKTIF DATA MATH</div>
              </div>
            </div>

            {/* RESPONSIVE 2-COLUMN GRID IN LANDSCAPE (FITS 100% IN MOBILE LANDSCAPE 360-400px HEIGHT) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              
              {/* LEFT COLUMN: ICON, TITLE, STARS & SCORE, ACTION BUTTONS */}
              <div className="flex flex-col justify-between space-y-3 text-center sm:text-left">
                
                {/* Header with Icon & Title */}
                <div className="flex items-center space-x-3 justify-center sm:justify-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center border-2 border-[#2D241E] shadow-[2px_3px_0px_#2D241E] flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-pencil text-[#FEF3C7] tracking-wide leading-tight drop-shadow">
                      JAWABANMU BENAR! 🎉
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg font-extrabold text-[#FDE68A] mt-0.5">
                      Stage {stageNum} berhasil dipecahkan sempurna!
                    </p>
                  </div>
                </div>

                {/* Stars & Points Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          starIdx <= starsEarned
                            ? 'text-[#F59E0B] fill-[#F59E0B]'
                            : 'text-[#D1D5DB]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#D97706] font-black text-xl sm:text-2xl">+{scoreEarned} Poin</span>
                </div>

                {/* Next Stage & Back Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={() => {
                      try { audioEngine.playClick(); } catch {}
                      onNextStage();
                    }}
                    className="pencil-btn w-full py-3 sm:py-3.5 bg-[#10B981] hover:bg-[#059669] text-white font-black text-base sm:text-lg lg:text-xl flex items-center justify-center space-x-2 shadow-[3px_4px_0px_#2D241E] hover:scale-[1.02] active:scale-95 transition-all ring-2 ring-[#059669] cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span>{stageNum < 21 ? 'LANJUTKAN KE STAGE BERIKUTNYA →' : 'TANTANGAN KESIMPULAN STAGE 21! 🎉'}</span>
                  </button>

                  <button
                    onClick={() => {
                      try { audioEngine.playClick(); } catch {}
                      onBackToStages();
                    }}
                    className="pencil-btn w-full py-2.5 sm:py-3 bg-[#FFFDF9] text-[#2D241E] font-black text-sm sm:text-base lg:text-lg flex items-center justify-center space-x-2 shadow-[2px_2px_0px_#2D241E] hover:bg-[#F3F4F6] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                    <span>Kembali ke Daftar Stage</span>
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: MATHEMATICAL CONCEPT EXPLANATION */}
              <div className="flex flex-col justify-between">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#ECFDF5] border-2 border-[#059669] text-left space-y-2 shadow-[2px_2px_0px_#2D241E] h-full flex flex-col justify-start">
                  <div className="flex items-center space-x-2 text-[#047857] font-black text-base sm:text-lg uppercase tracking-wider flex-shrink-0">
                    <HelpCircle className="w-5 h-5 flex-shrink-0" />
                    <span>PENJELASAN KONSEP MATEMATIKA</span>
                  </div>
                  <div className="overflow-hidden pr-1">
                    <p className="font-bold text-sm sm:text-base md:text-lg leading-relaxed text-[#065F46]">
                      {explanationText || 'Setiap elemen pada domain telah dipetakan secara akurat sesuai dengan definisi dan sifat formal matematika.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
