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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight mb-3">
            Voices of <span className="text-[#D6A84F]">Trust</span>
          </h2>
          <div className="w-16 h-1 bg-[#D6A84F] mx-auto rounded-full" />
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#F8F6EA]/70 rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-premium">
          <Quote className="w-16 h-16 text-[#D6A84F]/30 absolute top-8 left-8 -z-0" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex items-center space-x-1 text-[#D6A84F] mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D6A84F]" />
              ))}
            </div>

            {/* Feedback Quote */}
            <p className="font-heading text-lg sm:text-2xl text-[#102A24] font-medium leading-relaxed max-w-3xl mb-8 italic">
              "{current.feedback}"
            </p>

            {/* Author Info */}
            <div>
              <div className="font-heading font-extrabold text-base text-[#022C22] uppercase tracking-wider">
                {current.name}
              </div>
              <div className="text-xs text-[#047857] font-semibold mt-0.5">
                {current.role} • {current.projectName}
              </div>
            </div>

            {/* Controls */}
            {approved.length > 1 && (
              <div className="flex items-center space-x-3 mt-8">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-white hover:bg-[#064E3B] text-[#064E3B] hover:text-white border border-gray-200 transition-colors shadow-sm"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#64748B] font-mono">
                  {currentIndex + 1} / {approved.length}
                </span>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-white hover:bg-[#064E3B] text-[#064E3B] hover:text-white border border-gray-200 transition-colors shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

