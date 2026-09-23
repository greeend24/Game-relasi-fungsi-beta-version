import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Lightbulb, CheckCircle2, XCircle, ChevronRight, AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../services/audioEngine';
import { isVideoWatched, markVideoWatched } from '../services/storageService';
import { CHAPTER1_UNIVERSAL_AUDIO } from '../data/chapter1Subtitles';
import { UNIVERSAL_AUDIO } from '../data/chapter3Subtitles';
import { CHAPTER2_UNIVERSAL_AUDIO } from '../data/chapter2Subtitles';
import { CHAPTER4_UNIVERSAL_AUDIO } from '../data/chapter4Subtitles';
import { CHAPTER5_UNIVERSAL_AUDIO } from '../data/chapter5Subtitles';
import { shuffleArray } from '../utils/shuffle.js';

/**
 * ChapterVideoPlayer
 * Interactive video player for Chapter 3 with:
 * - Restricted controls: Play/Pause, Restart, Rewind 5s (Seek forward/skip completely disabled unless watched before)
 * - Real-time Web Audio API voice analyzer for Detektif Relo mouth lip-sync
 * - Externalized Relo Mascot (docked outside the video frame on the left panel)
 * - Automatic background music ducking/pause while video plays
 * - Mid-video / Video completion Quiz popup with voice feedback (Benar/Salah)
 */
/**
 * Robustly resolve duration from HTML5 element, videoData config, or last subtitle timestamp
 */
const getValidDuration = (videoEl, data) => {
  if (videoEl && Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
    return videoEl.duration;
  }
  if (data?.duration && Number.isFinite(data.duration) && data.duration > 0) {
    return data.duration;
  }
  if (data?.subtitles && data.subtitles.length > 0) {
    const lastSub = data.subtitles[data.subtitles.length - 1];
    if (lastSub?.end && lastSub.end > 0) {
      return lastSub.end;
    }
  }
  return 0;
};

export default function ChapterVideoPlayer({
  videoData,
  isAlreadyWatched = false,
  onQuizPassed,
  onNextSegment,
  onPrevSegment,
  onSubtitleChange,
  onSpeakingChange,
  isFirstSegment = false,
  isLastSegment = false,
  isAdmin = false,
  currentUser = null
}) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressDotRef = useRef(null);
  const feedbackAudioRef = useRef(null);

  // Web Audio API refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioCheckIntervalRef = useRef(null);

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(() => getValidDuration(null, videoData));
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [skipWarning, setSkipWarning] = useState(null);

  // Watched video state tracking: can only skip / jump forward if already watched before or Admin
  const resolvedVideoKey = videoData?.videoKey || videoData?.id;
  const [hasWatchedBefore, setHasWatchedBefore] = useState(() => {
    if (isAdmin || isAlreadyWatched) return true;
    return isVideoWatched(resolvedVideoKey, currentUser?.username);
  });

  useEffect(() => {
    if (isAdmin || isAlreadyWatched) {
      setHasWatchedBefore(true);
    } else if (resolvedVideoKey) {
      setHasWatchedBefore(isVideoWatched(resolvedVideoKey, currentUser?.username));
    }
  }, [isAdmin, isAlreadyWatched, resolvedVideoKey, currentUser?.username]);

  const canFreelySeek = isAdmin || hasWatchedBefore;

  // Relo speaking & subtitle states
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [feedbackSpeaking, setFeedbackSpeaking] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Quiz popup states
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizStatus, setQuizStatus] = useState('unanswered'); // 'unanswered' | 'correct' | 'wrong'
  const [showClue, setShowClue] = useState(false);
  const [isRetryActive, setIsRetryActive] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);

  // ══════════════════════════════════════════════════════════════
  // 1. AUTO PAUSE / RESUME BACKGROUND MUSIC
  // ══════════════════════════════════════════════════════════════
  useEffect(() => {
    audioEngine.setVideoAudioActive?.(isPlaying);
    return () => {
      audioEngine.setVideoAudioActive?.(false);
    };
  }, [isPlaying]);

  // Clean up Web Audio & BGM on unmount
  useEffect(() => {
    return () => {
      audioEngine.setVideoAudioActive?.(false);
      if (audioCheckIntervalRef.current) clearInterval(audioCheckIntervalRef.current);
      if (feedbackAudioRef.current) {
        feedbackAudioRef.current.pause();
        feedbackAudioRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch {}
      }
    };
  }, []);

  // ══════════════════════════════════════════════════════════════
  // 2. WEB AUDIO API LIP-SYNC ANALYZER
  // ══════════════════════════════════════════════════════════════
  const setupAudioContext = useCallback(() => {
    if (!videoRef.current) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.5;

        // Create media element source ONLY ONCE per video element
        sourceRef.current = audioContextRef.current.createMediaElementSource(videoRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (err) {
      console.warn('AudioContext setup notice:', err.message);
    }
  }, []);

  // Poll audio volume level at 60ms intervals (ultra-lightweight, zero lag)
  useEffect(() => {
    if (isPlaying && !isQuizOpen) {
      audioCheckIntervalRef.current = setInterval(() => {
        if (!analyserRef.current || !videoRef.current || videoRef.current.paused || videoRef.current.ended) {
          setIsVoiceSpeaking(false);
          return;
        }
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        // Speech volume threshold
        setIsVoiceSpeaking(average > 10);
      }, 60);
    } else {
      if (audioCheckIntervalRef.current) {
        clearInterval(audioCheckIntervalRef.current);
        audioCheckIntervalRef.current = null;
      }
      setIsVoiceSpeaking(false);
    }

    return () => {
      if (audioCheckIntervalRef.current) {
        clearInterval(audioCheckIntervalRef.current);
        audioCheckIntervalRef.current = null;
      }
    };
  }, [isPlaying, isQuizOpen]);

  // Reset video & states when videoData changes
  useEffect(() => {
    setCurrentTime(0);
    setMaxWatchedTime(0);
    setIsQuizOpen(false);
    setSelectedOption(null);
    setQuizStatus('unanswered');
    setShowClue(false);
    setIsRetryActive(false);
    setVideoLoadError(false);
    setFeedbackText('');
    setFeedbackSpeaking(false);
    if (feedbackAudioRef.current) {
      feedbackAudioRef.current.pause();
      feedbackAudioRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
      const d = getValidDuration(videoRef.current, videoData);
      setDuration(d);
    } else {
      const d = getValidDuration(null, videoData);
      setDuration(d);
    }
  }, [videoData?.id]);

  // High-frequency 60fps real-time tracking of video currentTime for microsecond-precise subtitle sync & progress
  useEffect(() => {
    if (!isPlaying) return;
    let animId;
    const updateLoop = () => {
      if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
        const cur = videoRef.current.currentTime;
        if (Number.isFinite(cur)) {
          setCurrentTime(cur);
          setMaxWatchedTime(prev => (cur > prev ? cur : prev));

          // Direct DOM style updates for 100% instantaneous, unthrottled, silky-smooth 60fps progress bar motion!
          const dur = (Number.isFinite(duration) && duration > 0) ? duration : (videoRef.current.duration || 1);
          if (dur > 0) {
            const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${pct}%`;
              progressFillRef.current.style.minWidth = cur > 0 ? '8px' : '0px';
            }
            if (progressDotRef.current) {
              progressDotRef.current.style.left = `${pct}%`;
            }
          }
        }
        if (duration <= 0 || !Number.isFinite(duration)) {
          const d = getValidDuration(videoRef.current, videoData);
          if (d > 0) setDuration(d);
        }
      }
      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, videoData, duration]);

  // ══════════════════════════════════════════════════════════════
  // 3. SUBTITLES & RELO GUIDANCE SYNCHRONIZATION
  // ══════════════════════════════════════════════════════════════
  const activeSubtitle = isPlaying ? (videoData?.subtitles?.find(
    s => currentTime >= s.start && currentTime < s.end
  )?.text || '') : '';

  // Real-time subtitle: when silent or paused, text is empty so bubble chat disappears
  const displayBubbleText = feedbackText || activeSubtitle || '';
  
  // Relo is speaking whenever narration subtitle is active or feedback audio is playing
  const isMascotSpeaking = Boolean(feedbackSpeaking) || (isPlaying && Boolean(activeSubtitle || isVoiceSpeaking));

  // Notify parent component (ChapterLearning) of subtitle and speaking status
  useEffect(() => {
    onSubtitleChange?.(displayBubbleText);
  }, [displayBubbleText, onSubtitleChange]);

  useEffect(() => {
    onSpeakingChange?.(isMascotSpeaking);
  }, [isMascotSpeaking, onSpeakingChange]);

  // ══════════════════════════════════════════════════════════════
  // 4. VIDEO CONTROLS (RESTRICTED: ABSOLUTELY NO FORWARD SEEKING)
  // ══════════════════════════════════════════════════════════════
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    setupAudioContext();

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Play interrupted:', err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    setupAudioContext();
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    if (progressFillRef.current) {
      progressFillRef.current.style.width = '0%';
      progressFillRef.current.style.minWidth = '0px';
    }
    if (progressDotRef.current) {
      progressDotRef.current.style.left = '0%';
    }
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
    try { audioEngine.playClick?.(); } catch {}
  };

  const handleRewind5s = () => {
    if (!videoRef.current) return;
    setupAudioContext();
    const newTime = Math.max(0, videoRef.current.currentTime - 5);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    const dur = (Number.isFinite(duration) && duration > 0) ? duration : (videoRef.current.duration || 1);
    if (dur > 0) {
      const pct = Math.min(100, Math.max(0, (newTime / dur) * 100));
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${pct}%`;
        progressFillRef.current.style.minWidth = newTime > 0 ? '8px' : '0px';
      }
      if (progressDotRef.current) {
        progressDotRef.current.style.left = `${pct}%`;
      }
    }
    try { audioEngine.playClick?.(); } catch {}
  };

  const effectiveDuration = (Number.isFinite(duration) && duration > 0)
    ? duration
    : getValidDuration(videoRef.current, videoData);

  const progressPercent = effectiveDuration > 0
    ? Math.min(100, Math.max(0, (currentTime / effectiveDuration) * 100))
    : 0;

  const handleProgressBarClick = (e) => {
    const totalDur = effectiveDuration;
    if (!progressBarRef.current || !videoRef.current || !totalDur) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = clickRatio * totalDur;

    // RESTRICTION: STRICTLY NO JUMPING FORWARD! Only allow seeking within watched territory (exempt if already watched before or Admin)
    if (!canFreelySeek && targetTime > maxWatchedTime + 0.5) {
      try { audioEngine.playError?.(); } catch {}
      setSkipWarning('🔒 Video belum pernah ditonton. Tonton video secara utuh sebelum dapat melompat!');
      setTimeout(() => setSkipWarning(null), 3000);
      return;
    }

    // Allow seeking
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    const pct = Math.min(100, Math.max(0, (targetTime / totalDur) * 100));
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pct}%`;
      progressFillRef.current.style.minWidth = targetTime > 0 ? '8px' : '0px';
    }
    if (progressDotRef.current) {
      progressDotRef.current.style.left = `${pct}%`;
    }
  };

  const handleSeeking = () => {
    if (!videoRef.current) return;
    // If native seek tries to skip ahead beyond maxWatchedTime, lock it back unless already watched
    if (!canFreelySeek && videoRef.current.currentTime > maxWatchedTime + 0.5) {
      videoRef.current.currentTime = maxWatchedTime;
      setCurrentTime(maxWatchedTime);
    }
  };

  const handleVolumeToggle = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    if (Number.isFinite(cur)) {
      setCurrentTime(cur);
      if (cur > maxWatchedTime) {
        setMaxWatchedTime(cur);
      }
    }
    if (duration <= 0 || !Number.isFinite(duration)) {
      const d = getValidDuration(videoRef.current, videoData);
      if (d > 0) setDuration(d);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const d = getValidDuration(videoRef.current, videoData);
    if (d > 0) setDuration(d);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVoiceSpeaking(false);
    setHasWatchedBefore(true);
    if (resolvedVideoKey) {
      markVideoWatched(resolvedVideoKey, currentUser?.username);
    }
    // Trigger the mid-game Quiz popup!
    setIsQuizOpen(true);
    try { audioEngine.playCelebration?.(); } catch {}
  };

  // Format time MM:SS
  const formatTime = (secs) => {
    if (!Number.isFinite(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ══════════════════════════════════════════════════════════════
  // 5. POPUP QUIZ HANDLER & BENAR / SALAH AUDIO
  // ══════════════════════════════════════════════════════════════
  const playFeedbackVoice = (audioSrc, fallbackSrc, feedbackMsg) => {
    if (feedbackAudioRef.current) {
      feedbackAudioRef.current.pause();
      feedbackAudioRef.current = null;
    }

    setFeedbackText(feedbackMsg);
    setFeedbackSpeaking(true);

    const audio = new Audio();
    audio.src = audioSrc || fallbackSrc;
    feedbackAudioRef.current = audio;

    audio.onended = () => {
      setFeedbackSpeaking(false);
    };
    audio.onerror = () => {
      // Fallback to universal audio if specific file fails
      if (audioSrc !== fallbackSrc && fallbackSrc) {
        audio.src = fallbackSrc;
        audio.play().catch(() => setFeedbackSpeaking(false));
      } else {
        setFeedbackSpeaking(false);
      }
    };

    audio.play().catch(() => {
      setFeedbackSpeaking(false);
    });
  };

  // Multi-question quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Reset quiz index when video changes
  useEffect(() => {
    setCurrentQuestionIdx(0);
    setIsQuizOpen(false);
    setQuizStatus('unanswered');
    setSelectedOption(null);
    setIsRetryActive(false);
    setShowClue(false);
  }, [videoData?.id]);

  const hasMultipleQuestions = Boolean(videoData?.quiz?.questions && Array.isArray(videoData.quiz.questions) && videoData.quiz.questions.length > 0);
  const questionsList = hasMultipleQuestions ? videoData.quiz.questions : (videoData?.quiz ? [videoData.quiz] : []);
  const currentBaseQuiz = questionsList[currentQuestionIdx] || videoData?.quiz;
  const isLastQuestion = currentQuestionIdx >= questionsList.length - 1;

  const currentActiveQuiz = (isRetryActive && currentBaseQuiz?.retryQuestion)
    ? { ...currentBaseQuiz, ...currentBaseQuiz.retryQuestion }
    : currentBaseQuiz;

  const [shuffledVideoOptions, setShuffledVideoOptions] = useState([]);

  useEffect(() => {
    if (isQuizOpen && currentActiveQuiz?.options && currentActiveQuiz.options.length > 0) {
      setShuffledVideoOptions(shuffleArray(currentActiveQuiz.options));
    } else {
      setShuffledVideoOptions([]);
    }
  }, [isQuizOpen, currentQuestionIdx, isRetryActive, videoData?.id, currentActiveQuiz?.question]);

  const handleQuizAnswer = (option) => {
    if (quizStatus === 'correct') return; // already solved
    setSelectedOption(option);

    const isCorrect = option === currentActiveQuiz?.correct;
    const isCh1 = videoData?.chapterId === 1 || String(videoData?.id || '').startsWith('1.');
    const isCh2 = videoData?.chapterId === 2 || String(videoData?.id || '').startsWith('2.');
    const isCh4 = videoData?.chapterId === 4 || String(videoData?.id || '').startsWith('4.');
    const isCh5 = videoData?.chapterId === 5 || String(videoData?.id || '').startsWith('5.');
    const universalData = isCh1 ? CHAPTER1_UNIVERSAL_AUDIO :
                          isCh2 ? CHAPTER2_UNIVERSAL_AUDIO :
                          isCh4 ? CHAPTER4_UNIVERSAL_AUDIO :
                          isCh5 ? CHAPTER5_UNIVERSAL_AUDIO :
                          UNIVERSAL_AUDIO;

    if (isCorrect) {
      setQuizStatus('correct');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      try { audioEngine.playCorrect?.(); } catch {}

      // Play Benar Audio
      const audioBenar = (isRetryActive ? null : currentBaseQuiz?.audioBenar) || universalData.benar.audio;
      const universalBenar = universalData.benar.audio;
      const message = (isRetryActive ? universalData.benar.text : (currentBaseQuiz?.textBenar || universalData.benar.text));
      playFeedbackVoice(audioBenar, universalBenar, message);

      if (isLastQuestion && onQuizPassed) {
        onQuizPassed(videoData.id);
      }
    } else {
      setQuizStatus('wrong');
      try { audioEngine.playWrong?.(); } catch {}

      // Play Salah Audio
      const audioSalah = (isRetryActive ? null : currentBaseQuiz?.audioSalah) || universalData.salah.audio;
      const universalSalah = universalData.salah.audio;
      const message = (isRetryActive ? universalData.salah.text : (currentBaseQuiz?.textSalah || universalData.salah.text));
      playFeedbackVoice(audioSalah, universalSalah, message);
    }
  };

  const handleReviewVideo = () => {
    setIsQuizOpen(false);
    setQuizStatus('unanswered');
    setSelectedOption(null);
    setIsRetryActive(false);
    setShowClue(false);
    if (feedbackAudioRef.current) {
      feedbackAudioRef.current.pause();
      feedbackAudioRef.current = null;
    }
    setFeedbackSpeaking(false);
    setFeedbackText('');
    handleRestart();
  };

  const handleGiveNewQuestion = () => {
    if (feedbackAudioRef.current) {
      feedbackAudioRef.current.pause();
      feedbackAudioRef.current = null;
    }
    setFeedbackSpeaking(false);
    setFeedbackText('');
    setSelectedOption(null);
    setQuizStatus('unanswered');
    setShowClue(false);
    setIsRetryActive(prev => !prev);
    try { audioEngine.playClick?.(); } catch {}
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-slate-950/70 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md">
      {/* ── TOP HEADER BAR ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-black/40 border-b border-white/10 z-20 flex-shrink-0">
        <h2 className="text-sm sm:text-base font-black text-white/90 truncate font-pencil tracking-wide mr-2">
          {videoData.title}
        </h2>
        {canFreelySeek ? (
          <button
            type="button"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
              setIsQuizOpen(true);
              try { audioEngine.playClick?.(); } catch {}
            }}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title="Video sudah pernah kamu tonton sebelumnya. Klik untuk langsung ke kuis!"
          >
            <span>Lewati Video</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div 
            onClick={() => {
              try { audioEngine.playError?.(); } catch {}
              setSkipWarning('🔒 Video belum pernah ditonton. Tonton sampai selesai sekali untuk membuka fitur lewati!');
              setTimeout(() => setSkipWarning(null), 3500);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-white/10 text-slate-400 text-xs font-bold flex items-center gap-1 cursor-help flex-shrink-0"
            title="Video ini belum pernah ditonton. Tonton sampai selesai untuk membuka fitur lewati."
          >
            <span>🔒 Wajib Ditonton</span>
          </div>
        )}
      </div>

      {/* ── VIDEO WORKSPACE VIEWPORT ── */}
      <div 
        className="relative flex-1 min-h-0 w-full flex items-center justify-center bg-black/90 overflow-hidden cursor-pointer group"
        onClick={(e) => {
          if (!isQuizOpen) handlePlayPause();
        }}
      >
        <video
          ref={videoRef}
          src={videoData.videoSrc}
          playsInline
          className="w-full h-full object-contain pointer-events-none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onDurationChange={handleLoadedMetadata}
          onLoadedData={handleLoadedMetadata}
          onCanPlay={handleLoadedMetadata}
          onSeeking={handleSeeking}
          onEnded={handleVideoEnded}
          onError={() => setVideoLoadError(true)}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Video Load Error Overlay */}
        {videoLoadError && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 z-30 text-center gap-3 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white font-pencil">Gagal Memuat File Video</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Video pembelajaran sedang disiapkan atau terjadi gangguan pemuatan media. Silakan coba muat ulang.
            </p>
            <button
              type="button"
              onClick={() => {
                setVideoLoadError(false);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="mt-1 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Muat Ulang Video</span>
            </button>
          </div>
        )}

        {/* Big Center Play Button Overlay when paused */}
        {!isPlaying && !isQuizOpen && !videoLoadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 animate-fade-in pointer-events-none">
            <div className="p-4 sm:p-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.6)] transform group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Skip Warning Toast */}
        {skipWarning && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{skipWarning}</span>
          </div>
        )}

        {/* ── POPUP KUIS DI DEPAN VIDEO (MODAL GLASSMORPHISM) ── */}
        {isQuizOpen && videoData.quiz && (
          <div 
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 z-40 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl lg:max-w-3xl glass-panel glass-sheen rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-3 shadow-2xl border border-white/40 max-h-full overflow-hidden">
              {/* Quiz Header */}
              <div className="flex items-center justify-between pb-2 border-b border-amber-900/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">{currentActiveQuiz?.emoji || '❓'}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-black text-amber-800 uppercase tracking-wide block">
                        Tantangan Kasus Video
                      </span>
                      {hasMultipleQuestions && (
                        <span className="text-[10px] sm:text-xs font-black bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded-full border border-amber-400/60 shadow-xs">
                          Soal {currentQuestionIdx + 1} dari {questionsList.length}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#2D241E] font-pencil leading-tight">
                      {currentActiveQuiz?.title}
                    </h3>
                  </div>
                </div>

                {currentActiveQuiz?.clue && (
                  <button
                    type="button"
                    onClick={() => setShowClue(prev => !prev)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl glass-btn text-[#78350F] text-xs font-bold hover:bg-amber-100/60"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>{showClue ? 'Tutup Petunjuk' : 'Petunjuk'}</span>
                  </button>
                )}
              </div>

              {/* Clue Box */}
              {showClue && currentActiveQuiz?.clue && (
                <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300 text-xs sm:text-sm text-amber-950 font-bold flex items-start gap-2 animate-fade-in">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{currentActiveQuiz.clue}</span>
                </div>
              )}

              {/* Question Text / Table */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/40 border border-white/60 flex flex-col gap-2">
                {currentActiveQuiz?.table ? (
                  <>
                    <p className="text-sm sm:text-base font-bold text-[#1E293B]">
                      {currentActiveQuiz.prompt || 'Diberikan tabel nilai fungsi berikut:'}
                    </p>

                    <div className="w-full flex justify-center my-0.5 overflow-x-auto">
                      <div className="inline-block border-2 border-amber-900/30 rounded-xl overflow-hidden shadow-sm bg-white/80">
                        <table className="border-collapse text-center text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-amber-200/80 text-amber-950 border-b-2 border-amber-900/30">
                              <th className="px-4 py-1.5 border-r border-amber-900/20 font-black font-pencil text-sm sm:text-base bg-amber-300/60">
                                x
                              </th>
                              {currentActiveQuiz.table.x.map((val, i) => (
                                <th key={i} className="px-4 py-1.5 border-r border-amber-900/20 last:border-r-0 font-mono font-black text-sm sm:text-base">
                                  {val}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white/90 text-[#2D241E]">
                              <td className="px-4 py-1.5 border-r border-amber-900/20 font-black font-pencil text-sm sm:text-base bg-amber-100/70 text-amber-950">
                                f(x)
                              </td>
                              {currentActiveQuiz.table.fx.map((val, i) => (
                                <td key={i} className="px-4 py-1.5 border-r border-amber-900/20 last:border-r-0 font-mono font-black text-amber-900 text-sm sm:text-base">
                                  {val}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-[#1E293B] mt-0.5">
                      {currentActiveQuiz.subQuestion || 'Rumus fungsi f(x) yang tepat adalah...'}
                    </p>
                  </>
                ) : (
                  <p className="text-base sm:text-lg font-bold text-[#1E293B] whitespace-pre-line leading-relaxed">
                    {currentActiveQuiz?.question}
                  </p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {((shuffledVideoOptions && shuffledVideoOptions.length > 0) ? shuffledVideoOptions : (currentActiveQuiz?.options || [])).map((opt, idx) => {
                  const isChosen = selectedOption === opt;
                  const isThisCorrect = opt === currentActiveQuiz.correct;
                  let optStyle = 'glass-btn hover:bg-amber-50 text-[#2D241E] border-white/60';

                  if (quizStatus === 'correct' && isThisCorrect) {
                    optStyle = 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300 shadow-lg';
                  } else if (quizStatus === 'wrong' && isChosen) {
                    optStyle = 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-300';
                  } else if (isChosen) {
                    optStyle = 'bg-amber-200 border-amber-400 text-amber-950';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizStatus === 'correct'}
                      onClick={() => handleQuizAnswer(opt)}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm md:text-base flex items-start justify-between gap-2.5 transition-all cursor-pointer min-h-[64px] ${optStyle}`}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="break-words leading-snug flex-1 min-w-0">{opt}</span>
                      </div>
                      {quizStatus === 'correct' && isThisCorrect && <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />}
                      {quizStatus === 'wrong' && isChosen && <XCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── DEDICATED POPUP FEEDBACK (BENAR / SALAH) ── */}
            {(quizStatus === 'correct' || quizStatus === 'wrong') && (
              <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full max-w-md glass-panel glass-sheen rounded-3xl p-5 sm:p-7 flex flex-col items-center text-center gap-4 shadow-2xl border border-white/60 animate-scale-up">
                  {quizStatus === 'correct' ? (
                    <>
                      {/* Icon Success */}
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>

                      {/* Title */}
                      <div>
                        <span className="text-[11px] sm:text-xs font-black text-emerald-700 uppercase tracking-wider block">
                          Analisis Kasus Tepat!
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] font-pencil leading-tight mt-0.5">
                          Hebat, Jawaban Benar! 🎉
                        </h3>
                      </div>

                      {/* Explanation Box */}
                      <div className="w-full p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-950 text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-line text-left">
                        {currentActiveQuiz?.explanation}
                      </div>

                      {/* Action Button: Lanjut ke Soal Berikutnya / Lanjutkan Segment */}
                      {!isLastQuestion ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentQuestionIdx(prev => prev + 1);
                            setQuizStatus('unanswered');
                            setSelectedOption(null);
                            setIsRetryActive(false);
                            setShowClue(false);
                            if (feedbackAudioRef.current) {
                              feedbackAudioRef.current.pause();
                              feedbackAudioRef.current = null;
                            }
                            setFeedbackSpeaking(false);
                            setFeedbackText('');
                            try { audioEngine.playClick?.(); } catch {}
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                          <span>Lanjut ke Soal Berikutnya ({currentQuestionIdx + 2}/{questionsList.length})</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (onNextSegment) onNextSegment();
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                          <span>{isLastSegment ? 'Selesaikan Chapter' : 'Lanjutkan'}</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Icon Wrong */}
                      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                        <XCircle className="w-10 h-10 text-rose-500" />
                      </div>

                      {/* Title */}
                      <div>
                        <span className="text-[11px] sm:text-xs font-black text-rose-700 uppercase tracking-wider block">
                          Evaluasi Detektif
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] font-pencil leading-tight mt-0.5">
                          Jawaban Belum Tepat 😅
                        </h3>
                      </div>

                      {/* Explanation / Guidance */}
                      <div className="w-full p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200/80 text-rose-950 text-xs sm:text-sm font-bold leading-relaxed text-left">
                        <p>
                          Pilihanmu: <span className="font-black text-rose-700 underline">{selectedOption}</span> belum tepat.
                        </p>
                        <p className="mt-1.5 text-xs text-rose-900/80">
                          Jangan berkecil hati! Pelajari kembali materi lewat video atau selesaikan dengan soal kasus yang baru.
                        </p>
                      </div>

                      {/* Action Menus: Ulangi Video & Beri Soal Baru */}
                      <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 mt-1">
                        <button
                          type="button"
                          onClick={handleReviewVideo}
                          className="w-full sm:flex-1 py-2.5 sm:py-3 px-3 rounded-2xl glass-btn text-[#78350F] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 hover:bg-amber-100/90 active:scale-95 transition-all cursor-pointer border border-amber-300"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Ulangi Video</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleGiveNewQuestion}
                          className="w-full sm:flex-1 py-2.5 sm:py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCw className="w-4 h-4" />
                          <span>Beri Soal Baru</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── RESTRICTED CONTROLS BAR (PLAY, RESTART, MUNDUR 5s, TIMELINE) ── */}
      {/* Sembunyikan kontrol video saat mode kuis aktif */}
      {!isQuizOpen && (
        <div 
          className="px-3 sm:px-5 py-2.5 bg-black/70 border-t border-white/10 z-30 flex flex-col gap-1.5 flex-shrink-0 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Timeline bar (Restricted to backwards / watched territory only) */}
          <div 
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="relative w-full h-2.5 sm:h-3 bg-slate-900/90 hover:bg-slate-800 rounded-full border border-white/25 overflow-hidden cursor-pointer transition-colors shadow-inner"
            title={canFreelySeek ? "Klik bagian mana saja pada garis waktu untuk melompat" : "Klik untuk memundurkan video (tidak bisa melompat ke depan sebelum ditonton penuh)"}
          >
            {/* Current progress fill (Kuning Emas Terang & Menyala) */}
            <div 
              ref={progressFillRef}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ 
                width: `${progressPercent}%`,
                minWidth: currentTime > 0 ? '8px' : '0px',
                backgroundColor: '#F59E0B',
                backgroundImage: 'linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #FDE047 100%)',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.9), 0 0 20px rgba(253, 224, 71, 0.6)'
              }}
            />
            {/* Playhead indicator dot */}
            {currentTime > 0 && (
              <div 
                ref={progressDotRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-300 border-2 border-white shadow-md pointer-events-none"
                style={{ left: `${progressPercent}%` }}
              />
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Left Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={handlePlayPause}
                className="p-1.5 sm:p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md transition-all active:scale-90 cursor-pointer"
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
              </button>

              {/* Restart Video */}
              <button
                type="button"
                onClick={handleRestart}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90 cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Restart Video dari Detik 0"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Restart</span>
              </button>

              {/* Mundur 5 Detik */}
              <button
                type="button"
                onClick={handleRewind5s}
                className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90 cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Mundur 5 Detik"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>-5s</span>
              </button>

              {/* Maju 10 Detik (Hanya aktif jika sudah pernah ditonton) */}
              <button
                type="button"
                onClick={() => {
                  if (!canFreelySeek) {
                    try { audioEngine.playError?.(); } catch {}
                    setSkipWarning('🔒 Selesaikan menonton video ini terlebih dahulu sebelum bisa memajukan!');
                    setTimeout(() => setSkipWarning(null), 3500);
                    return;
                  }
                  if (!videoRef.current) return;
                  setupAudioContext();
                  const newTime = Math.min(effectiveDuration, videoRef.current.currentTime + 10);
                  videoRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                  try { audioEngine.playClick?.(); } catch {}
                }}
                className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl transition-all active:scale-90 flex items-center gap-1 text-xs font-bold ${
                  canFreelySeek
                    ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
                title={canFreelySeek ? "Maju 10 Detik" : "Fitur maju terkunci sampai video selesai ditonton"}
              >
                <span>+10s</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Time display */}
              <span className="text-xs sm:text-sm font-mono font-bold text-amber-200 ml-1">
                {formatTime(currentTime)} / {formatTime(effectiveDuration)}
              </span>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Volume Toggle */}
              <button
                type="button"
                onClick={handleVolumeToggle}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
