import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import AuthScreen from './components/AuthScreen';
import MainMenu from './components/MainMenu';
import StageSelector from './components/StageSelector';
import QuestModeSelector from './components/QuestModeSelector';
import SettingsModal from './components/SettingsModal';
import SubbabInfoModal from './components/SubbabInfoModal';
import AvatarModal from './components/AvatarModal';
import AchievementUnlockedModal from './components/AchievementUnlockedModal';
import LoadingScreen from './components/LoadingScreen';
import GameTransitionLoader from './components/GameTransitionLoader';
import AnimatedBackground from './components/AnimatedBackground';

// Code-splitting via React.lazy for heavy game modes & secondary modals
const ChapterLearning = lazy(() => import('./components/ChapterLearning'));
const EndlessMode = lazy(() => import('./components/games/EndlessMode'));
const QuestModeExam = lazy(() => import('./components/games/QuestModeExam'));
const ChapterExercise = lazy(() => import('./components/games/ChapterExercise'));
const LeaderboardModal = lazy(() => import('./components/LeaderboardModal'));
const BadgesModal = lazy(() => import('./components/BadgesModal'));
const RankModal = lazy(() => import('./components/RankModal'));

import { audioEngine } from './services/audioEngine';
import { storageService } from './services/storageService';
import { securityLockoutService } from './services/securityLockoutService';
import { reloVoiceService } from './services/reloVoiceService';
import SecurityLockoutModal from './components/SecurityLockoutModal';
import StrikeWarningModal from './components/StrikeWarningModal';
import { CHAPTERS_DATA } from './data/chapterLearningData';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import RotatePhoneOverlay from './components/RotatePhoneOverlay';

// Active gameplay modes that require tab-switch anti-cheat monitoring
// Main menu, stage select, quest select, settings, profile, and modals are completely exempt from lockout
const ACTIVE_GAMEPLAY_MODES = ['LEARNING', 'ENDLESS', 'QUEST_EXAM'];
const GRACE_PERIOD_MS = 1500; // 1.5 seconds grace period tolerance for accidental blur / OS notifications

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [viewState, setViewState] = useState('AUTH'); // AUTH, MAIN_MENU, STAGE_SELECT, LEARNING, ENDLESS, QUEST_SELECT, QUEST_EXAM
  const [currentSubbabId, setCurrentSubbabId] = useState(1);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const [questSubbabId, setQuestSubbabId] = useState(1);
  const [selectedExerciseChapterId, setSelectedExerciseChapterId] = useState(1);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isRankOpen, setIsRankOpen] = useState(false);
  const [isSubbabInfoOpen, setIsSubbabInfoOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null);

  // Anti-Cheat / Tab-Switch Lockout State
  const [lockoutState, setLockoutState] = useState(() => securityLockoutService.checkStatus());
  const [warningStrikes, setWarningStrikes] = useState(0);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const violationTimerRef = useRef(null);

  // Subscribe to Security Lockout Service
  useEffect(() => {
    const unsubscribe = securityLockoutService.subscribe((status) => {
      setLockoutState(status);
      if (status.isLocked) {
        setIsWarningOpen(false);
      }
    });
    return unsubscribe;
  }, []);

  // Ensure previous screen's voice stops cleanly when navigating away
  useEffect(() => {
    return () => {
      try {
        reloVoiceService.stopVoice();
      } catch {}
    };
  }, [viewState]);

  // Check if current user is admin / whitelisted from strike warnings
  const isUserAdminExempt = (user) => {
    if (!user) return false;
    if (user.isAdmin) return true;
    const u = (user.username || user.name || user.fullname || '').toLowerCase().trim();
    return u === 'fikran02' || u === 'fikran' || u === 'admin';
  };

  // Automatically clear any legacy strikes / lockout if logged in as admin
  useEffect(() => {
    if (isUserAdminExempt(currentUser)) {
      securityLockoutService.clearLockout();
      setLockoutState({ isLocked: false, remainingSeconds: 0, strikes: 0, justLocked: false });
      setWarningStrikes(0);
      setIsWarningOpen(false);
    }
  }, [currentUser]);

  // Monitor Tab Switch (visibilitychange) and Window Blur with 1.5s Grace Period
  // Strictly active ONLY during active exam / gameplay modes: LEARNING, ENDLESS, QUEST_EXAM
  // Main Menu, Stage Selector, Quest Selector, Settings, Badges, and Profile are completely exempt!
  useEffect(() => {
    // Clear any existing timer when switching views or unmounting
    if (violationTimerRef.current) {
      clearTimeout(violationTimerRef.current);
      violationTimerRef.current = null;
    }

    // Only monitor when user is logged in, not loading, and in an ACTIVE gameplay mode
    if (!currentUser || isLoading || viewState === 'AUTH') return;
    if (!ACTIVE_GAMEPLAY_MODES.includes(viewState)) return;

    // Whitelist admin account fikran02 so they never get strike warnings or lockouts
    if (isUserAdminExempt(currentUser)) return;

    const cancelGraceTimer = () => {
      if (violationTimerRef.current) {
        clearTimeout(violationTimerRef.current);
        violationTimerRef.current = null;
      }
    };

    const triggerViolation = () => {
      const result = securityLockoutService.recordViolation(currentUser);
      if (result.justLocked) {
        setLockoutState(result);
        setIsWarningOpen(false);
        try { audioEngine.playPenalty(); } catch {}
      } else if (result.strikes === 1 || result.strikes === 2) {
        setWarningStrikes(result.strikes);
        setIsWarningOpen(true);
        try { audioEngine.playWarning(); } catch {}
      }
    };

    const handlePotentialViolation = (e) => {
      // Prioritize document.hidden:
      // If the user actually leaves or minimizes the tab/app, document.hidden is immediately true.
      // If window.blur fired without document.hidden, it is usually an OS notification, system dialog, or flyout.
      // We start a 1.5s grace period timer, and verify document.hidden upon expiry to prevent false positives.
      if (document.hidden) {
        if (!violationTimerRef.current) {
          violationTimerRef.current = setTimeout(() => {
            // Check again after 1.5s grace period: only penalize if still hidden
            if (document.hidden) {
              triggerViolation();
            }
            violationTimerRef.current = null;
          }, GRACE_PERIOD_MS);
        }
      } else if (e && e.type === 'blur') {
        // Window blur occurred while document is not hidden (e.g. OS notification, system popup).
        // Start 1.5s grace period. If within/after 1.5s document actually became hidden, record violation.
        // If document is STILL NOT hidden after 1.5s (meaning it was just an OS notification), do not penalize!
        if (!violationTimerRef.current) {
          violationTimerRef.current = setTimeout(() => {
            if (document.hidden) {
              triggerViolation();
            }
            violationTimerRef.current = null;
          }, GRACE_PERIOD_MS);
        }
      }
    };

    const handleVisibilityChange = (e) => {
      if (document.hidden) {
        handlePotentialViolation(e);
      } else {
        // User returned to game tab within grace period -> cancel timer, no strike!
        cancelGraceTimer();
      }
    };

    const handleFocus = () => {
      // Window regained focus -> cancel timer immediately, no strike!
      cancelGraceTimer();
    };

    const handleBlur = (e) => {
      handlePotentialViolation(e);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      cancelGraceTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [currentUser, viewState, isLoading]);

  // Global Mobile Touch & Hold Glow Listener
  // Ensures all interactive elements (buttons, islands, mascots, avatars, rank badges, image buttons)
  // glow brightly when touched or held down on touchscreens!
  useEffect(() => {
    let activeElements = [];
    let clearTimer = null;

    const clearGlow = () => {
      activeElements.forEach((el) => {
        try {
          el.classList.remove('is-touched', 'is-active');
        } catch {}
      });
      activeElements = [];
    };

    const handleTouchStart = (e) => {
      if (clearTimer) {
        clearTimeout(clearTimer);
        clearTimer = null;
      }
      clearGlow();

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const interactive = target.closest(
        '.mode-btn, .island-group, .image-btn, .clean-icon-btn, .round-btn, .avatar-btn, .rank-btn, .icon-btn, .pencil-btn, [role="button"], button'
      );

      if (interactive) {
        interactive.classList.add('is-touched', 'is-active');
        activeElements.push(interactive);

        // Also add to any child img, island or mascot elements
        const childImages = interactive.querySelectorAll('img, .mode-btn-img, .mode-mascot-img, .quest-island-img, .chapter-island-img, .endless-island-img, .snowy-mascot, .relo-mascot, .ryu-mascot');
        childImages.forEach((img) => {
          img.classList.add('is-touched', 'is-active');
          activeElements.push(img);
        });
      } else {
        if (
          target.classList.contains('mode-btn-img') ||
          target.classList.contains('mode-mascot-img') ||
          target.classList.contains('quest-island-img') ||
          target.classList.contains('chapter-island-img') ||
          target.classList.contains('endless-island-img') ||
          target.classList.contains('snowy-mascot') ||
          target.classList.contains('relo-mascot') ||
          target.classList.contains('ryu-mascot') ||
          target.classList.contains('instructor-glow-snowy') ||
          target.classList.contains('instructor-glow-relo') ||
          target.classList.contains('instructor-glow-ryu')
        ) {
          target.classList.add('is-touched', 'is-active');
          activeElements.push(target);
        }
      }
    };

    const handleTouchEnd = () => {
      // Keep glow on for 150ms after touch release for tactile feedback
      if (clearTimer) clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        clearGlow();
      }, 150);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (clearTimer) clearTimeout(clearTimer);
    };
  }, []);

  // Portrait Orientation State for Mobile Device Warning Overlay
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth && window.innerWidth < 1024;
    }
    return false;
  });
  const [dismissPortraitWarning, setDismissPortraitWarning] = useState(false);

  // Monitor Window Resize & Device Orientation for Portrait Detection
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portrait = vh > vw && vw < 1024;
      setIsPortrait(portrait);
      if (!portrait) {
        setDismissPortraitWarning(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // 16:9 Virtual Canvas (1280x720 Nintendo Switch-style HD Base)
  // Guarantees pixel-perfect identical layout on mobile landscape & non-fullscreen window sizes
  const BASE_STAGE_WIDTH = 1280;
  const BASE_STAGE_HEIGHT = 720;

  const [gameScale, setGameScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      return Math.min(vw / BASE_STAGE_WIDTH, vh / BASE_STAGE_HEIGHT);
    }
    return 1;
  });

  useEffect(() => {
    const updateGameScale = () => {
      if (typeof window === 'undefined') return;
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      const scale = Math.min(vw / BASE_STAGE_WIDTH, vh / BASE_STAGE_HEIGHT);
      setGameScale(scale);
      document.documentElement.style.setProperty('--game-scale', String(scale));
    };

    updateGameScale();
    window.addEventListener('resize', updateGameScale);
    window.addEventListener('orientationchange', updateGameScale);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateGameScale);
    }

    return () => {
      window.removeEventListener('resize', updateGameScale);
      window.removeEventListener('orientationchange', updateGameScale);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateGameScale);
      }
    };
  }, []);

  // Lock Screen Orientation to Landscape on Mobile (Capacitor & Web)
  useEffect(() => {
    const lockLandscape = async () => {
      try {
        if (typeof ScreenOrientation !== 'undefined' && ScreenOrientation.lock) {
          await ScreenOrientation.lock({ orientation: 'landscape' });
        } else if (typeof window !== 'undefined' && window.screen?.orientation?.lock) {
          await window.screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (err) {
        // Graceful fallback
      }
    };
    lockLandscape();
  }, []);

  // Initial user session load
  useEffect(() => {
    const lastUser = storageService.getCurrentUser();
    if (lastUser) {
      setCurrentUser(lastUser);
      setViewState('MAIN_MENU');
    }
  }, []);

  // Play BGM when view state changes
  useEffect(() => {
    if (isLoading) return;

    if (viewState === 'AUTH') {
      audioEngine.toggleBgm(true);
    } else if (viewState === 'MAIN_MENU' || viewState === 'STAGE_SELECT' || viewState === 'QUEST_SELECT') {
      audioEngine.toggleBgm(true);
    } else if (viewState === 'LEARNING' || viewState === 'QUEST_EXAM' || viewState === 'ENDLESS' || viewState === 'CHAPTER_EXERCISE') {
      // In-game components manage their own BGM or keep main BGM playing
    }
  }, [viewState, isLoading]);

  // Authentication Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setViewState('MAIN_MENU');
  };

  // Active Play Time Tracker (Heartbeat to backend for analytics tracking)
  useEffect(() => {
    if (!currentUser || currentUser._isGuest || viewState === 'AUTH') return;

    const interval = setInterval(() => {
      if (!document.hidden) {
        import('./services/apiService.js').then(({ recordPlayTime }) => {
          recordPlayTime(30, currentUser.username).catch(() => {});
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentUser, viewState]);

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    setViewState('AUTH');
  };

  // Main Menu Handlers
  const handleEnterChapterSelect = () => {
    setViewState('STAGE_SELECT');
  };
  const handleNewGame = handleEnterChapterSelect;
  const handleLoadGame = handleEnterChapterSelect;

  // Chapter Selector Handlers
  const handleSelectChapter = (chapterId) => {
    setCurrentSubbabId(chapterId);
    setViewState('LEARNING');
  };

  // Segment Completion Handler (Persists each completed slide/segment immediately)
  const handleSegmentComplete = (chapterId, segmentNum, scoreEarned = 10) => {
    const baseUser = storageService.getCurrentUser() || currentUser;
    if (!baseUser) return;

    const chapterKey = `chapter${chapterId}`;
    const chapter = CHAPTERS_DATA[chapterId];
    const totalSegs = chapter?.totalSegments || 10;
    const isChComplete = segmentNum >= totalSegs;

    const existingCh = baseUser.progress?.[chapterKey] || {};
    const prevSegs = existingCh.completedSegments || 0;
    const newSegs = Math.max(prevSegs, segmentNum);

    const updatedStars = { ...(existingCh.stars || {}) };
    for (let s = 1; s <= newSegs; s++) {
      if (!updatedStars[String(s)]) {
        updatedStars[String(s)] = 3;
      }
    }

    const updatedProgress = {
      ...(baseUser.progress || {}),
      [chapterKey]: {
        ...existingCh,
        unlocked: true,
        completedSegments: newSegs,
        completed: isChComplete || Boolean(existingCh.completed),
        currentStage: Math.min(newSegs + 1, totalSegs),
        stars: updatedStars,
      },
      [`subbab${chapterId}`]: {
        unlocked: true,
        currentStage: Math.min(newSegs + 1, totalSegs),
        stars: updatedStars,
        isStage21Completed: isChComplete || Boolean(existingCh.completed),
      }
    };

    // If chapter completed, unlock next chapter
    if (isChComplete && chapterId < Object.keys(CHAPTERS_DATA).length) {
      const nextKey = `chapter${chapterId + 1}`;
      updatedProgress[nextKey] = {
        ...(baseUser.progress?.[nextKey] || { completedSegments: 0 }),
        unlocked: true,
      };
      updatedProgress[`subbab${chapterId + 1}`] = {
        ...(baseUser.progress?.[`subbab${chapterId + 1}`] || {}),
        unlocked: true,
      };
    }

    const currentTotalScore = Number(baseUser.totalScore) || 0;
    const scoreToAdd = segmentNum > prevSegs ? scoreEarned : 0;
    const updatedUser = {
      ...baseUser,
      totalScore: currentTotalScore + scoreToAdd,
      progress: updatedProgress,
    };

    setCurrentUser(updatedUser);
    storageService.saveUser(updatedUser);

    // Call storageService.updateProgress to sync with SQLite backend in background
    if (!baseUser._isGuest) {
      storageService.updateProgress(chapterKey, segmentNum, scoreToAdd, 3).catch(err => {
        console.warn('Backend segment update failed:', err);
      });
    }

    return updatedUser;
  };

  // Chapter Learning Complete Handler
  const handleChapterComplete = (chapterId, advanceToNext = false) => {
    const baseUser = storageService.getCurrentUser() || currentUser;
    if (!baseUser) return;

    const chapterKey = `chapter${chapterId}`;
    const chapter = CHAPTERS_DATA[chapterId];
    if (!chapter) return;

    const totalSegs = chapter.totalSegments;
    handleSegmentComplete(chapterId, totalSegs, advanceToNext ? 0 : 100);

    // Advance to next chapter if requested
    if (advanceToNext && chapterId < Object.keys(CHAPTERS_DATA).length) {
      const nextChapterId = chapterId + 1;
      setCurrentSubbabId(nextChapterId);
      setViewState('LEARNING');
    }
  };

  // No longer needed : ChapterLearning is rendered directly

  const handleCheatApplied = (updatedUser) => {
    setCurrentUser(updatedUser);
    setViewState('STAGE_SELECT');
  };

  if (isLoading) {
    return (
      <>
        {isPortrait && !dismissPortraitWarning && (
          <RotatePhoneOverlay 
            onEnterFullscreen={() => setDismissPortraitWarning(true)} 
            onDismiss={() => setDismissPortraitWarning(true)}
          />
        )}
        <div className="game-viewport-container">
          <div 
            className="game-stage-16-9"
            style={{
              transform: `translate(-50%, -50%) scale(${gameScale})`,
              '--game-scale': gameScale,
            }}
          >
            <LoadingScreen onFinish={() => setIsLoading(false)} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isPortrait && !dismissPortraitWarning && (
        <RotatePhoneOverlay 
          onEnterFullscreen={() => setDismissPortraitWarning(true)} 
          onDismiss={() => setDismissPortraitWarning(true)}
        />
      )}
      <div className="game-viewport-container">
        <div 
          className="game-stage-16-9 font-sans select-none bg-[#FAF7F2]"
          style={{
            transform: `translate(-50%, -50%) scale(${gameScale})`,
            '--game-scale': gameScale,
          }}
        >
        {/* PERSISTENT CONTINUOUS BACKGROUND: SKY, CLOUDS & LEAVES */}
        {viewState !== 'QUEST_EXAM' && (
          <AnimatedBackground 
            hideBottomLandscape={viewState === 'STAGE_SELECT' || viewState === 'LEARNING' || viewState === 'GAME' || viewState === 'MAIN_MENU' || viewState === 'AUTH' || viewState === 'QUEST_SELECT' || viewState === 'QUEST_EXAM' || viewState === 'ENDLESS' || viewState === 'CHAPTER_EXERCISE'} 
            hideBirds={true} 
            hideClouds={false} 
            isQuestMode={viewState === 'QUEST_SELECT' || viewState === 'QUEST_EXAM'}
            isEndlessMode={viewState === 'ENDLESS'}
            particleType={
              viewState === 'QUEST_SELECT' || viewState === 'QUEST_EXAM'
                ? 'snowflake'
                : viewState === 'ENDLESS'
                ? 'ember'
                : 'leaf'
            }
          />
        )}

        {/* RELO'S ISLAND BACKGROUND FOR CHAPTER MODE (STAGE SELECTION & ACTIVE STAGE GAMEPLAY) */}
        {(viewState === 'STAGE_SELECT' || viewState === 'LEARNING' || viewState === 'CHAPTER_EXERCISE') && (
          <img 
            src="/game asset/relo_island.png" 
            alt="Relo Island Background" 
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
          />
        )}

        <main className="flex-1 w-full h-full flex flex-col min-h-0 overflow-hidden relative z-10">
          <Suspense fallback={
            <GameTransitionLoader 
              title="Membuka Berkas Kasus..." 
              subtitle="Detektif Relo sedang menyiapkan petunjuk..." 
            />
          }>
            {viewState === 'AUTH' && (
              <AuthScreen onLoginSuccess={handleLoginSuccess} />
            )}

            {viewState === 'MAIN_MENU' && (
              <MainMenu
                currentUser={currentUser}
                isAnyModalOpen={isSettingsOpen || isLeaderboardOpen || isRankOpen || isBadgesOpen || isAvatarOpen || isSubbabInfoOpen || Boolean(newBadgeUnlocked) || isWarningOpen || lockoutState.isLocked}
                onNewGame={handleNewGame}
                onLoadGame={handleLoadGame}
                onStartQuest={() => setViewState('QUEST_SELECT')}
                onStartEndless={() => setViewState('ENDLESS')}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
                onOpenRank={() => setIsRankOpen(true)}
                onOpenBadges={() => setIsBadgesOpen(true)}
                onOpenAvatar={() => setIsAvatarOpen(true)}
                onLogout={handleLogout}
              />
            )}

            {viewState === 'STAGE_SELECT' && (
              <StageSelector
                userProgress={currentUser?.progress}
                currentUser={currentUser}
                currentSubbabId={currentSubbabId}
                setCurrentSubbabId={setCurrentSubbabId}
                onSelectChapter={handleSelectChapter}
                onSelectExercise={(chId) => {
                  setSelectedExerciseChapterId(chId);
                  setViewState('CHAPTER_EXERCISE');
                }}
                onBackToMenu={() => setViewState('MAIN_MENU')}
                onOpenSubbabInfo={() => setIsSubbabInfoOpen(true)}
              />
            )}

            {viewState === 'QUEST_SELECT' && (
              <QuestModeSelector
                userProgress={currentUser?.progress}
                currentUser={currentUser}
                onBackToMenu={() => setViewState('MAIN_MENU')}
                onStartQuestSubbab={(subId) => {
                  setQuestSubbabId(subId);
                  setViewState('QUEST_EXAM');
                }}
              />
            )}

            {viewState === 'QUEST_EXAM' && (
              <QuestModeExam
                subbabId={questSubbabId}
                currentUser={currentUser}
                onBackToQuestSelect={() => setViewState('QUEST_SELECT')}
              />
            )}

            {viewState === 'LEARNING' && (
              <ChapterLearning
                key={currentSubbabId}
                chapterId={currentSubbabId}
                currentUser={currentUser}
                onBack={() => setViewState('STAGE_SELECT')}
                onBackToMenu={() => setViewState('MAIN_MENU')}
                onChapterComplete={handleChapterComplete}
                onSegmentComplete={handleSegmentComplete}
              />
            )}

            {viewState === 'ENDLESS' && (
              <EndlessMode
                onBackToMenu={() => setViewState('MAIN_MENU')}
                currentUser={currentUser}
                onUpdateUser={(usr) => setCurrentUser(usr)}
              />
            )}

            {viewState === 'CHAPTER_EXERCISE' && (
              <ChapterExercise
                chapterId={selectedExerciseChapterId}
                currentUser={currentUser}
                onBackToStageSelect={() => {
                  const updatedUser = storageService.getCurrentUser();
                  if (updatedUser) setCurrentUser(updatedUser);
                  setViewState('STAGE_SELECT');
                }}
                onCompleteExercise={(chId) => {
                  const updatedUser = storageService.getCurrentUser();
                  if (updatedUser) setCurrentUser(updatedUser);
                }}
              />
            )}
          </Suspense>
        </main>

        {/* Global Modals */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onCheatApplied={handleCheatApplied}
        />

        <Suspense fallback={null}>
          {isLeaderboardOpen && (
            <LeaderboardModal
              isOpen={isLeaderboardOpen}
              onClose={() => setIsLeaderboardOpen(false)}
            />
          )}

          {isRankOpen && (
            <RankModal
              isOpen={isRankOpen}
              onClose={() => setIsRankOpen(false)}
              currentUser={currentUser}
            />
          )}

          {isBadgesOpen && (
            <BadgesModal
              isOpen={isBadgesOpen}
              onClose={() => setIsBadgesOpen(false)}
              currentUser={currentUser}
            />
          )}
        </Suspense>

      <AvatarModal
        isOpen={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        currentUser={currentUser}
        onAvatarSelected={(updatedUser) => setCurrentUser(updatedUser)}
      />

      <SubbabInfoModal
        isOpen={isSubbabInfoOpen}
        onClose={() => setIsSubbabInfoOpen(false)}
        subbabData={CHAPTERS_DATA[currentSubbabId]}
      />

      <AchievementUnlockedModal
        badge={newBadgeUnlocked}
        onClose={() => setNewBadgeUnlocked(null)}
      />

      {/* 5-Minute Anti-Cheat Cooldown Lockout Modal */}
      {!isUserAdminExempt(currentUser) && (
        <SecurityLockoutModal
          isLocked={lockoutState.isLocked}
          remainingSeconds={lockoutState.remainingSeconds}
          onUnlocked={() => {
            setLockoutState({ isLocked: false, remainingSeconds: 0, strikes: 0 });
            setIsWarningOpen(false);
          }}
        />
      )}

      {/* Strike 1 & 2 Warning Modal */}
      {!isUserAdminExempt(currentUser) && (
        <StrikeWarningModal
          isOpen={isWarningOpen && !lockoutState.isLocked}
          strikes={warningStrikes}
          onClose={() => setIsWarningOpen(false)}
        />
      )}

      {/* Global Corner Version Badge (v1.0.0) */}
      {['AUTH', 'MAIN_MENU', 'STAGE_SELECT', 'QUEST_SELECT'].includes(viewState) && (
        <div className="absolute bottom-2.5 right-3.5 sm:bottom-3.5 sm:right-5 z-40 pointer-events-none select-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/75 backdrop-blur-md border border-amber-300/80 text-[10px] sm:text-xs font-mono font-black text-[#78350F] shadow-[0_4px_16px_rgba(180,83,9,0.12)] tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span>v1.0.0</span>
          </div>
        </div>
      )}
      </div>
    </div>
  </>
  );
}
