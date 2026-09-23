import React from 'react';
import { Table, Sparkles, Pin, CheckCircle2, RotateCcw, Compass, Tag } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

/**
 * RelationTableCanvas
 * High-Aesthetic Detective Case Ledger & Evidence Table.
 * Renders an authentic wooden-clipboard ledger where students complete
 * missing relation cells (Domain X, Rule, Kodomain Y, or Ordered Pair (x, y))
 * using tactile 3D evidence chips.
 */
export default function RelationTableCanvas({
  columns = ['Domain X', 'Aturan Relasi', 'Kodomain Y', 'Pasangan Berurutan (x, y)'],
  rows = [], // array of { id, x, rule, y, pair, blankField: 'y' | 'pair' | 'x' }
  availableChips = [], // array of string values available to place
  userAssignments = {}, // { rowId: selectedChipValue }
  onAssignChip, // (rowId, chipValue) => void
  onRemoveChip, // (rowId) => void
  isVerified = false,
  compact = false,
  className = '',
}) {
  const handleChipClick = (chip) => {
    try { audioEngine.playClick?.(); } catch {}
    // Find first empty row that has a blank field
    const emptyRow = rows.find(r => r.blankField && !userAssignments[r.id]);
    if (emptyRow && onAssignChip) {
      onAssignChip(emptyRow.id, chip);
    }
  };

  const handleCellClick = (rowId) => {
    if (userAssignments[rowId] && onRemoveChip && !isVerified) {
      try { audioEngine.playClick?.(); } catch {}
      onRemoveChip(rowId);
    }
  };

  // Chips that are already assigned
  const assignedValues = Object.values(userAssignments);
  const remainingCount = availableChips.length - assignedValues.length;

  return (
    <div className={`w-full flex flex-col items-center select-none font-hand ${className}`}>
      {/* Top Brass Clipboard Clamp (Penyepit Papan Berkas Investigasi) */}
      <div className="flex flex-col items-center -mb-2.5 z-20 pointer-events-none">
        <div className="w-24 sm:w-28 h-4 bg-gradient-to-b from-[#D97706] via-[#B45309] to-[#78350F] rounded-t-md border-2 border-[#451A03] shadow-md flex items-center justify-around px-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7] shadow-xs" />
          <div className="w-8 h-1 bg-[#451A03]/60 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FEF3C7] shadow-xs" />
        </div>
      </div>

      {/* Main Ledger Board Card */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FEF9EE] to-[#FFFBEB] backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#B45309]/50 shadow-[0_10px_28px_rgba(120,53,15,0.18)] overflow-hidden relative">
        
        {/* Subtle Decorative Paper Texture Bar */}
        <div className="bg-gradient-to-r from-[#92400E] via-[#B45309] to-[#92400E] text-white px-3 sm:px-4 py-2 flex items-center justify-between shadow-xs border-b border-amber-900/20">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-white/15 border border-white/20">
              <Table className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <span className="font-pencil text-xs sm:text-sm md:text-base font-black tracking-wide block leading-none text-white">
                Buku Catatan Tabel Bukti Relasi
              </span>
              <span className="text-[10px] text-amber-200/80 font-mono block">
                Bentuk Penyajian Tabel (x ➔ y)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 ${
              isVerified
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'bg-amber-100/90 text-amber-950 border-amber-400'
            }`}>
              {isVerified ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Tag className="w-3 h-3 text-amber-700" />}
              <span>{isVerified ? 'Tabel Terverifikasi' : 'Lengkapi Sel Kosong'}</span>
            </span>
          </div>
        </div>

        {/* The Grid Table */}
        <div className="overflow-x-auto p-2 sm:p-3.5">
          <table className="w-full border-separate border-spacing-y-1.5 sm:border-spacing-y-2">
            <thead>
              <tr>
                {columns.map((col, idx) => {
                  let badgeStyle = 'bg-amber-100/80 text-[#78350F] border-amber-300';
                  let icon = '📋';
                  if (idx === 0) {
                    badgeStyle = 'bg-blue-100/90 text-blue-900 border-blue-300';
                    icon = '📥';
                  } else if (idx === 1) {
                    badgeStyle = 'bg-amber-100/90 text-amber-950 border-amber-300';
                    icon = '⚖️';
                  } else if (idx === 2) {
                    badgeStyle = 'bg-emerald-100/90 text-emerald-950 border-emerald-300';
                    icon = '🎯';
                  } else if (idx === 3) {
                    badgeStyle = 'bg-rose-100/90 text-rose-950 border-rose-300';
                    icon = '🔖';
                  }

                  return (
                    <th key={idx} className="p-1 sm:p-1.5 text-center">
                      <div className={`py-1 px-2 rounded-xl border text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 shadow-2xs ${badgeStyle}`}>
                        <span>{icon}</span>
                        <span className="break-words leading-tight">{col}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="text-xs sm:text-sm font-bold text-[#2D241E]">
              {rows.map((row, rowIdx) => {
                const isBlankX = row.blankField === 'x';
                const isBlankY = row.blankField === 'y';
                const isBlankPair = row.blankField === 'pair';
                const assignedVal = userAssignments[row.id];

                return (
                  <tr
                    key={row.id || rowIdx}
                    className="bg-white/80 hover:bg-amber-50/80 transition-colors rounded-xl shadow-2xs group"
                  >
                    {/* Domain X */}
                    <td className="py-1.5 px-2 text-center rounded-l-xl border-y border-l border-amber-200/60">
                      {isBlankX ? (
                        <div
                          onClick={() => handleCellClick(row.id)}
                          className={`min-h-[34px] px-2.5 py-1 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                            assignedVal
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-700 shadow-sm font-black active:scale-95'
                              : 'bg-blue-50/70 border-dashed border-blue-300 text-blue-500 hover:border-blue-500 hover:bg-blue-100/60'
                          }`}
                        >
                          {assignedVal ? (
                            <span className="font-pencil text-xs sm:text-sm flex items-center gap-1">
                              {assignedVal} {!isVerified && <span className="opacity-70 text-[10px] ml-0.5">✕</span>}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-blue-400/90 flex items-center gap-1">
                              <span>+</span> Pasang
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50/90 text-blue-950 border border-blue-200 inline-block font-pencil font-bold text-xs sm:text-sm shadow-2xs">
                          {row.x}
                        </span>
                      )}
                    </td>

                    {/* Aturan Relasi */}
                    <td className="py-1.5 px-2 text-center border-y border-amber-200/60 font-pencil font-bold text-xs sm:text-sm text-[#78350F]">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 inline-block">
                        {row.rule}
                      </span>
                    </td>

                    {/* Kodomain Y */}
                    <td className="py-1.5 px-2 text-center border-y border-amber-200/60">
                      {isBlankY ? (
                        <div
                          onClick={() => handleCellClick(row.id)}
                          className={`min-h-[34px] px-2.5 py-1 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                            assignedVal
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-700 shadow-sm font-black active:scale-95'
                              : 'bg-emerald-50/70 border-dashed border-emerald-300 text-emerald-500 hover:border-emerald-500 hover:bg-emerald-100/60'
                          }`}
                        >
                          {assignedVal ? (
                            <span className="font-pencil text-xs sm:text-sm flex items-center gap-1">
                              {assignedVal} {!isVerified && <span className="opacity-70 text-[10px] ml-0.5">✕</span>}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-500/90 flex items-center gap-1">
                              <span>+</span> Pasang
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50/90 text-emerald-950 border border-emerald-200 inline-block font-pencil font-bold text-xs sm:text-sm shadow-2xs">
                          {row.y}
                        </span>
                      )}
                    </td>

                    {/* Pasangan Berurutan (x, y) */}
                    <td className="py-1.5 px-2 text-center rounded-r-xl border-y border-r border-amber-200/60">
                      {isBlankPair ? (
                        <div
                          onClick={() => handleCellClick(row.id)}
                          className={`min-h-[34px] px-2.5 py-1 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                            assignedVal
                              ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-700 shadow-sm font-black active:scale-95'
                              : 'bg-rose-50/70 border-dashed border-rose-300 text-rose-500 hover:border-rose-500 hover:bg-rose-100/60'
                          }`}
                        >
                          {assignedVal ? (
                            <span className="font-pencil text-xs sm:text-sm flex items-center gap-1">
                              {assignedVal} {!isVerified && <span className="opacity-70 text-[10px] ml-0.5">✕</span>}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-rose-500/90 flex items-center gap-1">
                              <span>+</span> Pasang
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-rose-50/90 text-rose-950 border border-rose-200 inline-block font-pencil font-bold text-xs sm:text-sm shadow-2xs">
                          {row.pair || `(${row.x}, ${row.y})`}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Kotak Pilihan Kartu Angka Bukti */}
        <div className="bg-gradient-to-r from-amber-100/90 via-[#FEF3C7] to-amber-100/90 border-t-2 border-amber-300/80 p-2.5 sm:p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-black text-[#78350F] uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Kotak Pilihan Kartu Bukti:</span>
            </span>
            <span className="text-[11px] text-[#78350F]/80 font-bold">
              {remainingCount > 0 ? `Sisa ${remainingCount} kartu angka untuk dipasang` : 'Semua sel terisi!'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center min-h-[38px]">
            {availableChips.map((chip, idx) => {
              const isUsed = assignedValues.filter(x => x === chip).length > availableChips.slice(0, idx).filter(x => x === chip).length;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isUsed || isVerified}
                  onClick={() => handleChipClick(chip)}
                  className={`px-3 py-1.5 rounded-xl font-pencil font-black text-xs sm:text-sm transition-all duration-150 flex items-center gap-1 cursor-pointer select-none ${
                    isUsed
                      ? 'opacity-35 bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300 line-through'
                      : 'glass-btn text-[#92400E] border-2 border-[#D97706] shadow-[0_3px_0px_#B45309] hover:shadow-[0_4px_0px_#92400E] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none'
                  }`}
                >
                  <span>{chip}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
