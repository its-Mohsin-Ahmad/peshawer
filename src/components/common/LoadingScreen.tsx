import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  isStar?: boolean;
}

interface TouchSparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);
  const touchSparklesRef = useRef<TouchSparkle[]>([]);

  const logoSrc = `${import.meta.env.BASE_URL}assets/navbar-logo.png`;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem('peshawars_initial_loaded', 'true');
    } catch {
      // safe
    }
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 350);
  };

  // Snappy, fast 900ms progress sequence (instant if already loaded in this session)
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('peshawars_initial_loaded');
    if (hasLoaded) {
      handleFinish();
      return;
    }

    const startTime = Date.now();
    const duration = 950; // Ultra fast & smooth reveal

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleFinish();
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Interactive Touch & Mouse Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Interactive pointer sparkle emitter
    const addSparkle = (clientX: number, clientY: number) => {
      for (let k = 0; k < 3; k++) {
        touchSparklesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          color: Math.random() > 0.5 ? '255, 220, 90' : '255, 245, 170',
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        });
      }
      if (touchSparklesRef.current.length > 60) {
        touchSparklesRef.current.splice(0, touchSparklesRef.current.length - 60);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      } else if ('clientX' in e) {
        addSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Gold color palette: 24k gold, amber, champagne, brilliant white-gold
    const goldTones = [
      '255, 215, 80',
      '255, 200, 50',
      '245, 185, 40',
      '255, 245, 160',
      '255, 255, 220',
      '230, 170, 30',
    ];

    const count = width < 640 ? 65 : 100;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isStar = Math.random() < 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isStar ? Math.random() * 3.5 + 2.5 : Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.55 + 0.2),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.7 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        color: goldTones[Math.floor(Math.random() * goldTones.length)],
        isStar,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // 1. Render ambient floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulsePhase) * 0.35;

        p.pulsePhase += p.pulseSpeed;
        const currentOpacity = Math.max(
          0.12,
          Math.min(1, p.opacity + Math.sin(p.pulsePhase) * 0.38)
        );

        // Respawn wrap
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Render sparkling 4-point star lens flare for stars
        if (p.isStar && p.size > 2.5) {
          const starLen = p.size * 3;
          ctx.strokeStyle = `rgba(${p.color}, ${currentOpacity * 0.65})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - starLen, p.y);
          ctx.lineTo(p.x + starLen, p.y);
          ctx.moveTo(p.x, p.y - starLen);
          ctx.lineTo(p.x, p.y + starLen);
          ctx.stroke();

          // Soft glow
          const glow = p.size * 3.5;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
          gradient.addColorStop(0, `rgba(${p.color}, ${currentOpacity * 0.8})`);
          gradient.addColorStop(0.5, `rgba(${p.color}, ${currentOpacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle core
        ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render interactive touch/mouse sparkles
      for (let j = touchSparklesRef.current.length - 1; j >= 0; j--) {
        const s = touchSparklesRef.current[j];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.025;

        if (s.alpha <= 0) {
          touchSparklesRef.current.splice(j, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle
        ctx.strokeStyle = `rgba(${s.color}, ${s.alpha * 0.7})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x - 4, s.y);
        ctx.lineTo(s.x + 4, s.y);
        ctx.moveTo(s.x, s.y - 4);
        ctx.lineTo(s.x, s.y + 4);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-between items-center overflow-hidden select-none cursor-pointer transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #02361B 0%, #012210 45%, #001208 85%, #000A04 100%)',
      }}
    >
      {/* 1. EMERALD SILK WAVES & LUXURY GLOW (Pure CSS, 0ms render) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Diagonal silk ribbon 1 */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[90%] opacity-45 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, #055C32 0%, #02321A 50%, transparent 80%)',
            transform: 'rotate(-18deg)',
          }}
        />

        {/* Diagonal silk ribbon 2 */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[140%] h-[80%] opacity-45 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom right, #044D29 0%, #012513 55%, transparent 80%)',
            transform: 'rotate(-22deg)',
          }}
        />

        {/* Central golden glow halo behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-[#FFC83D]/14 blur-[100px] pointer-events-none animate-pulse [animation-duration:3s]" />

        {/* Deep perimeter vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,10,4,0.75)_100%)] pointer-events-none" />
      </div>

      {/* 2. REAL-TIME CANVAS GOLDEN PARTICLE LAYER (Moving sparkles + touch trail) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* TOP SPACER */}
      <div className="relative z-20 w-full pt-8 flex justify-center" />

      {/* 3. CENTER: 3D EMBLEM ORBIT RINGS & USER LOGO */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto px-6 max-w-full">
        <div className="relative flex items-center justify-center animate-[subtleFloat_3.4s_ease-in-out_infinite]">
          {/* 3D Rotating Golden Orbit Rings behind Emblem */}
          <div className="absolute -inset-10 sm:-inset-16 rounded-full border border-[#FFC83D]/25 animate-spin [animation-duration:14s] pointer-events-none" />
          <div className="absolute -inset-16 sm:-inset-24 rounded-full border border-dashed border-[#FFC83D]/15 animate-spin [animation-duration:22s] [animation-direction:reverse] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#FFD778]/15 blur-2xl pointer-events-none" />

          {/* Crisp Transparent Logo */}
          <div className="relative overflow-hidden group">
            <img
              src={logoSrc}
              alt="Peshawars.com"
              className="w-full max-w-[85vw] sm:max-w-[420px] md:max-w-[480px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] filter contrast-[1.08] brightness-[1.03]"
            />

            {/* Dynamic golden light sweep across logo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.8s_infinite]" />
            </div>
          </div>

          {/* Golden Diamond Lens Flare on Emblem */}
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFF] rounded-full shadow-[0_0_20px_#FFC83D,0_0_35px_#FFD778] animate-ping [animation-duration:2.5s] pointer-events-none" />
        </div>

        {/* Slogan */}
        <p className="mt-6 text-xs sm:text-sm font-heading uppercase tracking-[0.3em] text-[#FFC83D] font-bold text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Buy • Sell • Invest
        </p>
      </div>

      {/* 4. BOTTOM: FUTURISTIC GOLDEN ENERGY PROGRESS BEAM */}
      <div className="relative z-20 w-full pb-8 sm:pb-12 px-6 flex flex-col items-center text-center">
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2.5">
          {/* Progress Track */}
          <div className="relative w-full h-1.5 sm:h-2 bg-black/50 rounded-full overflow-hidden p-[1px] border border-[#FFC83D]/35 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            <div
              className="h-full bg-gradient-to-r from-[#9E6805] via-[#FFE28A] to-[#FFC83D] rounded-full transition-all duration-100 ease-out shadow-[0_0_16px_rgba(255,200,61,0.95)]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>

          {/* Percentage & Interactive hint */}
          <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono font-bold tracking-widest text-[#FFC83D]/90">
            <span className="text-[10px] uppercase font-heading text-white/50 tracking-wider">
              Loading
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Embedded Animations */}
      <style>{`
        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </div>
  );
};
