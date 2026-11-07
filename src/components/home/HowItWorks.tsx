import React from 'react';
import { Search, FileSpreadsheet, MapPin, KeyRound, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover Properties & Projects',
      description:
        'Explore our verified property marketplace or examine our 4 signature master developments in Peshawar and Kalam.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Review Verified Payment Plans',
      description:
        'Inspect itemized 5-year installment schedules with clear booking fees, monthly tranches, and possession milestones.',
      icon: FileSpreadsheet,
    },
    {
      number: '03',
      title: 'Schedule a Guided Site Visit',
      description:
        'Tour the location in person or examine the Town Garden architectural walkthrough video to verify on-ground reality.',
      icon: MapPin,
    },
    {
      number: '04',
      title: 'Secure Booking & Key Possession',
      description:
        'Complete verified legal documentation with institutional approval records and receive physical handover on time.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-24 bg-[#003D25] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#006B40] rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] block mb-2">
            Seamless Four-Step Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
            How The Platform <span className="text-[#FFC83D]">Works</span>
          </h2>
          <div className="w-20 h-1 bg-[#E6AA27] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(230,170,39,0.5)]" />
          <p className="text-sm sm:text-base text-[#E8F3EC]/85">
            A transparent and structured pathway from your initial discovery to registered property ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#002D1C]/80 border border-[#E6AA27]/25 hover:border-[#FFC83D]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl font-black text-[#E6AA27]/40 group-hover:text-[#FFC83D] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#004B2E] text-[#FFC83D] flex items-center justify-center border border-[#E6AA27]/30 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-[#FFC83D] transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#E8F3EC]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

