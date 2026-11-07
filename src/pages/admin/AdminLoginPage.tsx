import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Building } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect immediately to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

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

  const handleFillDemo = () => {
    setEmail('info@peshawars.com');
    setPassword('admin123456');
    setErrorMessage('');
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
          <div className="w-16 h-16 rounded-2xl bg-[#064E3B] p-2 border border-[#D6A84F]/40 mx-auto mb-3 shadow-md flex items-center justify-center">
            <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="font-heading text-xl font-extrabold tracking-wider uppercase">
            PESHAWER <span className="text-[#D6A84F]">REAL ESTATE</span>
          </h1>
          <p className="text-xs text-[#ECFDF5]/70 uppercase tracking-widest mt-1 font-semibold">
            Central Administrative Portal
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5 flex items-center justify-between">
                <span>Admin Email Address</span>
                <span className="text-[10px] text-[#64748B] font-mono">info@peshawars.com</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@peshawars.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5 flex items-center justify-between">
                <span>Master Password</span>
                <span className="text-[10px] text-[#64748B] font-mono">admin123456</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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

          {/* Quick Demo Autofill Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8F6EA] hover:bg-[#ECFDF5] border border-[#D6A84F]/40 text-[#064E3B] text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
              <span>Fill Default Admin Credentials</span>
            </button>
          </div>

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

