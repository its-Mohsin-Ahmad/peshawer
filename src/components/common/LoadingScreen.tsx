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
  const logoSrc = `${import.meta.env.BASE_URL}assets/navbar-logo.png`;

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
              // Browser restriction fallback: force muted & re-attempt
              video.muted = true;
              video.play().catch(() => {});
            });
        }
      };

      attemptPlay();
    }

    // Safety timeout: transition after 10 seconds in case video finishes or stalls
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 10000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      if (!isPlaying && video.currentTime > 0.1) {
        setIsPlaying(true);
      }
      const pct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setProgress(pct);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-between overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 50%, #063827 0%, #022016 55%, #01120C 100%)',
      }}
    >
      {/* ZERO BLACK SCREEN: Instant Branded Placeholder (Shown while video starts) */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-600 pointer-events-none ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-8 rounded-full border border-[#D6A84F]/30 animate-ping" />
          <div className="absolute -inset-12 rounded-full border border-dashed border-[#D6A84F]/25 animate-spin [animation-duration:12s]" />
          <img
            src={logoSrc}
            alt="PESHAWARS"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_25px_rgba(214,168,79,0.6)] animate-pulse"
          />
        </div>
        <p className="mt-6 text-xs sm:text-sm font-heading uppercase tracking-[0.25em] text-[#FFC83D] font-bold">
          Peshawars Real Estate
        </p>
      </div>

      {/* TOP: Subtle Brand Pill (No sound, no skip, clean loading style) */}
      <div className="relative z-20 w-full pt-5 sm:pt-7 px-6 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D6A84F]/35 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FFC83D] animate-ping" />
          <span className="text-[10px] sm:text-xs font-heading uppercase tracking-[0.25em] text-[#FFC83D] font-bold">
            Peshawars Real Estate
          </span>
        </div>
      </div>

      {/* CENTER: THE WHOLE VIDEO (Uncropped & Centered on Mobile, Fullscreen on Desktop) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center px-0 sm:px-4 my-auto overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
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
            className={`w-full max-h-screen object-contain sm:object-cover transition-opacity duration-700 ease-out shadow-2xl ${
              isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        </div>
      </div>

      {/* BOTTOM: Integrated Golden Progress Bar (Makes the video look like a real loading screen) */}
      <div className="relative z-20 w-full pb-7 sm:pb-9 px-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-black/55 backdrop-blur-md border border-[#D6A84F]/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-heading uppercase tracking-widest mb-2 px-1">
            <span className="text-white/80 font-medium flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFC83D] animate-pulse" />
              <span>Loading Experience</span>
            </span>
            <span className="text-[#FFC83D] font-extrabold text-sm drop-shadow-[0_0_10px_rgba(255,200,61,0.8)]">
              {progress}%
            </span>
          </div>

          {/* Golden Progress Line */}
          <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#B88628] via-[#FFD778] to-[#FFC83D] rounded-full transition-all duration-150 ease-out shadow-[0_0_14px_rgba(255,200,61,0.9)]"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
