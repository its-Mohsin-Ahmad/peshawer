import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { PropertyCard } from '../common/PropertyCard';
import { Property } from '../../types';
import { AnimatedSection } from '../common/AnimatedSection';

interface FeaturedPropertiesProps {
  onInquireProperty?: (prop: Property) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onInquireProperty }) => {
  const { properties } = useData();
  const [activeTab, setActiveTab] = useState<'All' | 'Buy' | 'Rent' | 'Plot'>('All');

  const published = properties.filter((p) => p.published);

  const filtered = published.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Buy') return p.purpose === 'Buy' && p.category !== 'Plot';
    if (activeTab === 'Rent') return p.purpose === 'Rent';
    if (activeTab === 'Plot') return p.category === 'Plot';
    return true;
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Verified Listings</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight">
              Featured <span className="text-[#D6A84F]">Properties</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1.5 bg-[#F8F6EA] p-1.5 rounded-xl border border-gray-100 overflow-x-auto">
            {(['All', 'Buy', 'Rent', 'Plot'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn-hover px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#064E3B]'
                }`}
              >
                {tab === 'All' ? 'All Listings' : tab === 'Buy' ? 'For Sale' : tab === 'Rent' ? 'For Rent' : 'Plots & Land'}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInquire={onInquireProperty}
            />
          ))}
        </div>

        <AnimatedSection className="mt-14 text-center">
          <Link
            to="/properties"
            className="btn-hover btn-arrow-hover inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore All Properties ({published.length})</span>
            <ArrowRight className="arrow-icon w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

