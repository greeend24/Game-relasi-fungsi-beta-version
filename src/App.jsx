import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import MainMenu from './components/MainMenu';
import StageSelector from './components/StageSelector';
import QuestModeSelector from './components/QuestModeSelector';
import QuestModeExam from './components/games/QuestModeExam';
import SettingsModal from './components/SettingsModal';
import LeaderboardModal from './components/LeaderboardModal';
import SubbabInfoModal from './components/SubbabInfoModal';
import BadgesModal from './components/BadgesModal';
import AvatarModal from './components/AvatarModal';
import RankModal from './components/RankModal';
import AchievementUnlockedModal from './components/AchievementUnlockedModal';
import LoadingScreen from './components/LoadingScreen';
import AnimatedBackground from './components/AnimatedBackground';

import ChapterLearning from './components/ChapterLearning';
import EndlessMode from './components/games/EndlessMode';

import { audioEngine } from './services/audioEngine';
import { storageService } from './services/storageService';
import { securityLockoutService } from './services/securityLockoutService';
import SecurityLockoutModal from './components/SecurityLockoutModal';
import StrikeWarningModal from './components/StrikeWarningModal';
import { CHAPTERS_DATA } from './data/chapterLearningData';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import RotatePhoneOverlay from './components/RotatePhoneOverlay';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [viewState, setViewState] = useState('AUTH'); // AUTH, MAIN_MENU, STAGE_SELECT, LEARNING, ENDLESS, QUEST_SELECT, QUEST_EXAM
  const [currentSubbabId, setCurrentSubbabId] = useState(1);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const [questSubbabId, setQuestSubbabId] = useState(1);

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

  // Monitor Tab Switch (visibilitychange) and Window Blur
  useEffect(() => {
    const handleVisibilityOrBlur = (e) => {
      // Only monitor when user is logged in & not on initial loading
      if (!currentUser || viewState === 'AUTH' || isLoading) return;

      // Whitelist admin account fikran02 so they never get strike warnings or lockouts
      if (isUserAdminExempt(currentUser)) return;

      const isHidden = document.hidden || (e && e.type === 'blur');
      if (isHidden) {
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
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrBlur);
    window.addEventListener('blur', handleVisibilityOrBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityOrBlur);
      window.removeEventListener('blur', handleVisibilityOrBlur);
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

  // 16:9 Virtual Canvas (1920x1080) Uniform Scale Factor
  // Guarantees pixel-perfect identical layout on mobile landscape & non-fullscreen window sizes
  const [gameScale, setGameScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      return Math.min(vw / 1920, vh / 1080);
    }
    return 1;
  });

  useEffect(() => {
    const updateGameScale = () => {
      if (typeof window === 'undefined') return;
      const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      const scale = Math.min(vw / 1920, vh / 1080);
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
    } else if (viewState === 'LEARNING' || viewState === 'QUEST_EXAM' || viewState === 'ENDLESS') {
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

  // No longer needed — ChapterLearning is rendered directly

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
        {/* PERSISTENT CONTINUOUS BACKGROUND: SKY, CLOUDS & LEAVES NEVER RESET OR UNMOUNT ACROSS SECTIONS */}
        <AnimatedBackground 
          hideBottomLandscape={viewState === 'STAGE_SELECT' || viewState === 'GAME' || viewState === 'MAIN_MENU' || viewState === 'AUTH' || viewState === 'QUEST_SELECT' || viewState === 'QUEST_EXAM' || viewState === 'ENDLESS'} 
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

        {/* RELO'S ISLAND BACKGROUND FOR CHAPTER MODE (STAGE SELECTION & ACTIVE STAGE GAMEPLAY) */}
        {(viewState === 'STAGE_SELECT' || viewState === 'LEARNING') && (
          <img 
            src="/game asset/relo_island.png" 
            alt="Relo Island Background" 
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
          />
        )}

        <main className="flex-1 w-full h-full flex flex-col min-h-0 overflow-hidden relative z-10">
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
            currentSubbabId={currentSubbabId}
            setCurrentSubbabId={setCurrentSubbabId}
            onSelectChapter={handleSelectChapter}
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
      </main>

      {/* Global Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onCheatApplied={handleCheatApplied}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <RankModal
        isOpen={isRankOpen}
        onClose={() => setIsRankOpen(false)}
        currentUser={currentUser}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        currentUser={currentUser}
      />

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
      </div>
    </div>
  </>
  );
}
