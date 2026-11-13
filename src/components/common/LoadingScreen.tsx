import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const videoSrc = `${import.meta.env.BASE_URL}assets/loading-video.mp4`;

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
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    // Safety timeout — never block the site if video fails
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000',
        overflow: 'hidden',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.7s ease-in-out',
      }}
    >
      {/* Video scaled to always fill the screen on any aspect ratio */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={handleComplete}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          /* Translate to center */
          transform: 'translate(-50%, -50%)',
          /* Always cover full viewport regardless of aspect ratio */
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
        }}
      />

      {/* Very subtle dark vignette around edges — blends video into screen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
};
