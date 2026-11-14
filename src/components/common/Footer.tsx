import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { AnimatedSection } from './AnimatedSection';

export const Footer: React.FC = () => {
  const { settings, projects } = useData();

  return (
    <footer className="bg-[#002417] text-white pt-16 pb-10 border-t-2 border-[#E6AA27]/30 relative overflow-hidden w-full">
      {/* Background architectural glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004B2E]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#006B40]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center group">
              <img
                src="/assets/navbar-logo.png"
                alt="PESHAWARS REAL ESTATE"
                className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(230,170,39,0.35)]"
              />
            </Link>

            <p className="text-sm text-[#E8F3EC]/80 leading-relaxed max-w-sm">
              Peshawar’s premier real estate consultancy and project developer. Delivering verified
              investment opportunities, transparent 5-year installment plans, and architectural
              masterpieces across Khyber Pakhtunkhwa.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#003D25] border border-[#E6AA27]/30 flex items-center justify-center text-white hover:bg-[#FFC83D] hover:text-[#002D1C] transition-colors btn-hover"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#003D25] border border-[#E6AA27]/30 flex items-center justify-center text-white hover:bg-[#FFC83D] hover:text-[#002D1C] transition-colors btn-hover"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#003D25] border border-[#E6AA27]/30 flex items-center justify-center text-white hover:bg-[#FFC83D] hover:text-[#002D1C] transition-colors btn-hover"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#FFC83D]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8F3EC]/80">
              <li>
                <Link to="/" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>Blogs & Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFC83D] transition-colors flex items-center">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#FFC83D]">
              Property Types
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8F3EC]/80">
              <li>
                <Link to="/properties/buy" className="hover:text-[#FFC83D] transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties/rent" className="hover:text-[#FFC83D] transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link to="/properties?category=Apartment" className="hover:text-[#FFC83D] transition-colors">
                  Apartments & Suites
                </Link>
              </li>
              <li>
                <Link to="/properties?category=House" className="hover:text-[#FFC83D] transition-colors">
                  Houses & Villas
                </Link>
              </li>
              <li>
                <Link to="/properties/commercial" className="hover:text-[#FFC83D] transition-colors">
                  Commercial Offices
                </Link>
              </li>
              <li>
                <Link to="/properties/plots" className="hover:text-[#FFC83D] transition-colors">
                  Plots & Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Signature Projects */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#FFC83D]">
              Signature Projects
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8F3EC]/80">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="hover:text-[#FFC83D] transition-colors flex items-center justify-between group"
                  >
                    <span>{p.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FFC83D]" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/10 text-xs text-[#E8F3EC]/70 space-y-1.5">
              <a
                href={`tel:${settings.phonePrimary}`}
                className="flex items-center space-x-2 hover:text-[#FFC83D] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFC83D]" />
                <span>{settings.phonePrimary}</span>
              </a>
              <a
                href="https://wa.me/923117000900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[#25D366] hover:text-[#20bd5a] font-bold transition-colors"
                title="Chat with us on WhatsApp"
              >
                <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current">
                  <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
                </svg>
                <span>WhatsApp: 03117000900</span>
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center space-x-2 hover:text-[#FFC83D] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FFC83D]" />
                <span>{settings.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8F3EC]/60 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Peshawars.com</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-[#FFC83D] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[#FFC83D] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-[#FFC83D]/60">Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

