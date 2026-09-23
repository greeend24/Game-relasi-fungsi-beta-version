import React, { useState, useEffect } from 'react';
import { Layers, Table, Tag, ArrowRight, Check, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import RelationDiagramCanvas from './RelationDiagramCanvas';
import { audioEngine } from '../services/audioEngine';
import { shuffleArray } from '../utils/shuffle';

/**
 * ─────────────────────────────────────────────────────────────
 * 1. HPB_BUILDER (Himpunan Pasangan Berurutan Taktil)
 * Siswa mendrag/memilih token angka ke slot ( [ ? ], [ ? ] )
 * ─────────────────────────────────────────────────────────────
 */
export function HpbBuilder({
  setName = 'R',
  pairs = [], // e.g. [{ idX: 'p1_x', idY: 'p1_y', ansX: '1', ansY: '2', fixedX: null, fixedY: null }]
  tokens = [],
  values = {},
  onAssign,
  onRemove,
  readOnly = false,
  isAnswered = false,
  subInstruction = 'Pindahkan kartu pilihan ke dalam kurung pasangan berurutan!'
}) {
  const [selectedToken, setSelectedToken] = useState(null);

  // Dynamic shuffle so card positions are randomized and not predictable
  const tokensKey = (tokens || []).join('__');
  const [shuffledTokens, setShuffledTokens] = useState(() => shuffleArray(tokens || []));

  useEffect(() => {
    setShuffledTokens(shuffleArray(tokens || []));
  }, [tokensKey]);

  // Collect counts of all currently assigned token values
  const assignedCounts = Object.values(values).reduce((acc, val) => {
    if (val !== undefined && val !== null) {
      acc[val] = (acc[val] || 0) + 1;
    }
    return acc;
  }, {});

  const handleSlotClick = (slotId, currentVal) => {
    if (readOnly || isAnswered) return;
    if (selectedToken) {
      try { audioEngine.playPop(); } catch {}
      onAssign(slotId, selectedToken);
      setSelectedToken(null);
    } else if (currentVal) {
      try { audioEngine.playTrash(); } catch {}
      onRemove(slotId);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5 max-w-xl mx-auto select-none">
      {/* HPB Container Box */}
      <div className="p-2 sm:p-2.5 rounded-xl glass-panel-subtle border-2 border-amber-300/80 shadow-xs flex flex-col items-center">
        <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 font-pencil text-sm sm:text-base lg:text-lg">
          <span className="font-black text-[#B45309]">{setName} = </span>
          <span className="font-black text-[#78350F] text-xl sm:text-2xl">&#123;</span>

          {pairs.map((pair, pIdx) => {
            const valX = pair.fixedX !== undefined && pair.fixedX !== null ? pair.fixedX : values[pair.idX];
            const valY = pair.fixedY !== undefined && pair.fixedY !== null ? pair.fixedY : values[pair.idY];
            const isXSlot = pair.idX && (pair.fixedX === undefined || pair.fixedX === null);
            const isYSlot = pair.idY && (pair.fixedY === undefined || pair.fixedY === null);

            return (
              <div
                key={pIdx}
                className="inline-flex items-center px-2 py-1 rounded-lg glass-panel border border-amber-300/80 shadow-xs"
              >
                <span className="text-[#78350F] font-black mr-0.5">(</span>

                {/* Elemen X (Domain) */}
                {isXSlot ? (
                  <button
                    disabled={readOnly || isAnswered}
                    onClick={() => handleSlotClick(pair.idX, valX)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const tok = e.dataTransfer.getData('text/plain');
                      if (tok && !readOnly && !isAnswered) {
                        try { audioEngine.playPop(); } catch {}
                        onAssign(pair.idX, tok);
                      }
                    }}
                    className={`min-w-[40px] h-[30px] sm:h-[32px] px-2 rounded-lg border-2 font-pencil font-black text-xs sm:text-sm transition flex items-center justify-center cursor-pointer ${
                      valX
                        ? 'glass-card-blue text-blue-950 font-bold shadow-xs'
                        : selectedToken
                        ? 'glass-card-amber border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                        : 'glass-panel border-dashed border-amber-300/80 text-amber-600 hover:border-amber-400'
                    }`}
                    title={valX ? "Klik untuk mengembalikan kartu" : "Klik kartu di bawah untuk mengisi kotak ini"}
                  >
                    {valX || <span className="text-xs text-amber-600 font-bold">[ ? ]</span>}
                  </button>
                ) : (
                  <span className="font-black text-blue-900 px-0.5 text-xs sm:text-sm">{valX}</span>
                )}

                <span className="text-[#78350F] font-black mx-0.5">,</span>

                {/* Elemen Y (Kodomain / Range) */}
                {isYSlot ? (
                  <button
                    disabled={readOnly || isAnswered}
                    onClick={() => handleSlotClick(pair.idY, valY)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const tok = e.dataTransfer.getData('text/plain');
                      if (tok && !readOnly && !isAnswered) {
                        try { audioEngine.playPop(); } catch {}
                        onAssign(pair.idY, tok);
                      }
                    }}
                    className={`min-w-[40px] h-[30px] sm:h-[32px] px-2 rounded-lg border-2 font-pencil font-black text-xs sm:text-sm transition flex items-center justify-center cursor-pointer ${
                      valY
                        ? 'glass-card-emerald text-emerald-950 font-bold shadow-xs'
                        : selectedToken
                        ? 'glass-card-amber border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                        : 'glass-panel border-dashed border-amber-300/80 text-amber-600 hover:border-amber-400'
                    }`}
                    title={valY ? "Klik untuk mengembalikan kartu" : "Klik kartu di bawah untuk mengisi kotak ini"}
                  >
                    {valY || <span className="text-xs text-amber-600 font-bold">[ ? ]</span>}
                  </button>
                ) : (
                  <span className="font-black text-emerald-900 px-0.5 text-xs sm:text-sm">{valY}</span>
                )}

                <span className="text-[#78350F] font-black ml-0.5">)</span>
                {pIdx < pairs.length - 1 && <span className="text-[#78350F] font-black ml-1">,</span>}
              </div>
            );
          })}

          <span className="font-black text-[#78350F] text-xl sm:text-2xl">&#125;</span>
        </div>
      </div>

      {/* Token Tray - hanya tampil saat siswa aktif menjawab */}
      {!isAnswered && !readOnly && (
        <div className="p-2 sm:p-2.5 rounded-xl glass-panel-subtle border border-amber-300/70 shadow-xs flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] sm:text-xs font-black text-[#78350F] uppercase tracking-wider">
              🔘 PILIHAN KARTU JAWABAN:
            </span>
            {selectedToken && (
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-900 glass-card-amber px-2 py-0.5 rounded-md animate-pulse">
                Kartu terpilih: <b>{selectedToken}</b>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 items-center justify-center min-h-[36px]">
            {(() => {
              const seenCounts = {};
              return shuffledTokens.map((tok, tIdx) => {
                const seenSoFar = seenCounts[tok] || 0;
                const isAssigned = (assignedCounts[tok] || 0) > seenSoFar;
                seenCounts[tok] = seenSoFar + 1;
                const isSelected = selectedToken === tok;

              return (
                <button
                  key={tIdx}
                  disabled={readOnly || isAnswered || isAssigned}
                  draggable={!readOnly && !isAnswered && !isAssigned}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', tok);
                  }}
                  onClick={() => {
                    try { audioEngine.playClick(); } catch {}
                    setSelectedToken(prev => prev === tok ? null : tok);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs sm:text-sm border transition-all cursor-pointer select-none ${
                    isAssigned
                      ? 'opacity-30 glass-panel border-gray-300 text-gray-400 cursor-not-allowed scale-95'
                      : isSelected
                      ? 'glass-btn-amber ring-2 ring-amber-400 scale-105 shadow-md animate-pulse'
                      : 'glass-btn text-[#2D241E] hover:scale-105 shadow-xs'
                  }`}
                >
                  <span>{tok}</span>
                </button>
              );
            });
          })()}
        </div>
      </div>
      )}
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * 2. TABLE_BUILDER (Tabel Relasi Taktil)
 * Siswa mendrag/memilih token angka ke dalam sel tabel kosong
 * ─────────────────────────────────────────────────────────────
 */
export function TableBuilder({
  title = 'Tabel Relasi Bukti',
  headers = ['Nilai x', 'Nilai y'],
  rows = [], // [{ idX, valX, isSlotX, idY, valY, isSlotY }]
  tokens = [],
  values = {},
  onAssign,
  onRemove,
  readOnly = false,
  isAnswered = false,
  subInstruction = 'Pindahkan angka dari kotak pilihan ke dalam sel tabel relasi yang kosong!'
}) {
  const [selectedToken, setSelectedToken] = useState(null);

  // Dynamic shuffle so card positions are randomized
  const tokensKey = (tokens || []).join('__');
  const [shuffledTokens, setShuffledTokens] = useState(() => shuffleArray(tokens || []));

  useEffect(() => {
    setShuffledTokens(shuffleArray(tokens || []));
  }, [tokensKey]);

  const assignedCounts = Object.values(values).reduce((acc, val) => {
    if (val !== undefined && val !== null) {
      acc[val] = (acc[val] || 0) + 1;
    }
    return acc;
  }, {});

  const handleCellClick = (slotId, currentVal) => {
    if (readOnly || isAnswered) return;
    if (selectedToken) {
      try { audioEngine.playPop(); } catch {}
      onAssign(slotId, selectedToken);
      setSelectedToken(null);
    } else if (currentVal) {
      try { audioEngine.playTrash(); } catch {}
      onRemove(slotId);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 max-w-md mx-auto select-none">
      {/* Table Element */}
      <div className="rounded-xl border border-white/80 overflow-hidden glass-panel-subtle shadow-xs">
        <div className="glass-panel-subtle px-2.5 py-1 border-b border-amber-300/40 font-pencil font-black text-xs text-amber-950 text-center">
          {title}
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-amber-200/50 text-[11px] sm:text-xs font-black text-[#78350F] glass-panel-subtle">
              <th className="py-0.5 px-2.5 border-r border-amber-200/50 text-center">{headers[0]}</th>
              <th className="py-0.5 px-2.5 text-center">{headers[1]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100/50 font-pencil font-bold text-xs">
            {rows.map((row, rIdx) => {
              const currentX = row.isSlotX ? values[row.idX] : row.valX;
              const currentY = row.isSlotY ? values[row.idY] : row.valY;

              return (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white/20' : 'bg-white/40'}>
                  {/* Kolom X */}
                  <td className="py-0.5 px-2 border-r border-amber-200/50 text-center">
                    {row.isSlotX ? (
                      <button
                        disabled={readOnly || isAnswered}
                        onClick={() => handleCellClick(row.idX, currentX)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'copy';
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const tok = e.dataTransfer.getData('text/plain');
                          if (tok && !readOnly && !isAnswered) {
                            try { audioEngine.playPop(); } catch {}
                            onAssign(row.idX, tok);
                          }
                        }}
                        className={`min-w-[38px] h-[26px] px-1.5 rounded-lg border font-mono font-black text-xs transition mx-auto flex items-center justify-center cursor-pointer ${
                          currentX
                            ? 'glass-card-blue text-blue-950 font-bold shadow-xs'
                            : selectedToken
                            ? 'glass-card-amber border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                            : 'glass-panel border-dashed border-amber-300/80 text-amber-700 hover:border-amber-400'
                        }`}
                        title={currentX ? "Klik untuk mengembalikan kartu" : "Klik kartu di bawah untuk mengisi sel ini"}
                      >
                        {currentX || <span className="text-[10px] text-amber-700 font-bold">[ ? ]</span>}
                      </button>
                    ) : (
                      <span className="font-bold text-blue-900 text-xs">{currentX}</span>
                    )}
                  </td>

                  {/* Kolom Y */}
                  <td className="py-0.5 px-2 text-center">
                    {row.isSlotY ? (
                      <button
                        disabled={readOnly || isAnswered}
                        onClick={() => handleCellClick(row.idY, currentY)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'copy';
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const tok = e.dataTransfer.getData('text/plain');
                          if (tok && !readOnly && !isAnswered) {
                            try { audioEngine.playPop(); } catch {}
                            onAssign(row.idY, tok);
                          }
                        }}
                        className={`min-w-[38px] h-[26px] px-1.5 rounded-lg border font-mono font-black text-xs transition mx-auto flex items-center justify-center cursor-pointer ${
                          currentY
                            ? 'glass-card-emerald text-emerald-950 font-bold shadow-xs'
                            : selectedToken
                            ? 'glass-card-amber border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                            : 'glass-panel border-dashed border-amber-300/80 text-amber-700 hover:border-amber-400'
                        }`}
                        title={currentY ? "Klik untuk mengembalikan kartu" : "Klik kartu di bawah untuk mengisi sel ini"}
                      >
                        {currentY || <span className="text-[10px] text-amber-700 font-bold">[ ? ]</span>}
                      </button>
                    ) : (
                      <span className="font-bold text-emerald-900 text-xs">{currentY}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Token Tray - hanya tampil saat siswa aktif menjawab */}
      {!isAnswered && !readOnly && (
        <div className="p-1.5 sm:p-2 rounded-xl glass-panel-subtle border border-amber-300/70 flex flex-col items-center gap-1 flex-shrink-0">
          <span className="text-[10px] sm:text-[11px] font-black text-[#78350F] uppercase tracking-wider">
            🔘 PILIH KARTU JAWABAN UNTUK MENGISI SEL [ ? ]:
          </span>
          <div className="flex flex-wrap gap-1.5 items-center justify-center">
            {(() => {
              const seenCounts = {};
              return shuffledTokens.map((tok, tIdx) => {
                const seenSoFar = seenCounts[tok] || 0;
                const isAssigned = (assignedCounts[tok] || 0) > seenSoFar;
                seenCounts[tok] = seenSoFar + 1;
                const isSelected = selectedToken === tok;

              return (
                <button
                  key={tIdx}
                  disabled={readOnly || isAnswered || isAssigned}
                  draggable={!readOnly && !isAnswered && !isAssigned}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', tok);
                  }}
                  onClick={() => {
                    try { audioEngine.playClick(); } catch {}
                    setSelectedToken(prev => prev === tok ? null : tok);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs border transition-all cursor-pointer ${
                    isAssigned
                      ? 'opacity-30 glass-panel border-gray-300 text-gray-400 cursor-not-allowed scale-95'
                      : isSelected
                      ? 'glass-btn-amber ring-2 ring-amber-400 scale-105 shadow-xs'
                      : 'glass-btn text-[#2D241E] hover:scale-102 shadow-xs'
                  }`}
                >
                  {tok}
                </button>
              );
            });
          })()}
        </div>
      </div>
      )}
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * 3. ARROW_BUILDER_2STEP (Diagram Panah 2-Langkah)
 * Langkah 1: Memasukkan nama/elemen anggota ke dalam diagram himpunan
 * Langkah 2: Menyambungkan tali panah antar pin A ke B!
 * ─────────────────────────────────────────────────────────────
 */
export function ArrowBuilder2Step({
  labelA = 'Himpunan A',
  labelB = 'Himpunan B',
  expectedSetA = [],
  expectedSetB = [],
  availableTokens = [],
  placedA = {}, // { [slotIdx]: 'Ali' }
  placedB = {}, // { [slotIdx]: 'Sepak Bola' }
  connections = [], // array of [idxA, idxB] or string 'A->B'
  onAssignSlot,
  onRemoveSlot,
  onToggleConnection,
  rule = 'Hubungkan anggota himpunan!',
  readOnly = false,
  onConfirm = null,
  isReadyToConfirm = false,
  isAnswered = false
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Isi Anggota, 2: Hubungkan Panah
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedA, setSelectedA] = useState(null);

  // Check if Step 1 is ready (all slots placed)
  const isAllAPlaced = expectedSetA.every((_, idx) => placedA[idx]);
  const isAllBPlaced = expectedSetB.every((_, idx) => placedB[idx]);
  const isStep1Complete = isAllAPlaced && isAllBPlaced;

  // Dynamic shuffle so card positions in token tray are randomized
  const tokensKey = (availableTokens || []).join('__');
  const [shuffledTokens, setShuffledTokens] = useState(() => shuffleArray(availableTokens || []));

  useEffect(() => {
    setShuffledTokens(shuffleArray(availableTokens || []));
  }, [tokensKey]);

  const assignedTokens = [...Object.values(placedA), ...Object.values(placedB)];

  const handleSetSlotClick = (setKey, slotIdx, currentVal) => {
    if (readOnly || currentStep !== 1) return;
    if (selectedToken) {
      try { audioEngine.playPop(); } catch {}
      onAssignSlot(setKey, slotIdx, selectedToken);
      setSelectedToken(null);
    } else if (currentVal) {
      try { audioEngine.playTrash(); } catch {}
      onRemoveSlot(setKey, slotIdx);
    }
  };

  const actualSetA = expectedSetA.map((_, idx) => placedA[idx] || `Item ${idx + 1}`);
  const actualSetB = expectedSetB.map((_, idx) => placedB[idx] || `Item ${idx + 1}`);

  // Transform connections strings 'A->B' into index pairs [idxA, idxB] for RelationDiagramCanvas
  const mappedConnections = (connections || []).map(p => {
    if (Array.isArray(p)) return p;
    const [aStr, bStr] = String(p).split('->');
    const idxA = actualSetA.findIndex(v => String(v) === String(aStr));
    const idxB = actualSetB.findIndex(v => String(v) === String(bStr));
    return [idxA, idxB];
  }).filter(([a, b]) => a !== -1 && b !== -1);

  return (
    <div className="w-full flex flex-col gap-1 max-w-lg mx-auto select-none">
      {/* 2-Step Progress Indicator Tabs */}
      <div className="flex items-center justify-center gap-2 mb-0.5">
        <button
          onClick={() => setCurrentStep(1)}
          className={`px-2.5 py-0.5 rounded-lg font-pencil font-black text-xs transition cursor-pointer flex items-center gap-1 ${
            currentStep === 1
              ? 'bg-[#D97706] text-white shadow-xs'
              : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <span>1. Isi Nama Anggota</span>
          {isStep1Complete && <Check className="w-3 h-3 text-emerald-300" />}
        </button>

        <span className="text-amber-400 font-bold text-xs">➔</span>

        <button
          disabled={!isStep1Complete}
          onClick={() => setCurrentStep(2)}
          className={`px-2.5 py-0.5 rounded-lg font-pencil font-black text-xs transition flex items-center gap-1 ${
            currentStep === 2
              ? 'bg-[#2563EB] text-white shadow-xs'
              : isStep1Complete
              ? 'bg-blue-100 text-blue-900 hover:bg-blue-200 cursor-pointer animate-pulse'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>2. Hubungkan Panah</span>
          <Sparkles className="w-3 h-3" />
        </button>
      </div>

      {/* STEP 1: INTERACTIVE SET OVAL PLACEMENT */}
      {currentStep === 1 && (
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-white/70 border border-amber-300">
            {/* Oval Himpunan A */}
            <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-400 flex flex-col items-center gap-1.5">
              <span className="font-pencil font-black text-xs text-blue-950 uppercase border-b border-blue-200 pb-0.5 w-full text-center">
                {labelA}
              </span>
              <div className="flex flex-col gap-1 w-full">
                {expectedSetA.map((_, idx) => {
                  const val = placedA[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSetSlotClick('A', idx, val)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const tok = e.dataTransfer.getData('text/plain');
                        if (tok && !readOnly && currentStep === 1) {
                          try { audioEngine.playPop(); } catch {}
                          onAssignSlot('A', idx, tok);
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-xl font-pencil font-black text-xs sm:text-sm border-2 transition cursor-pointer flex items-center justify-between min-h-[38px] ${
                        val
                          ? 'bg-blue-100/95 border-blue-500 text-blue-950 shadow-xs'
                          : selectedToken
                          ? 'bg-amber-100 border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                          : 'bg-white/80 border-dashed border-blue-300/80 hover:border-blue-500 hover:bg-blue-50/50'
                      }`}
                    >
                      {val ? (
                        <>
                          <span className="text-blue-950">{val}</span>
                          <span className="text-xs text-rose-500 font-bold hover:scale-125 transition-transform">✕</span>
                        </>
                      ) : (
                        <span className="w-full text-center text-xs font-bold text-blue-400/80">
                          {selectedToken ? '+ Taruh di sini' : ''}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Oval Himpunan B */}
            <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-400 flex flex-col items-center gap-1.5">
              <span className="font-pencil font-black text-xs text-emerald-950 uppercase border-b border-emerald-200 pb-0.5 w-full text-center">
                {labelB}
              </span>
              <div className="flex flex-col gap-1 w-full">
                {expectedSetB.map((_, idx) => {
                  const val = placedB[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSetSlotClick('B', idx, val)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const tok = e.dataTransfer.getData('text/plain');
                        if (tok && !readOnly && currentStep === 1) {
                          try { audioEngine.playPop(); } catch {}
                          onAssignSlot('B', idx, tok);
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-xl font-pencil font-black text-xs sm:text-sm border-2 transition cursor-pointer flex items-center justify-between min-h-[38px] ${
                        val
                          ? 'bg-emerald-100/95 border-emerald-500 text-emerald-950 shadow-xs'
                          : selectedToken
                          ? 'bg-amber-100 border-amber-400 border-dashed animate-pulse ring-2 ring-amber-300'
                          : 'bg-white/80 border-dashed border-emerald-300/80 hover:border-emerald-500 hover:bg-emerald-50/50'
                      }`}
                    >
                      {val ? (
                        <>
                          <span className="text-emerald-950">{val}</span>
                          <span className="text-xs text-rose-500 font-bold hover:scale-125 transition-transform">✕</span>
                        </>
                      ) : (
                        <span className="w-full text-center text-xs font-bold text-emerald-400/80">
                          {selectedToken ? '+ Taruh di sini' : ''}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Token Tray for Step 1 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/90 border border-amber-300">
            <span className="text-[11px] sm:text-xs font-black text-[#78350F] uppercase tracking-wider block mb-1">
              🏷️ PILIHAN KARTU JAWABAN:
            </span>
            <div className="flex flex-wrap gap-1.5 items-center justify-center">
              {(() => {
                const assignedCounts = assignedTokens.reduce((acc, t) => {
                  acc[t] = (acc[t] || 0) + 1;
                  return acc;
                }, {});
                const seenCounts = {};

                return shuffledTokens.map((tok, tIdx) => {
                  seenCounts[tok] = (seenCounts[tok] || 0) + 1;
                  const isAssigned = seenCounts[tok] <= (assignedCounts[tok] || 0);
                  const isSelected = selectedToken === tok;

                  return (
                    <button
                      key={tIdx}
                      disabled={isAssigned}
                      draggable={!isAssigned}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', tok);
                      }}
                      onClick={() => {
                        try { audioEngine.playClick(); } catch {}
                        setSelectedToken(prev => prev === tok ? null : tok);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-pencil font-black text-xs border transition-all cursor-pointer ${
                        isAssigned
                          ? 'opacity-30 bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed scale-95'
                          : isSelected
                          ? 'bg-amber-400 border-amber-600 text-amber-950 scale-105 ring-2 ring-amber-400 shadow-xs animate-pulse'
                          : 'bg-white border-amber-300 text-gray-800 hover:border-amber-500 hover:scale-102 shadow-xs'
                      }`}
                    >
                      <span>{tok}</span>
                    </button>
                  );
                });
              })()}
            </div>
          </div>

          {/* Step 1 Completion Button */}
          {isStep1Complete && (
            <button
              onClick={() => {
                try { audioEngine.playVictory(); } catch {}
                setCurrentStep(2);
              }}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-pencil font-black text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer transition transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Himpunan Lengkap! Lanjut Hubungkan Panah ➔</span>
            </button>
          )}
        </div>
      )}

      {/* STEP 2: CONNECTING ARROWS CANVAS */}
      {currentStep === 2 && (
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-blue-900 text-center bg-blue-50/80 rounded-lg py-0.5 px-2 border border-blue-200 truncate">
            🏹 Hubungkan panah: <b>{rule}</b>
          </div>

          <div className="p-1 rounded-xl glass-panel-subtle flex justify-center">
            <RelationDiagramCanvas
              setA={actualSetA}
              setB={actualSetB}
              connections={mappedConnections}
              selectedA={selectedA}
              onSelectA={(idxA) => setSelectedA(idxA)}
              onSelectB={(idxB, draggedFromA) => {
                const fromA = draggedFromA !== undefined && draggedFromA !== null ? draggedFromA : selectedA;
                if (fromA !== null && fromA !== undefined) {
                  const pairStr = `${actualSetA[fromA]}->${actualSetB[idxB]}`;
                  onToggleConnection(pairStr);
                  setSelectedA(null);
                }
              }}
              onDisconnectPair={(idxA, idxB) => {
                const pairStr = `${actualSetA[idxA]}->${actualSetB[idxB]}`;
                onToggleConnection(pairStr);
              }}
              compact={true}
              disabled={readOnly || isAnswered}
            />
          </div>

          {/* Action Footer Bar with Integrated Confirmation Button */}
          <div className="flex items-center justify-between gap-2 px-1 pt-1 flex-shrink-0">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer"
            >
              ← Edit Nama
            </button>
            <span className="text-xs font-bold text-[#78350F]">
              Tersambung: <b>{connections.length}</b> panah
            </span>
            {onConfirm && !readOnly && !isAnswered && (
              <button
                onClick={onConfirm}
                disabled={!isReadyToConfirm}
                className="pencil-btn py-1.5 px-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-black text-xs sm:text-sm disabled:opacity-40 flex items-center gap-1.5 rounded-xl shadow-[2px_3px_0px_#2D241E] cursor-pointer transition hover:scale-[1.02] active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Konfirmasi Panah</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { default as MatchingSlotDiagram } from './MatchingSlotDiagram';

