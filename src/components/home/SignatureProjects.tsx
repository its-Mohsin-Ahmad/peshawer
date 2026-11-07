import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Video, Calendar, ShieldCheck } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { AnimatedSection } from '../common/AnimatedSection';
import { EmeraldWaveBackground } from '../common/EmeraldWaveBackground';

export const SignatureProjects: React.FC = () => {
  const { projects } = useData();

  return (
    <section className="py-24 bg-[#003D25] text-white relative overflow-hidden">
      {/* Dynamic Emerald Green & Gold Curving Waves Background */}
      <EmeraldWaveBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#002D1C]/80 border border-[#E6AA27]/50 text-[#FFC83D] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#FFC83D]" />
            <span>Master-Planned Developments</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4 drop-shadow-sm">
            Our Signature <span className="text-[#FFC83D]">Developments</span>
          </h2>

          <div className="w-24 h-1 bg-[#E6AA27] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(230,170,39,0.5)]" />

          <p className="text-base sm:text-lg text-[#E8F3EC] font-normal leading-relaxed max-w-2xl mx-auto">
            Explore thoughtfully planned residential developments in Peshawar and the beautiful region of Swat.
          </p>
        </AnimatedSection>

        {/* 4 Signature Developments — Seamless Showcase */}
        <AnimatedSection stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const buildingImage =
              project.renderBuildingImage || `/assets/buildings/building-${index + 1}.png`;

            return (
              <div
                key={project.id}
                className="flex flex-col group transition-all duration-300"
              >
                {/* ── Seamless Grounded Building Stage ── */}
                <div
                  className="relative w-full flex items-end justify-center"
                  style={{
                    height: '350px',
                  }}
                >
                  {/* Ground contact shadow */}
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none">
                    <div
                      style={{
                        width: '92%',
                        height: '28px',
                        background:
                          'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(5px)',
                      }}
                    />
                  </div>

                  {/* Building Image */}
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
                          'drop-shadow(0 20px 35px rgba(0,0,0,0.45)) drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
                      }}
                    />
                  </div>

                  {/* Project Specific Badges */}
                  {project.slug === 'town-garden' && (
                    <div className="absolute top-2 right-2 z-20 bg-[#002D1C] text-[#FFC83D] text-[10px] font-bold px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-md border border-[#E6AA27]/60 backdrop-blur-sm">
                      <Video className="w-3 h-3 text-[#FFC83D]" />
                      <span>Exclusive Video</span>
                    </div>
                  )}
                  {project.slug === 'glamorous-heights' && (
                    <div className="absolute top-2 right-2 z-20 bg-[#004B2E] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-md border border-[#E6AA27]/60 backdrop-blur-sm">
                      <Calendar className="w-3 h-3 text-[#FFC83D]" />
                      <span>5-Yr Plan</span>
                    </div>
                  )}
                </div>

                {/* ── Content Area ── */}
                <div className="flex flex-col flex-1 pt-4 text-center items-center">
                  {/* Location */}
                  <div className="flex items-center text-xs text-[#E6AA27] font-bold mb-1.5">
                    <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-[#FFC83D]" />
                    <span>{project.city || project.location.split(',')[0]}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-heading text-lg font-black text-white mb-2 group-hover:text-[#FFC83D] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-[#E8F3EC]/80 leading-relaxed mb-4 line-clamp-2 max-w-xs">
                    {project.tagline}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="w-full max-w-[240px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#004B2E] to-[#002D1C] hover:from-[#E6AA27] hover:to-[#B88628] text-white hover:text-[#002D1C] border border-[#E6AA27]/40 text-xs font-heading font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group/btn"
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
