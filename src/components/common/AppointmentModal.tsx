import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultProject,
}) => {
  const { projects, addAppointment } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState(defaultProject || projects[0]?.name || 'Glamorous Heights');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !preferredDate) return;

    addAppointment({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not specified',
      projectName,
      preferredDate,
      preferredTime,
      notes: notes.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-[#022C22] text-white px-6 py-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
          <div>
            <h3 className="font-heading text-lg font-bold">Schedule an Exclusive Site Visit</h3>
            <p className="text-xs text-[#ECFDF5]/80">Guided Tour with Senior Architectural Representative</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-[#047857] mb-3 animate-bounce" />
              <h4 className="font-heading text-xl font-bold text-[#064E3B] mb-1">
                Site Visit Requested!
              </h4>
              <p className="text-sm text-[#64748B]">
                We have registered your site inspection for {preferredDate} at {preferredTime}. Our representative will call {phone} to coordinate transport and directions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Salman Afridi"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
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
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Select Project *
                  </label>
                  <select
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Midday)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon)</option>
                    <option value="04:30 PM">04:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Special Notes / Traveling from (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Traveling from Islamabad with family"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#064E3B] hover:bg-[#022C22] text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#D6A84F]" />
                  <span>Confirm Site Visit Appointment</span>
                </button>

                <a
                  href={getWhatsAppUrl(
                    `Assalam-o-Alaikum! I want to schedule a site visit for ${projectName}. Preferred Date: ${preferredDate || 'Upcoming'}, Time: ${preferredTime}. Please assist.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                    <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                  </svg>
                  <span>WhatsApp Booking: {WHATSAPP_DISPLAY_NUMBER}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

