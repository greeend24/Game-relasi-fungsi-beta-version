import React, { useState, useEffect, useRef } from 'react';

/**
 * Leaf Image Renderer by Type Index (10 USER-PROVIDED HD LEAF IMAGES: LEAF 1.png - LEAF 10.png)
 */
const LeafSVG = ({ type, size = 42 }) => {
  const leafNum = (type >= 0 && type <= 9) ? type + 1 : 1;
  return (
    <img
      src={`/images/LEAF ${leafNum}.png`}
      alt={`Leaf ${leafNum}`}
      style={{ width: `${size}px`, height: 'auto' }}
      className="filter drop-shadow-[1px_3px_5px_rgba(45,36,30,0.25)] select-none pointer-events-none object-contain"
    />
  );
};

/**
 * SINGLE UNBROKEN FLEXIBLE WIND LINE STREAMERS COMPONENT
 * - RANDOMIZED STAGGERED SPAWN & RESPAWN TIMINGS (WAKTU MUNCUL RANDOM)
 */
const WindBreeze2D = () => {
  const gustsRef = useRef([
    { id: 1, x: -400, y: 110, speed: 2.1, width: 320, opacity: 0.32, phase: 0, amp: 14, waitFrames: 0 },
    { id: 2, x: -750, y: 230, speed: 2.7, width: 400, opacity: 0.26, phase: 1.5, amp: -18, waitFrames: 70 },
    { id: 3, x: -500, y: 370, speed: 1.8, width: 280, opacity: 0.35, phase: 3.1, amp: 15, waitFrames: 150 },
    { id: 4, x: -900, y: 500, speed: 3.1, width: 440, opacity: 0.22, phase: 4.2, amp: -20, waitFrames: 220 },
    { id: 5, x: -350, y: 630, speed: 2.4, width: 330, opacity: 0.30, phase: 5.5, amp: 16, waitFrames: 100 },
    { id: 6, x: -650, y: 740, speed: 2.0, width: 360, opacity: 0.28, phase: 2.4, amp: -12, waitFrames: 180 }
  ]);

  const timeRef = useRef(0);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    let animId;

    const animateWind = () => {
      const screenW = window.innerWidth || 1200;
      const screenH = window.innerHeight || 800;
      timeRef.current += 1;
      const t = timeRef.current;

      gustsRef.current.forEach((gust) => {
        if (gust.waitFrames > 0) {
          gust.waitFrames -= 1;
          return;
        }

        gust.x += gust.speed;
        gust.waveOffset = Math.sin(t * 0.035 + gust.phase) * gust.amp;

        if (gust.x > screenW + (gust.width + 100)) {
          gust.waitFrames = Math.floor(40 + Math.random() * 180);
          gust.x = -gust.width - 150 - Math.random() * 300;
          gust.y = 60 + Math.random() * (screenH - 120);
          gust.speed = 1.5 + Math.random() * 1.8;
          gust.width = 250 + Math.floor(Math.random() * 180);
          gust.opacity = 0.20 + Math.random() * 0.20;
          gust.amp = (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 10);
          gust.phase = Math.random() * Math.PI * 2;
        }
      });

      setRenderTrigger((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(animateWind);
    };

    animId = requestAnimationFrame(animateWind);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {gustsRef.current.map((gust) => {
        if (gust.waitFrames > 0) return null;

        const w = gust.width;
        const wave = 30 + (gust.waveOffset || 0);

        return (
          <div
            key={gust.id}
            className="absolute pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate3d(${gust.x}px, ${gust.y}px, 0)`,
              willChange: 'transform',
              opacity: gust.opacity
            }}
          >
            <svg width={w + 40} height="60" viewBox={`0 0 ${w + 40} 60`}>
              <defs>
                <linearGradient id={`singleWindGrad-${gust.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="25%" stopColor="#E0F2FE" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d={`M 0 30 Q ${w * 0.5} ${wave} ${w} 30`}
                fill="none"
                stroke={`url(#singleWindGrad-${gust.id})`}
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

/**
 * 60FPS Interactive Leaf Physics Component
 * - EXACTLY 10 LEAVES OF 10 DISTINCT TYPES & COLORS!
 */
const InteractiveBlowingLeaves2D = () => {
  const containerRef = useRef(null);
  const leavesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const clickBurstRef = useRef({ x: -1000, y: -1000, active: false, time: 0 });
  const frameCountRef = useRef(0);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    const numLeaves = 10;
    const initialLeaves = [];
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    const distinctSizes = [32, 36, 40, 44, 48, 52, 56, 60, 64, 68].sort(() => Math.random() - 0.5);

    for (let i = 0; i < numLeaves; i++) {
      initialLeaves.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        baseSpeedX: 0.2 + Math.random() * 0.35, // Relaxed gentle wind drift X (0.2 - 0.55 px/frame)
        baseSpeedY: 0.08 + Math.random() * 0.18,// Gentle slow float Y (0.08 - 0.26 px/frame)
        swayAmp: 0.5 + Math.random() * 0.7,    // Soft subtle sway amplitude
        swayFreq: 0.008 + Math.random() * 0.01, // Slow rhythmic breathing sway
        phase: Math.random() * Math.PI * 2,    // Phase offset
        rotSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.25), // Very gentle tumbling rotation
        rotation: Math.random() * 360,
        vRot: 0,
        type: i,
        size: distinctSizes[i]
      });
    }

    leavesRef.current = initialLeaves;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleClick = (e) => {
      const cx = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
      const cy = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
      
      mouseRef.current.x = cx;
      mouseRef.current.y = cy;
      mouseRef.current.active = true;

      clickBurstRef.current = {
        x: cx,
        y: cy,
        active: true,
        time: Date.now()
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchstart', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, []);

  useEffect(() => {
    let animId;

    const updatePhysics = () => {
      const width = window.innerWidth || 1200;
      const height = window.innerHeight || 800;
      const mouse = mouseRef.current;
      const burst = clickBurstRef.current;

      frameCountRef.current += 1;
      const frame = frameCountRef.current;

      const isBursting = burst.active && (Date.now() - burst.time < 350);

      leavesRef.current.forEach((leaf) => {
        if (isBursting) {
          const bdx = leaf.x - burst.x;
          const bdy = leaf.y - burst.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy) || 1;
          const blastRadius = 380;

          if (bdist < blastRadius) {
            const blastPower = ((blastRadius - bdist) / blastRadius) * 22;
            const bnx = bdx / bdist;
            const bny = bdy / bdist;

            leaf.vx += bnx * blastPower;
            leaf.vy += bny * blastPower;
            leaf.vRot += (Math.random() - 0.5) * 4;
          }
        } 
        else if (mouse.active) {
          const dx = mouse.x - leaf.x;
          const dy = mouse.y - leaf.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 300;

          if (dist < attractionRadius && dist > 15) {
            const pullFactor = (1 - dist / attractionRadius) * 0.45;
            const nx = dx / dist;
            const ny = dy / dist;
            const tangentX = -ny;
            const tangentY = nx;

            leaf.vx += (nx * 0.4 + tangentX * 0.12) * pullFactor;
            leaf.vy += (ny * 0.4 + tangentY * 0.12) * pullFactor;
            leaf.vRot += (Math.random() - 0.5) * 0.5 * pullFactor;
          }
        }

        // Apply friction decay to impulse velocities
        leaf.vx *= 0.92;
        leaf.vy *= 0.92;
        leaf.vRot *= 0.93;

        // Dynamic sine wave sway offset
        const swayX = Math.sin(frame * leaf.swayFreq + leaf.phase) * leaf.swayAmp;
        const swayY = Math.cos(frame * (leaf.swayFreq * 0.7) + leaf.phase) * (leaf.swayAmp * 0.4);

        // Move leaf with continuous wind + sway + impulse velocities
        leaf.x += leaf.baseSpeedX + swayX + leaf.vx;
        leaf.y += leaf.baseSpeedY + swayY + leaf.vy;
        leaf.rotation += leaf.rotSpeed + leaf.vRot;

        // Wrap around screen seamlessly
        if (leaf.x > width + 75) {
          leaf.x = -75;
          leaf.y = Math.random() * (height * 0.9);
        }
        if (leaf.y > height + 75) {
          leaf.y = -75;
          leaf.x = Math.random() * (width * 0.9);
        }
        if (leaf.x < -85) leaf.x = width + 75;
        if (leaf.y < -85) leaf.y = height + 75;
      });

      if (isBursting && Date.now() - burst.time >= 350) {
        burst.active = false;
      }

      setRenderTrigger((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leavesRef.current.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute transition-transform duration-75 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${leaf.x}px, ${leaf.y}px, 0) rotate(${leaf.rotation}deg)`,
            willChange: 'transform'
          }}
        >
          <LeafSVG type={leaf.type} size={leaf.size} />
        </div>
      ))}
    </div>
  );
};

/**
 * EXACT CARTOON FLYING BIRD MATCHING USER REFERENCE IMAGE
 * - Vibrant Yellow Head, Orange Beak, Black Cute Eye, Green Body, Tucked Orange Feet
 * - Arched Feathered Wings Flapping Up & Down Dynamically!
 */
const BirdSVG = ({ species = 0, size = 48 }) => {
  const themes = [
    { head: '#FACC15', body: '#16A34A', wing: '#22C55E', shadow: '#14532D', beak: '#EF4444' }, // Green-Yellow (Reference Image)
    { head: '#38BDF8', body: '#0284C7', wing: '#0EA5E9', shadow: '#0369A1', beak: '#F97316' }, // Blue-Cyan
    { head: '#F472B6', body: '#BE123C', wing: '#E11D48', shadow: '#881337', beak: '#F59E0B' }, // Magenta-Crimson
    { head: '#FBBF24', body: '#D97706', wing: '#F59E0B', shadow: '#78350F', beak: '#DC2626' }, // Amber-Gold
    { head: '#C084FC', body: '#7C3AED', wing: '#9333EA', shadow: '#581C87', beak: '#F97316' }  // Purple-Violet
  ];

  const theme = themes[species % themes.length];

  return (
    <svg width={size * 1.4} height={size * 1.1} viewBox="0 -35 90 95" className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      {/* 1. Long Tail Feathers (Left) */}
      <path
        d="M 28 32 C 18 36, 6 42, 0 46 C 8 42, 16 38, 26 36 Z"
        fill={theme.shadow}
        stroke="#1E293B"
        strokeWidth="1.5"
      />
      <path
        d="M 30 30 C 18 32, 8 38, 2 44 C 12 38, 22 34, 30 32 Z"
        fill={theme.body}
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* 2. Tucked Orange Feet (Bottom) */}
      <path
        d="M 38 42 Q 36 50 34 52 M 40 42 Q 40 50 38 53 M 44 42 Q 44 50 42 52"
        stroke="#F97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3. Background Left Wing (Behind Body) */}
      <g className="animate-cartoon-wing-back origin-[42px_26px]">
        <path
          d="M 42 26 Q 30 -5 18 -18 Q 30 -10 38 -2 Q 42 -10 48 -2 Q 48 10 42 26 Z"
          fill={theme.shadow}
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <path
          d="M 42 26 Q 32 0 22 -10 Q 32 -4 38 4 Q 42 -2 46 4 Q 46 14 42 26 Z"
          fill={theme.wing}
          opacity="0.85"
        />
      </g>

      {/* 4. Main Body & Chest */}
      <path
        d="M 30 30 C 35 24, 45 22, 54 24 C 62 26, 60 36, 52 40 C 42 44, 32 40, 30 30 Z"
        fill={theme.body}
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* 5. Head & Chest */}
      <path
        d="M 50 24 C 54 18, 62 16, 70 20 C 76 23, 75 32, 68 36 C 60 38, 52 34, 50 24 Z"
        fill={theme.head}
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* 6. Beak */}
      <path
        d="M 70 24 L 79 27 L 69 31 Z"
        fill={theme.beak}
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* 7. Cute Eye (Black with glossy white shine) */}
      <circle cx="63" cy="23" r="3.5" fill="#0F172A" />
      <circle cx="64.2" cy="21.8" r="1.2" fill="#FFFFFF" />

      {/* 8. Foreground Right Wing (In Front of Body) */}
      <g className="animate-cartoon-wing-front origin-[44px_28px]">
        <path
          d="M 44 28 Q 30 -8 16 -22 Q 30 -14 38 -4 Q 44 -14 50 -4 Q 50 10 44 28 Z"
          fill={theme.wing}
          stroke="#1E293B"
          strokeWidth="2"
        />
        <path
          d="M 44 28 Q 34 -2 22 12 M 44 28 Q 38 -6 28 -14 M 44 28 Q 42 -10 34 -18"
          stroke="#1E293B"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 44 28 Q 34 -2 24 -12 Q 34 -6 40 2 Q 44 -4 48 2 Q 48 14 44 28 Z"
          fill={theme.head}
          opacity="0.35"
        />
      </g>
    </svg>
  );
};

/**
 * DYNAMIC FLYING BIRDS COMPONENT WITH NATURAL SINE-WAVE FLIGHT UNDULATION
 * - BIRDS FLY LEFT TO RIGHT (L2R) & RIGHT TO LEFT (R2L)
 * - NATURAL VERTICAL SINE BOBBING (WAVEY) AS WINGS FLAP
 */
const FlyingBirds2D = ({ timeMode }) => {
  const birdsRef = useRef([
    { id: 1, x: -100, y: 40, dir: 'L2R', speed: 1.6, species: 0, size: 36, opacity: 0.88 },
    { id: 2, x: 1300, y: 115, dir: 'R2L', speed: 2.0, species: 1, size: 42, opacity: 0.82 },
    { id: 3, x: -400, y: 195, dir: 'L2R', speed: 1.4, species: 2, size: 38, opacity: 0.90 },
    { id: 4, x: 1600, y: 275, dir: 'R2L', speed: 2.3, species: 3, size: 32, opacity: 0.85 },
    { id: 5, x: -700, y: 355, dir: 'L2R', speed: 1.2, species: 4, size: 46, opacity: 0.86 }
  ]);
  const timeRef = useRef(0);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    let animId;

    const animateBirds = () => {
      const width = window.innerWidth || 1200;
      timeRef.current += 0.04;

      birdsRef.current.forEach((bird, idx) => {
        // Natural sine-wave vertical bobbing motion (gliding up and down)
        bird.waveY = Math.sin(timeRef.current * 2.5 + idx * 1.5) * 7;

        if (bird.dir === 'L2R') {
          bird.x += bird.speed;
          if (bird.x > width + 150) {
            bird.x = -150 - Math.random() * 300;
            bird.y = 25 + Math.floor(Math.random() * 360);
          }
        } else {
          bird.x -= bird.speed;
          if (bird.x < -150) {
            bird.x = width + 150 + Math.random() * 300;
            bird.y = 25 + Math.floor(Math.random() * 360);
          }
        }
      });

      setRenderTrigger((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(animateBirds);
    };

    animId = requestAnimationFrame(animateBirds);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {birdsRef.current.map((bird) => (
        <div
          key={bird.id}
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            transform: `translate3d(${bird.x}px, ${bird.y + (bird.waveY || 0)}px, 0) scaleX(${bird.dir === 'R2L' ? -1 : 1})`,
            opacity: bird.opacity,
            willChange: 'transform'
          }}
        >
          <BirdSVG species={bird.species} size={bird.size} />
        </div>
      ))}
    </div>
  );
};

/**
 * WIDELY SPACED SOFT BORDERLESS DRIFTING CLOUDS COMPONENT (NOT CROWDED/DEMPET)
 * - Y Position: randomized 20px - 380px across sky (NEVER AT EQUAL HEIGHTS)
 */
const DynamicClouds = ({ timeMode }) => {
  const cloudsRef = useRef([
    { id: 1, x: -150, y: 25, speed: 0.28, type: 1, blur: 'blur-[3px]', scale: 1.15, opacity: 0.88 },
    { id: 2, x: 280, y: 95, speed: 0.42, type: 2, blur: 'blur-[4px]', scale: 1.35, opacity: 0.82 },
    { id: 3, x: 680, y: 175, speed: 0.35, type: 3, blur: 'blur-[2px]', scale: 1.0, opacity: 0.90 },
    { id: 4, x: 1080, y: 260, speed: 0.48, type: 4, blur: 'blur-[3px]', scale: 1.25, opacity: 0.85 },
    { id: 5, x: -550, y: 345, speed: 0.38, type: 5, blur: 'blur-[4px]', scale: 0.95, opacity: 0.86 }
  ]);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    let animId;

    const animateClouds = () => {
      const width = window.innerWidth || 1200;

      cloudsRef.current.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > width + 400) {
          cloud.x = -400 - Math.random() * 300;
          cloud.y = 20 + Math.floor(Math.random() * 380); // Random Y (20px to 400px)
        }
      });

      setRenderTrigger((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(animateClouds);
    };

    animId = requestAnimationFrame(animateClouds);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {cloudsRef.current.map((cloud) => (
        <div
          key={cloud.id}
          className={`absolute filter ${cloud.blur} pointer-events-none transition-transform duration-75`}
          style={{
            transform: `translate3d(${cloud.x}px, ${cloud.y}px, 0) scale(${cloud.scale})`,
            opacity: cloud.opacity,
            willChange: 'transform'
          }}
        >
          {cloud.type % 3 === 0 && (
            <svg width="320" height="130" viewBox="0 0 320 130">
              <path
                d="M 45 100 Q 15 100 24 65 Q 35 25 80 30 Q 110 5 160 18 Q 205 5 245 30 Q 280 30 280 65 Q 305 100 245 100 Z"
                fill={timeMode === 'night' ? 'rgba(71, 85, 105, 0.75)' : 'rgba(255, 255, 255, 0.88)'}
                stroke="none"
              />
            </svg>
          )}
          {cloud.type % 3 === 1 && (
            <svg width="380" height="120" viewBox="0 0 380 120">
              <path
                d="M 40 90 Q 10 90 20 60 Q 42 18 100 30 Q 150 12 210 24 Q 275 12 330 36 Q 365 38 360 70 Q 375 90 330 90 Z"
                fill={timeMode === 'night' ? 'rgba(51, 65, 85, 0.70)' : 'rgba(255, 255, 255, 0.84)'}
                stroke="none"
              />
            </svg>
          )}
          {cloud.type % 3 === 2 && (
            <svg width="260" height="105" viewBox="0 0 260 105">
              <path
                d="M 35 80 Q 10 80 18 50 Q 30 18 70 24 Q 100 6 140 14 Q 175 6 205 26 Q 230 26 230 52 Q 245 80 205 80 Z"
                fill={timeMode === 'night' ? 'rgba(71, 85, 105, 0.80)' : 'rgba(255, 255, 255, 0.90)'}
                stroke="none"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default function AnimatedBackground() {
  const [timeMode, setTimeMode] = useState('day');

  useEffect(() => {
    const updateTimeMode = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 9) {
        setTimeMode('morning');
      } else if (hour >= 9 && hour < 16) {
        setTimeMode('day');
      } else if (hour >= 16 && hour < 19) {
        setTimeMode('sunset');
      } else {
        setTimeMode('night');
      }
    };

    updateTimeMode();
    const interval = setInterval(updateTimeMode, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50 select-none transition-colors duration-1000">
      
      {/* DYNAMIC SKY GRADIENT */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          timeMode === 'morning'
            ? 'bg-gradient-to-b from-[#FEF08A] via-[#7DD3FC] to-[#FAF7F2]'
            : timeMode === 'day'
            ? 'bg-gradient-to-b from-[#38BDF8] via-[#BAE6FD] to-[#FAF7F2]'
            : timeMode === 'sunset'
            ? 'bg-gradient-to-b from-[#F472B6] via-[#FB923C] to-[#FDE68A]'
            : 'bg-gradient-to-b from-[#0B0F19] via-[#1E1B4B] to-[#1E293B]'
        }`}
      />

      {/* PERFECT ROUND GLOWING SUN WITH MULTI-TIER STEADY STAR-LIKE LIGHT HALO (NO SPIKED RAYS) */}
      {(timeMode === 'morning' || timeMode === 'day') && (
        <div className="absolute top-8 right-16 filter drop-shadow-[0_0_40px_rgba(255,235,59,0.9)] drop-shadow-[0_0_75px_rgba(245,158,11,0.65)] pointer-events-none">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <radialGradient id="roundSunStarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#FFF59D" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#FACC15" stopOpacity="0.80" />
                <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Concentric Layered Glowing Circles (Steady Round Sun + Aura) */}
            <circle cx="75" cy="75" r="70" fill="url(#roundSunStarGlow)" />
            <circle cx="75" cy="75" r="42" fill="#FFF59D" opacity="0.9" />
            <circle cx="75" cy="75" r="30" fill="#FACC15" />
            <circle cx="75" cy="75" r="20" fill="#FFFFFF" opacity="0.95" />
          </svg>
        </div>
      )}

      {timeMode === 'sunset' && (
        <div className="absolute top-24 right-20 filter drop-shadow-[0_0_45px_rgba(249,115,22,0.9)] drop-shadow-[0_0_80px_rgba(234,88,12,0.65)] pointer-events-none">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <radialGradient id="roundSunsetStarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
                <stop offset="35%" stopColor="#FB923C" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#EA580C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C2410C" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="75" cy="75" r="70" fill="url(#roundSunsetStarGlow)" />
            <circle cx="75" cy="75" r="40" fill="#FF8C00" />
            <circle cx="75" cy="75" r="26" fill="#FFE082" opacity="0.9" />
            <circle cx="75" cy="75" r="16" fill="#FFFFFF" opacity="0.95" />
          </svg>
        </div>
      )}

      {timeMode === 'night' && (
        <>
          <div className="absolute top-10 right-20 animate-bounce-slow filter drop-shadow-[0_0_25px_rgba(253,230,138,0.5)]">
            <svg width="75" height="75" viewBox="0 0 100 100">
              <path
                d="M 50 10 A 35 35 0 1 0 90 60 A 40 40 0 1 1 50 10 Z"
                fill="#FDE68A"
              />
            </svg>
          </div>

          {/* STEADY CUSTOM SVG GLOWING LIGHT POINTS (TITIK CAHAYA TETAP, NO FLASHING/DISAPPEARING) */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { top: '8%', left: '12%', size: 14, opacity: 0.9, glow: '#FFFFFF' },
              { top: '14%', left: '28%', size: 10, opacity: 0.75, glow: '#FDE68A' },
              { top: '22%', left: '45%', size: 16, opacity: 0.85, glow: '#BAE6FD' },
              { top: '10%', left: '62%', size: 12, opacity: 0.95, glow: '#FFFFFF' },
              { top: '28%', left: '75%', size: 15, opacity: 0.8, glow: '#FDE68A' },
              { top: '18%', left: '88%', size: 11, opacity: 0.85, glow: '#E0F2FE' },
              { top: '35%', left: '18%', size: 9, opacity: 0.7, glow: '#FFFFFF' },
              { top: '42%', left: '34%', size: 13, opacity: 0.8, glow: '#FDE68A' },
              { top: '38%', left: '55%', size: 11, opacity: 0.75, glow: '#BAE6FD' },
              { top: '48%', left: '82%', size: 14, opacity: 0.85, glow: '#FFFFFF' },
              { top: '5%', left: '38%', size: 10, opacity: 0.8, glow: '#FEF08A' },
              { top: '25%', left: '5%', size: 12, opacity: 0.7, glow: '#FFFFFF' },
              { top: '52%', left: '10%', size: 11, opacity: 0.8, glow: '#E0F2FE' },
              { top: '60%', left: '68%', size: 13, opacity: 0.75, glow: '#FDE68A' },
              { top: '15%', left: '50%', size: 9, opacity: 0.85, glow: '#FFFFFF' }
            ].map((star, i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: star.top, left: star.left, opacity: star.opacity }}
              >
                <svg width={star.size} height={star.size} viewBox="0 0 24 24" className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                  <defs>
                    <radialGradient id={`starPointGrad-${i}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="40%" stopColor={star.glow} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={star.glow} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="12" cy="12" r="10" fill={`url(#starPointGrad-${i})`} />
                  <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 5 DISTINCT BIRD SPECIES FLYING LEFT-TO-RIGHT & RIGHT-TO-LEFT WITH WING FLAPPING */}
      <FlyingBirds2D timeMode={timeMode} />

      {/* WIDELY SPACED SOFT BORDERLESS DRIFTING CLOUDS (NOT DEMPET / CROWDED) */}
      <DynamicClouds timeMode={timeMode} />

      {/* SINGLE UNBROKEN FLEXIBLE WIND LINE STREAMERS (RANDOMIZED SPAWN TIMINGS) */}
      <WindBreeze2D />

      {/* 60FPS INTERACTIVE LEAF PHYSICS - EXACTLY 10 LEAVES OF 10 DISTINCT TYPES & COLORS */}
      <InteractiveBlowingLeaves2D />

    </div>
  );
}
