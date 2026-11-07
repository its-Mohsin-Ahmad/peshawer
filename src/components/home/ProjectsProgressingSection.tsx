import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { HardHat, ArrowRight, Calendar, MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';
import { EmeraldWaveBackground } from '../common/EmeraldWaveBackground';

export const ProjectsProgressingSection: React.FC = () => {
  const { projects } = useData();

  // Filter published projects that have progress enabled
  const progressingProjects = projects.filter((p) => p.constructionProgressPublished !== false);

  if (progressingProjects.length === 0) return null;

  return (
    <section className="py-24 bg-[#002D1C] text-white relative overflow-hidden border-t border-b border-[#E6AA27]/20">
      <EmeraldWaveBackground intensity="deep" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#004B2E]/90 border border-[#E6AA27]/40 text-[#FFC83D] text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-4 h-4 text-[#FFC83D]" />
            <span>Real-Time Development Milestones</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
            Our Projects Are <span className="text-[#FFC83D]">Progressing</span>
          </h2>

          <div className="w-24 h-1 bg-[#E6AA27] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(230,170,39,0.4)]" />

          <p className="text-base text-[#E8F3EC]/80 font-normal leading-relaxed">
            Follow the active development journey, structural milestones, and latest verified construction updates across our premier developments in Peshawar and Swat.
          </p>
        </div>

        {/* 4 Compact Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {progressingProjects.map((project) => {
            const percentage = project.constructionProgress ?? 80;
            const status =
              project.constructionStatus ||
              (percentage >= 85
                ? 'Interior Fit-Outs Active'
                : percentage >= 75
                ? 'Structure Complete • MEP Phase'
                : 'Structural Work Active');
            const lastUpdated = project.constructionLastUpdated || 'November 2026';

            return (
              <div
                key={project.id}
                className="bg-[#003D25]/90 rounded-3xl overflow-hidden border border-[#E6AA27]/25 shadow-2xl hover:border-[#E6AA27]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 backdrop-blur-md"
              >
                <div>
                  {/* Card Visual / Render — Clean Studio Stage (No Green Theme) */}
                  <div className="relative h-64 w-full bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={project.renderBuildingImage || project.coverImage}
                      alt={project.name}
                      className="max-h-[220px] max-w-[94%] object-contain filter drop-shadow-[0_12px_24px_rgba(15,23,42,0.18)] group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Progress Badge Top Right */}
                    <div className="absolute top-3 right-3 bg-[#022C22] text-[#D6A84F] font-heading font-black text-xs px-2.5 py-1 rounded-full border border-[#D6A84F]/40 shadow-sm flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-[#D6A84F]" />
                      <span>{percentage}%</span>
                    </div>

                    {/* Location Badge Top Left */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200/80 flex items-center space-x-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-[#D6A84F]" />
                      <span className="truncate max-w-[120px]">{project.city || project.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white mb-1.5 group-hover:text-[#FFC83D] transition-colors leading-snug drop-shadow-sm">
                      {project.name}
                    </h3>

                    {/* Stage status indicator */}
                    <div className="flex items-center space-x-1.5 text-xs text-[#F4F7F2] font-semibold mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC83D] shrink-0" />
                      <span className="truncate text-white/95">{status}</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                          Completion Rate
                        </span>
                        <span className="text-xs font-black text-[#FFC83D]">{percentage}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-[#002D1C] rounded-full overflow-hidden p-0.5 border border-[#E6AA27]/40">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#006B40] via-[#E6AA27] to-[#FFC83D] transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center space-x-1.5 text-[11px] text-[#F4F7F2]/90 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#FFC83D]" />
                      <span>Updated: <strong className="text-white font-bold">{lastUpdated}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/projects/${project.slug}#progress`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#004B2E] hover:bg-[#E6AA27] text-[#FFC83D] hover:text-[#002D1C] border border-[#E6AA27]/40 text-xs font-heading font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Provisional Note */}
        <p className="text-center text-[11px] text-[#E8F3EC]/60 italic mt-8 max-w-2xl mx-auto">
          * Construction progress values are provisional display figures subject to administrator verification. Figures reflect on-site engineering milestones and do not represent an absolute guarantee of possession dates.
        </p>
      </div>
    </section>
  );
};

