import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { useData } from '../../contexts/DataContext';
import { MapPin, ArrowRight, Video, Calendar, ShieldCheck } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useData();

  return (
    <div className="bg-[#F8F6EA]/40 min-h-screen">
      <PageHero
        title="Our Signature Developments"
        subtitle="Explore master-planned residential developments in Peshawar and the scenic alpine destination of Kalam, Swat."
        image="/assets/hero/slide2.jpg"
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual side (5 cols) — Clean Studio Presentation (No Greenish Theme) */}
                <div
                  className={`lg:col-span-5 relative overflow-hidden flex items-end justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                  style={{
                    minHeight: '330px',
                    background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)',
                  }}
                >
                  {/* Studio ambient glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.95) 0%, transparent 75%)' }}
                  />

                  {/* Ground base platform / sidewalk */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-4"
                    style={{ background: 'linear-gradient(180deg, #CBD5E1 0%, #94A3B8 100%)', zIndex: 2 }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1.5"
                    style={{ background: 'linear-gradient(180deg, #E2E8F0 0%, #CBD5E1 100%)', zIndex: 3 }}
                  />

                  {/* Ground plane shadow */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center" style={{ zIndex: 1 }}>
                    <div
                      style={{
                        width: '85%',
                        height: '24px',
                        background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.06) 60%, transparent 100%)',
                        borderRadius: '50%',
                        filter: 'blur(3px)',
                        marginBottom: '-4px',
                      }}
                    />
                  </div>

                  {/* Contact shadow under building */}
                  <div className="absolute z-10 flex justify-center" style={{ bottom: '12px', left: 0, right: 0 }}>
                    <div
                      style={{
                        width: '72%',
                        height: '14px',
                        background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.40) 0%, rgba(15,23,42,0.12) 60%, transparent 100%)',
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
                        maxHeight: '275px',
                        maxWidth: '96%',
                        filter: 'drop-shadow(0 14px 28px rgba(15,23,42,0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
                        transform: 'perspective(700px) rotateX(1deg)',
                      }}
                    />
                  </div>

                  {project.slug === 'town-garden' && (
                    <div className="absolute top-4 left-4 z-30 bg-[#022C22] text-[#E6C678] text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <Video className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>Dedicated Video Walkthrough</span>
                    </div>
                  )}

                  {project.slug === 'glamorous-heights' && (
                    <div className="absolute top-4 left-4 z-30 bg-[#064E3B] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
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
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[#047857] mb-2">
                      <MapPin className="w-4 h-4 text-[#D6A84F]" />
                      <span>{project.location}</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#022C22] uppercase tracking-tight mb-4">
                      {project.name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Highlights list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {project.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-[#102A24]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm"
                    >
                      <span>Explore {project.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {project.apartments && project.apartments.length > 0 && (
                      <Link
                        to={`/projects/${project.slug}#payment-plans`}
                        className="px-6 py-3 rounded-xl bg-[#F8F6EA] hover:bg-[#ECFDF5] text-[#064E3B] font-heading font-bold text-xs uppercase tracking-wider transition-all"
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

