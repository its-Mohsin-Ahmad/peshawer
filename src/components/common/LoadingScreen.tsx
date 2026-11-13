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
  maxOpacity: number;
  fadeSpeed: number;
  isFadingIn: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);

  const logoSrc = `${import.meta.env.BASE_URL}assets/peshawars-logo-transparent.png`;
  const bgSrc = `${import.meta.env.BASE_URL}assets/peshawars-loader-bg.jpg`;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 650);
  };

  // Real-time progress animation
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // 2.8s smooth luxury transition

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleFinish();
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // HTML5 Canvas Golden Particle Engine
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

    // Particle palette: rich gold, champagne, amber, sparkling white-gold
    const goldColors = [
      '255, 215, 80',
      '255, 200, 60',
      '245, 180, 40',
      '255, 235, 140',
      '220, 165, 30',
    ];

    const particleCount = width < 640 ? 55 : 90;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.2 ? Math.random() * 4 + 3 : Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.55 + 0.2),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.7 + 0.2,
        maxOpacity: Math.random() * 0.6 + 0.4,
        fadeSpeed: Math.random() * 0.012 + 0.005,
        isFadingIn: Math.random() > 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion update: gentle upward drift with sinusoidal horizontal float
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulsePhase) * 0.25;

        // Twinkle / Opacity pulsation
        p.pulsePhase += p.pulseSpeed;
        const currentOpacity = Math.max(
          0.1,
          Math.min(1, p.opacity + Math.sin(p.pulsePhase) * 0.35)
        );

        // Respawn when particle floats out of view
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Render soft glowing halo around medium/large particles
        if (p.size > 2) {
          const glowRadius = p.size * 3.5;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(${p.color}, ${currentOpacity * 0.7})`);
          gradient.addColorStop(0.5, `rgba(${p.color}, ${currentOpacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Render solid particle core
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
        background: '#011C12',
      }}
    >
      {/* 1. EMERALD SILK BASE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bgSrc}
          alt=""
          className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
        />

        {/* Deep luxury vignette & emerald overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#01140C] via-transparent to-[#01140C]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,18,12,0.75)_100%)] pointer-events-none" />

        {/* Soft breathing golden glow behind the logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-[#FFC83D]/12 blur-[90px] pointer-events-none animate-pulse [animation-duration:3.2s]" />
      </div>

      {/* 2. REAL-TIME INTERACTIVE GOLDEN PARTICLE CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* 3. SPACER */}
      <div className="relative z-20 w-full pt-8 sm:pt-10 flex justify-center" />

      {/* 4. CENTER: THE EXACT LOGO PNG WITH LUXURY GLOW & SUBTLE FLOAT */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 my-auto">
        <div className="relative group flex items-center justify-center animate-[float_3.6s_ease-in-out_infinite]">
          {/* Subtle light sweep reflection across the logo */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={logoSrc}
              alt="Peshawars.com - Buy, Sell, Invest"
              className="w-full max-w-[82vw] sm:max-w-[420px] md:max-w-[500px] h-auto object-contain drop-shadow-[0_15px_45px_rgba(0,0,0,0.85)] filter contrast-[1.08] brightness-[1.02]"
            />

            {/* Dynamic golden shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.8s_infinite] pointer-events-none" />
          </div>

          {/* Central golden flare highlight behind the home icon */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#FFD778]/25 blur-2xl pointer-events-none animate-pulse [animation-duration:2s]" />
        </div>
      </div>

      {/* 5. BOTTOM: SLEEK GOLDEN LOADING PROGRESS LINE */}
      <div className="relative z-20 w-full pb-8 sm:pb-12 px-6 flex flex-col items-center text-center">
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2">
          {/* Progress track */}
          <div className="relative w-full h-1 sm:h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px] border border-[#FFC83D]/30 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            <div
              className="h-full bg-gradient-to-r from-[#9E6805] via-[#FFE28A] to-[#FFC83D] rounded-full transition-all duration-100 ease-out shadow-[0_0_14px_rgba(255,200,61,0.95)]"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>

          {/* Live Progress Percentage */}
          <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono font-bold tracking-widest text-[#FFC83D]/90">
            <span className="text-[10px] uppercase font-heading text-white/50 tracking-wider">
              Loading
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Keyframe animations for floating & shimmer */}
      <style>{`
        @keyframes float {
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
