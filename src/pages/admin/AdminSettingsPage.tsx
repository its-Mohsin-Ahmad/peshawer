import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, Shield, RotateCcw, Save, CheckCircle2, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { formatWhatsAppIntl } from '../../utils/whatsapp';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, auditLogs, resetAllData } = useData();
  const { user } = useAuth();

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [phonePrimary, setPhonePrimary] = useState(settings.phonePrimary);
  const [phoneSecondary, setPhoneSecondary] = useState(settings.phoneSecondary);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp || '03117000900');
  const [email, setEmail] = useState(settings.email);
  const [officeAddress, setOfficeAddress] = useState(settings.officeAddress);
  const [businessHours, setBusinessHours] = useState(settings.businessHours);
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl);

  // WhatsApp Floating Widget Settings
  const [waEnabled, setWaEnabled] = useState(settings.whatsappSettings?.enabled ?? true);
  const [waDefaultMsg, setWaDefaultMsg] = useState(
    settings.whatsappSettings?.defaultMessage ||
      'Assalam-o-Alaikum! I am interested in your real estate services. I would like to get more information about available properties and projects.'
  );
  const [waShowLabel, setWaShowLabel] = useState(settings.whatsappSettings?.showNumberLabel ?? true);
  const [waDesktop, setWaDesktop] = useState(settings.whatsappSettings?.desktopVisible ?? true);
  const [waMobile, setWaMobile] = useState(settings.whatsappSettings?.mobileVisible ?? true);
  const [waPosition, setWaPosition] = useState<'bottom-left' | 'bottom-right'>(
    settings.whatsappSettings?.position || 'bottom-left'
  );
  const [waSize, setWaSize] = useState<'medium' | 'large'>(
    settings.whatsappSettings?.buttonSize || 'medium'
  );

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyName,
      phonePrimary,
      phoneSecondary,
      whatsapp,
      whatsappSettings: {
        enabled: waEnabled,
        phoneNumber: whatsapp || '03117000900',
        intlNumber: formatWhatsAppIntl(whatsapp || '03117000900'),
        defaultMessage: waDefaultMsg,
        showNumberLabel: waShowLabel,
        desktopVisible: waDesktop,
        mobileVisible: waMobile,
        position: waPosition,
        buttonSize: waSize,
      },
      email,
      officeAddress,
      businessHours,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore the initial default database? All mock modifications will revert.')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-premium flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Platform Settings & Security
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage company profile, contact details, social links, and security audit logs.
          </p>
        </div>

        {saved && (
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#047857] bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#047857]/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium space-y-6">
        <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider border-b border-gray-100 pb-3">
          Company Contact & Public Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Primary Telephone
            </label>
            <input
              type="text"
              value={phonePrimary}
              onChange={(e) => setPhonePrimary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Secondary Telephone
            </label>
            <input
              type="text"
              value={phoneSecondary}
              onChange={(e) => setPhoneSecondary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              WhatsApp Support
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
            Office Physical Address
          </label>
          <input
            type="text"
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
            Operating Business Hours
          </label>
          <input
            type="text"
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider border-b border-gray-100 pb-3 pt-4">
          Social Media Integrations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Facebook URL
            </label>
            <input
              type="text"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              Instagram URL
            </label>
            <input
              type="text"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
              YouTube Channel
            </label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>
        </div>

        {/* WhatsApp Floating Widget & Inquiry Settings */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
                  WhatsApp Integration & Floating Widget
                </h2>
                <p className="text-xs text-[#64748B]">
                  Manage the floating WhatsApp inquiry button, hotline number (03117000900), and auto-filled messages across the website.
                </p>
              </div>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={waEnabled}
                onChange={(e) => setWaEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
              <span className="ms-3 text-xs font-bold text-[#102A24]">
                {waEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8F6EA]/50 p-5 rounded-2xl border border-emerald-900/10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                WhatsApp Hotline Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="03117000900"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
              />
              <p className="text-[11px] text-[#64748B] mt-1">
                Converts automatically to international format: <span className="font-mono font-bold text-[#047857]">+{formatWhatsAppIntl(whatsapp)}</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                Widget Screen Position
              </label>
              <select
                value={waPosition}
                onChange={(e) => setWaPosition(e.target.value as 'bottom-left' | 'bottom-right')}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
              >
                <option value="bottom-left">Bottom-Left (Recommended / Standard)</option>
                <option value="bottom-right">Bottom-Right</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1.5">
                Default General Chat Inquiry Message
              </label>
              <textarea
                rows={2}
                value={waDefaultMsg}
                onChange={(e) => setWaDefaultMsg(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                placeholder="Assalam-o-Alaikum! I am interested in your real estate services..."
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1">
              <label className="flex items-center space-x-2 text-xs font-medium text-[#102A24] cursor-pointer">
                <input
                  type="checkbox"
                  checked={waShowLabel}
                  onChange={(e) => setWaShowLabel(e.target.checked)}
                  className="rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
                />
                <span>Show "For More Inquiry: {whatsapp || '03117000900'}" White Label</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium text-[#102A24] cursor-pointer">
                <input
                  type="checkbox"
                  checked={waDesktop}
                  onChange={(e) => setWaDesktop(e.target.checked)}
                  className="rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
                />
                <span>Visible on Desktop</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium text-[#102A24] cursor-pointer">
                <input
                  type="checkbox"
                  checked={waMobile}
                  onChange={(e) => setWaMobile(e.target.checked)}
                  className="rounded border-gray-300 text-[#047857] focus:ring-[#047857]"
                />
                <span>Visible on Mobile</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#064E3B] hover:bg-[#022C22] text-white text-xs font-heading font-extrabold uppercase tracking-wider rounded-xl shadow transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4 text-[#D6A84F]" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>

      {/* Security & System Restore */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
        <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
          System Administration & Reset
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
          <div>
            <div className="font-bold text-amber-900 mb-0.5">Reset System Data to Default</div>
            <div className="text-amber-700">
              Restores initial 4 projects, payment schedules, property records, and mock hero slides.
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold uppercase tracking-wider shrink-0 flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset To Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};

