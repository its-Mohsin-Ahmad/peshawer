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
    <section className="py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#064E3B] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D6A84F] block mb-2">
            Seamless Four-Step Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
            How The Platform <span className="text-[#D6A84F]">Works</span>
          </h2>
          <div className="w-20 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />
          <p className="text-sm sm:text-base text-[#ECFDF5]/80">
            A transparent and structured pathway from your initial discovery to registered property ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D6A84F]/50 transition-all hover:-translate-y-1 group"
              >
                {/* Number indicator */}
                <div className="text-3xl font-mono font-extrabold text-[#D6A84F]/40 group-hover:text-[#D6A84F] transition-colors mb-4">
                  {step.number}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#064E3B] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-heading text-base font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-[#ECFDF5]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

