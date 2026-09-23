import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, AlertCircle, ArrowLeft, Trophy, X, Check, Lightbulb, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

// Levels / Case Studies Data for Cartesian Diagram
const LEVELS_DATA = {
  1: {
    id: 1,
    title: 'Ayo Bantu Bu Ani ke Kantin!',
    badgeIcon: 'chef',
    bgImage: '/images/canteen_bg.jpg',
    headerTitle: 'Diagram Kartesius Relasi "Memesan" antara Siswa dan Makanan/Minuman',
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
    instruction: 'Buatlah diagram Kartesius yang menunjukkan relasi "memesan" antara siswa dan makanan/minuman berdasarkan informasi pada cerita! Letakkan nama-nama siswa pada sumbu-x dan makanan/minuman pada sumbu-y, kemudian tandai titik-titik pasangan yang sesuai.',
    noteText: 'Setiap siswa dapat memesan lebih dari satu makanan/minuman.',
    domainLabel: 'Siswa',
    kodomainLabel: 'Makanan/Minuman',
    xItems: ['Andi', 'Ani', 'Budi', 'Siti'],
    yItems: ['Bakso', 'Bubur', 'Nasi goreng', 'Soto', 'Sandwich', 'Air putih', 'Es teh', 'Es buah'],
    expectedPairs: [
      { x: 'Andi', y: 'Bakso' },
      { x: 'Ani', y: 'Nasi goreng' },
      { x: 'Ani', y: 'Es teh' },
      { x: 'Budi', y: 'Es buah' },
    ],
    uncoupledDomain: 'Siti',
    uncoupledReason: 'Siti sedang berpuasa sehingga tidak memesan apa pun.',
    takeaways: [
      { bold: 'Ani memiliki 2 titik di garis vertikal yang sama:', desc: 'Ani memesan Nasi goreng dan Es teh, sehingga pada garis x = Ani terdapat 2 titik koordinat (Ani, Nasi goreng) dan (Ani, Es teh).' },
      { bold: 'Garis x = Siti tidak memiliki titik sama sekali:', desc: 'Karena Siti tidak memesan makanan apa pun (puasa), maka sepanjang garis vertikal Siti dibiarkan kosong tanpa titik.' },
      { bold: 'Garis y tanpa titik:', desc: 'Menu seperti Bubur, Soto, Sandwich, dan Air putih tidak dipesan siapa pun sehingga tidak memiliki titik pada sumbu y.' }
    ]
  },
  2: {
    id: 2,
    title: 'Pendaftaran Ekskul SMP Bintang!',
    badgeIcon: 'star',
    bgImage: '/images/school_hall_bg.jpg',
    headerTitle: 'Diagram Kartesius Relasi "Memilih Ekskul" antara Siswa dan Ekstrakurikuler',
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
    instruction: 'Buatlah diagram Kartesius yang menunjukkan relasi "memilih ekskul" antara siswa dan ekstrakurikuler berdasarkan informasi pada cerita! Letakkan nama siswa pada sumbu-x dan ekskul pada sumbu-y, kemudian tandai titik-titik pasangan yang sesuai.',
    noteText: 'Satu siswa dapat memilih lebih dari satu ekstrakurikuler.',
    domainLabel: 'Siswa',
    kodomainLabel: 'Ekstrakurikuler',
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
      { bold: 'Doni & Kevin memiliki 2 titik vertikal:', desc: 'Doni memilih Basket & Futsal, Kevin memilih Paduan Suara & Teater. Dalam relasi, satu anggota domain x boleh berpasangan dengan lebih dari satu kawan y.' },
      { bold: 'Garis vertikal Salsa kosong:', desc: 'Salsa tidak memilih ekskul apa pun, sehingga tidak ada titik yang ditandai pada sumbu x = Salsa.' },
      { bold: 'Garis PMR & Pramuka kosong:', desc: 'Ekskul yang tidak terpilih tidak memiliki titik pasangan pada diagram Kartesius.' }
    ]
  },
  3: {
    id: 3,
    title: 'Turnamen Klub Game & Hobi!',
    badgeIcon: 'game',
    bgImage: '/images/canteen_bg.jpg',
    headerTitle: 'Diagram Kartesius Relasi "Bertanding di Cabang" antara Pemain dan Game',
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
    instruction: 'Buatlah diagram Kartesius yang menunjukkan relasi "bertanding di cabang" antara pemain dan game berdasarkan cerita! Letakkan nama pemain pada sumbu-x dan cabang game pada sumbu-y, kemudian tandai titik pasangan yang sesuai.',
    noteText: 'Setiap pemain dapat bertanding di lebih dari satu cabang lomba.',
    domainLabel: 'Pemain',
    kodomainLabel: 'Cabang Game',
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
      { bold: 'Fikran memiliki 2 titik koordinat:', desc: 'Fikran bertanding di Catur dan Rubik, sehingga terdapat dua titik di (Fikran, Catur) dan (Fikran, Rubik).' },
      { bold: 'Dimas tidak memiliki titik pasangan:', desc: 'Pemain yang tidak bertanding dibiarkan kosong pada diagram Kartesius.' },
      { bold: 'Scrabble tidak ada peserta:', desc: 'Garis horizontal Scrabble kosong karena tidak ada pemain yang memilihnya.' }
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

export default function Game3DiagramKartesius({ onBack, onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const levelData = LEVELS_DATA[currentLevel];

  // Randomize cards order so there is no fixed pattern
  const [shuffledX, setShuffledX] = useState(() => shuffleArray(levelData.xItems));
  const [shuffledY, setShuffledY] = useState(() => shuffleArray(levelData.yItems));

  // X-Axis slots: array of string|null (length: xItems.length)
  const [xSlots, setXSlots] = useState(() => Array(levelData.xItems.length).fill(null));

  // Y-Axis slots: array of string|null (length: yItems.length)
  const [ySlots, setYSlots] = useState(() => Array(levelData.yItems.length).fill(null));

  // Plotted Points: Set of "xSlotIdx-ySlotIdx"
  const [plottedPoints, setPlottedPoints] = useState(() => new Set());

  // Selected tray item for click-to-place: { name: string, type: 'x'|'y' }
  const [selectedTrayItem, setSelectedTrayItem] = useState(null);

  // Validation / Feedback states
  const [errorToast, setErrorToast] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Switch level helper
  const handleSwitchLevel = (lvl) => {
    try { audioEngine.playClick(); } catch {}
    setCurrentLevel(lvl);
    const nextLvlData = LEVELS_DATA[lvl];
    setXSlots(Array(nextLvlData.xItems.length).fill(null));
    setYSlots(Array(nextLvlData.yItems.length).fill(null));
    setShuffledX(shuffleArray(nextLvlData.xItems));
    setShuffledY(shuffleArray(nextLvlData.yItems));
    setPlottedPoints(new Set());
    setSelectedTrayItem(null);
    setErrorToast(null);
    setIsSuccessModalOpen(false);
  };

  // ── Placement Handlers ──

  const handleSelectTrayItem = (item) => {
    try { audioEngine.playClick(); } catch {}
    if (selectedTrayItem?.name === item.name) {
      setSelectedTrayItem(null);
    } else {
      setSelectedTrayItem(item);
    }
  };

  // Click on X-Axis slot (Domain / Siswa)
  const handleXSlotClick = (slotIdx) => {
    const currentVal = xSlots[slotIdx];

    // If slot has a value and no tray item selected -> remove it
    if (currentVal && !selectedTrayItem) {
      try { audioEngine.playTrash?.(); } catch {}
      setXSlots(prev => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      return;
    }

    if (!selectedTrayItem) return;

    if (selectedTrayItem.type !== 'x') {
      showErrorToast(`⚠️ Sumbu-X bagian bawah khusus untuk nama ${levelData.domainLabel}!`);
      return;
    }

    // Place into X slot
    try { audioEngine.playPop?.(); } catch {}
    setXSlots(prev => {
      const next = [...prev];
      // If item was placed in another x slot, clear the previous one
      const prevIdx = next.indexOf(selectedTrayItem.name);
      if (prevIdx !== -1) next[prevIdx] = null;
      next[slotIdx] = selectedTrayItem.name;
      return next;
    });
    setSelectedTrayItem(null);
  };

  // Click on Y-Axis slot (Kodomain / Makanan)
  const handleYSlotClick = (slotIdx) => {
    const currentVal = ySlots[slotIdx];

    // If slot has a value and no tray item selected -> remove it
    if (currentVal && !selectedTrayItem) {
      try { audioEngine.playTrash?.(); } catch {}
      setYSlots(prev => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      return;
    }

    if (!selectedTrayItem) return;

    if (selectedTrayItem.type !== 'y') {
      showErrorToast(`⚠️ Sumbu-Y bagian samping khusus untuk ${levelData.kodomainLabel}!`);
      return;
    }

    // Place into Y slot
    try { audioEngine.playPop?.(); } catch {}
    setYSlots(prev => {
      const next = [...prev];
      // If item was placed in another y slot, clear previous
      const prevIdx = next.indexOf(selectedTrayItem.name);
      if (prevIdx !== -1) next[prevIdx] = null;
      next[slotIdx] = selectedTrayItem.name;
      return next;
    });
    setSelectedTrayItem(null);
  };

  // Toggle coordinate intersection point
  const handleTogglePoint = (xIdx, yIdx) => {
    const pointKey = `${xIdx}-${yIdx}`;
    setPlottedPoints(prev => {
      const next = new Set(prev);
      if (next.has(pointKey)) {
        try { audioEngine.playPop?.(); } catch {}
        next.delete(pointKey);
      } else {
        try { audioEngine.playClick(); } catch {}
        next.add(pointKey);
      }
      return next;
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropX = (e, slotIdx) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (item.type === 'x') {
        setXSlots(prev => {
          const next = [...prev];
          const prevIdx = next.indexOf(item.name);
          if (prevIdx !== -1) next[prevIdx] = null;
          next[slotIdx] = item.name;
          return next;
        });
      } else {
        showErrorToast(`⚠️ Sumbu-X khusus untuk nama ${levelData.domainLabel}!`);
      }
    } catch {}
  };

  const handleDropY = (e, slotIdx) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (item.type === 'y') {
        setYSlots(prev => {
          const next = [...prev];
          const prevIdx = next.indexOf(item.name);
          if (prevIdx !== -1) next[prevIdx] = null;
          next[slotIdx] = item.name;
          return next;
        });
      } else {
        showErrorToast(`⚠️ Sumbu-Y khusus untuk ${levelData.kodomainLabel}!`);
      }
    } catch {}
  };

  // ── Validation Handler ──
  const handleValidate = () => {
    // 1. Check if all X slots are filled
    const missingX = xSlots.some(x => !x);
    if (missingX) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`⚠️ Lengkapi dulu semua label nama ${levelData.domainLabel} pada sumbu-x!`);
      return;
    }

    // 2. Check if all Y slots are filled
    const missingY = ySlots.some(y => !y);
    if (missingY) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`⚠️ Lengkapi dulu semua label ${levelData.kodomainLabel} pada sumbu-y!`);
      return;
    }

    // 3. Convert plotted points into name pairs: { xName, yName }
    const userPairs = [];
    plottedPoints.forEach(key => {
      const [xIdx, yIdx] = key.split('-').map(Number);
      const xName = xSlots[xIdx];
      const yName = ySlots[yIdx];
      if (xName && yName) {
        userPairs.push({ x: xName, y: yName });
      }
    });

    // Check if no points were plotted
    if (userPairs.length === 0) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Belum ada titik koordinat yang ditandai! Klik titik pertemuan pada garis grid untuk menandai pesanan.');
      return;
    }

    // 4. Check if uncoupled domain (e.g. Siti) was given a point
    const uncoupledPoints = userPairs.filter(p => p.x === levelData.uncoupledDomain);
    if (uncoupledPoints.length > 0) {
      try { audioEngine.playError(); } catch {}
      showErrorToast(`❌ Perhatikan cerita: ${levelData.uncoupledDomain} ${levelData.uncoupledReason}. Garis sumbu untuk ${levelData.uncoupledDomain} TIDAK boleh memiliki titik pesanan!`);
      return;
    }

    // 5. Compare with expected pairs
    const userPairStrings = userPairs.map(p => `${p.x}->${p.y}`);
    const uniqueUserPairs = new Set(userPairStrings);
    const expectedPairStrings = levelData.expectedPairs.map(ep => `${ep.x}->${ep.y}`);

    const allExpectedPresent = expectedPairStrings.every(ep => uniqueUserPairs.has(ep));
    const noExtraPoints = userPairs.length === levelData.expectedPairs.length;

    if (allExpectedPresent && noExtraPoints) {
      try {
        audioEngine.playCorrect();
        audioEngine.playStageComplete?.();
      } catch {}
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setIsSuccessModalOpen(true);
      if (onComplete) onComplete(100);
    } else {
      try { audioEngine.playError(); } catch {}
      if (userPairs.length < levelData.expectedPairs.length) {
        showErrorToast(`❌ Masih ada titik pesanan yang belum kamu tandai! Total ada ${levelData.expectedPairs.length} pasangan pada cerita.`);
      } else if (userPairs.length > levelData.expectedPairs.length) {
        showErrorToast('❌ Ada titik berlebih yang bukan merupakan pesanan siswa. Periksa kembali informasi pada cerita!');
      } else {
        showErrorToast('❌ Masih ada titik koordinat yang tidak sesuai dengan pesanan siswa pada cerita. Periksa kembali!');
      }
    }
  };

  const handleReset = () => {
    try { audioEngine.playTrash?.(); } catch {}
    setXSlots(Array(levelData.xItems.length).fill(null));
    setYSlots(Array(levelData.yItems.length).fill(null));
    setShuffledX(shuffleArray(levelData.xItems));
    setShuffledY(shuffleArray(levelData.yItems));
    setPlottedPoints(new Set());
    setSelectedTrayItem(null);
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
      {/* ── Top Header Bar with Comic Title Badge & Level Switcher ── */}
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

        {/* 3D Wooden/Comic Signboard Title */}
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

      {/* ── Main Working Grid (Left Story Box | Right Cartesian Plane) ── */}
      <div className="relative flex-1 flex flex-col md:flex-row items-stretch gap-2.5 z-10 min-h-0 py-0.5 max-w-5xl mx-auto w-full">

        {/* Left Column: Story & Instruction Box */}
        <div className="w-full md:w-[35%] flex flex-col justify-between p-3 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-md backdrop-blur-md">
          <div className="space-y-2">
            <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-medium">
              {levelData.story}
            </div>
          </div>

          <div className="mt-2 p-2.5 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/60 text-[11px] sm:text-xs text-[#92400E] font-bold leading-snug">
            {levelData.instruction}
          </div>
        </div>

        {/* Right Column: Interactive Cartesian Coordinate Diagram */}
        <div className="w-full md:w-[65%] flex flex-col rounded-2xl border-2 border-[#1E293B] shadow-lg overflow-hidden bg-white">
          {/* Header Bar */}
          <div className="bg-[#0F4C81] text-white py-1.5 px-3 text-center text-xs sm:text-[13px] font-black tracking-wide">
            {levelData.headerTitle}
          </div>

          {/* Coordinate Plane Area */}
          <div className="flex-1 flex flex-col justify-between p-2 sm:p-3 relative overflow-hidden bg-white">
            
            {/* Main Axis & Grid Container */}
            <div className="relative flex-1 flex items-stretch">
              
              {/* Y-Axis Label Slots (Left of Y Axis) */}
              <div className="w-24 sm:w-28 flex flex-col-reverse justify-between pr-1.5 py-2">
                {levelData.yItems.map((_, yIdx) => {
                  const val = ySlots[yIdx];
                  return (
                    <button
                      key={yIdx}
                      onClick={() => handleYSlotClick(yIdx)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropY(e, yIdx)}
                      className={`h-5 sm:h-6 px-1.5 rounded-md flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer truncate ${
                        val
                          ? 'bg-sky-50 border border-sky-600 text-sky-950 shadow-xs'
                          : 'border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 hover:border-sky-400'
                      }`}
                      title={val ? `Klik untuk hapus (${val})` : 'Klik untuk letakkan menu'}
                    >
                      <span className="truncate">{val || `Slot Y${yIdx + 1}`}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cartesian Canvas with Grid and Dots */}
              <div className="relative flex-1 border-l-2 border-b-2 border-slate-900 ml-1 mb-1 flex flex-col-reverse justify-between">
                
                {/* Y-Axis Arrow at Top */}
                <div className="absolute -top-3.5 -left-[7px] text-slate-900 font-black text-xs flex items-center gap-0.5">
                  <span>▲</span>
                  <span className="text-[11px] italic">y</span>
                </div>

                {/* X-Axis Arrow at Right */}
                <div className="absolute -bottom-[8px] -right-3 text-slate-900 font-black text-xs flex items-center">
                  <span>►</span>
                  <span className="text-[11px] italic ml-0.5">x</span>
                </div>

                {/* Grid Rows (corresponding to Y levels) */}
                {levelData.yItems.map((_, yIdx) => (
                  <div key={yIdx} className="relative flex-1 flex items-center border-t border-dashed border-slate-200">
                    
                    {/* Y-Axis Tick mark */}
                    <div className="absolute -left-[5px] w-2.5 h-0.5 bg-slate-800" />

                    {/* Intersection Dots along this Y row */}
                    {levelData.xItems.map((_, xIdx) => {
                      const pointKey = `${xIdx}-${yIdx}`;
                      const isPlotted = plottedPoints.has(pointKey);
                      const xName = xSlots[xIdx];
                      const yName = ySlots[yIdx];

                      return (
                        <div
                          key={xIdx}
                          onClick={() => handleTogglePoint(xIdx, yIdx)}
                          className="flex-1 h-full flex items-center justify-center relative cursor-pointer group"
                          title={
                            xName && yName
                              ? `Titik (${xName}, ${yName}) - Klik untuk pasang/hapus`
                              : `Klik untuk tandai titik (${xIdx + 1}, ${yIdx + 1})`
                          }
                        >
                          {/* Invisible expanded hit area */}
                          <div className="absolute inset-0 z-10" />

                          {/* Hover target indicator */}
                          <div className="w-3 h-3 rounded-full border border-dashed border-sky-300 opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Plotted Dot (Vibrant Red/Amber Pin) */}
                          {isPlotted && (
                            <div className="relative z-20 flex items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-rose-400 opacity-60" />
                              <span className="relative inline-flex rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-tr from-rose-600 to-amber-500 border-2 border-white shadow-md" />
                            </div>
                          )}
                        </div>
                      );
                    })}

                  </div>
                ))}

                {/* Bottom X-Axis Ticks */}
                <div className="absolute -bottom-[5px] left-0 right-0 flex justify-between">
                  {levelData.xItems.map((_, xIdx) => (
                    <div key={xIdx} className="flex-1 flex justify-center">
                      <div className="w-0.5 h-2.5 bg-slate-800" />
                    </div>
                  ))}
                </div>

                {/* Vertical Dashed Grid Lines for X columns */}
                <div className="absolute inset-0 pointer-events-none flex justify-between">
                  {levelData.xItems.map((_, xIdx) => (
                    <div key={xIdx} className="flex-1 border-r border-dashed border-slate-200" />
                  ))}
                </div>

              </div>

            </div>

            {/* X-Axis Label Slots (Below X Axis) */}
            <div className="pl-24 sm:pl-28 pt-1 flex justify-between gap-1">
              {levelData.xItems.map((_, xIdx) => {
                const val = xSlots[xIdx];
                return (
                  <button
                    key={xIdx}
                    onClick={() => handleXSlotClick(xIdx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropX(e, xIdx)}
                    className={`flex-1 h-6 sm:h-7 px-1 rounded-md flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer truncate ${
                      val
                        ? 'bg-rose-50 border border-rose-500 text-rose-950 shadow-xs'
                        : 'border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 hover:border-rose-400'
                    }`}
                    title={val ? `Klik untuk hapus (${val})` : 'Klik untuk letakkan siswa'}
                  >
                    <span className="truncate">{val || `Slot X${xIdx + 1}`}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* ── Bottom Card Tray (Row 1: Siswa X | Row 2: Makanan Y) ── */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-md my-1 max-w-5xl mx-auto w-full">
        {/* Row 1: X Domain Items (Pink outline) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pb-1.5 border-b border-slate-200">
          <span className="text-[11px] font-black text-rose-800 pr-1 flex items-center gap-1">
            <span>Sumbu X:</span>
          </span>
          {shuffledX.map((name) => {
            const isPlaced = xSlots.includes(name);
            const isSelected = selectedTrayItem?.name === name;

            return (
              <button
                key={name}
                draggable
                onDragStart={(e) => handleDragStart(e, { name, type: 'x' })}
                onClick={() => handleSelectTrayItem({ name, type: 'x' })}
                className={`px-3 py-1 rounded-xl border-2 font-bold text-xs sm:text-[13px] shadow-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-700 scale-105 shadow-md ring-2 ring-rose-400'
                    : isPlaced
                    ? 'bg-rose-50 border-rose-300 text-rose-700 opacity-60'
                    : 'bg-white hover:bg-rose-50 border-rose-400 text-slate-800 hover:scale-102 active:scale-95'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Row 2: Y Kodomain Items (Blue outline) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5">
          <span className="text-[11px] font-black text-sky-800 pr-1 flex items-center gap-1">
            <span>Sumbu Y:</span>
          </span>
          {shuffledY.map((name) => {
            const isPlaced = ySlots.includes(name);
            const isSelected = selectedTrayItem?.name === name;

            return (
              <button
                key={name}
                draggable
                onDragStart={(e) => handleDragStart(e, { name, type: 'y' })}
                onClick={() => handleSelectTrayItem({ name, type: 'y' })}
                className={`px-2.5 sm:px-3 py-1 rounded-xl border-2 font-bold text-xs sm:text-[12px] shadow-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-700 scale-105 shadow-md ring-2 ring-sky-400'
                    : isPlaced
                    ? 'bg-sky-50 border-sky-300 text-sky-700 opacity-60'
                    : 'bg-white hover:bg-sky-50 border-sky-400 text-slate-800 hover:scale-102 active:scale-95'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Action Bar: Reset | Catatan | Selesai ── */}
      <div className="flex items-center justify-between w-full gap-2 px-1 max-w-5xl mx-auto">
        {/* Blue Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm border-2 border-[#0369A1] shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        {/* Note Badge in Center */}
        <div className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] text-[11px] sm:text-xs font-bold shadow-sm">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Catatan: {levelData.noteText}</span>
        </div>

        {/* Amber Finish Button */}
        <button
          onClick={handleValidate}
          className="flex items-center gap-1.5 px-6 sm:px-8 py-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm border-2 border-[#78350F] shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <span>Selesai</span>
          <ArrowRight className="w-4 h-4" />
        </button>
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
            
            {/* Header Trophy */}
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-lg border-2 border-white mb-2">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-100 animate-bounce" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#78350F] uppercase tracking-wide">
              Diagram Kartesius Sempurna!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
              Luar biasa detektif! Kamu berhasil menyajikan relasi pada bidang koordinat Kartesius dengan sangat akurat.
            </p>

            {/* Plotted Points Notation Box */}
            <div className="my-3 p-3 rounded-2xl bg-white border-2 border-[#1E293B] shadow-inner text-left">
              <div className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Titik Koordinat Relasi (x, y):</span>
              </div>
              <div className="font-mono text-xs sm:text-[13px] font-bold text-slate-800 bg-slate-50 p-2 rounded-xl border border-slate-200 overflow-x-auto">
                &#123; {levelData.expectedPairs.map(p => `(${p.x}, ${p.y})`).join(', ')} &#125;
              </div>
            </div>

            {/* Detective Deductions */}
            <div className="text-left space-y-1.5 mb-4">
              <h4 className="text-xs font-black text-slate-700 uppercase">
                🔍 Analisis Detektif Diagram Kartesius:
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

            {/* Action Buttons */}
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
