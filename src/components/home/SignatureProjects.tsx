import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Video, Calendar, ShieldCheck } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { AnimatedSection } from '../common/AnimatedSection';

export const SignatureProjects: React.FC = () => {
  const { projects } = useData();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle architectural background detail — neutral warm accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#F8F6EA] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D6A84F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F8F6EA] text-[#064E3B] border border-gray-200 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
            <span>Master-Planned Developments</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] tracking-tight uppercase mb-4">
            Our Signature <span className="text-[#D6A84F]">Developments</span>
          </h2>

          <div className="w-24 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />

          <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed">
            Explore thoughtfully planned residential developments in Peshawar and the beautiful region of Swat.
          </p>
        </AnimatedSection>

        {/* 4 Signature Developments — Seamless No-Card Architectural Showcase */}
        <AnimatedSection stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const buildingImage =
              project.renderBuildingImage || `/assets/buildings/building-${index + 1}.png`;

            return (
              <div
                key={project.id}
                className="flex flex-col group transition-all duration-300"
              >
                {/* ── Seamless Grounded Building Stage (No Borders, No Card Box) ── */}
                <div
                  className="relative w-full flex items-end justify-center"
                  style={{
                    height: '350px',
                  }}
                >
                  {/* Soft ambient ground contact shadow */}
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none">
                    <div
                      style={{
                        width: '92%',
                        height: '28px',
                        background:
                          'radial-gradient(ellipse at center, rgba(15,23,42,0.38) 0%, rgba(15,23,42,0.08) 60%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(5px)',
                      }}
                    />
                  </div>

                  {/* Direct Contact Ground Line */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                    <div
                      style={{
                        width: '78%',
                        height: '14px',
                        background:
                          'radial-gradient(ellipse at center, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.18) 60%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(3px)',
                      }}
                    />
                  </div>

                  {/* Building Image (Prominent & Uniformly Scaled) */}
                  <div className="relative z-10 flex items-end justify-center w-full px-1" style={{ paddingBottom: '8px' }}>
                    <img
                      src={buildingImage}
                      alt={project.name}
                      className="object-contain w-auto group-hover:scale-106 transition-transform duration-500"
                      style={{
                        height: '320px',
                        maxHeight: '320px',
                        maxWidth: '100%',
                        filter:
                          'drop-shadow(0 18px 34px rgba(15,23,42,0.25)) drop-shadow(0 2px 8px rgba(0,0,0,0.12))',
                      }}
                    />
                  </div>

                  {/* Project Specific Badges */}
                  {project.slug === 'town-garden' && (
                    <div className="absolute top-2 right-2 z-20 bg-[#022C22] text-[#E6C678] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md border border-[#D6A84F]/40">
                      <Video className="w-3 h-3 text-[#D6A84F]" />
                      <span>Exclusive Video</span>
                    </div>
                  )}
                  {project.slug === 'glamorous-heights' && (
                    <div className="absolute top-2 right-2 z-20 bg-[#064E3B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md border border-[#D6A84F]/40">
                      <Calendar className="w-3 h-3 text-[#D6A84F]" />
                      <span>5-Yr Plan</span>
                    </div>
                  )}
                </div>

                {/* ── Clean Content Area (Seamless, Simple, No Border) ── */}
                <div className="flex flex-col flex-1 pt-4 text-center items-center">
                  {/* Location */}
                  <div className="flex items-center text-xs text-[#064E3B] font-bold mb-1.5">
                    <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-[#D6A84F]" />
                    <span>{project.city || project.location.split(',')[0]}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-heading text-lg font-black text-[#102A24] mb-2 group-hover:text-[#064E3B] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2 max-w-xs">
                    {project.tagline}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="w-full max-w-[240px] py-2.5 px-4 rounded-xl bg-white hover:bg-[#064E3B] text-[#064E3B] hover:text-white border border-[#064E3B]/20 hover:border-[#064E3B] text-xs font-heading font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md group/btn"
                  >
                    <span>Explore {project.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
};
