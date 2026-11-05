import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Home, ShieldCheck, Zap, Headphones, ArrowRight } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, login, loginWithGoogle, loginWithGitHub } = useUserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = (location.state as any)?.from?.pathname || '/user/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password, rememberMe);
    setLoading(false);

    if (res.success) {
      navigate('/user/dashboard');
    } else {
      setErrorMsg(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success) {
      navigate('/user/dashboard');
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await loginWithGitHub();
    setLoading(false);
    if (res.success) {
      navigate('/user/dashboard');
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="h-screen max-h-screen w-full flex bg-[#022C22] text-[#102A24] relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT COLUMN: ARCHITECTURAL VILLA SHOWCASE (Desktop) */}
      <div className="hidden lg:flex lg:w-7/12 relative flex-col justify-between p-10 xl:p-12 h-full overflow-hidden select-none">
        {/* Background image of the luxury modern villa with mountain & warm lighting */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero/home-clean.png"
            alt="Peshawer Luxury Villas"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
          <div className="absolute inset-0 bg-[#022C22]/30 mix-blend-multiply" />
        </div>

        {/* Top-left: PESHAWER Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-block group">
            <img
              src="/assets/peshawer-gold-logo.png"
              alt="PESHAWER REAL ESTATE"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(214,168,79,0.4)]"
            />
          </Link>
        </div>

        {/* Bottom-left: Welcome Back headline & Feature Badges */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div>
            <h1 className="font-heading text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Welcome <span className="text-[#D6A84F]">Back</span>
            </h1>
            <p className="text-white/85 text-sm xl:text-base mt-2 font-normal leading-relaxed drop-shadow">
              Sign in to access your dashboard and manage your real estate platform.
            </p>
          </div>

          {/* 3 Quality Feature Badges */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/20">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
              </div>
              <span className="text-xs font-semibold text-white/90">Secure Access</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#D6A84F]" />
              </div>
              <span className="text-xs font-semibold text-white/90">Fast & Reliable</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 text-[#D6A84F]" />
              </div>
              <span className="text-xs font-semibold text-white/90">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ELEGANT CREAM LOGIN CARD */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0A1A15] h-full overflow-y-auto">
        <div className="w-full max-w-md bg-[#FAF9F5] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#D6A84F]/30 relative my-auto">
          {/* PESHAWER Logo Header */}
          <div className="text-center mb-5">
            <Link to="/" className="inline-block mb-2">
              <img
                src="/assets/peshawer-gold-logo.png"
                alt="PESHAWER REAL ESTATE"
                className="h-9 sm:h-10 w-auto mx-auto object-contain drop-shadow"
              />
            </Link>

            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#022C22] tracking-tight">
              Login
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2 animate-in fade-in">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email Address */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#064E3B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer text-[#64748B]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#064E3B] rounded border-gray-300 focus:ring-[#064E3B]"
                />
                <span className="font-medium text-[11px] sm:text-xs">Remember Me</span>
              </label>

              <Link
                to="/forgot-password"
                className="font-semibold text-[11px] sm:text-xs text-[#047857] hover:text-[#064E3B] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] disabled:opacity-70 disabled:pointer-events-none mt-1"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofill Helper */}
          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setEmail('mohsin@peshawer.com');
                setPassword('user123');
              }}
              className="text-[11px] text-[#B88628] hover:underline font-semibold"
            >
              Fill Demo User (Mohsin Ahmad)
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FAF9F5] px-3 text-[#94A3B8] font-medium">or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-2">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-3 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-3 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4 fill-current text-[#102A24]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Links Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200/80 flex flex-col items-center space-y-1.5 text-xs">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 font-bold text-[#064E3B] hover:text-[#047857] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>

            <p className="text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold text-[#064E3B] hover:text-[#D6A84F] transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

