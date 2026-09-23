import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, AlertCircle, ArrowLeft, Trophy, X, Check, Lightbulb, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

// Levels / Case Studies Data for Tabel Relasi
const LEVELS_DATA = {
  1: {
    id: 1,
    title: 'Ayo Bantu Bu Ani ke Kantin!',
    badgeIcon: 'chef',
    bgImage: '/images/canteen_bg.jpg',
    story: (
      <>
        <p>
          Ketika mau ke kantin, Bu Ani menawarkan kepada beberapa siswa di kelas yang ingin memesan jajanan di kantin. Di kantin tersedia <b>bubur, nasi goreng, soto, sandwich, air putih, es teh, dan es buah</b>.
        </p>
        <p className="mt-1">
          <b>Andi</b> ingin <b>bakso</b>, <b>Ani</b> ingin <b>nasi goreng</b> dan <b>es teh</b>, <b>Budi</b> <b>es buah</b>, dan <b>Siti</b> tidak menitipkan apa apa karena <b>puasa</b>.
        </p>
      </>
    ),
    instruction: 'Lengkapilah tabel berikut yang menyatakan relasi "memesan" antara siswa dan makanan/minuman berdasarkan informasi pada cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua kotak harus digunakan.',
    col1Label: 'Siswa',
    col2Label: 'Makanan/Minuman yang Dipesan',
    domainLabel: 'Siswa',
    kodomainLabel: 'Makanan/Minuman',
    totalRows: 5,
    expectedPairCount: 4,
    trayItems: [
      { id: 't1', name: 'Andi', type: 'domain' },
      { id: 't2', name: 'Ani', type: 'domain' },
      { id: 't3', name: 'Budi', type: 'domain' },
      { id: 't4', name: 'Siti', type: 'domain' },
      { id: 't5', name: 'Bakso', type: 'kodomain' },
      { id: 't6', name: 'Bubur', type: 'kodomain' },
      { id: 't7', name: 'Nasi goreng', type: 'kodomain' },
      { id: 't8', name: 'Soto', type: 'kodomain' },
      { id: 't9', name: 'Sandwich', type: 'kodomain' },
      { id: 't10', name: 'Air putih', type: 'kodomain' },
      { id: 't11', name: 'Es teh', type: 'kodomain' },
      { id: 't12', name: 'Es buah', type: 'kodomain' },
      { id: 't13', name: 'Tidak memesan apa pun', type: 'distractor' },
    ],
    expectedPairs: [
      { x: 'Andi', y: 'Bakso' },
      { x: 'Ani', y: 'Nasi goreng' },
      { x: 'Ani', y: 'Es teh' },
      { x: 'Budi', y: 'Es buah' },
    ],
    uncoupledDomain: 'Siti',
    uncoupledReason: 'Siti sedang berpuasa sehingga tidak memesan jajanan apa pun.',
    takeaways: [
      { bold: 'Ani memesan 2 menu:', desc: 'Ani memesan Nasi goreng dan Es teh, sehingga dalam tabel Ani ditulis di dua baris berbeda dengan pesanannya masing-masing.' },
      { bold: 'Siti tidak ditulis di tabel:', desc: 'Karena Siti tidak memesan apa pun (puasa), Siti tidak memiliki pasangan relasi memesan dan tidak dimasukkan ke dalam tabel.' },
      { bold: 'Sisa baris dibiarkan kosong:', desc: 'Karena hanya ada 4 pesanan, baris kelima sengaja dibiarkan kosong sesuai catatan "tidak semua kotak harus digunakan".' }
    ]
  },
  2: {
    id: 2,
    title: 'Pendaftaran Ekskul SMP Bintang!',
    badgeIcon: 'star',
    bgImage: '/images/school_hall_bg.jpg',
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
    instruction: 'Lengkapilah tabel berikut yang menyatakan relasi "memilih ekskul" antara siswa dan ekstrakurikuler berdasarkan informasi pada cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua kotak harus digunakan.',
    col1Label: 'Siswa',
    col2Label: 'Ekstrakurikuler yang Dipilih',
    domainLabel: 'Siswa',
    kodomainLabel: 'Ekstrakurikuler',
    totalRows: 5,
    expectedPairCount: 5,
    trayItems: [
      { id: 'e1', name: 'Doni', type: 'domain' },
      { id: 'e2', name: 'Rina', type: 'domain' },
      { id: 'e3', name: 'Kevin', type: 'domain' },
      { id: 'e4', name: 'Salsa', type: 'domain' },
      { id: 'e5', name: 'Robotik', type: 'kodomain' },
      { id: 'e6', name: 'Futsal', type: 'kodomain' },
      { id: 'e7', name: 'Basket', type: 'kodomain' },
      { id: 'e8', name: 'Paduan Suara', type: 'kodomain' },
      { id: 'e9', name: 'Teater', type: 'kodomain' },
      { id: 'e10', name: 'PMR', type: 'kodomain' },
      { id: 'e11', name: 'Pramuka', type: 'kodomain' },
      { id: 'e12', name: 'Tidak memilih apa pun', type: 'distractor' },
    ],
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
      { bold: 'Doni & Kevin memilih 2 ekskul:', desc: 'Doni dan Kevin masing-masing memiliki 2 baris pilihan pada tabel relasi.' },
      { bold: 'Salsa tidak dicantumkan di tabel:', desc: 'Karena Salsa tidak memilih ekskul, ia tidak mempunyai pasangan pada relasi memilih ekskul.' },
      { bold: 'PMR & Pramuka tidak terisi:', desc: 'Ekskul yang tidak dipilih tidak dimasukkan ke dalam baris tabel.' }
    ]
  },
  3: {
    id: 3,
    title: 'Turnamen Klub Game & Hobi!',
    badgeIcon: 'game',
    bgImage: '/images/canteen_bg.jpg',
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
    instruction: 'Lengkapilah tabel berikut yang menyatakan relasi "bertanding di cabang" antara pemain dan game berdasarkan informasi pada cerita! Pilih kotak yang tersedia, lalu letakkan pada tempat yang sesuai.',
    noteText: 'Tidak semua kotak harus digunakan.',
    col1Label: 'Pemain',
    col2Label: 'Cabang Game yang Diikuti',
    domainLabel: 'Pemain',
    kodomainLabel: 'Cabang Game',
    totalRows: 5,
    expectedPairCount: 4,
    trayItems: [
      { id: 'g1', name: 'Fikran', type: 'domain' },
      { id: 'g2', name: 'Reza', type: 'domain' },
      { id: 'g3', name: 'Aris', type: 'domain' },
      { id: 'g4', name: 'Dimas', type: 'domain' },
      { id: 'g5', name: 'Catur', type: 'kodomain' },
      { id: 'g6', name: 'Rubik', type: 'kodomain' },
      { id: 'g7', name: 'Mobile Legends', type: 'kodomain' },
      { id: 'g8', name: 'FIFA', type: 'kodomain' },
      { id: 'g9', name: 'Scrabble', type: 'kodomain' },
      { id: 'g10', name: 'Tidak bertanding', type: 'distractor' },
    ],
    expectedPairs: [
      { x: 'Fikran', y: 'Catur' },
      { x: 'Fikran', y: 'Rubik' },
      { x: 'Reza', y: 'Mobile Legends' },
      { x: 'Aris', y: 'FIFA' },
    ],
    uncoupledDomain: 'Dimas',
    uncoupledReason: 'Dimas hanya menonton dan tidak bertanding di cabang mana pun.',
    takeaways: [
      { bold: 'Fikran terdaftar di 2 cabang:', desc: 'Fikran menempati 2 baris tabel dengan pasangan Catur dan Rubik.' },
      { bold: 'Dimas tidak ada di tabel:', desc: 'Dimas tidak bertanding sehingga tidak memiliki pasangan relasi.' },
      { bold: 'Format baris tabel:', desc: 'Setiap baris tabel merepresentasikan satu pasang hubungan relasi antara pemain dan game.' }
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

export default function Game2TabelRelasi({ onBack, onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const levelData = LEVELS_DATA[currentLevel];

  // Randomize tray items order so there is no fixed pattern
  const [shuffledTray, setShuffledTray] = useState(() => shuffleArray(levelData.trayItems));

  // Table rows: array of 5 objects { x: string|null, y: string|null }
  const [tableRows, setTableRows] = useState(() =>
    Array.from({ length: levelData.totalRows }, () => ({ x: null, y: null }))
  );

  // Selected item in tray for click-to-place
  const [selectedTrayItem, setSelectedTrayItem] = useState(null);

  // Target slot selected (if user clicked slot first)
  const [activeTargetSlot, setActiveTargetSlot] = useState(null);

  // Validation / Feedback states
  const [errorToast, setErrorToast] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSwitchLevel = (lvl) => {
    try { audioEngine.playClick(); } catch {}
    setCurrentLevel(lvl);
    const nextLvlData = LEVELS_DATA[lvl];
    setTableRows(Array.from({ length: nextLvlData.totalRows }, () => ({ x: null, y: null })));
    setShuffledTray(shuffleArray(nextLvlData.trayItems));
    setSelectedTrayItem(null);
    setActiveTargetSlot(null);
    setErrorToast(null);
    setIsSuccessModalOpen(false);
  };

  const handleSelectTrayItem = (item) => {
    try { audioEngine.playClick(); } catch {}

    if (activeTargetSlot) {
      const { rowIndex, col } = activeTargetSlot;
      placeItemInSlot(rowIndex, col, item);
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

  const placeItemInSlot = (rowIndex, col, item) => {
    if (col === 'x') {
      if (item.type !== 'domain' && item.type !== 'distractor') {
        showErrorToast(`⚠️ Kolom kiri khusus untuk nama ${levelData.domainLabel}!`);
        return;
      }
    }

    if (col === 'y') {
      if (item.type !== 'kodomain' && item.type !== 'distractor') {
        showErrorToast(`⚠️ Kolom kanan khusus untuk ${levelData.kodomainLabel}!`);
        return;
      }
    }

    try { audioEngine.playPop?.(); } catch {}
    setTableRows(prev => {
      const next = [...prev];
      next[rowIndex] = { ...next[rowIndex], [col]: item.name };
      return next;
    });
  };

  const handleSlotClick = (rowIndex, col) => {
    const currentVal = tableRows[rowIndex][col];

    if (currentVal && !selectedTrayItem) {
      try { audioEngine.playTrash?.(); } catch {}
      setTableRows(prev => {
        const next = [...prev];
        next[rowIndex] = { ...next[rowIndex], [col]: null };
        return next;
      });
      setActiveTargetSlot(null);
      return;
    }

    if (selectedTrayItem) {
      placeItemInSlot(rowIndex, col, selectedTrayItem);
      setSelectedTrayItem(null);
      setActiveTargetSlot(null);
      return;
    }

    try { audioEngine.playClick(); } catch {}
    if (activeTargetSlot?.rowIndex === rowIndex && activeTargetSlot?.col === col) {
      setActiveTargetSlot(null);
    } else {
      setActiveTargetSlot({ rowIndex, col });
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, rowIndex, col) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (dataStr) {
        const item = JSON.parse(dataStr);
        placeItemInSlot(rowIndex, col, item);
      }
    } catch {}
  };

  const handleValidate = () => {
    const filledRows = tableRows.filter(r => r.x || r.y);

    const halfFilledRow = tableRows.find(r => (r.x && !r.y) || (!r.x && r.y));
    if (halfFilledRow) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Ada baris yang belum lengkap! Setiap baris harus berisi pasangan lengkap antara Siswa dan Pilihan.');
      return;
    }

    if (filledRows.length === 0) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Tabel masih kosong! Masukkan pasangan siswa dan pesanannya sesuai cerita.');
      return;
    }

    const hasDistractor = filledRows.some(r =>
      r.x === 'Tidak memesan apa pun' || r.y === 'Tidak memesan apa pun' ||
      r.x === 'Tidak memilih apa pun' || r.y === 'Tidak memilih apa pun' ||
      r.x === 'Tidak bertanding' || r.y === 'Tidak bertanding'
    );
    if (hasDistractor) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('❌ Perhatikan catatan: Kotak "Tidak memesan/memilih apa pun" adalah pengecoh. Anggota yang tidak memiliki relasi TIDAK dimasukkan ke dalam tabel!');
      return;
    }

    const hasUncoupled = filledRows.some(r => r.x === levelData.uncoupledDomain || r.y === levelData.uncoupledDomain);
    if (hasUncoupled) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`❌ Perhatikan cerita: ${levelData.uncoupledDomain} ${levelData.uncoupledReason}. Karena tidak memesan, ${levelData.uncoupledDomain} TIDAK boleh dimasukkan ke dalam tabel!`);
      return;
    }

    const pairKeys = filledRows.map(r => `${r.x}->${r.y}`);
    const uniqueKeys = new Set(pairKeys);
    if (uniqueKeys.size !== pairKeys.length) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Ada pasangan yang kamu tulis lebih dari satu kali (duplikat). Periksa kembali baris tabelmu!');
      return;
    }

    const hasInverted = filledRows.some(r =>
      levelData.expectedPairs.some(ep => ep.x === r.y && ep.y === r.x)
    );
    if (hasInverted) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`❌ Posisi terbalik! Kolom kiri harus nama ${levelData.domainLabel}, dan kolom kanan untuk ${levelData.kodomainLabel}.`);
      return;
    }

    const expectedKeys = new Set(levelData.expectedPairs.map(ep => `${ep.x}->${ep.y}`));
    const isAllCorrect = 
      filledRows.length === levelData.expectedPairCount &&
      pairKeys.every(k => expectedKeys.has(k));

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
      if (filledRows.length < levelData.expectedPairCount) {
        showErrorToast(`❌ Masih ada pesanan yang kurang! Seharusnya ada ${levelData.expectedPairCount} pasangan relasi berdasarkan cerita.`);
      } else {
        showErrorToast('❌ Masih ada pasangan yang belum sesuai dengan informasi pada cerita. Periksa kembali!');
      }
    }
  };

  const handleReset = () => {
    try { audioEngine.playTrash?.(); } catch {}
    setTableRows(Array.from({ length: levelData.totalRows }, () => ({ x: null, y: null })));
    setShuffledTray(shuffleArray(levelData.trayItems));
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

      {/* ── Main Working Area (Story Box Top | Table Middle | Tray Bottom) ── */}
      <div className="relative flex-1 flex flex-col justify-between z-10 min-h-0 py-1 gap-2 max-w-4xl mx-auto w-full">

        {/* 1. Story & Instruction Card */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-medium">
            {levelData.story}
          </div>
          <div className="mt-1.5 p-2 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/60 text-[11px] sm:text-xs text-[#92400E] font-bold leading-snug">
            {levelData.instruction}
          </div>
        </div>

        {/* 2. The 2-Column Table */}
        <div className="rounded-2xl border-2 border-[#1E293B] shadow-lg overflow-hidden bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-2 text-center text-xs sm:text-sm font-black text-slate-800 border-b-2 border-[#1E293B]">
            <div className="bg-[#FCE7F3] py-2 border-r-2 border-[#1E293B]">
              {levelData.col1Label}
            </div>
            <div className="bg-[#E0F2FE] py-2">
              {levelData.col2Label}
            </div>
          </div>

          {/* 5 Table Rows */}
          <div className="divide-y divide-slate-200">
            {tableRows.map((row, idx) => {
              const isTargetX = activeTargetSlot?.rowIndex === idx && activeTargetSlot?.col === 'x';
              const isTargetY = activeTargetSlot?.rowIndex === idx && activeTargetSlot?.col === 'y';

              return (
                <div key={idx} className="grid grid-cols-2 py-1.5 px-3 sm:px-6 items-center hover:bg-slate-50/60 transition">
                  
                  {/* Left Slot: Siswa / Domain */}
                  <div className="flex justify-center pr-2 sm:pr-4 border-r border-slate-200">
                    <button
                      onClick={() => handleSlotClick(idx, 'x')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, idx, 'x')}
                      className={`w-full max-w-[220px] h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        row.x
                          ? 'bg-white border-2 border-[#1E293B] text-slate-800 shadow-sm hover:border-red-500 hover:text-red-600'
                          : isTargetX
                          ? 'border-2 border-amber-500 bg-amber-50 text-amber-700 animate-pulse'
                          : 'border-2 border-dashed border-[#94A3B8] bg-slate-50/70 hover:border-amber-400 text-slate-400'
                      }`}
                      title={row.x ? 'Klik untuk menghapus' : 'Klik untuk meletakkan kartu'}
                    >
                      {row.x ? (
                        <span className="flex items-center gap-1">
                          {row.x}
                          <X className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-normal">Pilih Siswa</span>
                      )}
                    </button>
                  </div>

                  {/* Right Slot: Makanan/Minuman / Kodomain */}
                  <div className="flex justify-center pl-2 sm:pr-4">
                    <button
                      onClick={() => handleSlotClick(idx, 'y')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, idx, 'y')}
                      className={`w-full max-w-[260px] h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        row.y
                          ? 'bg-white border-2 border-[#1E293B] text-slate-800 shadow-sm hover:border-red-500 hover:text-red-600'
                          : isTargetY
                          ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 animate-pulse'
                          : 'border-2 border-dashed border-[#94A3B8] bg-slate-50/70 hover:border-blue-400 text-slate-400'
                      }`}
                      title={row.y ? 'Klik untuk menghapus' : 'Klik untuk meletakkan kartu'}
                    >
                      {row.y ? (
                        <span className="flex items-center gap-1">
                          {row.y}
                          <X className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-normal">Pilih Pesanan</span>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Card Tray */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-md">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {shuffledTray.map((item) => {
              const isSelected = selectedTrayItem?.name === item.name;
              const isDomain = item.type === 'domain';
              const isKodomain = item.type === 'kodomain';

              return (
                <button
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => handleSelectTrayItem(item)}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl border-2 font-bold text-xs sm:text-[13px] shadow-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 border-[#78350F] text-slate-900 scale-105 shadow-md ring-2 ring-amber-500'
                      : isDomain
                      ? 'bg-white hover:bg-pink-50 border-[#334155] text-slate-800 hover:scale-102 active:scale-95'
                      : isKodomain
                      ? 'bg-white hover:bg-sky-50 border-[#334155] text-slate-800 hover:scale-102 active:scale-95'
                      : 'bg-slate-100 hover:bg-slate-200 border-dashed border-slate-400 text-slate-600'
                  }`}
                >
                  {item.name}
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
              Tabel Relasi Berhasil Disusun!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
              Kerja bagus detektif! Kamu berhasil menyajikan relasi ke dalam bentuk tabel dengan sangat teliti.
            </p>

            {/* Deductions */}
            <div className="text-left space-y-1.5 my-4 bg-white p-3 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black text-slate-700 uppercase">
                🔍 Catatan Detektif Tabel Relasi:
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
