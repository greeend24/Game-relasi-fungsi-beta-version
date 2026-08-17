import React, { useRef, useState, useEffect } from 'react';

/**
 * RelationDiagramCanvas
 * Renders set columns A (Domain) and B (Kodomain) enclosed within unified oval set containers,
 * with organic, lively curved SVG arrow threads.
 * Supports BOTH 2-click selection AND hold-and-drag thread line connecting!
 */
export default function RelationDiagramCanvas({
  setA = [],
  setB = [],
  connections = [], // array of [indexA, indexB]
  selectedA = null,
  onSelectA,
  onSelectB,
  labelA = 'Himpunan A',
  labelB = 'Himpunan B',
  highlightRange = false,
  readOnly = false
}) {
  const containerRef = useRef(null);
  const nodeRefsA = useRef([]);
  const nodeRefsB = useRef([]);
  const [coords, setCoords] = useState([]);
  
  // Drag State for Hold-and-Drag thread line
  const [draggingA, setDraggingA] = useState(null);
  const [dragMousePos, setDragMousePos] = useState(null);

  // Calculate SVG line paths dynamically based on node coordinates
  const updateCoords = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newCoords = connections.map(([idxA, idxB]) => {
      const elA = nodeRefsA.current[idxA];
      const elB = nodeRefsB.current[idxB];

      if (!elA || !elB) return null;

      const rectA = elA.getBoundingClientRect();
      const rectB = elB.getBoundingClientRect();

      const x1 = rectA.right - containerRect.left;
      const y1 = rectA.top + rectA.height / 2 - containerRect.top;

      const x2 = rectB.left - containerRect.left;
      const y2 = rectB.top + rectB.height / 2 - containerRect.top;

      return { x1, y1, x2, y2, idxA, idxB };
    }).filter(Boolean);

    setCoords(newCoords);
  };

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords, true);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [setA, setB, connections]);

  useEffect(() => {
    const timer = setTimeout(updateCoords, 50);
    return () => clearTimeout(timer);
  });

  const isRangeNode = (idxB) => {
    if (!highlightRange) return false;
    return connections.some(([, b]) => b === idxB);
  };

  // Hold-and-Drag Mouse & Touch Handler
  const handleNodeMouseDownA = (idxA, e) => {
    if (readOnly) return;
    setDraggingA(idxA);
    onSelectA?.(idxA);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      setDragMousePos({
        x: clientX - containerRect.left,
        y: clientY - containerRect.top
      });
    }
  };

  const handleGlobalMouseMove = (e) => {
    if (draggingA === null || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    setDragMousePos({
      x: clientX - containerRect.left,
      y: clientY - containerRect.top
    });
  };

  const handleGlobalMouseUp = (e) => {
    if (draggingA === null) return;

    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
    const clientY = e.clientY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0);

    // Find node B element under release coordinates
    let targetIdxB = null;
    nodeRefsB.current.forEach((el, idx) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
          targetIdxB = idx;
        }
      }
    });

    if (targetIdxB !== null && !readOnly) {
      onSelectB?.(targetIdxB);
    }

    setDraggingA(null);
    setDragMousePos(null);
  };

  useEffect(() => {
    if (draggingA !== null) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalMouseMove);
      window.addEventListener('touchend', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchmove', handleGlobalMouseMove);
        window.removeEventListener('touchend', handleGlobalMouseUp);
      };
    }
  }, [draggingA]);

  // Dynamic preview line coordinates when dragging
  const getDragLineCoords = () => {
    if (draggingA === null || !dragMousePos || !containerRef.current) return null;
    const elA = nodeRefsA.current[draggingA];
    if (!elA) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const rectA = elA.getBoundingClientRect();
    const x1 = rectA.right - containerRect.left;
    const y1 = rectA.top + rectA.height / 2 - containerRect.top;

    return { x1, y1, x2: dragMousePos.x, y2: dragMousePos.y };
  };

  const dragLine = getDragLineCoords();

  return (
    <div ref={containerRef} className="relative w-full p-5 sm:p-7 rounded-3xl bg-[#FAF7F2] border-3 border-[#2D241E] shadow-[5px_6px_0px_#2D241E] select-none font-hand text-base">
      
      {/* SVG Lively Curved Arrow Thread Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <defs>
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
          const curveOffset = ((i % 2 === 0 ? 1 : -1) * 18);
          const pathD = `M ${c.x1} ${c.y1} C ${c.x1 + dx} ${c.y1 + curveOffset}, ${c.x2 - dx} ${c.y2 - curveOffset}, ${c.x2} ${c.y2}`;

          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none"
                stroke="#2D241E"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d={pathD}
                fill="none"
                stroke="#E11D48"
                strokeWidth="4"
                strokeLinecap="round"
                markerEnd="url(#pencilArrow)"
              />
            </g>
          );
        })}

        {/* Live Dragging Thread Line Preview */}
        {dragLine && (
          <g>
            <line
              x1={dragLine.x1}
              y1={dragLine.y1}
              x2={dragLine.x2}
              y2={dragLine.y2}
              stroke="#2D241E"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1={dragLine.x1}
              y1={dragLine.y1}
              x2={dragLine.x2}
              y2={dragLine.y2}
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="6 4"
              strokeLinecap="round"
              markerEnd="url(#pencilArrow)"
            />
          </g>
        )}
      </svg>

      {/* Two Columns Grid with UNIFIED OVAL CONTAINER for Himpunan A and B */}
      <div className="grid grid-cols-2 gap-6 sm:gap-12 relative z-10">
        
        {/* HIMPUNAN A: SINGLE UNIFIED OVAL CONTAINER */}
        <div className="rounded-[36px] p-5 bg-[#FEF3C7] border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E] space-y-3.5 text-center">
          <div className="py-2 px-3.5 rounded-xl bg-white border-2 border-[#2D241E] text-[#78350F] font-extrabold text-sm sm:text-base shadow-[1px_2px_0px_#2D241E]">
            {labelA}
          </div>
          
          <div className="space-y-2.5">
            {setA.map((item, idx) => {
              const isSelected = selectedA === idx || draggingA === idx;
              return (
                <div
                  key={idx}
                  ref={(el) => (nodeRefsA.current[idx] = el)}
                  onMouseDown={(e) => handleNodeMouseDownA(idx, e)}
                  onTouchStart={(e) => handleNodeMouseDownA(idx, e)}
                  onClick={() => !readOnly && onSelectA?.(idx)}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2.5 font-extrabold text-sm sm:text-base transition-all duration-150 flex items-center justify-between shadow-[2px_3px_0px_#2D241E] cursor-pointer ${
                    readOnly
                      ? 'bg-white border-[#2D241E] text-[#2D241E]'
                      : isSelected
                      ? 'bg-[#FDE68A] border-[#2D241E] text-[#2D241E] ring-4 ring-[#F59E0B]/60 scale-105'
                      : 'bg-white border-[#2D241E] text-[#2D241E] hover:bg-[#FFFDF9]'
                  }`}
                >
                  <span className="truncate pr-2 font-pencil text-sm sm:text-base">{item}</span>
                  <div className={`w-5 h-5 rounded-full border-2 border-[#2D241E] flex-shrink-0 transition-transform ${isSelected ? 'bg-[#D97706] scale-125' : 'bg-[#EFECE6]'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* HIMPUNAN B: SINGLE UNIFIED OVAL CONTAINER */}
        <div className="rounded-[36px] p-5 bg-[#DBEAFE] border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E] space-y-3.5 text-center">
          <div className="py-2 px-3.5 rounded-xl bg-white border-2 border-[#2D241E] text-[#1E40AF] font-extrabold text-sm sm:text-base shadow-[1px_2px_0px_#2D241E]">
            {labelB}
          </div>

          <div className="space-y-2.5">
            {setB.map((item, idx) => {
              const inRange = isRangeNode(idx);
              return (
                <div
                  key={idx}
                  ref={(el) => (nodeRefsB.current[idx] = el)}
                  onClick={() => !readOnly && onSelectB?.(idx)}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2.5 font-extrabold text-sm sm:text-base transition-all duration-150 flex items-center justify-start space-x-2.5 shadow-[2px_3px_0px_#2D241E] cursor-pointer ${
                    readOnly
                      ? inRange
                        ? 'bg-[#D1FAE5] border-[#2D241E] text-[#065F46]'
                        : 'bg-white border-[#2D241E] text-[#2D241E]'
                      : 'bg-white border-[#2D241E] text-[#2D241E] hover:bg-[#E0F2FE]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 border-[#2D241E] flex-shrink-0 ${inRange ? 'bg-[#059669]' : 'bg-[#EFECE6]'}`} />
                  <span className="truncate pl-1 font-pencil text-sm sm:text-base">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
