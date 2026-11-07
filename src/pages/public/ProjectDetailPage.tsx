import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { PaymentPlanCard } from '../../components/projects/PaymentPlanCard';
import { TownGardenVideoPlayer } from '../../components/projects/TownGardenVideoPlayer';
import { ProjectGallery } from '../../components/projects/ProjectGallery';
import { ConstructionProgressSection } from '../../components/projects/ConstructionProgressSection';
import { InquiryModal } from '../../components/common/InquiryModal';
import { AppointmentModal } from '../../components/common/AppointmentModal';
import { useData } from '../../contexts/DataContext';
import { ApartmentPlan } from '../../types';
import { getProjectWhatsAppUrl } from '../../utils/whatsapp';
import {
  MapPin,
  ShieldCheck,
  Calendar,
  Send,
  Building,
  CheckCircle2,
  Download,
  ArrowRight,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { projects, settings } = useData();

  const project = projects.find((p) => p.slug === projectSlug);

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<ApartmentPlan | null>(null);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#022C22] mb-3">Project Not Found</h2>
        <p className="text-sm text-[#64748B] mb-6">The signature development you requested does not exist.</p>
        <Link
          to="/projects"
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider"
        >
          View All Projects
        </Link>
      </div>
    );
  }

  const handleInquireApartment = (apt: ApartmentPlan) => {
    setSelectedApartment(apt);
    setInquiryModalOpen(true);
  };

  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <div className="bg-[#002D1C] text-white min-h-screen relative overflow-hidden">
      {/* 1. Unique Dedicated Project Hero */}
      <PageHero
        title={project.name}
        subtitle={project.tagline}
        image={project.heroImage}
        badge={project.verifiedApproval}
        breadcrumbs={[
          { label: 'Projects', link: '/projects' },
          { label: project.name },
        ]}
        ctaPrimaryText="Book a Site Visit"
        onCtaPrimaryClick={() => setAppointmentModalOpen(true)}
        ctaSecondaryText="Explore Payment Plans"
        ctaSecondaryLink="#payment-plans"
      />

      {/* 2. Project Overview & Architecture Intro */}
      <section className="py-20 bg-[#002D1C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 3D Architectural Visual */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#003D25] to-[#002D1C] rounded-3xl p-8 border border-[#E6AA27]/30 shadow-2xl flex items-center justify-center">
              <img
                src={project.renderBuildingImage}
                alt={project.name}
                className="max-w-full max-h-96 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Right Overview Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#FFC83D] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#FFC83D]" />
                <span>{project.location}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
                About {project.name}
              </h2>

              <div className="w-20 h-1 bg-[#FFC83D] rounded-full shadow-[0_0_12px_rgba(255,200,61,0.5)]" />

              <p className="text-base text-[#E8F3EC]/80 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Status & Approval Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="px-4 py-2 rounded-xl bg-[#003D25] border border-[#FFC83D]/40 text-[#FFC83D] text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{project.verifiedApproval || 'Official Approval Verified'}</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-[#003D25] border border-[#E6AA27]/40 text-[#FFC83D] text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Status: {project.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3 items-center">
                <a
                  href={getProjectWhatsAppUrl(project, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_8px_20px_-4px_rgba(37,211,102,0.4)] flex items-center space-x-2"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                    <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                  </svg>
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setAppointmentModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  Schedule Guided Site Inspection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedApartment(null);
                    setInquiryModalOpen(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#003D25] hover:bg-[#004B2E] text-white font-heading font-bold text-xs uppercase tracking-wider border border-[#E6AA27]/40 transition-all"
                >
                  General Project Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Town Garden EXCLUSIVE Dedicated Primary Project Video */}
      {project.slug === 'town-garden' && project.hasVideo && (
        <TownGardenVideoPlayer
          videoUrl={project.videoUrl}
          posterImage={project.videoPoster}
          title={project.videoTitle}
          description={project.videoDescription}
        />
      )}

      {/* 4. Architectural Media Gallery (Exterior & Interior) */}
      {project.gallery && project.gallery.all.length > 0 && (
        <ProjectGallery gallery={project.gallery} projectName={project.name} />
      )}

      {/* 5. Construction Progress Tracking — Circular & Horizontal Indicators */}
      <ConstructionProgressSection project={project} />

      {/* 6. Apartment Types & Payment Plans */}
      {project.apartments && project.apartments.length > 0 && (
        <section className="py-24 bg-[#002417] border-t border-[#E6AA27]/20" id="payment-plans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] block mb-2">
                Transparent 5-Year Financing
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
                Apartment Types & <span className="text-[#FFC83D]">Payment Plans</span>
              </h2>
              <div className="w-20 h-1 bg-[#FFC83D] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(255,200,61,0.5)]" />
              <p className="text-sm sm:text-base text-[#E8F3EC]/80 font-normal">
                Review verified milestone schedules. Download printable official schedules with full legal transparency.
              </p>
            </div>

            {/* Payment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.apartments.map((apartment) => (
                <PaymentPlanCard
                  key={apartment.id}
                  project={project}
                  apartment={apartment}
                  onInquire={handleInquireApartment}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Master Plan & Amenities Section */}
      <section className="py-20 bg-[#002D1C] border-t border-[#E6AA27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-3">
              Features & Master Plan <span className="text-[#FFC83D]">Amenities</span>
            </h2>
            <div className="w-16 h-1 bg-[#FFC83D] mx-auto rounded-full shadow-[0_0_12px_rgba(255,200,61,0.5)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.amenities.map((amenity, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#003D25]/90 border border-[#E6AA27]/25 shadow-lg flex items-center space-x-3 hover:border-[#E6AA27]/50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#002D1C] border border-[#FFC83D]/40 text-[#FFC83D] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Location Section */}
      <section className="py-20 bg-[#002417]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-10 h-10 text-[#FFC83D] mx-auto mb-3" />
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
            Strategic <span className="text-[#FFC83D]">Location</span>
          </h2>
          <p className="text-sm font-semibold text-[#FFC83D] mb-2">{project.location}</p>
          <p className="text-xs text-[#E8F3EC]/80 max-w-xl mx-auto mb-8 font-normal">
            Accessible via paved metalled arterial roads with full infrastructure connections, municipal access, and scenic vantage points.
          </p>

          <button
            type="button"
            onClick={() => setAppointmentModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            Request GPS Coordinates & Guided Site Tour
          </button>
        </div>
      </section>

      {/* 8. Related Developments */}
      <section className="py-20 bg-[#002D1C] border-t border-[#E6AA27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              Other Signature <span className="text-[#FFC83D]">Developments</span>
            </h2>
            <Link
              to="/projects"
              className="text-xs font-bold text-[#FFC83D] hover:text-white uppercase tracking-wider"
            >
              View All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className="bg-[#003D25]/90 rounded-2xl p-6 border border-[#E6AA27]/25 shadow-xl hover:border-[#E6AA27]/60 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 flex items-center justify-center p-3 mb-4 bg-gradient-to-b from-[#003D25] to-[#002D1C] rounded-xl">
                    <img
                      src={p.renderBuildingImage}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-xs text-[#FFC83D] font-bold mb-1">
                    {p.location.split(',')[0]}
                  </div>
                  <h3 className="font-heading text-base font-bold text-white group-hover:text-[#FFC83D] transition-colors mb-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#E8F3EC]/70 line-clamp-2">{p.tagline}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E6AA27]/20 flex items-center justify-between text-xs font-bold text-[#FFC83D]">
                  <span>Explore Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry and Site Visit Modals */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        itemTitle={
          selectedApartment
            ? `${project.name} - ${selectedApartment.title}`
            : project.name
        }
        itemType={selectedApartment ? 'apartment' : 'project'}
        itemId={selectedApartment ? selectedApartment.id : project.id}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        defaultProject={project.name}
      />
    </div>
  );
};

