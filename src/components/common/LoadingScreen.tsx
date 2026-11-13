import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const videoSrc = `${import.meta.env.BASE_URL}assets/loading-video.mp4`;
  const logoSrc = `${import.meta.env.BASE_URL}assets/navbar-logo.png`;

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 700);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      
      const tryPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setVideoReady(true);
            })
            .catch(() => {
              // Retry on interaction or fallback silently
              video.muted = true;
              video.play().catch(() => {});
            });
        }
      };

      tryPlay();
    }

    // Safety timeout: transition smoothly if video takes too long or fails
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-between overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 45%, #073828 0%, #032218 55%, #01130D 100%)',
      }}
    >
      {/* Ambient luxury light orbs in the background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D6A84F]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#047857]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D6A84F]/5 blur-3xl pointer-events-none" />

      {/* TOP: Brand Emblem & Header */}
      <div className="relative z-10 w-full pt-6 sm:pt-8 px-6 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-[#D6A84F]/30 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC83D] animate-ping" />
          <span className="text-[10px] sm:text-xs font-heading uppercase tracking-[0.25em] text-[#FFC83D] font-bold">
            Peshawars Real Estate
          </span>
        </div>
      </div>

      {/* CENTER: Cinematic Video Stage */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-8 my-auto flex flex-col items-center justify-center">
        {/* Luxury Frame Container */}
        <div className="relative w-full max-w-[540px] sm:max-w-2xl lg:max-w-3xl aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden p-[2px] bg-gradient-to-b from-[#D6A84F]/60 via-[#064E3B]/40 to-[#D6A84F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(214,168,79,0.18)]">
          {/* Inner Glass Shell */}
          <div className="relative w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#021A12] flex items-center justify-center">
            
            {/* Instant Branded Placeholder (Shown while video buffers — ZERO black screen!) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#063324] via-[#032016] to-[#01140D] transition-opacity duration-700 z-10 ${
                videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing gold ring */}
                <div className="absolute -inset-4 rounded-full border border-[#D6A84F]/30 animate-spin [animation-duration:6s]" />
                <div className="absolute -inset-8 rounded-full border border-dashed border-[#D6A84F]/20 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
                
                <img
                  src={logoSrc}
                  alt="PESHAWARS"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(214,168,79,0.5)] animate-pulse"
                />
              </div>
              <p className="mt-5 text-[11px] sm:text-xs font-heading uppercase tracking-[0.2em] text-[#FFC83D]/90 font-semibold">
                Loading Experience...
              </p>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={() => setVideoReady(true)}
              onPlaying={() => setVideoReady(true)}
              onEnded={handleComplete}
              onError={handleComplete}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
                videoReady ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />

            {/* Subtle luxury edge vignette over video */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {/* Corner Decorative Gold Accents (Luxury Architectural Touch) */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D6A84F]/70 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D6A84F]/70 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D6A84F]/70 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D6A84F]/70 pointer-events-none" />
          </div>
        </div>

        {/* Ambient video shadow glow beneath the frame */}
        <div className="w-3/4 h-4 bg-[#D6A84F]/20 blur-xl rounded-full mt-2 pointer-events-none" />
      </div>

      {/* BOTTOM: Luxury Tagline & Animated Shimmer */}
      <div className="relative z-10 w-full pb-6 sm:pb-8 px-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <p className="font-heading text-xs sm:text-sm font-semibold text-white/90 tracking-wide drop-shadow-md">
          “Turning Dreams into Reality, One Property at a Time”
        </p>
        
        {/* Elegant Golden Hairline Progress Shimmer */}
        <div className="mt-3 w-32 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#FFC83D] to-transparent animate-pulse [animation-duration:1.6s]" />
        </div>
      </div>
    </div>
  );
};
