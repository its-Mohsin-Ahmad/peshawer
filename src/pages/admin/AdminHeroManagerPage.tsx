import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { HeroSlide, PageHero } from '../../types';
import { Sliders, Image as ImageIcon, Edit2, CheckCircle2, Eye, EyeOff, X } from 'lucide-react';

export const AdminHeroManagerPage: React.FC = () => {
  const { heroSlides, pageHeroes, updateHeroSlide, updatePageHero } = useData();

  const [activeTab, setActiveTab] = useState<'carousel' | 'page-heroes'>('carousel');

  // Slide Edit Modal
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideImage, setSlideImage] = useState('');
  const [slideCta1, setSlideCta1] = useState('');
  const [slideCta1Link, setSlideCta1Link] = useState('');
  const [slideCta2, setSlideCta2] = useState('');
  const [slideCta2Link, setSlideCta2Link] = useState('');

  // Page Hero Edit Modal
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [editingPagePath, setEditingPagePath] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [pageImage, setPageImage] = useState('');

  const openEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideImage(slide.image);
    setSlideCta1(slide.ctaPrimaryText);
    setSlideCta1Link(slide.ctaPrimaryLink);
    setSlideCta2(slide.ctaSecondaryText);
    setSlideCta2Link(slide.ctaSecondaryLink);
    setSlideModalOpen(true);
  };

  const handleSlideSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    updateHeroSlide(editingSlide.id, {
      title: slideTitle,
      subtitle: slideSubtitle,
      image: slideImage,
      ctaPrimaryText: slideCta1,
      ctaPrimaryLink: slideCta1Link,
      ctaSecondaryText: slideCta2,
      ctaSecondaryLink: slideCta2Link,
    });

    setSlideModalOpen(false);
  };

  const openEditPageHero = (path: string, hero: PageHero) => {
    setEditingPagePath(path);
    setPageTitle(hero.title);
    setPageSubtitle(hero.subtitle);
    setPageImage(hero.image);
    setPageModalOpen(true);
  };

  const handlePageHeroSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageHero(editingPagePath, {
      title: pageTitle,
      subtitle: pageSubtitle,
      image: pageImage,
    });
    setPageModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Hero & Visual Presentation Manager
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure the 5 cinematic homepage carousel slides and assign unique hero images for every page.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-1.5 bg-[#F8F6EA] p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setActiveTab('carousel')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'carousel'
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#064E3B]'
            }`}
          >
            Homepage Carousel (5)
          </button>
          <button
            onClick={() => setActiveTab('page-heroes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'page-heroes'
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#064E3B]'
            }`}
          >
            Individual Page Heroes
          </button>
        </div>
      </div>

      {/* Tab 1: Carousel Slides */}
      {activeTab === 'carousel' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#022C22] text-[#D6A84F] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                      Slide #{idx + 1}
                    </span>
                    <button
                      onClick={() => updateHeroSlide(slide.id, { active: !slide.active })}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:text-[#D6A84F]"
                      title={slide.active ? 'Slide Active' : 'Slide Inactive'}
                    >
                      {slide.active ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-base font-bold text-[#102A24] mb-2 leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 mb-4">
                      {slide.subtitle}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-[#064E3B] font-semibold bg-[#ECFDF5] p-3 rounded-xl">
                      <div>Primary: {slide.ctaPrimaryText} → {slide.ctaPrimaryLink}</div>
                      <div>Secondary: {slide.ctaSecondaryText} → {slide.ctaSecondaryLink}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openEditSlide(slide)}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#064E3B] hover:bg-[#F8F6EA] flex items-center justify-center space-x-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Slide Content</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Individual Page Heroes */}
      {activeTab === 'page-heroes' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
              Dedicated Page Heroes (Strictly Unique Images)
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Every single public page uses its own dedicated architectural photograph. Never reused.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Route Path</th>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Heading Title</th>
                  <th className="py-3 px-4">Subtitle</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(pageHeroes).map(([path, hero]) => (
                  <tr key={path} className="hover:bg-gray-50/80">
                    <td className="py-4 px-4 font-mono font-bold text-[#064E3B]">
                      {path}
                    </td>
                    <td className="py-4 px-4">
                      <img
                        src={hero.image}
                        alt=""
                        className="w-16 h-10 object-cover rounded-lg bg-gray-100 border border-gray-200"
                      />
                    </td>
                    <td className="py-4 px-4 font-bold text-[#102A24] max-w-[200px] truncate">
                      {hero.title}
                    </td>
                    <td className="py-4 px-4 text-[#64748B] max-w-[250px] truncate">
                      {hero.subtitle}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => openEditPageHero(path, hero)}
                        className="p-1.5 rounded-lg text-[#064E3B] hover:bg-[#F8F6EA]"
                        title="Edit Page Hero"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Slide Modal */}
      {slideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSlideModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">Edit Carousel Slide</h3>
              <button onClick={() => setSlideModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSlideSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Slide Heading
                </label>
                <input
                  type="text"
                  required
                  value={slideTitle}
                  onChange={(e) => setSlideTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Slide Subtitle
                </label>
                <textarea
                  rows={2}
                  value={slideSubtitle}
                  onChange={(e) => setSlideSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Background Image URL
                </label>
                <input
                  type="text"
                  required
                  value={slideImage}
                  onChange={(e) => setSlideImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    CTA 1 Label
                  </label>
                  <input
                    type="text"
                    value={slideCta1}
                    onChange={(e) => setSlideCta1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    CTA 1 Link
                  </label>
                  <input
                    type="text"
                    value={slideCta1Link}
                    onChange={(e) => setSlideCta1Link(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    CTA 2 Label
                  </label>
                  <input
                    type="text"
                    value={slideCta2}
                    onChange={(e) => setSlideCta2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    CTA 2 Link
                  </label>
                  <input
                    type="text"
                    value={slideCta2Link}
                    onChange={(e) => setSlideCta2Link(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSlideModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Page Hero Modal */}
      {pageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setPageModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">
                Edit Hero for {editingPagePath}
              </h3>
              <button onClick={() => setPageModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePageHeroSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Page Heading
                </label>
                <input
                  type="text"
                  required
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Page Subtitle
                </label>
                <textarea
                  rows={2}
                  value={pageSubtitle}
                  onChange={(e) => setPageSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Unique Hero Image Path
                </label>
                <input
                  type="text"
                  required
                  value={pageImage}
                  onChange={(e) => setPageImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPageModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Update Page Hero
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

