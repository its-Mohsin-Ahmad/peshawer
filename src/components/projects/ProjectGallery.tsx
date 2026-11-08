import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import { Lightbox } from '../common/Lightbox';

interface ProjectGalleryProps {
  gallery: {
    all: string[];
    exterior: string[];
    interior: string[];
  };
  projectName: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery, projectName }) => {
  const defaultTab = gallery.exterior.length > 0 ? 'exterior' : 'interior';
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>(defaultTab);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const currentList =
    activeTab === 'interior' && gallery.interior.length > 0
      ? gallery.interior
      : gallery.exterior.length > 0
      ? gallery.exterior
      : gallery.all;

  const openLightboxAt = (idx: number) => {
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section className="py-24 bg-[#002D1C] text-white border-t border-[#E6AA27]/20 relative overflow-hidden" id="project-gallery">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#004B2E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#003D25] text-[#FFC83D] border border-[#FFC83D]/40 text-xs font-bold uppercase tracking-wider mb-3 shadow-md">
              <Camera className="w-3.5 h-3.5 text-[#FFC83D]" />
              <span>Architectural Showcase</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              Project <span className="text-[#FFC83D]">Gallery</span>
            </h2>
            <div className="w-16 h-1 bg-[#E6AA27] rounded-full mt-3 shadow-[0_0_12px_rgba(230,170,39,0.5)]" />
          </div>

          {/* Category Tabs — Exterior and Interior */}
          <div className="flex items-center space-x-2 bg-[#002417] p-1.5 rounded-2xl border border-[#E6AA27]/30 shadow-md">
            {gallery.exterior.length > 0 && (
              <button
                onClick={() => setActiveTab('exterior')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'exterior'
                    ? 'bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] shadow-md font-extrabold'
                    : 'text-[#E8F3EC]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Exterior ({gallery.exterior.length})
              </button>
            )}
            {gallery.interior.length > 0 && (
              <button
                onClick={() => setActiveTab('interior')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'interior'
                    ? 'bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] text-[#002D1C] shadow-md font-extrabold'
                    : 'text-[#E8F3EC]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Interior ({gallery.interior.length})
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentList.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightboxAt(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#002417] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E6AA27]/25 hover:border-[#FFC83D]/60"
            >
              <img
                src={img}
                alt={`${projectName} photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#002D1C]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                <div className="p-3 rounded-full bg-[#FFC83D] text-[#002D1C] shadow-lg font-bold">
                  <Maximize2 className="w-5 h-5 text-[#002D1C]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={currentList}
        initialIndex={selectedPhotoIndex}
        title={projectName}
      />
    </section>
  );
};

