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
      <div className="hidden md:flex items-stretch gap-3.5 lg:gap-5 h-[62vh] min-h-[500px] max-h-[720px] w-full">
        {properties.map((property, idx) => {
          const isExpanded = idx === activeIndex;
          const numberLabel = idx + 1;

          return (
            <div
              key={property.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-[28px] lg:rounded-[34px] overflow-hidden cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
                isExpanded
                  ? 'flex-[4.5] lg:flex-[5.5] border-2 border-[#FFC83D] shadow-[0_0_35px_rgba(255,200,61,0.3),0_25px_60px_-15px_rgba(0,0,0,0.7)]'
                  : 'flex-[0.9] lg:flex-[1] min-w-[85px] lg:min-w-[105px] border border-[#E6AA27]/30 hover:border-[#FFC83D]/80 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Background Property Image - Bright, crisp and vivid */}
              <img
                src={property.featuredImage}
                alt={property.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  isExpanded
                    ? 'scale-100 filter brightness-105 contrast-[1.03]'
                    : 'scale-105 group-hover:scale-110 filter brightness-85 group-hover:brightness-100'
                }`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hero/slide1.jpg';
                }}
              />

              {/* Dynamic Lighting & Gradient Overlays - Subtle & Bright */}
              {isExpanded ? (
                <>
                  {/* Gentle top vignette so badges stay super crisp */}
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#002D1C]/80 via-[#002D1C]/30 to-transparent pointer-events-none" />
                  {/* Clean bottom glass gradient container */}
                  <div className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-[#002417] via-[#002417]/85 to-transparent pointer-events-none" />
                  {/* Ambient golden corner illumination */}
                  <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFC83D]/10 rounded-full blur-3xl pointer-events-none" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#002D1C]/60 via-transparent to-[#002D1C]/85 pointer-events-none group-hover:opacity-60 transition-opacity duration-300" />
              )}

              {/* COLLAPSED STATE CONTENT (Vertical Pill View) */}
              {!isExpanded && (
                <div className="absolute inset-0 flex flex-col items-center justify-between py-6 px-2 z-10">
                  {/* Category Pill Mini Tag */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC83D] shadow-[0_0_8px_#FFC83D] group-hover:scale-150 transition-transform duration-300" />

                  {/* Vertical Rotated Title */}
                  <div className="flex-1 flex items-center justify-center my-4 overflow-hidden pointer-events-none">
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs lg:text-[13px] font-extrabold uppercase tracking-[0.2em] text-white group-hover:text-[#FFC83D] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors truncate max-h-[380px]">
                      {property.title}
                    </span>
                  </div>

                  {/* Number Badge at Bottom */}
                  <div className="w-11 h-11 rounded-full bg-[#002D1C]/90 backdrop-blur-md border border-[#FFC83D]/40 text-[#FFC83D] font-black text-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#FFC83D] group-hover:text-[#002D1C] transition-all duration-300">
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
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] shadow-md">
                        For {property.purpose}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#002D1C]/90 backdrop-blur-md text-white border border-[#FFC83D]/40 shadow-sm">
                        {property.category}
                      </span>
                      {property.verified && (
                        <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#003D25]/90 border border-[#FFC83D]/40 text-[#FFC83D] backdrop-blur-md shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 fill-[#FFC83D] text-[#002D1C]" />
                          <span>Verified Title</span>
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#002D1C]/90 backdrop-blur-md text-white text-xs font-bold border border-[#FFC83D]/30 shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#FFC83D]" />
                      <span className="truncate max-w-[200px] sm:max-w-none text-white font-semibold">
                        {property.city || property.location}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="space-y-4">
                    {/* Number Badge + Subtitle */}
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#FFC83D] text-[#002D1C] font-black text-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,200,61,0.5)] shrink-0 ring-4 ring-[#002D1C]">
                        {numberLabel}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFC83D]">
                            {property.category} Collection
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-xs text-[#E8F3EC] font-semibold">
                            {property.location.split(',')[0]}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-lg">
                          {property.title}
                        </h3>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#E8F3EC]/95 line-clamp-2 max-w-2xl leading-relaxed font-normal drop-shadow-sm">
                      {property.description}
                    </p>

                    {/* Specs & Pricing Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#FFC83D]/30">
                      {/* Specs */}
                      <div className="flex items-center space-x-4 sm:space-x-6 text-white text-xs sm:text-sm">
                        {property.bedrooms !== undefined && (
                          <div className="flex items-center space-x-1.5 bg-[#002D1C]/70 px-3 py-1.5 rounded-lg border border-white/10">
                            <Bed className="w-4 h-4 text-[#FFC83D]" />
                            <span className="font-bold">{property.bedrooms} Beds</span>
                          </div>
                        )}
                        {property.bathrooms !== undefined && (
                          <div className="flex items-center space-x-1.5 bg-[#002D1C]/70 px-3 py-1.5 rounded-lg border border-white/10">
                            <Bath className="w-4 h-4 text-[#FFC83D]" />
                            <span className="font-bold">{property.bathrooms} Baths</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1.5 bg-[#002D1C]/70 px-3 py-1.5 rounded-lg border border-white/10">
                          <Maximize className="w-4 h-4 text-[#FFC83D]" />
                          <span className="font-bold">{formatArea(property.area, property.areaUnit)}</span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center flex-wrap gap-3">
                        <div className="text-right mr-2 bg-[#002D1C]/80 px-4 py-1.5 rounded-xl border border-[#FFC83D]/30 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider text-[#E8F3EC]/80 font-bold">
                            Total Valuation
                          </span>
                          <span className="font-heading text-xl sm:text-2xl font-black text-[#FFC83D] tracking-tight drop-shadow-[0_2px_8px_rgba(255,200,61,0.3)]">
                            {formatPKR(property.pricePKR)}
                          </span>
                        </div>

                        <Link
                          to={`/properties/${property.slug || property.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-[0_4px_20px_rgba(255,200,61,0.4)] hover:scale-105 active:scale-95"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                        </Link>

                        {onInquire && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInquire(property);
                            }}
                            className="px-4 py-3 rounded-full bg-[#003D25] hover:bg-[#004B2E] text-white border border-[#FFC83D]/50 font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 hover:scale-105"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#FFC83D]" />
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
                  ? 'h-[440px] border-2 border-[#FFC83D] shadow-[0_0_25px_rgba(255,200,61,0.3)]'
                  : 'h-20 border-[#E6AA27]/30 bg-[#002D1C] shadow-sm'
              }`}
            >
              <img
                src={property.featuredImage}
                alt={property.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isExpanded ? 'filter brightness-105 contrast-[1.02]' : 'filter brightness-75'
                }`}
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002417] via-[#002417]/60 to-transparent pointer-events-none" />

              {!isExpanded ? (
                <div className="absolute inset-0 flex items-center justify-between px-5 z-10">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FFC83D] text-[#002D1C] font-black text-sm flex items-center justify-center shadow-md">
                      {numberLabel}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white truncate max-w-[200px]">
                        {property.title}
                      </h4>
                      <p className="text-[11px] text-[#FFC83D] font-bold">
                        {property.location.split(',')[0]} • {formatPKRShort(property.pricePKR)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#003D25] border border-[#FFC83D]/40 text-[#FFC83D] px-2.5 py-1 rounded-full">
                    Tap to Open
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFC83D] text-[#002D1C] font-black text-xs flex items-center justify-center shadow">
                        {numberLabel}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C]">
                        For {property.purpose}
                      </span>
                    </div>
                    <span className="text-sm font-black text-[#FFC83D] bg-[#002D1C]/80 px-2.5 py-1 rounded-lg border border-[#FFC83D]/30">
                      {formatPKR(property.pricePKR)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC83D]">
                        {property.category} • {property.location.split(',')[0]}
                      </span>
                      <h3 className="font-heading text-lg font-black text-white leading-tight">
                        {property.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3 text-white text-xs font-semibold">
                      {property.bedrooms !== undefined && <span>{property.bedrooms} Beds</span>}
                      {property.bathrooms !== undefined && <span>{property.bathrooms} Baths</span>}
                      <span>{formatArea(property.area, property.areaUnit)}</span>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Link
                        to={`/properties/${property.slug || property.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] font-black text-xs uppercase tracking-wider shadow-md"
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
                          className="px-4 py-2.5 rounded-xl bg-[#003D25] text-white border border-[#FFC83D]/40 font-bold text-xs uppercase tracking-wider"
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

