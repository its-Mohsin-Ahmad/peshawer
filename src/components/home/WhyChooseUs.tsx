import React from 'react';
import { ShieldCheck, Award, FileCheck2, Headset, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Institutional Due Diligence',
      description:
        'Every listed property and signature development undergoes rigorous verification of title deeds, TMA approvals, and legal permissions.',
    },
    {
      icon: FileCheck2,
      title: '100% Transparent Installments',
      description:
        'Zero hidden charges. Clear 5-year installment plans where every single rupee is mathematically accounted for from booking to keys possession.',
    },
    {
      icon: Award,
      title: 'Exclusive Signature Architecture',
      description:
        'We develop and market iconic projects like Glamorous Heights and Town Garden that establish new benchmarks in aesthetics and engineering.',
    },
    {
      icon: Headset,
      title: 'Dedicated Senior Advisory',
      description:
        'Direct consultation with real estate specialists and architectural directors who understand both urban Peshawar and the high-yield tourism dynamics of Swat.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image Card with architectural overlay */}
          <AnimatedSection variant="fadeRight" className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/assets/pages/why-choose-us.jpg"
                alt="PESHAWER REAL ESTATE Excellence"
                className="w-full h-[450px] sm:h-[520px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022C22] via-transparent to-transparent opacity-80" />

              {/* Floating verified badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#064E3B] flex items-center justify-center text-[#D6A84F] shrink-0 font-bold text-xl">
                  ★
                </div>
                <div>
                  <div className="font-heading font-extrabold text-[#022C22] text-sm uppercase">
                    Trusted by Investors Nationwide
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Transparent bookings, verifiable approvals & scheduled possession
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold accent border element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-4 border-l-4 border-[#D6A84F] rounded-bl-3xl pointer-events-none -z-10" />
          </AnimatedSection>

          {/* Right: Content & Value Props */}
          <AnimatedSection variant="fadeLeft" className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
                Why Partner With Us
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] tracking-tight uppercase leading-tight mb-4">
                Setting New Standards in <span className="text-[#D6A84F]">Pakistani Real Estate</span>
              </h2>
              <div className="w-20 h-1 bg-[#D6A84F] rounded-full mb-6" />
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                PESHAWER REAL ESTATE was established to eliminate ambiguity, fraudulent claims, and
                undocumented promises from property acquisition. We bridge international standards
                with local cultural values.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F8F6EA]/60 border border-gray-100 hover:border-[#D6A84F]/40 transition-all hover:bg-[#ECFDF5]/50 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-[#102A24] mb-1.5 group-hover:text-[#064E3B] transition-colors">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

