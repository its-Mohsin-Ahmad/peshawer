import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { HardHat, ArrowRight, Calendar, MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ProjectsProgressingSection: React.FC = () => {
  const { projects } = useData();

  // Filter published projects that have progress enabled
  const progressingProjects = projects.filter((p) => p.constructionProgressPublished !== false);

  if (progressingProjects.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F8F6EA]/60 to-white relative overflow-hidden border-b border-gray-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ECFDF5] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#047857]/20 text-[#047857] text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-4 h-4 text-[#D6A84F]" />
            <span>Real-Time Development Milestones</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] uppercase tracking-tight mb-4">
            Our Projects Are <span className="text-[#D6A84F]">Progressing</span>
          </h2>

          <div className="w-24 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />

          <p className="text-base text-[#64748B] font-normal leading-relaxed">
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
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
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
                    <h3 className="font-heading text-lg font-bold text-[#102A24] mb-1 group-hover:text-[#064E3B] transition-colors leading-snug">
                      {project.name}
                    </h3>

                    {/* Stage status indicator */}
                    <div className="flex items-center space-x-1.5 text-xs text-[#047857] font-semibold mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                      <span className="truncate">{status}</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                          Completion Rate
                        </span>
                        <span className="text-xs font-black text-[#D6A84F]">{percentage}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/80">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#064E3B] to-[#D6A84F] transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center space-x-1 text-[11px] text-[#94A3B8] font-medium">
                      <Calendar className="w-3 h-3 text-[#D6A84F]" />
                      <span>Updated: <strong className="text-[#64748B]">{lastUpdated}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/projects/${project.slug}#progress`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F8F6EA] hover:bg-[#064E3B] text-[#064E3B] hover:text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 group/btn"
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
        <p className="text-center text-[11px] text-[#64748B] italic mt-8 max-w-2xl mx-auto">
          * Construction progress values are provisional display figures subject to administrator verification. Figures reflect on-site engineering milestones and do not represent an absolute guarantee of possession dates.
        </p>
      </div>
    </section>
  );
};

