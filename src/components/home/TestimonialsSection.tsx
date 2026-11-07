import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();
  const approved = testimonials.filter((t) => t.approved);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (approved.length === 0) return null;

  const current = approved[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % approved.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + approved.length) % approved.length);

  return (
    <section className="py-24 bg-[#002D1C] text-white relative overflow-hidden border-t border-[#E6AA27]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] block mb-2">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
            Voices of <span className="text-[#FFC83D]">Trust</span>
          </h2>
          <div className="w-16 h-1 bg-[#E6AA27] mx-auto rounded-full shadow-[0_0_10px_rgba(230,170,39,0.5)]" />
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#003D25]/90 rounded-3xl p-8 sm:p-12 border border-[#E6AA27]/30 shadow-2xl backdrop-blur-md">
          <Quote className="w-16 h-16 text-[#E6AA27]/20 absolute top-8 left-8 -z-0" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex items-center space-x-1 text-[#FFC83D] mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFC83D]" />
              ))}
            </div>

            {/* Feedback Quote */}
            <p className="font-heading text-lg sm:text-2xl text-white font-medium leading-relaxed max-w-3xl mb-8 italic">
              "{current.feedback}"
            </p>

            {/* Author Info */}
            <div>
              <div className="font-heading font-extrabold text-base text-[#FFC83D] uppercase tracking-wider">
                {current.name}
              </div>
              <div className="text-xs text-[#E8F3EC]/70 font-semibold mt-0.5">
                {current.role} • {current.projectName}
              </div>
            </div>

            {/* Controls */}
            {approved.length > 1 && (
              <div className="flex items-center space-x-3 mt-8">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-[#004B2E] border border-[#E6AA27]/40 text-[#FFC83D] hover:bg-[#E6AA27] hover:text-[#002D1C] transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-[#E8F3EC]/70">
                  {currentIndex + 1} / {approved.length}
                </span>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-[#004B2E] border border-[#E6AA27]/40 text-[#FFC83D] hover:bg-[#E6AA27] hover:text-[#002D1C] transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

