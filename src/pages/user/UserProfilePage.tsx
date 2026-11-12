import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Check, AlertCircle } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserProfilePage: React.FC = () => {
  const { user, updateProfile } = useUserAuth();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
    avatarUrl: user?.avatarUrl || '',
  });

  React.useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        address: user.address || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = (form.fullName || 'User')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await updateProfile(form);
    setLoading(false);
    setResult({ success: res.success, message: res.success ? 'Profile updated successfully!' : (res.error || 'Update failed.') });
    setTimeout(() => setResult(null), 4000);
  };

  const handleAvatarUrl = () => {
    const url = prompt('Enter image URL for profile picture:');
    if (url) setForm({ ...form, avatarUrl: url });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Profile Settings</h1>
        <p className="text-[#64748B] mt-1">Manage your personal information</p>
      </div>

      <div className="max-w-2xl">
        {result && (
          <div className={`mb-5 flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
            result.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {result.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {result.message}
          </div>
        )}

        {/* Avatar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide">Profile Picture</h3>
          <div className="flex items-center gap-5">
            <div className="relative">
              {form.avatarUrl ? (
                <img
                  src={form.avatarUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#064E3B]/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#064E3B] to-[#047857] flex items-center justify-center border-2 border-[#D6A84F]/30">
                  <span className="text-white text-xl font-bold">{initials}</span>
                </div>
              )}
              <button
                onClick={handleAvatarUrl}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D6A84F] flex items-center justify-center hover:bg-[#B88628] transition-colors shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-[#022C22] text-sm">{form.fullName}</p>
              <p className="text-[#64748B] text-xs mt-0.5">{form.email}</p>
              <button onClick={handleAvatarUrl} className="mt-2 text-xs text-[#047857] font-semibold hover:underline">
                Change photo
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide">Personal Information</h3>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                  placeholder="Peshawar"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B] resize-none"
                placeholder="Your address..."
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#064E3B] text-white rounded-xl font-bold text-sm hover:bg-[#047857] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;

