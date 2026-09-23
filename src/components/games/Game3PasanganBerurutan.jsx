import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, AlertCircle, ArrowLeft, Trophy, X, Check, Lightbulb, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

// Levels / Case Studies Data for Himpunan Pasangan Berurutan
const LEVELS_DATA = {
  1: {
    id: 1,
    title: 'Ayo Bantu Bu Ani ke Kantin!',
    badgeIcon: 'chef',
    bgImage: '/images/canteen_bg.jpg',
    headerTitle: 'Himpunan Pasangan Berurutan',
    story: (
      <>
        <p>
          Ketika mau ke kantin, Bu Ani menawarkan kepada beberapa siswa di kelas yang ingin memesan jajanan di kantin. Di kantin tersedia <b>bubur, nasi goreng, soto, sandwich, air putih, esteh, dan es buah</b>.
        </p>
        <p className="mt-1">
          <b>Andi</b> ingin <b>bakso</b>, <b>Ani</b> ingin <b>nasi goreng</b> dan <b>esteh</b>, <b>Budi</b> <b>es buah</b>, dan <b>Siti</b> tidak menitipkan apa apa karena <b>puasa</b>.
        </p>
      </>
    ),
    instruction: 'Susunlah himpunan pasangan berurutan yang menyatakan relasi "memesan" antara siswa dan makanan/minuman berdasarkan informasi pada cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua siswa harus memiliki pasangan.',
    domainLabel: 'Siswa',
    kodomainLabel: 'Makanan/Minuman',
    totalPairs: 4,
    xItems: ['Andi', 'Ani', 'Budi', 'Siti'],
    yItems: ['Bakso', 'Nasi goreng', 'Soto', 'Sandwich', 'Air putih', 'Esteh', 'Es buah'],
    expectedPairs: [
      { x: 'Andi', y: 'Bakso' },
      { x: 'Ani', y: 'Nasi goreng' },
      { x: 'Ani', y: 'Esteh' },
      { x: 'Budi', y: 'Es buah' },
    ],
    uncoupledDomain: 'Siti',
    uncoupledReason: 'Siti sedang berpuasa sehingga tidak memesan jajanan apa pun.',
    takeaways: [
      { bold: 'Ani muncul di 2 pasang kurung:', desc: 'Ani memesan Nasi goreng dan Esteh, sehingga ditulis dalam dua kurung berbeda: (Ani, Nasi goreng) dan (Ani, Esteh).' },
      { bold: 'Siti tidak ditulis sama sekali:', desc: 'Karena Siti puasa (tidak ada pesanan), anggota asal yang tidak memiliki pasangan TIDAK dimasukkan ke dalam himpunan pasangan berurutan.' },
      { bold: 'Urutan pasangan (x, y) konsisten:', desc: 'Elemen himpunan asal (Siswa) selalu di depan, elemen kawan (Pesanan) selalu di belakang.' }
    ]
  },
  2: {
    id: 2,
    title: 'Pendaftaran Ekskul SMP Bintang!',
    badgeIcon: 'star',
    bgImage: '/images/school_hall_bg.jpg',
    headerTitle: 'Himpunan Pasangan Berurutan',
    story: (
      <>
        <p>
          Di awal semester, SMP Bintang membuka pendaftaran ekstrakurikuler. Pilihan ekskul yang tersedia adalah <b>Robotik, Futsal, Basket, Paduan Suara, Teater, PMR, dan Pramuka</b>.
        </p>
        <p className="mt-1">
          Berdasarkan formulir: <b>Doni</b> memilih <b>Basket</b> dan <b>Futsal</b>, <b>Rina</b> memilih <b>Robotik</b>, <b>Kevin</b> memilih <b>Paduan Suara</b> dan <b>Teater</b>, sedangkan <b>Salsa</b> tidak memilih ekskul apa pun karena <b>fokus olimpiade sains</b>.
        </p>
      </>
    ),
    instruction: 'Susunlah himpunan pasangan berurutan yang menyatakan relasi "memilih ekskul" antara siswa dan ekstrakurikuler berdasarkan informasi pada cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua siswa harus memiliki pasangan.',
    domainLabel: 'Siswa',
    kodomainLabel: 'Ekstrakurikuler',
    totalPairs: 5,
    xItems: ['Doni', 'Rina', 'Kevin', 'Salsa'],
    yItems: ['Robotik', 'Futsal', 'Basket', 'Paduan Suara', 'Teater', 'PMR', 'Pramuka'],
    expectedPairs: [
      { x: 'Doni', y: 'Basket' },
      { x: 'Doni', y: 'Futsal' },
      { x: 'Rina', y: 'Robotik' },
      { x: 'Kevin', y: 'Paduan Suara' },
      { x: 'Kevin', y: 'Teater' },
    ],
    uncoupledDomain: 'Salsa',
    uncoupledReason: 'Salsa fokus olimpiade sains sehingga tidak memilih ekskul.',
    takeaways: [
      { bold: 'Doni & Kevin muncul 2 kali:', desc: 'Dalam relasi, satu anggota domain asal (x) boleh berpasangan dengan lebih dari satu kawan (y).' },
      { bold: 'Salsa tidak dimasukkan:', desc: 'Anggota asal yang tidak memilih ekskul diabaikan dari himpunan pasangan berurutan.' },
      { bold: 'Urutan elemen (x, y):', desc: 'Nama siswa di posisi x, pilihan ekskul di posisi y.' }
    ]
  },
  3: {
    id: 3,
    title: 'Turnamen Klub Game & Hobi!',
    badgeIcon: 'game',
    bgImage: '/images/canteen_bg.jpg',
    headerTitle: 'Himpunan Pasangan Berurutan',
    story: (
      <>
        <p>
          Di markas detektif, diadakan turnamen persahabatan antar cabang hobi dan asah otak: <b>Catur, Rubik, Mobile Legends, FIFA, dan Scrabble</b>.
        </p>
        <p className="mt-1">
          Data pendaftaran: <b>Fikran</b> bertanding di <b>Catur</b> dan <b>Rubik</b>, <b>Reza</b> bertanding di <b>Mobile Legends</b>, <b>Aris</b> bertanding di <b>FIFA</b>, dan <b>Dimas</b> hanya menonton (<b>tidak bertanding</b>).
        </p>
      </>
    ),
    instruction: 'Susunlah himpunan pasangan berurutan yang menyatakan relasi "bertanding di cabang" antara pemain dan game berdasarkan cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua pemain harus memiliki pasangan.',
    domainLabel: 'Pemain',
    kodomainLabel: 'Cabang Game',
    totalPairs: 4,
    xItems: ['Fikran', 'Reza', 'Aris', 'Dimas'],
    yItems: ['Catur', 'Rubik', 'Mobile Legends', 'FIFA', 'Scrabble'],
    expectedPairs: [
      { x: 'Fikran', y: 'Catur' },
      { x: 'Fikran', y: 'Rubik' },
      { x: 'Reza', y: 'Mobile Legends' },
      { x: 'Aris', y: 'FIFA' },
    ],
    uncoupledDomain: 'Dimas',
    uncoupledReason: 'Dimas hanya menonton dan tidak bertanding di cabang mana pun.',
    takeaways: [
      { bold: 'Fikran bertanding di 2 cabang:', desc: 'Fikran dipasangkan dengan Catur dan Rubik dalam dua tanda kurung pasangan berurutan.' },
      { bold: 'Dimas tidak ditulis di himpunan:', desc: 'Pemain yang tidak bertanding diabaikan dari himpunan pasangan berurutan.' },
      { bold: 'Pilihan yang tidak dipilih:', desc: 'Scrabble tidak ada yang bertanding sehingga tidak muncul di himpunan.' }
    ]
  }
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function Game3PasanganBerurutan({ onBack, onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const levelData = LEVELS_DATA[currentLevel];

  // Randomize cards order so there is no fixed pattern
  const [shuffledX, setShuffledX] = useState(() => shuffleArray(levelData.xItems));
  const [shuffledY, setShuffledY] = useState(() => shuffleArray(levelData.yItems));

  // Array of { x: string|null, y: string|null } (length: levelData.totalPairs)
  const [pairs, setPairs] = useState(() =>
    Array.from({ length: levelData.totalPairs }, () => ({ x: null, y: null }))
  );

  // Selected item in tray: { name: string, type: 'x'|'y' }
  const [selectedTrayItem, setSelectedTrayItem] = useState(null);

  // Active target slot clicked first: { pairIdx: number, field: 'x'|'y' }
  const [activeTargetSlot, setActiveTargetSlot] = useState(null);

  // Validation / feedback states
  const [errorToast, setErrorToast] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSwitchLevel = (lvl) => {
    try { audioEngine.playClick(); } catch {}
    setCurrentLevel(lvl);
    const nextLvlData = LEVELS_DATA[lvl];
    setPairs(Array.from({ length: nextLvlData.totalPairs }, () => ({ x: null, y: null })));
    setShuffledX(shuffleArray(nextLvlData.xItems));
    setShuffledY(shuffleArray(nextLvlData.yItems));
    setSelectedTrayItem(null);
    setActiveTargetSlot(null);
    setErrorToast(null);
    setIsSuccessModalOpen(false);
  };

  const handleSelectTrayItem = (item) => {
    try { audioEngine.playClick(); } catch {}

    if (activeTargetSlot) {
      const { pairIdx, field } = activeTargetSlot;
      placeItemInSlot(pairIdx, field, item);
      setActiveTargetSlot(null);
      setSelectedTrayItem(null);
      return;
    }

    if (selectedTrayItem?.name === item.name) {
      setSelectedTrayItem(null);
    } else {
      setSelectedTrayItem(item);
    }
  };

  const placeItemInSlot = (pairIdx, field, item) => {
    if (field === 'x' && item.type !== 'x') {
      showErrorToast(`⚠️ Slot depan (x) khusus untuk nama ${levelData.domainLabel}!`);
      return;
    }
    if (field === 'y' && item.type !== 'y') {
      showErrorToast(`⚠️ Slot belakang (y) khusus untuk ${levelData.kodomainLabel}!`);
      return;
    }

    try { audioEngine.playPop?.(); } catch {}
    setPairs(prev => {
      const next = [...prev];
      next[pairIdx] = { ...next[pairIdx], [field]: item.name };
      return next;
    });
  };

  const handleSlotClick = (pairIdx, field) => {
    const currentVal = pairs[pairIdx][field];

    if (currentVal && !selectedTrayItem) {
      try { audioEngine.playTrash?.(); } catch {}
      setPairs(prev => {
        const next = [...prev];
        next[pairIdx] = { ...next[pairIdx], [field]: null };
        return next;
      });
      setActiveTargetSlot(null);
      return;
    }

    if (selectedTrayItem) {
      placeItemInSlot(pairIdx, field, selectedTrayItem);
      setSelectedTrayItem(null);
      setActiveTargetSlot(null);
      return;
    }

    try { audioEngine.playClick(); } catch {}
    if (activeTargetSlot?.pairIdx === pairIdx && activeTargetSlot?.field === field) {
      setActiveTargetSlot(null);
    } else {
      setActiveTargetSlot({ pairIdx, field });
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, pairIdx, field) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData('text/plain'));
      placeItemInSlot(pairIdx, field, item);
    } catch {}
  };

  const handleValidate = () => {
    const hasEmpty = pairs.some(p => !p.x || !p.y);
    if (hasEmpty) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Masih ada kotak pasangan yang belum terisi lengkap (x, y)!');
      return;
    }

    const hasUncoupled = pairs.some(p => p.x === levelData.uncoupledDomain || p.y === levelData.uncoupledDomain);
    if (hasUncoupled) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`❌ Perhatikan cerita: ${levelData.uncoupledDomain} ${levelData.uncoupledReason}. Karena tidak memiliki pasangan, ${levelData.uncoupledDomain} TIDAK boleh dimasukkan ke dalam kurung pasangan berurutan!`);
      return;
    }

    const userPairStrings = pairs.map(p => `${p.x}->${p.y}`);
    const uniquePairs = new Set(userPairStrings);
    if (uniquePairs.size !== userPairStrings.length) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Ada pasangan yang kamu tulis lebih dari satu kali (duplikat). Periksa kembali!');
      return;
    }

    const expectedStrings = new Set(levelData.expectedPairs.map(p => `${p.x}->${p.y}`));
    const isAllCorrect = 
      userPairStrings.every(p => expectedStrings.has(p)) &&
      uniquePairs.size === levelData.expectedPairs.length;

    if (isAllCorrect) {
      try {
        audioEngine.playCorrect();
        audioEngine.playStageComplete?.();
      } catch {}
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setIsSuccessModalOpen(true);
      if (onComplete) onComplete(100);
    } else {
      try { audioEngine.playError(); } catch {}
      const hasInverted = pairs.some(p =>
        levelData.expectedPairs.some(ep => ep.x === p.y && ep.y === p.x)
      );
      if (hasInverted) {
        showErrorToast('❌ Posisi pasangan terbalik! Ingat aturan (x, y): anggota himpunan asal di depan, pilihan di belakang.');
      } else {
        showErrorToast('❌ Masih ada pasangan yang belum sesuai dengan informasi pada cerita. Periksa kembali pilihan masing-masing siswa!');
      }
    }
  };

  const handleReset = () => {
    try { audioEngine.playTrash?.(); } catch {}
    setPairs(Array.from({ length: levelData.totalPairs }, () => ({ x: null, y: null })));
    setShuffledX(shuffleArray(levelData.xItems));
    setShuffledY(shuffleArray(levelData.yItems));
    setSelectedTrayItem(null);
    setActiveTargetSlot(null);
    setErrorToast(null);
  };

  const showErrorToast = (msg) => {
    setErrorToast(msg);
    setTimeout(() => {
      setErrorToast(null);
    }, 5500);
  };

  return (
    <div
      className="relative w-full h-full min-h-0 max-h-[720px] flex flex-col justify-between p-3 sm:p-4 select-none overflow-hidden font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url('${levelData.bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between w-full z-20 flex-shrink-0 mb-1">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-gray-800 font-black text-xs sm:text-sm shadow-md border-2 border-amber-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Kembali</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {/* 3D Wooden Signboard Title */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2 px-5 sm:px-8 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-b from-[#F59E0B] via-[#D97706] to-[#92400E] border-3 border-[#78350F] shadow-[0_4px_0_#451A03,0_8px_16px_rgba(0,0,0,0.25)]">
            <div className="p-1 rounded-full bg-white/90 shadow-sm">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
            </div>
            <h1 className="text-base sm:text-xl md:text-2xl font-black text-amber-100 tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {levelData.title}
            </h1>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl shadow-md border border-amber-200">
          {[1, 2, 3].map(lvl => (
            <button
              key={lvl}
              onClick={() => handleSwitchLevel(lvl)}
              className={`px-2.5 py-1 rounded-xl font-black text-xs transition cursor-pointer ${
                currentLevel === lvl
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Working Area ── */}
      <div className="relative flex-1 flex flex-col justify-between z-10 min-h-0 py-1 gap-2.5 max-w-4xl mx-auto w-full">

        {/* 1. Story & Instruction Card */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-medium">
            {levelData.story}
          </div>
          <div className="mt-1.5 p-2 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/60 text-[11px] sm:text-xs text-[#92400E] font-bold leading-snug">
            {levelData.instruction}
          </div>
        </div>

        {/* 2. Himpunan Pasangan Berurutan Board (Exact match of media_1790065050252.jpg) */}
        <div className="rounded-3xl border-2 border-[#1E293B] shadow-lg overflow-hidden bg-white">
          {/* Header */}
          <div className="bg-[#1B4D63] text-white py-2 px-4 text-center text-xs sm:text-sm font-black tracking-wider uppercase">
            {levelData.headerTitle}
          </div>

          {/* Formula Area with Curly Braces */}
          <div className="p-4 sm:p-6 bg-[#FAF9F5] flex items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-2 text-3xl sm:text-5xl font-mono text-slate-800 font-normal">
              {/* Opening Curly Brace */}
              <span className="text-4xl sm:text-6xl text-slate-700 leading-none select-none font-serif">&#123;</span>

              {/* Grid of 4 Pairs (2x2 layout matching screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 py-1">
                {pairs.map((pair, idx) => {
                  const isTargetX = activeTargetSlot?.pairIdx === idx && activeTargetSlot?.field === 'x';
                  const isTargetY = activeTargetSlot?.pairIdx === idx && activeTargetSlot?.field === 'y';
                  const isLastInRow = idx === 1 || idx === pairs.length - 1;

                  return (
                    <div key={idx} className="flex items-center gap-1 text-2xl sm:text-3xl text-slate-700 font-mono">
                      <span>(</span>

                      {/* X Slot */}
                      <button
                        onClick={() => handleSlotClick(idx, 'x')}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, idx, 'x')}
                        className={`w-24 sm:w-28 h-8 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-[13px] font-sans font-bold transition-all cursor-pointer truncate ${
                          pair.x
                            ? 'bg-white border-2 border-[#1E293B] text-slate-800 shadow-sm hover:border-red-500 hover:text-red-600'
                            : isTargetX
                            ? 'border-2 border-amber-500 bg-amber-50 text-amber-700 animate-pulse'
                            : 'border-2 border-dashed border-[#94A3B8] bg-white hover:border-amber-400 text-slate-400'
                        }`}
                        title={pair.x ? `Klik untuk hapus (${pair.x})` : 'Klik untuk letakkan siswa (x)'}
                      >
                        {pair.x ? (
                          <span className="flex items-center gap-1">
                            <span className="truncate">{pair.x}</span>
                            <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-normal">Siswa</span>
                        )}
                      </button>

                      <span className="text-xl sm:text-2xl font-black text-slate-700">,</span>

                      {/* Y Slot */}
                      <button
                        onClick={() => handleSlotClick(idx, 'y')}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, idx, 'y')}
                        className={`w-28 sm:w-32 h-8 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-[13px] font-sans font-bold transition-all cursor-pointer truncate ${
                          pair.y
                            ? 'bg-white border-2 border-[#1E293B] text-slate-800 shadow-sm hover:border-red-500 hover:text-red-600'
                            : isTargetY
                            ? 'border-2 border-sky-500 bg-sky-50 text-sky-700 animate-pulse'
                            : 'border-2 border-dashed border-[#94A3B8] bg-white hover:border-sky-400 text-slate-400'
                        }`}
                        title={pair.y ? `Klik untuk hapus (${pair.y})` : 'Klik untuk letakkan pesanan (y)'}
                      >
                        {pair.y ? (
                          <span className="flex items-center gap-1">
                            <span className="truncate">{pair.y}</span>
                            <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-normal">Pesanan</span>
                        )}
                      </button>

                      <span>)</span>
                      {idx < pairs.length - 1 && <span className="text-xl sm:text-2xl font-black text-slate-700">,</span>}
                    </div>
                  );
                })}
              </div>

              {/* Closing Curly Brace */}
              <span className="text-4xl sm:text-6xl text-slate-700 leading-none select-none font-serif">&#125;</span>
            </div>
          </div>
        </div>

        {/* 3. Card Tray (Exact match of media_1790065050252.jpg: 2 rows of cards) */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-md">
          {/* Row 1: Siswa (Domain) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pb-1.5 border-b border-slate-200">
            {shuffledX.map((name) => {
              const isSelected = selectedTrayItem?.name === name;
              return (
                <button
                  key={name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, { name, type: 'x' })}
                  onClick={() => handleSelectTrayItem({ name, type: 'x' })}
                  className={`px-4 py-1.5 rounded-xl border-2 font-bold text-xs sm:text-[13px] shadow-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 border-[#78350F] text-slate-900 scale-105 shadow-md ring-2 ring-amber-500'
                      : 'bg-white hover:bg-pink-50 border-[#334155] text-slate-800 hover:scale-102 active:scale-95'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Row 2: Makanan / Pesanan (Kodomain) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1.5">
            {shuffledY.map((name) => {
              const isSelected = selectedTrayItem?.name === name;
              return (
                <button
                  key={name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, { name, type: 'y' })}
                  onClick={() => handleSelectTrayItem({ name, type: 'y' })}
                  className={`px-3.5 py-1.5 rounded-xl border-2 font-bold text-xs sm:text-[13px] shadow-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-400 border-sky-800 text-slate-900 scale-105 shadow-md ring-2 ring-sky-500'
                      : 'bg-white hover:bg-sky-50 border-[#334155] text-slate-800 hover:scale-102 active:scale-95'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Action Bar */}
        <div className="flex items-center justify-between w-full gap-2 px-1">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm border-2 border-[#0369A1] shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] text-[11px] sm:text-xs font-bold shadow-sm">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Catatan: {levelData.noteText}</span>
          </div>

          <button
            onClick={handleValidate}
            className="flex items-center gap-1.5 px-6 sm:px-8 py-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm border-2 border-[#78350F] shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <span>Selesai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ── Error Notification Toast ── */}
      {errorToast && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EF4444] text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-white">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorToast}</span>
          </div>
        </div>
      )}

      {/* ── Success Celebration Modal ── */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fade-in font-sans">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] border-4 border-[#78350F] shadow-[0_15px_30px_rgba(0,0,0,0.5)] p-5 sm:p-6 text-center select-none overflow-hidden">
            
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-lg border-2 border-white mb-2">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-100 animate-bounce" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#78350F] uppercase tracking-wide">
              Pasangan Berurutan Berhasil!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
              Kerja hebat detektif! Himpunan pasangan berurutan telah tersusun dengan benar dan sesuai kaidah matematika.
            </p>

            {/* Deductions */}
            <div className="text-left space-y-1.5 my-4 bg-white p-3 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black text-slate-700 uppercase">
                🔍 Catatan Detektif:
              </h4>
              {levelData.takeaways.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700 leading-snug">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5 font-black" />
                  <div>
                    <span className="font-black text-slate-900">{t.bold} </span>
                    <span>{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              {currentLevel < 3 ? (
                <button
                  onClick={() => handleSwitchLevel(currentLevel + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md border-2 border-white hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  <span>Lanjut ke Level {currentLevel + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    if (onBack) onBack();
                  }}
                  className="flex items-center gap-1.5 px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm shadow-md border-2 border-white hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  <span>Kembali ke Peta Bab</span>
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
