import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { BlogPost } from '../../types';
import { BookOpen, Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';

export const AdminBlogsPage: React.FC = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Market Trends');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('/assets/hero/slide4.jpg');
  const [author, setAuthor] = useState('Peshawer Real Estate Research Desk');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [published, setPublished] = useState(true);

  const openAdd = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Market Trends');
    setExcerpt('');
    setContent('# New Article\n\nWrite article content here.');
    setCoverImage('/assets/hero/slide4.jpg');
    setAuthor('Peshawer Real Estate Editorial');
    setReadingTime('4 min read');
    setPublished(true);
    setModalOpen(true);
  };

  const openEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setCategory(blog.category);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCoverImage(blog.coverImage);
    setAuthor(blog.author);
    setReadingTime(blog.readingTime);
    setPublished(blog.published);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingId) {
      updateBlog(editingId, {
        title,
        slug,
        category,
        excerpt,
        content,
        coverImage,
        author,
        readingTime,
        published,
      });
    } else {
      addBlog({
        title,
        slug,
        category,
        excerpt,
        content,
        coverImage,
        author,
        readingTime,
        published,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Blog & Market Intelligence
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Publish educational guides, Swat destination articles, and installment explanations.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm hover:bg-[#022C22] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-premium flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video bg-gray-100">
                <img src={b.coverImage} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {b.category}
                </span>
              </div>

              <div className="p-6">
                <div className="text-[11px] text-gray-400 mb-2 font-mono">
                  {b.publishedAt} • {b.readingTime}
                </div>
                <h3 className="font-heading text-base font-bold text-[#102A24] mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2">{b.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
              <button
                onClick={() => updateBlog(b.id, { published: !b.published })}
                className={`text-xs font-bold flex items-center space-x-1 ${
                  b.published ? 'text-[#047857]' : 'text-gray-400'
                }`}
              >
                {b.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{b.published ? 'Published' : 'Draft'}</span>
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => openEdit(b)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#064E3B]"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete blog: "${b.title}"?`)) deleteBlog(b.id);
                  }}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">
                {editingId ? 'Edit Article' : 'Compose Article'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Cover Image Path
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Short Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Article Markdown Content
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

