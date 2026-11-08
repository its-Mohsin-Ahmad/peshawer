import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { useData } from '../../contexts/DataContext';
import { MapPin, ArrowRight, Video, Calendar, ShieldCheck } from 'lucide-react';
import { EmeraldWaveBackground } from '../../components/common/EmeraldWaveBackground';

export const ProjectsPage: React.FC = () => {
  const { projects } = useData();

  return (
    <div className="bg-[#002D1C] min-h-screen relative overflow-hidden text-white">
      {/* Background architectural waves */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <EmeraldWaveBackground intensity="deep" />
      </div>

      <PageHero
        title="Our Signature Developments"
        subtitle="Explore master-planned residential developments in Peshawar and the scenic alpine destination of Kalam."
        image="/assets/hero/slide2.jpg"
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="space-y-16">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="bg-[#003D25]/90 rounded-3xl overflow-hidden border border-[#E6AA27]/30 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-[#E6AA27]/60 transition-all duration-300"
              >
                {/* Visual side (5 cols) — High contrast architectural showcase */}
                <div
                  className={`lg:col-span-5 relative overflow-hidden flex items-end justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                  style={{
                    minHeight: '340px',
                    background: 'linear-gradient(180deg, rgba(8,123,75,0.25) 0%, rgba(0,45,28,0.95) 100%)',
                  }}
                >
                  {/* Subtle golden ambient glow behind the building */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,200,61,0.18) 0%, transparent 70%)' }}
                  />

                  {/* Ground base platform / sidewalk */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-4"
                    style={{ background: 'linear-gradient(180deg, #004B2E 0%, #002D1C 100%)', zIndex: 2 }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: '#FFC83D', opacity: 0.5, zIndex: 3 }}
                  />

                  {/* Ground plane shadow */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center" style={{ zIndex: 1 }}>
                    <div
                      style={{
                        width: '85%',
                        height: '24px',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(4px)',
                        marginBottom: '-4px',
                      }}
                    />
                  </div>

                  {/* Contact shadow under building */}
                  <div className="absolute z-10 flex justify-center" style={{ bottom: '12px', left: 0, right: 0 }}>
                    <div
                      style={{
                        width: '75%',
                        height: '14px',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(3px)',
                      }}
                    />
                  </div>

                  {/* Building image — larger and clear */}
                  <div className="relative z-20 flex items-end justify-center w-full px-6" style={{ paddingBottom: '14px' }}>
                    <img
                      src={project.renderBuildingImage}
                      alt={project.name}
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      style={{
                        maxHeight: '280px',
                        maxWidth: '96%',
                        filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.5)) drop-shadow(0 0 16px rgba(255,200,61,0.15))',
                        transform: 'perspective(700px) rotateX(1deg)',
                      }}
                    />
                  </div>

                  {project.slug === 'town-garden' && (
                    <div className="absolute top-4 left-4 z-30 bg-[#002D1C]/90 border border-[#FFC83D]/50 text-[#FFC83D] text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                      <Video className="w-3.5 h-3.5 text-[#FFC83D]" />
                      <span>Dedicated Video Walkthrough</span>
                    </div>
                  )}

                  {project.slug === 'glamorous-heights' && (
                    <div className="absolute top-4 left-4 z-30 bg-[#002D1C]/90 border border-[#FFC83D]/50 text-[#FFC83D] text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                      <Calendar className="w-3.5 h-3.5 text-[#FFC83D]" />
                      <span>5-Year Easy Installments</span>
                    </div>
                  )}
                </div>

                {/* Content side (7 cols) */}
                <div
                  className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#FFC83D] mb-2 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-[#FFC83D]" />
                      <span>
                        {project.location
                          .replace(/Kalam,\s*S?wat/gi, 'Kalam')
                          .replace(/Kalam\s+S?wat/gi, 'Kalam')
                          .replace(/,\s*S?wat/gi, '')
                          .trim()}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
                      {project.name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Highlights list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {project.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-[#E8F3EC]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC83D]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg"
                    >
                      <span>Explore {project.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {project.apartments && project.apartments.length > 0 && (
                      <Link
                        to={`/projects/${project.slug}#payment-plans`}
                        className="px-6 py-3 rounded-xl bg-[#002D1C] hover:bg-[#004B2E] text-white border border-[#E6AA27]/40 hover:border-[#FFC83D] font-heading font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        <span>View Payment Plans</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

