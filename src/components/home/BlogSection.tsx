import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const BlogSection: React.FC = () => {
  const { blogs } = useData();
  const publishedBlogs = blogs.filter((b) => b.published).slice(0, 3);

  return (
    <section className="py-24 bg-[#F8F6EA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Real Estate Knowledge</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#022C22] uppercase tracking-tight">
              Insights & <span className="text-[#D6A84F]">Market News</span>
            </h2>
          </div>

          <Link
            to="/blogs"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-heading font-extrabold text-[#064E3B] hover:text-[#D6A84F] uppercase tracking-wider transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/hero/slide4.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#064E3B] text-white">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-[#64748B] mb-2.5">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#D6A84F]" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {blog.readingTime}
                    </span>
                  </div>

                  <Link to={`/blogs/${blog.slug}`}>
                    <h3 className="font-heading text-base font-bold text-[#102A24] group-hover:text-[#064E3B] transition-colors leading-snug line-clamp-2 mb-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#064E3B] group-hover:text-[#D6A84F] transition-colors pt-3 border-t border-gray-100"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

