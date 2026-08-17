import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowLeft, GitFork, Kanban, CheckCheck, Layers, Binary, Repeat, ShieldAlert, Info, ChevronRight, Check } from 'lucide-react';
import { SUBBABS_DATA } from '../data/casesData';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';
import { reloVoiceService } from '../services/reloVoiceService';

export const STAGE_WORLD_NAMES = {
  1: '🌱 Desa Relasi (Math Village)',
  2: '🌳 Hutan Format Relasi (Number Forest)',
  3: '🏔️ Pemetaan Fungsi (Function Mountain)',
  4: '📦 Lembah Unsur Fungsi (Domain Valley)',
  5: '⚙️ Benteng Rumus Notasi (Cipher Castle)',
  6: '⚖️ Reruntuhan Korespondensi (Bijection Ruins)',
  7: '👑 Istana Jenis Fungsi (Boss Citadel)'
};

const subDataHasImage = (img) => img && typeof img === 'string' && img.trim().length > 0;

export default function StageSelector({ userProgress, onSelectStage, onBackToMenu, currentSubbabId, setCurrentSubbabId, onOpenSubbabInfo }) {
  // Step 1: 'SUBBAB_SELECT' (Select 1 of 7 Subbabs), Step 2: 'STAGE_GRID' (Select 1 of 21 Stages for chosen Subbab)
  const [selectorStep, setSelectorStep] = useState(currentSubbabId ? 'STAGE_GRID' : 'SUBBAB_SELECT');
  const [reloText, setReloText] = useState('');

  const currentSubData = SUBBABS_DATA[currentSubbabId] || SUBBABS_DATA[1];
  const subProgress = userProgress?.[currentSubData.key] || { unlocked: currentSubbabId === 1, currentStage: 1, stars: {} };

  const iconMap = {
    GitFork,
    Kanban,
    CheckCheck,
    Layers,
    Binary,
    Repeat,
    ShieldAlert
  };

  const timer30Ref = useRef(null);
  const timer60Ref = useRef(null);

  const clearIdleTimers = () => {
    if (timer30Ref.current) clearTimeout(timer30Ref.current);
    if (timer60Ref.current) clearTimeout(timer60Ref.current);
  };

  const startIdleTimers = () => {
    clearIdleTimers();
    if (selectorStep === 'SUBBAB_SELECT') {
      // 30s Idle Timer -> Scene 2B
      timer30Ref.current = setTimeout(() => {
        const res = reloVoiceService.playScene('2B');
        if (res.text) setReloText(res.text);
      }, 30000);

      // 60s Idle Timer -> Scene 2C
      timer60Ref.current = setTimeout(() => {
        const res = reloVoiceService.playScene('2C');
        if (res.text) setReloText(res.text);
      }, 60000);
    }
  };

  useEffect(() => {
    if (selectorStep === 'SUBBAB_SELECT') {
      const res = reloVoiceService.playScene('2A');
      if (res.text) setReloText(res.text);
      startIdleTimers();
    } else {
      clearIdleTimers();
      // If Relo is currently speaking scene '9' (Meninggalkan Stage), preserve its audio & text transcript!
      if (reloVoiceService.currentScene === '9' && (reloVoiceService.isSpeaking || (Date.now() - reloVoiceService.lastPlayTime < 6000))) {
        if (reloVoiceService.lastText) {
          setReloText(reloVoiceService.lastText);
        }
      } else {
        const subKey = SUBBABS_DATA[currentSubbabId]?.key;
        const sProg = userProgress?.[subKey];
        const isPlayed = (sProg?.currentStage > 1) || (sProg?.stars && Object.keys(sProg.stars).length > 0);
        const sceneId = isPlayed ? '3B' : '3A';
        const res = reloVoiceService.playScene(sceneId);
        if (res.text) setReloText(res.text);
      }
    }
    return () => clearIdleTimers();
  }, [selectorStep]);

  const handleSubbabClick = (subId) => {
    audioEngine.playClick();
    clearIdleTimers();
    setCurrentSubbabId(subId);
    setSelectorStep('STAGE_GRID');

    // Relo speaks when subbab menu is clicked to open stage grid!
    const subKey = SUBBABS_DATA[subId]?.key;
    const sProg = userProgress?.[subKey];
    const isPlayed = (sProg?.currentStage > 1) || (sProg?.stars && Object.keys(sProg.stars).length > 0);
    const sceneId = isPlayed ? '3B' : '3A';
    const res = reloVoiceService.playScene(sceneId);
    if (res.text) setReloText(res.text);
  };

  const handleStageCardHover = () => {
    audioEngine.playHover();
    // Voice playback on hover removed as requested: Relo speaks when subbab is clicked, not on mouse hover near stage.
  };

  const handleStageCardClick = (stageNum) => {
    audioEngine.playClick();
    clearIdleTimers();
    reloVoiceService.stopVoice(); // Stop menu voice when entering active stage
    onSelectStage(currentSubbabId, stageNum);
  };

  return (
    <div className="h-full w-full overflow-y-auto drag-scroller p-3 sm:p-4 space-y-3 animate-fade-in font-hand relative z-10">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {selectorStep === 'SUBBAB_SELECT' ? (
          <button
            onClick={() => { audioEngine.playClick(); clearIdleTimers(); onBackToMenu(); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn flex items-center space-x-2 px-3.5 py-2 bg-white/70 backdrop-blur-md text-[#2D241E] font-extrabold text-xs sm:text-sm w-fit shadow-[3px_3px_0px_#2D241E] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#2563EB]" />
            <span>Kembali ke Menu Utama</span>
          </button>
        ) : (
          <button
            onClick={() => { audioEngine.playClick(); setSelectorStep('SUBBAB_SELECT'); }}
            onMouseEnter={() => audioEngine.playHover()}
            className="pencil-btn flex items-center space-x-2 px-3.5 py-2 bg-[#FEF3C7] backdrop-blur-md text-[#78350F] font-extrabold text-xs sm:text-sm w-fit shadow-[3px_3px_0px_#2D241E] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#D97706]" />
            <span>Pilih Chapter Lainnya</span>
          </button>
        )}

        <h2 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E] tracking-wide">
          {selectorStep === 'SUBBAB_SELECT' ? '📍 Pilih Chapter' : STAGE_WORLD_NAMES[currentSubbabId] || currentSubData.title}
        </h2>
      </div>

      {/* DETEKTIF RELO MASCOT & SPEECH BUBBLE CHAT */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          pose="exploring"
          emotion="idle"
          message={
            reloText || (
              selectorStep === 'SUBBAB_SELECT'
                ? 'Pilih salah satu Chapter di bawah!'
                : `Chapter ${currentSubbabId} — Pilih Stage di bawah!`
            )
          }
          size="sm"
        />
      </div>      {/* =========================================================
          STEP 1: SUBBAB SELECTION CARDS ONLY
         ========================================================= */}
      {selectorStep === 'SUBBAB_SELECT' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-[#78350F] px-1">
            <span>Pilih Chapter Untuk Membuka Stage:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(SUBBABS_DATA).map((sub) => {
              const isUnlocked = userProgress?.[sub.key]?.unlocked || sub.id === 1;
              const isSelected = sub.id === currentSubbabId;
              const IconComp = iconMap[sub.iconName] || GitFork;

              return (
                <button
                  key={sub.id}
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && handleSubbabClick(sub.id)}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`group relative p-4 rounded-3xl border-2.5 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer overflow-hidden backdrop-blur-md min-h-[140px] shadow-[4px_5px_0px_#2D241E] ${
                    isSelected
                      ? 'bg-[#FDE68A]/40 border-[#2D241E] text-[#2D241E] ring-4 ring-[#F59E0B]/70 scale-[1.02]'
                      : isUnlocked
                      ? 'bg-white/30 border-[#2D241E] text-[#2D241E] hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-white/50 hover:ring-2 hover:ring-[#38BDF8]'
                      : 'bg-[#EFECE6]/60 border-[#A8A29E] text-[#78716C] cursor-not-allowed'
                  }`}
                >
                  {/* Background Image */}
                  {subDataHasImage(sub.image) && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <img 
                        src={sub.image} 
                        alt={sub.title}
                        onError={(e) => { e.currentTarget.src = `/images/3d_subbab${sub.id}.jpg`; }}
                        className={`w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105 ${
                          isSelected ? 'opacity-50' : 'opacity-75'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
                    </div>
                  )}

                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-[#D97706] text-white border border-[#2D241E] shadow-[2px_2px_0px_#2D241E]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-[#D97706] tracking-wider">Chapter {sub.id}</span>
                    </div>

                    {!isUnlocked ? (
                      <Lock className="w-4 h-4 text-[#A8A29E]" />
                    ) : (
                      <div className="p-1 rounded-full bg-white border border-[#2D241E] group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-4 h-4 text-[#2563EB]" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 space-y-1 mt-3">
                    <h3 className="text-lg font-bold font-pencil text-[#2D241E] leading-tight group-hover:text-[#D97706] transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-[#4A3E3D] font-bold line-clamp-2 leading-relaxed">
                      "{sub.caseTitle}"
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          STEP 2: ACTIVE SUBBAB BRIEFING & HORIZONTAL 21 STAGE BARS
         ========================================================= */}
      {selectorStep === 'STAGE_GRID' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* COMPACT SUBBAB BANNER CARD (KASUS AKTIF) */}
          <div className="relative rounded-3xl bg-white/60 backdrop-blur-lg border-2.5 border-[#2D241E] shadow-[4px_5px_0px_#2D241E] overflow-hidden flex flex-col">
            {subDataHasImage(currentSubData.image) && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img 
                  src={currentSubData.image} 
                  alt={currentSubData.caseTitle}
                  onError={(e) => { e.currentTarget.src = `/images/3d_subbab${currentSubId}.jpg`; }}
                  className="w-full h-full object-cover object-[center_25%] opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
              </div>
            )}

            <div className="p-4 sm:p-5 w-full space-y-2 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg bg-[#FEF3C7] border border-[#2D241E] text-[10px] sm:text-xs font-bold text-[#78350F]">
                  <span>DUNIA AKTIF:</span>
                  <span className="text-[#D97706] font-extrabold">Chapter {currentSubbabId}</span>
                </div>

                <button
                  onClick={() => { audioEngine.playClick(); onOpenSubbabInfo?.(); }}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="pencil-btn px-3 py-1 bg-[#FEF3C7] text-[#78350F] font-bold text-xs flex items-center space-x-1 hover:bg-[#FDE68A]"
                >
                  <Info className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Info Materi</span>
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E]">
                  {STAGE_WORLD_NAMES[currentSubbabId]}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3E3D] font-bold leading-snug mt-0.5 line-clamp-2">
                  {currentSubData.briefing}
                </p>
              </div>
            </div>
          </div>

          {/* 21 STAGE BUTTONS GRID */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#78350F] px-1">
              <span>📍 PILIH STAGE (1 - 21):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 font-hand">
              {currentSubData.stages.map((stageItem) => {
                const stageNum = stageItem.stage;
                const isStageUnlocked = stageNum <= (subProgress.currentStage || 1);
                const starsEarned = subProgress.stars?.[stageNum] || 0;
                const isCompleted = starsEarned > 0;
                const isConclusion = stageItem.isConclusionStage;

                return (
                  <button
                    key={stageNum}
                    disabled={!isStageUnlocked}
                    onClick={() => {
                      if (isStageUnlocked) {
                        handleStageCardClick(stageNum);
                      }
                    }}
                    onMouseEnter={() => {
                      if (isStageUnlocked) {
                        handleStageCardHover();
                      }
                    }}
                    className={`relative p-3 rounded-2xl border-2 flex items-center justify-between space-x-2 transition-all duration-200 group cursor-pointer overflow-hidden backdrop-blur-md shadow-[2px_3px_0px_#2D241E] ${
                      isConclusion
                        ? isStageUnlocked
                          ? 'bg-[#FEF3C7]/90 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7] hover:-translate-y-0.5 ring-2 ring-[#F59E0B]'
                          : 'bg-[#FEF3C7]/20 border-[#A8A29E] text-[#78716C] cursor-not-allowed'
                        : isStageUnlocked
                        ? isCompleted
                          ? 'bg-[#ECFDF5]/90 border-[#2D241E] text-[#2D241E] hover:bg-[#D1FAE5] hover:-translate-y-0.5'
                          : 'bg-white/90 border-[#2D241E] text-[#2D241E] hover:bg-white hover:-translate-y-0.5'
                        : 'bg-white/20 border-[#A8A29E]/60 text-[#78716C] cursor-not-allowed'
                    }`}
                  >
                    {/* Stage Number Badge */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div className={`min-w-[32px] h-8 px-2 rounded-xl border border-[#2D241E] font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#2D241E] ${
                        isConclusion ? 'bg-[#F59E0B] text-white' : isStageUnlocked ? 'bg-[#2563EB] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'
                      }`}>
                        {stageNum}
                      </div>
                    </div>

                    {/* Right Side: Blue Checked Box when completed, Empty Box when uncompleted */}
                    <div className="flex items-center flex-shrink-0">
                      {!isStageUnlocked ? (
                        <Lock className="w-4 h-4 text-[#A8A29E]" />
                      ) : isCompleted ? (
                        <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-lg bg-[#2563EB] border-2 border-[#2D241E] flex items-center justify-center text-white shadow-[1px_1px_0px_#2D241E]">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-lg bg-white border-2 border-[#2D241E] shadow-[1px_1px_0px_#2D241E]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

