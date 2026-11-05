import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Property, PropertyCategory, PropertyPurpose, AreaUnit } from '../../types';
import { formatPKR, formatArea } from '../../utils/formatters';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  Star,
  Eye,
  EyeOff,
  X,
  ExternalLink,
} from 'lucide-react';

export const AdminPropertiesPage: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPurpose, setFilterPurpose] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<PropertyPurpose>('Buy');
  const [category, setCategory] = useState<PropertyCategory>('House');
  const [pricePKR, setPricePKR] = useState(15000000);
  const [location, setLocation] = useState('Hayatabad, Peshawar');
  const [address, setAddress] = useState('Sector F, Phase 5');
  const [city, setCity] = useState('Peshawar');
  const [area, setArea] = useState(10);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('Marla');
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(4);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [status, setStatus] = useState<Property['status']>('Available');
  const [featuredImage, setFeaturedImage] = useState('/assets/hero/slide1.jpg');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('Modern Elevation, Car Parking, Sui Gas, Water Bore');

  const filteredProperties = properties.filter((p) => {
    if (filterPurpose !== 'All' && p.purpose !== filterPurpose) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setPurpose('Buy');
    setCategory('House');
    setPricePKR(15000000);
    setLocation('Hayatabad, Peshawar');
    setAddress('Sector F, Phase 5');
    setCity('Peshawar');
    setArea(10);
    setAreaUnit('Marla');
    setBedrooms(4);
    setBathrooms(4);
    setFeatured(false);
    setPublished(true);
    setStatus('Available');
    setFeaturedImage('/assets/hero/slide1.jpg');
    setDescription('Brand new designer home with top quality fixtures.');
    setFeatures('Modern Elevation, Car Parking, Sui Gas, Water Bore');
    setModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingId(prop.id);
    setTitle(prop.title);
    setPurpose(prop.purpose);
    setCategory(prop.category);
    setPricePKR(prop.pricePKR);
    setLocation(prop.location);
    setAddress(prop.address);
    setCity(prop.city);
    setArea(prop.area);
    setAreaUnit(prop.areaUnit);
    setBedrooms(prop.bedrooms || 0);
    setBathrooms(prop.bathrooms || 0);
    setFeatured(prop.featured);
    setPublished(prop.published);
    setStatus(prop.status);
    setFeaturedImage(prop.featuredImage);
    setDescription(prop.description);
    setFeatures(prop.features.join(', '));
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const featArray = features
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingId) {
      updateProperty(editingId, {
        title,
        slug,
        purpose,
        category,
        pricePKR: Number(pricePKR),
        location,
        address,
        city,
        area: Number(area),
        areaUnit,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        featured,
        published,
        status,
        featuredImage,
        description,
        features: featArray,
      });
    } else {
      addProperty({
        title,
        slug,
        purpose,
        category,
        pricePKR: Number(pricePKR),
        location,
        address,
        city,
        area: Number(area),
        areaUnit,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        featured,
        published,
        status,
        featuredImage,
        gallery: [featuredImage],
        description,
        features: featArray,
        verified: true,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Property Management
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Create, edit, feature, and publish property listings on the platform.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white text-xs font-heading font-extrabold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Property</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500 font-medium">Filter Purpose:</span>
          <select
            value={filterPurpose}
            onChange={(e) => setFilterPurpose(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
          >
            <option value="All">All Purposes</option>
            <option value="Buy">For Buy</option>
            <option value="Rent">For Rent</option>
            <option value="Lease">For Lease</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (PKR)</th>
                <th className="py-3.5 px-4">Area / Specs</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={prop.featuredImage}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-100"
                      />
                      <div className="max-w-[200px]">
                        <div className="font-bold text-[#102A24] truncate">{prop.title}</div>
                        <div className="text-[11px] text-[#64748B] truncate">{prop.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#022C22]">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px]">
                      {prop.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#064E3B] whitespace-nowrap">
                    {formatPKR(prop.pricePKR)}
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    {formatArea(prop.area, prop.areaUnit)}
                    {prop.bedrooms ? ` • ${prop.bedrooms} Bed` : ''}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        prop.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'Sold'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => updateProperty(prop.id, { featured: !prop.featured })}
                      className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-amber-500"
                      title={prop.featured ? 'Unfeature' : 'Mark Featured'}
                    >
                      <Star className={`w-4 h-4 ${prop.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => updateProperty(prop.id, { published: !prop.published })}
                      className={`p-1 rounded text-xs font-bold ${
                        prop.published ? 'text-[#047857]' : 'text-gray-400'
                      }`}
                      title={prop.published ? 'Unpublish' : 'Publish'}
                    >
                      {prop.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(prop)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#064E3B] hover:bg-gray-100"
                        title="Edit Listing"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete property: "${prop.title}"?`)) {
                            deleteProperty(prop.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Property Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">
                {editingId ? 'Edit Property Record' : 'Create New Property'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1 Kanal Modern Villa in Hayatabad"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as PropertyPurpose)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Lease">Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Property['status'])}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                    <option value="Under Offer">Under Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={pricePKR}
                    onChange={(e) => setPricePKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Area Value
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Area Unit
                  </label>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="sq ft">sq ft</option>
                    <option value="sq m">sq m</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Location Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. University Town, Peshawar"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Featured Image Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="/assets/hero/slide1.jpg"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Features (Comma Separated)
                </label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="e.g. Solid Wood Doors, Solar Power, Generator Backup"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#102A24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-[#064E3B]"
                  />
                  <span>Mark as Featured Listing</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-[#102A24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded text-[#064E3B]"
                  />
                  <span>Publish to Public Marketplace</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] hover:bg-[#022C22] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  {editingId ? 'Save Changes' : 'Create Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

