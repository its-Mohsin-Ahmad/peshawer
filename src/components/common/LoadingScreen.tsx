import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const videoSrc = `${import.meta.env.BASE_URL}assets/loading-video.mp4`;

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;

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
        playPromise.catch(() => {
          // Fallback if browser requires gesture: keep muted and attempt play
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    // Safety timeout: ensure site is never blocked if video fails to load or play
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 11000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-center bg-[#00170F] overflow-hidden transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#003D25]/60 via-[#00170F]/90 to-[#00120B] pointer-events-none" />

      {/* Main Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleComplete}
          onError={handleComplete}
          className="w-full h-full object-contain max-w-7xl max-h-screen filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        />

        {/* Ambient Top & Bottom Edge Vignettes for Seamless Blending */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#00170F] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#00170F] via-[#00170F]/80 to-transparent pointer-events-none" />
      </div>

      {/* Top Right Controls: Sound Toggle & Skip */}
      <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
        <button
          type="button"
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md text-white/90 hover:text-white border border-white/15 transition-all shadow-lg"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#D6A84F]" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          type="button"
          onClick={handleComplete}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 hover:text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-lg hover:border-[#D6A84F]/60"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />
        </button>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="absolute bottom-6 inset-x-8 sm:inset-x-16 max-w-xl mx-auto z-20 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-heading font-semibold text-white/70 uppercase tracking-widest px-1">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse inline-block" />
            <span>Peshawers Real Estate</span>
          </span>
          <span className="text-[#D6A84F] font-bold">{Math.round(progress)}%</span>
        </div>

        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#D6A84F] via-[#FFD778] to-[#D6A84F] transition-all duration-150 ease-out rounded-full shadow-[0_0_12px_rgba(214,168,79,0.8)]"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
