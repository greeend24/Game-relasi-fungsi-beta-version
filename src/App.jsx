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
import AvatarModal from './components/AvatarModal';
import RankModal from './components/RankModal';
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
  const [isRankOpen, setIsRankOpen] = useState(false);
  const [isSubbabInfoOpen, setIsSubbabInfoOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null);

  useEffect(() => {
    // Async session sync on app startup
    const initSession = async () => {
      const user = await storageService.syncSession();
      if (user) {
        setCurrentUser(user);
        setViewState('MAIN_MENU');
        try { audioEngine.toggleBgm(true); } catch {}
      }
    };
    initSession();
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

  const handleLogout = async () => {
    await storageService.logout();
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

  const handleStageComplete = async (subbabKey, stageNum, scoreEarned, starsEarned) => {
    const res = await storageService.updateProgress(subbabKey, stageNum, scoreEarned, starsEarned);
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
    <div className="h-[100dvh] w-full flex flex-col font-sans relative z-10 overflow-hidden select-none bg-[#FAF7F2]">
      {/* PERSISTENT CONTINUOUS BACKGROUND: SKY, CLOUDS & LEAVES NEVER RESET OR UNMOUNT ACROSS SECTIONS */}
      <AnimatedBackground 
        hideBottomLandscape={viewState === 'STAGE_SELECT' || viewState === 'MAIN_MENU' || viewState === 'AUTH'} 
        hideBirds={true} 
        hideClouds={false} 
      />

      <main className="flex-1 w-full h-full flex flex-col min-h-0 overflow-hidden relative">
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
            onSelectStage={handleSelectStage}
            onBackToMenu={() => setViewState('MAIN_MENU')}
            onOpenSubbabInfo={() => setIsSubbabInfoOpen(true)}
          />
        )}

        {viewState === 'QUEST_SELECT' && (
          <QuestModeSelector
            userProgress={currentUser?.progress}
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
        subbabData={SUBBABS_DATA[currentSubbabId]}
      />

      <AchievementUnlockedModal
        badge={newBadgeUnlocked}
        onClose={() => setNewBadgeUnlocked(null)}
      />
    </div>
  );
}
