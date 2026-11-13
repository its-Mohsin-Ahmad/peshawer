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
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);

  const loaderImageSrc = `${import.meta.env.BASE_URL}assets/peshawars-loader-bg.jpg`;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 600);
  };

  // 2.5s real-time progress sequence
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleFinish();
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Real-time Canvas Golden Particle Engine
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

    // Warm luxury golden palette matching the emerald background
    const goldTones = [
      '255, 215, 80',
      '255, 200, 50',
      '245, 185, 40',
      '255, 240, 150',
      '230, 175, 35',
    ];

    const count = width < 640 ? 55 : 85;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.25 ? Math.random() * 3.5 + 2.5 : Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.6 + 0.25),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        color: goldTones[Math.floor(Math.random() * goldTones.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics: upward floating drift + sine wave sway
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulsePhase) * 0.3;

        // Twinkle
        p.pulsePhase += p.pulseSpeed;
        const currentOpacity = Math.max(
          0.1,
          Math.min(1, p.opacity + Math.sin(p.pulsePhase) * 0.35)
        );

        // Respawn wrap-around
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Glowing bokeh halo for larger particles
        if (p.size > 2) {
          const glow = p.size * 3.2;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glow
          );
          gradient.addColorStop(0, `rgba(${p.color}, ${currentOpacity * 0.75})`);
          gradient.addColorStop(0.5, `rgba(${p.color}, ${currentOpacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle Core
        ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
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
        background: 'radial-gradient(ellipse at center, #01371C 0%, #002211 60%, #001208 100%)',
      }}
    >
      {/* 1. EMERALD BASE & AMBIENT VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFC83D]/10 blur-[100px] animate-pulse [animation-duration:3s]" />
      </div>

      {/* 2. REAL-TIME CANVAS GOLDEN PARTICLE LAYER (Front of background, surrounding artwork) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none w-full h-full"
      />

      {/* TOP SPACER */}
      <div className="relative z-10 w-full pt-6 flex justify-center" />

      {/* 3. CENTER: EXACT LOADER ARTWORK WITH FLOATING PARTICLES & LIGHT SHEEN */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto px-4 max-w-full">
        <div className="relative flex items-center justify-center animate-[subtleFloat_3.2s_ease-in-out_infinite]">
          {/* Base artwork image */}
          <img
            src={loaderImageSrc}
            alt="Peshawars.com - Buy, Sell, Invest"
            className="w-full max-w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.04] brightness-[1.02]"
          />

          {/* Golden shine sweep that sweeps across the logo */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.6s_infinite]" />
          </div>
        </div>
      </div>

      {/* 4. BOTTOM: SLEEK GOLDEN PROGRESS BAR WITH LIVE PERCENT */}
      <div className="relative z-30 w-full pb-8 sm:pb-12 px-6 flex flex-col items-center text-center">
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2">
          {/* Golden Progress Track */}
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden p-[1px] border border-[#FFC83D]/35 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.7)]">
            <div
              className="h-full bg-gradient-to-r from-[#9E6805] via-[#FFE28A] to-[#FFC83D] rounded-full transition-all duration-100 ease-out shadow-[0_0_14px_rgba(255,200,61,0.95)]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>

          {/* Percentage */}
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
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.015);
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
