import React, { useState, useEffect, useRef } from 'react';
import { reloVoiceService } from '../services/reloVoiceService';
import { storageService } from '../services/storageService';

/**
 * ProfessorOwlMascot ("Detektif Relo - Native 2D Wise Detective Owl Mascot")
 * 100% Native Vector SVG Mascot featuring:
 * - Sherlock Holmes Detective Hat & Outfit
 * - Monocle Glass over Right Eye
 * - Mouth Movement Sync with Relo Voice Audio
 * - Eye Pupil Tracking & Natural Blinking
 */
export default function ProfessorOwlMascot({ 
  message = '', 
  pose = 'default', 
  emotion = 'happy', 
  size = 'md', 
  isFlapping = false,
  isSpeaking = false,
  isStageContext = false,
  entranceType = null,
  triggerKey = null,
  className = '' 
}) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [flappingState, setFlappingState] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const [isFlyingIn, setIsFlyingIn] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [isZoomingLoop, setIsZoomingLoop] = useState(false);
  const [activeEntranceIndex, setActiveEntranceIndex] = useState(0);
  const [audioSpeaking, setAudioSpeaking] = useState(false);
  const mascotRef = useRef(null);

  // Subscribe to Relo Voice Audio speaking state for mouth movement sync
  useEffect(() => {
    const unsubscribe = reloVoiceService.subscribe((speaking) => {
      setAudioSpeaking(speaking);
    });
    return unsubscribe;
  }, []);

  const entranceClasses = [
    'animate-owl-fly-perch',
    'animate-owl-drop-smash',
    'animate-owl-dash-drift',
    'animate-owl-pop-elastic',
    'animate-owl-float-parachute'
  ];

  const entranceTypeMap = {
    spiral: 'animate-owl-fly-perch',
    drop: 'animate-owl-drop-smash',
    dash: 'animate-owl-dash-drift',
    pop: 'animate-owl-pop-elastic',
    float: 'animate-owl-float-parachute'
  };

  // Trigger Fly-In Entrance animation ONLY on screen/stage/question transitions (prevents wild loops)
  useEffect(() => {
    setIsFlyingIn(true);
    setFlappingState(true);
    setActiveEntranceIndex(prev => (prev + 1) % entranceClasses.length);
    const timer = setTimeout(() => {
      setIsFlyingIn(false);
      setFlappingState(false);
    }, 1680);
    return () => clearTimeout(timer);
  }, [triggerKey !== null ? triggerKey : pose]);

  const sizeMap = {
    sm: 'w-24 h-28 sm:w-28 sm:h-32',
    md: 'w-32 h-36 sm:w-36 sm:h-40',
    lg: 'w-40 h-44 sm:w-48 sm:h-52'
  };

  // Trigger Fast Launch, Rapid Wing Flap & Slow Floating Body Descent
  const triggerMascotAction = () => {
    setFlappingState(true);
    setIsHopping(true);
    setTimeout(() => setFlappingState(false), 1500);
    setTimeout(() => setIsHopping(false), 1500);
  };

  // 7-Click Mascot Easter Egg: Zoom fast to right & swoop in from left
  const handleMascotClick = (e) => {
    e?.stopPropagation();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 7) {
      setClickCount(0);
      setIsZoomingLoop(true);
      setFlappingState(true);
      try {
        audioEngine.playSnap();
        reloVoiceService.playScene('relo_terbang', false, true);
      } catch {}
      setTimeout(() => {
        setIsZoomingLoop(false);
        setFlappingState(false);
      }, 1800);
    } else {
      triggerMascotAction();
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (target && (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'INPUT')) {
        triggerMascotAction();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('touchstart', handleGlobalClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('touchstart', handleGlobalClick);
    };
  }, []);

  // Cursor & touch eye-pupil tracking
  useEffect(() => {
    const handleMove = (e) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height * 0.35;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - mascotCenterX;
      const dy = clientY - mascotCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(4.5, Math.hypot(dx, dy) / 25);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Natural Eye Blinking Interval (every 3.5s)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (isFlapping) {
      triggerMascotAction();
    }
  }, [isFlapping]);

  const activeMessage = isZoomingLoop ? "Wuuussshh! 🚀 Detektif Relo terbang meluncur cepat!!" : message;
  const isSpeakingState = isSpeaking || audioSpeaking;
  const isMuted = !reloVoiceService.isReloOn || reloVoiceService.reloVol <= 0;
  const displayMessage = (isMuted && !isStageContext) ? '..............' : activeMessage;

  const currentEntranceClass = entranceType 
    ? (entranceTypeMap[entranceType] || 'animate-owl-fly-perch')
    : entranceClasses[activeEntranceIndex];

  return (
    <div ref={mascotRef} onClick={handleMascotClick} className={`relative flex items-center space-x-3 select-none cursor-pointer ${className}`}>
      
      {/* Native SVG Wise Toga Owl Mascot Container */}
      <div className={`relative flex-shrink-0 ${sizeMap[size] || sizeMap.md} ${isZoomingLoop ? 'animate-owl-zoom-loop' : isFlyingIn ? currentEntranceClass : 'animate-owl-breath'} transition-transform duration-300 hover:scale-105 ${isHopping && !isZoomingLoop ? 'animate-owl-jump' : ''}`}>
        
        {/* Floating Idea Bulb for Thinking Pose */}
        {pose === 'thinking' && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-yellow-400 animate-pulse text-xl z-20 drop-shadow-md">
            💡
          </div>
        )}

        {/* Floating Sparkles for Hero / Celebrating Pose */}
        {(pose === 'hero' || pose === 'celebrating') && (
          <div className="absolute -top-4 -right-2 text-amber-300 animate-spin-slow text-xl z-20 drop-shadow-md">
            ✨
          </div>
        )}

        {/* 100% NATIVE VECTOR SVG MASCOT ARTWORK */}
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full filter drop-shadow-[2px_4px_8px_rgba(45,36,30,0.35)]"
          style={{ transform: `rotate(${pupilOffset.x * 0.7}deg)` }}
        >
          <defs>
            {/* Rich Amber-Brown Iris Gradient */}
            <radialGradient id="owlNativeIris" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="35%" stopColor="#B45309" />
              <stop offset="75%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#2D1807" />
            </radialGradient>

            {/* Soft Cream Feather Body Gradient */}
            <linearGradient id="owlBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="60%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="owlBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>

          {/* 1. Owl Claws / Talons (Bottom Standing Feet) */}
          <path d="M 45 125 L 38 135 M 45 125 L 45 137 M 45 125 L 52 135" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M 95 125 L 88 135 M 95 125 L 95 137 M 95 125 L 102 135" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />

          {/* 2. Main Owl Body (Warm Brown Feather Oval) */}
          <ellipse cx="70" cy="85" rx="42" ry="45" fill="url(#owlBodyGrad)" stroke="#2D241E" strokeWidth="3.5" />

          {/* 3. Soft Cream Belly Feathers & Detective Vest Outfit */}
          <ellipse cx="70" cy="92" rx="28" ry="30" fill="url(#owlBellyGrad)" stroke="#2D241E" strokeWidth="2.5" />
          
          {/* Detective Trench Coat Lapels & Collar (Pakaian Detektif) */}
          <g>
            {/* Inner Detective White Collar Shirt */}
            <polygon points="56,76 70,88 84,76 70,105" fill="#FFFDF9" stroke="#2D241E" strokeWidth="2" />
            {/* Red Detective Tie */}
            <polygon points="66,80 74,80 76,96 70,102 64,96" fill="#DC2626" stroke="#791E1E" strokeWidth="1.5" />
            {/* Outer Brown Trench Coat Lapels */}
            <path d="M 42 78 Q 58 84 56 112 Q 40 108 42 78 Z" fill="#78350F" stroke="#2D241E" strokeWidth="2.5" />
            <path d="M 98 78 Q 82 84 84 112 Q 100 108 98 78 Z" fill="#78350F" stroke="#2D241E" strokeWidth="2.5" />
            {/* Brass Coat Buttons */}
            <circle cx="58" cy="100" r="2.5" fill="#F59E0B" stroke="#2D241E" strokeWidth="1" />
            <circle cx="82" cy="100" r="2.5" fill="#F59E0B" stroke="#2D241E" strokeWidth="1" />
            <circle cx="60" cy="108" r="2.5" fill="#F59E0B" stroke="#2D241E" strokeWidth="1" />
            <circle cx="80" cy="108" r="2.5" fill="#F59E0B" stroke="#2D241E" strokeWidth="1" />
          </g>

          {/* 4. Left Flapping Wing (Ngepakin Sayap Kiri) */}
          <g className={`origin-[35px_80px] transition-transform duration-200 ${flappingState ? 'animate-wing-flap-left' : ''}`}>
            <path d="M 32 72 Q 8 82 18 108 Q 35 112 40 94 Z" fill="#92400E" stroke="#2D241E" strokeWidth="3" />
          </g>

          {/* 5. Right Flapping Wing (Ngepakin Sayap Kanan) */}
          <g className={`origin-[105px_80px] transition-transform duration-200 ${flappingState ? 'animate-wing-flap-right' : ''}`}>
            <path d="M 108 72 Q 132 82 122 108 Q 105 112 100 94 Z" fill="#92400E" stroke="#2D241E" strokeWidth="3" />
          </g>

          {/* 6. Eye Socket Backgrounds (100% Native Seamless Integration) */}
          <circle cx="48" cy="58" r="18" fill="#FFFDF9" stroke="#2D241E" strokeWidth="3" />
          <circle cx="92" cy="58" r="18" fill="#FFFDF9" stroke="#2D241E" strokeWidth="3" />

          {/* 7. Native Cursor-Tracking Irises & Pupils (MATANYA BERGERAK 100% SEAMLESS) */}
          {!isBlinking ? (
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              {/* Left Eye Iris, Dark Inner Pupil & Double Glossy Highlights */}
              <circle cx="48" cy="58" r="11" fill="url(#owlNativeIris)" />
              <circle cx="48" cy="58" r="5.5" fill="#180C06" />
              <circle cx="45.2" cy="55.2" r="3.0" fill="#FFFFFF" />
              <circle cx="50.2" cy="60.2" r="1.3" fill="#FFFFFF" opacity="0.85" />

              {/* Right Eye Iris, Dark Inner Pupil & Double Glossy Highlights */}
              <circle cx="92" cy="58" r="11" fill="url(#owlNativeIris)" />
              <circle cx="92" cy="58" r="5.5" fill="#180C06" />
              <circle cx="89.2" cy="55.2" r="3.0" fill="#FFFFFF" />
              <circle cx="94.2" cy="60.2" r="1.3" fill="#FFFFFF" opacity="0.85" />
            </g>
          ) : (
            /* Eyelid Blink Cover */
            <g>
              <path d="M 30 58 Q 48 76 66 58 Z" fill="#78350F" stroke="#2D241E" strokeWidth="2.5" />
              <path d="M 74 58 Q 92 76 110 58 Z" fill="#78350F" stroke="#2D241E" strokeWidth="2.5" />
            </g>
          )}

          {/* 8. Sharp Beak & Dynamic Mouth Flap Sync */}
          <g>
            {/* Upper Beak */}
            <path d="M 70 64 L 63 74 L 77 74 Z" fill="#F59E0B" stroke="#2D241E" strokeWidth="2.5" strokeLinejoin="round" />

            {isSpeakingState ? (
              /* Animated Lower Beak & Mouth Cavity when Speaking */
              <g className="animate-owl-mouth-talk">
                <path d="M 64 74 Q 70 86 76 74 Z" fill="#791E1E" stroke="#2D241E" strokeWidth="2" />
                <path d="M 66 79 Q 70 85 74 79 Z" fill="#F472B6" />
                <path d="M 64 74 L 70 84 L 76 74 Z" fill="#D97706" stroke="#2D241E" strokeWidth="2" strokeLinejoin="round" />
              </g>
            ) : (
              /* Closed Lower Beak */
              <path d="M 63 74 L 70 79 L 77 74 Z" fill="#D97706" stroke="#2D241E" strokeWidth="2" strokeLinejoin="round" />
            )}
          </g>

          {/* 9. Cute Pink Cheek Blush */}
          <ellipse cx="34" cy="70" rx="6" ry="4" fill="#F472B6" opacity="0.6" />
          <ellipse cx="106" cy="70" rx="6" ry="4" fill="#F472B6" opacity="0.6" />

          {/* 10. Monocle Glass Ring over Right Eye */}
          <g>
            <circle cx="92" cy="58" r="19" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
            {/* Monocle Hanging Cord */}
            <path d="M 111 58 Q 116 80 92 94" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="3 3" />
            {/* Lens Reflection Sheen */}
            <path d="M 82 48 L 102 68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="animate-monocle-shimmer" />
          </g>

          {/* 11. Topi Detektif Sherlock Holmes (Classic Brown Deerstalker Detective Hat) */}
          <g>
            {/* Back Flap / Visor */}
            <path d="M 30 38 Q 70 24 110 38 Q 70 42 30 38 Z" fill="#78350F" stroke="#2D241E" strokeWidth="2" />
            {/* Detective Hat Crown Dome */}
            <path d="M 38 36 C 38 12, 102 12, 102 36 Z" fill="#92400E" stroke="#2D241E" strokeWidth="3" />
            {/* Checkered Hat Pattern Accents */}
            <path d="M 52 18 L 88 18 M 44 26 L 96 26" stroke="#78350F" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Front Curved Brim */}
            <path d="M 22 38 Q 70 26 118 38 Q 70 46 22 38 Z" fill="#B45309" stroke="#2D241E" strokeWidth="3" />
            {/* Detective Hat Band & Ribbon Tie */}
            <path d="M 36 34 Q 70 30 104 34 L 104 38 Q 70 34 36 38 Z" fill="#991B1B" stroke="#2D241E" strokeWidth="1.5" />
            {/* Side Earflap Bow Tie */}
            <circle cx="70" cy="18" r="3" fill="#F59E0B" stroke="#2D241E" strokeWidth="1" />
            <path d="M 66 18 Q 50 28 64 30 M 74 18 Q 90 28 76 30" fill="none" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
          </g>

        </svg>
      </div>

      {/* Authentic Comic Speech Bubble Dialog (Mengarah langsung dari Detektif Relo) */}
      {activeMessage && (
        <div className="relative p-3.5 sm:p-4 rounded-3xl bg-[#FFFDF9] border-[3px] border-[#2D241E] shadow-[4px_5px_0px_#2D241E] font-hand text-xs text-[#2D241E] max-w-xs sm:max-w-md animate-fade-in z-20 transition-all duration-300">
          
          {/* Authentic Comic Tail / Bubble Arrow pointing to the left directly towards Detective Relo */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[16px] border-r-[#2D241E] border-b-[10px] border-b-transparent filter drop-shadow-sm" />
          <div className="absolute top-1/2 -left-[13px] -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[13px] border-r-[#FFFDF9] border-b-[8px] border-b-transparent" />

          {/* Header Label: PETUNJUK DETEKTIF RELO */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-black text-[#9A3412] uppercase tracking-wider mb-1 border-b-2 border-[#FED7AA] pb-1">
            <span className="flex items-center space-x-1">
              <span className="text-xs">🕵️‍♂️</span>
              <span>PETUNJUK DETEKTIF RELO</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
          </div>

          {/* Speech Text Content */}
          <p className="font-bold leading-relaxed text-[#2D241E] text-xs sm:text-sm">{displayMessage}</p>
        </div>
      )}

    </div>
  );
}
