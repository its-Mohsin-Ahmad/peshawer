import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../../components/common/PageHero';
import { useData } from '../../contexts/DataContext';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useData();

  const blog = blogs.find((b) => b.slug === slug || b.id === slug);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#022C22] mb-3">Article Not Found</h2>
        <p className="text-sm text-[#64748B] mb-6">The blog post you requested could not be located.</p>
        <Link
          to="/blogs"
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider"
        >
          Back to Blog List
        </Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.id !== blog.id && b.published).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#002D1C] text-white min-h-screen relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#004B2E]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Unique Blog Cover Hero image */}
      <PageHero
        title={blog.title}
        subtitle={blog.excerpt}
        image={blog.coverImage}
        badge={blog.category}
        breadcrumbs={[
          { label: 'Blogs', link: '/blogs' },
          { label: blog.category },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E6AA27]/20 text-xs text-[#E8F3EC]/75">
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium">
              <User className="w-4 h-4 text-[#FFC83D] mr-1.5" />
              <span>{blog.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center font-medium">
              <Calendar className="w-4 h-4 text-[#FFC83D] mr-1.5" />
              <span>
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center font-medium">
              <Clock className="w-4 h-4 text-[#FFC83D] mr-1.5" />
              <span>{blog.readingTime}</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 text-xs font-bold text-white hover:text-[#FFC83D] transition-colors p-2 px-3 rounded-lg bg-[#003D25] border border-[#E6AA27]/30"
          >
            <Share2 className="w-4 h-4 text-[#FFC83D]" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-[#E8F3EC]/90 leading-relaxed space-y-6">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return (
                <h2 key={index} className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight pt-4">
                  {paragraph.replace('# ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="font-heading text-xl sm:text-2xl font-bold text-[#FFC83D] pt-3">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            return (
              <p key={index} className="text-sm sm:text-base text-[#E8F3EC]/80 leading-relaxed font-normal">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Author signature box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#003D25]/90 border border-[#E6AA27]/25 flex items-center space-x-6 shadow-xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-[#002D1C] border border-[#FFC83D]/40 flex items-center justify-center text-[#FFC83D] font-heading font-black text-xl shrink-0">
            PR
          </div>
          <div>
            <div className="font-heading font-bold text-white text-base uppercase">
              {blog.author}
            </div>
            <div className="text-xs text-[#E8F3EC]/70 mt-1 leading-relaxed">
              Curated by the specialized research division at PESHAWER REAL ESTATE, delivering verified market analytics, regulatory advisory, and architectural evaluations.
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E6AA27]/20">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight mb-8">
              Related <span className="text-[#FFC83D]">Articles</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/blogs/${item.slug}`}
                  className="p-5 rounded-2xl bg-[#003D25]/90 border border-[#E6AA27]/25 shadow-lg hover:border-[#E6AA27]/60 transition-all group block"
                >
                  <div className="text-[10px] uppercase font-bold text-[#FFC83D] mb-1">
                    {item.category}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#FFC83D] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

