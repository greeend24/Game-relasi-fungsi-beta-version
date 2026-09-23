import React, { useRef, useState, useCallback } from 'react';
import { audioEngine } from '../services/audioEngine';

/**
 * RelationCartesianCanvas
 * Interactive Cartesian Coordinate Canvas with Detective Glassmorphism Theme.
 * - Enforces STRICT 1:1 Aspect Ratio (unit spacing on X is 100% equal to Y)
 * - Beautiful glassmorphism aesthetic matching the rest of the game
 * - Interactive snap points with 3D detective jewel push-pins
 * - Dynamic projection guide lines (amber to X, royal blue to Y)
 * - Touch-ergonomic hitboxes and responsive scaling
 */
export default function RelationCartesianCanvas({
  minX = 0,
  maxX = 6,
  minY = 0,
  maxY = 6,
  stepX = 1,
  stepY = 1,
  userPoints: propUserPoints,
  points: propPoints,
  onPointToggle: propOnPointToggle,
  onTogglePoint: propOnTogglePoint,
  labelX = 'Sumbu X (Domain)',
  labelY = 'Sumbu Y (Kodomain)',
  xLabels = null,
  yLabels = null,
  highlightPoints = [],
  drawLine = false,
  readOnly: propReadOnly = false,
  disabled: propDisabled = false,
  compact = false,
  showCoordinateBadges = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [hoveredCoord, setHoveredCoord] = useState(null);

  // Normalize flexible props
  const userPoints = propUserPoints || propPoints || [];
  const onPointToggle = propOnPointToggle || propOnTogglePoint;
  const readOnly = Boolean(propReadOnly || propDisabled);

  // Generate grid values
  const xValues = [];
  for (let x = minX; x <= maxX; x += stepX) {
    xValues.push(x);
  }

  const yValues = [];
  for (let y = minY; y <= maxY; y += stepY) {
    yValues.push(y);
  }

  // 1:1 EQUAL UNIT SPACING:
  // Step spacing on X and Y are identical so grid cells are guaranteed square!
  const xSpan = Math.max(1, maxX - minX);
  const ySpan = Math.max(1, maxY - minY);
  const maxSpan = Math.max(xSpan, ySpan);

  // Responsive unit size calculation (unit distance in pixels) - compact & well-proportioned
  const unitSize = compact
    ? Math.max(26, Math.min(36, Math.floor(200 / maxSpan)))
    : Math.max(30, Math.min(42, Math.floor(260 / maxSpan)));

  const hasXLabels = Boolean(xLabels && Object.keys(xLabels).length > 0);
  const hasYLabels = Boolean(yLabels && Object.keys(yLabels).length > 0);

  // Dynamic padding calculation for Y-axis text labels (e.g. "Tabung Reaksi", "Termometer", "Mikroskop")
  // Ensures long words never get clipped or truncated at the left edge of the SVG canvas.
  const yLabelStrings = yLabels
    ? Object.values(yLabels).map((v) => (v !== undefined && v !== null ? String(v).trim() : ''))
    : [];
  const maxStringLengthY = yLabelStrings.reduce((max, s) => Math.max(max, s.length), 0);
  const isCustomTextY = maxStringLengthY > 2;

  const calculatedYTextWidth = isCustomTextY
    ? Math.ceil(maxStringLengthY * (compact ? 7.0 : 7.6)) + (compact ? 22 : 28)
    : 0;

  const defaultPaddingLeft = hasYLabels ? (compact ? 52 : 60) : (compact ? 40 : 48);
  const paddingLeft = Math.max(defaultPaddingLeft, calculatedYTextWidth);

  const paddingRight = compact ? 36 : 44;
  const paddingTop = compact ? 26 : 32;
  const paddingBottom = hasXLabels ? (compact ? 44 : 52) : (compact ? 36 : 44);

  const plotWidth = xSpan * unitSize;
  const plotHeight = ySpan * unitSize;

  const width = plotWidth + paddingLeft + paddingRight;
  const height = plotHeight + paddingTop + paddingBottom;

  // Convert math coordinates (x, y) to SVG canvas coordinates (px, py)
  const toSvgX = useCallback((x) => {
    return paddingLeft + (x - minX) * unitSize;
  }, [minX, unitSize]);

  const toSvgY = useCallback((y) => {
    // Invert Y because SVG y=0 is at the top
    return height - paddingBottom - (y - minY) * unitSize;
  }, [minY, height, paddingBottom, unitSize]);

  const axisOriginX = 0 >= minX && 0 <= maxX ? 0 : minX;
  const axisOriginY = 0 >= minY && 0 <= maxY ? 0 : minY;
  const xOriginSvg = toSvgX(axisOriginX);
  const yOriginSvg = toSvgY(axisOriginY);

  const isPointActive = (x, y) => {
    return userPoints.some(([px, py]) => Number(px) === Number(x) && Number(py) === Number(y));
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
      className={`relative flex flex-col items-center justify-center select-none w-fit max-w-full mx-auto ${className}`}
    >
      {/* Coordinate Canvas Box - Detective Frosted Glass Card (Naturally wraps diagram content) */}
      <div className="relative w-fit min-w-[280px] sm:min-w-[320px] max-w-full h-auto flex flex-col items-center mx-auto rounded-2xl glass-card border border-white/70 shadow-sm p-2 sm:p-2.5">
        
        {/* Top Header Strip with Axis Indicators */}
        <div className="w-full flex items-center justify-between gap-2 pb-1.5 mb-1 border-b border-amber-900/10 text-[10px] sm:text-[11px] font-bold z-10 flex-shrink-0 px-1">
          <span className="text-blue-800 bg-blue-100/90 border border-blue-300/80 px-2 py-0.5 rounded-lg flex items-center gap-1 font-extrabold shadow-xs truncate max-w-[48%]" title={labelY}>
            ↑ {labelY}
          </span>
          <span className="text-amber-900 bg-amber-100/90 border border-amber-300/80 px-2 py-0.5 rounded-lg flex items-center gap-1 font-extrabold shadow-xs truncate max-w-[48%]" title={labelX}>
            → {labelX}
          </span>
        </div>

        {/* SVG Drawing Zone - Scaled cleanly according to natural diagram aspect ratio */}
        <div className="relative w-full flex items-center justify-center py-1">
          {/* Subtle Detective Blueprint Coordinate Grid Watermark Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-xl"
            style={{
              backgroundImage: 'radial-gradient(#78350F 1.2px, transparent 1.2px)',
              backgroundSize: `${unitSize}px ${unitSize}px`,
              backgroundPosition: `${paddingLeft}px ${paddingTop}px`
            }}
          />

          <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className="select-none block"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          >
          <defs>
            {/* Glow drop-shadow filters for plotted pins */}
            <filter id="cartesianPinGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E11D48" floodOpacity="0.45" />
            </filter>
            <filter id="cartesianHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Grid Lines - Vertical (X) */}
          {xValues.map((x) => {
            const sx = toSvgX(x);
            const isHighlighted = userPoints.some(([px]) => Number(px) === x) || (hoveredCoord && hoveredCoord.x === x);
            return (
              <g key={`x-grid-${x}`}>
                <line
                  x1={sx}
                  y1={paddingTop}
                  x2={sx}
                  y2={height - paddingBottom}
                  stroke={isHighlighted ? "rgba(217, 119, 6, 0.45)" : "rgba(120, 53, 15, 0.16)"}
                  strokeWidth={x === 0 ? "2" : "1"}
                  strokeDasharray={x === 0 ? "none" : "3,3"}
                />
                {/* X Axis Label Number / Name */}
                {(() => {
                  const displayX = (xLabels && xLabels[x] !== undefined)
                    ? xLabels[x]
                    : (hasXLabels && x !== 0)
                      ? ''
                      : x;
                  if (displayX === '') return null;
                  const isStringLabel = typeof displayX === 'string' && isNaN(displayX);
                  return (
                    <text
                      x={sx}
                      y={yOriginSvg + (isStringLabel ? (compact ? 13 : 15) : 14)}
                      fill={isHighlighted ? "#D97706" : "#78350F"}
                      fontSize={isStringLabel ? (compact ? "9" : "10") : isHighlighted ? "11" : "10"}
                      fontWeight={isHighlighted ? "900" : "700"}
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {displayX}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Grid Lines - Horizontal (Y) */}
          {yValues.map((y) => {
            const sy = toSvgY(y);
            const isHighlighted = userPoints.some(([, py]) => Number(py) === y) || (hoveredCoord && hoveredCoord.y === y);
            return (
              <g key={`y-grid-${y}`}>
                <line
                  x1={paddingLeft}
                  y1={sy}
                  x2={width - paddingRight}
                  y2={sy}
                  stroke={isHighlighted ? "rgba(37, 99, 235, 0.45)" : "rgba(120, 53, 15, 0.16)"}
                  strokeWidth={y === 0 ? "2" : "1"}
                  strokeDasharray={y === 0 ? "none" : "3,3"}
                />
                {/* Y Axis Label Number / Name */}
                {(() => {
                  const displayY = (yLabels && yLabels[y] !== undefined)
                    ? yLabels[y]
                    : (hasYLabels && y !== 0)
                      ? ''
                      : y;
                  if (displayY === '') return null;
                  const isStringLabel = typeof displayY === 'string' && isNaN(displayY);
                  return (
                    <text
                      x={xOriginSvg - (compact ? 7 : 9)}
                      y={sy + 3.5}
                      fill={isHighlighted ? "#2563EB" : "#78350F"}
                      fontSize={isStringLabel ? (compact ? "9" : "10") : isHighlighted ? "11" : "10"}
                      fontWeight={isHighlighted ? "900" : "700"}
                      textAnchor="end"
                      fontFamily="sans-serif"
                    >
                      {displayY}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Main Coordinate Axes (Solid Dark Lines with Directional Arrows) */}
          {/* X-Axis Line & Arrow */}
          <line
            x1={paddingLeft - 8}
            y1={yOriginSvg}
            x2={width - paddingRight + 12}
            y2={yOriginSvg}
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${width - paddingRight + 16},${yOriginSvg} ${width - paddingRight + 8},${yOriginSvg - 4.5} ${width - paddingRight + 8},${yOriginSvg + 4.5}`}
            fill="#78350F"
          />

          {/* Y-Axis Line & Arrow */}
          <line
            x1={xOriginSvg}
            y1={height - paddingBottom + 8}
            x2={xOriginSvg}
            y2={paddingTop - 12}
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${xOriginSvg},${paddingTop - 16} ${xOriginSvg - 4.5},${paddingTop - 8} ${xOriginSvg + 4.5},${paddingTop - 8}`}
            fill="#78350F"
          />

          {/* Axis Labels (X & Y symbols) */}
          <text
            x={width - paddingRight + 18}
            y={yOriginSvg + 14}
            fill="#D97706"
            fontSize="12"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            X
          </text>
          <text
            x={xOriginSvg - 16}
            y={paddingTop - 10}
            fill="#2563EB"
            fontSize="12"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            Y
          </text>

          {/* GARIS BANTU PROYEKSI: Untuk Semua Titik Aktif Terpasang */}
          {userPoints.map(([px, py], pIdx) => {
            const sx = toSvgX(Number(px));
            const sy = toSvgY(Number(py));

            return (
              <g key={`proj-active-${px}-${py}-${pIdx}`} className="pointer-events-none">
                {/* Garis proyeksi vertikal ke Sumbu X */}
                <line
                  x1={sx}
                  y1={sy}
                  x2={sx}
                  y2={yOriginSvg}
                  stroke="#D97706"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                  opacity="0.85"
                />
                {/* Garis proyeksi horizontal ke Sumbu Y */}
                <line
                  x1={sx}
                  y1={sy}
                  x2={xOriginSvg}
                  y2={sy}
                  stroke="#2563EB"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                  opacity="0.85"
                />
                {/* Titik kaki proyeksi pada Sumbu X */}
                <circle cx={sx} cy={yOriginSvg} r="3.5" fill="#D97706" stroke="#FEF3C7" strokeWidth="1.2" />
                {/* Titik kaki proyeksi pada Sumbu Y */}
                <circle cx={xOriginSvg} cy={sy} r="3.5" fill="#2563EB" stroke="#DBEAFE" strokeWidth="1.2" />
              </g>
            );
          })}

          {/* GARIS BANTU PROYEKSI: Preview Saat Hover Titik Kosong */}
          {hoveredCoord && !isPointActive(hoveredCoord.x, hoveredCoord.y) && !readOnly && (() => {
            const sx = toSvgX(hoveredCoord.x);
            const sy = toSvgY(hoveredCoord.y);

            return (
              <g key="proj-hover-preview" className="pointer-events-none">
                <line
                  x1={sx}
                  y1={sy}
                  x2={sx}
                  y2={yOriginSvg}
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="3,2"
                  opacity="0.75"
                />
                <line
                  x1={sx}
                  y1={sy}
                  x2={xOriginSvg}
                  y2={sy}
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="3,2"
                  opacity="0.75"
                />
                <circle cx={sx} cy={yOriginSvg} r="2.8" fill="#F59E0B" opacity="0.9" />
                <circle cx={xOriginSvg} cy={sy} r="2.8" fill="#38BDF8" opacity="0.9" />
              </g>
            );
          })()}

          {/* Optional Connecting Line (for Chapter 4 or multi-points) */}
          {drawLine && linePathD && (
            <path
              d={linePathD}
              fill="none"
              stroke="#E11D48"
              strokeWidth="2.8"
              strokeDasharray="5,3"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(225,29,72,0.4))' }}
            />
          )}

          {/* GRID INTERSECTIONS & USER EVIDENCE PINS */}
          {xValues.map((x) =>
            yValues.map((y) => {
              const sx = toSvgX(x);
              const sy = toSvgY(y);
              const active = isPointActive(x, y);
              const isHovered = hoveredCoord?.x === x && hoveredCoord?.y === y;

              return (
                <g key={`node-${x}-${y}`}>
                  {/* Visual Snap Point Dot Saat Hover di Perpotongan Kisi */}
                  {isHovered && !active && !readOnly && (
                    <g className="pointer-events-none">
                      <circle
                        cx={sx}
                        cy={sy}
                        r="5.5"
                        fill="#F59E0B"
                        stroke="#FEF3C7"
                        strokeWidth="1.5"
                        className="transition-all duration-150"
                      />
                    </g>
                  )}

                  {/* Pulsing Aura Saat Hover Pada Titik Kosong */}
                  {isHovered && !active && !readOnly && (
                    <g className="pointer-events-none">
                      <circle
                        cx={sx}
                        cy={sy}
                        r="11"
                        fill="#F59E0B"
                        opacity="0.3"
                        className="animate-ping"
                      />
                      {/* Hover Tooltip Coordinate Preview Badge */}
                      <g transform={`translate(${sx}, ${sy < paddingTop + 24 ? sy + 18 : sy - 14})`}>
                        <rect
                          x="-17"
                          y="-12"
                          width="34"
                          height="15"
                          rx="5"
                          fill="#78350F"
                          fillOpacity="0.9"
                          stroke="#FEF3C7"
                          strokeWidth="0.8"
                        />
                        <text
                          x="0"
                          y="-1.5"
                          fill="#FEF3C7"
                          fontSize="9"
                          fontWeight="800"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          ({x},{y})
                        </text>
                      </g>
                    </g>
                  )}

                  {/* TITIK TERPASANG (Active Evidence Pin) */}
                  {active && (
                    <g
                      filter="url(#cartesianPinGlow)"
                      className="pointer-events-none"
                    >
                      {/* Outer pulsing ruby halo */}
                      <circle
                        cx={sx}
                        cy={sy}
                        r="12"
                        fill="#E11D48"
                        opacity="0.28"
                        className="animate-pulse"
                      />
                      {/* 3D Push-Pin Core */}
                      <circle
                        cx={sx}
                        cy={sy}
                        r="6.5"
                        fill="#E11D48"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      {/* Metallic Specular Core Highlight */}
                      <circle
                        cx={sx - 1.5}
                        cy={sy - 1.5}
                        r="2"
                        fill="#FECDD3"
                      />

                      {/* Coordinate Tag Tooltip Badge (Optional, default hidden) */}
                      {showCoordinateBadges && (
                        <g transform={`translate(${sx}, ${sy < paddingTop + 24 ? sy + 18 : sy - 14})`}>
                          <rect
                            x="-18"
                            y="-13"
                            width="36"
                            height="16"
                            rx="6"
                            fill="#2D241E"
                            fillOpacity="0.92"
                            stroke="rgba(255, 255, 255, 0.75)"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="-1.5"
                            fill="#FEF3C7"
                            fontSize="9.5"
                            fontWeight="900"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                          >
                            ({x},{y})
                          </text>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Ergonomic Invisible Hit Target for Touch / Click */}
                  <circle
                    cx={sx}
                    cy={sy}
                    r={Math.max(16, unitSize * 0.45)}
                    fill="transparent"
                    className={readOnly ? "cursor-default" : "cursor-pointer"}
                    onMouseEnter={() => !readOnly && setHoveredCoord({ x, y })}
                    onMouseLeave={() => !readOnly && setHoveredCoord(null)}
                    onClick={() => handleIntersectionClick(x, y)}
                  />
                </g>
              );
            })
          )}
          </svg>
        </div>

        {/* Bottom Status / Legend */}
        <div className="w-full flex items-center justify-end pt-1 mt-0.5 border-t border-amber-900/10 text-[10px] text-[#78350F] font-bold z-10 flex-shrink-0 px-2">
          <span className="flex items-center gap-1.5 text-[#E11D48] font-black whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] border border-white" /> Terpasang ({userPoints.length})
          </span>
        </div>
      </div>
    </div>
  );
}
