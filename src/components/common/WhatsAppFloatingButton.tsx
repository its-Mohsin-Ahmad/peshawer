import React from 'react';
import { useData } from '../../contexts/DataContext';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useData();

  const cfg = settings.whatsappSettings || {
    enabled: true,
    phoneNumber: settings.whatsapp || WHATSAPP_DISPLAY_NUMBER,
    intlNumber: '923117000900',
    defaultMessage:
      'Assalam-o-Alaikum! I am interested in your real estate services. I would like to get more information about available properties and projects.',
    showNumberLabel: true,
    desktopVisible: true,
    mobileVisible: true,
    position: 'bottom-left',
    buttonSize: 'medium',
  };

  if (!cfg.enabled) return null;

  const targetPhone = cfg.phoneNumber?.includes('8593450')
    ? WHATSAPP_DISPLAY_NUMBER
    : (cfg.phoneNumber || settings.whatsapp || WHATSAPP_DISPLAY_NUMBER);
  const displayPhone = targetPhone;
  const chatUrl = getWhatsAppUrl(cfg.defaultMessage, targetPhone);
  const isLeft = cfg.position !== 'bottom-right';

  return (
    <div
      className={`fixed z-[9999] pointer-events-auto flex items-center gap-2.5 transition-all duration-300 max-w-[calc(100vw-2rem)] ${
        isLeft
          ? 'left-3 sm:left-6 lg:left-8'
          : 'right-3 sm:right-6 lg:right-8'
      } bottom-3 sm:bottom-6 lg:bottom-8 ${
        !cfg.desktopVisible ? 'lg:hidden' : ''
      } ${!cfg.mobileVisible ? 'hidden sm:flex' : 'flex'}`}
      style={{ isolation: 'isolate' }}
    >
      {/* ─── OFFICIAL WHATSAPP CIRCLE BUTTON ─── */}
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with us on WhatsApp at ${displayPhone}`}
        className={`group relative rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5),0_8px_10px_-6px_rgba(0,0,0,0.15)] hover:scale-105 shrink-0 ${
          cfg.buttonSize === 'large'
            ? 'w-14 h-14 sm:w-16 sm:h-16'
            : 'w-12 h-12 sm:w-14 sm:h-14'
        }`}
      >
        {/* Subtle pulsing green glow animation */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none"
          style={{ animationDuration: '3s' }}
        />

        {/* Ambient Ring Glow */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 blur-sm pointer-events-none group-hover:bg-[#25D366]/50 transition-all" />

        {/* Official WhatsApp SVG Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className={`relative z-10 fill-current drop-shadow-sm ${
            cfg.buttonSize === 'large'
              ? 'w-7 h-7 sm:w-8 sm:h-8'
              : 'w-6 h-6 sm:w-7 sm:h-7'
          }`}
          aria-hidden="true"
        >
          <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
        </svg>
      </a>

      {/* ─── WHITE INQUIRY LABEL (WITH POINTER ARROW) ─── */}
      {cfg.showNumberLabel && (
        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/label relative hidden sm:flex flex-col justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/95 hover:bg-white text-[#064E3B] rounded-2xl sm:rounded-full border border-[#25D366]/40 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12)] hover:border-[#25D366] transition-all duration-300 hover:scale-[1.02] active:scale-98 select-none ${
            isLeft ? 'order-last' : 'order-first'
          }`}
        >
          {/* Subtle Pointer Arrow pointing toward the WhatsApp icon */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-[#25D366]/40 rotate-45 transition-colors group-hover/label:border-[#25D366] ${
              isLeft
                ? '-left-1.5 border-b border-l'
                : '-right-1.5 border-t border-r'
            }`}
          />

          <span className="text-[10px] sm:text-[11px] font-semibold text-[#047857] uppercase tracking-wider leading-tight">
            For More Inquiry
          </span>
          <span className="font-heading text-xs sm:text-sm font-extrabold text-[#022C22] tracking-tight group-hover/label:text-[#25D366] transition-colors leading-tight">
            {displayPhone}
          </span>
        </a>
      )}
    </div>
  );
};

export default WhatsAppFloatingButton;

