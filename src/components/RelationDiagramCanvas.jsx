import React, { useRef, useState, useEffect, useCallback } from 'react';
import { DIAGRAM_ROPE_PALETTES, getDiagramRopePalette } from '../utils/diagramPalettes';

/**
 * RelationDiagramCanvas
 * Renders set columns A (Domain) and B (Kodomain) enclosed within unified oval set containers,
 * with organic, lively curved SVG arrow threads.
 * Connects EXACTLY from hole to hole (center of circular dot elements).
 * Supports BOTH 2-tap/2-click selection AND fluid touch-and-drag thread line connecting!
 * Full support for CSS scaled containers (--game-scale) on mobile touchscreens and tablets.
 */
export default function RelationDiagramCanvas({
  setA = [],
  setB = [],
  connections = [], // array of [indexA, indexB]
  selectedA = null,
  onSelectA,
  onSelectB,
  onDisconnectPair = null,
  labelA = 'Himpunan A',
  labelB = 'Himpunan B',
  highlightRange = false,
  readOnly = false,
  compact = false,
  className = ''
}) {
  const containerRef = useRef(null);
  const cardRefsA = useRef([]);
  const cardRefsB = useRef([]);
  const dotRefsA = useRef([]);
  const dotRefsB = useRef([]);
  const [coords, setCoords] = useState([]);
  
  // Drag State for Touch-and-Drag thread line
  const [draggingA, setDraggingA] = useState(null);
  const [dragMousePos, setDragMousePos] = useState(null);
  const [hoveredTargetB, setHoveredTargetB] = useState(null);

  const activePointerIdRef = useRef(null);
  const dragOriginRef = useRef(null);
  const dragMovedRef = useRef(false);
  const lastDragEndTimeRef = useRef(0);

  // Accurate detection of CSS transform scale factor (from --game-scale or viewport scaling)
  const getContainerScale = useCallback(() => {
    if (!containerRef.current) return { scaleX: 1, scaleY: 1, containerRect: null };
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientWidth = containerRef.current.clientWidth || containerRef.current.offsetWidth || 1;
    const clientHeight = containerRef.current.clientHeight || containerRef.current.offsetHeight || 1;
    const scaleX = containerRect.width / clientWidth;
    const scaleY = containerRect.height / clientHeight;
    return { scaleX: scaleX || 1, scaleY: scaleY || 1, containerRect };
  }, []);

  // Calculate SVG line paths dynamically based on exact circular hole/dot center coordinates
  // Divided by scaleX and scaleY to maintain 100% dead-center hole alignment on scaled screens!
  const updateCoords = useCallback(() => {
    if (!containerRef.current) return;
    const { scaleX, scaleY, containerRect } = getContainerScale();
    if (!containerRect) return;

    const aCounts = {};
    const newCoords = connections.map(([idxA, idxB]) => {
      const elA = dotRefsA.current[idxA];
      const elB = dotRefsB.current[idxB];

      if (!elA || !elB) return null;

      const rectA = elA.getBoundingClientRect();
      const rectB = elB.getBoundingClientRect();

      // Exact center of circular hole A divided by CSS scale
      const x1 = (rectA.left + rectA.width / 2 - containerRect.left) / scaleX;
      const y1 = (rectA.top + rectA.height / 2 - containerRect.top) / scaleY;

      // Exact center of circular hole B divided by CSS scale
      const x2 = (rectB.left + rectB.width / 2 - containerRect.left) / scaleX;
      const y2 = (rectB.top + rectB.height / 2 - containerRect.top) / scaleY;

      const branch = aCounts[idxA] || 0;
      aCounts[idxA] = branch + 1;
      const palette = getDiagramRopePalette(idxA, branch);

      return { x1, y1, x2, y2, idxA, idxB, palette };
    }).filter(Boolean);

    setCoords(newCoords);
  }, [connections, getContainerScale]);

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('orientationchange', updateCoords);
    window.addEventListener('scroll', updateCoords, true);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('orientationchange', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [setA, setB, connections, updateCoords]);

  useEffect(() => {
    const timer = setTimeout(updateCoords, 40);
    return () => clearTimeout(timer);
  }, [connections, selectedA, updateCoords]);

  const isRangeNode = (idxB) => {
    if (!highlightRange) return false;
    return connections.some(([, b]) => b === idxB);
  };

  // Find target card B under pointer coordinates with generous 24px fingertip touch buffer
  const findTargetNodeB = useCallback((clientX, clientY) => {
    let bestIdx = null;
    let minDistance = Infinity;

    cardRefsB.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      
      // Expand hit area to account for fingertip touch radius
      const padX = 25;
      const padY = 16;
      const inBox = (
        clientX >= rect.left - padX &&
        clientX <= rect.right + padX &&
        clientY >= rect.top - padY &&
        clientY <= rect.bottom + padY
      );

      if (inBox) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(clientX - centerX, clientY - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          bestIdx = idx;
        }
      }
    });

    return bestIdx;
  }, []);

  // Pointer Down on Node A: begins fluid touch drag
  const handlePointerDownA = (idxA, e) => {
    if (readOnly) return;
    if (e.button !== undefined && e.button !== 0) return;

    activePointerIdRef.current = e.pointerId;
    dragOriginRef.current = { x: e.clientX, y: e.clientY, idxA };
    dragMovedRef.current = false;

    setDraggingA(idxA);

    const { scaleX, scaleY, containerRect } = getContainerScale();
    if (containerRect) {
      setDragMousePos({
        x: (e.clientX - containerRect.left) / scaleX,
        y: (e.clientY - containerRect.top) / scaleY
      });
    }
  };

  // Window Pointer Event Listeners while dragging
  useEffect(() => {
    if (draggingA === null) return;

    const handlePointerMove = (e) => {
      if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
      
      // Prevent mobile screen scrolling/panning while connecting ropes
      if (e.cancelable) {
        e.preventDefault();
      }

      if (dragOriginRef.current) {
        const dist = Math.hypot(e.clientX - dragOriginRef.current.x, e.clientY - dragOriginRef.current.y);
        if (dist > 6) {
          dragMovedRef.current = true;
        }
      }

      const { scaleX, scaleY, containerRect } = getContainerScale();
      if (containerRect) {
        setDragMousePos({
          x: (e.clientX - containerRect.left) / scaleX,
          y: (e.clientY - containerRect.top) / scaleY
        });
      }

      const targetB = findTargetNodeB(e.clientX, e.clientY);
      setHoveredTargetB(targetB);
    };

    const handlePointerUp = (e) => {
      if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

      const targetB = findTargetNodeB(e.clientX, e.clientY);
      const wasDragged = dragMovedRef.current;

      // If user dragged rope from A to B: connect immediately!
      if (wasDragged) {
        lastDragEndTimeRef.current = Date.now();
        if (targetB !== null && !readOnly) {
          onSelectB?.(targetB, draggingA);
        }
      }

      activePointerIdRef.current = null;
      dragOriginRef.current = null;
      setDraggingA(null);
      setDragMousePos(null);
      setHoveredTargetB(null);

      // Keep dragMovedRef true briefly so immediate synthetic click from drag release is ignored
      setTimeout(() => {
        dragMovedRef.current = false;
      }, 60);
    };

    const handlePointerCancel = () => {
      activePointerIdRef.current = null;
      dragOriginRef.current = null;
      dragMovedRef.current = false;
      setDraggingA(null);
      setDragMousePos(null);
      setHoveredTargetB(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerCancel, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [draggingA, readOnly, getContainerScale, findTargetNodeB, onSelectB]);

  // Dynamic preview line coordinates when dragging rope
  const getDragLineCoords = () => {
    if (draggingA === null || !dragMousePos || !containerRef.current) return null;
    const elA = dotRefsA.current[draggingA];
    if (!elA) return null;

    const { scaleX, scaleY, containerRect } = getContainerScale();
    if (!containerRect) return null;

    const rectA = elA.getBoundingClientRect();
    const x1 = (rectA.left + rectA.width / 2 - containerRect.left) / scaleX;
    const y1 = (rectA.top + rectA.height / 2 - containerRect.top) / scaleY;

    return { x1, y1, x2: dragMousePos.x, y2: dragMousePos.y, idxA: draggingA };
  };

  const dragLine = getDragLineCoords();

  // Handler for click/tap on Node A (Domain)
  const handleNodeClickA = (idxA, e) => {
    e?.stopPropagation?.();
    if (readOnly) return;
    if (dragMovedRef.current || (Date.now() - lastDragEndTimeRef.current < 250)) return;
    onSelectA?.(idxA);
  };

  // Handler for click/tap on Node B (Kodomain)
  const handleNodeClickB = (idxB, e) => {
    e?.stopPropagation?.();
    if (readOnly) return;
    if (Date.now() - lastDragEndTimeRef.current < 250) return;
    onSelectB?.(idxB);
  };

  // Disconnect rope directly by clicking/tapping on it
  const handleDisconnectLine = (idxA, idxB, e) => {
    e?.stopPropagation?.();
    if (readOnly) return;
    if (onDisconnectPair) {
      onDisconnectPair(idxA, idxB);
    } else {
      onSelectB?.(idxB, idxA);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className={`relative w-full max-w-lg mx-auto ${compact ? 'p-2 sm:p-2.5 rounded-2xl' : 'p-2.5 sm:p-3.5 rounded-3xl'} glass-card border border-white/60 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] select-none font-hand touch-none ${compact ? 'text-xs' : 'text-sm'} ${className}`}
    >
      {/* SVG Lively Curved Arrow Thread Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <defs>
          {/* Multi-Colored Arrow Markers for each palette */}
          {DIAGRAM_ROPE_PALETTES.map((pal) => (
            <marker
              key={pal.id}
              id={`pencilArrow-${pal.id}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={pal.stroke} stroke="#2D241E" strokeWidth="1.5" />
            </marker>
          ))}
          {/* Default fallback marker */}
          <marker
            id="pencilArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#E11D48" stroke="#2D241E" strokeWidth="1.5" />
          </marker>
        </defs>

        {/* Existing Connections Lines */}
        {coords.map((c, i) => {
          const dx = (c.x2 - c.x1) * 0.45;
          const curveOffset = ((i % 2 === 0 ? 1 : -1) * 14);
          const pathD = `M ${c.x1} ${c.y1} C ${c.x1 + dx} ${c.y1 + curveOffset}, ${c.x2 - dx} ${c.y2 - curveOffset}, ${c.x2} ${c.y2}`;
          const pal = c.palette || getDiagramRopePalette(c.idxA, 0);

          return (
            <g key={i} className="group pointer-events-auto">
              {/* Wide invisible hitbox for easy tapping to sever/disconnect rope */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth="28"
                strokeLinecap="round"
                className="cursor-pointer"
                onPointerDown={(e) => handleDisconnectLine(c.idxA, c.idxB, e)}
              />
              {/* Drop Shadow Border */}
              <path
                d={pathD}
                fill="none"
                stroke="#2D241E"
                strokeWidth={compact ? "4.5" : "5.5"}
                strokeLinecap="round"
                className="pointer-events-none"
              />
              {/* Vibrant Colored Thread / Rope */}
              <path
                d={pathD}
                fill="none"
                stroke={pal.stroke}
                strokeWidth={compact ? "3.5" : "4.5"}
                strokeLinecap="round"
                markerEnd={`url(#pencilArrow-${pal.id})`}
                style={{ filter: `drop-shadow(0 2px 5px ${pal.shadow})` }}
                className="pointer-events-none transition-all duration-200"
              />
              {/* 3D Core Highlight Sheen for Tactile Rope Texture */}
              <path
                d={pathD}
                fill="none"
                stroke={pal.sheen}
                strokeWidth={compact ? "1.0" : "1.4"}
                strokeLinecap="round"
                opacity="0.8"
                className="pointer-events-none"
              />
            </g>
          );
        })}

        {/* Live Dragging Thread Line Preview */}
        {dragLine && (() => {
          const activeDragPal = getDiagramRopePalette(dragLine.idxA, 0);
          return (
            <g className="pointer-events-none">
              <line
                x1={dragLine.x1}
                y1={dragLine.y1}
                x2={dragLine.x2}
                y2={dragLine.y2}
                stroke="#2D241E"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <line
                x1={dragLine.x1}
                y1={dragLine.y1}
                x2={dragLine.x2}
                y2={dragLine.y2}
                stroke={activeDragPal.stroke}
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
                markerEnd={`url(#pencilArrow-${activeDragPal.id})`}
              />
            </g>
          );
        })()}
      </svg>

      {/* Two Columns Grid for Himpunan A and B */}
      <div className={`grid grid-cols-2 ${compact ? 'gap-2 sm:gap-3' : 'gap-3 sm:gap-5'} relative z-10`}>
        
        {/* HIMPUNAN A */}
        <div className={`${compact ? 'space-y-1' : 'space-y-2'} text-center flex flex-col items-center w-full`}>
          <div className={`${compact ? 'py-0.5 px-2 text-[11px] sm:text-xs font-black' : 'py-2 px-4 text-lg sm:text-xl lg:text-[22px] font-black'} rounded-xl glass-panel-subtle border border-[#2D241E]/40 text-[#78350F] shadow-[0_2px_8px_rgba(0,0,0,0.06)] self-center`}>
            {labelA}
          </div>
          
          <div className={`${compact ? 'space-y-1' : 'space-y-2.5'} w-full`}>
            {setA.map((item, idx) => {
              const isSelected = selectedA === idx || draggingA === idx;
              return (
                <div
                  key={idx}
                  ref={(el) => (cardRefsA.current[idx] = el)}
                  style={{ touchAction: 'none' }}
                  onPointerDown={(e) => handlePointerDownA(idx, e)}
                  onClick={(e) => handleNodeClickA(idx, e)}
                  className={`${compact ? 'p-1.5 px-2 rounded-xl min-h-[34px]' : 'p-3 sm:p-3.5 rounded-2xl'} border font-bold transition-all duration-150 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer touch-none select-none ${
                    readOnly
                      ? 'glass-card border-white/60 text-[#2D241E]'
                      : isSelected
                      ? 'bg-[#FDE68A] border-[#2D241E] text-[#2D241E] ring-3 ring-[#F59E0B] scale-102 font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                      : 'glass-card border-white/60 text-[#2D241E] active:scale-98'
                  }`}
                >
                  <span className={`pr-1.5 font-pencil font-bold ${compact ? 'text-xs sm:text-[13px]' : 'text-lg sm:text-xl lg:text-[24px]'} whitespace-normal break-words text-left leading-tight`}>
                    {item}
                  </span>
                  {/* Brass Push-Pin Head Element for Detective Red String Anchor */}
                  <div 
                    ref={(el) => (dotRefsA.current[idx] = el)}
                    title={`Paku Pin ${item}`}
                    className={`${compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-7 h-7 sm:w-8 sm:h-8'} rounded-full border-2 border-[#2D241E] flex-shrink-0 transition-transform duration-150 relative flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.25)] ${
                      isSelected 
                        ? 'bg-gradient-to-br from-red-400 via-red-600 to-red-800 scale-125 ring-2 ring-red-400 shadow-[0_0_10px_rgba(225,29,72,0.7)]' 
                        : connections.some(([a]) => a === idx)
                        ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 ring-2 ring-amber-300'
                        : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 hover:scale-110'
                    }`} 
                  >
                    {/* Metallic Pin Core Specular Highlight */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-xs pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HIMPUNAN B */}
        <div className={`${compact ? 'space-y-1' : 'space-y-2'} text-center flex flex-col items-center w-full`}>
          <div className={`${compact ? 'py-0.5 px-2 text-[11px] sm:text-xs font-black' : 'py-2 px-4 text-lg sm:text-xl lg:text-[22px] font-black'} rounded-xl glass-panel-subtle border border-[#2D241E]/40 text-[#1E40AF] shadow-[0_2px_8px_rgba(0,0,0,0.06)] self-center`}>
            {labelB}
          </div>

          <div className={`${compact ? 'space-y-1' : 'space-y-2.5'} w-full`}>
            {setB.map((item, idx) => {
              const inRange = isRangeNode(idx);
              const isConnected = connections.some(([, b]) => b === idx);
              const isTargetHovered = hoveredTargetB === idx;

              return (
                <div
                  key={idx}
                  ref={(el) => (cardRefsB.current[idx] = el)}
                  style={{ touchAction: 'none' }}
                  onClick={(e) => handleNodeClickB(idx, e)}
                  title={!readOnly && isConnected && selectedA === null ? `Klik untuk memotong hubungan ${item}` : undefined}
                  className={`${compact ? 'p-1.5 px-2 rounded-xl min-h-[34px] space-x-1.5' : 'p-3 sm:p-3.5 rounded-2xl space-x-3'} border font-bold transition-all duration-150 flex items-center justify-start shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer touch-none select-none ${
                    readOnly
                      ? inRange
                        ? 'bg-[#D1FAE5] border-[#2D241E] text-[#065F46]'
                        : 'glass-card border-white/60 text-[#2D241E]'
                      : isTargetHovered
                      ? 'bg-[#E0F2FE] border-[#2D241E] text-[#0369A1] ring-3 ring-[#38BDF8] scale-104 shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                      : 'glass-card border-white/60 text-[#2D241E] active:scale-98'
                  }`}
                >
                  {/* Brass Push-Pin Head Element for Detective Red String Anchor */}
                  <div 
                    ref={(el) => (dotRefsB.current[idx] = el)}
                    title={!readOnly && isConnected && selectedA === null ? `Klik untuk memotong tali ${item}` : `Paku Pin ${item}`}
                    className={`${compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-7 h-7 sm:w-8 sm:h-8'} rounded-full border-2 border-[#2D241E] flex-shrink-0 transition-transform duration-150 relative flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.25)] ${
                      inRange || isConnected 
                        ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-800 ring-2 ring-red-300' 
                        : isTargetHovered 
                        ? 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700 scale-125 ring-2 ring-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]' 
                        : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 hover:scale-110'
                    }`} 
                  >
                    {/* Metallic Pin Core Specular Highlight */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-xs pointer-events-none" />
                  </div>
                  <span className={`pl-1.5 font-pencil font-bold ${compact ? 'text-xs sm:text-[13px]' : 'text-lg sm:text-xl lg:text-[24px]'} whitespace-normal break-words text-left leading-tight`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Helpful Touch & Mouse Instruction Indicator */}
      {!readOnly && !compact && (
        <div className="mt-2 text-center text-xs sm:text-sm font-bold text-[#78350F]/90 bg-amber-100/60 rounded-xl py-1 px-2 border border-amber-300/60">
          💡 Hubungkan: Klik pin A lalu klik pin B (atau tarik benang). Putus: Klik langsung pin B yang sudah terpasang, atau klik tali merahnya.
        </div>
      )}

    </div>
  );
}
