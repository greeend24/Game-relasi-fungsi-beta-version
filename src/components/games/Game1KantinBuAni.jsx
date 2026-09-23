import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Check, Sparkles, AlertCircle, ArrowLeft, Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

// Initial dataset based on the story
const INITIAL_SISWA = ['Andi', 'Ani', 'Budi', 'Siti'];
const INITIAL_MAKANAN = [
  'Bubur',
  'Nasi goreng',
  'Soto',
  'Sandwich',
  'Bakso',
  'Air putih',
  'Esteh',
  'Es buah',
];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function Game1KantinBuAni({ onBack, onComplete }) {
  // Randomize card tray order so there is no fixed pattern
  const [shuffledSiswa, setShuffledSiswa] = useState(() => shuffleArray(INITIAL_SISWA));
  const [shuffledMakanan, setShuffledMakanan] = useState(() => shuffleArray(INITIAL_MAKANAN));

  // Slots state inside the ovals (array of 4 for Siswa, 8 for Makanan)
  const [siswaSlots, setSiswaSlots] = useState([null, null, null, null]);
  const [makananSlots, setMakananSlots] = useState([
    null, null, null, null,
    null, null, null, null,
  ]);

  // Selected item in tray for click-to-place
  const [selectedTrayItem, setSelectedTrayItem] = useState(null); // { type: 'siswa'|'makanan', name: string }

  // Arrow connection states: array of { fromStudent: string, toFood: string }
  const [connections, setConnections] = useState([]);

  // Active student dot selected for drawing arrow
  const [activeStudentIdx, setActiveStudentIdx] = useState(null);

  // Validation / Feedback states
  const [errorToast, setErrorToast] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Refs for calculating dot coordinates for SVG arrow rendering
  const containerRef = useRef(null);
  const studentDotRefs = useRef([]);
  const foodDotRefs = useRef([]);
  const [dotCoordinates, setDotCoordinates] = useState({ students: {}, foods: {} });

  // Update dot coordinates relative to container
  const updateCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const studentCoords = {};
    studentDotRefs.current.forEach((el, idx) => {
      if (el) {
        const r = el.getBoundingClientRect();
        studentCoords[idx] = {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      }
    });

    const foodCoords = {};
    foodDotRefs.current.forEach((el, idx) => {
      if (el) {
        const r = el.getBoundingClientRect();
        foodCoords[idx] = {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      }
    });

    setDotCoordinates({ students: studentCoords, foods: foodCoords });
  }, []);

  // Update coordinates on resize, slot changes, or render
  useEffect(() => {
    updateCoordinates();
    const handleResize = () => updateCoordinates();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(updateCoordinates, 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [siswaSlots, makananSlots, updateCoordinates]);

  // ── Handlers for Card Placement ──

  const handleSelectTrayItem = (type, name) => {
    try { audioEngine.playClick(); } catch {}
    if (selectedTrayItem?.name === name) {
      setSelectedTrayItem(null);
    } else {
      setSelectedTrayItem({ type, name });
    }
  };

  const handleSlotClick = (slotType, slotIdx) => {
    if (slotType === 'siswa') {
      const currentInSlot = siswaSlots[slotIdx];
      // If student in slot, clicking returns it to tray and removes related arrows
      if (currentInSlot && !selectedTrayItem) {
        try { audioEngine.playTrash?.(); } catch {}
        const newSlots = [...siswaSlots];
        newSlots[slotIdx] = null;
        setSiswaSlots(newSlots);
        setConnections(prev => prev.filter(c => c.fromStudent !== currentInSlot));
        if (activeStudentIdx === slotIdx) setActiveStudentIdx(null);
        return;
      }

      // If user has selected a siswa card from tray, place it
      if (selectedTrayItem && selectedTrayItem.type === 'siswa') {
        try { audioEngine.playPop?.(); } catch {}
        const newSlots = [...siswaSlots];
        const prevStudent = newSlots[slotIdx];
        if (prevStudent) {
          setConnections(prev => prev.filter(c => c.fromStudent !== prevStudent));
        }
        newSlots[slotIdx] = selectedTrayItem.name;
        setSiswaSlots(newSlots);
        setSelectedTrayItem(null);
      } else if (selectedTrayItem && selectedTrayItem.type !== 'siswa') {
        showErrorToast('⚠️ Kartu makanan tidak dapat ditaruh di himpunan Siswa!');
      }
    } else if (slotType === 'makanan') {
      const currentInSlot = makananSlots[slotIdx];
      // If food in slot, clicking returns it to tray and removes related arrows
      if (currentInSlot && !selectedTrayItem) {
        try { audioEngine.playTrash?.(); } catch {}
        const newSlots = [...makananSlots];
        newSlots[slotIdx] = null;
        setMakananSlots(newSlots);
        setConnections(prev => prev.filter(c => c.toFood !== currentInSlot));
        return;
      }

      // If user has selected a makanan card from tray, place it
      if (selectedTrayItem && selectedTrayItem.type === 'makanan') {
        try { audioEngine.playPop?.(); } catch {}
        const newSlots = [...makananSlots];
        const prevFood = newSlots[slotIdx];
        if (prevFood) {
          setConnections(prev => prev.filter(c => c.toFood !== prevFood));
        }
        newSlots[slotIdx] = selectedTrayItem.name;
        setMakananSlots(newSlots);
        setSelectedTrayItem(null);
      } else if (selectedTrayItem && selectedTrayItem.type !== 'makanan') {
        showErrorToast('⚠️ Kartu nama siswa tidak dapat ditaruh di himpunan Makanan/Minuman!');
      }
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (e, type, name) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, name }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotType, slotIdx) => {
    e.preventDefault();
    try {
      const raw = e.dataTransfer.getData('text/plain');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.type !== slotType) {
        showErrorToast(`⚠️ Kartu ${data.type} harus dimasukkan ke himpunan ${slotType}!`);
        return;
      }
      try { audioEngine.playPop?.(); } catch {}
      if (slotType === 'siswa') {
        const newSlots = [...siswaSlots];
        const prev = newSlots[slotIdx];
        if (prev) setConnections(c => c.filter(item => item.fromStudent !== prev));
        newSlots[slotIdx] = data.name;
        setSiswaSlots(newSlots);
      } else {
        const newSlots = [...makananSlots];
        const prev = newSlots[slotIdx];
        if (prev) setConnections(c => c.filter(item => item.toFood !== prev));
        newSlots[slotIdx] = data.name;
        setMakananSlots(newSlots);
      }
      setSelectedTrayItem(null);
    } catch {}
  };

  // ── Arrow Connection Handlers ──

  const handleStudentDotClick = (studentIdx) => {
    const studentName = siswaSlots[studentIdx];
    if (!studentName) {
      showErrorToast('💡 Isi slot nama siswa terlebih dahulu sebelum menarik panah.');
      return;
    }
    try { audioEngine.playClick(); } catch {}
    if (activeStudentIdx === studentIdx) {
      setActiveStudentIdx(null);
    } else {
      setActiveStudentIdx(studentIdx);
    }
  };

  const handleFoodDotClick = (foodIdx) => {
    const foodName = makananSlots[foodIdx];
    if (!foodName) {
      showErrorToast('💡 Isi slot makanan/minuman terlebih dahulu sebelum menyambungkan panah.');
      return;
    }

    if (activeStudentIdx === null) {
      showErrorToast('💡 Klik titik hitam pada nama Siswa terlebih dahulu untuk mulai menarik panah!');
      return;
    }

    const studentName = siswaSlots[activeStudentIdx];
    if (!studentName) return;

    try { audioEngine.playPop?.(); } catch {}

    // Check if connection already exists
    const exists = connections.some(
      c => c.fromStudent === studentName && c.toFood === foodName
    );

    if (exists) {
      // Toggle off connection
      setConnections(prev =>
        prev.filter(c => !(c.fromStudent === studentName && c.toFood === foodName))
      );
    } else {
      // Add connection
      setConnections(prev => [...prev, { fromStudent: studentName, toFood: foodName }]);
    }

    setActiveStudentIdx(null);
  };

  const removeConnection = (fromStudent, toFood) => {
    try { audioEngine.playTrash?.(); } catch {}
    setConnections(prev =>
      prev.filter(c => !(c.fromStudent === fromStudent && c.toFood === toFood))
    );
  };

  // ── Validation Handler (Selesai Button) ──

  const handleValidate = () => {
    // 1. Check all slots filled
    const isSiswaComplete = siswaSlots.every(s => s !== null);
    const isMakananComplete = makananSlots.every(m => m !== null);

    if (!isSiswaComplete || !isMakananComplete) {
      try { audioEngine.playError(); } catch {}
      showErrorToast('⚠️ Pindahkan semua kotak nama siswa (4) dan makanan/minuman (8) ke dalam himpunan terlebih dahulu!');
      return;
    }

    // 2. Build current connections map by student
    const studentConnections = {
      'Andi': [],
      'Ani': [],
      'Budi': [],
      'Siti': [],
    };

    connections.forEach(c => {
      if (studentConnections[c.fromStudent]) {
        studentConnections[c.fromStudent].push(c.toFood);
      }
    });

    // 3. Verify against expected
    let errors = [];

    // Check Andi
    const andiFoods = studentConnections['Andi'];
    if (andiFoods.length === 0) {
      errors.push('Andi ingin memesan bakso!');
    } else if (andiFoods.length > 1 || !andiFoods.includes('Bakso')) {
      errors.push('Andi hanya memesan bakso saja.');
    }

    // Check Ani
    const aniFoods = studentConnections['Ani'];
    if (!aniFoods.includes('Nasi goreng') || !aniFoods.includes('Esteh') || aniFoods.length !== 2) {
      errors.push('Ani memesan 2 jajanan: nasi goreng dan esteh!');
    }

    // Check Budi
    const budiFoods = studentConnections['Budi'];
    if (budiFoods.length === 0) {
      errors.push('Budi memesan es buah!');
    } else if (budiFoods.length > 1 || !budiFoods.includes('Es buah')) {
      errors.push('Budi hanya memesan es buah saja.');
    }

    // Check Siti
    const sitiFoods = studentConnections['Siti'];
    if (sitiFoods.length > 0) {
      errors.push('Siti sedang puasa, sehingga tidak menitipkan pesanan apa pun (tidak memiliki panah)!');
    }

    if (errors.length === 0) {
      // SUCCESS!
      try {
        audioEngine.playCorrect();
        audioEngine.playStageComplete?.();
      } catch {}
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setIsSuccessModalOpen(true);
      if (onComplete) onComplete(100);
    } else {
      try { audioEngine.playError(); } catch {}
      showErrorToast('❌ Masih ada yang belum tepat:\n• ' + errors.join('\n• '));
    }
  };

  const handleReset = () => {
    try { audioEngine.playTrash?.(); } catch {}
    setSiswaSlots([null, null, null, null]);
    setMakananSlots([null, null, null, null, null, null, null, null]);
    setShuffledSiswa(shuffleArray(INITIAL_SISWA));
    setShuffledMakanan(shuffleArray(INITIAL_MAKANAN));
    setConnections([]);
    setActiveStudentIdx(null);
    setSelectedTrayItem(null);
    setErrorToast(null);
  };

  const showErrorToast = (msg) => {
    setErrorToast(msg);
    setTimeout(() => {
      setErrorToast(null);
    }, 5000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[660px] max-h-[720px] flex flex-col justify-between p-3 sm:p-4 select-none overflow-hidden font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.40), rgba(255, 255, 255, 0.40)), url('/images/canteen_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ── Top Header Bar with Comic Banner ── */}
      <div className="flex items-center justify-between w-full z-20 flex-shrink-0 mb-1">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-gray-800 font-black text-xs sm:text-sm shadow-md border-2 border-amber-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Kembali</span>
          </button>
        ) : (
          <div className="w-20" />
        )}

        {/* Comic Banner "Ayo Bantu Bu Ani ke Kantin!" */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="px-6 sm:px-10 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-b from-[#F59E0B] via-[#D97706] to-[#92400E] border-3 border-[#78350F] shadow-[0_5px_0_#451A03,0_10px_20px_rgba(0,0,0,0.25)] transform hover:scale-[1.01] transition">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-amber-100 tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
              Ayo Bantu Bu Ani ke Kantin!
            </h1>
          </div>
        </div>

        <div className="w-20" />
      </div>

      {/* ── Main Playfield Grid (Story & Tray on Left | Diagram Ovals on Right) ── */}
      <div className="relative flex-1 grid grid-cols-12 gap-3.5 items-center z-10 min-h-0 py-1">

        {/* ── Left Column (Col 1 to 5): Story Card + Card Bank Tray ── */}
        <div className="col-span-5 flex flex-col justify-between h-full max-h-[550px] gap-2.5">
          
          {/* Story Card Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF5]/95 border-2 border-[#D97706]/40 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md flex flex-col justify-between">
            <div className="text-xs sm:text-[13px] text-[#1E293B] leading-relaxed space-y-1.5 font-medium">
              <p>
                Ketika mau ke kantin, Bu Ani menawarkan kepada beberapa siswa di kelas yang ingin memesan jajanan di kantin. Di kantin tersedia <b>bubur, nasi goreng, soto, sandwich, air putih, esteh, dan es buah</b>.
              </p>
              <p>
                <b>Andi</b> ingin <b>bakso</b>, <b>Ani</b> ingin <b>nasi goreng dan esteh</b>, <b>Budi</b> <b>es buah</b>, dan <b>Siti</b> tidak menitipkan apa apa karena <b>puasa</b>.
              </p>
            </div>

            {/* Highlighted Yellow Instruction Box */}
            <div className="mt-2 p-2 rounded-xl bg-[#FEF08A]/90 border border-[#EAB308] text-[11px] sm:text-xs text-[#713F12] font-black leading-snug">
              Pindahkan kotak <b>nama siswa</b> dan <b>makanan/minuman</b> ke dalam himpunan yang sesuai, kemudian <b>hubungkan dengan panah</b> berdasarkan informasi pada cerita!
            </div>
          </div>

          {/* Card Bank Tray */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 border-2 border-[#CBD5E1] shadow-lg backdrop-blur-md flex flex-col gap-2">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider flex items-center justify-between">
              <span>🏷️ Kotak Pilihan (Klik / Geser Kartu)</span>
              {selectedTrayItem && (
                <span className="text-amber-600 font-bold animate-pulse">
                  Terpilih: {selectedTrayItem.name}
                </span>
              )}
            </div>

            {/* Grid of Chips */}
            <div className="grid grid-cols-2 gap-2">
              {/* Siswa Column */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-rose-700 uppercase">Siswa:</span>
                <div className="grid grid-cols-1 gap-1">
                  {shuffledSiswa.map((name) => {
                    const isPlaced = siswaSlots.includes(name);
                    const isSelected = selectedTrayItem?.name === name;
                    return (
                      <button
                        key={name}
                        disabled={isPlaced}
                        draggable={!isPlaced}
                        onDragStart={(e) => handleDragStart(e, 'siswa', name)}
                        onClick={() => handleSelectTrayItem('siswa', name)}
                        className={`h-8 px-2.5 rounded-xl border-2 font-black text-xs transition-all flex items-center justify-center ${
                          isPlaced
                            ? 'opacity-25 bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-amber-300 border-amber-600 text-black ring-2 ring-amber-400 shadow-md scale-105 animate-pulse'
                            : 'bg-white border-black text-black hover:bg-amber-50 hover:border-amber-600 shadow-xs cursor-grab active:cursor-grabbing'
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Makanan / Minuman Column */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-sky-700 uppercase">Makanan/Minuman:</span>
                <div className="grid grid-cols-2 gap-1">
                  {shuffledMakanan.map((name) => {
                    const isPlaced = makananSlots.includes(name);
                    const isSelected = selectedTrayItem?.name === name;
                    return (
                      <button
                        key={name}
                        disabled={isPlaced}
                        draggable={!isPlaced}
                        onDragStart={(e) => handleDragStart(e, 'makanan', name)}
                        onClick={() => handleSelectTrayItem('makanan', name)}
                        className={`h-8 px-1.5 rounded-xl border-2 font-black text-[10px] sm:text-[11px] truncate transition-all flex items-center justify-center ${
                          isPlaced
                            ? 'opacity-25 bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-sky-300 border-sky-600 text-black ring-2 ring-sky-400 shadow-md scale-105 animate-pulse'
                            : 'bg-white border-black text-black hover:bg-sky-50 hover:border-sky-600 shadow-xs cursor-grab active:cursor-grabbing'
                        }`}
                        title={name}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Area (Col 6 to 12): The Two Ovals & Connecting Arrows ── */}
        <div className="col-span-7 relative flex items-center justify-center gap-10 sm:gap-16 h-full max-h-[550px]">
          
          {/* Guidance Note: "Tarik panah dari titik ini" */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
            <span className="text-xs font-black text-[#1E293B] bg-white/95 px-3 py-1 rounded-full shadow-md border border-amber-300">
              Tarik panah dari titik ini
            </span>
            <div className="flex justify-between w-28 text-base font-black text-gray-800 -mt-1">
              <span>↶</span>
              <span>↷</span>
            </div>
          </div>

          {/* SVG Overlay for Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <defs>
              <marker
                id="arrowhead-game1"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <polygon points="0 0, 9 4.5, 0 9" fill="#1E293B" />
              </marker>
            </defs>

            {/* Render established connections */}
            {connections.map((c, idx) => {
              const studentSlotIdx = siswaSlots.indexOf(c.fromStudent);
              const foodSlotIdx = makananSlots.indexOf(c.toFood);

              const p1 = dotCoordinates.students[studentSlotIdx];
              const p2 = dotCoordinates.foods[foodSlotIdx];

              if (!p1 || !p2) return null;

              const midX = (p1.x + p2.x) / 2;

              return (
                <g key={idx} className="cursor-pointer pointer-events-auto" onClick={() => removeConnection(c.fromStudent, c.toFood)}>
                  {/* Invisible thick line for easy clicking/tapping to remove */}
                  <path
                    d={`M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`}
                    stroke="transparent"
                    strokeWidth="20"
                    fill="none"
                  />
                  {/* Visible arrow line */}
                  <path
                    d={`M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`}
                    stroke="#1E293B"
                    strokeWidth="3.5"
                    fill="none"
                    markerEnd="url(#arrowhead-game1)"
                    className="transition-all hover:stroke-rose-600 hover:stroke-[4.5]"
                  />
                </g>
              );
            })}
          </svg>

          {/* ── Left Oval: Himpunan SISWA (Pink Oval) ── */}
          <div className="relative w-44 sm:w-48 h-[470px] rounded-[90px] bg-[#FFE4E6]/95 border-3 border-[#F43F5E] shadow-2xl flex flex-col items-center pt-8 pb-5 px-3 z-10">
            {/* Header Badge */}
            <div className="absolute -top-4 px-6 py-1.5 rounded-2xl bg-[#FDA4AF] border-2 border-black font-black text-sm text-black shadow-md">
              Siswa
            </div>

            {/* 4 Slots */}
            <div className="w-full flex-1 flex flex-col justify-around my-auto">
              {siswaSlots.map((item, idx) => (
                <div key={idx} className="relative flex items-center">
                  <div
                    onClick={() => handleSlotClick('siswa', idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'siswa', idx)}
                    className={`w-full h-10 rounded-xl border-2 border-dashed flex items-center justify-center font-black text-xs transition cursor-pointer ${
                      item
                        ? 'bg-white border-black text-black shadow-md'
                        : selectedTrayItem?.type === 'siswa'
                        ? 'bg-rose-100/90 border-rose-400 animate-pulse ring-2 ring-rose-300'
                        : 'border-[#FB7185] bg-white/40 hover:bg-white/80'
                    }`}
                  >
                    {item ? <span>{item}</span> : <span className="text-[10px] text-rose-400/80">[ Nama Siswa ]</span>}
                  </div>

                  {/* Dot on the Right Edge of Siswa Slot */}
                  <button
                    ref={el => studentDotRefs.current[idx] = el}
                    onClick={() => handleStudentDotClick(idx)}
                    className={`absolute -right-2 w-4 h-4 rounded-full border-2 transition transform cursor-pointer z-30 ${
                      activeStudentIdx === idx
                        ? 'bg-amber-500 border-white ring-4 ring-amber-400 scale-125 animate-bounce'
                        : 'bg-black border-white hover:scale-125'
                    }`}
                    title={item ? `Klik titik ini untuk menarik panah dari ${item}` : 'Isi slot siswa terlebih dahulu'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Oval: Himpunan MAKANAN/MINUMAN (Light Blue Oval) ── */}
          <div className="relative w-48 sm:w-56 h-[500px] rounded-[100px] bg-[#E0F2FE]/95 border-3 border-[#0284C7] shadow-2xl flex flex-col items-center pt-8 pb-5 px-3 z-10">
            {/* Header Badge */}
            <div className="absolute -top-4 px-6 py-1.5 rounded-2xl bg-[#7DD3FC] border-2 border-black font-black text-sm text-black shadow-md whitespace-nowrap">
              Makanan/Minuman
            </div>

            {/* 8 Slots */}
            <div className="w-full flex-1 flex flex-col justify-around my-auto gap-1">
              {makananSlots.map((item, idx) => (
                <div key={idx} className="relative flex items-center">
                  {/* Dot on the Left Edge of Makanan Slot */}
                  <button
                    ref={el => foodDotRefs.current[idx] = el}
                    onClick={() => handleFoodDotClick(idx)}
                    className={`absolute -left-2 w-4 h-4 rounded-full border-2 transition transform cursor-pointer z-30 ${
                      activeStudentIdx !== null
                        ? 'bg-sky-500 border-white ring-2 ring-sky-300 scale-110 hover:scale-130'
                        : 'bg-black border-white hover:scale-125'
                    }`}
                    title={item ? `Klik untuk menghubungkan panah ke ${item}` : 'Isi slot makanan terlebih dahulu'}
                  />

                  <div
                    onClick={() => handleSlotClick('makanan', idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'makanan', idx)}
                    className={`w-full h-8 rounded-xl border-2 border-dashed flex items-center justify-center font-black text-[10px] sm:text-[11px] transition cursor-pointer ${
                      item
                        ? 'bg-white border-black text-black shadow-md'
                        : selectedTrayItem?.type === 'makanan'
                        ? 'bg-sky-100/90 border-sky-400 animate-pulse ring-2 ring-sky-300'
                        : 'border-[#38BDF8] bg-white/40 hover:bg-white/80'
                    }`}
                  >
                    {item ? <span className="truncate px-1">{item}</span> : <span className="text-[9px] text-sky-400/80">[ Menu ]</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── Error Toast Notification ── */}
      {errorToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 max-w-lg w-11/12 p-3 rounded-2xl bg-[#991B1B] text-white text-xs sm:text-sm font-black shadow-2xl border-2 border-rose-300 animate-bounce flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 whitespace-pre-line">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-300" />
            <span>{errorToast}</span>
          </div>
          <button onClick={() => setErrorToast(null)} className="p-1 hover:bg-rose-800 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Bottom Action Bar (Reset on Left | Selesai on Right) ── */}
      <div className="w-full flex items-center justify-between z-30 flex-shrink-0 pt-1">
        {/* Reset Button (Navy/Slate Pill with Cyan outline) */}
        <button
          onClick={handleReset}
          className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#1E293B] hover:bg-[#0F172A] text-white border-2 border-[#38BDF8] font-black text-sm sm:text-base shadow-lg flex items-center gap-2 transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#38BDF8]" />
          <span>Reset</span>
        </button>

        {/* Selesai Button (Golden Amber Pill with Checkmark) */}
        <button
          onClick={handleValidate}
          className="px-8 sm:px-12 py-2 sm:py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black border-2 border-black font-black text-sm sm:text-base shadow-[0_5px_0_#92400E] flex items-center gap-2 transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Selesai</span>
          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* ── Educational Success Modal Dialog ── */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF5] to-[#FEF3C7] border-4 border-[#D97706] shadow-2xl flex flex-col items-center text-center relative">
            
            <div className="w-16 h-16 rounded-full bg-amber-400 border-2 border-amber-700 flex items-center justify-center shadow-lg -mt-12 mb-3">
              <Trophy className="w-9 h-9 text-amber-950 animate-bounce" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#78350F] mb-1 font-sans">
              🎉 Luar Biasa! Kamu Berhasil!
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-4 font-bold">
              Kamu berhasil menyusun dan menghubungkan relasi <b>"Memesan Makanan di Kantin"</b> dengan tepat!
            </p>

            {/* Pedagogical Takeaways */}
            <div className="w-full p-3.5 rounded-2xl bg-white/90 border border-amber-300 text-left text-xs text-gray-800 space-y-2 mb-5">
              <div className="font-black text-[#92400E] flex items-center gap-1.5 border-b border-amber-200 pb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Konsep Penting Relasi yang Kamu Pelajari:</span>
              </div>
              <ul className="space-y-1.5 pl-4 list-disc text-gray-700 font-medium">
                <li>
                  <b>Ani memesan 2 jajanan</b> (Nasi goreng & Esteh): Anggota himpunan asal <i>(Domain)</i> <b>boleh memiliki lebih dari 1 pasangan</b>!
                </li>
                <li>
                  <b>Siti tidak memesan apa pun</b> (Puasa): Anggota domain <b>boleh tidak memiliki pasangan</b> (kosong)!
                </li>
                <li>
                  <b>Bubur, Soto, Sandwich, & Air putih tidak dipesan</b>: Anggota himpunan kawan <i>(Kodomain)</i> <b>tidak wajib menerima panah</b>!
                </li>
              </ul>
              <div className="text-[11px] text-amber-800 font-black bg-amber-100 p-2 rounded-xl text-center">
                💡 Kesimpulan: Relasi adalah aturan penghubung yang <u>sangat fleksibel</u>!
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  handleReset();
                }}
                className="flex-1 py-2.5 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-xs sm:text-sm transition cursor-pointer"
              >
                Ulangi Game
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  if (onBack) onBack();
                }}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Selesai & Lanjut ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
