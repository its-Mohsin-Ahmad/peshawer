import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const videoSrc = `${import.meta.env.BASE_URL}assets/loading-video.mp4`;
  const posterSrc = `${import.meta.env.BASE_URL}assets/hero/home-clean.png`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/navbar-logo.png`;

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoReady(true);
          })
          .catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
      }
    }

    // Safety timeout: never block the user even if network is slow
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setProgress(pct);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen overflow-hidden select-none transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(6, 62, 45, 0.75) 0%, rgba(1, 20, 14, 0.95) 100%), url(${posterSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 1. ZERO BLACK SCREEN PLACEHOLDER: Shows instantly (0ms) while video buffers */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none ${
          videoReady ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-6 rounded-full border border-[#D6A84F]/30 animate-ping" />
          <div className="absolute -inset-10 rounded-full border border-dashed border-[#D6A84F]/25 animate-spin [animation-duration:10s]" />
          <img
            src={logoSrc}
            alt="PESHAWARS"
            className="h-14 sm:h-20 w-auto object-contain drop-shadow-[0_4px_24px_rgba(214,168,79,0.6)] animate-pulse"
          />
        </div>
        <p className="mt-6 text-xs sm:text-sm font-heading uppercase tracking-[0.25em] text-[#FFC83D] font-bold">
          Loading Peshawars...
        </p>
      </div>

      {/* 2. WHOLE VIDEO AS LOADING SCREEN (100% Fullscreen on Mobile & Desktop) */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleComplete}
        onError={handleComplete}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. CINEMATIC OVERLAYS (Make the video clearly look like a loading screen) */}
      {/* Top Brand Banner */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-20 flex items-start justify-center pt-6 px-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D6A84F]/40 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FFC83D] animate-ping" />
          <span className="text-[10px] sm:text-xs font-heading uppercase tracking-[0.25em] text-[#FFC83D] font-bold">
            Peshawars Real Estate
          </span>
        </div>
      </div>

      {/* Bottom Loading Bar & Progress (Makes it unmistakably a loading screen) */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20 flex flex-col items-center justify-end pb-8 sm:pb-12 px-6">
        <div className="w-full max-w-md space-y-3">
          {/* Progress Info Header */}
          <div className="flex items-center justify-between text-xs font-heading uppercase tracking-widest px-1">
            <span className="text-white/80 font-medium flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
              <span>Loading Experience</span>
            </span>
            <span className="text-[#FFC83D] font-extrabold text-sm drop-shadow-[0_2px_8px_rgba(255,200,61,0.6)]">
              {progress}%
            </span>
          </div>

          {/* Golden Progress Bar */}
          <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md p-[1px] border border-white/20 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#B88628] via-[#FFD778] to-[#FFC83D] rounded-full transition-all duration-200 ease-out shadow-[0_0_16px_rgba(255,200,61,0.9)]"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-center text-[10px] sm:text-xs text-white/70 font-medium tracking-wide">
            Turning Dreams into Reality, One Property at a Time
          </p>
        </div>
      </div>
    </div>
  );
};
