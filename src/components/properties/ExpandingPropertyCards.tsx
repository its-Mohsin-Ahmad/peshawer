import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { Property } from '../../types';
import { formatPKR, formatPKRShort, formatArea } from '../../utils/formatters';

interface ExpandingPropertyCardsProps {
  properties: Property[];
  onInquire?: (property: Property) => void;
}

export const ExpandingPropertyCards: React.FC<ExpandingPropertyCardsProps> = ({
  properties,
  onInquire,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!properties || properties.length === 0) return null;

  return (
    <div className="w-full">
      {/* DESKTOP & TABLET: HORIZONTAL FLEX EXPANDING ACCORDION */}
      <div className="hidden md:flex items-stretch gap-3 lg:gap-4 h-[57vh] min-h-[460px] max-h-[700px] w-full">
        {properties.map((property, idx) => {
          const isExpanded = idx === activeIndex;
          const numberLabel = idx + 1;

          return (
            <div
              key={property.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-[28px] lg:rounded-[34px] overflow-hidden cursor-pointer select-none border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
                isExpanded
                  ? 'flex-[4] lg:flex-[5] border-[#D6A84F]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]'
                  : 'flex-[0.9] lg:flex-[1] min-w-[80px] lg:min-w-[95px] border-white/10 hover:border-white/30 shadow-lg'
              }`}
            >
              {/* Background Property Image */}
              <img
                src={property.featuredImage}
                alt={property.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  isExpanded
                    ? 'scale-100 filter brightness-95'
                    : 'scale-105 group-hover:scale-110 filter brightness-[0.6] group-hover:brightness-[0.75]'
                }`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hero/slide1.jpg';
                }}
              />

              {/* Dynamic Gradient Overlays */}
              {isExpanded ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none transition-opacity duration-500" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none group-hover:opacity-75 transition-opacity duration-300" />
              )}

              {/* COLLAPSED STATE CONTENT (Vertical Pill View) */}
              {!isExpanded && (
                <div className="absolute inset-0 flex flex-col items-center justify-between py-6 px-2 z-10">
                  {/* Category Pill Mini Tag */}
                  <div className="w-2 h-2 rounded-full bg-[#D6A84F] group-hover:scale-150 transition-transform duration-300" />

                  {/* Vertical Rotated Title */}
                  <div className="flex-1 flex items-center justify-center my-4 overflow-hidden pointer-events-none">
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs lg:text-[13px] font-extrabold uppercase tracking-[0.2em] text-white/85 group-hover:text-white transition-colors truncate max-h-[380px]">
                      {property.title}
                    </span>
                  </div>

                  {/* Number Badge at Bottom */}
                  <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-extrabold text-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#D6A84F] group-hover:text-[#D6A84F] transition-all duration-300">
                    {numberLabel}
                  </div>
                </div>
              )}

              {/* EXPANDED STATE CONTENT (Full Wide Showcase View) */}
              {isExpanded && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10 z-10 animate-in fade-in duration-500">
                  {/* Top Bar: Badges & Location */}
                  <div className="flex items-center justify-between flex-wrap gap-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#064E3B] text-white border border-[#047857]/40 shadow-sm">
                        For {property.purpose}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#D6A84F] border border-[#D6A84F]/30">
                        {property.category}
                      </span>
                      {property.verified && (
                        <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#047857] shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white/90 text-xs font-medium border border-white/15">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span className="truncate max-w-[200px] sm:max-w-none">
                        {property.city || property.location}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="space-y-4">
                    {/* Number Badge + Subtitle */}
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#022C22] text-[#D6A84F] border border-[#D6A84F]/50 font-black text-lg flex items-center justify-center shadow-2xl shrink-0 ring-2 ring-[#D6A84F]/20">
                        {numberLabel}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D6A84F]">
                            {property.category} Collection
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-xs text-white/80 font-medium">
                            {property.location.split(',')[0]}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                          {property.title}
                        </h3>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-gray-200/90 line-clamp-2 max-w-2xl leading-relaxed">
                      {property.description}
                    </p>

                    {/* Specs & Pricing Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/15">
                      {/* Specs */}
                      <div className="flex items-center space-x-4 sm:space-x-6 text-white/90 text-xs sm:text-sm">
                        {property.bedrooms !== undefined && (
                          <div className="flex items-center space-x-1.5">
                            <Bed className="w-4 h-4 text-[#D6A84F]" />
                            <span className="font-semibold">{property.bedrooms} Beds</span>
                          </div>
                        )}
                        {property.bathrooms !== undefined && (
                          <div className="flex items-center space-x-1.5">
                            <Bath className="w-4 h-4 text-[#D6A84F]" />
                            <span className="font-semibold">{property.bathrooms} Baths</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1.5">
                          <Maximize className="w-4 h-4 text-[#D6A84F]" />
                          <span className="font-semibold">{formatArea(property.area, property.areaUnit)}</span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center flex-wrap gap-3">
                        <div className="text-right mr-2">
                          <span className="block text-[10px] uppercase tracking-wider text-gray-300 font-bold">
                            Total Valuation
                          </span>
                          <span className="font-heading text-xl sm:text-2xl font-black text-[#D6A84F] tracking-tight">
                            {formatPKR(property.pricePKR)}
                          </span>
                        </div>

                        <Link
                          to={`/properties/${property.slug || property.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 py-2.5 rounded-full bg-[#D6A84F] hover:bg-[#c49742] text-[#022C22] font-heading font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg hover:shadow-[#D6A84F]/30 hover:scale-[1.02]"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {onInquire && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInquire(property);
                            }}
                            className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#022C22] backdrop-blur-md border border-white/30 font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Inquire</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE: VERTICAL ACCORDION EXPANDING CARDS */}
      <div className="md:hidden flex flex-col gap-3 w-full">
        {properties.map((property, idx) => {
          const isExpanded = idx === activeIndex;
          const numberLabel = idx + 1;

          return (
            <div
              key={property.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-500 ease-out ${
                isExpanded
                  ? 'h-[420px] border-[#D6A84F]/50 shadow-xl'
                  : 'h-20 border-gray-200 bg-gray-900 shadow-sm'
              }`}
            >
              <img
                src={property.featuredImage}
                alt={property.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isExpanded ? 'filter brightness-90' : 'filter brightness-50'
                }`}
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

              {!isExpanded ? (
                <div className="absolute inset-0 flex items-center justify-between px-5 z-10">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-black text-sm flex items-center justify-center">
                      {numberLabel}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white truncate max-w-[200px]">
                        {property.title}
                      </h4>
                      <p className="text-[11px] text-[#D6A84F] font-semibold">
                        {property.location.split(',')[0]} • {formatPKRShort(property.pricePKR)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-1 rounded-full">
                    Tap to Open
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#022C22] text-[#D6A84F] border border-[#D6A84F]/40 font-black text-xs flex items-center justify-center">
                        {numberLabel}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#064E3B] text-white">
                        For {property.purpose}
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#D6A84F]">
                      {formatPKR(property.pricePKR)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#D6A84F]">
                        {property.category} • {property.location.split(',')[0]}
                      </span>
                      <h3 className="font-heading text-lg font-black text-white leading-tight">
                        {property.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 text-white/90 text-xs">
                      {property.bedrooms !== undefined && <span>{property.bedrooms} Beds</span>}
                      {property.bathrooms !== undefined && <span>{property.bathrooms} Baths</span>}
                      <span>{formatArea(property.area, property.areaUnit)}</span>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Link
                        to={`/properties/${property.slug || property.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 text-center rounded-xl bg-[#D6A84F] text-[#022C22] font-bold text-xs uppercase tracking-wider shadow"
                      >
                        View Details
                      </Link>
                      {onInquire && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInquire(property);
                          }}
                          className="px-4 py-2 rounded-xl bg-white/20 text-white font-bold text-xs uppercase tracking-wider"
                        >
                          Inquire
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

