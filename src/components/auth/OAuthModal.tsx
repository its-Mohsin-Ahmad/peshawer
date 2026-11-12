import React, { useState } from 'react';
import { X, Check, Shield, User, Mail, Phone, MapPin, ArrowRight, Lock } from 'lucide-react';

interface OAuthModalProps {
  isOpen: boolean;
  mode: 'google' | 'github' | null;
  onClose: () => void;
  onSuccess: (profile: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    avatarUrl?: string;
    provider: 'google' | 'github';
  }) => Promise<void>;
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSuccess,
}) => {
  if (!isOpen || !mode) return null;

  const isGoogle = mode === 'google';

  const [fullName, setFullName] = useState(
    isGoogle ? 'Mohsin Ahmad' : 'Mohsin Ahmad'
  );
  const [email, setEmail] = useState(
    isGoogle ? 'mohsin.ahmad.dev@gmail.com' : 'mohsin-ahmad@github.com'
  );
  const [phone, setPhone] = useState('+92 300 1234567');
  const [city, setCity] = useState('Peshawar');
  const [address, setAddress] = useState('University Town, Peshawar');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'custom'>('select');

  // Quick Preset Accounts for seamless testing
  const quickAccounts = isGoogle
    ? [
        {
          name: 'Mohsin Ahmad',
          email: 'mohsin.ahmad.dev@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80',
          phone: '+92 300 1234567',
          city: 'Peshawar',
          address: 'University Town, Peshawar',
        },
        {
          name: 'Ali Khan',
          email: 'ali.khan.peshawar@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&q=80',
          phone: '+92 312 9876543',
          city: 'Peshawar',
          address: 'Hayatabad Phase 6, Peshawar',
        },
      ]
    : [
        {
          name: 'Mohsin Ahmad (Developer)',
          email: 'mohsin-ahmad@github.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80',
          phone: '+92 300 1234567',
          city: 'Peshawar',
          address: 'Peshawar City, KP',
        },
      ];

  const handleSelectQuickAccount = async (acc: typeof quickAccounts[0]) => {
    setLoading(true);
    await onSuccess({
      fullName: acc.name,
      email: acc.email,
      phone: acc.phone,
      city: acc.city,
      address: acc.address,
      avatarUrl: acc.avatar,
      provider: isGoogle ? 'google' : 'github',
    });
    setLoading(false);
    onClose();
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setLoading(true);
    await onSuccess({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || '+92 300 0000000',
      city: city.trim() || 'Peshawar',
      address: address.trim() || 'Peshawar, Khyber Pakhtunkhwa',
      avatarUrl: isGoogle
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=022C22,047857`
        : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
      provider: isGoogle ? 'google' : 'github',
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Provider Branding */}
        <div
          className={`p-6 text-white relative ${
            isGoogle
              ? 'bg-gradient-to-r from-[#1A73E8] to-[#174EA6]'
              : 'bg-gradient-to-r from-[#24292E] to-[#1B1F23]'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            {isGoogle ? (
              <div className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-[#24292E] p-2 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
            )}

            <div>
              <h3 className="font-heading font-black text-base leading-tight">
                {isGoogle ? 'Sign In with Google' : 'Authorize with GitHub'}
              </h3>
              <p className="text-xs text-white/80">
                Continue to Peshawer Real Estate
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'select' ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 font-medium">
                Choose an account or register custom details to proceed:
              </p>

              {/* Quick Account List */}
              <div className="space-y-2">
                {quickAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectQuickAccount(acc)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-gray-200 hover:border-[#064E3B] hover:bg-emerald-50/50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-heading font-bold text-xs text-[#022C22] group-hover:text-[#064E3B]">
                          {acc.name}
                        </div>
                        <div className="text-[11px] text-gray-500">{acc.email}</div>
                        <div className="text-[10px] text-emerald-700 font-medium">
                          {acc.phone} • {acc.city}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#064E3B] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Or Use Custom Account */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep('custom')}
                  className="w-full py-2.5 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#064E3B] hover:bg-gray-50 text-xs font-bold text-[#064E3B] flex items-center justify-center space-x-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Use Another {isGoogle ? 'Google' : 'GitHub'} Account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Custom Details Form */
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  {isGoogle ? 'Gmail Address' : 'GitHub Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isGoogle ? 'yourname@gmail.com' : 'yourname@github.com'}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full pl-8 pr-2 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Peshawar"
                      className="w-full pl-8 pr-2 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. University Town, Peshawar"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white shadow-md transition-all flex items-center justify-center space-x-2 ${
                    isGoogle
                      ? 'bg-[#1A73E8] hover:bg-[#174EA6]'
                      : 'bg-[#24292E] hover:bg-[#1B1F23]'
                  }`}
                >
                  <span>{loading ? 'Authenticating...' : `Confirm & Sign In`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center space-x-1.5 text-[10px] text-gray-400">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-end encrypted session with Peshawer Real Estate Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

