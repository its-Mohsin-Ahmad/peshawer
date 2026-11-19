import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LaunchPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchPosterModal: React.FC<LaunchPosterModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scroll while poster is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const posterSrc = `${import.meta.env.BASE_URL}assets/promotions/islamabad-launch-poster.jpg`;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/20 transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Special Announcement Poster"
    >
      {/* Poster Container */}
      <div
        className="relative max-w-[92vw] sm:max-w-[420px] max-h-[90vh] flex flex-col items-center animate-in zoom-in-95 duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Circular Cross Icon (Top Right Floating) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close Announcement"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#002D1C] hover:bg-[#004B2E] text-[#FFC83D] border-2 border-[#FFC83D] shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(255,200,61,0.5)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Poster Image Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#FFC83D]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,200,61,0.3)] bg-transparent">
          <img
            src={posterSrc}
            alt="Something Big is Coming in Islamabad - Peshawars.com Real Estate"
            className="w-full h-auto max-h-[85vh] object-contain block select-none pointer-events-auto"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};
