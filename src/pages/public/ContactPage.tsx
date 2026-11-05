import React, { useState } from 'react';
import { PageHero } from '../../components/common/PageHero';
import { useData } from '../../contexts/DataContext';
import { MapPin, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, addContactMessage } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in your name, contact phone, and message.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      addContactMessage({
        fullName: fullName.trim(),
        email: email.trim() || 'Not provided',
        phone: phone.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="bg-[#F8F6EA]/40 min-h-screen">
      {/* Unique Contact Hero image */}
      <PageHero
        title="Contact Our Property Advisory"
        subtitle="Our senior real estate specialists and architectural directors are available to assist your queries."
        image="/assets/pages/contact-hero.jpg"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857] block mb-2">
                Headquarters
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#022C22] uppercase tracking-tight mb-3">
                Get In Touch With <span className="text-[#D6A84F]">Us</span>
              </h2>
              <div className="w-16 h-1 bg-[#D6A84F] rounded-full mb-6" />
              <p className="text-sm text-[#64748B] leading-relaxed">
                Visit our executive offices or speak directly with our licensed property consultants.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#022C22] mb-1">
                    Main Office Address
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {settings.officeAddress}
                  </p>
                </div>
              </div>

              {/* Dedicated WhatsApp Card with Direct Chat Link */}
              <a
                href="https://wa.me/923117000900?text=Assalam-o-Alaikum!%20I%20am%20interested%20in%20your%20real%20estate%20services.%20Please%20share%20more%20information."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-white border border-[#25D366]/40 hover:border-[#25D366] shadow-sm hover:shadow-md transition-all flex items-start space-x-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#064E3B] mb-1 flex items-center space-x-2">
                    <span>WhatsApp Inquiry Support</span>
                    <span className="text-[10px] bg-[#25D366] text-white px-2 py-0.5 rounded-full font-bold">
                      Direct Chat
                    </span>
                  </h3>
                  <p className="font-heading text-base font-extrabold text-[#022C22] group-hover:text-[#25D366] transition-colors">
                    03117000900
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Click to start chat with our property consultants
                  </p>
                </div>
              </a>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#022C22] mb-1">
                    Official Email
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {settings.email}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-[#D6A84F] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#022C22] mb-1">
                    Business Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {settings.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-premium border border-gray-100">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#022C22] uppercase tracking-tight mb-2">
                Send Us A Message
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mb-8">
                Fill in the details below and an authorized representative will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <CheckCircle2 className="w-16 h-16 text-[#047857] mb-4 animate-bounce" />
                  <h3 className="font-heading text-xl font-bold text-[#064E3B] mb-2">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-[#64748B] max-w-sm mb-6">
                    Thank you for contacting PESHAWER REAL ESTATE. A designated property advisor has been notified.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sardar Tariq Khan"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Town Garden Site Visit Request"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please tell us about the property, project, or investment queries you would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D6A84F] to-[#B88628] hover:shadow-gold-glow text-[#022C22] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

