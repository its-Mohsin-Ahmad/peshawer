import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { PropertyCard } from '../../components/common/PropertyCard';
import { ExpandingPropertyCards } from '../../components/properties/ExpandingPropertyCards';
import { InquiryModal } from '../../components/common/InquiryModal';
import { useData } from '../../contexts/DataContext';
import { Property, PropertyCategory, PropertyPurpose } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  ArrowRight,
  HardHat,
  MapPin,
  Building2,
  TrendingUp,
  LayoutGrid,
  Columns,
} from 'lucide-react';

interface PropertiesPageProps {
  forcedPurpose?: PropertyPurpose;
  forcedCategory?: PropertyCategory;
  pageHeroOverride?: {
    title: string;
    subtitle: string;
    image: string;
  };
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  forcedPurpose,
  forcedCategory,
  pageHeroOverride,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, projects, pageHeroes } = useData();

  // Route-specific hero image determination
  const defaultHero = forcedPurpose === 'Buy'
    ? {
        title: 'Properties For Sale',
        subtitle: 'Explore verified residential homes, plots, and investment assets available for immediate purchase.',
        image: '/assets/hero/slide1.jpg',
      }
    : forcedPurpose === 'Rent'
    ? {
        title: 'Properties For Rent',
        subtitle: 'Find elegant furnished apartments, executive houses, and commercial spaces for rent.',
        image: '/assets/hero/slide3.jpg',
      }
    : forcedCategory === 'Commercial'
    ? {
        title: 'Commercial Real Estate',
        subtitle: 'High-yield corporate offices, retail spaces, and business plazas in Peshawar’s bustling commercial hubs.',
        image: '/assets/pages/why-choose-us.jpg',
      }
    : forcedCategory === 'Plot'
    ? {
        title: 'Plots & Prime Land',
        subtitle: 'Residential and commercial land opportunities across DHA Peshawar, Regi Model Town, and Swat.',
        image: '/assets/hero/slide5.jpg',
      }
    : {
        title: pageHeroes['/properties']?.title || 'Discover Premium Properties',
        subtitle: pageHeroes['/properties']?.subtitle || 'Browse our curated portfolio of residential homes, plots, commercial units, and luxury apartments.',
        image: pageHeroes['/properties']?.image || '/assets/hero/slide4.jpg',
      };

  const heroData = pageHeroOverride || defaultHero;

  // Filters state initialized from query params or props
  const [purpose, setPurpose] = useState<string>(forcedPurpose || searchParams.get('purpose') || 'All');
  const [category, setCategory] = useState<string>(forcedCategory || searchParams.get('category') || 'All');
  const [location, setLocation] = useState<string>(searchParams.get('location') || 'All');
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('bedrooms') || 'All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'flex' | 'grid'>('flex');

  // Sync state with URL params or props whenever route or query string changes
  useEffect(() => {
    const urlCategory = forcedCategory || searchParams.get('category') || 'All';
    setCategory(urlCategory);

    const urlPurpose = forcedPurpose || searchParams.get('purpose') || 'All';
    setPurpose(urlPurpose);

    const urlLocation = searchParams.get('location') || 'All';
    setLocation(urlLocation);

    const urlSearch = searchParams.get('search') || '';
    setSearchQuery(urlSearch);

    const urlMin = searchParams.get('minPrice') || '';
    setMinPrice(urlMin);

    const urlMax = searchParams.get('maxPrice') || '';
    setMaxPrice(urlMax);

    const urlBed = searchParams.get('bedrooms') || 'All';
    setBedrooms(urlBed);
  }, [searchParams, forcedCategory, forcedPurpose]);

  const updateParam = (key: string, val: string, defaultVal: string = 'All') => {
    const next = new URLSearchParams(searchParams);
    if (!val || val === defaultVal) {
      next.delete(key);
    } else {
      next.set(key, val);
    }
    setSearchParams(next, { replace: true });
  };

  // Inquiry modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const locationsList = [
    'All',
    'University Town Peshawar (Town Garden)',
    'Kalam',
    'Swat',
  ];

  const categoriesList = [
    'All',
    'House',
    'Apartment',
    'Plot',
    'Commercial',
    'Cottage',
    'Villa',
    'Residential',
    'Office',
  ];

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => p.published)
      .filter((p) => {
        // Purpose
        if (purpose !== 'All' && p.purpose !== purpose) return false;

        // Category
        if (category !== 'All' && p.category !== category) return false;

        // Location — map display label to actual search keyword
        if (location !== 'All') {
          const locationKeyword =
            location === 'University Town Peshawar (Town Garden)'
              ? 'university town'
              : location.toLowerCase();
          if (
            !p.location.toLowerCase().includes(locationKeyword) &&
            !p.city.toLowerCase().includes(locationKeyword)
          ) {
            return false;
          }
        }

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLoc = p.location.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchDesc) return false;
        }

        // Min Price
        if (minPrice && p.pricePKR < Number(minPrice)) return false;

        // Max Price
        if (maxPrice && p.pricePKR > Number(maxPrice)) return false;

        // Bedrooms
        if (bedrooms !== 'All') {
          if (!p.bedrooms || p.bedrooms < Number(bedrooms)) return false;
        }

        // Verified
        if (verifiedOnly && !p.verified) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricePKR - b.pricePKR;
        if (sortBy === 'price-high') return b.pricePKR - a.pricePKR;
        if (sortBy === 'area-high') return b.area - a.area;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    properties,
    purpose,
    category,
    location,
    searchQuery,
    minPrice,
    maxPrice,
    bedrooms,
    verifiedOnly,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setPurpose(forcedPurpose || 'All');
    setCategory(forcedCategory || 'All');
    setLocation('All');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('All');
    setSearchQuery('');
    setVerifiedOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="bg-[#F8F6EA]/40 min-h-screen">
      {/* Unique Dedicated Page Hero */}
      <PageHero
        title={heroData.title}
        subtitle={heroData.subtitle}
        image={heroData.image}
        breadcrumbs={[
          { label: 'Properties', link: '/properties' },
          ...(forcedPurpose ? [{ label: `For ${forcedPurpose}` }] : []),
          ...(forcedCategory ? [{ label: forcedCategory }] : []),
        ]}
      />

      {/* Featured Signature Development Projects Section */}
      <section className="bg-white border-b border-gray-100 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Master-Planned Portfolio</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#022C22] uppercase tracking-tight">
                Our Four <span className="text-[#D6A84F]">Signature Developments</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Explore dedicated apartment plans, construction updates, and master projects across University Town & Kalam.
              </p>
            </div>
            <Link
              to="/projects"
              className="mt-3 sm:mt-0 text-xs font-bold text-[#064E3B] hover:text-[#D6A84F] flex items-center space-x-1 uppercase tracking-wider shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj) => {
              const progressVal = proj.constructionProgress ?? 80;
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-56 bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={proj.renderBuildingImage || proj.coverImage}
                        alt={proj.name}
                        className="max-h-[195px] max-w-[94%] object-contain filter drop-shadow-[0_10px_20px_rgba(15,23,42,0.15)] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-[#022C22] text-[#D6A84F] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#D6A84F]/30 shadow">
                        {progressVal}% Built
                      </div>
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md text-[10px] font-semibold text-[#064E3B] px-2 py-0.5 rounded shadow-sm">
                        {proj.city || proj.location.split(',')[0]}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-heading text-base font-bold text-[#102A24] group-hover:text-[#064E3B] transition-colors mb-1">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
                        {proj.tagline}
                      </p>

                      {/* Mini Progress bar */}
                      <div className="space-y-1 mb-2">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#064E3B] to-[#D6A84F] rounded-full"
                            style={{ width: `${progressVal}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center space-x-2">
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="flex-1 py-2 text-center rounded-lg bg-white hover:bg-[#064E3B] text-[#064E3B] hover:text-white border border-gray-200 text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Explore Project
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery(proj.name);
                        window.scrollTo({ top: 600, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-2 rounded-lg bg-[#F8F6EA] hover:bg-[#ECFDF5] text-[#064E3B] text-[11px] font-bold border border-gray-200"
                      title={`Filter properties in ${proj.name}`}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter & Listing Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {/* Filter Control Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100 mb-10">
          {/* Top Row: Search and Quick Toggles */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pb-6 border-b border-gray-100">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties by title, keyword, sector..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            {/* Purpose Toggles */}
            <div className="flex items-center space-x-1 bg-[#F8F6EA] p-1.5 rounded-xl border border-gray-100 w-full sm:w-auto overflow-x-auto">
              {['All', 'Buy', 'Rent'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setPurpose(tab);
                    updateParam('purpose', tab);
                  }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    purpose === tab
                      ? 'bg-[#064E3B] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#064E3B]'
                  }`}
                >
                  {tab === 'All' ? 'All Purposes' : `For ${tab}`}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-[#102A24] focus:outline-none focus:border-[#064E3B]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-high">Largest Area</option>
              </select>
            </div>
          </div>

          {/* Bottom Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  updateParam('location', e.target.value);
                }}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium bg-white focus:outline-none focus:border-[#064E3B] ${
                  location !== 'All'
                    ? 'border-[#064E3B] text-[#064E3B] font-bold bg-[#ECFDF5]/30'
                    : 'border-gray-200 text-[#102A24]'
                }`}
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Category
                </label>
                {category !== 'All' && (
                  <span className="text-[10px] text-[#064E3B] font-bold bg-[#ECFDF5] px-1.5 py-0.2 rounded">
                    Active
                  </span>
                )}
              </div>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  updateParam('category', e.target.value);
                }}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium bg-white focus:outline-none focus:border-[#064E3B] ${
                  category !== 'All'
                    ? 'border-[#064E3B] text-[#064E3B] font-bold bg-[#ECFDF5]/30 ring-1 ring-[#064E3B]/20'
                    : 'border-gray-200 text-[#102A24]'
                }`}
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Min Price (PKR)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Max Price (PKR)
              </label>
              <input
                type="number"
                placeholder="e.g. 50000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            {/* Reset / Verified */}
            <div className="flex items-center space-x-3 pt-6">
              <label className="flex items-center space-x-2 text-xs text-[#102A24] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#064E3B] focus:ring-0"
                />
                <span>Verified Only</span>
              </label>

              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:text-[#064E3B] hover:bg-gray-50 flex items-center space-x-1"
                title="Reset All Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Layout View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-xs sm:text-sm text-[#64748B] font-medium">
            Showing <strong className="text-[#022C22]">{filteredProperties.length}</strong> verified flagship properties
          </p>

          {filteredProperties.length > 0 && (
            <div className="inline-flex items-center p-1 bg-white border border-gray-200 rounded-2xl shadow-xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('flex')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'flex'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#064E3B] hover:bg-[#F8F6EA]'
                }`}
                title="Interactive Expanding Flex Cards"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Expanding Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#064E3B] hover:bg-[#F8F6EA]'
                }`}
                title="Classic Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          )}
        </div>

        {/* Properties Presentation */}
        {filteredProperties.length > 0 ? (
          viewMode === 'flex' ? (
            <ExpandingPropertyCards
              properties={filteredProperties}
              onInquire={(p) => {
                setSelectedProperty(p);
                setInquiryModalOpen(true);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onInquire={(p) => {
                    setSelectedProperty(p);
                    setInquiryModalOpen(true);
                  }}
                />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#022C22] mb-2">
              No matching properties found
            </h3>
            <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
              We couldn't find any listings matching your specific search filters. Try adjusting your price bracket or location criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#022C22] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {selectedProperty && (
        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          itemTitle={selectedProperty.title}
          itemType="property"
          itemId={selectedProperty.id}
        />
      )}
    </div>
  );
};

