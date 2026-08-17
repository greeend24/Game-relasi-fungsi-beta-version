import React, { useState, useEffect, useRef } from 'react';
import { Lock, Star, Play, ArrowLeft, CheckCircle, GitFork, Kanban, CheckCheck, Layers, Binary, Repeat, ShieldAlert, Award, Info, ChevronRight } from 'lucide-react';
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
    }
    return () => clearIdleTimers();
  }, [selectorStep]);

  const handleSubbabClick = (subId) => {
    audioEngine.playClick();
    clearIdleTimers();
    setCurrentSubbabId(subId);
    setSelectorStep('STAGE_GRID');
  };

  const handleStageCardHover = (isPlayed) => {
    audioEngine.playHover();
    const sceneId = isPlayed ? '3B' : '3A';
    const res = reloVoiceService.playScene(sceneId);
    if (res.text) setReloText(res.text);
  };

  const handleStageCardClick = (stageNum) => {
    audioEngine.playClick();
    clearIdleTimers();
    reloVoiceService.stopVoice(); // Stop menu voice when entering active stage
    onSelectStage(currentSubbabId, stageNum);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-5 my-2 space-y-4 animate-fade-in font-hand relative z-10">
      
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
            <span>← Pilih Subbab Lain (Dunia 1 - 7)</span>
          </button>
        )}

        <h2 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E] tracking-wide">
          {selectorStep === 'SUBBAB_SELECT' ? '📍 PILIH DUNIA SUBBAB PENYELIDIKAN' : STAGE_WORLD_NAMES[currentSubbabId] || currentSubData.title}
        </h2>
      </div>

      {/* Professor Owl Guidance */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          pose="exploring"
          emotion="idle"
          message={
            reloText || (
              selectorStep === 'SUBBAB_SELECT'
                ? 'Pilih salah satu dari 7 Dunia Subbab di bawah untuk memulai penyelidikan!'
                : `Kamu berada di Subbab ${currentSubbabId}. Pilih Stage 1 hingga 21 di bawah!`
            )
          }
          size="sm"
        />
      </div>

      {/* =========================================================
          STEP 1: SUBBAB SELECTION CARDS ONLY
         ========================================================= */}
      {selectorStep === 'SUBBAB_SELECT' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-[#78350F] px-1">
            <span>KLIK TAMPILAN SUBBAB DI BAWAH INI UNTUK MEMBUKA 21 STAGE-NYA:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                  {/* Robust Mobile-Compatible Background Image with Fallback */}
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
                      <span className="text-xs font-black text-[#D97706] uppercase tracking-wider">SUBBAB {sub.id}</span>
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
                  <span className="text-[#D97706] font-extrabold">SUBBAB {currentSubbabId}</span>
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

          {/* HORIZONTAL MEMANJANG STAGE BUTTONS (3 COLUMNS GRID OF WIDE HORIZONTAL PILLS) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#78350F] px-1">
              <span>📍 21 STAGE PENYELIDIKAN BERJENJANG (C3 - C5):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-hand">
              {currentSubData.stages.map((stageItem) => {
                const stageNum = stageItem.stage;
                const isStageUnlocked = stageNum <= (subProgress.currentStage || 1);
                const starsEarned = subProgress.stars?.[stageNum] || 0;
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
                        handleStageCardHover(starsEarned > 0);
                      }
                    }}
                    className={`relative p-3 rounded-2xl border-2 flex items-center justify-between space-x-3 transition-all duration-200 group cursor-pointer overflow-hidden backdrop-blur-md shadow-[2px_3px_0px_#2D241E] ${
                      isConclusion
                        ? isStageUnlocked
                          ? 'bg-[#FEF3C7]/90 border-[#2D241E] text-[#2D241E] hover:bg-[#FEF3C7] hover:-translate-y-0.5 ring-2 ring-[#F59E0B]'
                          : 'bg-[#FEF3C7]/20 border-[#A8A29E] text-[#78716C] cursor-not-allowed'
                        : isStageUnlocked
                        ? starsEarned > 0
                          ? 'bg-[#ECFDF5]/90 border-[#2D241E] text-[#2D241E] hover:bg-[#D1FAE5] hover:-translate-y-0.5'
                          : 'bg-white/90 border-[#2D241E] text-[#2D241E] hover:bg-white hover:-translate-y-0.5'
                        : 'bg-white/20 border-[#A8A29E]/60 text-[#78716C] cursor-not-allowed'
                    }`}
                  >
                    {/* Left Stage Badge */}
                    <div className="flex items-center space-x-2 truncate">
                      <div className={`px-2.5 py-1 rounded-xl border border-[#2D241E] font-black text-xs flex-shrink-0 ${
                        isConclusion ? 'bg-[#F59E0B] text-white' : isStageUnlocked ? 'bg-[#2563EB] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'
                      }`}>
                        {isConclusion ? 'ST 21' : `ST ${stageNum}`}
                      </div>
                      
                      {/* Bloom Level & Title */}
                      <div className="text-left truncate">
                        <span className="text-[10px] font-extrabold block text-[#78350F] uppercase">
                          {stageItem.bloomLevel || 'C3'}
                        </span>
                        <span className="text-xs font-bold font-pencil block truncate leading-tight text-[#2D241E]">
                          {stageItem.title || (isConclusion ? 'Tantangan Kesimpulan' : `Kasus Stage ${stageNum}`)}
                        </span>
                      </div>
                    </div>

                    {/* Right Icon & Stars */}
                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                      {isStageUnlocked ? (
                        <div className="flex items-center space-x-0.5">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-3.5 h-3.5 ${
                                starIdx <= starsEarned
                                  ? 'text-[#F59E0B] fill-[#F59E0B]'
                                  : 'text-[#D1D5DB]'
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#A8A29E]" />
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
