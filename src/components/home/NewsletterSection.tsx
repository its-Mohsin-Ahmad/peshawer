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
    <section className="py-20 bg-gradient-to-r from-[#022C22] to-[#064E3B] text-white relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#D6A84F] mx-auto mb-4 border border-white/20">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight mb-3">
          Stay Updated With New <span className="text-[#D6A84F]">Property Opportunities</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#ECFDF5]/80 max-w-xl mx-auto mb-8 leading-relaxed">
          Get privileged early notifications on pre-launch development prices, TMA approval updates, and exclusive installment releases in Swat and Peshawar.
        </p>

        {subscribed ? (
          <div className="p-4 bg-white/10 border border-[#D6A84F] rounded-2xl max-w-md mx-auto flex items-center justify-center space-x-2 text-[#E6C678]">
            <CheckCircle2 className="w-5 h-5 text-[#047857]" />
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
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#D6A84F] backdrop-blur-md"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#B88628] text-[#022C22] font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-gold-glow transition-all shrink-0 flex items-center justify-center space-x-1"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <label className="flex items-center justify-center space-x-2 text-[11px] text-[#ECFDF5]/60 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded border-gray-400 text-[#064E3B] focus:ring-0"
              />
              <span>I consent to receiving official real estate updates. Unsubscribe anytime.</span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
};

