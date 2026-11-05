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
    <section id="progress" className="py-20 bg-gradient-to-b from-white via-[#F8F6EA]/50 to-white border-t border-gray-100 relative overflow-hidden">
      {/* Decorative architectural background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ECFDF5]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#047857]/20 text-[#047857] text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-4 h-4 text-[#D6A84F]" />
            <span>On-Site Development Tracker</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] uppercase tracking-tight mb-4">
            Construction <span className="text-[#D6A84F]">Progress</span>
          </h2>

          <div className="w-24 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />

          <p className="text-base text-[#64748B] font-normal leading-relaxed">
            Follow the development journey and explore the latest construction updates for {project.name}.
          </p>
        </div>

        {/* Main Progress Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-premium border border-gray-100 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Circular Progress Indicator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-[#F8F6EA]/70 via-white to-white rounded-3xl border border-gray-100/90 shadow-sm">
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${circleSize} ${circleSize}`}
                  className="w-full h-full transform -rotate-90 drop-shadow-sm"
                >
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064E3B" />
                      <stop offset="45%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#D6A84F" />
                    </linearGradient>
                  </defs>

                  {/* Background Track Circle */}
                  <circle
                    stroke="#E2E8F0"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={center}
                    cy={center}
                    className="opacity-70"
                  />

                  {/* Subtle Inner Ring */}
                  <circle
                    stroke="#F1F5F9"
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
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#047857] mb-0.5">
                    Progress
                  </span>

                  <div className="flex items-baseline justify-center">
                    <span className="font-heading text-4xl sm:text-5xl font-black text-[#022C22] tracking-tight leading-none">
                      {percentage}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-black text-[#D6A84F] ml-0.5">
                      %
                    </span>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border border-[#047857]/20 mt-1.5 shadow-xs">
                    Completed
                  </span>

                  <span className="text-[10px] text-[#94A3B8] font-medium tracking-wide mt-1">
                    Provisional Metric
                  </span>
                </div>
              </div>

              {/* Status pill under circle */}
              <div className="mt-5 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white text-[#047857] text-xs font-bold text-center border border-emerald-100/90 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                <span className="line-clamp-1">{statusLabel}</span>
              </div>
            </div>

            {/* Right: Detailed Progress Information (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">
                    {project.city || project.location.split(',')[0]}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="inline-flex items-center space-x-1 text-xs text-[#64748B]">
                    <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Last Updated: <strong className="text-[#102A24]">{lastUpdated}</strong></span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#022C22] tracking-tight mb-3">
                  {project.name} Progress Status
                </h3>

                <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#064E3B] flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-[#D6A84F]" />
                    <span>Overall Milestone Progress</span>
                  </span>
                  <span className="text-[#D6A84F] font-black text-sm">{percentage}%</span>
                </div>

                {/* Bar track */}
                <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#D6A84F] transition-all duration-1000 shadow-sm"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Milestone tick marks */}
                <div className="flex justify-between text-[10px] text-[#94A3B8] font-semibold pt-1">
                  <span>Foundation (0%)</span>
                  <span>Grey Structure (50%)</span>
                  <span>Finishing (75%)</span>
                  <span>Handover (100%)</span>
                </div>
              </div>

              {/* Status summary tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F8F6EA] border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">Current Stage</span>
                  <span className="text-xs font-bold text-[#064E3B] truncate block mt-0.5">{statusLabel.split('•')[0]}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F6EA] border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">Site Verification</span>
                  <span className="text-xs font-bold text-[#047857] truncate block mt-0.5">Admin Verified</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F6EA] border border-gray-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">Historical Logs</span>
                  <span className="text-xs font-bold text-[#D6A84F] block mt-0.5">{history.length} Dated Milestones</span>
                </div>
              </div>

              {/* Action Button: View Progress Updates */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white text-xs font-heading font-extrabold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md group"
                >
                  <Clock className="w-4 h-4 text-[#D6A84F]" />
                  <span>{showHistory ? 'Hide Progress History' : 'View Progress Updates'}</span>
                  {showHistory ? (
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </button>

                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-[#F8F6EA] text-[#064E3B] border border-gray-200 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
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
                <h3 className="font-heading text-xl font-bold text-[#022C22] uppercase tracking-tight flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[#D6A84F]" />
                  <span>Latest Construction Photographs</span>
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Actual site imagery capturing on-site structural works and architectural detailing.
                </p>
              </div>
              <span className="text-xs text-[#047857] font-bold bg-[#ECFDF5] px-3 py-1 rounded-full">
                {photos.length} Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(photo)}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100 cursor-pointer transition-all duration-300"
                >
                  <img
                    src={photo}
                    alt={`${project.name} construction update ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A84F] block">
                      Site Record #{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-white/90 truncate block">
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
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="border-b border-gray-100 pb-5 mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-black text-[#022C22] uppercase tracking-tight flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-[#D6A84F]" />
                  <span>Construction Milestone History</span>
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Chronological record of verified structural stages and progress increments.
                </p>
              </div>
              <span className="text-xs text-[#064E3B] font-bold">
                {history.length} Total Logs
              </span>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-[#64748B] italic text-center py-8">
                No previous history logs published for this development. Latest status reflects current on-site audit.
              </p>
            ) : (
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D6A84F]/40 space-y-8">
                {history.map((item, index) => (
                  <div key={item.id || index} className="relative group">
                    {/* Circle Node on Timeline */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#064E3B] border-4 border-white shadow flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                    </div>

                    {/* Timeline Item Content Card */}
                    <div className="bg-[#F8F6EA]/70 p-5 rounded-2xl border border-gray-100 hover:border-[#D6A84F]/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-extrabold text-[#064E3B] uppercase tracking-wide">
                          {item.title || `Milestone Update (${item.percentage}%)`}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-bold text-[#D6A84F] bg-white px-2 py-0.5 rounded-md border border-gray-200">
                            {item.percentage}% Complete
                          </span>
                          <span className="text-[11px] text-[#64748B] font-medium">
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {item.description}
                      </p>

                      {item.photoUrl && (
                        <div className="mt-3">
                          <img
                            src={item.photoUrl}
                            alt="Milestone photo"
                            className="w-32 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90"
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
        <div className="rounded-2xl p-5 bg-[#ECFDF5]/80 border border-[#047857]/20 flex items-start space-x-3.5">
          <AlertCircle className="w-5 h-5 text-[#047857] shrink-0 mt-0.5" />
          <div className="text-xs text-[#064E3B] leading-relaxed">
            <strong className="font-bold">Important Notice on Construction Progress:</strong>{' '}
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

