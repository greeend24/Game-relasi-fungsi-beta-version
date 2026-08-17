import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthScreen from './components/AuthScreen';
import MainMenu from './components/MainMenu';
import StageSelector from './components/StageSelector';
import QuestModeSelector from './components/QuestModeSelector';
import QuestModeExam from './components/games/QuestModeExam';
import SettingsModal from './components/SettingsModal';
import LeaderboardModal from './components/LeaderboardModal';
import SubbabInfoModal from './components/SubbabInfoModal';
import BadgesModal from './components/BadgesModal';
import AchievementUnlockedModal from './components/AchievementUnlockedModal';
import LoadingScreen from './components/LoadingScreen';
import YouTubeAudioPlayer from './components/YouTubeAudioPlayer';
import AnimatedBackground from './components/AnimatedBackground';

import Subbab1Relasi from './components/games/Subbab1Relasi';
import Subbab2FormatRelasi from './components/games/Subbab2FormatRelasi';
import Subbab3PengertianFungsi from './components/games/Subbab3PengertianFungsi';
import Subbab4UnsurFungsi from './components/games/Subbab4UnsurFungsi';
import Subbab5RumusFungsi from './components/games/Subbab5RumusFungsi';
import Subbab6Korespondensi from './components/games/Subbab6Korespondensi';
import Subbab7JenisFungsi from './components/games/Subbab7JenisFungsi';
import Stage21Conclusion from './components/Stage21Conclusion';
import EndlessMode from './components/games/EndlessMode';

import { storageService } from './services/storageService';
import { SUBBABS_DATA } from './data/casesData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [viewState, setViewState] = useState('AUTH'); // AUTH, MAIN_MENU, STAGE_SELECT, GAME, ENDLESS, QUEST_SELECT, QUEST_EXAM
  const [currentSubbabId, setCurrentSubbabId] = useState(1);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const [questSubbabId, setQuestSubbabId] = useState(1);
  
  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isSubbabInfoOpen, setIsSubbabInfoOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null);

  useEffect(() => {
    const user = storageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setViewState('MAIN_MENU');
      try { audioEngine.toggleBgm(true); } catch {}
    }
  }, []);

  // Global listener to ensure Menu BGM auto-plays on user interaction without opening settings
  useEffect(() => {
    const handleAutoPlayInteraction = () => {
      if (currentUser && viewState !== 'AUTH' && viewState !== 'QUEST_EXAM') {
        if (!audioEngine.isPlayingBgm && !audioEngine.isQuestBattleActive) {
          try { audioEngine.toggleBgm(true); } catch {}
        }
      }
    };

    window.addEventListener('click', handleAutoPlayInteraction);
    window.addEventListener('touchstart', handleAutoPlayInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleAutoPlayInteraction);
      window.removeEventListener('touchstart', handleAutoPlayInteraction);
    };
  }, [currentUser, viewState]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setViewState('MAIN_MENU');
    try { audioEngine.toggleBgm(true); } catch {}
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    setViewState('AUTH');
    try { audioEngine.stopBgm(); } catch {}
  };

  const handleNewGame = () => {
    setCurrentSubbabId(null);
    setViewState('STAGE_SELECT');
  };

  const handleLoadGame = () => {
    setViewState('STAGE_SELECT');
  };

  const handleSelectStage = (subbabId, stageNum) => {
    setCurrentSubbabId(subbabId);
    setCurrentStageNum(stageNum);
    setViewState('GAME');
  };

  const handleStageComplete = (subbabKey, stageNum, scoreEarned, starsEarned) => {
    const res = storageService.updateProgress(subbabKey, stageNum, scoreEarned, starsEarned);
    if (res && res.user) {
      setCurrentUser(res.user);
      if (res.newBadges && res.newBadges.length > 0) {
        setNewBadgeUnlocked(res.newBadges[0]);
      }
    }
  };

  const handleNextStage = () => {
    if (currentStageNum < 21) {
      setCurrentStageNum(currentStageNum + 1);
    } else {
      if (currentSubbabId < 7) {
        setCurrentSubbabId(currentSubbabId + 1);
        setCurrentStageNum(1);
        setViewState('STAGE_SELECT');
      } else {
        setViewState('STAGE_SELECT');
      }
    }
  };

  const renderActiveGameComponent = () => {
    if (currentStageNum === 21) {
      return (
        <Stage21Conclusion
          subbabId={currentSubbabId}
          onStageComplete={handleStageComplete}
          onBackToStages={() => setViewState('STAGE_SELECT')}
          onNextSubbab={() => {
            if (currentSubbabId < 7) {
              setCurrentSubbabId(currentSubbabId + 1);
              setCurrentStageNum(1);
              setViewState('STAGE_SELECT');
            } else {
              setViewState('STAGE_SELECT');
            }
          }}
        />
      );
    }

    const commonProps = {
      stageNum: currentStageNum,
      onStageComplete: handleStageComplete,
      onBackToStages: () => setViewState('STAGE_SELECT'),
      onNextStage: handleNextStage,
      onOpenSubbabInfo: () => setIsSubbabInfoOpen(true)
    };

    switch (currentSubbabId) {
      case 1: return <Subbab1Relasi {...commonProps} />;
      case 2: return <Subbab2FormatRelasi {...commonProps} />;
      case 3: return <Subbab3PengertianFungsi {...commonProps} />;
      case 4: return <Subbab4UnsurFungsi {...commonProps} />;
      case 5: return <Subbab5RumusFungsi {...commonProps} />;
      case 6: return <Subbab6Korespondensi {...commonProps} />;
      case 7: return <Subbab7JenisFungsi {...commonProps} />;
      default: return null;
    }
  };

  const handleCheatApplied = (updatedUser) => {
    setCurrentUser(updatedUser);
    setViewState('STAGE_SELECT');
  };

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-300 relative z-10">
      <AnimatedBackground />

      <Navbar
        currentUser={currentUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onLogout={handleLogout}
        onHomeClick={() => currentUser && setViewState('MAIN_MENU')}
      />

      <main className="flex-1 pb-10">
        {viewState === 'AUTH' && (
          <AuthScreen onLoginSuccess={handleLoginSuccess} />
        )}

        {viewState === 'MAIN_MENU' && (
          <MainMenu
            currentUser={currentUser}
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
            onStartQuest={() => setViewState('QUEST_SELECT')}
            onStartEndless={() => setViewState('ENDLESS')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {viewState === 'STAGE_SELECT' && (
          <StageSelector
            userProgress={currentUser?.progress}
            currentSubbabId={currentSubbabId}
            setCurrentSubbabId={setCurrentSubbabId}
            onSelectStage={handleSelectStage}
            onBackToMenu={() => setViewState('MAIN_MENU')}
            onOpenSubbabInfo={() => setIsSubbabInfoOpen(true)}
          />
        )}

        {viewState === 'QUEST_SELECT' && (
          <QuestModeSelector
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

        {viewState === 'GAME' && renderActiveGameComponent()}

        {viewState === 'ENDLESS' && (
          <EndlessMode
            onBackToMenu={() => setViewState('MAIN_MENU')}
            currentUser={currentUser}
            onUpdateUser={(usr) => setCurrentUser(usr)}
          />
        )}
      </main>

      {/* Background YouTube Audio Player (ID 6jSLH9CDPPQ) */}
      <YouTubeAudioPlayer videoId="6jSLH9CDPPQ" />

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

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        currentUser={currentUser}
      />

      <SubbabInfoModal
        isOpen={isSubbabInfoOpen}
        onClose={() => setIsSubbabInfoOpen(false)}
        subbabData={SUBBABS_DATA[currentSubbabId]}
      />

      <AchievementUnlockedModal
        badge={newBadgeUnlocked}
        onClose={() => setNewBadgeUnlocked(null)}
      />
    </div>
  );
}
