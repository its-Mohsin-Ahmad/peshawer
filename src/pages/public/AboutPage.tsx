import React from 'react';
import { PageHero } from '../../components/common/PageHero';
import { ShieldCheck, Target, Eye, Compass, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmeraldWaveBackground } from '../../components/common/EmeraldWaveBackground';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#002D1C] min-h-screen text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#004B2E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Unique About Hero image */}
      <PageHero
        title="About PESHAWER REAL ESTATE"
        subtitle="Setting new benchmarks in architectural integrity, verified property legalities, and signature living in Khyber Pakhtunkhwa."
        image="/assets/pages/about-hero.jpg"
        breadcrumbs={[{ label: 'About Us' }]}
        ctaPrimaryText="Contact Our Advisory"
        ctaPrimaryLink="/contact"
        ctaSecondaryText="Explore Developments"
        ctaSecondaryLink="/projects"
      />

      {/* Introduction & Vision */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] block mb-2">
                Our Foundation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
                Redefining The Real Estate <span className="text-[#FFC83D]">Experience</span>
              </h2>
              <div className="w-20 h-1 bg-[#FFC83D] rounded-full mb-6 shadow-[0_0_12px_rgba(255,200,61,0.5)]" />

              <div className="space-y-4 text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed font-normal">
                <p>
                  PESHAWER REAL ESTATE was established to address the critical need for verifiable
                  transparency, institutional standards, and architectural refinement in Pakistan’s
                  northern real estate landscape.
                </p>
                <p>
                  Specializing in premier residential sectors of Peshawar and the high-yield alpine
                  destinations of Swat and Kalam, we operate at the intersection of design excellence,
                  verified civic approvals, and flexible 5-year installment plans.
                </p>
                <p>
                  Every property listed on our platform and every signature project we develop
                  undergoes rigorous legal and architectural scrutiny, ensuring peace of mind for both
                  local families and overseas Pakistani investors.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E6AA27]/40 bg-[#003D25]">
                <img
                  src="/assets/projects/town-garden/hero.png"
                  alt="Architecture Philosophy"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#003D25] border border-[#FFC83D]/40 text-white shadow-2xl max-w-xs hidden sm:block backdrop-blur-md">
                <div className="font-heading font-extrabold text-2xl text-[#FFC83D] mb-1">
                  100%
                </div>
                <div className="text-xs text-[#E8F3EC]/80">
                  Documented verification across title deeds, approvals, and physical construction milestones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-24 bg-[#003D25]/70 border-y border-[#E6AA27]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#002D1C] p-8 rounded-3xl border border-[#E6AA27]/25 shadow-xl flex flex-col justify-between hover:border-[#E6AA27]/60 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#003D25] border border-[#FFC83D]/30 text-[#FFC83D] flex items-center justify-center mb-6 shadow-sm">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-3">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-[#E8F3EC]/75 leading-relaxed">
                  To become Pakistan’s most trustworthy and design-driven real estate platform,
                  recognized internationally for transparent pricing, customer protection, and landmark
                  developments.
                </p>
              </div>
            </div>

            <div className="bg-[#002D1C] p-8 rounded-3xl border border-[#E6AA27]/25 shadow-xl flex flex-col justify-between hover:border-[#E6AA27]/60 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#003D25] border border-[#FFC83D]/30 text-[#FFC83D] flex items-center justify-center mb-6 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-3">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-[#E8F3EC]/75 leading-relaxed">
                  To empower buyers and investors with fully verified property information, mathematically
                  sound installment schedules, and premium architectural residences that elevate living standards.
                </p>
              </div>
            </div>

            <div className="bg-[#002D1C] p-8 rounded-3xl border border-[#E6AA27]/25 shadow-xl flex flex-col justify-between hover:border-[#E6AA27]/60 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#003D25] border border-[#FFC83D]/30 text-[#FFC83D] flex items-center justify-center mb-6 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide mb-3">
                  Core Values
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#E8F3EC]/80">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC83D]" />
                    <span>Absolute Documentation Integrity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC83D]" />
                    <span>No Fabricated or Inflated Pricing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC83D]" />
                    <span>Architectural & Structural Excellence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC83D]" />
                    <span>Timely Handover & Clear Title Transfer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Information Standards */}
      <section className="py-24 bg-[#002D1C] relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-14 h-14 text-[#FFC83D] mx-auto mb-4" />
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
            Our Property Information <span className="text-[#FFC83D]">Standards</span>
          </h2>
          <div className="w-20 h-1 bg-[#FFC83D] mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(255,200,61,0.5)]" />
          <p className="text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            We adhere to a strict policy: we never fabricate property information, prices, approvals,
            availability, reviews, or statistics. What you see on this platform represents documented
            reality.
          </p>

          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            Speak With A Property Advisor
          </Link>
        </div>
      </section>
    </div>
  );
};

