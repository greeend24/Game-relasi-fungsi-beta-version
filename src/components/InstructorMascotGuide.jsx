import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DetektifRelo from './DetektifRelo';

/**
 * InstructorMascotGuide
 * Mascot positioned at the bottom-left corner with comic speech bubble.
 * Features:
 * - Well-proportioned mascot size (never covers content)
 * - Speech bubble tightly anchored to the mascot at bottom-left
 * - Auto-dismiss timer after 7s to prevent covering other areas
 * - Manual close button (X) on the speech bubble
 * - Supports Snowy (Quest Mode), Ryu (Endless Mode), and Relo (Chapter Mode)
 */
export default function InstructorMascotGuide({
  character = 'relo',
  pose = 'default',
  emotion = 'happy',
  message = '',
  title = null,
  icon = null,
  canSpeak = true,
  onFlight = null,
  layout = 'floating', // 'floating' (selectors/menus) or 'dock' (split column in-game)
  size = null,
  className = '',
  isSpeaking = false,
  disableAutoDismiss = false,
}) {
  const [isFlightActive, setIsFlightActive] = useState(false);
  const [flightMsg, setFlightMsg] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);

  // Adaptive auto-dismiss bubble chat (12 to 22 seconds based on text length)
  useEffect(() => {
    setIsDismissed(false);
    if (message && !disableAutoDismiss) {
      const dismissDuration = Math.max(12000, Math.min(22000, (String(message).length || 0) * 100));
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, dismissDuration);
      return () => clearTimeout(timer);
    }
  }, [message, isFlightActive, disableAutoDismiss]);

  const defaultTitle = 
    character === 'snowy' 
      ? 'INSTRUKTUR SNOWY' 
      : character === 'ryu' 
      ? 'INSTRUKTUR RYU' 
      : 'INSTRUKTUR DETEKTIF RELO';

  const defaultIcon = 
    character === 'snowy' 
      ? '❄️' 
      : character === 'ryu' 
      ? '🔥' 
      : '🕵️‍♂️';

  const activeText = isFlightActive ? flightMsg : message;

  const handleFlight = (msg) => {
    if (!canSpeak) return;
    const flightMessage = msg || (
      character === 'snowy'
        ? 'Woooosh, Snowy meluncur ke puncak gunung es!!!! ❄️🚀✨'
        : character === 'ryu'
        ? 'Woooosh, Ryu meluncur membara cepat!!!! 🔥🚀✨'
        : 'Woooosh, Detektif Relo meluncur!!!! 🚀🦉✨'
    );
    setFlightMsg(flightMessage);
    setIsFlightActive(true);
    if (typeof onFlight === 'function') onFlight(flightMessage);
    setTimeout(() => {
      setIsFlightActive(false);
    }, 4500);
  };

  const isRyuOrSnowy = character === 'snowy' || character === 'ryu';

  if (layout === 'dock') {
    return (
      <div className={`w-[clamp(95px,min(11vw,20vh),155px)] flex-shrink-0 h-full flex flex-col justify-between relative z-20 select-none pointer-events-auto min-h-0 ${className}`}>
        {/* 1. COMIC SPEECH BUBBLE (TOP/MIDDLE OF LEFT COLUMN, RIGHT ABOVE HEAD) */}
        <div className="flex-1 min-h-0 flex flex-col justify-end pb-1.5 sm:pb-2">
          {Boolean(activeText) && !isDismissed && (
            <div className="relative p-2 sm:p-2.5 rounded-xl glass-bubble border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.14)] text-[#2D241E] font-hand animate-fade-in flex flex-col max-h-full">
              {/* Header Label + Close Button */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-black text-[#9A3412] uppercase tracking-wider mb-1 border-b border-amber-300/40 pb-0.5 flex-shrink-0">
                <span className="flex items-center space-x-1">
                  <span className="text-xs sm:text-sm">{icon || defaultIcon}</span>
                  <span className="break-words">{title || defaultTitle}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsDismissed(true)}
                  className="p-0.5 rounded-full hover:bg-amber-200/50 text-[#9A3412] transition-colors flex-shrink-0 ml-1 cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speech Text Content */}
              <div className="overflow-y-auto min-h-0 pr-0.5 drag-scroller">
                <p className="text-xs sm:text-[13px] font-bold leading-snug text-[#2D241E]">
                  {activeText}
                </p>
              </div>

              {/* Connected SVG Tail pointing downward to mascot head */}
              <svg 
                className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[16px] h-[11px] pointer-events-none overflow-visible z-10"
                viewBox="0 0 24 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0C6 10 12 18 16 20C18 14 20 6 24 0H0Z" fill="rgba(255, 255, 255, 0.72)" />
                <path d="M0 0C6 10 12 18 16 20C18 14 20 6 24 0" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>

        {/* 2. STANDING MASCOT (BOTTOM OF LEFT COLUMN) - 50% compact dock height */}
        <div 
          onClick={() => {
            if (canSpeak) setIsDismissed(prev => !prev);
          }}
          className={`relative flex justify-center items-end flex-shrink-0 pointer-events-auto overflow-visible pb-1 ${canSpeak ? 'cursor-pointer' : ''}`} 
          title={canSpeak ? "Klik maskot untuk petunjuk atau suara!" : undefined}
        >
          <DetektifRelo
            character={character}
            pose={pose}
            emotion={emotion}
            size={size || 'instructorDock'}
            isInstructor={true}
            canSpeak={canSpeak}
            isSpeaking={isSpeaking}
            disableBodyAnimation={false}
            onInstructorFlight={canSpeak ? handleFlight : null}
            message=""
          />
        </div>
      </div>
    );
  }

  // Floating Corner Layout (Grounded at bottom-left floor of game stage)
  return (
    <div className={`absolute bottom-0 left-0 sm:left-2 z-[60] flex items-end select-none pointer-events-none max-w-full ${className}`}>
      {/* 1. FRONT STANDING MASCOT - Grounded at bottom-left floor without clipping feet */}
      <div className={`relative pointer-events-auto flex-shrink-0 flex items-end z-10 ${canSpeak ? 'cursor-pointer' : ''}`} title={canSpeak ? "Klik maskot untuk mendengar suara!" : undefined}>
        <DetektifRelo
          character={character}
          pose={pose}
          emotion={emotion}
          size={size || 'instructor'}
          isInstructor={true}
          canSpeak={canSpeak}
          isSpeaking={isSpeaking}
          disableBodyAnimation={false}
          onInstructorFlight={canSpeak ? handleFlight : null}
          message=""
        />
      </div>

      {/* 2. COMIC SPEECH BUBBLE - Grounded comfortably next to mascot without covering cards above */}
      {Boolean(activeText) && !isDismissed && (
        <div className="pointer-events-auto z-20 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] max-w-[calc(100cqw-240px)] mb-2 sm:mb-3 md:mb-4 -ml-1 sm:-ml-2 animate-fade-in flex-shrink-0">
          <div className="relative p-3 sm:p-3.5 md:p-4 rounded-2xl sm:rounded-3xl glass-bubble border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.14)] text-[#2D241E] font-hand">
            {/* SVG Tail: Points to the left towards the mascot's cheek/mouth */}
            <svg 
              className="absolute bottom-4 -left-[14px] w-[18px] h-[20px] pointer-events-none overflow-visible z-10"
              viewBox="0 0 20 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 0C14 4 4 9 0 12C4 15 14 20 20 24V0Z" fill="rgba(255, 255, 255, 0.72)" />
              <path d="M20 0C14 4 4 9 0 12C4 15 14 20 20 24" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Header Label + Close Button */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#9A3412] uppercase tracking-wider mb-1.5 border-b-2 border-amber-300/40 pb-1">
              <span className="flex items-center space-x-1.5">
                <span className="text-base sm:text-lg">{icon || defaultIcon}</span>
                <span className="break-words">{title || defaultTitle}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="pointer-events-auto p-1 rounded-full hover:bg-amber-200/50 text-[#9A3412] transition-colors flex-shrink-0 cursor-pointer ml-1"
                title="Tutup Petunjuk"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Speech Text Content */}
            <p className="text-xs sm:text-sm md:text-base font-bold leading-relaxed text-[#2D241E] max-h-32 sm:max-h-36 overflow-y-auto pr-1 drag-scroller">
              {activeText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
