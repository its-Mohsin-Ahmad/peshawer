import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Home, ArrowRight } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signup, loginWithGoogle, loginWithGitHub } = useUserAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/user/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms and Conditions & Privacy Policy.');
      return;
    }

    setLoading(true);
    const res = await signup(fullName, email, phone, password);
    setLoading(false);

    if (res.success) {
      navigate('/user/dashboard');
    } else {
      setErrorMsg(res.error || 'Failed to create account. Please check your information.');
    }
  };

  const handleGoogleSignup = async () => {
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

  const handleGitHubSignup = async () => {
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
      {/* Decorative aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT COLUMN: ARCHITECTURAL VILLA AT SUNSET (Desktop) */}
      <div className="hidden lg:flex lg:w-7/12 relative flex-col justify-between p-10 xl:p-12 h-full overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero/home-clean.png"
            alt="Peshawer Luxury Estates"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
          <div className="absolute inset-0 bg-[#022C22]/35 mix-blend-multiply" />
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

        {/* Bottom-left: Heading */}
        <div className="relative z-10 max-w-xl space-y-4">
          <h1 className="font-heading text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Begin Your <span className="text-[#D6A84F]">Journey</span>
          </h1>
          <p className="text-white/85 text-sm xl:text-base font-normal leading-relaxed drop-shadow">
            Create your account to unlock private off-market listings, schedule on-site engineering walkthroughs, and manage your property portfolio.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: ELEGANT CREAM SIGNUP CARD */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0A1A15] h-full overflow-y-auto">
        <div className="w-full max-w-md bg-[#FAF9F5] rounded-[32px] p-5 sm:p-7 shadow-2xl border border-[#D6A84F]/30 relative my-auto">
          {/* Logo Header */}
          <div className="text-center mb-3">
            <Link to="/" className="inline-block mb-1">
              <img
                src="/assets/peshawer-gold-logo.png"
                alt="PESHAWER REAL ESTATE"
                className="h-8 sm:h-9 w-auto mx-auto object-contain drop-shadow"
              />
            </Link>

            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#022C22] tracking-tight">
              Create Account
            </h2>
            <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 font-medium">
              Join us and explore the best properties in Peshawar
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-3 p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                required
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-9 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#064E3B]"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-9 pr-9 py-2 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#064E3B]"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-start space-x-2 cursor-pointer text-[11px] text-[#64748B] pt-0.5 leading-snug">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 text-[#064E3B] rounded border-gray-300 focus:ring-[#064E3B] mt-0.5"
                required
              />
              <span>
                I agree to the{' '}
                <Link to="/terms-and-conditions" className="font-semibold text-[#047857] hover:underline">
                  Terms
                </Link>{' '}
                &{' '}
                <Link to="/privacy-policy" className="font-semibold text-[#047857] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] disabled:opacity-70 disabled:pointer-events-none mt-1"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-[#FAF9F5] px-2.5 text-[#94A3B8] font-medium uppercase tracking-wider">or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center space-x-2.5 transition-colors shadow-xs"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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

            <button
              type="button"
              onClick={handleGitHubSignup}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center space-x-2.5 transition-colors shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#102A24]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Links Footer */}
          <div className="mt-3.5 pt-2.5 border-t border-gray-200/80 flex flex-col items-center space-y-1 text-xs">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#064E3B] hover:text-[#D6A84F] transition-colors">
                Sign In
              </Link>
            </p>

            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 font-bold text-gray-500 hover:text-[#064E3B] transition-colors pt-0.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

