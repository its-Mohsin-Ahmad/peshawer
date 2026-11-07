import React, { useState } from 'react';
import { Image as ImageIcon, Search, Trash2, Eye, Upload, Filter, Copy, Check } from 'lucide-react';
import { Lightbox } from '../../components/common/Lightbox';

export const AdminMediaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Pre-cataloged verified media assets
  const mediaList = [
    { title: 'Brand Official Logo', path: '/assets/logo.png', category: 'Branding', size: '108 KB' },
    { title: 'Carousel Slide 1 (Modern Villa)', path: '/assets/hero/slide1.jpg', category: 'Hero', size: '420 KB' },
    { title: 'Carousel Slide 2 (Jaipur Luxury)', path: '/assets/hero/slide2.jpg', category: 'Hero', size: '380 KB' },
    { title: 'Carousel Slide 3 (Apartments)', path: '/assets/hero/slide3.jpg', category: 'Hero', size: '490 KB' },
    { title: 'Carousel Slide 4 (Market View)', path: '/assets/hero/slide4.jpg', category: 'Hero', size: '410 KB' },
    { title: 'Carousel Slide 5 (City Concept)', path: '/assets/hero/slide5.jpg', category: 'Hero', size: '350 KB' },
    { title: 'Glamorous Heights 3D Render', path: '/assets/buildings/building-1.png', category: 'Renders', size: '318 KB' },
    { title: 'Town Garden 3D Render', path: '/assets/buildings/building-2.png', category: 'Renders', size: '324 KB' },
    { title: 'Kalam Cottages 3D Render', path: '/assets/buildings/kalam-cottage.png', category: 'Renders', size: '290 KB' },
    { title: 'Corner Apartments 3D Render', path: '/assets/buildings/building-4.png', category: 'Renders', size: '310 KB' },
    { title: 'Glamorous Heights Hero Sunset', path: '/assets/projects/glamorous-heights/hero.png', category: 'Projects', size: '3.3 MB' },
    { title: 'Town Garden Luxury Villa Hero', path: '/assets/projects/town-garden/hero.png', category: 'Projects', size: '2.6 MB' },
    { title: 'Kalam Cottages Golden Dusk Hero', path: '/assets/projects/kalam-cottages/hero.png', category: 'Projects', size: '3.0 MB' },
    { title: 'Corner Apartments Kalam Hero', path: '/assets/projects/corner-apartments-kalam/hero.png', category: 'Projects', size: '3.2 MB' },
    { title: 'About Us Architecture Hero', path: '/assets/pages/about-hero.jpg', category: 'Pages', size: '80 KB' },
    { title: 'Contact Office Hero', path: '/assets/pages/contact-hero.jpg', category: 'Pages', size: '48 KB' },
    { title: 'Why Choose Us Aerial City', path: '/assets/pages/why-choose-us.jpg', category: 'Pages', size: '70 KB' },
  ];

  const filtered = mediaList.filter((m) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.path.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCopy = (path: string, idx: number) => {
    navigator.clipboard.writeText(path);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const openPreview = (idx: number) => {
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Media Library & Assets
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Architectural photography, 3D building renders, project heroes, and video assets.
          </p>
        </div>

        <button
          onClick={() => alert('New media files can be added to /public/assets or uploaded to storage.')}
          className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm hover:bg-[#022C22] transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search media by title or folder..."
          className="w-full pl-10 pr-4 py-1.5 text-xs focus:outline-none"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-[#F8F6EA] flex items-center justify-center overflow-hidden">
              <img
                src={item.path}
                alt={item.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold uppercase">
                {item.category}
              </span>
              <button
                onClick={() => openPreview(idx)}
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3">
              <div className="font-bold text-xs text-[#102A24] truncate" title={item.title}>
                {item.title}
              </div>
              <div className="text-[10px] text-gray-400 font-mono truncate mt-0.5">
                {item.path}
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-500 font-medium">{item.size}</span>
                <button
                  onClick={() => handleCopy(item.path, idx)}
                  className="text-[10px] font-bold text-[#064E3B] hover:text-[#D6A84F] flex items-center space-x-1"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filtered.map((f) => f.path)}
        initialIndex={selectedPhotoIndex}
        title={filtered[selectedPhotoIndex]?.title}
      />
    </div>
  );
};

