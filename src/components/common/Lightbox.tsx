import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const nextImage = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none">
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          {title && <span className="font-heading font-bold text-sm mr-3">{title}</span>}
          <span className="text-xs text-gray-400 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image container */}
      <div className="relative max-w-6xl max-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Preview ${currentIndex + 1}`}
          className={`max-w-full max-h-[80vh] object-contain transition-all duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Thumbnails strip at bottom */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2 px-4 overflow-x-auto py-2 z-20">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsZoomed(false);
              setCurrentIndex(idx);
            }}
            className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
              idx === currentIndex
                ? 'border-[#D6A84F] scale-105 opacity-100'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

