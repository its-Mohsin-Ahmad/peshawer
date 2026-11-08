import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { EmeraldWaveBackground } from '../common/EmeraldWaveBackground';

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
      tagline: 'Premium high-rise apartments with panoramic alpine valley views in Kalam.',
      image: '/assets/projects/glamorous-heights/hero.png',
      query: 'Kalam',
      badge: 'Kalam',
    },
    {
      name: 'Kalam Cottages',
      tagline: 'Handcrafted alpine chalets nestled among pine forests and river streams of Kalam.',
      image: '/assets/projects/kalam-cottages/hero.png',
      query: 'Kalam',
      badge: 'Kalam',
    },
    {
      name: 'Corner Apartments',
      tagline: 'Dual-balcony corner residences overlooking Kalam Bazaar and surrounding peaks.',
      image: '/assets/projects/corner-apartments-kalam/hero.png',
      query: 'Kalam',
      badge: 'Kalam',
    },
  ];

  return (
    <section className="py-24 bg-[#003D25] text-white relative overflow-hidden">
      <EmeraldWaveBackground intensity="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] block mb-2">
            Our Prime Destinations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            Explore Popular <span className="text-[#FFC83D]">Locations</span>
          </h2>
          <div className="w-20 h-1 bg-[#E6AA27] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(230,170,39,0.5)]" />
          <p className="text-base text-[#E8F3EC]/85">
            From University Town's elite Peshawar enclaves to the breathtaking alpine valleys of Kalam.
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
                to={`/properties?search=${encodeURIComponent(loc.query)}`}
                className="group relative rounded-3xl overflow-hidden shadow-2xl h-[380px] flex flex-col justify-end p-6 border border-[#E6AA27]/25 hover:border-[#FFC83D]/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Background Image */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D1C] via-[#003D25]/60 to-transparent" />

                {/* Badge Top */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#002D1C]/85 text-[#FFC83D] border border-[#E6AA27]/40 backdrop-blur-md">
                    {loc.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center text-xs font-bold text-[#FFC83D] mb-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#E6AA27]" />
                    <span>{count} {count === 1 ? 'Listing' : 'Listings'}</span>
                  </div>

                  <h3 className="font-heading text-xl font-black text-white group-hover:text-[#FFC83D] transition-colors mb-2">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-[#E8F3EC]/80 line-clamp-2 mb-4 leading-relaxed">
                    {loc.tagline}
                  </p>

                  <div className="flex items-center space-x-1 text-xs font-bold text-[#FFC83D] group-hover:translate-x-1 transition-transform">
                    <span>Explore Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

