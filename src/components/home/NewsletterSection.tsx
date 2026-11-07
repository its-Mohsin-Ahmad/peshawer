import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [consent, setConsent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !consent) return;
    setSubscribed(true);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#002D1C] via-[#003D25] to-[#002D1C] text-white relative overflow-hidden border-t border-[#E6AA27]/25">
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6AA27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#004B2E] flex items-center justify-center text-[#FFC83D] mx-auto mb-4 border border-[#E6AA27]/30 shadow-md">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight mb-3">
          Stay Updated With New <span className="text-[#FFC83D]">Property Opportunities</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#E8F3EC]/80 max-w-xl mx-auto mb-8 leading-relaxed">
          Get privileged early notifications on pre-launch development prices, TMA approval updates, and exclusive installment releases in Swat and Peshawar.
        </p>

        {subscribed ? (
          <div className="p-4 bg-[#004B2E]/90 border border-[#E6AA27] rounded-2xl max-w-md mx-auto flex items-center justify-center space-x-2 text-[#FFC83D]">
            <CheckCircle2 className="w-5 h-5 text-[#087B4B]" />
            <span className="text-sm font-bold">Thank you! You are now subscribed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-4 py-3 rounded-xl bg-[#002D1C] border border-[#E6AA27]/40 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FFC83D]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#B88628] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-gold-glow transition-all shrink-0 flex items-center justify-center space-x-1"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <label className="flex items-center justify-center space-x-2 text-[11px] text-[#E8F3EC]/70 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded border-[#E6AA27] text-[#E6AA27] focus:ring-0"
              />
              <span>I agree to receive verified Peshawar Real Estate advisory emails</span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
};

