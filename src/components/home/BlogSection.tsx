import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const BlogSection: React.FC = () => {
  const { blogs } = useData();
  const publishedBlogs = blogs.filter((b) => b.published).slice(0, 3);

  return (
    <section className="py-24 bg-[#003D25] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#002D1C] text-[#FFC83D] border border-[#E6AA27]/40 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#FFC83D]" />
              <span>Real Estate Knowledge</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Insights & <span className="text-[#FFC83D]">Market News</span>
            </h2>
          </div>

          <Link
            to="/blogs"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-heading font-extrabold text-[#FFC83D] hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-[#002D1C] rounded-2xl overflow-hidden border border-[#E6AA27]/25 shadow-xl hover:border-[#FFC83D]/60 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#003D25]">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/hero/slide4.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#004B2E] text-[#FFC83D] border border-[#E6AA27]/30">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-[#E8F3EC]/70 mb-2.5">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#FFC83D]" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#FFC83D]" />
                      {blog.readingTime}
                    </span>
                  </div>

                  <Link to={`/blogs/${blog.slug}`}>
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFC83D] transition-colors leading-snug mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#E8F3EC]/75 line-clamp-2 leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FFC83D] group-hover:text-white transition-colors"
                >
                  <span>Read Full Article</span>
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

