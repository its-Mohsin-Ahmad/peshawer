import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Bed, Bath, Maximize, Search, Plus, ExternalLink, ArrowRight } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { formatPKR, formatArea } from '../../utils/formatters';

export const UserMyPropertiesPage: React.FC = () => {
  const { userProperties } = useUserAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = userProperties.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#022C22] tracking-tight">
            My Properties
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage your acquired properties, residential villas, and active investment units.
          </p>
        </div>

        <Link
          to="/properties"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#022C22] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Explore More Properties</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your properties..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8F7F2] rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-gray-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#064E3B]"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={property.featuredImage}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#064E3B] text-white">
                    {property.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#047857]">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading text-base font-black text-[#102A24] group-hover:text-[#064E3B] transition-colors">
                  {property.title}
                </h3>

                <div className="flex items-center space-x-1.5 text-xs text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-600 pt-1 border-t border-gray-100">
                  {property.bedrooms !== undefined && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms !== undefined && (
                    <div className="flex items-center space-x-1">
                      <Bath className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Maximize className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>{formatArea(property.area, property.areaUnit)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">
                    Valuation
                  </span>
                  <span className="font-heading text-lg font-black text-[#047857]">
                    {formatPKR(property.pricePKR)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center space-x-2">
              <Link
                to={`/properties/${property.slug}`}
                className="flex-1 py-2.5 rounded-xl bg-[#F8F6EA] hover:bg-[#064E3B] text-[#064E3B] hover:text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center space-x-1"
              >
                <span>View Listing</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

