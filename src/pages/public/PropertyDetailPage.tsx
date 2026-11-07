import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { Lightbox } from '../../components/common/Lightbox';
import { InquiryModal } from '../../components/common/InquiryModal';
import { AppointmentModal } from '../../components/common/AppointmentModal';
import { PropertyCard } from '../../components/common/PropertyCard';
import { useData } from '../../contexts/DataContext';
import { formatPKR, formatPKRShort, formatArea } from '../../utils/formatters';
import { getPropertyWhatsAppUrl } from '../../utils/whatsapp';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Send,
  Car,
  Clock,
  ArrowLeft,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { properties, settings } = useData();

  const property = properties.find((p) => p.id === propertyId || p.slug === propertyId);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#022C22] mb-3">Property Listing Not Found</h2>
        <p className="text-sm text-[#64748B] mb-6">The listing you requested is unavailable or has been archived.</p>
        <Link
          to="/properties"
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider"
        >
          Back to All Properties
        </Link>
      </div>
    );
  }

  const galleryImages = property.gallery?.length > 0 ? property.gallery : [property.featuredImage];

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.published && (p.category === property.category || p.city === property.city))
    .slice(0, 3);

  return (
    <div className="bg-[#002D1C] text-white min-h-screen relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#004B2E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Unique Hero Image: That property's own featured image */}
      <PageHero
        title={property.title}
        subtitle={`${property.location} • ${formatPKR(property.pricePKR)} (${formatPKRShort(property.pricePKR)})`}
        image={property.featuredImage}
        badge={property.verified ? 'Verified Listing' : undefined}
        breadcrumbs={[
          { label: 'Properties', link: '/properties' },
          { label: `For ${property.purpose}`, link: `/properties/${property.purpose.toLowerCase()}` },
          { label: property.category },
        ]}
        ctaPrimaryText="Submit Inquiry"
        onCtaPrimaryClick={() => setInquiryModalOpen(true)}
        ctaSecondaryText="Schedule Site Visit"
        onCtaSecondaryClick={() => setAppointmentModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (2 Cols): Gallery, Details, Description, Features */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery Grid preview */}
            <div className="bg-[#003D25]/90 rounded-3xl p-6 shadow-2xl border border-[#E6AA27]/25 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
                  Property <span className="text-[#FFC83D]">Photography</span>
                </h2>
                <button
                  onClick={() => {
                    setPhotoIndex(0);
                    setLightboxOpen(true);
                  }}
                  className="text-xs font-bold text-[#FFC83D] hover:text-white uppercase tracking-wider transition-colors"
                >
                  View Fullscreen ({galleryImages.length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setPhotoIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-[#002D1C] cursor-pointer group border border-white/10"
                  >
                    <img
                      src={img}
                      alt={`${property.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-[#003D25]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6AA27]/25 backdrop-blur-md">
              <h2 className="font-heading text-lg font-bold text-white mb-6 uppercase tracking-tight">
                Overview & <span className="text-[#FFC83D]">Specifications</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                  <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                    <Maximize className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                    <span>Total Area</span>
                  </div>
                  <div className="font-heading font-extrabold text-base text-white">
                    {formatArea(property.area, property.areaUnit)}
                  </div>
                </div>

                {property.bedrooms !== undefined && (
                  <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                    <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                      <Bed className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                      <span>Bedrooms</span>
                    </div>
                    <div className="font-heading font-extrabold text-base text-white">
                      {property.bedrooms} Beds
                    </div>
                  </div>
                )}

                {property.bathrooms !== undefined && (
                  <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                    <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                      <Bath className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                      <span>Bathrooms</span>
                    </div>
                    <div className="font-heading font-extrabold text-base text-white">
                      {property.bathrooms} Baths
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                  <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                    <span>Purpose</span>
                  </div>
                  <div className="font-heading font-extrabold text-base text-white">
                    For {property.purpose}
                  </div>
                </div>

                {property.parkingSpaces !== undefined && (
                  <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                    <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                      <Car className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                      <span>Parking</span>
                    </div>
                    <div className="font-heading font-extrabold text-base text-white">
                      {property.parkingSpaces} Vehicles
                    </div>
                  </div>
                )}

                {property.yearBuilt && (
                  <div className="p-4 rounded-2xl bg-[#002D1C] border border-[#E6AA27]/20 flex flex-col justify-center">
                    <div className="flex items-center text-[#E8F3EC]/70 text-xs font-medium mb-1">
                      <Clock className="w-4 h-4 text-[#FFC83D] mr-1.5" />
                      <span>Year Built</span>
                    </div>
                    <div className="font-heading font-extrabold text-base text-white">
                      {property.yearBuilt}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#003D25]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6AA27]/25 backdrop-blur-md">
              <h2 className="font-heading text-lg font-bold text-white mb-4 uppercase tracking-tight">
                Property <span className="text-[#FFC83D]">Description</span>
              </h2>
              <p className="text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed whitespace-pre-line font-normal">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities Checklist */}
            {property.features && property.features.length > 0 && (
              <div className="bg-[#003D25]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6AA27]/25 backdrop-blur-md">
                <h2 className="font-heading text-lg font-bold text-white mb-6 uppercase tracking-tight">
                  Key Property Highlights & <span className="text-[#FFC83D]">Amenities</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold text-[#E8F3EC]">
                      <div className="w-5 h-5 rounded-full bg-[#002D1C] border border-[#FFC83D]/40 text-[#FFC83D] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Inquiry Card */}
          <div className="space-y-6">
            <div className="bg-[#003D25]/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6AA27]/30 sticky top-28 backdrop-blur-md">
              <div className="border-b border-[#E6AA27]/20 pb-5 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC83D] block mb-1">
                  OFFICIAL ASKING PRICE
                </span>
                <div className="font-heading text-2xl sm:text-3xl font-black text-[#FFC83D] tracking-tight">
                  {formatPKR(property.pricePKR)}
                </div>
                <div className="text-xs text-[#E8F3EC]/70 font-semibold mt-1">
                  ({formatPKRShort(property.pricePKR)}) {property.purpose === 'Rent' && 'per month'}
                </div>
              </div>

              {/* Verified badge */}
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#FFC83D] bg-[#002D1C] border border-[#FFC83D]/30 p-3 rounded-xl mb-6">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#FFC83D]" />
                <span>Verified Legal Title & Documentation</span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {/* WhatsApp Inquiry Button */}
                <a
                  href={getPropertyWhatsAppUrl(property, settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_8px_20px_-4px_rgba(37,211,102,0.4)] flex items-center justify-center space-x-2 hover:scale-[1.01]"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current shrink-0">
                    <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                  </svg>
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#002D1C] hover:bg-[#004B2E] text-white border border-[#E6AA27]/40 font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#FFC83D]" />
                  <span>Book Site Inspection</span>
                </button>

                <a
                  href={`tel:${settings.phonePrimary}`}
                  className="w-full py-3 px-4 rounded-xl border border-[#E6AA27]/30 hover:border-[#FFC83D] bg-[#002D1C] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#FFC83D]" />
                  <span>Call Advisor: {settings.phonePrimary}</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-[11px] text-[#E8F3EC]/70 text-center">
                Ref ID: <strong className="text-[#FFC83D]">{property.id}</strong> • Listed by PESHAWER REAL ESTATE
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E6AA27]/20">
            <h2 className="font-heading text-2xl font-bold text-white mb-8 uppercase tracking-tight">
              Similar Properties <span className="text-[#FFC83D]">You May Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for property photos */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        initialIndex={photoIndex}
        title={property.title}
      />

      {/* Inquiry and Site Visit Modals */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        itemTitle={property.title}
        itemType="property"
        itemId={property.id}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </div>
  );
};

