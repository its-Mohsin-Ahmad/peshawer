import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle?: string;
  itemType?: 'property' | 'project' | 'apartment' | 'payment-plan' | 'general';
  itemId?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  itemTitle = 'General Inquiry',
  itemType = 'general',
  itemId,
}) => {
  const { addInquiry } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [message, setMessage] = useState(
    itemTitle !== 'General Inquiry'
      ? `Hello, I am interested in ${itemTitle}. Please provide further details and availability.`
      : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      addInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not specified',
        itemType,
        itemTitle,
        itemId,
        preferredContact,
        message: message.trim() || 'Interested in details.',
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#022C22] text-white px-6 py-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
          <div>
            <h3 className="font-heading text-lg font-bold">Submit Property Inquiry</h3>
            <p className="text-xs text-[#ECFDF5]/80 truncate max-w-xs">{itemTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-[#047857] mb-3 animate-bounce" />
              <h4 className="font-heading text-xl font-bold text-[#064E3B] mb-1">
                Inquiry Received!
              </h4>
              <p className="text-sm text-[#64748B] max-w-xs">
                Thank you, {name}. Our senior property consultant will reach out via {preferredContact} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sardar Tariq Khan"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredContact('whatsapp')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                      preferredContact === 'whatsapp'
                        ? 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredContact('phone')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                      preferredContact === 'phone'
                        ? 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#064E3B]" />
                    <span>Phone Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredContact('email')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                      preferredContact === 'email'
                        ? 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Message / Special Request
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#D6A84F] to-[#B88628] text-[#022C22] font-heading font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-gold-glow transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Inquiry Now'}</span>
                </button>

                {/* Direct WhatsApp Quick Chat Action with 03117000900 */}
                <a
                  href={getWhatsAppUrl(
                    `Assalam-o-Alaikum! I am inquiring about ${itemTitle}. My name is ${name || 'a visitor'}. Please share more details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                    <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                  </svg>
                  <span>Chat on WhatsApp: {WHATSAPP_DISPLAY_NUMBER}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

