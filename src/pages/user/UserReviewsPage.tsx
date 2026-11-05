import React, { useState } from 'react';
import { Star, MessageSquare, Plus, Building2 } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

const StarRating: React.FC<{ rating: number; onRate?: (r: number) => void; readonly?: boolean }> = ({ rating, onRate, readonly }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={readonly}
        onClick={() => onRate?.(star)}
        className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
      >
        <Star
          className={`w-5 h-5 ${star <= rating ? 'fill-[#D6A84F] text-[#D6A84F]' : 'text-gray-300'}`}
        />
      </button>
    ))}
  </div>
);

export const UserReviewsPage: React.FC = () => {
  const { reviews, addReview } = useUserAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ propertyOrProjectTitle: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyOrProjectTitle || !form.comment) return;
    setLoading(true);
    addReview({ propertyOrProjectTitle: form.propertyOrProjectTitle, rating: form.rating, comment: form.comment });
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSuccess(true);
    setForm({ propertyOrProjectTitle: '', rating: 5, comment: '' });
    setShowForm(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#022C22]">My Reviews</h1>
          <p className="text-[#64748B] mt-1">Reviews you've submitted for properties</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl font-semibold text-sm hover:bg-[#047857] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          ✓ Review submitted successfully!
        </div>
      )}

      {/* Add Review Form */}
      {showForm && (
        <div className="mb-6 bg-white rounded-2xl border border-[#064E3B]/20 shadow-sm p-6">
          <h3 className="font-semibold text-[#022C22] mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Property / Project Name</label>
              <input
                type="text"
                value={form.propertyOrProjectTitle}
                onChange={(e) => setForm({ ...form, propertyOrProjectTitle: e.target.value })}
                placeholder="e.g. Glamorous Heights"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Rating</label>
              <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Your Review</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your experience..."
                required
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B] resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-[#064E3B] text-white rounded-xl font-semibold text-sm hover:bg-[#047857] disabled:opacity-50 transition-colors"
              >
                {loading ? 'Submitting…' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl font-semibold text-sm text-[#64748B] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#022C22] mb-2">No reviews yet</h3>
          <p className="text-[#64748B]">Share your experience with properties you've visited.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#064E3B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#022C22] text-sm">{review.propertyOrProjectTitle}</p>
                    <StarRating rating={review.rating} readonly />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs text-[#64748B]">
                    {new Date(review.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      review.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{review.status}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#64748B] leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviewsPage;
