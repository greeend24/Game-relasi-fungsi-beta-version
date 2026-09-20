import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Settings, ArrowRight, Sparkles, TrendingUp, TrendingDown, Repeat, Layers, CheckCircle2, AlertTriangle, Table, Tag, Hash, FileText, Compass } from 'lucide-react';

/**
 * MathVisualizer
 * High-aesthetic glassmorphism visualizer component that transforms abstract
 * SMP Kelas 8 math concepts (Relations, Functions, Formulas, Graphs, Bijective 1:1)
 * into concrete, tangible, visual models.
 * 
 * Supports all 4 core relation representation modes + function machine + bijective board:
 * 1. function_machine
 * 2. arrow_diagram
 * 3. relation_table
 * 4. ordered_pairs
 * 5. cartesian_graph
 * 6. one_to_one_board
 */
export default function MathVisualizer({ visual, compact = false, className = '' }) {
  if (!visual || !visual.type) return null;

  switch (visual.type) {
    case 'function_machine':
      return <FunctionMachineVisual visual={visual} compact={compact} className={className} />;
    case 'arrow_diagram':
      return <ArrowDiagramVisual visual={visual} compact={compact} className={className} />;
    case 'relation_table':
      return <RelationTableVisual visual={visual} compact={compact} className={className} />;
    case 'ordered_pairs':
      return <OrderedPairsVisual visual={visual} compact={compact} className={className} />;
    case 'cartesian_graph':
      return <CartesianGraphVisual visual={visual} compact={compact} className={className} />;
    case 'one_to_one_board':
      return <OneToOneBoardVisual visual={visual} compact={compact} className={className} />;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
// 1. MESIN FUNGSI DIGITAL (Function Machine Processor)
// ─────────────────────────────────────────────────────────────
function FunctionMachineVisual({ visual, compact = false, className = '' }) {
  const {
    formula = 'f(x) = 2x + 1',
    inputVal = 'x',
    outputVal = '?',
    processSteps = '',
    machineName = 'Mesin Dekoder Fungsi'
  } = visual;

  return (
    <div className={`w-full bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 backdrop-blur-md rounded-2xl ${compact ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-3.5'} border-2 border-amber-300/80 shadow-[0_4px_16px_rgba(217,119,6,0.12)] select-none ${className}`}>
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between gap-1.5 ${compact ? 'mb-1' : 'mb-2'}`}>
        <div className={`flex items-center gap-1.5 ${compact ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'} font-black text-[#B45309]`}>
          <Settings className="w-3.5 h-3.5 animate-spin-slow text-[#D97706] flex-shrink-0" />
          <span className="break-words leading-tight">{machineName}</span>
        </div>
        <span className={`${compact ? 'text-[9px] px-1.5' : 'text-[11px] px-2'} font-bold py-0.5 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300 flex-shrink-0 whitespace-nowrap`}>
          Input ➔ Proses ➔ Output
        </span>
      </div>

      {/* Assembly Line: Input Chip -> Machine Box -> Output Chip */}
      <div className="flex items-center justify-between gap-1 sm:gap-2.5 py-0.5">
        {/* INPUT CHIP */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <span className="text-[9px] sm:text-[11px] font-black uppercase text-blue-700 mb-0.5 whitespace-nowrap">Input x</span>
          <div className={`w-full ${compact ? 'py-1 px-1 sm:py-1.5' : 'py-1.5 sm:py-2 px-2'} rounded-xl bg-blue-100/90 border-2 border-blue-400 text-center shadow-xs`}>
            <span className={`font-mono ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} font-black text-blue-900 block break-words`}>
              {String(inputVal)}
            </span>
          </div>
        </div>

        {/* ARROW IN */}
        <div className="flex items-center text-amber-600 flex-shrink-0">
          <ArrowRight className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} animate-pulse`} />
        </div>

        {/* CENTER PROCESSOR BOX */}
        <div className={`flex-[1.5] min-w-0 ${compact ? 'p-1.5 sm:p-2' : 'p-2 sm:p-2.5'} rounded-xl bg-gradient-to-br from-[#78350F] to-[#92400E] text-white shadow-md border border-amber-400/40 text-center relative overflow-hidden`}>
          <div className="absolute -right-2 -bottom-2 opacity-15">
            <Settings className="w-10 h-10" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-amber-200 uppercase block">Rumus Proses</span>
          <span className={`font-pencil ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base lg:text-lg'} font-black text-white block break-words leading-tight`}>
            {formula}
          </span>
          {processSteps && (
            <span className="text-[10px] font-mono text-amber-200/90 block break-words leading-tight mt-0.5">
              {processSteps}
            </span>
          )}
        </div>

        {/* ARROW OUT */}
        <div className="flex items-center text-amber-600 flex-shrink-0">
          <ArrowRight className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} animate-pulse`} />
        </div>

        {/* OUTPUT CHIP */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <span className="text-[9px] sm:text-[11px] font-black uppercase text-emerald-700 mb-0.5 whitespace-nowrap">Bayangan</span>
          <div className={`w-full ${compact ? 'py-1 px-1 sm:py-1.5' : 'py-1.5 sm:py-2 px-2'} rounded-xl bg-emerald-100/90 border-2 border-emerald-500 text-center shadow-xs`}>
            <span className={`font-mono ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} font-black text-emerald-950 block break-words`}>
              {String(outputVal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: Match pair values with set items
// ─────────────────────────────────────────────────────────────
function findIndexInSet(set, val) {
  if (val === undefined || val === null || !Array.isArray(set)) return -1;
  const strVal = String(val).trim().toLowerCase();
  
  // 1. Exact match (case-insensitive)
  let idx = set.findIndex(item => String(item).trim().toLowerCase() === strVal);
  if (idx !== -1) return idx;

  // 2. Prefix / containment match (e.g. "1 (Mendua)" matches "1" or vice-versa)
  idx = set.findIndex(item => {
    const s = String(item).trim().toLowerCase();
    return s.startsWith(strVal) || strVal.startsWith(s);
  });
  if (idx !== -1) return idx;

  // 3. Match without emojis or parenthesized details (e.g. "Dani (Cabang)" -> "Dani", "Ani 🟦" -> "Ani")
  const cleanStr = strVal.replace(/\s*[\(\[].*?[\)\]]/g, '').replace(/[^\p{L}\p{N}]/gu, '').trim();
  if (cleanStr) {
    idx = set.findIndex(item => {
      const cleanItem = String(item).trim().toLowerCase().replace(/\s*[\(\[].*?[\)\]]/g, '').replace(/[^\p{L}\p{N}]/gu, '').trim();
      return cleanItem === cleanStr || cleanItem.startsWith(cleanStr) || cleanStr.startsWith(cleanItem);
    });
    if (idx !== -1) return idx;
  }

  // 4. Numeric fallback if an index was passed
  const num = Number(val);
  if (!isNaN(num) && num >= 0 && num < set.length && Number.isInteger(num)) {
    return num;
  }
  return -1;
}

// ─────────────────────────────────────────────────────────────
// 2. DIAGRAM PANAH & HIMPUNAN (Arrow & Venn Mapping)
// ─────────────────────────────────────────────────────────────
function ArrowDiagramVisual({ visual, compact = false, className = '' }) {
  const {
    setA = ['1', '2', '3'],
    setB = ['a', 'b', 'c'],
    pairs = [['1', 'a'], ['2', 'b'], ['3', 'c']],
    labelA = 'Domain A',
    labelB = 'Kodomain B',
    statusBadge = '', // e.g. "Tepat 1 Pasangan"
    isFunction = true,
    highlightRange = [] // items in B that belong to Range
  } = visual;

  const diagramAreaRef = useRef(null);
  const dotRefsA = useRef([]);
  const dotRefsB = useRef([]);
  const [coords, setCoords] = useState([]);
  const arrowMarkerId = useRef(`arrow_${Math.random().toString(36).slice(2, 9)}`).current;

  // Accurate detection of CSS transform scale factor (supports scaled parents / viewports)
  const getContainerScale = useCallback(() => {
    if (!diagramAreaRef.current) return { scaleX: 1, scaleY: 1, containerRect: null };
    const containerRect = diagramAreaRef.current.getBoundingClientRect();
    const clientWidth = diagramAreaRef.current.clientWidth || diagramAreaRef.current.offsetWidth || 1;
    const clientHeight = diagramAreaRef.current.clientHeight || diagramAreaRef.current.offsetHeight || 1;
    const scaleX = containerRect.width / clientWidth;
    const scaleY = containerRect.height / clientHeight;
    return { scaleX: scaleX || 1, scaleY: scaleY || 1, containerRect };
  }, []);

  const updateCoords = useCallback(() => {
    if (!diagramAreaRef.current) return;
    const { scaleX, scaleY, containerRect } = getContainerScale();
    if (!containerRect || containerRect.width === 0) return;

    // Reset dot refs array bounds
    dotRefsA.current = dotRefsA.current.slice(0, setA.length);
    dotRefsB.current = dotRefsB.current.slice(0, setB.length);

    const newCoords = (pairs || []).map(([from, to]) => {
      const idxA = findIndexInSet(setA, from);
      const idxB = findIndexInSet(setB, to);
      if (idxA === -1 || idxB === -1) return null;

      const elA = dotRefsA.current[idxA];
      const elB = dotRefsB.current[idxB];
      
      let x1, y1, x2, y2;

      if (elA && elB) {
        const rectA = elA.getBoundingClientRect();
        const rectB = elB.getBoundingClientRect();

        if (rectA.width > 0 && rectB.width > 0) {
          // Center of dot A
          x1 = (rectA.left + rectA.width / 2 - containerRect.left) / scaleX;
          y1 = (rectA.top + rectA.height / 2 - containerRect.top) / scaleY;

          // Target slightly inside left edge of dot B for crisp arrowhead anchoring
          x2 = (rectB.left + rectB.width * 0.25 - containerRect.left) / scaleX;
          y2 = (rectB.top + rectB.height / 2 - containerRect.top) / scaleY;
        }
      }

      // Proportional fallback if DOM rects not yet rendered
      if (x1 === undefined || x2 === undefined) {
        const cWidth = containerRect.width / scaleX;
        const cHeight = containerRect.height / scaleY;
        x1 = cWidth * 0.44;
        y1 = 30 + ((idxA + 0.5) / Math.max(1, setA.length)) * (cHeight - 40);
        x2 = cWidth * 0.56;
        y2 = 30 + ((idxB + 0.5) / Math.max(1, setB.length)) * (cHeight - 40);
      }

      return { x1, y1, x2, y2, from, to };
    }).filter(Boolean);

    setCoords(newCoords);
  }, [pairs, setA, setB, getContainerScale]);

  useEffect(() => {
    updateCoords();
    const raf = requestAnimationFrame(updateCoords);
    const timer1 = setTimeout(updateCoords, 30);
    const timer2 = setTimeout(updateCoords, 120);
    const timer3 = setTimeout(updateCoords, 300);
    const timer4 = setTimeout(updateCoords, 600);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      updateCoords();
    }) : null;

    if (ro && diagramAreaRef.current) {
      ro.observe(diagramAreaRef.current);
    }

    window.addEventListener('resize', updateCoords);
    window.addEventListener('orientationchange', updateCoords);
    window.addEventListener('scroll', updateCoords, true);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('orientationchange', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [updateCoords, setA, setB, pairs]);

  return (
    <div
      className={`relative w-full bg-white/45 backdrop-blur-xl rounded-2xl ${compact ? 'py-1.5 px-2.5' : 'p-2.5 sm:p-3.5'} border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)] select-none ${className}`}
    >
      {/* Header with status */}
      <div className={`flex items-center justify-between gap-1 ${compact ? 'mb-1' : 'mb-2'} flex-wrap relative z-20`}>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#78350F] whitespace-nowrap">
          <Layers className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" />
          <span>Diagram Panah</span>
        </div>
        {statusBadge && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${
            isFunction
              ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
              : 'bg-rose-100 text-rose-800 border-rose-400'
          }`}>
            {isFunction ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-rose-600" />}
            <span>{statusBadge}</span>
          </span>
        )}
      </div>

      {/* Main Diagram Area with Dynamic Curved SVG Relation Ropes (Tali Merah Detektif Berarah) */}
      <div ref={diagramAreaRef} className="relative">
        {/* SVG Arrow/Rope Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            <marker
              id={arrowMarkerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth={compact ? "6.8" : "7.8"}
              markerHeight={compact ? "6.8" : "7.8"}
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#E11D48" stroke="#2D241E" strokeWidth="1" />
            </marker>
          </defs>

          {coords.map((c, i) => {
            const dx = Math.max(16, (c.x2 - c.x1) * 0.45);
            // Dynamic subtle organic vertical offset so parallel lines don't collide visually
            const curveOffset = pairs.length > 1 ? ((i % 2 === 0 ? 1 : -1) * (compact ? 4 : 6)) : 0;
            const pathD = `M ${c.x1} ${c.y1} C ${c.x1 + dx} ${c.y1 + curveOffset}, ${c.x2 - dx} ${c.y2 - curveOffset}, ${c.x2} ${c.y2}`;

            return (
              <g key={i}>
                {/* Contrast Shadow Border */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#2D241E"
                  strokeWidth={compact ? "4.2" : "5.0"}
                  strokeLinecap="round"
                  opacity="0.32"
                />
                {/* Crimson Detective Relation Rope / Tali Merah Berarah */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#E11D48"
                  strokeWidth={compact ? "2.6" : "3.2"}
                  strokeLinecap="round"
                  markerEnd={`url(#${arrowMarkerId})`}
                  className="filter drop-shadow-[0_2px_4px_rgba(225,29,72,0.48)]"
                />
                {/* Inner Sheen Highlight for Tangible 3D Rope Look */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FECDD3"
                  strokeWidth={compact ? "0.9" : "1.1"}
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </g>
            );
          })}
        </svg>

        {/* Two Columns Grid: Set A (Domain) on Left & Set B (Kodomain) on Right */}
        <div className={`grid grid-cols-2 ${compact ? 'gap-6 sm:gap-8 md:gap-10' : 'gap-16 sm:gap-22 md:gap-28'} items-stretch relative z-20`}>
          {/* Set A (Domain) */}
          <div className={`${compact ? 'p-1' : 'p-2'} rounded-xl bg-blue-500/10 backdrop-blur-md border border-blue-300/40 text-center flex flex-col justify-between shadow-xs`}>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-700 block break-words leading-tight mb-1 pb-0.5 border-b border-blue-200/60" title={labelA}>
              {labelA}
            </span>
            <div className={`${compact ? 'space-y-1' : 'space-y-1.5'} flex-1 flex flex-col justify-around`}>
              {setA.map((item, idx) => (
                <div
                  key={idx}
                  className={`${compact ? 'py-0.5 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} rounded-lg bg-white/65 backdrop-blur-md border border-blue-300/70 font-bold text-blue-950 shadow-xs flex items-center justify-between transition-all hover:bg-white/85`}
                >
                  <span className="break-words leading-tight pr-1">{item}</span>
                  {/* Brass Pin Anchor (Paku Pin Himpunan Asal) */}
                  <div
                    ref={el => { dotRefsA.current[idx] = el; }}
                    className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 border border-[#2D241E] ring-2 ring-amber-300 shadow-xs flex-shrink-0 ml-1.5 transition-transform flex items-center justify-center"
                    title={`Pin ${item}`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white/80 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Set B (Kodomain) */}
          <div className={`${compact ? 'p-1' : 'p-2'} rounded-xl bg-emerald-500/10 backdrop-blur-md border border-emerald-300/40 text-center flex flex-col justify-between shadow-xs`}>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700 block break-words leading-tight mb-1 pb-0.5 border-b border-emerald-200/60" title={labelB}>
              {labelB}
            </span>
            <div className={`${compact ? 'space-y-1' : 'space-y-1.5'} flex-1 flex flex-col justify-around`}>
              {setB.map((item, idx) => {
                const hasExplicitRange = Boolean(highlightRange && highlightRange.length > 0);
                const isRangeItem = hasExplicitRange && (highlightRange.includes(item) || highlightRange.includes(String(item)));
                return (
                  <div
                    key={idx}
                    className={`${compact ? 'py-0.5 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} rounded-lg border font-bold shadow-xs flex items-center justify-between transition-all ${
                      isRangeItem
                        ? 'bg-amber-100/80 backdrop-blur-md border-amber-400 text-amber-950 font-black ring-1 ring-amber-400 shadow-xs'
                        : hasExplicitRange
                        ? 'bg-white/50 backdrop-blur-md border-emerald-300/60 text-emerald-950 opacity-60'
                        : 'bg-white/65 backdrop-blur-md border-emerald-300/70 text-emerald-950 shadow-xs hover:bg-white/85'
                    }`}
                  >
                    {/* Brass Pin Anchor (Paku Pin Himpunan Kawan) */}
                    <div
                      ref={el => { dotRefsB.current[idx] = el; }}
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mr-1.5 border border-[#2D241E] ring-2 shadow-xs transition-transform flex items-center justify-center ${
                        isRangeItem
                          ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 ring-amber-400'
                          : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 ring-emerald-300'
                      }`}
                      title={`Pin ${item}`}
                    >
                      <div className="w-1 h-1 rounded-full bg-white/80 pointer-events-none" />
                    </div>
                    <span className="break-words leading-tight pl-1 flex-1 text-right">{item}</span>
                    {isRangeItem && <span className="text-[10px] text-amber-700 font-bold ml-1 flex-shrink-0" title="Daerah Hasil (Range)">🎯</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. RADAR KOORDINAT CARTESIUS (Mini Cartesian Graph Visual)
// ─────────────────────────────────────────────────────────────
function CartesianGraphVisual({ visual, compact = false, className = '' }) {
  const {
    slope = 2, // 'a' in y = ax + b
    yIntercept = 1, // 'b' in y = ax + b
    xIntercept = null, // where y = 0
    formula = '',
    trend = 'naik', // 'naik' | 'turun' | 'datar'
    testPoints = [] // array of [x, y]
  } = visual;

  // Coordinate dimensions (customizable per equation)
  const minX = visual.minX !== undefined ? visual.minX : -1;
  const maxX = visual.maxX !== undefined ? visual.maxX : 5;
  const minY = visual.minY !== undefined ? visual.minY : -2;
  const maxY = visual.maxY !== undefined ? visual.maxY : 8;

  const width = 280;
  const height = compact ? 130 : 150;
  const padL = 30;
  const padR = 20;
  const padT = 12;
  const padB = 22;

  const toSvgX = (x) => padL + ((x - minX) / (maxX - minX)) * (width - padL - padR);
  const toSvgY = (y) => height - padB - ((y - minY) / (maxY - minY)) * (height - padT - padB);

  // Calculate line endpoints at x = minX and x = maxX
  const yStart = slope * minX + yIntercept;
  const yEnd = slope * maxX + yIntercept;

  const lineX1 = toSvgX(minX);
  const lineY1 = toSvgY(yStart);
  const lineX2 = toSvgX(maxX);
  const lineY2 = toSvgY(yEnd);

  const originX = Math.min(Math.max(toSvgX(0), padL), width - padR);
  const originY = Math.min(Math.max(toSvgY(0), padT), height - padB);

  // Dynamic grid steps
  const midX = Math.round((minX + maxX) / 2);
  const gridStepsX = [minX + 1, midX, maxX - 1].filter(x => x > minX && x < maxX);
  const gridStepsY = [minY + 2, 0, maxY - 2].filter(y => y > minY && y < maxY);

  return (
    <div className={`w-full bg-gradient-to-br from-white/85 via-white/70 to-amber-50/80 backdrop-blur-xl rounded-2xl ${compact ? 'p-2' : 'p-2.5 sm:p-3'} border-2 border-amber-300/80 shadow-[0_8px_24px_rgba(180,83,9,0.09)] text-[#2D241E] select-none ${className}`}>
      {/* Header bar */}
      <div className={`flex flex-wrap items-center justify-between gap-1.5 ${compact ? 'mb-0.5' : 'mb-1.5'}`}>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#78350F] min-w-0">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-amber-200 flex-shrink-0"></span>
          <span className="break-words leading-tight">{visual.title || (formula ? `Lintasan: ${formula}` : 'Diagram Cartesius')}</span>
        </div>
        {!visual.pointsOnly ? (
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border shadow-xs flex items-center gap-1 flex-shrink-0 ${
            slope > 0
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : slope < 0
              ? 'bg-rose-100 text-rose-800 border-rose-300'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          }`}>
            {slope > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : slope < 0 ? <TrendingDown className="w-2.5 h-2.5" /> : null}
            {slope > 0 ? `m = ${slope} (Naik)` : slope < 0 ? `m = ${slope} (Turun)` : 'm = 0 (Datar)'}
          </span>
        ) : (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full border border-blue-300 bg-blue-100 text-blue-900 shadow-xs flex items-center gap-1 flex-shrink-0">
            Titik Koordinat (x, y)
          </span>
        )}
      </div>

      {/* SVG Canvas Box - Sunken Frosted Glass */}
      <div className="flex items-center justify-center p-1.5 rounded-xl bg-white/45 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)]">
        <svg viewBox={`0 0 ${width} ${height}`} className={`w-full max-w-[340px] ${compact ? 'h-[110px]' : 'h-[135px]'} overflow-visible`}>
          {/* Subtle Grid Lines */}
          {gridStepsX.map(x => (
            <line
              key={`grid-x-${x}`}
              x1={toSvgX(x)}
              y1={toSvgY(minY)}
              x2={toSvgX(x)}
              y2={toSvgY(maxY)}
              stroke="#CBD5E1"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />
          ))}
          {gridStepsY.map(y => (
            <line
              key={`grid-y-${y}`}
              x1={toSvgX(minX)}
              y1={toSvgY(y)}
              x2={toSvgX(maxX)}
              y2={toSvgY(y)}
              stroke="#CBD5E1"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />
          ))}

          {/* Sumbu X (Horizontal Axis) */}
          <line
            x1={toSvgX(minX)}
            y1={originY}
            x2={toSvgX(maxX)}
            y2={originY}
            stroke="#475569"
            strokeWidth="1.6"
          />
          <text x={toSvgX(maxX) + 4} y={originY + 3} fill="#475569" fontSize="9" fontWeight="bold">X</text>

          {/* Sumbu Y (Vertical Axis) */}
          <line
            x1={originX}
            y1={toSvgY(maxY)}
            x2={originX}
            y2={toSvgY(minY)}
            stroke="#475569"
            strokeWidth="1.6"
          />
          <text x={originX - 3} y={toSvgY(maxY) - 4} fill="#475569" fontSize="9" fontWeight="bold">Y</text>

          {/* Axis Labels (X steps) */}
          {gridStepsX.map(x => (
            <text
              key={`x-label-${x}`}
              x={toSvgX(x)}
              y={originY + 12}
              fill="#64748B"
              fontSize="8"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {x}
            </text>
          ))}

          {/* Axis Labels (Y steps) */}
          {gridStepsY.map(y => (
            <text
              key={`y-label-${y}`}
              x={originX - 6}
              y={toSvgY(y) + 3}
              fill="#64748B"
              fontSize="8"
              textAnchor="end"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {y}
            </text>
          ))}

          {/* The Function Line (only if not pointsOnly) */}
          {!visual.pointsOnly && (
            <line
              x1={lineX1}
              y1={lineY1}
              x2={lineX2}
              y2={lineY2}
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Y-Intercept Marker Dot */}
          {!visual.pointsOnly && (
            <>
              <circle
                cx={originX}
                cy={toSvgY(yIntercept)}
                r="4.5"
                fill="#D97706"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x={originX + 6}
                y={toSvgY(yIntercept) - 4}
                fill="#92400E"
                fontSize="8.5"
                fontWeight="bold"
              >
                (0, {yIntercept})
              </text>
            </>
          )}

          {/* X-Intercept Marker Dot (if provided) */}
          {!visual.pointsOnly && xIntercept !== null && (
            <g>
              <circle
                cx={toSvgX(xIntercept)}
                cy={originY}
                r="4.5"
                fill="#059669"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x={toSvgX(xIntercept)}
                y={originY + 18}
                fill="#065F46"
                fontSize="8.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                ({xIntercept}, 0)
              </text>
            </g>
          )}

          {/* Test Points (if any) */}
          {testPoints.map(([px, py], ptIdx) => (
            <g key={`pt-${ptIdx}`}>
              <circle
                cx={toSvgX(px)}
                cy={toSvgY(py)}
                r="4.5"
                fill="#E11D48"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="animate-ping-once"
              />
              <text
                x={toSvgX(px) + 5}
                y={toSvgY(py) - 4}
                fill="#9F1239"
                fontSize="8.5"
                fontWeight="bold"
              >
                ({px}, {py})
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. PAPAN KORESPONDENSI 1-KE-1 (Bijective Pairing Board)
// ─────────────────────────────────────────────────────────────
function OneToOneBoardVisual({ visual, compact = false, className = '' }) {
  const {
    setA = ['Saksi 1', 'Saksi 2', 'Saksi 3'],
    setB = ['Ruang A', 'Ruang B', 'Ruang C'],
    pairs = [['Saksi 1', 'Ruang A'], ['Saksi 2', 'Ruang B'], ['Saksi 3', 'Ruang C']],
    title = 'Korespondensi Satu-Satu'
  } = visual;

  const sizeN = visual.sizeN || setA.length;
  const permutations = visual.permutations || visual.totalWays || `${sizeN}! susunan`;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  const boardAreaRef = useRef(null);
  const dotRefsA = useRef([]);
  const dotRefsB = useRef([]);
  const [coords, setCoords] = useState([]);
  const arrowMarkerId = useRef(`arrow_1to1_${Math.random().toString(36).slice(2, 9)}`).current;

  const getContainerScale = useCallback(() => {
    if (!boardAreaRef.current) return { scaleX: 1, scaleY: 1, containerRect: null };
    const containerRect = boardAreaRef.current.getBoundingClientRect();
    const clientWidth = boardAreaRef.current.clientWidth || boardAreaRef.current.offsetWidth || 1;
    const clientHeight = boardAreaRef.current.clientHeight || boardAreaRef.current.offsetHeight || 1;
    const scaleX = containerRect.width / clientWidth;
    const scaleY = containerRect.height / clientHeight;
    return { scaleX: scaleX || 1, scaleY: scaleY || 1, containerRect };
  }, []);

  const updateCoords = useCallback(() => {
    if (!boardAreaRef.current) return;
    const { scaleX, scaleY, containerRect } = getContainerScale();
    if (!containerRect || containerRect.width === 0) return;

    dotRefsA.current = dotRefsA.current.slice(0, setA.length);
    dotRefsB.current = dotRefsB.current.slice(0, setB.length);

    const newCoords = (pairs || []).map(([from, to], pIdx) => {
      const idxA = findIndexInSet(setA, from);
      const idxB = findIndexInSet(setB, to);
      if (idxA === -1 || idxB === -1) return null;

      const elA = dotRefsA.current[idxA];
      const elB = dotRefsB.current[idxB];
      
      let x1, y1, x2, y2;

      if (elA && elB) {
        const rectA = elA.getBoundingClientRect();
        const rectB = elB.getBoundingClientRect();

        if (rectA.width > 0 && rectB.width > 0) {
          x1 = (rectA.left + rectA.width / 2 - containerRect.left) / scaleX;
          y1 = (rectA.top + rectA.height / 2 - containerRect.top) / scaleY;

          x2 = (rectB.left + rectB.width * 0.25 - containerRect.left) / scaleX;
          y2 = (rectB.top + rectB.height / 2 - containerRect.top) / scaleY;
        }
      }

      // Proportional fallback
      if (x1 === undefined || x2 === undefined) {
        const cWidth = containerRect.width / scaleX;
        const cHeight = containerRect.height / scaleY;
        x1 = cWidth * 0.44;
        y1 = 30 + ((idxA + 0.5) / Math.max(1, setA.length)) * (cHeight - 40);
        x2 = cWidth * 0.56;
        y2 = 30 + ((idxB + 0.5) / Math.max(1, setB.length)) * (cHeight - 40);
      }

      return { x1, y1, x2, y2, color: colors[pIdx % colors.length] };
    }).filter(Boolean);

    setCoords(newCoords);
  }, [pairs, setA, setB, getContainerScale]);

  useEffect(() => {
    updateCoords();
    const raf = requestAnimationFrame(updateCoords);
    const timer1 = setTimeout(updateCoords, 30);
    const timer2 = setTimeout(updateCoords, 120);
    const timer3 = setTimeout(updateCoords, 300);
    const timer4 = setTimeout(updateCoords, 600);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      updateCoords();
    }) : null;

    if (ro && boardAreaRef.current) {
      ro.observe(boardAreaRef.current);
    }

    window.addEventListener('resize', updateCoords);
    window.addEventListener('orientationchange', updateCoords);
    window.addEventListener('scroll', updateCoords, true);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('orientationchange', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [updateCoords, setA, setB, pairs]);

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-indigo-50/95 to-purple-50/95 backdrop-blur-md rounded-2xl ${compact ? 'p-2' : 'p-2.5 sm:p-3.5'} border-2 border-indigo-300/80 shadow-[0_4px_16px_rgba(99,102,241,0.12)] select-none ${className}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between gap-1.5 ${compact ? 'mb-1' : 'mb-2'} relative z-20`}>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-indigo-950">
          <Repeat className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span className="break-words">{title}</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 flex-shrink-0">
          {typeof permutations === 'number'
            ? `n = ${sizeN} (${permutations} Cara)`
            : String(permutations).includes('n(') || String(permutations).includes('n =')
            ? permutations
            : `n = ${sizeN} (${permutations})`}
        </span>
      </div>

      {/* Main Diagram Area with Dynamic Curved SVG 1:1 Threads */}
      <div ref={boardAreaRef} className="relative">
        {/* SVG Thread Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            <marker
              id={arrowMarkerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth={compact ? "6.8" : "7.8"}
              markerHeight={compact ? "6.8" : "7.8"}
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#6366F1" stroke="#312E81" strokeWidth="1" />
            </marker>
          </defs>

          {coords.map((c, i) => {
            const dx = Math.max(16, (c.x2 - c.x1) * 0.45);
            const pathD = `M ${c.x1} ${c.y1} C ${c.x1 + dx} ${c.y1}, ${c.x2 - dx} ${c.y2}, ${c.x2} ${c.y2}`;

            return (
              <g key={i}>
                {/* Contrast Shadow Border */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#1E1B4B"
                  strokeWidth={compact ? "4" : "4.8"}
                  strokeLinecap="round"
                  opacity="0.25"
                />
                {/* Vibrant Colored Thread */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={c.color || '#6366F1'}
                  strokeWidth={compact ? "2.6" : "3.2"}
                  strokeLinecap="round"
                  markerEnd={`url(#${arrowMarkerId})`}
                  className="filter drop-shadow-[0_2px_4px_rgba(99,102,241,0.45)]"
                />
                {/* 3D Core Sheen */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#EEF2FF"
                  strokeWidth={compact ? "0.8" : "1.0"}
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </g>
            );
          })}
        </svg>

        {/* Two Columns Grid: Set A on Left & Set B on Right */}
        <div className={`grid grid-cols-2 ${compact ? 'gap-10 sm:gap-14' : 'gap-12 sm:gap-16 md:gap-20'} items-stretch relative z-20`}>
          {/* Set A */}
          <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-xl bg-indigo-50/90 border-2 border-indigo-200/90 text-center flex flex-col justify-between shadow-xs`}>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-indigo-700 block break-words leading-tight mb-1.5 pb-1 border-b border-indigo-200/60">
              Himpunan A ({sizeN})
            </span>
            <div className="space-y-1.5 flex-1 flex flex-col justify-around">
              {setA.map((item, idx) => (
                <div
                  key={idx}
                  className={`${compact ? 'py-1 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} rounded-lg bg-white/65 backdrop-blur-md border border-indigo-300/70 font-bold text-indigo-950 shadow-xs flex items-center justify-between transition-all hover:bg-white/85`}
                >
                  <span className="break-words leading-tight pr-1">{item}</span>
                  {/* Brass Pin Anchor */}
                  <div
                    ref={el => { dotRefsA.current[idx] = el; }}
                    className="w-3.5 h-3.5 rounded-full border border-[#1E1B4B] flex-shrink-0 ml-1.5 ring-2 ring-indigo-200 shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                    title={`Pin ${item}`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white/80 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Set B */}
          <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-xl bg-purple-50/90 border-2 border-purple-200/90 text-center flex flex-col justify-between shadow-xs`}>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-purple-700 block break-words leading-tight mb-1.5 pb-1 border-b border-purple-200/60">
              Himpunan B ({sizeN})
            </span>
            <div className="space-y-1.5 flex-1 flex flex-col justify-around">
              {setB.map((item, idx) => (
                <div
                  key={idx}
                  className={`${compact ? 'py-1 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} rounded-lg bg-white/65 backdrop-blur-md border border-purple-300/70 font-bold text-purple-950 shadow-xs flex items-center justify-between transition-all hover:bg-white/85`}
                >
                  {/* Brass Pin Anchor */}
                  <div
                    ref={el => { dotRefsB.current[idx] = el; }}
                    className="w-3.5 h-3.5 rounded-full border border-[#1E1B4B] flex-shrink-0 mr-1.5 ring-2 ring-purple-200 shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                    title={`Pin ${item}`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white/80 pointer-events-none" />
                  </div>
                  <span className="break-words leading-tight pl-1 flex-1 text-right">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. TABEL RELASI (Detective Ledger Relation Table)
// ─────────────────────────────────────────────────────────────
function RelationTableVisual({ visual, compact = false, className = '' }) {
  const {
    title = 'Tabel Relasi Bukti',
    rule = '',
    headers,
    rows,
    pairs,
    showOrderedPair = true,
    layout = 'vertical' // 'vertical' | 'horizontal'
  } = visual;

  // Normalize row items from pairs or rows
  const tableRows = rows || (pairs ? pairs.map(p => Array.isArray(p) ? p : [p.from || p.x || p[0], p.to || p.y || p[1]]) : []);
  const colHeaders = headers || ['Domain (x)', 'Kodomain (y)'];

  return (
    <div className={`w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE0] rounded-2xl ${compact ? 'py-1 px-2' : 'p-3 sm:p-4'} border-2 border-amber-300/80 shadow-[0_6px_20px_rgba(180,83,9,0.1)] select-none relative overflow-hidden ${className}`}>
      {/* Decorative brass rivet clip on top */}
      <div className={`flex justify-center ${compact ? '-mt-1 mb-1' : '-mt-2 sm:-mt-3 mb-2'}`}>
        <div className="px-3 py-0.5 rounded-b-lg bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-x border-b border-amber-800 shadow-xs flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-200 border border-amber-900" />
          <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-amber-100">CATATAN BUKTI RELASI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-200 border border-amber-900" />
        </div>
      </div>

      {/* Header Info */}
      <div className={`flex flex-wrap items-center justify-between gap-1.5 ${compact ? 'mb-1' : 'mb-2 sm:mb-2.5'}`}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <Table className="w-3.5 h-3.5 text-amber-800 flex-shrink-0" />
          <span className={`${compact ? 'text-xs sm:text-[13px]' : 'text-xs sm:text-sm md:text-base'} font-black font-pencil text-amber-950 break-words leading-tight`}>
            {title}
          </span>
        </div>
        {rule && (
          <span className={`${compact ? 'text-[9px] px-2 py-0.5' : 'text-[10px] sm:text-xs px-2.5 py-0.5'} rounded-full bg-amber-200/90 text-amber-950 font-bold border border-amber-400 shadow-xs flex-shrink-0 whitespace-nowrap`}>
            Aturan: <span className="text-amber-800 italic font-black">{rule}</span>
          </span>
        )}
      </div>

      {/* Table Content */}
      {layout === 'horizontal' ? (
        <div className="overflow-x-auto rounded-xl border border-white/70 bg-white/45 backdrop-blur-xl shadow-inner">
          <table className="w-full text-center border-collapse">
            <tbody>
              <tr className="border-b border-amber-200/80 bg-amber-50/70">
                <td className={`${compact ? 'py-1 px-2 text-[11px]' : 'py-2 px-3 text-xs'} font-black text-blue-900 border-r border-amber-200/80 sticky left-0 bg-amber-100/90 whitespace-nowrap`}>
                  {colHeaders[0] || 'x'}
                </td>
                {tableRows.map((row, idx) => (
                  <td key={idx} className={`${compact ? 'py-1 px-2 text-xs' : 'py-2 px-3 text-xs sm:text-sm'} font-mono font-bold text-blue-800 border-r border-amber-200/50 last:border-r-0 whitespace-nowrap`}>
                    {row[0]}
                  </td>
                ))}
              </tr>
              <tr className="bg-white/50 backdrop-blur-md">
                <td className={`${compact ? 'py-1 px-2 text-[11px]' : 'py-2 px-3 text-xs'} font-black text-purple-900 border-r border-amber-200/80 sticky left-0 bg-purple-50/90 whitespace-nowrap`}>
                  {colHeaders[1] || 'y'}
                </td>
                {tableRows.map((row, idx) => (
                  <td key={idx} className={`${compact ? 'py-1 px-2 text-xs' : 'py-2 px-3 text-xs sm:text-sm'} font-mono font-black text-purple-900 border-r border-amber-200/50 last:border-r-0 whitespace-nowrap`}>
                    {row[1]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-xl border border-white/70 bg-white/45 backdrop-blur-xl shadow-inner">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-amber-200/70 via-amber-100/80 to-amber-200/70 border-b-2 border-amber-300/90">
                <th className={`${compact ? 'py-1 px-1.5 text-[9.5px]' : 'py-1.5 px-2 sm:px-2.5 text-[10.5px] sm:text-xs'} font-black text-blue-950 uppercase tracking-wider text-center sm:text-left`}>
                  {colHeaders[0] || 'Domain (x)'}
                </th>
                {Boolean(rule && visual.showRuleColumn) && (
                  <th className={`${compact ? 'py-1 px-1 text-[9.5px]' : 'py-1.5 px-1.5 sm:px-2 text-[10.5px] sm:text-xs'} font-black text-amber-900 uppercase tracking-wider text-center`}>
                    Hubungan
                  </th>
                )}
                <th className={`${compact ? 'py-1 px-1.5 text-[9.5px]' : 'py-1.5 px-2 sm:px-2.5 text-[10.5px] sm:text-xs'} font-black text-purple-950 uppercase tracking-wider text-center sm:text-left`}>
                  {colHeaders[1] || 'Kodomain (y)'}
                </th>
                {showOrderedPair && (
                  <th className={`${compact ? 'py-1 px-1.5 text-[9.5px]' : 'py-1.5 px-2 sm:px-2.5 text-[10.5px] sm:text-xs'} font-black text-emerald-950 uppercase tracking-wider text-center sm:text-right`}>
                    Pasangan (x, y)
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 font-medium">
              {tableRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-amber-100/40 ${idx % 2 === 0 ? 'bg-white/60' : 'bg-amber-50/30'}`}
                >
                  <td className={`${compact ? 'py-0.5 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} font-bold text-blue-900 text-center sm:text-left`}>
                    <span className={`inline-block ${compact ? 'px-1.5 py-0.2' : 'px-2.5 py-0.5'} rounded-md bg-blue-50 border border-blue-200/80 font-pencil font-bold`}>
                      {row[0]}
                    </span>
                  </td>
                  {Boolean(rule && visual.showRuleColumn) && (
                    <td className={`${compact ? 'py-0.5 px-1 text-[10px]' : 'py-1.5 px-1.5 text-xs'} text-amber-700 font-semibold italic text-center`}>
                      {rule}
                    </td>
                  )}
                  <td className={`${compact ? 'py-0.5 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} font-bold text-purple-900 text-center sm:text-left`}>
                    <span className={`inline-block ${compact ? 'px-1.5 py-0.2' : 'px-2.5 py-0.5'} rounded-md bg-purple-50 border border-purple-200/80 font-pencil font-bold`}>
                      {row[1]}
                    </span>
                  </td>
                  {showOrderedPair && (
                    <td className={`${compact ? 'py-0.5 px-1.5 text-xs' : 'py-1.5 px-2 text-xs sm:text-sm'} font-pencil font-bold text-emerald-900 text-center sm:text-right`}>
                      <span className={`inline-flex items-center ${compact ? 'px-1.5 py-0.2 text-xs' : 'px-2.5 py-0.5 text-xs sm:text-sm'} rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold`}>
                        ({row[0]}, {row[1]})
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer hint */}
      <div className={`${compact ? 'hidden' : 'mt-2 flex items-center justify-between text-[10px] text-amber-800/80 font-medium'}`}>
        <span>Baris: {tableRows.length} data pasangan terdaftar</span>
        <span className="italic">Format representasi tabel resmi</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. HIMPUNAN PASANGAN BERURUTAN (Ordered Pairs Visualizer)
// ─────────────────────────────────────────────────────────────
function OrderedPairsVisual({ visual, compact = false, className = '' }) {
  const {
    title = 'Himpunan Pasangan Berurutan',
    setName = 'R',
    rule = '',
    pairs = [],
    domain = [],
    range = [],
    domainName = 'Domain (Daerah Asal)',
    rangeName = 'Range (Daerah Hasil)'
  } = visual;

  // Parse pairs to ensure [x, y] format
  const normalizedPairs = pairs.map(p => Array.isArray(p) ? p : [p.from || p.x || p[0], p.to || p.y || p[1]]);

  // Compute domain and range if not explicitly provided
  const computedDomain = domain && domain.length > 0 ? domain : [...new Set(normalizedPairs.map(p => p[0]))];
  const computedRange = range && range.length > 0 ? range : [...new Set(normalizedPairs.map(p => p[1]))];

  return (
    <div className={`w-full bg-gradient-to-br from-white/85 via-white/70 to-amber-50/80 backdrop-blur-xl rounded-2xl ${compact ? 'py-1.5 px-2.5' : 'p-3 sm:p-4'} border-2 border-amber-300/80 shadow-[0_8px_24px_rgba(180,83,9,0.09)] text-[#2D241E] select-none relative overflow-hidden ${className}`}>
      {/* Decorative detective watermark */}
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-[0.04] pointer-events-none text-amber-950">
        <Tag className="w-36 h-36" />
      </div>

      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between gap-1.5 ${compact ? 'mb-1' : 'mb-2 sm:mb-2.5'} relative z-10`}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div className="w-6 h-6 rounded-lg bg-amber-100/90 border border-amber-300/90 flex items-center justify-center text-amber-800 shadow-xs flex-shrink-0">
            <Tag className="w-3.5 h-3.5 text-[#D97706]" />
          </div>
          <span className={`${compact ? 'text-xs sm:text-[13px]' : 'text-xs sm:text-sm md:text-base'} font-black font-pencil text-[#2D241E] break-words leading-tight`}>
            {title}
          </span>
        </div>
        {rule && (
          <span className={`${compact ? 'text-[9px] px-2 py-0.5' : 'text-[10px] sm:text-xs px-3 py-1'} rounded-full bg-amber-100/90 text-amber-950 border border-amber-300/90 font-bold shadow-xs flex-shrink-0 whitespace-nowrap`}>
            Aturan: <span className="text-[#B45309] font-black italic">{rule}</span>
          </span>
        )}
      </div>

      {/* Ordered Pairs Box */}
      <div className={`${compact ? 'p-1.5 sm:p-2 mb-1' : 'p-3 sm:p-4 mb-3'} rounded-xl bg-white/45 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)] relative z-10`}>
        <div className={`flex items-baseline flex-wrap gap-1.5 ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} font-mono`}>
          <span className="text-[#B45309] font-black tracking-wide">{setName} = </span>
          <span className="text-[#78350F] font-black text-base">&#123;</span>

          <div className="inline-flex flex-wrap items-center gap-1.5 py-0.5">
            {normalizedPairs.map((pair, idx) => (
              <div
                key={idx}
                className={`group inline-flex items-center ${compact ? 'px-2 py-0.5 rounded-lg text-xs' : 'px-3 py-1 rounded-xl'} bg-white/65 backdrop-blur-md border border-amber-300/70 hover:border-amber-500 hover:scale-105 hover:shadow-md transition-all shadow-xs`}
              >
                <span className="text-[#78350F]/70 font-bold mr-0.5">(</span>
                <span className="text-blue-700 font-black tracking-wide font-mono group-hover:text-blue-900">{pair[0]}</span>
                <span className="text-[#78350F]/60 mx-1 font-bold">,</span>
                <span className="text-emerald-700 font-black tracking-wide font-mono group-hover:text-emerald-900">{pair[1]}</span>
                <span className="text-[#78350F]/70 font-bold ml-0.5">)</span>
                {idx < normalizedPairs.length - 1 && (
                  <span className="text-[#78350F]/80 font-bold ml-1">,</span>
                )}
              </div>
            ))}
          </div>

          <span className="text-[#78350F] font-black text-base">&#125;</span>
        </div>
      </div>

      {/* Summary Badges: Domain & Range (Hidden in compact question mode to prevent vertical overflow) */}
      <div className={`${compact ? 'hidden' : 'grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1'} border-t border-amber-200/70 relative z-10`}>
        {/* Domain Badge */}
        <div className="p-2 px-3 rounded-xl bg-blue-50/85 backdrop-blur-sm border border-blue-200/90 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-200 flex-shrink-0" />
            <span className="font-bold text-blue-900 text-[10.5px] sm:text-xs break-words">{domainName}:</span>
          </div>
          <span className="font-mono font-black text-blue-800 text-[11px] sm:text-xs ml-2">
            &#123;{computedDomain.join(', ')}&#125;
          </span>
        </div>

        {/* Range Badge */}
        <div className="p-2 px-3 rounded-xl bg-emerald-50/85 backdrop-blur-sm border border-emerald-200/90 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 flex-shrink-0" />
            <span className="font-bold text-emerald-900 text-[10.5px] sm:text-xs break-words">{rangeName}:</span>
          </div>
          <span className="font-mono font-black text-emerald-800 text-[11px] sm:text-xs ml-2">
            &#123;{computedRange.join(', ')}&#125;
          </span>
        </div>
      </div>
    </div>
  );
}

