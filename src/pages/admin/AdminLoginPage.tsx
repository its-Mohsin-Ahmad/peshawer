import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Building } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, user, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#022C22] overflow-hidden select-none">
        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden text-center p-8">
          <div className="flex justify-center mb-4">
            <img src="/assets/navbar-logo.png" alt="Peshawars.com Admin" className="h-16 w-auto object-contain drop-shadow" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Admin Session Active
          </span>
          <h2 className="text-xl font-heading font-black text-[#022C22]">Central Administrative Portal</h2>
          <p className="text-xs text-gray-500 mt-1">
            Logged in as <strong className="text-[#064E3B]">{user.email || 'info@peshawars.com'}</strong>
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-[#064E3B] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#04382A] transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
            </button>
            <button
              onClick={() => logout()}
              className="w-full py-2.5 bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              Log Out & Sign In with Different Credentials
            </button>
            <div className="pt-2">
              <Link to="/" className="text-xs text-gray-500 hover:text-[#064E3B]">
                ← Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#022C22] overflow-hidden select-none">
      {/* Background Architectural Image with Overlay */}
      <img
        src="/assets/projects/town-garden/hero.png"
        alt="Peshawer Architecture"
        className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px] scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#022C22] via-[#022C22]/90 to-[#064E3B]/80" />

      {/* Gold Radial Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Top Header */}
        <div className="bg-[#022C22] p-8 text-center text-white border-b-2 border-[#D6A84F] relative">
          <div className="flex justify-center mb-3">
            <img src="/assets/navbar-logo.png" alt="Peshawars.com Admin" className="h-16 w-auto object-contain drop-shadow" />
          </div>

          <p className="text-xs text-[#ECFDF5]/70 uppercase tracking-widest mt-1 font-semibold">
            Central Administrative Portal
          </p>

          {/* Portal Switcher */}
          <div className="flex items-center justify-center gap-1.5 mt-4 p-1 bg-white/10 rounded-xl max-w-[280px] mx-auto text-xs backdrop-blur-sm">
            <Link
              to="/login"
              className="flex-1 py-1.5 text-center font-bold text-white/70 hover:text-white transition-colors"
            >
              ← Client Portal
            </Link>
            <span className="flex-1 py-1.5 text-center font-bold bg-[#FFC83D] text-[#002D1C] rounded-lg shadow-xs">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-[#64748B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#064E3B] focus:ring-0"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Please contact the system technical administrator to reset your master credentials.')}
                className="text-[#064E3B] hover:text-[#D6A84F] font-bold"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#064E3B] to-[#022C22] hover:bg-[#022C22] text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-[#64748B] hover:text-[#064E3B] inline-flex items-center space-x-1"
            >
              <span>← Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

