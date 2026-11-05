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
    <section className="py-20 bg-[#F8F6EA]/50" id="project-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Architectural Showcase</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight">
              Project <span className="text-[#D6A84F]">Gallery</span>
            </h2>
          </div>

          {/* Category Tabs — Exterior and Interior Only (All Photos Option Removed) */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-gray-200">
            {gallery.exterior.length > 0 && (
              <button
                onClick={() => setActiveTab('exterior')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'exterior'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#064E3B]'
                }`}
              >
                Exterior ({gallery.exterior.length})
              </button>
            )}
            {gallery.interior.length > 0 && (
              <button
                onClick={() => setActiveTab('interior')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'interior'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#064E3B]'
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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img}
                alt={`${projectName} photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                <div className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md">
                  <Maximize2 className="w-5 h-5 text-white" />
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

