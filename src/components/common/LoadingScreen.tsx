import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Logo smooth fade in and subtle scale-up
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92, filter: 'drop-shadow(0 0 0px rgba(230, 198, 120, 0))' },
        {
          opacity: 1,
          scale: 1,
          filter: 'drop-shadow(0 8px 30px rgba(230, 198, 120, 0.45))',
          duration: 1.1,
          ease: 'power3.out',
        },
        0.1
      );

      // 2. Warm golden glow behind the logo
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0.2
      );

      // 3. Thin horizontal golden light flare illuminates from center outward
      tl.fromTo(
        flareRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.4
      );

      // 4. Subtle shimmer flare pulse
      tl.to(
        flareRef.current,
        {
          opacity: 0.85,
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        '-=0.2'
      );

      // 5. Complete and trigger smooth fadeout
      tl.add(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (onLoaded) onLoaded();
        }, 600);
      }, '+=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-opacity duration-600 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #00452D 0%, #003D27 50%, #002417 100%)',
      }}
    >
      {/* Subtle warm golden ambient glow behind logo */}
      <div
        ref={glowRef}
        className="absolute w-[360px] sm:w-[540px] md:w-[700px] h-[160px] sm:h-[220px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(230, 198, 120, 0.22) 0%, rgba(214, 168, 79, 0.08) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main Logo & Light Flare Container */}
      <div className="relative flex flex-col items-center justify-center max-w-[92vw] sm:max-w-[70vw] md:max-w-[580px] lg:max-w-[640px] px-4">
        {/* The Original Gold PESHAWER Logo */}
        <div className="relative flex items-center justify-center w-full">
          <img
            ref={logoRef}
            src="/assets/peshawer-gold-logo.png"
            alt="PESHAWER REAL ESTATE"
            className="w-full h-auto object-contain max-h-[260px] sm:max-h-[320px] md:max-h-[380px]"
          />
        </div>

        {/* Thin Horizontal Golden Light Flare directly beneath the logo */}
        <div
          ref={flareRef}
          className="relative mt-4 sm:mt-5 w-[80%] sm:w-[88%] md:w-[100%] h-[2.5px] rounded-full origin-center pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(214, 168, 79, 0.25) 20%, #FFF2B2 50%, rgba(214, 168, 79, 0.25) 80%, transparent 100%)',
            boxShadow: '0 0 16px 2px rgba(247, 219, 137, 0.75), 0 0 30px 4px rgba(214, 168, 79, 0.4)',
          }}
        />
      </div>
    </div>
  );
};
