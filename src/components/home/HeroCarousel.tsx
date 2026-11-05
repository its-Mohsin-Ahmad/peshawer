import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play, Shield, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const HeroCarousel: React.FC = () => {
  const { heroSlides } = useData();
  const activeSlides = heroSlides.filter((s) => s.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = activeSlides.length || 1;

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setProgressKey((k) => k + 1);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total, currentIndex]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgressKey((k) => k + 1);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgressKey((k) => k + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgressKey((k) => k + 1);
  };

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex];

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden bg-[#0A0D10] select-none text-white"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image — object-cover with natural colors (no green cast) */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out brightness-[0.92] contrast-[1.05] ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>

            {/* Clean Neutral Cinematic Charcoal Gradients — removes green cast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center pb-12 sm:pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                {/* Left Text Column (8 cols) */}
                <div className="lg:col-span-8 max-w-2xl">
                  {/* Clean Modern Architectural Badge */}
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D6A84F]/50 text-[#D6A84F] text-xs font-bold uppercase tracking-widest mb-5 backdrop-blur-md shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>PESHAWER REAL ESTATE • ELITE LIVING</span>
                  </div>

                  {/* Main Heading */}
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5 uppercase drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-gray-200 max-w-xl font-normal leading-relaxed mb-8 drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5">
                    <Link
                      to={slide.ctaPrimaryLink}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B88628] hover:from-[#E6C678] hover:to-[#D6A84F] text-[#0A0D10] font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>{slide.ctaPrimaryText}</span>
                      <ArrowRight className="w-4 h-4 text-[#0A0D10]" />
                    </Link>

                    <Link
                      to={slide.ctaSecondaryLink}
                      className="px-7 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-white border border-white/30 hover:border-white/60 backdrop-blur-md font-heading font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      {slide.ctaSecondaryText}
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Highlights Pill on Desktop (4 cols) */}
                <div className="hidden lg:flex lg:col-span-4 flex-col space-y-3 justify-end items-end">
                  <div className="bg-black/55 backdrop-blur-md border border-white/15 p-5 rounded-2xl max-w-xs shadow-2xl space-y-3 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[11px] font-bold text-[#D6A84F] uppercase tracking-wider">
                        Featured Milestone
                      </span>
                      <span className="text-[11px] font-mono text-white/60">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2 text-white/90">
                        <Shield className="w-4 h-4 text-[#D6A84F] shrink-0" />
                        <span>100% TMA & LDA Approved Master Plans</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/90">
                        <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0" />
                        <span>Peshawar Enclaves & Kalam Alpine Heights</span>
                      </div>
                    </div>

                    <Link
                      to="/projects"
                      className="text-[11px] font-bold text-[#D6A84F] hover:text-white flex items-center space-x-1 pt-1 transition-colors"
                    >
                      <span>Explore 4 Signature Projects</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Bar: Slide Selector Tabs & Timer */}
      <div className="absolute bottom-5 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Slide Indicators / Tabs */}
        <div className="flex items-center space-x-2">
          {activeSlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-10 bg-[#D6A84F]'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              title={slide.title}
            />
          ))}
        </div>

        {/* Autoplay status & slide count */}
        <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors"
            title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#D6A84F]" /> : <Play className="w-3.5 h-3.5 text-[#D6A84F]" />}
          </button>
          <span className="text-[11px] font-mono text-[#D6A84F] font-bold">
            {String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Top Animated Progress Timer Line */}
      {isPlaying && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
          <div
            key={progressKey}
            className="h-full bg-gradient-to-r from-[#D6A84F] via-[#E6C678] to-[#B88628] animate-progress"
            style={{
              animation: 'linearProgress 6000ms linear forwards',
            }}
          />
        </div>
      )}

      {/* Inline Keyframes for Progress Bar */}
      <style>{`
        @keyframes linearProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
