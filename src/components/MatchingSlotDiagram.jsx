import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

/**
 * MatchingSlotDiagram
 * Visual Diagram Dua Himpunan (mirip Diagram Panah tanpa tali panah).
 * Menampilkan:
 * - Kolom Kiri: Himpunan A (Item Asal / Soal)
 * - Tanda Hubung: Panah statis (➔)
 * - Kolom Kanan: Kotak-kotak kosong target [ ? ] yang siap diisi
 * - Kotak Pilihan Jawaban di bagian bawah dengan kartu-kartu yang bisa diklik atau di-drag ke kotak kosong.
 */
export default function MatchingSlotDiagram({
  pairs = [],              // [{ left: "...", right: "..." }] atau [{ x: ..., result: ... }]
  rightOptions = [],       // Pilihan jawaban (kartu-kartu teracak)
  answers = {},            // { [leftKey]: "selectedRight" }
  onSelectPair,            // (leftKey, rightVal) => void
  onRemovePair,            // (leftKey) => void
  isAnswered = false,
  labelA = 'Himpunan A (Soal)',
  labelB = 'Himpunan B (Jawaban Target)',
  compact = false
}) {
  // State kartu jawaban yang sedang aktif dipilih siswa dari bank jawaban
  const [selectedCard, setSelectedCard] = useState(null);
  // State slot yang dihover saat drag
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Nilai-nilai jawaban yang sedang terpasang di kotak target
  const assignedValues = Object.values(answers);

  // Kumpulan opsi jawaban unik
  const allOptions = rightOptions && rightOptions.length > 0
    ? rightOptions
    : Array.from(new Set(pairs.map(p => (p.right !== undefined ? p.right : p.result))));

  // Klik slot kotak target (baik kosong maupun sudah terisi)
  const handleSlotClick = (leftKey, currentVal) => {
    if (isAnswered) return;

    if (selectedCard) {
      try { audioEngine.playPop(); } catch {}
      onSelectPair(leftKey, selectedCard);
      setSelectedCard(null);
    } else if (currentVal && onRemovePair) {
      try { audioEngine.playTrash?.() || audioEngine.playClick(); } catch {}
      onRemovePair(leftKey);
    }
  };

  // Klik kartu jawaban di bank pilihan bawah
  const handleCardClick = (opt) => {
    if (isAnswered) return;
    try { audioEngine.playClick(); } catch {}

    // Jika kartu yang sama diklik lagi, batalkan pilihan
    if (selectedCard === opt) {
      setSelectedCard(null);
      return;
    }

    // Jika belum ada kartu yang terpilih dan ada slot yang kosong, langsung isi slot kosong pertama
    if (!selectedCard) {
      const firstEmpty = pairs.find(p => {
        const k = p.left !== undefined ? p.left : p.x;
        return answers[k] === undefined || answers[k] === null || answers[k] === '';
      });

      if (firstEmpty) {
        const targetK = firstEmpty.left !== undefined ? firstEmpty.left : firstEmpty.x;
        try { audioEngine.playPop(); } catch {}
        onSelectPair(targetK, opt);
        setSelectedCard(null);
        return;
      }
    }

    setSelectedCard(opt);
  };

  // Drag and drop handlers
  const handleDragStart = (e, opt) => {
    if (isAnswered) return;
    e.dataTransfer.setData('text/plain', String(opt));
    e.dataTransfer.effectAllowed = 'copyMove';
    setSelectedCard(opt);
  };

  const handleDragOverSlot = (e, leftKey) => {
    if (isAnswered) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (hoveredSlot !== leftKey) setHoveredSlot(leftKey);
  };

  const handleDragLeaveSlot = (leftKey) => {
    if (hoveredSlot === leftKey) setHoveredSlot(null);
  };

  const handleDropSlot = (e, leftKey) => {
    if (isAnswered) return;
    e.preventDefault();
    setHoveredSlot(null);
    const droppedOpt = e.dataTransfer.getData('text/plain') || selectedCard;
    if (droppedOpt) {
      try { audioEngine.playPop(); } catch {}
      onSelectPair(leftKey, droppedOpt);
      setSelectedCard(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-2.5 max-w-2xl mx-auto select-none font-hand">
      
      {/* ── AREA DIAGRAM DUA HIMPUNAN (KIRI & KANAN) ── */}
      <div className="rounded-2xl p-2.5 sm:p-3 glass-panel-subtle border-2 border-amber-300/80 shadow-md">
        
        {/* Header Label Himpunan A & B */}
        <div className="grid grid-cols-11 items-center mb-2 px-1">
          <div className="col-span-5 text-center">
            <span className="py-1 px-3 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 font-black text-xs sm:text-sm tracking-wide shadow-xs inline-block">
              {labelA}
            </span>
          </div>
          <div className="col-span-1 text-center font-black text-amber-600 text-xs sm:text-sm">
            ➔
          </div>
          <div className="col-span-5 text-center">
            <span className="py-1 px-3 rounded-xl bg-blue-100/90 border border-blue-300 text-blue-950 font-black text-xs sm:text-sm tracking-wide shadow-xs inline-block">
              {labelB}
            </span>
          </div>
        </div>

        {/* Daftar Baris Pasangan (Item Asal ➔ Kotak Target Kosong) */}
        <div className="space-y-2 sm:space-y-2.5">
          {pairs.map((pair, idx) => {
            const leftKey = pair.left !== undefined ? pair.left : pair.x;
            const leftDisplay = pair.label || (pair.left !== undefined ? pair.left : (typeof pair.x === 'number' ? `Nilai x = ${pair.x}` : pair.x));
            const expectedRight = pair.right !== undefined ? pair.right : pair.result;
            const currentVal = answers[leftKey];
            const isFilled = currentVal !== undefined && currentVal !== null && currentVal !== '';
            const isRight = String(currentVal) === String(expectedRight);
            const isSlotHovered = hoveredSlot === leftKey;

            return (
              <div 
                key={idx}
                className="grid grid-cols-11 items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-white/70 border border-amber-200 shadow-xs transition-all hover:bg-white/90"
              >
                {/* 1. Item Kiri (Himpunan A) */}
                <div className="col-span-5 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/70 border-1.5 border-amber-300/90 shadow-xs flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-200/90 text-amber-950 font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-bold font-pencil text-[#2D241E] break-words leading-tight flex-1">
                      {leftDisplay}
                    </span>
                  </div>
                </div>

                {/* 2. Konektor Panah Estetik di Tengah */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-amber-100/80 border border-amber-300/60 flex items-center justify-center text-amber-700 font-black text-xs shadow-xs">
                    ➔
                  </div>
                </div>

                {/* 3. Kotak Target (Himpunan B - Kotak Kosong / Terisi) */}
                <div className="col-span-5 min-w-0">
                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSlotClick(leftKey, currentVal)}
                    onDragOver={(e) => handleDragOverSlot(e, leftKey)}
                    onDragLeave={() => handleDragLeaveSlot(leftKey)}
                    onDrop={(e) => handleDropSlot(e, leftKey)}
                    className={`w-full min-h-[44px] sm:min-h-[48px] p-2 rounded-xl text-left font-bold transition-all flex items-center justify-between gap-1.5 cursor-pointer select-none ${
                      isAnswered
                        ? isRight
                          ? 'bg-emerald-100/95 border-2 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300/40'
                          : 'bg-rose-100/95 border-2 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300/40'
                        : isFilled
                        ? 'bg-blue-100/95 border-2 border-blue-500 text-blue-950 shadow-md ring-2 ring-blue-300/40 hover:bg-blue-200/90'
                        : selectedCard || isSlotHovered
                        ? 'bg-amber-50/90 border-2 border-dashed border-amber-500 text-amber-800 animate-pulse ring-3 ring-amber-300/60'
                        : 'bg-slate-50/80 border-2 border-dashed border-slate-300 text-slate-400 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                    title={
                      isAnswered
                        ? undefined
                        : isFilled
                        ? 'Klik untuk melepas jawaban ini'
                        : selectedCard
                        ? `Klik untuk memasang "${selectedCard}" di sini`
                        : 'Klik kartu jawaban di bawah untuk mengisi kotak ini'
                    }
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      {isFilled ? (
                        <>
                          <span className="w-5 h-5 rounded-md bg-blue-200/80 text-blue-900 font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm md:text-base font-pencil font-bold text-blue-950 break-words leading-tight flex-1">
                            {currentVal}
                          </span>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-pencil italic">
                          <span className="w-5 h-5 rounded-md border border-dashed border-slate-300 flex items-center justify-center text-[10px] font-bold">
                            ?
                          </span>
                          <span>[ Taruh Jawaban ]</span>
                        </div>
                      )}
                    </div>

                    {/* Ikon Aksi / Status Jawaban */}
                    {isAnswered ? (
                      isRight ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )
                    ) : isFilled ? (
                      <span className="w-4 h-4 rounded-full bg-blue-200 hover:bg-rose-200 text-blue-800 hover:text-rose-800 text-[10px] font-black flex items-center justify-center flex-shrink-0 transition" title="Lepas kartu">
                        ✕
                      </span>
                    ) : null}
                  </button>

                  {/* Keterangan Koreksi jika salah */}
                  {isAnswered && !isRight && (
                    <div className="mt-1 text-[11px] font-black font-pencil text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <span>Kunci: {expectedRight}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── KOTAK PILIHAN KARTU JAWABAN (BAGIAN BAWAH) ── */}
      <div className="p-2 sm:p-2.5 rounded-2xl glass-panel-subtle border-2 border-amber-300/80 shadow-xs space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm font-black text-[#B45309] uppercase tracking-wide flex items-center gap-1.5 font-pencil">
            <Layers className="w-4 h-4 text-[#D97706]" />
            <span>Kotak Kartu Jawaban (Klik atau Geser ke Kotak Kosong):</span>
          </p>
          {selectedCard && !isAnswered && (
            <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
              Kartu Aktif: {selectedCard}
            </span>
          )}
        </div>

        {/* Barisan Kartu Jawaban */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
          {allOptions.map((opt, oi) => {
            const isAssigned = assignedValues.includes(String(opt)) || assignedValues.includes(opt);
            const isThisSelected = selectedCard === opt;

            return (
              <button
                key={oi}
                type="button"
                draggable={!isAnswered}
                onDragStart={(e) => handleDragStart(e, opt)}
                disabled={isAnswered}
                onClick={() => handleCardClick(opt)}
                className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl border-2 font-pencil font-bold text-xs sm:text-sm md:text-base transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isThisSelected
                    ? 'bg-amber-300 text-[#2D241E] border-[#B45309] ring-3 ring-amber-400 scale-105 shadow-md font-black'
                    : isAssigned
                    ? 'bg-slate-100/80 text-slate-500 border-slate-300 opacity-60'
                    : 'glass-btn hover:bg-amber-100/90 text-[#2D241E] border-amber-300 hover:scale-102 active:scale-95'
                }`}
                title={isAssigned ? 'Sudah dipasang di kotak (klik untuk memilih lagi)' : 'Klik untuk memasang ke kotak kosong'}
              >
                <span>{opt}</span>
                {isAssigned && (
                  <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-black flex items-center justify-center">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
