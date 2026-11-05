import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

export const UserForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#022C22] text-[#102A24] relative overflow-hidden">
      <div className="w-full max-w-md bg-[#FAF9F5] rounded-[32px] p-8 sm:p-10 shadow-2xl border border-[#D6A84F]/30 relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-3">
            <img
              src="/assets/peshawer-gold-logo.png"
              alt="PESHAWER REAL ESTATE"
              className="h-11 w-auto mx-auto object-contain drop-shadow"
            />
          </Link>
          <h2 className="font-heading text-2xl font-black text-[#022C22]">
            Reset Password
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-[#022C22]">
              Password reset link sent to <strong>{email}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Please check your inbox and spam folder. Follow the link to choose a new password.
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#022C22]"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-[#102A24] focus:outline-none focus:border-[#064E3B]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <Link to="/login" className="font-bold text-[#064E3B] hover:underline">
            Remember Password? Sign In
          </Link>
          <Link to="/" className="inline-flex items-center space-x-1 hover:text-[#064E3B]">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

