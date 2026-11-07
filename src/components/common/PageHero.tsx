import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  onCtaPrimaryClick?: () => void;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  onCtaSecondaryClick?: () => void;
  overlayOpacity?: number;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  image,
  badge,
  breadcrumbs,
  ctaPrimaryText,
  ctaPrimaryLink,
  onCtaPrimaryClick,
  ctaSecondaryText,
  ctaSecondaryLink,
  onCtaSecondaryClick,
  overlayOpacity = 0.75,
}) => {
  return (
    <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden bg-[#002D1C] pt-24 pb-14 text-white">
      {/* Background Image with Fallback */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        loading="eager"
        onError={(e) => {
          // graceful fallback if image not found
          (e.target as HTMLImageElement).src = '/assets/hero/slide1.jpg';
        }}
      />

      {/* Dark Forest Green Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#002D1C] via-[#002D1C]/90 to-[#003D25]/75"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle Gold light accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFC83D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-xs text-[#E8F3EC]/80 mb-4 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-[#FFC83D] transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-[#FFC83D]" />
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-[#FFC83D] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#FFC83D] font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Optional Badge */}
        {badge && (
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#003D25] border border-[#FFC83D]/50 text-[#FFC83D] text-xs font-bold uppercase tracking-wider mb-3">
            <span>★</span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight uppercase max-w-4xl">
          {title}
        </h1>

        {/* Gold Architectural Divider */}
        <div className="w-20 h-1 bg-[#FFC83D] rounded-full mb-4 shadow-[0_0_12px_rgba(255,200,61,0.6)]" />

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base lg:text-lg text-[#E8F3EC]/90 max-w-2xl font-normal leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Action Buttons */}
        {(ctaPrimaryText || ctaSecondaryText) && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {ctaPrimaryText &&
              (ctaPrimaryLink ? (
                <Link
                  to={ctaPrimaryLink}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
                >
                  {ctaPrimaryText}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onCtaPrimaryClick}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
                >
                  {ctaPrimaryText}
                </button>
              ))}

            {ctaSecondaryText &&
              (ctaSecondaryLink ? (
                <Link
                  to={ctaSecondaryLink}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-[#E6AA27]/40 font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {ctaSecondaryText}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onCtaSecondaryClick}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-[#E6AA27]/40 font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {ctaSecondaryText}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

