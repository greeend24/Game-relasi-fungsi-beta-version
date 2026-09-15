import React, { useState, useEffect, useMemo, useRef, memo } from 'react';

/**
 * Snowflake Images (9 distinct assets from /snowflake/)
 */
const SNOWFLAKE_IMAGES = [
  '/snowflake/Asset 29@4x.png',
  '/snowflake/Asset 30@4x.png',
  '/snowflake/Asset 31@4x.png',
  '/snowflake/Asset 32@4x.png',
  '/snowflake/Asset 33@4x.png',
  '/snowflake/Asset 34@4x.png',
  '/snowflake/Asset 35@4x.png',
  '/snowflake/Asset 36@4x.png',
  '/snowflake/Asset 37@4x.png'
];

/**
 * Glowing Magma Embers & Fire Sparks for Endless Mode (Ryu's Volcanic Theme)
 */
const EmberSVG = memo(({ type = 0, size = 32 }) => {
  const emberType = (type >= 0 ? type : 0) % 6;

  if (emberType === 0) {
    return (
      <svg width={size} height={size * 1.25} viewBox="0 0 32 40" className="overflow-visible select-none pointer-events-none">
        <defs>
          <radialGradient id={`emberGrad0-${type}`} cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </radialGradient>
        </defs>
        <path d="M16 2 C18 10 28 18 28 26 C28 34 22 38 16 38 C10 38 4 34 4 26 C4 18 14 10 16 2 Z" fill={`url(#emberGrad0-${type})`} />
      </svg>
    );
  }

  if (emberType === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" className="overflow-visible select-none pointer-events-none">
        <defs>
          <radialGradient id={`emberGrad1-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FDE047" />
            <stop offset="75%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#B91C1C" />
          </radialGradient>
        </defs>
        <path d="M18 0 Q18 18 36 18 Q18 18 18 36 Q18 18 0 18 Q18 18 18 0 Z" fill={`url(#emberGrad1-${type})`} />
        <circle cx="18" cy="18" r="3.5" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className="overflow-visible select-none pointer-events-none">
      <defs>
        <radialGradient id={`emberGrad4-${type}`} cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="65%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill={`url(#emberGrad4-${type})`} />
      <circle cx="13" cy="13" r="4" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
});

/**
 * Particle Image Renderer (Leaf, Snowflake, or Magma Ember)
 */
const FloatingParticle = memo(({ particleType = 'leaf', type, size = 36 }) => {
  if (particleType === 'snowflake') {
    const src = SNOWFLAKE_IMAGES[((type >= 0 ? type : 0) % SNOWFLAKE_IMAGES.length)];
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ width: `${size}px`, height: 'auto' }}
        className="select-none pointer-events-none object-contain opacity-90 drop-shadow-sm"
      />
    );
  }

  if (particleType === 'ember' || particleType === 'fire') {
    return <EmberSVG type={type} size={size} />;
  }

  const leafNum = ((type >= 0 ? type : 0) % 10) + 1;
  return (
    <img
      src={`/images/LEAF ${leafNum}.png`}
      alt=""
      loading="lazy"
      decoding="async"
      style={{ width: `${size}px`, height: 'auto' }}
      className="select-none pointer-events-none object-contain drop-shadow-sm opacity-90"
    />
  );
});

/**
 * 60FPS Interactive Floating Particles (Leaves, Snowflakes, Embers)
 * - DIRECT DOM TRANSFORM MUTATIONS (0% REACT RE-RENDER LAG)
 * - Floating, undulating, and tumbling in the breeze ("melayang kea dulu")
 * - Interactive mouse repulsion & click bursts
 */
const createInitialParticles = (particleType) => {
  const numParticles = 8;
  const initialParticles = [];
  const width = typeof window !== 'undefined' ? window.innerWidth || 1200 : 1200;
  const height = typeof window !== 'undefined' ? window.innerHeight || 800 : 800;
  const distinctSizes = [32, 38, 44, 50, 36, 42, 46, 52];

  for (let i = 0; i < numParticles; i++) {
    const isLeaf = particleType === 'leaf';
    const isEmber = particleType === 'ember' || particleType === 'fire';

    initialParticles.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * (height * 0.9),
      vx: 0,
      vy: 0,
      // Base drift speeds: leaves float horizontally across to the right; embers float up; snow drifts down
      baseSpeedX: isLeaf ? 0.35 + Math.random() * 0.45 : isEmber ? 0.15 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3,
      baseSpeedY: isLeaf ? (Math.random() - 0.5) * 0.15 : isEmber ? -(0.55 + Math.random() * 0.6) : 0.45 + Math.random() * 0.4,
      swayAmp: isLeaf ? 0.9 + Math.random() * 0.8 : 0.4 + Math.random() * 0.5,
      swayFreq: 0.01 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.35),
      rotation: Math.random() * 360,
      vRot: 0,
      type: i,
      size: distinctSizes[i]
    });
  }
  return initialParticles;
};

const InteractiveFloatingParticles = memo(({ particleType = 'leaf' }) => {
  const particlesRef = useRef(createInitialParticles(particleType));
  const domRefs = useRef({});
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const clickBurstRef = useRef({ x: -1000, y: -1000, active: false, time: 0 });
  const frameCountRef = useRef(0);

  // Re-init particles if particleType changes (e.g. going to Quest/Endless mode)
  useEffect(() => {
    particlesRef.current = createInitialParticles(particleType);
  }, [particleType]);

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

      particlesRef.current.forEach((p) => {
        // 1. Click burst force
        if (isBursting) {
          const bdx = p.x - burst.x;
          const bdy = p.y - burst.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy) || 1;
          const blastRadius = 380;

          if (bdist < blastRadius) {
            const blastPower = ((blastRadius - bdist) / blastRadius) * 22;
            const bnx = bdx / bdist;
            const bny = bdy / bdist;

            p.vx += bnx * blastPower;
            p.vy += bny * blastPower;
            p.vRot += (Math.random() - 0.5) * 4;
          }
        } 
        // 2. Mouse interactive wind repulsion
        else if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 260;

          if (dist < attractionRadius && dist > 15) {
            const pullFactor = (1 - dist / attractionRadius) * 0.45;
            const nx = dx / dist;
            const ny = dy / dist;
            const tangentX = -ny;
            const tangentY = nx;

            p.vx -= (nx * 0.5 + tangentX * 0.2) * pullFactor;
            p.vy -= (ny * 0.5 + tangentY * 0.2) * pullFactor;
            p.vRot += (Math.random() - 0.5) * 0.6 * pullFactor;
          }
        }

        // Apply friction decay to impulse velocities
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.vRot *= 0.93;

        // Dynamic organic sine wave sway offset (melayang di udara naik-turun halus)
        const swayX = Math.sin(frame * p.swayFreq + p.phase) * p.swayAmp;
        const swayY = Math.cos(frame * (p.swayFreq * 0.7) + p.phase) * (p.swayAmp * 0.6);

        // Move particle with continuous wind + sway + impulse velocities
        p.x += p.baseSpeedX + swayX + p.vx;
        p.y += p.baseSpeedY + swayY + p.vy;
        p.rotation += p.rotSpeed + p.vRot;

        // Seamless wrapping around screen borders
        if (p.x > width + 80) {
          p.x = -80;
          p.y = Math.random() * (height * 0.95);
        }
        if (p.x < -90) {
          p.x = width + 80;
          p.y = Math.random() * (height * 0.95);
        }
        if (p.y > height + 80) {
          p.y = -80;
          p.x = Math.random() * (width * 0.95);
        }
        if (p.y < -90) {
          p.y = height + 80;
          p.x = Math.random() * (width * 0.95);
        }

        // DIRECT DOM TRANSFORM MUTATION (0% REACT RE-RENDER LAG, 100% HARDWARE ACCELERATED)
        const el = domRefs.current[p.id];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
        }
      });

      if (isBursting && Date.now() - burst.time >= 350) {
        burst.active = false;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particlesRef.current.map((p) => (
        <div
          key={`${particleType}-${p.id}`}
          ref={(el) => (domRefs.current[p.id] = el)}
          className="absolute pointer-events-none"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`,
            willChange: 'transform'
          }}
        >
          <FloatingParticle particleType={particleType} type={p.type} size={p.size} />
        </div>
      ))}
    </div>
  );
});

/**
 * 100% GPU-ACCELERATED CSS WIND STREAMERS (0% CPU USAGE)
 */
const LightweightWindBreeze = memo(() => {
  const gusts = [
    { id: 1, top: '15%', width: 260, duration: 8, delay: 0 },
    { id: 2, top: '38%', width: 320, duration: 11, delay: 3.2 },
    { id: 3, top: '65%', width: 280, duration: 9.5, delay: 6.0 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {gusts.map((g) => (
        <div
          key={g.id}
          className="absolute pointer-events-none"
          style={{
            top: g.top,
            left: '-350px',
            animation: `cssWindDrift ${g.duration}s linear infinite`,
            animationDelay: `${g.delay}s`,
            willChange: 'transform',
            opacity: 0.28
          }}
        >
          <svg width={g.width} height="30" viewBox={`0 0 ${g.width} 30`}>
            <defs>
              <linearGradient id={`lightWindGrad-${g.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="30%" stopColor="#BAE6FD" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 15 Q ${g.width * 0.5} 5 ${g.width} 15`}
              fill="none"
              stroke={`url(#lightWindGrad-${g.id})`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
});

/**
 * REGENERATED ULTRA-SMOOTH TRANSPARENT & SOFT-BLURRED DRIFTING CLOUDS
 * Ample padding and overflow-visible prevent any clipping/cutting of blurred edges.
 */
const STATIC_CLOUDS = [
  { id: 1, top: '4%', duration: 48, delay: -5, type: 0, scale: 0.9, opacity: 0.85 },
  { id: 2, top: '15%', duration: 62, delay: -26, type: 1, scale: 0.8, opacity: 0.75 },
  { id: 3, top: '26%', duration: 52, delay: -40, type: 2, scale: 0.85, opacity: 0.80 },
  { id: 4, top: '8%', duration: 70, delay: -32, type: 1, scale: 1.05, opacity: 0.70 },
  { id: 5, top: '20%', duration: 55, delay: -12, type: 0, scale: 0.75, opacity: 0.78 },
  { id: 6, top: '32%', duration: 65, delay: -52, type: 2, scale: 0.95, opacity: 0.72 },
];

const getCloudGradient = (timeMode) => {
  if (timeMode === 'malam') {
    return {
      fill: 'rgba(219, 234, 254, 0.32)',
      innerFill: 'rgba(254, 240, 138, 0.18)'
    };
  }
  if (timeMode === 'sore') {
    return {
      fill: 'rgba(255, 245, 235, 0.78)',
      innerFill: 'rgba(254, 215, 170, 0.45)'
    };
  }
  if (timeMode === 'pagi') {
    return {
      fill: 'rgba(255, 255, 255, 0.82)',
      innerFill: 'rgba(254, 240, 138, 0.35)'
    };
  }
  // siang (noon)
  return {
    fill: 'rgba(255, 255, 255, 0.80)',
    innerFill: 'rgba(255, 255, 255, 0.55)'
  };
};

const DynamicClouds = memo(({ timeMode }) => {
  const cloudTheme = useMemo(() => getCloudGradient(timeMode), [timeMode]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {STATIC_CLOUDS.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute pointer-events-none"
          style={{
            top: cloud.top,
            left: 0,
            animation: `cssCloudDrift ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
            transformOrigin: 'left center',
            willChange: 'transform',
            overflow: 'visible'
          }}
        >
          {cloud.type === 0 && (
            <svg 
              width="480" 
              height="200" 
              viewBox="0 0 480 200" 
              className="overflow-visible select-none pointer-events-none"
            >
              <path
                d="M 90 145 C 55 145 35 122 45 98 C 38 68 70 48 105 54 C 130 24 185 20 220 45 C 250 20 315 20 350 48 C 380 28 430 38 440 72 C 470 85 465 125 435 142 C 405 152 365 144 305 148 C 235 144 165 150 90 145 Z"
                fill={cloudTheme.fill}
              />
              <path
                d="M 120 125 C 95 125 80 110 88 92 C 85 70 110 56 135 60 C 152 38 195 35 220 54 C 242 35 292 35 320 56 C 342 42 380 50 388 75 C 410 85 408 115 385 126 C 360 134 328 128 280 130 C 225 126 175 130 120 125 Z"
                fill={cloudTheme.innerFill}
              />
            </svg>
          )}

          {cloud.type === 1 && (
            <svg 
              width="520" 
              height="190" 
              viewBox="0 0 520 190" 
              className="overflow-visible select-none pointer-events-none"
            >
              <path
                d="M 80 135 C 48 135 32 114 42 92 C 36 66 68 48 100 54 C 126 26 182 24 214 46 C 244 24 310 22 344 48 C 374 28 428 38 442 68 C 478 78 490 110 464 132 C 424 144 366 135 296 138 C 218 134 148 140 80 135 Z"
                fill={cloudTheme.fill}
              />
              <path
                d="M 110 118 C 85 118 72 102 80 85 C 75 65 100 52 125 56 C 145 35 190 34 214 52 C 238 35 290 34 316 54 C 340 40 382 48 392 72 C 420 80 428 105 408 120 C 375 130 330 122 275 125 C 210 122 155 126 110 118 Z"
                fill={cloudTheme.innerFill}
              />
            </svg>
          )}

          {cloud.type === 2 && (
            <svg 
              width="420" 
              height="180" 
              viewBox="0 0 420 180" 
              className="overflow-visible select-none pointer-events-none"
            >
              <path
                d="M 70 125 C 42 125 28 106 38 86 C 32 62 60 44 88 50 C 112 24 158 22 186 42 C 210 22 266 22 294 46 C 320 28 368 38 378 65 C 406 75 408 105 384 122 C 352 132 305 124 248 128 C 182 124 122 130 70 125 Z"
                fill={cloudTheme.fill}
              />
              <path
                d="M 95 110 C 75 110 65 96 72 80 C 68 62 90 48 112 52 C 130 32 168 30 190 46 C 210 30 252 30 274 48 C 295 34 332 42 340 64 C 362 72 364 95 345 108 C 320 116 280 110 235 112 C 182 110 135 114 95 110 Z"
                fill={cloudTheme.innerFill}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
});

/**
 * DYNAMIC VIBRANT SUN COMPONENT (PAGI, SIANG, SORE)
 * Rendered with rich multi-layer radial gradients, vibrant warm colors, and pulsing radiant aura
 */
const DynamicSun = memo(({ timeMode }) => {
  if (timeMode === 'malam') return null;

  if (timeMode === 'sore') {
    // Sore (Warm Amber-Orange Sunset)
    return (
      <div 
        className="absolute top-7 right-14 sm:right-24 pointer-events-none rounded-full z-0 flex items-center justify-center animate-sun-radiant"
        style={{ width: '130px', height: '130px' }}
      >
        {/* Radiant Sunset Outer Glow Aura */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.55) 0%, rgba(234, 88, 12, 0.25) 55%, transparent 75%)',
            transform: 'scale(1.8)'
          }}
        />
        
        {/* Sunset Sun SVG Disc */}
        <svg width="125" height="125" viewBox="0 0 120 120" className="overflow-visible select-none filter">
          <defs>
            <radialGradient id="sunGradSore" cx="42%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#FFF7ED" />
              <stop offset="25%" stopColor="#FED7AA" />
              <stop offset="55%" stopColor="#FB923C" />
              <stop offset="85%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </radialGradient>
            <radialGradient id="sunInnerHighlightSore" cx="35%" cy="32%" r="35%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="50" fill="url(#sunGradSore)" />
          <circle cx="60" cy="60" r="48" fill="url(#sunInnerHighlightSore)" />
        </svg>
      </div>
    );
  }

  if (timeMode === 'pagi') {
    // Pagi (Golden Sunrise)
    return (
      <div 
        className="absolute top-6 right-14 sm:right-24 pointer-events-none rounded-full z-0 flex items-center justify-center animate-sun-radiant"
        style={{ width: '120px', height: '120px' }}
      >
        {/* Radiant Sunrise Outer Glow Aura */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.65) 0%, rgba(251, 191, 36, 0.30) 55%, transparent 75%)',
            transform: 'scale(1.7)'
          }}
        />

        {/* Sunrise Sun SVG Disc */}
        <svg width="115" height="115" viewBox="0 0 120 120" className="overflow-visible select-none filter">
          <defs>
            <radialGradient id="sunGradPagi" cx="42%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#FEF08A" />
              <stop offset="65%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <radialGradient id="sunInnerHighlightPagi" cx="35%" cy="32%" r="35%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="50" fill="url(#sunGradPagi)" />
          <circle cx="60" cy="60" r="48" fill="url(#sunInnerHighlightPagi)" />
        </svg>
      </div>
    );
  }

  // Siang (Brilliant Sunny Noon)
  return (
    <div 
      className="absolute top-6 right-14 sm:right-24 pointer-events-none rounded-full z-0 flex items-center justify-center animate-sun-radiant"
      style={{ width: '125px', height: '125px' }}
    >
      {/* Radiant Sunbeams Shimmering Aura */}
      <div 
        className="absolute inset-0 rounded-full animate-sun-rays"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.70) 0%, rgba(250, 204, 21, 0.40) 50%, transparent 75%)',
          transform: 'scale(1.9)'
        }}
      />

      {/* Brilliant Noon Sun SVG Disc */}
      <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible select-none filter">
        <defs>
          <radialGradient id="sunGradSiang" cx="40%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="22%" stopColor="#FEF9C3" />
            <stop offset="58%" stopColor="#FACC15" />
            <stop offset="88%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <radialGradient id="sunInnerHighlightSiang" cx="35%" cy="32%" r="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="50" fill="url(#sunGradSiang)" />
        <circle cx="60" cy="60" r="48" fill="url(#sunInnerHighlightSiang)" />
      </svg>
    </div>
  );
});

function AnimatedBackground({ 
  hideBottomLandscape = false, 
  hideBirds = true, 
  hideClouds = false,
  isQuestMode = false,
  isEndlessMode = false,
  particleType = 'leaf'
}) {
  const [timeMode, setTimeMode] = useState('siang');

  useEffect(() => {
    const updateTimeMode = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 11) {
        setTimeMode('pagi');
      } else if (hour >= 11 && hour < 15) {
        setTimeMode('siang');
      } else if (hour >= 15 && hour < 18.5) {
        setTimeMode('sore');
      } else {
        setTimeMode('malam');
      }
    };

    updateTimeMode();
    const interval = setInterval(updateTimeMode, 60000);
    return () => clearInterval(interval);
  }, []);

  const inQuestMode = isQuestMode || particleType === 'snowflake';

  // Determine sky background gradient
  const getSkyGradient = () => {
    if (inQuestMode) {
      if (timeMode === 'pagi') return 'bg-gradient-to-b from-[#38BDF8] via-[#FFFFFF] to-[#FEF08A]';
      if (timeMode === 'siang') return 'bg-gradient-to-b from-[#38BDF8] via-[#FFFFFF] to-[#FAF7F2]';
      if (timeMode === 'sore') return 'bg-gradient-to-b from-[#38BDF8] via-[#FFFFFF] to-[#FB923C]';
      return 'bg-gradient-to-b from-[#38BDF8] via-[#FFFFFF] to-[#1E1B4B]';
    }

    if (timeMode === 'pagi') return 'bg-gradient-to-b from-[#FEF08A] via-[#7DD3FC] to-[#FAF7F2]';
    if (timeMode === 'siang') return 'bg-gradient-to-b from-[#38BDF8] via-[#BAE6FD] to-[#FAF7F2]';
    if (timeMode === 'sore') return 'bg-gradient-to-b from-[#F97316] via-[#FDE047] to-[#FAF7F2]';
    return 'bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#334155]';
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      
      {/* 1. SKY GRADIENT BACKGROUND */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${getSkyGradient()}`}
      />

      {/* 40% LAVA ORANGE OVERLAY FOR ENDLESS MODE (RYU'S VOLCANIC SKY) */}
      {isEndlessMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#EA580C]/35 via-[#F97316]/35 to-[#C2410C]/35 pointer-events-none z-0" />
      )}

      {/* DYNAMIC RADIANT SUN (PAGI, SIANG, SORE) */}
      <DynamicSun timeMode={timeMode} />

      {/* NIGHT MOON & STARS (MALAM) */}
      {timeMode === 'malam' && (
        <>
          <div className="absolute top-8 right-16 filter">
            <svg width="65" height="65" viewBox="0 0 100 100">
              <path
                d="M 50 10 A 35 35 0 1 0 90 60 A 40 40 0 1 1 50 10 Z"
                fill="#FDE68A"
              />
            </svg>
          </div>

          {/* CELESTIAL STEADY GLOWING STARS */}
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
              { top: '5%', left: '38%', size: 10, opacity: 0.8, glow: '#FEF08A' },
              { top: '25%', left: '5%', size: 12, opacity: 0.7, glow: '#FFFFFF' }
            ].map((star, i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: star.top, left: star.left, opacity: star.opacity }}
              >
                <svg width={star.size} height={star.size} viewBox="0 0 24 24" className="filter">
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

      {/* 2. SOFT BORDERLESS DRIFTING CLOUDS */}
      {!hideClouds && <DynamicClouds timeMode={timeMode} />}

      {/* 3. LIGHTWEIGHT WIND STREAMERS (0% CPU) */}
      <LightweightWindBreeze />

      {/* 4. 60FPS INTERACTIVE FLOATING PARTICLES (0% REACT LAG) */}
      <InteractiveFloatingParticles particleType={particleType} />

      {/* 5. ROLLING GREEN HILLS AT BOTTOM */}
      {!hideBottomLandscape && (
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 pointer-events-none select-none overflow-hidden z-0">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#38BDF8" opacity="0.30" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"></path>
            <path fill="#4ADE80" opacity="0.75" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,234.7C840,235,960,181,1080,165.3C1200,149,1320,171,1380,181.3L1440,192L1440,320L0,320Z"></path>
            <path fill="#22C55E" d="M0,256L80,240C160,224,320,192,480,213.3C640,235,800,309,960,298.7C1120,288,1280,192,1360,144L1440,96L1440,320L0,320Z"></path>
            <path fill="#FEF08A" opacity="0.70" d="M340,320 C420,260 520,290 600,320 Z"></path>
          </svg>
        </div>
      )}

    </div>
  );
}

export default memo(AnimatedBackground);
