import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../../types';
import { formatPKR, formatPKRShort, formatArea } from '../../utils/formatters';
import { getPropertyWhatsAppUrl } from '../../utils/whatsapp';
import { useData } from '../../contexts/DataContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface PropertyCardProps {
  property: Property;
  onInquire?: (prop: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInquire }) => {
  const { settings } = useData();
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useScrollReveal<HTMLDivElement>({
    variant: 'fadeUp',
    duration: 0.65,
    threshold: 0.08,
  });

  return (
    <div
      ref={cardRef}
      className="property-card bg-[#003D25]/90 rounded-2xl overflow-hidden border border-[#E6AA27]/25 shadow-2xl flex flex-col group will-change-transform backdrop-blur-sm hover:border-[#E6AA27]/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="img-reveal relative aspect-[16/10] overflow-hidden bg-[#002D1C]">
        <img
          src={property.featuredImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/hero/slide1.jpg';
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
              property.purpose === 'Buy'
                ? 'bg-[#FFC83D] text-[#002D1C]'
                : 'bg-[#E6AA27] text-[#002D1C]'
            }`}
          >
            For {property.purpose}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#002D1C]/80 border border-white/20 backdrop-blur-md text-white">
            {property.category}
          </span>
        </div>

        {/* Favorite & Verified */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          {property.verified && (
            <div
              className="bg-[#002D1C]/90 border border-[#FFC83D]/40 backdrop-blur-sm text-[#FFC83D] p-1.5 rounded-full shadow-sm"
              title="Verified Listing"
            >
              <CheckCircle2 className="w-4 h-4 fill-[#FFC83D] text-[#002D1C]" />
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Price Tag bar bottom of image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#002D1C] via-[#002D1C]/70 to-transparent p-3 pt-6 flex items-baseline justify-between text-white">
          <div>
            <span className="font-heading text-lg font-black tracking-tight text-[#FFC83D]">
              {formatPKR(property.pricePKR)}
            </span>
            <span className="text-xs text-white/80 ml-1.5">
              ({formatPKRShort(property.pricePKR)})
            </span>
          </div>
          {property.purpose === 'Rent' && (
            <span className="text-[11px] text-white/70 font-medium">/ month</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center text-xs text-[#E8F3EC]/70 mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#FFC83D] shrink-0" />
            <span className="truncate">
              {property.location
                .replace(/Kalam,\s*S?wat/gi, 'Kalam')
                .replace(/Kalam\s+S?wat/gi, 'Kalam')
                .replace(/,\s*S?wat/gi, '')
                .trim()}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`} className="block">
            <h3 className="font-heading text-base font-bold text-white group-hover:text-[#FFC83D] transition-colors line-clamp-2 leading-snug mb-3">
              {property.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Meta specs bar */}
          <div className="pt-3 border-t border-[#E6AA27]/20 flex items-center justify-between text-xs text-[#E8F3EC]/80 font-medium mb-4">
            <div className="flex items-center space-x-1" title="Area">
              <Maximize className="w-4 h-4 text-[#FFC83D]" />
              <span>{formatArea(property.area, property.areaUnit)}</span>
            </div>

            {property.bedrooms !== undefined && (
              <div className="flex items-center space-x-1" title="Bedrooms">
                <Bed className="w-4 h-4 text-[#087B4B]" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="flex items-center space-x-1" title="Bathrooms">
                <Bath className="w-4 h-4 text-[#087B4B]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Link
              to={`/properties/${property.slug || property.id}`}
              className="btn-hover btn-arrow-hover flex-1 py-2 px-3 text-center rounded-lg bg-[#002D1C] hover:bg-[#004B2E] text-white text-xs font-bold flex items-center justify-center space-x-1 border border-[#E6AA27]/30 hover:border-[#E6AA27] transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="arrow-icon w-3.5 h-3.5 text-[#FFC83D]" />
            </Link>

            <a
              href={getPropertyWhatsAppUrl(property, settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inquire on WhatsApp"
              className="btn-hover py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm"
              title="Inquire on WhatsApp"
            >
              <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current">
                <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

