import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, DollarSign, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const AdvancedSearch: React.FC = () => {
  const navigate = useNavigate();

  const [purpose, setPurpose] = useState<'Buy' | 'Rent' | 'Lease'>('Buy');
  const [location, setLocation] = useState('Peshawar');
  const [category, setCategory] = useState('Plot');
  const [minPrice, setMinPrice] = useState('5000000');
  const [maxPrice, setMaxPrice] = useState('25000000');
  const [bedrooms, setBedrooms] = useState('Any');
  const [areaUnit, setAreaUnit] = useState('Marla');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const locationsList = [
    'Peshawar',
    'Hayatabad',
    'University Town',
    'DHA Peshawar',
    'Regi Model Town',
    'Warsak Road',
    'Saddar',
    'Ring Road',
    'Kalam',
    'Swat',
  ];

  const categoriesList = [
    'Plot',
    'Residential',
    'Commercial',
    'House',
    'Apartment',
    'Shop',
    'Office',
    'Cottage',
    'Villa',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (location && location !== 'Peshawar') params.set('location', location);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms && bedrooms !== 'Any') params.set('bedrooms', bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setPurpose('Buy');
    setLocation('Peshawar');
    setCategory('Plot');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('Any');
  };

  return (
    <div className="relative -mt-16 sm:-mt-20 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-7 backdrop-blur-md">
        {/* Purpose Tabs (Buy / Rent / Lease) */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
          <div className="flex items-center space-x-2">
            {(['Buy', 'Rent', 'Lease'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPurpose(tab)}
                className={`px-6 py-2 rounded-lg text-xs font-heading font-extrabold uppercase tracking-wider transition-all ${
                  purpose === tab
                    ? 'bg-[#064E3B] text-white shadow-md'
                    : 'bg-[#F8F6EA] text-[#102A24] hover:bg-[#ECFDF5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="hidden sm:flex items-center space-x-1 text-xs text-[#64748B] hover:text-[#064E3B] font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>

        {/* Main Search Row */}
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#064E3B] mr-1" />
                <span>Location</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] bg-white"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center">
                <Building className="w-3.5 h-3.5 text-[#064E3B] mr-1" />
                <span>Property Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] bg-white"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center">
                <DollarSign className="w-3.5 h-3.5 text-[#D6A84F] mr-1" />
                <span>Price (PKR)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="number"
                  placeholder="Min (PKR)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-2.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B]"
                />
                <input
                  type="number"
                  placeholder="Max (PKR)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-2.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-[#102A24] focus:outline-none focus:border-[#064E3B]"
                />
              </div>
            </div>

            {/* Search Button & Toggle */}
            <div className="flex items-end space-x-2">
              <button
                type="button"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center shrink-0"
                title="More Filters"
              >
                <SlidersHorizontal className="w-5 h-5 text-[#064E3B]" />
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B88628] hover:shadow-gold-glow text-[#022C22] font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 h-[42px]"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </div>

          {/* More Filters Expandable */}
          {showMoreFilters && (
            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white"
                >
                  <option value="Any">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Area Unit
                </label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white"
                >
                  <option value="Marla">Marla</option>
                  <option value="Kanal">Kanal</option>
                  <option value="sq ft">sq ft</option>
                  <option value="sq m">sq m</option>
                </select>
              </div>

              <div className="flex items-end">
                <span className="text-xs text-[#64748B] leading-relaxed">
                  Showing verified listings in Peshawar and scenic Swat valley.
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

