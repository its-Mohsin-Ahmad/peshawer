import React from 'react';
import { PageHero } from '../../components/common/PageHero';
import { ShieldCheck, Target, Eye, Compass, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
                Our Foundation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] uppercase tracking-tight mb-4">
                Redefining The Real Estate <span className="text-[#D6A84F]">Experience</span>
              </h2>
              <div className="w-20 h-1 bg-[#D6A84F] rounded-full mb-6" />

              <div className="space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed">
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
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/assets/projects/town-garden/hero.png"
                  alt="Architecture Philosophy"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#064E3B] text-white shadow-xl max-w-xs hidden sm:block">
                <div className="font-heading font-extrabold text-2xl text-[#E6C678] mb-1">
                  100%
                </div>
                <div className="text-xs text-[#ECFDF5]/80">
                  Documented verification across title deeds, approvals, and physical construction milestones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-24 bg-[#F8F6EA]/60 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#022C22] uppercase tracking-wide mb-3">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  To become Pakistan’s most trustworthy and design-driven real estate platform,
                  recognized internationally for transparent pricing, customer protection, and landmark
                  developments.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#022C22] uppercase tracking-wide mb-3">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  To empower buyers and investors with fully verified property information, mathematically
                  sound installment schedules, and premium architectural residences that elevate living standards.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#022C22] uppercase tracking-wide mb-3">
                  Core Values
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857]" />
                    <span>Absolute Documentation Integrity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857]" />
                    <span>No Fabricated or Inflated Pricing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857]" />
                    <span>Architectural & Structural Excellence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857]" />
                    <span>Timely Handover & Clear Title Transfer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Information Standards */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-14 h-14 text-[#064E3B] mx-auto mb-4" />
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight mb-4">
            Our Property Information Standards
          </h2>
          <div className="w-20 h-1 bg-[#D6A84F] mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto mb-10">
            We adhere to a strict policy: we never fabricate property information, prices, approvals,
            availability, reviews, or statistics. What you see on this platform represents documented
            reality.
          </p>

          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Speak With A Property Advisor
          </Link>
        </div>
      </section>
    </div>
  );
};

