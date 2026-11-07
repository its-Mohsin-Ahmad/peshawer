import React from 'react';

interface EmeraldWaveBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
}

/**
 * Architectural Emerald-Green & Gold Flowing Waves SVG Background
 * Faithfully matches the uploaded reference:
 * - Deep emerald green base (#002D1C -> #003D25)
 * - Layered abstract green waves (#004B2E, #006B40, #087B4B)
 * - Flowing golden ribbon accent lines (#E6AA27, #FFC83D)
 * - Soft ambient light glows
 */
export const EmeraldWaveBackground: React.FC<EmeraldWaveBackgroundProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Base radial and linear emerald depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            intensity === 'deep'
              ? 'radial-gradient(circle at 50% 20%, #004B2E 0%, #003D25 45%, #002D1C 100%)'
              : 'radial-gradient(ellipse at 50% 0%, #004B2E 0%, #003D25 50%, #002D1C 100%)',
        }}
      />

      {/* SVG Layered Curved Waves and Golden Curving Strokes */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#087B4B" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#006B40" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#003D25" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="wave2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#004B2E" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#002D1C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#002417" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="goldLineGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E6AA27" stopOpacity="0.05" />
            <stop offset="25%" stopColor="#FFC83D" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#E6AA27" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#DDB65A" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="goldLineGrad2" x1="100%" y1="20%" x2="0%" y2="80%">
            <stop offset="0%" stopColor="#FFC83D" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#E6AA27" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E6AA27" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="emeraldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#087B4B" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#006B40" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#002D1C" stopOpacity="0.7" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Wave Layer 1: Left high curve sweeping down to right */}
        <path
          d="M-100 120 C 320 80, 580 340, 1540 280 L 1540 900 L -100 900 Z"
          fill="url(#wave1Grad)"
        />

        {/* Wave Layer 2: Deeper undulating wave across bottom-half */}
        <path
          d="M-100 480 C 280 360, 720 620, 1540 440 L 1540 900 L -100 900 Z"
          fill="url(#wave2Grad)"
        />

        {/* Wave Layer 3: Top-left emerald ribbon curve */}
        <path
          d="M-50 -50 C 400 100, 700 20, 1100 180 L 1100 -50 Z"
          fill="url(#emeraldRibbon)"
        />

        {/* Golden Ribbon Line 1 — Upper graceful arc matching reference image */}
        <path
          d="M-80 180 C 260 110, 680 380, 1520 260"
          stroke="url(#goldLineGrad1)"
          strokeWidth="2.5"
          filter="url(#softGlow)"
        />

        {/* Golden Ribbon Line 2 — Secondary sweeping wave */}
        <path
          d="M-40 460 C 380 320, 840 560, 1500 420"
          stroke="url(#goldLineGrad2)"
          strokeWidth="2"
          filter="url(#softGlow)"
        />

        {/* Golden Ribbon Line 3 — Delicate bottom accent */}
        <path
          d="M100 680 C 500 620, 920 720, 1480 640"
          stroke="url(#goldLineGrad1)"
          strokeWidth="1.25"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Atmospheric lighting orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(8, 123, 75, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(230, 170, 39, 0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
};

