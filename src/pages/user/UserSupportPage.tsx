import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, Send, Check } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const faqs = [
  {
    q: 'How do I schedule a property visit?',
    a: 'Go to any property detail page and click "Book Site Visit". Fill in your preferred date, time, and contact info. Our team will confirm within 24 hours.',
  },
  {
    q: 'Can I save properties for later?',
    a: 'Yes! Click the heart icon on any property card to save it. View all saved properties from your dashboard under "Saved Properties".',
  },
  {
    q: 'How do I update my profile information?',
    a: 'Navigate to Profile Settings in your dashboard sidebar. Update your details and click "Save Changes".',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept bank transfers, cheques, and cash payments. Contact our office for more details on the payment process for specific properties.',
  },
  {
    q: 'How can I contact the sales team?',
    a: 'Use the Messages section in your dashboard, or call/WhatsApp our office directly. We respond within business hours.',
  },
];

export const UserSupportPage: React.FC = () => {
  const { settings } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    setForm({ subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Help & Support</h1>
        <p className="text-[#64748B] mt-1">Get help from our team or find answers below</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#064E3B]" /> Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8F6EA] transition-colors"
                >
                  <span className="font-semibold text-[#022C22] text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-[#064E3B] flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-[#64748B] flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-[#64748B] leading-relaxed border-t border-gray-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#022C22] mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#064E3B]" /> Send Us a Message
            </h3>

            {sent && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                <Check className="w-4 h-4" /> Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#022C22] mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  placeholder="Describe your issue or question..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#064E3B] text-white rounded-xl font-bold text-sm hover:bg-[#047857] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-[#064E3B] rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">Direct Contact</h3>
            <div className="space-y-3">
              <a href={`tel:${settings.phonePrimary}`} className="flex items-center gap-3 text-sm hover:text-[#D6A84F] transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                {settings.phonePrimary}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm hover:text-[#D6A84F] transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                {settings.email}
              </a>
            </div>
            <p className="text-xs text-white/60 mt-4">Office hours: Mon–Sat, 9AM–6PM PKT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSupportPage;

