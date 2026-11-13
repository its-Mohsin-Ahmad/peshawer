import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusText, setStatusText] = useState('Curating Exceptional Living...');
  const completedRef = useRef(false);

  const heroBg = `${import.meta.env.BASE_URL}assets/hero/home-clean.png`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/navbar-logo.png`;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 700);
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds total cinematic sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawPct);

      if (rawPct < 35) {
        setStatusText('Curating Exceptional Living...');
      } else if (rawPct < 75) {
        setStatusText('Preparing Signature Residences...');
      } else if (rawPct < 98) {
        setStatusText('Unveiling Peshawar’s Finest...');
      } else {
        setStatusText('Welcome to Peshawars Real Estate');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        handleFinish();
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-between overflow-hidden select-none cursor-pointer transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: '#041710',
      }}
    >
      {/* 1. CINEMATIC KEN-BURNS BACKGROUND (Luxury Architecture Slow Zoom) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Luxury Architecture"
          className="w-full h-full object-cover object-center animate-[kenBurns_3.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
          style={{
            transformOrigin: '50% 60%',
          }}
        />

        {/* Multi-layered cinematic lighting & royal emerald tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#01140E]/95 via-[#022417]/70 to-[#01140E]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,168,79,0.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Ambient sweeping light ray */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(115deg,transparent_20%,rgba(255,215,120,0.25)_45%,transparent_70%)] animate-[lightSweep_2.8s_ease-in-out_infinite] pointer-events-none" />
      </div>

      {/* 2. TOP: Glowing Royal Crest / Tagline */}
      <div className="relative z-10 w-full pt-8 sm:pt-10 px-6 flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/45 backdrop-blur-xl border border-[#D6A84F]/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-[#FFC83D] animate-ping" />
          <span className="text-[11px] sm:text-xs font-heading uppercase tracking-[0.28em] text-[#FFC83D] font-extrabold drop-shadow">
            Peshawars Real Estate
          </span>
        </div>
      </div>

      {/* 3. CENTER: Majestic Golden Emblem & Shimmering Title */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 my-auto">
        {/* Animated Radial Halo behind Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-10 sm:-inset-16 rounded-full bg-[#D6A84F]/15 blur-2xl animate-pulse [animation-duration:2s]" />
          <div className="absolute -inset-6 sm:-inset-10 rounded-full border border-[#D6A84F]/30 animate-spin [animation-duration:12s]" />
          <div className="absolute -inset-10 sm:-inset-14 rounded-full border border-dashed border-[#D6A84F]/20 animate-spin [animation-duration:18s] [animation-direction:reverse]" />

          {/* Golden Brand Logo */}
          <img
            src={logoSrc}
            alt="Peshawars Logo"
            className="h-20 sm:h-28 md:h-32 w-auto object-contain relative z-10 drop-shadow-[0_10px_35px_rgba(214,168,79,0.65)] transform hover:scale-105 transition-transform"
          />
        </div>

        {/* Luxury Typography */}
        <h1
          className="mt-6 font-heading font-black tracking-[-0.03em] uppercase text-center text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#D6A84F] via-[#FFE494] to-[#C48714]"
          style={{
            textShadow: '0 4px 30px rgba(214,168,79,0.4)',
          }}
        >
          PESHAWARS
        </h1>

        <p className="mt-2 text-xs sm:text-sm font-heading uppercase tracking-[0.3em] text-white/80 font-semibold text-center drop-shadow">
          Buy • Sell • Invest
        </p>
      </div>

      {/* 4. BOTTOM: Futuristic Golden Loading Progress & Live Percent */}
      <div className="relative z-10 w-full pb-10 sm:pb-12 px-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-[#D6A84F]/30 rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
          {/* Header with live percentage */}
          <div className="flex items-center justify-between text-xs font-heading uppercase tracking-widest mb-2.5">
            <span className="text-white/85 font-medium flex items-center gap-2 text-[11px] sm:text-xs truncate max-w-[240px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC83D] animate-pulse" />
              <span>{statusText}</span>
            </span>
            <span className="text-[#FFC83D] font-black text-sm sm:text-base font-mono drop-shadow-[0_0_12px_rgba(255,200,61,0.8)]">
              {progress}%
            </span>
          </div>

          {/* Golden Progress Track with Leading Flare */}
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/15">
            <div
              className="h-full bg-gradient-to-r from-[#9E6805] via-[#FFD778] to-[#FFC83D] rounded-full transition-all duration-75 ease-out shadow-[0_0_16px_rgba(255,200,61,0.95)]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>

          {/* Subtitle */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/60">
            <span>Signature Luxury Living</span>
            <span className="text-[#D6A84F]/80">Tap anywhere to enter</span>
          </div>
        </div>
      </div>

      {/* Embedded Keyframes for Ken Burns and Light Sweep */}
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.14) translate(-1%, -1.5%);
          }
        }
        @keyframes lightSweep {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
