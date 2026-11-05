import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, AlertCircle, Github, Chrome } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserSettingsPage: React.FC = () => {
  const { changePassword, logout, user } = useUserAuth();
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass !== form.confirm) {
      setResult({ success: false, message: 'New passwords do not match.' });
      return;
    }
    if (form.newPass.length < 6) {
      setResult({ success: false, message: 'Password must be at least 6 characters.' });
      return;
    }
    setLoading(true);
    setResult(null);
    const res = await changePassword(form.current, form.newPass);
    setLoading(false);
    setResult({ success: res.success, message: res.success ? 'Password changed successfully!' : (res.error || 'Failed to change password.') });
    if (res.success) setForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setResult(null), 4000);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Account Settings</h1>
        <p className="text-[#64748B] mt-1">Manage your security and connected accounts</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#064E3B]" /> Change Password
          </h3>

          {result && (
            <div className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
              result.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {result.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {result.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {(['current', 'newPass', 'confirm'] as const).map((field) => {
              const labels = { current: 'Current Password', newPass: 'New Password', confirm: 'Confirm New Password' };
              return (
                <div key={field}>
                  <label className="block text-xs font-semibold text-[#022C22] mb-1.5">{labels[field]}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      type={show[field] ? 'text' : 'password'}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShow({ ...show, [field]: !show[field] })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#022C22]"
                    >
                      {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#064E3B] text-white rounded-xl font-bold text-sm hover:bg-[#047857] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide">Connected Accounts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#4285F4" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.08 29.57 1 24 1 14.72 1 6.84 6.55 3.18 14.37l7.1 5.52C12.1 13.65 17.6 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.73H24v8.96h12.42c-.54 2.9-2.17 5.36-4.62 7.01l7.11 5.52C43.18 37.44 46.1 31.43 46.1 24.55z"/>
                    <path fill="#FBBC05" d="M10.28 28.9A14.57 14.57 0 0 1 9.5 24c0-1.7.3-3.35.78-4.9l-7.1-5.52A23.95 23.95 0 0 0 0 24c0 3.86.93 7.5 2.56 10.72l7.72-5.82z"/>
                    <path fill="#EA4335" d="M24 47c5.57 0 10.24-1.84 13.65-5l-7.11-5.52c-1.84 1.23-4.19 1.97-6.54 1.97-6.4 0-11.9-4.15-13.72-9.9l-7.72 5.83C6.84 41.45 14.72 47 24 47z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#022C22] text-sm">Google</p>
                  <p className="text-xs text-[#64748B]">{user?.provider === 'google' ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user?.provider === 'google' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.provider === 'google' ? 'Connected' : 'Connect'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#022C22] text-sm">GitHub</p>
                  <p className="text-xs text-[#64748B]">{user?.provider === 'github' ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user?.provider === 'github' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.provider === 'github' ? 'Connected' : 'Connect'}
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <h3 className="font-semibold text-red-700 mb-4 text-sm uppercase tracking-wide">Danger Zone</h3>
          <button
            onClick={logout}
            className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
          >
            Sign Out of All Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;

