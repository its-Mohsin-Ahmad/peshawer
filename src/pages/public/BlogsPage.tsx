import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { useData } from '../../contexts/DataContext';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const { blogs } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const published = blogs.filter((b) => b.published);

  const categories = ['All', ...Array.from(new Set(published.map((b) => b.category)))];

  const filtered = published.filter((b) => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#002D1C] text-white min-h-screen relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#004B2E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Unique dedicated Blogs hero */}
      <PageHero
        title="Real Estate Insights & Editorial"
        subtitle="In-depth market intelligence, legal due diligence advice, and investment analysis for Peshawar and Kalam."
        image="/assets/hero/slide4.jpg"
        breadcrumbs={[{ label: 'Blogs' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFC83D] text-[#002D1C] shadow-sm font-extrabold'
                    : 'bg-[#003D25] text-[#E8F3EC]/80 hover:text-white border border-[#E6AA27]/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFC83D]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E6AA27]/30 text-xs focus:outline-none focus:border-[#FFC83D] bg-[#003D25] text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((blog) => (
            <article
              key={blog.id}
              className="bg-[#003D25]/90 rounded-3xl overflow-hidden border border-[#E6AA27]/25 shadow-xl hover:border-[#E6AA27]/60 hover:shadow-2xl transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#002D1C]">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#FFC83D] text-[#002D1C]">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-[#E8F3EC]/70 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#FFC83D]" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#FFC83D]" />
                      {blog.readingTime}
                    </span>
                  </div>

                  <Link to={`/blogs/${blog.slug}`}>
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFC83D] transition-colors leading-snug mb-3">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#E8F3EC]/75 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6AA27]/20 flex items-center justify-between text-xs font-bold text-[#FFC83D]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFC83D]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

