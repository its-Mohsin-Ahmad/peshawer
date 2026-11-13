import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const videoSrc = `${import.meta.env.BASE_URL}assets/loading-video.mp4`;

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 650);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;

      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video is actively playing
            })
            .catch(() => {
              video.muted = true;
              video.play().catch(() => {});
            });
        }
      };

      attemptPlay();
    }

    // Safety timeout to ensure user is never blocked
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 10000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      if (!isPlaying && video.currentTime > 0.05) {
        setIsPlaying(true);
      }
      const pct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setProgress(pct);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-between items-center overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 50%, #073828 0%, #032016 55%, #01120C 100%)',
      }}
    >
      {/* Dynamic Ambient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FFC83D]/10 blur-[100px] pointer-events-none animate-pulse [animation-duration:3s]" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#047857]/20 blur-[90px] pointer-events-none" />

      {/* TOP BRAND HEADER: ONLY "peshawars.com" */}
      <div className="relative z-20 w-full pt-6 sm:pt-8 px-6 flex flex-col items-center">
        <h1
          className="font-heading font-black tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl text-[#FFC83D] drop-shadow-[0_2px_15px_rgba(255,200,61,0.6)] animate-in fade-in slide-in-from-top-4 duration-700"
          style={{
            textShadow:
              '1px 1px 0 #C48714, 2px 2px 0 #9E6805, 4px 4px 12px rgba(0,0,0,0.6)',
          }}
        >
          peshawars.com
        </h1>
      </div>

      {/* CENTER: THE VIDEO IN A LUXURY FLOATING CINEMATIC STAGE */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center px-4 sm:px-8 my-auto overflow-hidden">
        {/* Glowing video frame */}
        <div className="relative w-full max-w-[560px] sm:max-w-3xl aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden p-[2px] bg-gradient-to-b from-[#FFC83D]/60 via-[#064E3B]/40 to-[#FFC83D]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(255,200,61,0.2)]">
          {/* Inner video container */}
          <div className="relative w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#021A12] flex items-center justify-center">
            
            {/* Instant Zero-Black-Screen Placeholder (fades smoothly when video frames begin) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#063324] via-[#032016] to-[#01140D] transition-opacity duration-500 z-10 ${
                isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#FFC83D]/40 border-t-[#FFC83D] animate-spin" />
                <span className="absolute w-3 h-3 rounded-full bg-[#FFC83D] animate-ping" />
              </div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              onPlaying={() => setIsPlaying(true)}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleComplete}
              onError={handleComplete}
              className={`w-full h-full object-cover transition-opacity duration-600 ease-out ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Golden corner accents */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FFC83D]/70 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FFC83D]/70 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FFC83D]/70 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FFC83D]/70 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: ONLY "Buy, Sell, Invest" + Sleek Golden Loading Line */}
      <div className="relative z-20 w-full pb-8 sm:pb-10 px-6 flex flex-col items-center text-center">
        {/* Only "Buy, Sell, Invest" */}
        <h2
          className="font-heading font-black text-lg sm:text-2xl text-[#FFC83D] tracking-wide mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          style={{
            textShadow: '1px 1px 0 #9E6805, 2px 2px 8px rgba(0,0,0,0.7)',
          }}
        >
          Buy, Sell, Invest
        </h2>

        {/* Elegant Golden Progress Bar with live percentage */}
        <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center gap-1.5">
          <div className="w-full h-1.5 sm:h-2 bg-white/15 rounded-full overflow-hidden p-[1px] border border-white/20 backdrop-blur-md">
            <div
              className="h-full bg-gradient-to-r from-[#9E6805] via-[#FFD778] to-[#FFC83D] rounded-full transition-all duration-150 ease-out shadow-[0_0_14px_rgba(255,200,61,0.9)]"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#FFC83D]/90 tracking-widest drop-shadow">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
