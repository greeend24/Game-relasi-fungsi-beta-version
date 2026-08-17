import React from 'react';

/**
 * DetectiveMascot ("Detektif Relo")
 * Animated Cyber-Detective Owl Mascot with visor, detective hat, magnifying glass,
 * floating hover animations, and dynamic expressions ('idle', 'happy', 'error', 'thinking', 'boss').
 */
export default function DetectiveMascot({ emotion = 'idle', message = '', size = 'md', className = '' }) {
  // Size classes
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40'
  };

  // Visor / Eye colors based on emotion
  const getVisorColor = () => {
    switch (emotion) {
      case 'happy': return '#00ff88'; // Emerald green
      case 'error': return '#ff0055'; // Crimson red
      case 'thinking': return '#ffea00'; // Neon yellow
      case 'boss': return '#ffaa00'; // Amber gold
      default: return '#00f0ff'; // Cyber cyan
    }
  };

  const visorColor = getVisorColor();

  return (
    <div className={`relative flex items-center space-x-3 select-none ${className}`}>
      
      {/* Animated Mascot SVG Body */}
      <div className={`relative flex-shrink-0 ${sizeMap[size] || sizeMap.md} animate-bounce-slow transition-transform duration-300 hover:scale-110`}>
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
          
          {/* Outer Cyber Aura Glow */}
          <circle cx="60" cy="65" r="45" fill="none" stroke={visorColor} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" className="animate-spin-slow" />
          
          {/* Owl Body */}
          <ellipse cx="60" cy="70" rx="35" ry="38" fill="#121824" stroke="#1e293b" strokeWidth="3" />

          {/* Detective Coat / Collar */}
          <path d="M 38 85 L 60 70 L 82 85 L 60 105 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <path d="M 60 75 L 60 102" stroke="#ffea00" strokeWidth="2" strokeDasharray="2 2" />

          {/* Cyber HUD Visor Eyes */}
          <rect x="35" y="45" width="50" height="20" rx="10" fill="#090d16" stroke={visorColor} strokeWidth="2.5" />
          
          {/* Expression Eyes Inside Visor */}
          {emotion === 'happy' && (
            <g fill="none" stroke={visorColor} strokeWidth="3" strokeLinecap="round">
              <path d="M 43 55 Q 48 48 53 55" />
              <path d="M 67 55 Q 72 48 77 55" />
            </g>
          )}

          {emotion === 'error' && (
            <g stroke={visorColor} strokeWidth="3" strokeLinecap="round">
              <path d="M 43 50 L 53 60 M 53 50 L 43 60" />
              <path d="M 67 50 L 77 60 M 77 50 L 67 60" />
            </g>
          )}

          {emotion === 'thinking' && (
            <g fill={visorColor}>
              <circle cx="48" cy="55" r="4" />
              <circle cx="72" cy="52" r="5" />
            </g>
          )}

          {(emotion === 'idle' || emotion === 'boss') && (
            <g fill={visorColor}>
              <circle cx="48" cy="55" r="4.5" className="animate-pulse" />
              <circle cx="72" cy="55" r="4.5" className="animate-pulse" />
            </g>
          )}

          {/* Beak */}
          <polygon points="60,62 55,69 65,69" fill="#ffea00" />

          {/* Detective Fedora Hat */}
          <ellipse cx="60" cy="38" rx="42" ry="7" fill="#0f172a" stroke="#475569" strokeWidth="2" />
          <path d="M 38 38 Q 42 16 60 16 Q 78 16 82 38 Z" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />
          <rect x="40" y="32" width="40" height="4" fill="#00f0ff" opacity="0.8" />

          {/* Magnifying Glass Tool */}
          <g transform="translate(78, 62) rotate(-20)">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#00f0ff" strokeWidth="3" />
            <line x1="19" y1="19" x2="30" y2="30" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <circle cx="10" cy="10" r="3" fill="#ffffff" opacity="0.6" />
          </g>

        </svg>
      </div>

      {/* Speech Bubble Dialog */}
      {message && (
        <div className="relative p-3.5 rounded-2xl glass-panel border border-cyan-500/30 font-mono text-xs text-slate-100 shadow-xl max-w-xs sm:max-w-sm animate-fade-in">
          {/* Arrow Pointer */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-cyan-500/40 border-b-8 border-b-transparent" />
          
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-cyan-400 mb-1">
            <span>DETEKTIF RELO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <p className="font-sans leading-relaxed text-slate-200 font-semibold">{message}</p>
        </div>
      )}

    </div>
  );
}
