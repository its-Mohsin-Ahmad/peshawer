import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Menu,
  X,
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import gsap from 'gsap';
import { useData } from '../../contexts/DataContext';
import { useUserAuth } from '../../contexts/UserAuthContext';

interface HeroSectionProps {
  onOpenInquiry?: () => void;
  onOpenAppointment?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onOpenAppointment,
}) => {
  const navigate = useNavigate();
  const { projects } = useData();
  const { user, isAuthenticated, logout } = useUserAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Animation Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const fgCutoutRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headlineLettersRef = useRef<HTMLSpanElement[]>([]);
  const headlineContainerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  // Search State
  const [locationVal, setLocationVal] = useState('');
  const [propertyTypeVal, setPropertyTypeVal] = useState('');
  const [priceRangeVal, setPriceRangeVal] = useState('');

  // Dropdown menus state in navbar
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const propTimerRef = useRef<NodeJS.Timeout | null>(null);
  const projTimerRef = useRef<NodeJS.Timeout | null>(null);
  const propMenuRef = useRef<HTMLDivElement | null>(null);
  const projMenuRef = useRef<HTMLDivElement | null>(null);

  const handlePropEnter = () => {
    if (propTimerRef.current) clearTimeout(propTimerRef.current);
    if (projTimerRef.current) clearTimeout(projTimerRef.current);
    setPropertiesDropdownOpen(true);
    setProjectsDropdownOpen(false);
  };

  const handlePropLeave = () => {
    if (propTimerRef.current) clearTimeout(propTimerRef.current);
    propTimerRef.current = setTimeout(() => {
      setPropertiesDropdownOpen(false);
    }, 400);
  };

  const handlePropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (propTimerRef.current) clearTimeout(propTimerRef.current);
    setProjectsDropdownOpen(false);
    setPropertiesDropdownOpen((prev) => !prev);
  };

  const handleProjEnter = () => {
    if (projTimerRef.current) clearTimeout(projTimerRef.current);
    if (propTimerRef.current) clearTimeout(propTimerRef.current);
    setProjectsDropdownOpen(true);
    setPropertiesDropdownOpen(false);
  };

  const handleProjLeave = () => {
    if (projTimerRef.current) clearTimeout(projTimerRef.current);
    projTimerRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 400);
  };

  const handleProjClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (projTimerRef.current) clearTimeout(projTimerRef.current);
    setPropertiesDropdownOpen(false);
    setProjectsDropdownOpen((prev) => !prev);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        propMenuRef.current &&
        !propMenuRef.current.contains(e.target as Node) &&
        projMenuRef.current &&
        !projMenuRef.current.contains(e.target as Node)
      ) {
        setPropertiesDropdownOpen(false);
        setProjectsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const userInitials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/');
  };

  // Search filter options
  const locationOptions = [
    'University Town Peshawar (Town Garden)',
    'Kalam',
    'Swat',
  ];

  const propertyTypeOptions = [
    'House',
    'Apartment',
    'Villa',
    'Plot',
    'Commercial',
    'Office',
    'Shop',
    'Cottage',
  ];

  const priceRangeOptions = [
    { label: 'Under PKR 1 Crore', min: '0', max: '10000000' },
    { label: 'PKR 1 - 2.5 Crore', min: '10000000', max: '25000000' },
    { label: 'PKR 2.5 - 5 Crore', min: '25000000', max: '50000000' },
    { label: 'PKR 5 - 10 Crore', min: '50000000', max: '100000000' },
    { label: 'PKR 10 Crore+', min: '100000000', max: '' },
  ];

  const headlineWord = 'PESHAWAR';
  const letters = headlineWord.split('');

  // 3D GSAP Orchestrated Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background image subtle gentle zoom into place
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.05, filter: 'brightness(0.92)' },
          { scale: 1, filter: 'brightness(1)', duration: 1.8, ease: 'power2.out' },
          0
        );
      }

      // Foreground cutout stays synced
      if (fgCutoutRef.current) {
        tl.fromTo(
          fgCutoutRef.current,
          { scale: 1.05 },
          { scale: 1, duration: 1.8, ease: 'power2.out' },
          0
        );
      }

      // 2. Navbar fades in from above
      if (navRef.current) {
        tl.fromTo(
          navRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.2
        );
      }

      // 3. 3D Headline Animation: Letters rise up in 3D perspective and sink BEHIND the modern villas roof
      if (headlineLettersRef.current.length > 0) {
        tl.fromTo(
          headlineLettersRef.current,
          {
            y: 110,
            z: -280,
            rotationX: 50,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            duration: 1.25,
            stagger: 0.06,
            ease: 'power3.out',
          },
          0.4
        );
      }

      // 4. Subtle continuous 3D breathing / floating effect behind the houses
      if (headlineContainerRef.current) {
        gsap.to(headlineContainerRef.current, {
          y: -12,
          rotationY: 1.8,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.8,
        });
      }

      // 5. Small tagline fades in
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.8 },
          0.8
        );
      }

      // 6. Hero description moves upward and fades in
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.0
        );
      }

      // 7. Search panel slides upward with a soft fade
      if (searchPanelRef.current) {
        tl.fromTo(
          searchPanelRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          1.2
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locationVal) params.set('location', locationVal);
    if (propertyTypeVal) params.set('category', propertyTypeVal);

    if (priceRangeVal) {
      const selected = priceRangeOptions.find((p) => p.label === priceRangeVal);
      if (selected) {
        if (selected.min) params.set('minPrice', selected.min);
        if (selected.max) params.set('maxPrice', selected.max);
      }
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[75vh] sm:h-[82vh] lg:h-[88vh] min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] max-h-[960px] flex flex-col justify-between overflow-hidden bg-[#0A1210] select-none text-white"
      style={{ perspective: '1200px' }}
    >
      {/* LAYER 0: BASE HIGH-RES HERO BACKGROUND (Sky + Villas + Lawn) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src="/assets/hero/home-clean.png"
          alt="PESHAWER REAL ESTATE Luxury Modern Villas"
          className="w-full h-full object-cover object-bottom sm:object-center"
        />

        {/* Top gradient for navbar clarity */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* LAYER 1: 3D ANIMATED "PESHAWER" HEADLINE (PHYSICALLY BEHIND THE HOMES) */}
      <div
        ref={headlineContainerRef}
        className="absolute inset-x-0 top-[11vh] sm:top-[13vh] lg:top-[15vh] z-10 pointer-events-none flex justify-center px-2 sm:px-4 max-w-full overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden">
          <h1
            className="font-heading font-black text-white uppercase select-none text-center max-w-full"
            style={{
              fontSize: 'clamp(2.5rem, 16vw, 18rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              textShadow: '1px 1px 0 rgba(0,0,0,0.35), 2px 2px 0 rgba(0,0,0,0.32), 3px 3px 0 rgba(0,0,0,0.28), 4px 4px 0 rgba(0,0,0,0.24), 5px 5px 0 rgba(0,0,0,0.20), 6px 6px 0 rgba(0,0,0,0.16), 7px 7px 0 rgba(0,0,0,0.12), 8px 8px 0 rgba(0,0,0,0.08), 9px 9px 20px rgba(0,0,0,0.40)',
              transformStyle: 'preserve-3d',
            }}
          >
            {letters.map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) headlineLettersRef.current[index] = el;
                }}
                className="inline-block transform-gpu"
                style={{
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* LAYER 2: FOREGROUND CUTOUT OF THE HOMES (Roofs, walls & trees sit IN FRONT of the 3D text) */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <img
          ref={fgCutoutRef}
          src="/assets/hero/home-clean-cutout.png"
          alt="PESHAWER REAL ESTATE Villas Foreground Architecture"
          className="w-full h-full object-cover object-bottom sm:object-center"
        />

        {/* Soft natural lawn shading to anchor the description and search bar */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 lg:h-72 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* LAYER 3: TRANSPARENT NAVBAR */}
      <header
        ref={navRef}
        className="relative z-50 w-full pt-0 px-4 sm:px-8 lg:px-14 flex items-center justify-between"
      >
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center group py-1.5">
          <img
            src="/assets/navbar-logo.png"
            alt="PESHAWARS REAL ESTATE"
            className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(230,198,120,0.35)]"
          />
        </Link>

        {/* Center Navigation Links: Home, Properties (dropdown), Projects (dropdown), About, Blogs, Contact */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[13.5px] font-medium tracking-wide">
          <Link
            to="/"
            className="text-white/95 hover:text-[#D6A84F] transition-colors duration-200 drop-shadow"
          >
            Home
          </Link>

          {/* Properties Dropdown */}
          <div
            ref={propMenuRef}
            className="relative py-2"
            onMouseEnter={handlePropEnter}
            onMouseLeave={handlePropLeave}
          >
            <button
              type="button"
              onClick={handlePropClick}
              className="flex items-center space-x-1 text-white/95 hover:text-[#D6A84F] transition-colors duration-200 py-1 drop-shadow focus:outline-none"
            >
              <span>Properties</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  propertiesDropdownOpen ? 'rotate-180 text-[#D6A84F]' : ''
                }`}
              />
            </button>

            {propertiesDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-72 sm:w-80 z-[100] pointer-events-auto"
                onMouseEnter={handlePropEnter}
                onMouseLeave={handlePropLeave}
              >
                {/* Seamless hover bridge */}
                <div className="absolute -top-3 inset-x-0 h-4 bg-transparent" />

                <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-gray-100 py-3 px-2.5 text-[#102A24] animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* View All */}
                  <Link
                    to="/properties"
                    onClick={() => setPropertiesDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider rounded-xl hover:bg-[#ECFDF5] transition-colors"
                  >
                    <span>All Properties</span>
                    <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded-full font-bold">
                      Full Catalog
                    </span>
                  </Link>

                  <div className="h-px bg-gray-100 my-2" />

                  {/* Categories */}
                  <div className="px-3 pt-1 pb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
                      Select Property Category
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      to="/properties?category=Villa"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Luxury Villas
                      </span>
                      <span className="text-[10px] text-[#B88628] font-bold bg-[#F8F6EA] px-2 py-0.5 rounded-md">
                        Featured
                      </span>
                    </Link>

                    <Link
                      to="/properties?category=Apartment"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Modern Apartments
                      </span>
                      <span className="text-[10px] text-[#047857] font-semibold">
                        Luxury
                      </span>
                    </Link>

                    <Link
                      to="/properties?category=Cottage"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Swat & Kalam Cottages
                      </span>
                      <span className="text-[10px] text-[#047857] font-semibold">
                        Scenic
                      </span>
                    </Link>

                    <Link
                      to="/properties?category=House"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Houses & Residences
                      </span>
                    </Link>

                    <Link
                      to="/properties?category=Commercial"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Commercial & Offices
                      </span>
                    </Link>

                    <Link
                      to="/properties?category=Plot"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors group/item"
                    >
                      <span className="font-semibold text-gray-800 group-hover/item:text-[#064E3B]">
                        Plots & Land
                      </span>
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 my-2" />

                  {/* Purpose */}
                  <div className="px-3 pt-1 pb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
                      By Purpose
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 px-1 pt-0.5">
                    <Link
                      to="/properties?purpose=Buy"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#ECFDF5] hover:bg-[#064E3B] text-[#064E3B] hover:text-white text-xs font-bold transition-all text-center"
                    >
                      For Sale (Buy)
                    </Link>
                    <Link
                      to="/properties?purpose=Rent"
                      onClick={() => setPropertiesDropdownOpen(false)}
                      className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#F8F6EA] hover:bg-[#B88628] text-[#B88628] hover:text-white text-xs font-bold transition-all text-center"
                    >
                      For Rent
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Dropdown */}
          <div
            ref={projMenuRef}
            className="relative py-2"
            onMouseEnter={handleProjEnter}
            onMouseLeave={handleProjLeave}
          >
            <button
              type="button"
              onClick={handleProjClick}
              className="flex items-center space-x-1 text-white/95 hover:text-[#D6A84F] transition-colors duration-200 py-1 drop-shadow focus:outline-none"
            >
              <span>Projects</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  projectsDropdownOpen ? 'rotate-180 text-[#D6A84F]' : ''
                }`}
              />
            </button>

            {projectsDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-72 sm:w-80 z-[100] pointer-events-auto"
                onMouseEnter={handleProjEnter}
                onMouseLeave={handleProjLeave}
              >
                {/* Seamless hover bridge */}
                <div className="absolute -top-3 inset-x-0 h-4 bg-transparent" />

                <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-gray-100 py-3 px-2.5 text-[#102A24] animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    to="/projects"
                    onClick={() => setProjectsDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider rounded-xl hover:bg-[#ECFDF5] transition-colors"
                  >
                    <span>All Signature Projects</span>
                    <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded-full font-bold">
                      View All
                    </span>
                  </Link>

                  <div className="h-px bg-gray-100 my-2" />

                  <div className="space-y-0.5 max-h-72 overflow-y-auto">
                    {projects.map((proj) => (
                      <Link
                        key={proj.id}
                        to={`/projects/${proj.slug}`}
                        onClick={() => setProjectsDropdownOpen(false)}
                        className="flex flex-col px-3 py-2 rounded-xl hover:bg-[#F8F6EA] group/proj transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-800 group-hover/proj:text-[#064E3B]">
                            {proj.name}
                          </span>
                          {proj.slug === 'town-garden' && (
                            <span className="text-[10px] bg-[#064E3B] text-white px-2 py-0.5 rounded-full font-bold">
                              Video
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#64748B] truncate">
                          {proj.location.split(',')[0]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="text-white/95 hover:text-[#D6A84F] transition-colors duration-200 drop-shadow"
          >
            About
          </Link>
          <Link
            to="/blogs"
            className="text-white/95 hover:text-[#D6A84F] transition-colors duration-200 drop-shadow"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className="text-white/95 hover:text-[#D6A84F] transition-colors duration-200 drop-shadow"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Glassmorphism Login button or Profile Icon */}
        <div className="hidden lg:flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/35 shadow-sm transition-all duration-200"
                aria-label="User menu"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#D6A84F]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#064E3B] to-[#047857] border border-[#D6A84F] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{userInitials}</span>
                  </div>
                )}
                <span className="text-white text-xs font-semibold max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-br from-[#064E3B] to-[#022C22]">
                    <div className="flex items-center gap-3">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.fullName} className="w-10 h-10 rounded-full object-cover border-2 border-[#D6A84F]" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#D6A84F]/20 border-2 border-[#D6A84F] flex items-center justify-center">
                          <span className="text-[#D6A84F] text-sm font-bold">{userInitials}</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user.fullName}</p>
                        <p className="text-white/60 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="py-2 text-[#102A24]">
                    {[
                      { to: '/user/dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
                      { to: '/user/properties', icon: User, label: 'My Properties' },
                      { to: '/user/saved-properties', icon: Heart, label: 'Saved Properties' },
                      { to: '/user/appointments', icon: CalendarCheck, label: 'My Appointments' },
                      { to: '/user/messages', icon: MessageSquare, label: 'Messages' },
                      { to: '/user/profile', icon: Settings, label: 'Profile Settings' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F8F6EA] transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-[#064E3B]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/35 text-white text-xs font-medium tracking-wide shadow-sm transition-all duration-200 hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/20 text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-[#062018]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-4 text-base font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              Home
            </Link>
            <Link
              to="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              Properties
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              Projects
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              About
            </Link>
            <Link
              to="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#D6A84F]"
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-white/10 space-y-2">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/user/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#064E3B] border border-[#D6A84F]/40 text-white font-semibold text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D6A84F]" />
                    <span>My Dashboard</span>
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-full border border-red-300/40 text-red-300 text-xs font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-block text-center py-2.5 rounded-full bg-white/20 text-white font-medium text-sm hover:bg-white/30 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* UPPER-RIGHT TAGLINE */}
      <div className="relative z-30 w-full px-4 sm:px-8 lg:px-14">
        <div className="max-w-7xl mx-auto relative">
          <div
            ref={taglineRef}
            className="absolute right-0 top-0 text-right hidden sm:block max-w-[240px] lg:max-w-[280px]"
          >
            <p className="text-white/95 text-xs lg:text-[13px] font-medium leading-snug drop-shadow-md">
              “Turning Dreams into Reality,
              <br />
              One Property at a Time”
            </p>
          </div>
        </div>
      </div>

      {/* FLEX-1 SPACER (LETS 3D HEADLINE REMAIN VISIBLE BEHIND THE ROOFLINE) */}
      <div className="relative z-30 flex-1 min-h-[90px] sm:min-h-[160px] lg:min-h-[200px]" />

      {/* LOWER SECTION: DESCRIPTION & SEARCH PANEL */}
      <div className="relative z-30 w-full pb-5 sm:pb-8 lg:pb-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Main Hero Description */}
          <div
            ref={descriptionRef}
            className="text-center mb-3 sm:mb-6 max-w-3xl px-2 sm:px-4"
          >
            <h2 className="text-white font-heading text-sm sm:text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] leading-snug sm:leading-tight">
              Buy, Sell and Invest – Simplifying Your Real Estate Journey
            </h2>
          </div>

          {/* Property Search Panel */}
          <div
            ref={searchPanelRef}
            className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] p-3 sm:p-2 sm:pl-7 border border-white/60 text-[#102A24]"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2"
            >
              {/* Location Field */}
              <div className="flex-1 px-3 sm:px-2 py-1.5 sm:py-0 relative group">
                <label className="block text-[11px] font-bold text-[#102A24] tracking-wide mb-0.5">
                  Location
                </label>
                <div className="relative flex items-center">
                  <select
                    value={locationVal}
                    onChange={(e) => setLocationVal(e.target.value)}
                    className="w-full appearance-none bg-transparent text-xs sm:text-[13px] font-medium text-[#475569] focus:text-[#064E3B] focus:outline-none cursor-pointer pr-6"
                  >
                    <option value="">Select Your City</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc} className="text-[#102A24]">
                        {loc}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-1 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-[#064E3B] transition-colors" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-9 bg-gray-200" />

              {/* Property Type Field */}
              <div className="flex-1 px-3 sm:px-2 py-1.5 sm:py-0 relative group">
                <label className="block text-[11px] font-bold text-[#102A24] tracking-wide mb-0.5">
                  Property Type
                </label>
                <div className="relative flex items-center">
                  <select
                    value={propertyTypeVal}
                    onChange={(e) => setPropertyTypeVal(e.target.value)}
                    className="w-full appearance-none bg-transparent text-xs sm:text-[13px] font-medium text-[#475569] focus:text-[#064E3B] focus:outline-none cursor-pointer pr-6"
                  >
                    <option value="">Choose Property Type</option>
                    {propertyTypeOptions.map((type) => (
                      <option key={type} value={type} className="text-[#102A24]">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-[#064E3B] transition-colors" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-9 bg-gray-200" />

              {/* Price Range Field */}
              <div className="flex-1 px-3 sm:px-2 py-1.5 sm:py-0 relative group">
                <label className="block text-[11px] font-bold text-[#102A24] tracking-wide mb-0.5">
                  Price Range
                </label>
                <div className="relative flex items-center">
                  <select
                    value={priceRangeVal}
                    onChange={(e) => setPriceRangeVal(e.target.value)}
                    className="w-full appearance-none bg-transparent text-xs sm:text-[13px] font-medium text-[#475569] focus:text-[#064E3B] focus:outline-none cursor-pointer pr-6"
                  >
                    <option value="">Choose Price Range</option>
                    {priceRangeOptions.map((p) => (
                      <option key={p.label} value={p.label} className="text-[#102A24]">
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-[#064E3B] transition-colors" />
                </div>
              </div>

              {/* Browse Properties Button */}
              <div className="pt-1 sm:pt-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 sm:py-3 rounded-full bg-[#162C22] hover:bg-[#064E3B] active:bg-[#022C22] text-white text-xs sm:text-[13px] font-heading font-extrabold tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
