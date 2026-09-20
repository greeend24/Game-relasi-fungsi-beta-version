import React, { useState, useEffect, useRef } from 'react';
import { reloVoiceService } from '../services/reloVoiceService';
import { audioEngine } from '../services/audioEngine';
import { RELO_FRAMES, preloadReloFrames } from '../services/reloFrameService';
import { SNOWY_FRAMES, preloadSnowyFrames } from '../services/snowyFrameService';
import { RYU_FRAMES, preloadRyuFrames } from '../services/ryuFrameService';

/**
 * DetektifRelo ("Detektif Relo", "Snowy", & "Ryu")
 * Animated 2D Mascot component supporting Detective Relo, Snowy, and Ryu characters.
 * Features:
 * - Lip sync mouth animation synchronized with audio speech
 * - Natural eye blinking & mode-specific asynchronous blinking
 * - Dynamic pose switching (Standing, Thinking, Hands on Hips, Thumbs Up, Celebrating, etc.)
 * - Automatic character routing for Quest Mode (Snowy), Chapter Mode (Relo), and Endless Mode (Ryu)
 */
function DetektifRelo({ 
  character = null, // 'relo' | 'snowy' | 'ryu' | null (defaults to 'snowy' if quest, 'ryu' if endless, else 'relo')
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
  disableFlyIn = false,
  disableEntranceAnimation = false,
  isInstructor = false,
  canSpeak = true,
  islandType = null,
  onInstructorFlight = null,
  className = '' 
}) {
  const activeCharacter = character || (islandType === 'quest' ? 'snowy' : (islandType === 'endless' ? 'ryu' : 'relo'));
  const isSnowy = activeCharacter === 'snowy';
  const isRyu = activeCharacter === 'ryu';

  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkIndex, setBlinkIndex] = useState(0);
  const [flappingState, setFlappingState] = useState(false);
  const [flapFrameIndex, setFlapFrameIndex] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  // Snowy & Ryu have NO flying entrance animation. Relo has flying entrance animation unless disabled, standing, or on island.
  const shouldFlyIn = !islandType && !disableFlyIn && !disableEntranceAnimation && entranceType !== 'none' && !disableBodyAnimation && !animateOnHoverOnly && !isSnowy && !isRyu && !isInstructor && pose !== 'standing' && pose !== 'thinking';
  const [isFlyingIn, setIsFlyingIn] = useState(shouldFlyIn);
  const [isZoomingLoop, setIsZoomingLoop] = useState(false);
  const [activeEntranceIndex, setActiveEntranceIndex] = useState(0);
  const [audioSpeaking, setAudioSpeaking] = useState(false);
  const [snowyActivePose, setSnowyActivePose] = useState('thinking'); // 'thinking' | 'thumbsUp'
  const [ryuActivePose, setRyuActivePose] = useState('thinking'); // 'thinking' | 'tanganPinggang'

  // Synchronize lip sync animation with reloVoiceService audio speech
  useEffect(() => {
    const unsub = reloVoiceService.subscribe((speaking, speaker) => {
      if (speaking) {
        if (!speaker || speaker === activeCharacter) {
          setAudioSpeaking(true);
        } else {
          setAudioSpeaking(false);
        }
      } else {
        setAudioSpeaking(false);
      }
    });
    return unsub;
  }, [activeCharacter]);

  // Instruktur Relo States & Handlers
  const [isInstructorHovered, setIsInstructorHovered] = useState(false);
  const [isInstructorFlying, setIsInstructorFlying] = useState(false);
  const [instructorWingPose, setInstructorWingPose] = useState('idle');
  const [instructorClickCount, setInstructorClickCount] = useState(0);
  const [instructorFlightMessage, setInstructorFlightMessage] = useState('');

  const mascotRef = useRef(null);
  const holdTimerRef = useRef(null);
  const hopTimerRef = useRef(null);
  const instructorHoldTimerRef = useRef(null);
  const instructorClickResetTimerRef = useRef(null);
  const instructorPressStartTimeRef = useRef(0);
  const instructorHoldTriggeredRef = useRef(false);
  const prevHoverRef = useRef(isHovered);

  // Trigger 1-second jump with wing flapping (25% body height)
  const triggerHop = () => {
    setIsHopping(true);
    try { audioEngine.playBoing(); } catch {}
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
    }
    hopTimerRef.current = setTimeout(() => {
      setIsHopping(false);
      hopTimerRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hopTimerRef.current) clearTimeout(hopTimerRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (instructorHoldTimerRef.current) clearTimeout(instructorHoldTimerRef.current);
      if (instructorClickResetTimerRef.current) clearTimeout(instructorClickResetTimerRef.current);
    };
  }, []);

  // Reset Snowy & Ryu active poses when cursor leaves
  useEffect(() => {
    if (prevHoverRef.current && !isHovered) {
      setSnowyActivePose('thinking');
      setRyuActivePose('thinking');
    }
    prevHoverRef.current = isHovered;
  }, [isHovered]);

  // Snowy Active Cycle: Alternate between Thinking & Thumbs Up while hovered/active
  useEffect(() => {
    if (activeCharacter !== 'snowy' || (!isHovered && pose !== 'active')) {
      return;
    }
    const interval = setInterval(() => {
      setSnowyActivePose(prev => prev === 'thinking' ? 'thumbsUp' : 'thinking');
    }, 2400);
    return () => clearInterval(interval);
  }, [activeCharacter, isHovered, pose]);

  // Ryu Active Cycle: Alternate between Thinking & Tangan Pinggang while hovered/active
  useEffect(() => {
    if (activeCharacter !== 'ryu' || (!isHovered && pose !== 'active')) {
      return;
    }
    const interval = setInterval(() => {
      setRyuActivePose(prev => prev === 'thinking' ? 'tanganPinggang' : 'thinking');
    }, 2400);
    return () => clearInterval(interval);
  }, [activeCharacter, isHovered, pose]);

  // Preload frame images on mount
  useEffect(() => {
    preloadReloFrames();
    preloadSnowyFrames();
    preloadRyuFrames();
  }, []);

  // Subscribe to Relo Voice Audio speaking state for mouth movement sync (ONLY for currently speaking character)
  useEffect(() => {
    const unsubscribe = reloVoiceService.subscribe((speaking, speaker) => {
      const isThisCharacterSpeaking = Boolean(speaking && (!speaker || speaker === activeCharacter));
      setAudioSpeaking(isThisCharacterSpeaking);
    });
    return unsubscribe;
  }, [activeCharacter]);

  // Instruktur Relo Flight Launch Trigger (from 3s hold OR 5 clicks) - ONLY FOR RELO
  const triggerInstructorFlight = () => {
    if (isInstructorFlying || activeCharacter !== 'relo') return;
    setIsInstructorFlying(true);
    
    try { 
      audioEngine.playWoosh(); 
    } catch {}

    try {
      const res = reloVoiceService.playScene('relo_terbang', false, true);
      if (typeof onInstructorFlight === 'function') {
        onInstructorFlight(res?.text || "Woooosh, Detektif Relo meluncur!!!! 🚀🦉✨");
      }
    } catch (e) {
      if (typeof onInstructorFlight === 'function') {
        onInstructorFlight("Woooosh, Detektif Relo meluncur!!!! 🚀🦉✨");
      }
    }

    // Rocket flight animation duration
    setTimeout(() => {
      setIsInstructorFlying(false);
    }, 2200);
  };

  // Instruktur Press Cancel
  const handleInstructorPressCancel = () => {
    setIsInstructorHovered(false);
    if (instructorHoldTimerRef.current) {
      clearTimeout(instructorHoldTimerRef.current);
      instructorHoldTimerRef.current = null;
    }
    instructorPressStartTimeRef.current = 0;
  };

  // Mouse leave instructor hitbox: ONLY resets hover state and cancels hold timer (NO JUMP!)
  const handleInstructorMouseLeave = () => {
    setIsInstructorHovered(false);
    handleInstructorPressCancel();
  };

  // Instruktur Press Down (Start 3s Hold Timer - only for Relo flight)
  const handleInstructorPressStart = (e) => {
    setIsInstructorHovered(true);
    if (isInstructorFlying) return;
    instructorHoldTriggeredRef.current = false;
    instructorPressStartTimeRef.current = Date.now();

    if (instructorHoldTimerRef.current) {
      clearTimeout(instructorHoldTimerRef.current);
    }

    // 3-second continuous hold timer to launch Relo
    if (activeCharacter === 'relo') {
      instructorHoldTimerRef.current = setTimeout(() => {
        instructorHoldTriggeredRef.current = true;
        instructorHoldTimerRef.current = null;
        setInstructorClickCount(0);
        triggerInstructorFlight();
      }, 3000);
    }
  };

  // Instruktur Click (Trigger jump only on deliberate user click, NOT when mouse passes over!)
  const handleInstructorClick = (e) => {
    e?.stopPropagation?.();
    if (isInstructorFlying) return;

    // Clear any active hold timer and gracefully transition hover glow
    if (instructorHoldTimerRef.current) {
      clearTimeout(instructorHoldTimerRef.current);
      instructorHoldTimerRef.current = null;
    }
    instructorPressStartTimeRef.current = 0;
    setTimeout(() => {
      setIsInstructorHovered(false);
    }, 250);

    // If 3s hold was already completed and triggered flight, do nothing more
    if (instructorHoldTriggeredRef.current) {
      instructorHoldTriggeredRef.current = false;
      return;
    }

    // Snowy & Ryu jump playfully and speak when clicked!
    if (activeCharacter !== 'relo') {
      triggerHop();
      if (canSpeak && !audioSpeaking) {
        try {
          const scene = activeCharacter === 'snowy' ? '4' : '5';
          const res = reloVoiceService.playScene(scene, false, true);
          if (res?.text && typeof onInstructorFlight === 'function') {
            onInstructorFlight(res.text);
          }
        } catch {}
      }
      return;
    }

    // Relo: check 5x rapid clicks for launch, otherwise hop and speak!
    if (instructorClickResetTimerRef.current) {
      clearTimeout(instructorClickResetTimerRef.current);
    }

    const nextCount = instructorClickCount + 1;
    if (nextCount >= 5) {
      setInstructorClickCount(0);
      triggerInstructorFlight();
    } else {
      setInstructorClickCount(nextCount);
      // Playful 1s hop with wing flapping
      triggerHop();

      // Speak a friendly line when tapped (ONLY if canSpeak is enabled)!
      if (canSpeak && !audioSpeaking) {
        try {
          // If in stage/chapter context: ONLY play chapter/stage guidance, NEVER 1A/1B welcome greeting!
          // If in lobby/menu context: ONLY play friendly lobby greeting (1B)
          const isLobby = !isStageContext && islandType !== 'chapter';
          const pool = isLobby ? ['1B'] : ['2A', '3A'];
          const randomScene = pool[Math.floor(Math.random() * pool.length)];
          const res = reloVoiceService.playScene(randomScene, false, true);
          if (res?.text && typeof onInstructorFlight === 'function') {
            onInstructorFlight(res.text);
          }
        } catch {}
      }

      // Reset click count back to 0 after 2.5s of inactivity
      instructorClickResetTimerRef.current = setTimeout(() => {
        setInstructorClickCount(0);
      }, 2500);
    }
  };

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
    elastic: 'animate-owl-pop-elastic',
    parachute: 'animate-owl-float-parachute'
  };

  useEffect(() => {
    if (!shouldFlyIn) return;
    if (!entranceType && !animateOnHoverOnly) {
      setActiveEntranceIndex(0); // Always use fly-perch for flying entrance
    }
  }, [triggerKey, entranceType, animateOnHoverOnly, shouldFlyIn]);

  // Relo Fly-In Entrance duration timer (1.6s fly-perch animation)
  useEffect(() => {
    if (!shouldFlyIn) {
      setIsFlyingIn(false);
      return;
    }
    setIsFlyingIn(true);
    const timer = setTimeout(() => {
      setIsFlyingIn(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [triggerKey, shouldFlyIn]);

  const reloSizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-20 h-20 sm:w-28 sm:h-28',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
    xxl: 'w-44 h-44 sm:w-56 sm:h-56',
    xxxl: 'w-56 h-56 sm:w-72 sm:h-72',
    xxxxl: 'w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]',
    instructor: 'w-[clamp(190px,22cqw,290px)] h-[clamp(160px,18cqw,240px)] max-h-[38cqh] object-contain',
    instructorDock: 'w-[clamp(85px,10cqw,135px)] h-[clamp(72px,8.5cqw,115px)] max-h-[24cqh] object-contain',
    modeBox: 'w-[clamp(120px,14cqw,195px)] h-[clamp(120px,14cqw,195px)] object-contain'
  };

  const characterSizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-20 h-20 sm:w-28 sm:h-28',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
    xxl: 'w-44 h-44 sm:w-56 sm:h-56',
    xxxl: 'w-56 h-56 sm:w-72 sm:h-72',
    xxxxl: 'w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px]',
    instructor: 'w-[clamp(180px,20cqw,270px)] h-[clamp(190px,21cqw,290px)] max-h-[40cqh] object-contain',
    instructorDock: 'w-[clamp(80px,9.5cqw,125px)] h-[clamp(98px,11.5cqw,150px)] max-h-[26cqh] object-contain',
    stageConclusion: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48',
    modeBox: 'w-[clamp(115px,13.5cqw,185px)] h-[clamp(115px,13.5cqw,185px)] object-contain'
  };

  const sizeMap = (activeCharacter === 'relo') ? reloSizeMap : characterSizeMap;

  const handlePressStart = () => {
    if (animateOnHoverOnly || isInstructor || activeCharacter !== 'relo') return;
    holdTimerRef.current = setTimeout(() => {
      setIsZoomingLoop(true);
      try { audioEngine.playPowerUp(); } catch {}
      setTimeout(() => { setIsZoomingLoop(false); }, 1500);
    }, 3000);
  };

  const handlePressCancel = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleClick = (e) => {
    e?.stopPropagation?.();
    handlePressCancel();
    if (!isZoomingLoop && !animateOnHoverOnly && !isInstructor) {
      triggerHop();
    }
  };

  const isFlappingActive = isFlapping || flappingState || pose === 'flying';
  const isPointingActive = pose === 'pointing' || pose === 'chapter';
  const [pointFrameIndex, setPointFrameIndex] = useState(0);

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

  const isSpeakingState = Boolean(
    isSpeaking || 
    (canSpeak && (
      animateOnHoverOnly 
        ? (isHovered && audioSpeaking)
        : audioSpeaking
    ))
  );

  const getActiveFramePath = () => {
    // A. SNOWY CHARACTER ANIMATIONS (Quest Mode Mascot)
    if (activeCharacter === 'snowy') {
      if (isSpeakingState) {
        if (pose === 'thinking' || (isHovered && snowyActivePose === 'thinking')) {
          return SNOWY_FRAMES.gifs.thinkingTalking;
        }
        if (pose === 'thumbsUp' || pose === 'jempol' || (isHovered && snowyActivePose === 'thumbsUp')) {
          return SNOWY_FRAMES.gifs.thumbsUpTalking;
        }
        return SNOWY_FRAMES.gifs.standingTalking;
      }
      const isActiveMode = isHovered || pose === 'active' || pose === 'quest';
      if (pose === 'thumbsUp' || pose === 'jempol') return SNOWY_FRAMES.gifs.thumbsUpBlinking;
      if (pose === 'thinking') return SNOWY_FRAMES.gifs.thinkingBlinking;
      if (pose === 'idea' || pose === 'aha') return SNOWY_FRAMES.gifs.idea;
      if (pose === 'celebrating' || pose === 'cheering' || pose === 'success') return SNOWY_FRAMES.gifs.celebrating;
      if (pose === 'winking') return SNOWY_FRAMES.gifs.winking;
      if (isActiveMode) {
        return snowyActivePose === 'thumbsUp' ? SNOWY_FRAMES.gifs.thumbsUpBlinking : SNOWY_FRAMES.gifs.thinkingBlinking;
      }
      return SNOWY_FRAMES.gifs.standingBlinking;
    }

    // B. RYU CHARACTER ANIMATIONS (Endless Mode Mascot)
    if (activeCharacter === 'ryu') {
      if (isSpeakingState) {
        if (pose === 'thinking' || (isHovered && ryuActivePose === 'thinking')) {
          return RYU_FRAMES.gifs.thinkingTalking;
        }
        if (pose === 'tanganPinggang' || pose === 'confident' || (isHovered && ryuActivePose === 'tanganPinggang')) {
          return RYU_FRAMES.gifs.tanganPinggangTalking;
        }
        return RYU_FRAMES.gifs.standingTalking;
      }

      // 1. Hovered / Active interaction: alternates between Thinking & Pegang Pinggang (Hands on Hips)
      if (isHovered || pose === 'active') {
        return ryuActivePose === 'tanganPinggang' 
          ? RYU_FRAMES.gifs.tanganPinggangBlinking 
          : RYU_FRAMES.gifs.thinkingBlinking;
      }

      // 2. Explicit poses in gameplay context
      if (pose === 'celebrating' || pose === 'cheering' || pose === 'success') return RYU_FRAMES.gifs.celebrating;
      if (pose === 'tanganPinggang' || pose === 'confident') return RYU_FRAMES.gifs.tanganPinggangBlinking;
      if (pose === 'thinking') return RYU_FRAMES.gifs.thinkingBlinking;
      if (pose === 'idea' || pose === 'aha') return RYU_FRAMES.gifs.idea;
      if (pose === 'winking' || pose === 'wink') return RYU_FRAMES.gifs.winking;
      if (pose === 'stanceShift' || pose === 'poseTransition') return RYU_FRAMES.gifs.stanceShift;

      // 3. Default Idle when NOT hovered: ONLY standing and natural blinking
      if (islandType === 'endless') return RYU_FRAMES.gifs.standingBlinkingEndless;
      return RYU_FRAMES.gifs.standingBlinking;
    }

    // C. DETEKTIF RELO CHARACTER ANIMATIONS (Chapter Mode / Main Mascot)
    if (islandType === 'chapter') {
      if (isSpeakingState) {
        if (pose === 'thinking' || pose === 'chapter' || (isHovered && pose === 'chapter')) {
          return RELO_FRAMES.gifs.thinkingTalking;
        }
        if (pose === 'pointRight' || pose === 'celebrating') {
          return RELO_FRAMES.gifs.pointRightTalking;
        }
        return RELO_FRAMES.gifs.standingTalking;
      }
      if (isHovered || pose === 'thinking' || pose === 'chapter') {
        return RELO_FRAMES.gifs.thinkingIdle || RELO_FRAMES.gifs.thinking;
      }
      return RELO_FRAMES.gifs.standingBlinkingChapter || RELO_FRAMES.gifs.standingBlinking;
    }

    if (isInstructor) {
      if (isInstructorFlying || isFlappingActive || isHopping) return RELO_FRAMES.gifs.flapping;
      if (pose === 'celebrating' || pose === 'hero' || pose === 'success') {
        return isSpeakingState ? RELO_FRAMES.gifs.pointRightTalking : RELO_FRAMES.gifs.chapterPointing;
      }
      if (pose === 'thinking' || emotion === 'error') {
        return isSpeakingState ? RELO_FRAMES.gifs.thinkingTalking : (RELO_FRAMES.gifs.thinkingIdle || RELO_FRAMES.gifs.thinking);
      }
      if (isSpeakingState) return RELO_FRAMES.gifs.standingTalking;
      if (instructorWingPose === 'rightHalf' || instructorWingPose === 'rightFull' || instructorWingPose === 'leftHalf' || instructorWingPose === 'leftFull') {
        return RELO_FRAMES.gifs.chapterPointing;
      }
      return RELO_FRAMES.gifs.standingBlinking;
    }

    // Relo flies during entrance animation ONLY if shouldFlyIn is true
    if (isFlyingIn && shouldFlyIn) return RELO_FRAMES.gifs.flapping;

    if (animateOnHoverOnly && !isHovered) return RELO_FRAMES.gifs.standingBlinking;
    if (isHopping || isZoomingLoop || pose === 'flying') return RELO_FRAMES.gifs.flapping;
    
    if (pose === 'standing') {
      return isSpeakingState ? RELO_FRAMES.gifs.standingTalking : RELO_FRAMES.gifs.standingBlinking;
    }

    if (pose === 'chapter' || (islandType === 'chapter' && isHovered)) {
      if (isSpeakingState) return RELO_FRAMES.gifs.thinkingTalking;
      return RELO_FRAMES.gifs.thinkingIdle || RELO_FRAMES.gifs.thinking;
    }
    
    if (pose === 'thinking' || emotion === 'thinking') {
      if (isSpeakingState) return RELO_FRAMES.gifs.thinkingTalking;
      return RELO_FRAMES.gifs.thinkingIdle || RELO_FRAMES.gifs.thinking;
    }

    if (pose === 'pointRight' || pose === 'hero' || pose === 'celebrating') {
      return isSpeakingState ? RELO_FRAMES.gifs.pointRightTalking : RELO_FRAMES.gifs.chapterPointing;
    }
    if (pose === 'pointLeft') {
      return isSpeakingState ? RELO_FRAMES.gifs.pointLeftTalking : RELO_FRAMES.gifs.chapterPointing;
    }
    if (isSpeakingState) return RELO_FRAMES.gifs.standingTalking;

    if (islandType === 'endless') return RELO_FRAMES.gifs.standingBlinkingEndless || RELO_FRAMES.gifs.standingBlinking;
    return RELO_FRAMES.gifs.standingBlinking || RELO_FRAMES.gifs.standingIdle;
  };

  const activeMessage = isInstructor ? '' : (isZoomingLoop ? "Wuuussshh! 🚀 Detektif Relo terbang meluncur cepat!!" : message);
  const isMuted = !reloVoiceService.isReloOn || reloVoiceService.reloVol <= 0;
  const displayMessage = (isMuted && !isStageContext) ? '..............' : activeMessage;

  const currentEntranceClass = entranceType 
    ? (entranceTypeMap[entranceType] || 'animate-owl-fly-perch')
    : entranceClasses[activeEntranceIndex];

  const getContainerAnimationClass = () => {
    if (isInstructor) {
      if (isInstructorFlying) return 'animate-owl-zoom-loop';
      if (isHopping) return '';
      return 'animate-owl-breath';
    }
    if (isZoomingLoop) return 'animate-owl-zoom-loop';
    if (isFlyingIn && shouldFlyIn && activeCharacter === 'relo') return currentEntranceClass;
    if (pose === 'flying') return 'animate-owl-float-flight';
    if (disableBodyAnimation) return '';
    // Apply natural gentle breathing animation when idle so mascot is never a static frozen cutout
    return 'animate-owl-breath';
  };

  const currentFrame = getActiveFramePath();

  return (
    <div 
      ref={mascotRef} 
      onMouseDown={isInstructor || islandType ? undefined : handlePressStart}
      onMouseUp={isInstructor || islandType ? undefined : handlePressCancel}
      onMouseLeave={isInstructor || islandType ? undefined : handlePressCancel}
      onClick={isInstructor || islandType ? undefined : handleClick}
      onTouchStart={isInstructor || islandType ? undefined : handlePressStart}
      onTouchEnd={isInstructor || islandType ? undefined : handleClick}
      onTouchCancel={isInstructor || islandType ? undefined : handlePressCancel}
      title={
        isInstructor 
          ? (activeCharacter === 'relo' 
              ? "Instruktur Relo (Tahan 3 detik atau klik 5x untuk meluncur!)" 
              : (activeCharacter === 'snowy' ? "Instruktur Snowy" : "Instruktur Ryu"))
          : (!islandType && activeCharacter === 'relo' ? "Klik untuk melompat! Tahan 3 detik untuk meluncur ke atas!" : undefined)
      }
      className={`relative flex items-center space-x-3 select-none ${isInstructor || islandType ? 'pointer-events-none' : 'cursor-pointer'} ${className}`}
    >
      
      {/* Mascot Container (Ryu and Snowy use identical translate-y-[5px] offset when on islands) */}
      <div className={`relative flex-shrink-0 max-w-full ${sizeMap[size] || sizeMap.md} ${(activeCharacter === 'snowy' || activeCharacter === 'ryu') && !isInstructor ? 'translate-y-[5px]' : ''} ${getContainerAnimationClass()} ${!isInstructor && !islandType && isHopping && !isZoomingLoop && !animateOnHoverOnly && !disableBodyAnimation ? 'animate-owl-jump' : ''} ${isInstructor && isHopping && !isInstructorFlying ? 'animate-owl-jump' : ''} ${disableBodyAnimation && !isInstructorFlying ? '' : 'transition-transform duration-300'}`}>
        
        {/* Floating Idea Bulb for Thinking Pose (only outside island mode) */}
        {!islandType && (pose === 'thinking' || emotion === 'thinking') && (!animateOnHoverOnly || isHovered) && (
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

        {/* Character Calibration Wrapper: Calibrates Relo & Snowy to match Ryu instructor size and foot baseline */}
        <div className={`w-full h-full relative flex items-center justify-center ${
          isInstructor
            ? (activeCharacter === 'relo'
                ? 'scale-[2.05] translate-y-[1%] origin-center'
                : activeCharacter === 'snowy'
                ? 'scale-[1.02] translate-y-[2.5%] origin-bottom'
                : '')
            : ''
        }`}>
          {/* HIGH-RESOLUTION MASCOT PNG FRAME WITH EXACT BODY SHAPE GLOW EFFECT */}
          <img
            src={currentFrame}
            alt={activeCharacter === 'snowy' ? "Snowy" : (activeCharacter === 'ryu' ? "Ryu" : (isInstructor ? "Instruktur Relo" : "Detektif Relo"))}
            className={`w-full h-full object-contain pointer-events-none ${
              isInstructor 
                ? (activeCharacter === 'snowy'
                    ? `instructor-glow-snowy ${isInstructorHovered ? 'is-hovered' : ''}`
                    : activeCharacter === 'ryu'
                    ? `instructor-glow-ryu ${isInstructorHovered ? 'is-hovered' : ''}`
                    : `instructor-glow-relo ${isInstructorHovered ? 'is-hovered' : ''}`
                  )
                : (size === 'modeBox' && islandType)
                  ? `mode-mascot-img ${activeCharacter}-mascot ${isHovered ? 'is-hovered' : ''}`
                  : 'filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]'
            }`}
          />

          {/* DEDICATED COMPACT PHYSICAL BODY HITBOX (TIGHTLY ENCLOSES ONLY THE CHARACTER'S VISIBLE BODY) */}
          {isInstructor && (
            <div
              onMouseEnter={() => setIsInstructorHovered(true)}
              onMouseLeave={handleInstructorMouseLeave}
              onMouseDown={handleInstructorPressStart}
              onMouseUp={handleInstructorPressCancel}
              onClick={handleInstructorClick}
              onTouchStart={handleInstructorPressStart}
              onTouchEnd={handleInstructorClick}
              onTouchCancel={handleInstructorPressCancel}
              className={`absolute pointer-events-auto cursor-pointer z-10 ${
                activeCharacter === 'relo'
                  ? 'bottom-[14%] left-[30%] w-[40%] h-[72%]'
                  : 'bottom-[8%] left-[10%] w-[80%] h-[84%]'
              }`}
              title={
                activeCharacter === 'relo' 
                  ? "Instruktur Relo (Klik untuk melompat! Tahan 3 detik atau klik 5x untuk meluncur!)" 
                  : (activeCharacter === 'snowy' ? "Instruktur Snowy (Klik untuk melompat!)" : "Instruktur Ryu (Klik untuk melompat!)")
              }
            />
          )}
        </div>

      </div>

      {/* Comic Speech Bubble Dialog */}
      {activeMessage && (
        <div className="relative p-3.5 sm:p-4 rounded-[24px] glass-bubble border border-white/85 shadow-[0_8px_24px_rgba(0,0,0,0.14)] font-hand text-xs text-[#2D241E] max-w-xs sm:max-w-md animate-fade-in z-20 transition-all duration-300 self-center">
          
          {/* Seamless Connected SVG Tail */}
          <svg 
            className="absolute top-1/2 -left-[18px] -translate-y-1/2 w-[20px] h-[24px] pointer-events-none overflow-visible z-10"
            viewBox="0 0 20 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20 0C14 4 4 9 0 12C4 15 14 20 20 24V0Z" 
              fill="rgba(255, 255, 255, 0.72)" 
            />
            <path 
              d="M20 0C14 4 4 9 0 12C4 15 14 20 20 24" 
              stroke="rgba(255, 255, 255, 0.85)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
          </svg>

          {/* Header Label */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#9A3412] uppercase tracking-wider mb-1.5 border-b-2 border-[#FED7AA] pb-1">
            <span className="flex items-center space-x-1.5">
              <span className="text-sm sm:text-base">{activeCharacter === 'snowy' ? "❄️" : (activeCharacter === 'ryu' ? "🔥" : "🕵️‍♂️")}</span>
              <span>{activeCharacter === 'snowy' ? "INSTRUKTUR SNOWY" : (activeCharacter === 'ryu' ? "INSTRUKTUR RYU" : (isInstructor ? "INSTRUKTUR RELO" : "PETUNJUK DETEKTIF RELO"))}</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping" />
          </div>

          {/* Speech Text Content */}
          <p className="font-bold leading-relaxed text-[#2D241E] text-sm sm:text-base md:text-lg">{displayMessage}</p>
        </div>
      )}

    </div>
  );
}

export default React.memo(DetektifRelo);
