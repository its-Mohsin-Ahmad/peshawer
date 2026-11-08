import React, { useState } from 'react';
import { Project } from '../../types';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  AlertCircle,
  HardHat,
  TrendingUp,
  Layers,
} from 'lucide-react';

interface ConstructionProgressSectionProps {
  project: Project;
}

export const ConstructionProgressSection: React.FC<ConstructionProgressSectionProps> = ({ project }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // If progress is explicitly hidden by administrator
  if (project.constructionProgressPublished === false) {
    return null;
  }

  // Fallback defaults if not set
  const percentage = project.constructionProgress ?? 80;
  const statusLabel =
    project.constructionStatus ||
    (percentage >= 85
      ? 'Interior Fit-Outs & Finishing'
      : percentage >= 75
      ? 'Superstructure Complete • MEP in Progress'
      : 'Structural Framework Underway');
  const lastUpdated = project.constructionLastUpdated || 'November 2026';
  const description =
    project.constructionDescription ||
    `Construction on ${project.name} is progressing according to master structural schedules, overseen by dedicated civil engineers and project architects.`;

  const photos =
    project.constructionPhotos && project.constructionPhotos.length > 0
      ? project.constructionPhotos
      : project.gallery.exterior.slice(0, 3);

  const history = project.progressHistory || [];

  // SVG Circular progress math - Clean, spacious, beautifully centered
  const circleSize = 240;
  const strokeWidth = 14;
  const center = circleSize / 2; // 120
  const radius = center - strokeWidth; // 106
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section id="progress" className="py-24 bg-[#002417] text-white border-t border-[#E6AA27]/20 relative overflow-hidden">
      {/* Decorative architectural background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004B2E]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#003D25] border border-[#FFC83D]/40 text-[#FFC83D] text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
            <HardHat className="w-4 h-4 text-[#FFC83D]" />
            <span>On-Site Development Tracker</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-4 drop-shadow-sm">
            Construction <span className="text-[#FFC83D]">Progress</span>
          </h2>

          <div className="w-24 h-1 bg-[#E6AA27] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(230,170,39,0.5)]" />

          <p className="text-base text-[#E8F3EC]/85 font-normal leading-relaxed">
            Follow the development journey and explore the latest construction updates for {project.name}.
          </p>
        </div>

        {/* Main Progress Showcase Card */}
        <div className="bg-[#003D25]/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#E6AA27]/25 mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Circular Progress Indicator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-[#002417] rounded-3xl border border-[#E6AA27]/20 shadow-inner">
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${circleSize} ${circleSize}`}
                  className="w-full h-full transform -rotate-90 drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#006B40" />
                      <stop offset="50%" stopColor="#E6AA27" />
                      <stop offset="100%" stopColor="#FFC83D" />
                    </linearGradient>
                  </defs>

                  {/* Background Track Circle */}
                  <circle
                    stroke="#00180F"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={center}
                    cy={center}
                    className="opacity-90"
                  />

                  {/* Subtle Inner Ring */}
                  <circle
                    stroke="#003D25"
                    fill="transparent"
                    strokeWidth={1.5}
                    r={radius - strokeWidth}
                    cx={center}
                    cy={center}
                  />

                  {/* Animated Progress Circle */}
                  <circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    strokeLinecap="round"
                    r={radius}
                    cx={center}
                    cy={center}
                  />
                </svg>

                {/* Center Content - Perfectly balanced and spaced */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none select-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFC83D] mb-0.5">
                    Progress
                  </span>

                  <div className="flex items-baseline justify-center">
                    <span className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                      {percentage}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-black text-[#FFC83D] ml-0.5">
                      %
                    </span>
                  </div>

                  <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#003D25] text-[#FFC83D] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border border-[#FFC83D]/30 mt-1.5 shadow-sm">
                    Completed
                  </span>

                  <span className="text-[10px] text-[#E8F3EC]/60 font-medium tracking-wide mt-1">
                    Provisional Metric
                  </span>
                </div>
              </div>

              {/* Status pill under circle */}
              <div className="mt-5 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#002D1C] text-white text-xs font-bold text-center border border-[#E6AA27]/30 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC83D] shrink-0" />
                <span className="line-clamp-1 text-white">{statusLabel}</span>
              </div>
            </div>

            {/* Right: Detailed Progress Information (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#FFC83D] uppercase tracking-wider">
                    {project.city || project.location.split(',')[0]}
                  </span>
                  <span className="text-white/30">•</span>
                  <div className="inline-flex items-center space-x-1 text-xs text-[#E8F3EC]/80">
                    <Calendar className="w-3.5 h-3.5 text-[#FFC83D]" />
                    <span>Last Updated: <strong className="text-white font-bold">{lastUpdated}</strong></span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {project.name} Progress Status
                </h3>

                <p className="text-sm text-[#E8F3EC]/85 leading-relaxed mb-6 font-normal">
                  {description}
                </p>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-[#FFC83D]" />
                    <span>Overall Milestone Progress</span>
                  </span>
                  <span className="text-[#FFC83D] font-black text-sm">{percentage}%</span>
                </div>

                {/* Bar track */}
                <div className="w-full h-3.5 bg-[#00180F] rounded-full overflow-hidden p-0.5 border border-[#E6AA27]/30 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#006B40] via-[#E6AA27] to-[#FFC83D] transition-all duration-1000 shadow-md"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Milestone tick marks */}
                <div className="flex justify-between text-[10px] text-[#E8F3EC]/70 font-semibold pt-1">
                  <span>Foundation (0%)</span>
                  <span>Grey Structure (50%)</span>
                  <span>Finishing (75%)</span>
                  <span>Handover (100%)</span>
                </div>
              </div>

              {/* Status summary tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#002417] border border-[#E6AA27]/25 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-[#FFC83D]/90 block">Current Stage</span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">{statusLabel.split('•')[0]}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#002417] border border-[#E6AA27]/25 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-[#FFC83D]/90 block">Site Verification</span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">Admin Verified</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#002417] border border-[#E6AA27]/25 shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-[#FFC83D]/90 block">Historical Logs</span>
                  <span className="text-xs font-bold text-[#FFC83D] block mt-0.5">{history.length} Dated Milestones</span>
                </div>
              </div>

              {/* Action Button: View Progress Updates */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] text-xs font-heading font-extrabold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md group"
                >
                  <Clock className="w-4 h-4 text-[#002D1C]" />
                  <span>{showHistory ? 'Hide Progress History' : 'View Progress Updates'}</span>
                  {showHistory ? (
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </button>

                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl bg-[#002417] hover:bg-[#004B2E] text-white border border-[#E6AA27]/40 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  Schedule Site Visit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Construction Photographs */}
        {photos && photos.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[#FFC83D]" />
                  <span>Latest Construction Photographs</span>
                </h3>
                <p className="text-xs text-[#E8F3EC]/75 mt-0.5">
                  Actual site imagery capturing on-site structural works and architectural detailing.
                </p>
              </div>
              <span className="text-xs text-[#FFC83D] font-bold bg-[#002D1C] border border-[#FFC83D]/40 px-3.5 py-1.5 rounded-full shadow-sm">
                {photos.length} Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(photo)}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-[#E6AA27]/25 hover:border-[#FFC83D]/60 cursor-pointer transition-all duration-300 bg-[#002417]"
                >
                  <img
                    src={photo}
                    alt={`${project.name} construction update ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00180F]/90 via-[#00180F]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC83D] block">
                      Site Record #{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-white/95 truncate block">
                      {project.name} — Progress Documentation
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress History Timeline (Expandable) */}
        {showHistory && (
          <div className="bg-[#003D25]/90 rounded-3xl p-6 sm:p-10 border border-[#E6AA27]/25 shadow-2xl mb-10 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-md">
            <div className="border-b border-[#E6AA27]/20 pb-5 mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-[#FFC83D]" />
                  <span>Construction Milestone History</span>
                </h3>
                <p className="text-xs text-[#E8F3EC]/75 mt-0.5">
                  Chronological record of verified structural stages and progress increments.
                </p>
              </div>
              <span className="text-xs text-[#FFC83D] font-bold bg-[#002417] px-3 py-1 rounded-full border border-[#FFC83D]/30">
                {history.length} Total Logs
              </span>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-[#E8F3EC]/70 italic text-center py-8">
                No previous history logs published for this development. Latest status reflects current on-site audit.
              </p>
            ) : (
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E6AA27]/40 space-y-8">
                {history.map((item, index) => (
                  <div key={item.id || index} className="relative group">
                    {/* Circle Node on Timeline */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#002417] border-4 border-[#FFC83D] shadow flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFC83D]" />
                    </div>

                    {/* Timeline Item Content Card */}
                    <div className="bg-[#002417] p-5 rounded-2xl border border-[#E6AA27]/25 hover:border-[#FFC83D]/50 transition-colors shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-extrabold text-[#FFC83D] uppercase tracking-wide">
                          {item.title || `Milestone Update (${item.percentage}%)`}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-bold text-[#002D1C] bg-[#FFC83D] px-2.5 py-0.5 rounded-md font-heading">
                            {item.percentage}% Complete
                          </span>
                          <span className="text-[11px] text-[#E8F3EC]/70 font-medium">
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#E8F3EC]/85 leading-relaxed">
                        {item.description}
                      </p>

                      {item.photoUrl && (
                        <div className="mt-3">
                          <img
                            src={item.photoUrl}
                            alt="Milestone photo"
                            className="w-32 h-20 object-cover rounded-lg border border-[#E6AA27]/30 cursor-pointer hover:opacity-90"
                            onClick={() => setSelectedImage(item.photoUrl!)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Administrative Legal Notice / Disclaimer */}
        <div className="rounded-2xl p-5 bg-[#002417] border border-[#E6AA27]/30 flex items-start space-x-3.5 shadow-md">
          <AlertCircle className="w-5 h-5 text-[#FFC83D] shrink-0 mt-0.5" />
          <div className="text-xs text-[#E8F3EC]/90 leading-relaxed">
            <strong className="font-bold text-[#FFC83D]">Important Notice on Construction Progress:</strong>{' '}
            These percentages and milestone labels are provisional display values maintained and updated periodically by the platform administrator. Figures represent structural and engineering estimates as of the indicated update date and do not constitute an absolute legal guarantee of completion or possession handover. Authorized site visits can be arranged with our technical engineering team.
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <img src={selectedImage} alt="Enlarged construction record" className="max-w-full max-h-[80vh] object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

