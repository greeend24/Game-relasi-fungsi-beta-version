import React, { useRef, useState, useCallback } from 'react';
import { audioEngine } from '../services/audioEngine';

/**
 * RelationCartesianCanvas
 * Interactive Cartesian Coordinate Canvas with Detective Blueprint / Blackboard theme.
 * Allows students to click/tap on coordinate intersections to place/remove evidence pins (x, y).
 * Supports both standalone point plotting (Chapter 1) and optional connected line plotting (Chapter 4).
 * Fully responsive and supports CSS transform scaling (--game-scale).
 */
export default function RelationCartesianCanvas({
  minX = 0,
  maxX = 6,
  minY = 0,
  maxY = 6,
  stepX = 1,
  stepY = 1,
  userPoints = [], // Array of [x, y]
  onPointToggle, // (x, y) => void
  labelX = 'Sumbu X (Domain)',
  labelY = 'Sumbu Y (Kodomain)',
  highlightPoints = [], // Array of [x, y] to draw as guide or confirmed
  drawLine = false, // If true, connects points in order with a sleek dashed/solid line
  readOnly = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [hoveredCoord, setHoveredCoord] = useState(null);

  // Generate grid values
  const xValues = [];
  for (let x = minX; x <= maxX; x += stepX) {
    xValues.push(x);
  }

  const yValues = [];
  for (let y = minY; y <= maxY; y += stepY) {
    yValues.push(y);
  }

  // Padding inside the SVG coordinate system
  const paddingLeft = 45;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 40;

  const width = 460;
  const height = 300;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Convert math (x, y) to SVG (px, py)
  const toSvgX = useCallback((x) => {
    return paddingLeft + ((x - minX) / (maxX - minX)) * plotWidth;
  }, [minX, maxX, plotWidth]);

  const toSvgY = useCallback((y) => {
    // Invert Y because SVG y=0 is at the top
    return height - paddingBottom - ((y - minY) / (maxY - minY)) * plotHeight;
  }, [minY, maxY, plotHeight]);

  const isPointActive = (x, y) => {
    return userPoints.some(([px, py]) => px === x && py === y);
  };

  const handleIntersectionClick = (x, y) => {
    if (readOnly) return;
    try {
      audioEngine.playClick?.();
    } catch {}
    if (onPointToggle) {
      onPointToggle(x, y);
    }
  };

  // Sort user points by X for line drawing if enabled
  const sortedPoints = [...userPoints].sort((a, b) => a[0] - b[0]);
  const linePathD = sortedPoints.length > 1
    ? sortedPoints.reduce((acc, [px, py], idx) => {
        const sx = toSvgX(px);
        const sy = toSvgY(py);
        return idx === 0 ? `M ${sx} ${sy}` : `${acc} L ${sx} ${sy}`;
      }, '')
    : '';

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center select-none ${className}`}
    >
      {/* Coordinate Canvas Box */}
      <div className="relative w-full max-w-[500px] aspect-[16/10] bg-[#1E293B]/90 backdrop-blur-md rounded-2xl border-2 border-[#334155] shadow-[0_8px_24px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center p-1 sm:p-2">
        
        {/* Subtle Blueprint Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Glow filter for plotted points */}
            <filter id="cartesianGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.8" />
            </filter>
            <filter id="pointPulse" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Grid Lines - Vertical (X) */}
          {xValues.map((x) => {
            const sx = toSvgX(x);
            return (
              <g key={`x-grid-${x}`}>
                <line
                  x1={sx}
                  y1={paddingTop}
                  x2={sx}
                  y2={height - paddingBottom}
                  stroke="#334155"
                  strokeWidth={x === 0 ? "2" : "1"}
                  strokeDasharray={x === 0 ? "none" : "3,3"}
                />
                {/* X Axis Label Number */}
                <text
                  x={sx}
                  y={height - paddingBottom + 16}
                  fill={x === 0 ? "#94A3B8" : "#CBD5E1"}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {x}
                </text>
              </g>
            );
          })}

          {/* Grid Lines - Horizontal (Y) */}
          {yValues.map((y) => {
            const sy = toSvgY(y);
            return (
              <g key={`y-grid-${y}`}>
                <line
                  x1={paddingLeft}
                  y1={sy}
                  x2={width - paddingRight}
                  y2={sy}
                  stroke="#334155"
                  strokeWidth={y === 0 ? "2" : "1"}
                  strokeDasharray={y === 0 ? "none" : "3,3"}
                />
                {/* Y Axis Label Number */}
                <text
                  x={paddingLeft - 10}
                  y={sy + 4}
                  fill={y === 0 ? "#94A3B8" : "#CBD5E1"}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="end"
                  fontFamily="sans-serif"
                >
                  {y}
                </text>
              </g>
            );
          })}

          {/* Main Coordinate Axes (Bold Lines with Arrows) */}
          {/* X-Axis */}
          <line
            x1={paddingLeft - 8}
            y1={toSvgY(0 >= minY ? 0 : minY)}
            x2={width - paddingRight + 12}
            y2={toSvgY(0 >= minY ? 0 : minY)}
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${width - paddingRight + 16},${toSvgY(0 >= minY ? 0 : minY)} ${width - paddingRight + 10},${toSvgY(0 >= minY ? 0 : minY) - 4} ${width - paddingRight + 10},${toSvgY(0 >= minY ? 0 : minY) + 4}`}
            fill="#94A3B8"
          />

          {/* Y-Axis */}
          <line
            x1={toSvgX(0 >= minX ? 0 : minX)}
            y1={height - paddingBottom + 8}
            x2={toSvgX(0 >= minX ? 0 : minX)}
            y2={paddingTop - 12}
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${toSvgX(0 >= minX ? 0 : minX)},${paddingTop - 16} ${toSvgX(0 >= minX ? 0 : minX) - 4},${paddingTop - 10} ${toSvgX(0 >= minX ? 0 : minX) + 4},${paddingTop - 10}`}
            fill="#94A3B8"
          />

          {/* Axis Labels Text */}
          <text
            x={width - paddingRight + 18}
            y={toSvgY(0 >= minY ? 0 : minY) + 14}
            fill="#F59E0B"
            fontSize="11"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            X
          </text>
          <text
            x={toSvgX(0 >= minX ? 0 : minX) - 14}
            y={paddingTop - 10}
            fill="#38BDF8"
            fontSize="11"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            Y
          </text>

          {/* Optional Connecting Line (for Chapter 4 or multi-points) */}
          {drawLine && linePathD && (
            <path
              d={linePathD}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="4,3"
              className="animate-pulse"
            />
          )}

          {/* Interactive Click Target Circles at each Grid Intersection */}
          {xValues.map((x) =>
            yValues.map((y) => {
              const sx = toSvgX(x);
              const sy = toSvgY(y);
              const active = isPointActive(x, y);
              const isHovered = hoveredCoord?.x === x && hoveredCoord?.y === y;

              return (
                <g key={`target-${x}-${y}`}>
                  {/* Invisible enlarged hit target for easy tapping on mobile */}
                  <circle
                    cx={sx}
                    cy={sy}
                    r="15"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCoord({ x, y })}
                    onMouseLeave={() => setHoveredCoord(null)}
                    onClick={() => handleIntersectionClick(x, y)}
                  />

                  {/* Hover indicator dot */}
                  {isHovered && !active && !readOnly && (
                    <circle
                      cx={sx}
                      cy={sy}
                      r="6"
                      fill="#F59E0B"
                      opacity="0.4"
                      className="pointer-events-none transition-all duration-150 animate-ping"
                    />
                  )}

                  {/* Plotted Active Point */}
                  {active && (
                    <g
                      className="cursor-pointer transition-transform duration-200"
                      onClick={() => handleIntersectionClick(x, y)}
                      filter="url(#cartesianGlow)"
                    >
                      {/* Outer animated halo */}
                      <circle
                        cx={sx}
                        cy={sy}
                        r="10"
                        fill="#F59E0B"
                        opacity="0.25"
                        className="animate-pulse"
                      />
                      {/* Solid marker pin */}
                      <circle
                        cx={sx}
                        cy={sy}
                        r="5.5"
                        fill="#F59E0B"
                        stroke="#FEF3C7"
                        strokeWidth="2"
                      />

                      {/* Coordinate Tag Tooltip badge */}
                      <g transform={`translate(${sx}, ${sy - 14})`}>
                        <rect
                          x="-18"
                          y="-13"
                          width="36"
                          height="14"
                          rx="4"
                          fill="#0F172A"
                          stroke="#F59E0B"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="-3"
                          fill="#FEF3C7"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          ({x},{y})
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              );
            })
          )}
        </svg>

        {/* Bottom Legend */}
        <div className="absolute bottom-1 right-3 flex items-center gap-3 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Titik Terplot ({userPoints.length})
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Klik titik pertemuan untuk pasang/hapus</span>
        </div>
      </div>

      {/* Axis Titles */}
      <div className="flex items-center justify-between w-full max-w-[500px] px-2 mt-1 text-xs font-bold">
        <span className="text-[#38BDF8] flex items-center gap-1">
          ↑ {labelY}
        </span>
        <span className="text-[#F59E0B] flex items-center gap-1">
          → {labelX}
        </span>
      </div>
    </div>
  );
}
