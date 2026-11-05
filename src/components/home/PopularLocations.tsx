import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const PopularLocations: React.FC = () => {
  const { properties } = useData();

  const locations = [
    {
      name: 'University Town',
      tagline: 'Elite enclave of Peshawar — luxury villas, consulates, and verdant tree-lined avenues.',
      image: '/assets/projects/town-garden/hero.png',
      query: 'University Town',
      badge: 'Peshawar',
    },
    {
      name: 'Glamorous Heights',
      tagline: 'Premium high-rise apartments with panoramic alpine valley views in Kalam, Swat.',
      image: '/assets/projects/glamorous-heights/hero.png',
      query: 'Kalam',
      badge: 'Kalam, Swat',
    },
    {
      name: 'Kalam Cottages',
      tagline: 'Handcrafted alpine chalets nestled among pine forests and river streams of Kalam.',
      image: '/assets/projects/kalam-cottages/hero.png',
      query: 'Kalam',
      badge: 'Kalam, Swat',
    },
    {
      name: 'Corner Apartments',
      tagline: 'Dual-balcony corner residences overlooking Kalam Bazaar and surrounding peaks.',
      image: '/assets/projects/corner-apartments-kalam/hero.png',
      query: 'Kalam',
      badge: 'Kalam, Swat',
    },
  ];

  return (
    <section className="py-24 bg-[#F8F6EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
            Our Prime Destinations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#022C22] tracking-tight uppercase mb-4">
            Explore Popular <span className="text-[#D6A84F]">Locations</span>
          </h2>
          <div className="w-20 h-1 bg-[#D6A84F] mx-auto rounded-full mb-4" />
          <p className="text-base text-[#64748B]">
            From University Town's elite Peshawar enclaves to the breathtaking alpine valleys of Kalam, Swat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => {
            const count = properties.filter((p) =>
              p.location.toLowerCase().includes(loc.query.toLowerCase())
            ).length;

            return (
              <Link
                key={idx}
                to={`/properties?location=${encodeURIComponent(loc.query)}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-end p-5 text-white"
              >
                {/* Background Image with Zoom */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#022C22] via-[#022C22]/50 to-transparent" />

                {/* Location badge top-left */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#064E3B]/80 border border-[#D6A84F]/40 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[#D6A84F]" />
                  <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider">{loc.badge}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-heading text-lg font-bold text-white leading-snug">
                      {loc.name}
                    </h3>
                    {count > 0 && (
                      <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-bold shrink-0 ml-2">
                        {count} {count === 1 ? 'Listing' : 'Listings'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#ECFDF5]/80 line-clamp-2 mb-3">
                    {loc.tagline}
                  </p>

                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-[#E6C678] group-hover:text-white transition-colors">
                    <span>Explore Properties</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

