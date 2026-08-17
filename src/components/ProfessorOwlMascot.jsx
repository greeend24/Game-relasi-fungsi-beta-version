import React, { useState, useEffect, useRef } from 'react';
import { reloVoiceService } from '../services/reloVoiceService';
import { audioEngine } from '../services/audioEngine';
import { RELO_FRAMES, preloadReloFrames } from '../services/reloFrameService';

/**
 * ProfessorOwlMascot ("Detektif Relo")
 * Animated 2D Detective Owl Mascot using high-resolution frame-by-frame PNG animations
 * from relo/relo animation. Features:
 * - Lip sync mouth animation synchronized with audio speech
 * - Natural eye blinking
 * - Wing flapping animations (6-frame sequence)
 * - Dynamic pose switching (Standing, Point Right, Point Left, Thinking)
 * - Click to hop / Hold 3 seconds to launch upward (relo_terbang)
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
  animateOnHoverOnly = false,
  isHovered = false,
  disableBodyAnimation = false,
  isInstructor = false,
  className = '' 
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkIndex, setBlinkIndex] = useState(0);
  const [flappingState, setFlappingState] = useState(false);
  const [flapFrameIndex, setFlapFrameIndex] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const [isFlyingIn, setIsFlyingIn] = useState(!animateOnHoverOnly);
  const [isZoomingLoop, setIsZoomingLoop] = useState(false);
  const [activeEntranceIndex, setActiveEntranceIndex] = useState(0);
  const [audioSpeaking, setAudioSpeaking] = useState(false);
  const [currentVowel, setCurrentVowel] = useState('a');

  // Instruktur Relo States
  const [isInstructorHovered, setIsInstructorHovered] = useState(false);
  const [isInstructorFlying, setIsInstructorFlying] = useState(false);
  const [instructorWingPose, setInstructorWingPose] = useState('idle'); // 'idle' | 'rightHalf' | 'rightFull' | 'leftHalf' | 'leftFull'

  const mascotRef = useRef(null);
  const holdTimerRef = useRef(null);

  // Preload frame images on mount
  useEffect(() => {
    preloadReloFrames();
  }, []);

  // Subscribe to Relo Voice Audio speaking state for mouth movement sync
  useEffect(() => {
    const unsubscribe = reloVoiceService.subscribe((speaking) => {
      setAudioSpeaking(speaking);
    });
    return unsubscribe;
  }, []);

  // Instruktur Relo Flight Launch Trigger (on Touch / Click)
  const triggerInstructorFlight = () => {
    if (isInstructorFlying) return;
    setIsInstructorFlying(true);
    setFlappingState(true);
    try {
      audioEngine.playWoosh();
    } catch {}

    setTimeout(() => {
      setIsInstructorFlying(false);
      setFlappingState(false);
    }, 750);
  };

  // Instruktur Relo: Occasional Wing Gestures (Right 1/2 & 2/2, Left 1/2 & 2/2)
  useEffect(() => {
    if (!isInstructor || isInstructorFlying) return;

    const interval = setInterval(() => {
      const isRight = Math.random() > 0.5;
      if (isRight) {
        setInstructorWingPose('rightHalf');
        setTimeout(() => setInstructorWingPose('rightFull'), 300);
        setTimeout(() => setInstructorWingPose('rightHalf'), 1100);
        setTimeout(() => setInstructorWingPose('idle'), 1400);
      } else {
        setInstructorWingPose('leftHalf');
        setTimeout(() => setInstructorWingPose('leftFull'), 300);
        setTimeout(() => setInstructorWingPose('leftHalf'), 1100);
        setTimeout(() => setInstructorWingPose('idle'), 1400);
      }
    }, 7000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [isInstructor, isInstructorFlying]);

  // Instruktur Relo: Periodic Automatic Takeoff / Flight
  useEffect(() => {
    if (!isInstructor) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.75) {
        triggerInstructorFlight();
      }
    }, 20000 + Math.random() * 8000);

    return () => clearInterval(interval);
  }, [isInstructor]);

  // Instruktur Relo: Eye Blinking Routine (both eyes, right wink, left wink)
  useEffect(() => {
    if (!isInstructor || isInstructorFlying) return;

    const interval = setInterval(() => {
      const choice = Math.floor(Math.random() * 3);
      setBlinkIndex(choice);
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 280);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isInstructor, isInstructorFlying]);

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

  // Trigger Fly-In Entrance animation & woosh sound on screen/stage/question transitions
  useEffect(() => {
    if (animateOnHoverOnly || disableBodyAnimation) {
      setIsFlyingIn(false);
      return;
    }

    setIsFlyingIn(true);
    setFlappingState(true);
    try { audioEngine.playWoosh(); } catch {}
    
    const randIndex = Math.floor(Math.random() * entranceClasses.length);
    setActiveEntranceIndex(randIndex);

    const timer = setTimeout(() => {
      setIsFlyingIn(false);
      setFlappingState(false);
    }, 1680);
    return () => clearTimeout(timer);
  }, [triggerKey !== null ? triggerKey : pose, animateOnHoverOnly]);

  const sizeMap = {
    sm: 'w-24 h-28 sm:w-28 sm:h-32',
    md: 'w-32 h-36 sm:w-38 sm:h-44',
    lg: 'w-40 h-44 sm:w-48 sm:h-52',
    xl: 'w-48 h-52 sm:w-56 sm:h-60',
    xxl: 'w-60 h-68 sm:w-72 sm:h-80',
    xxxl: 'w-[312px] h-[354px] sm:w-[374px] sm:h-[416px]',
    xxxxl: 'w-[624px] h-[708px] sm:w-[748px] sm:h-[832px]',
    modeBox: 'w-32 h-36 sm:w-40 sm:h-44'
  };

  // Trigger Fast Launch, Rapid Wing Flap & Woosh Sound Effect
  const triggerMascotAction = () => {
    if (disableBodyAnimation) return;
    setFlappingState(true);
    setIsHopping(true);
    try { audioEngine.playWoosh(); } catch {}
    setTimeout(() => setFlappingState(false), 1200);
    setTimeout(() => setIsHopping(false), 1200);
  };

  // Launch Upward into the Sky after 3-Second Hold
  const triggerHoldLaunchUpward = () => {
    if (disableBodyAnimation) return;
    setIsZoomingLoop(true);
    setFlappingState(true);
    try {
      audioEngine.playSnap();
      audioEngine.playWoosh();
      reloVoiceService.playScene('relo_terbang', false, true);
    } catch {}
    setTimeout(() => {
      setIsZoomingLoop(false);
      setFlappingState(false);
    }, 2000);
  };

  // Mouse & Touch Press Handlers
  const handlePressStart = (e) => {
    e?.stopPropagation();
    if (animateOnHoverOnly || disableBodyAnimation) return;
    triggerMascotAction();

    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      triggerHoldLaunchUpward();
    }, 3000);
  };

  const handlePressEnd = (e) => {
    e?.stopPropagation();
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  // Mascot interaction via direct clicks on mascot container only

  const prevSpeakingRef = useRef(false);

  // Blink IF AND ONLY IF Relo just finished speaking audio
  useEffect(() => {
    if (prevSpeakingRef.current && !audioSpeaking) {
      // Trigger eye blink sequence immediately after finishing speech
      const choice = Math.floor(Math.random() * 3);
      setBlinkIndex(choice);
      setIsBlinking(true);

      setTimeout(() => {
        setIsBlinking(false);
      }, 300);
    }
    prevSpeakingRef.current = audioSpeaking;
  }, [audioSpeaking]);

  // Expressive Eye Blinking Routine
  useEffect(() => {
    if (disableBodyAnimation) {
      setIsBlinking(false);
      return; // Do NOT run automatic loop when disableBodyAnimation is true
    }

    if (animateOnHoverOnly && !isHovered) {
      setIsBlinking(false);
      return;
    }

    // Faster blink interval for Chapter Mode (default) & Quest Mode (thinking)
    const isModeSpecial = pose === 'default' || pose === 'thinking';
    const minDelay = animateOnHoverOnly ? 800 : (isModeSpecial ? 1200 : 1800);
    const randomDelay = animateOnHoverOnly ? 700 : (isModeSpecial ? 1000 : 1500);

    const triggerBlinkSequence = () => {
      const choice = Math.floor(Math.random() * 3);
      setBlinkIndex(choice);
      setIsBlinking(true);

      const blinkDuration = 260;

      setTimeout(() => {
        setIsBlinking(false);

        if (Math.random() < 0.4) {
          setTimeout(() => {
            const doubleChoice = Math.floor(Math.random() * 3);
            setBlinkIndex(doubleChoice);
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 240);
          }, 90);
        }
      }, blinkDuration);
    };

    if (animateOnHoverOnly && isHovered) {
      triggerBlinkSequence();
    }

    const intervalTime = minDelay + Math.random() * randomDelay;
    const blinkInterval = setInterval(triggerBlinkSequence, intervalTime);

    return () => clearInterval(blinkInterval);
  }, [animateOnHoverOnly, isHovered, pose, disableBodyAnimation]);

  useEffect(() => {
    if (isFlapping && !animateOnHoverOnly) {
      triggerMascotAction();
    }
  }, [isFlapping, animateOnHoverOnly]);

  const [pointFrameIndex, setPointFrameIndex] = useState(0);

  // Smooth Ping-Pong Wing Flapping Animation Loop Timer (1/5 -> 5/5 -> 1/5)
  const isFlappingActive = animateOnHoverOnly 
    ? (isHovered && (pose === 'flying' || isFlapping || flappingState))
    : (flappingState || isFlyingIn || isZoomingLoop || isFlapping || pose === 'flying');

  useEffect(() => {
    if (!isFlappingActive) {
      setFlapFrameIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setFlapFrameIndex((prev) => (prev + 1) % (RELO_FRAMES.flapping?.length || 10));
    }, 75);

    return () => clearInterval(interval);
  }, [isFlappingActive]);

  // Pointing Wing Animation Loop Timer (Right wing 1/2 -> 2/2 -> Left wing 1/2 -> 2/2)
  const isPointingActive = animateOnHoverOnly
    ? (isHovered && (pose === 'pointing' || pose === 'chapter'))
    : (pose === 'pointing' || pose === 'chapter');

  useEffect(() => {
    if (!isPointingActive) {
      setPointFrameIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setPointFrameIndex((prev) => (prev + 1) % (RELO_FRAMES.pointingSequence?.length || 4));
    }, 320);

    return () => clearInterval(interval);
  }, [isPointingActive]);

  // Speaking Lip Sync Vowel Cycle Timer
  const isSpeakingState = animateOnHoverOnly 
    ? (isHovered && (isSpeaking || audioSpeaking))
    : (isSpeaking || audioSpeaking);

  useEffect(() => {
    if (!isSpeakingState) return;

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const interval = setInterval(() => {
      const nextVowel = vowels[Math.floor(Math.random() * vowels.length)];
      setCurrentVowel(nextVowel);
    }, 110);

    return () => clearInterval(interval);
  }, [isSpeakingState]);

  // Determine current active PNG frame path
  const getActiveFramePath = () => {
    // Instruktur Relo Mode
    if (isInstructor) {
      if (isFlappingActive) {
        return RELO_FRAMES.flapping[flapFrameIndex] || RELO_FRAMES.flapping[0];
      }
      if (isSpeakingState) {
        return RELO_FRAMES.standing.vowels[currentVowel] || RELO_FRAMES.standing.vowels.a;
      }
      if (instructorWingPose === 'rightHalf') return RELO_FRAMES.pointRight.idleHalf;
      if (instructorWingPose === 'rightFull') return RELO_FRAMES.pointRight.idle;
      if (instructorWingPose === 'leftHalf') return RELO_FRAMES.pointLeft.idleHalf;
      if (instructorWingPose === 'leftFull') return RELO_FRAMES.pointLeft.idle;
      if (isBlinking) {
        return RELO_FRAMES.standing.blinks[blinkIndex] || RELO_FRAMES.standing.blinks[0];
      }
      return RELO_FRAMES.standing.idle;
    }

    // If in hover-only mode box and NOT hovered: return static standing idle frame completely
    if (animateOnHoverOnly && !isHovered) {
      return RELO_FRAMES.standing.idle;
    }

    // 1. Wing Flapping Animation GIF (takes highest priority during flight/hop)
    if (isFlappingActive) {
      return RELO_FRAMES.gifs.flapping;
    }

    // 2. Pose: Chapter / Pointing Sequence
    if (pose === 'chapter' || pose === 'pointing') {
      return RELO_FRAMES.pointingSequence[pointFrameIndex] || RELO_FRAMES.pointingSequence[0];
    }

    // 3. Pose: Thinking
    if (pose === 'thinking' || emotion === 'thinking') {
      if (isSpeakingState) {
        return RELO_FRAMES.gifs.thinkingTalking; // Pre-baked lightweight animated GIF (0% CPU lag)
      }
      if (isBlinking) {
        return RELO_FRAMES.thinking.blinks[blinkIndex] || RELO_FRAMES.thinking.blinks[0];
      }
      return RELO_FRAMES.thinking.idle;
    }

    // 4. Pose: Point Right (or Hero / Celebrating)
    if (pose === 'pointRight' || pose === 'hero' || pose === 'celebrating') {
      if (isSpeakingState) {
        return RELO_FRAMES.gifs.pointRightTalking; // Pre-baked lightweight animated GIF (0% CPU lag)
      }
      return RELO_FRAMES.pointRight.idle;
    }

    // 5. Pose: Point Left
    if (pose === 'pointLeft') {
      if (isSpeakingState) {
        return RELO_FRAMES.gifs.pointLeftTalking; // Pre-baked lightweight animated GIF (0% CPU lag)
      }
      return RELO_FRAMES.pointLeft.idle;
    }

    // 6. Default Standing Pose
    if (isSpeakingState) {
      return RELO_FRAMES.gifs.standingTalking; // Pre-baked lightweight animated GIF (0% CPU lag)
    }

    if (isBlinking) {
      return RELO_FRAMES.standing.blinks[blinkIndex] || RELO_FRAMES.standing.blinks[0];
    }

    return RELO_FRAMES.standing.idle;
  };

  const activeMessage = isZoomingLoop ? "Wuuussshh! 🚀 Detektif Relo terbang meluncur cepat!!" : message;
  const isMuted = !reloVoiceService.isReloOn || reloVoiceService.reloVol <= 0;
  const displayMessage = (isMuted && !isStageContext) ? '..............' : activeMessage;

  const currentEntranceClass = entranceType 
    ? (entranceTypeMap[entranceType] || 'animate-owl-fly-perch')
    : entranceClasses[activeEntranceIndex];

  const getContainerAnimationClass = () => {
    if (disableBodyAnimation) return '';
    if (isZoomingLoop) return 'animate-owl-zoom-loop';
    if (animateOnHoverOnly) {
      if (!isHovered) return ''; // STILL IDLE, NO ROTATION / BREATHING
      return pose === 'flying' ? 'animate-owl-float-flight' : '';
    }
    if (isFlyingIn) return currentEntranceClass;
    if (pose === 'flying') return 'animate-owl-float-flight';
    return ''; // STAY COMPLETELY STATIONARY IN PLACE (NO FLOATING MOTION)
  };

  const currentFrame = getActiveFramePath();

  return (
    <div 
      ref={mascotRef} 
      onMouseDown={isInstructor ? undefined : handlePressStart}
      onMouseUp={isInstructor ? undefined : handlePressEnd}
      onMouseLeave={isInstructor ? undefined : handlePressEnd}
      onTouchStart={isInstructor ? undefined : handlePressStart}
      onTouchEnd={isInstructor ? undefined : handlePressEnd}
      title={isInstructor ? "Instruktur Relo (Klik / Sentuh untuk terbang!)" : (animateOnHoverOnly ? undefined : "Klik untuk melompat! Tahan 3 detik untuk meluncur ke atas!")}
      className={`relative flex items-center space-x-3 select-none ${isInstructor ? 'pointer-events-none' : 'cursor-pointer'} ${className}`}
    >
      
      {/* PNG Frame Mascot Container - STABLE CENTERING */}
      <div className={`relative flex-shrink-0 ${sizeMap[size] || sizeMap.md} ${isInstructor ? (isInstructorFlying ? 'transform -translate-y-[45px] sm:-translate-y-[60px] scale-102 transition-all duration-350 ease-out' : 'transition-transform duration-400 ease-in-out') : (getContainerAnimationClass() + (disableBodyAnimation ? '' : ' transition-transform duration-300') + (isHopping && !isZoomingLoop && !animateOnHoverOnly && !disableBodyAnimation ? ' animate-owl-jump' : ''))}`}>
        
        {/* Floating Idea Bulb for Thinking Pose */}
        {(pose === 'thinking' || emotion === 'thinking') && (!animateOnHoverOnly || isHovered) && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-yellow-400 animate-pulse text-xl z-20 drop-shadow-md">
            💡
          </div>
        )}

        {/* Floating Sparkles for Hero / Celebrating Pose */}
        {(pose === 'hero' || pose === 'celebrating') && (!animateOnHoverOnly || isHovered) && (
          <div className="absolute -top-4 -right-2 text-amber-300 animate-spin-slow text-xl z-20 drop-shadow-md">
            ✨
          </div>
        )}

        {/* HIGH-RESOLUTION RELO PNG FRAME WITH EXACT BODY SHAPE HITBOX & GLOW EFFECT */}
        <img
          src={currentFrame}
          alt={isInstructor ? "Instruktur Relo" : "Detektif Relo"}
          onMouseEnter={isInstructor ? () => setIsInstructorHovered(true) : undefined}
          onMouseLeave={isInstructor ? () => setIsInstructorHovered(false) : undefined}
          onClick={isInstructor ? triggerInstructorFlight : undefined}
          onTouchStart={isInstructor ? triggerInstructorFlight : undefined}
          className={`w-full h-full object-contain ${
            isInstructor 
              ? `pointer-events-auto cursor-pointer transition-all duration-300 ${
                  isInstructorHovered 
                    ? 'filter drop-shadow-[0_0_25px_rgba(253,224,71,0.98)] drop-shadow-[0_0_45px_rgba(245,158,11,0.9)] brightness-110' 
                    : 'filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]'
                } [clip-path:ellipse(42%_48%_at_50%_52%)]`
              : 'filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]'
          }`}
        />

      </div>

      {/* Comic Speech Bubble Dialog - ALIGNED LEVEL WITH RELO'S HEAD / UPPER BODY */}
      {activeMessage && (
        <div className="relative p-3.5 sm:p-4 rounded-3xl bg-[#FFFDF9] border-[3px] border-[#2D241E] shadow-[4px_5px_0px_#2D241E] font-hand text-xs text-[#2D241E] max-w-xs sm:max-w-md animate-fade-in z-20 transition-all duration-300 self-center">
          
          {/* Bubble Arrow pointing towards Detective Relo's Head / Beak */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[16px] border-r-[#2D241E] border-b-[8px] border-b-transparent filter drop-shadow-sm" />
          <div className="absolute top-1/2 -left-[13px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[13px] border-r-[#FFFDF9] border-b-[6px] border-b-transparent" />

          {/* Header Label */}
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
