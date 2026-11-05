import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Trees, Landmark, Store, ArrowUpRight } from 'lucide-react';

export const PropertyCategories: React.FC = () => {
  const categories = [
    {
      title: 'Residential Properties',
      description: 'Exclusive family homes and designer villas in Peshawar’s finest neighborhoods.',
      image: '/assets/hero/slide1.jpg',
      link: '/properties?category=Residential',
      icon: Home,
    },
    {
      title: 'Commercial Properties',
      description: 'Corporate office suites, retail shops, and commercial plazas in high-footfall avenues.',
      image: '/assets/pages/why-choose-us.jpg',
      link: '/properties/commercial',
      icon: Landmark,
    },
    {
      title: 'Apartments & Suites',
      description: 'Contemporary apartments with 5-year easy installments and turnkey finishes.',
      image: '/assets/projects/town-garden/hero.png',
      link: '/properties?category=Apartment',
      icon: Building2,
    },
    {
      title: 'Houses & Luxury Villas',
      description: 'Architecturally curated homes with double-height lobbies and premium amenities.',
      image: '/assets/hero/slide2.jpg',
      link: '/properties?category=House',
      icon: Store,
    },
    {
      title: 'Plots & Prime Land',
      description: 'Clear title residential and commercial plots ready for construction in DHA & Regi.',
      image: '/assets/hero/slide5.jpg',
      link: '/properties/plots',
      icon: Trees,
    },
    {
      title: 'Development Projects',
      description: 'Discover master-planned tourism and urban residential projects in Swat & Peshawar.',
      image: '/assets/projects/glamorous-heights/hero.png',
      link: '/projects',
      icon: Building2,
    },
  ];

  return (
    <section className="py-20 bg-[#F8F6EA]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
              Explore By Category
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight">
              Featured Property <span className="text-[#D6A84F]">Categories</span>
            </h2>
          </div>
          <Link
            to="/properties"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-heading font-extrabold text-[#064E3B] hover:text-[#D6A84F] uppercase tracking-wider transition-colors"
          >
            <span>View All Properties</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022C22]/90 via-[#022C22]/40 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#064E3B] shadow-sm">
                    <Icon className="w-5 h-5 text-[#064E3B]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#102A24] group-hover:text-[#064E3B] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-bold text-[#064E3B] group-hover:text-[#D6A84F] transition-colors">
                    <span>Explore Category</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

