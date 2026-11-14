import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollEnhancements: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setScrollProgress(progress);
          }

          setShowScrollTop(currentScroll > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // SVG Circle calculation for back-to-top button
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* ─── 1. Luxury Golden Liquid Scroll Progress Beam at the top ─── */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999999] h-[3px] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Glow backdrop line */}
        <div
          className="h-full bg-gradient-to-r from-[#003D25] via-[#FFC83D] to-[#FFF6D6] transition-transform duration-100 ease-out origin-left will-change-transform shadow-[0_0_12px_rgba(255,200,61,0.85)]"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
          }}
        />

        {/* Dynamic bright spark at the leading head of the scroll beam */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div
            className="absolute top-0 h-[3px] w-8 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none transition-all duration-100 ease-out filter drop-shadow-[0_0_8px_#FFFFFF]"
            style={{
              left: `${scrollProgress}%`,
            }}
          />
        )}
      </div>

      {/* ─── 2. Floating Emerald & Gold Scroll-to-Top Capsule with Circular Gauge ─── */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 transform ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll smoothly to top"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#002D1C]/90 hover:bg-[#003D25] text-[#FFC83D] hover:text-white backdrop-blur-md border border-[#FFC83D]/40 hover:border-[#FFC83D] shadow-[0_8px_25px_rgba(0,45,28,0.6),0_0_15px_rgba(255,200,61,0.25)] hover:shadow-[0_8px_30px_rgba(0,45,28,0.8),0_0_25px_rgba(255,200,61,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Radial progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-[#004B2E]/60"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="url(#goldProgressGrad)"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-150 ease-out"
            />
            <defs>
              <linearGradient id="goldProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6AA27" />
                <stop offset="50%" stopColor="#FFC83D" />
                <stop offset="100%" stopColor="#FFF8DB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Golden Arrow with hover spring */}
          <ArrowUp className="w-5 h-5 text-[#FFC83D] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />

          {/* Tooltip on hover */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#001D13] text-[#FFC83D] text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-[#FFC83D]/30 shadow-lg whitespace-nowrap">
            {Math.round(scrollProgress)}% Top
          </span>
        </button>
      </div>
    </>
  );
};
