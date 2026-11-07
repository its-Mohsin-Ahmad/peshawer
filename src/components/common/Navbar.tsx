import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Phone,
  Home,
  Building2,
  Layers,
  FileText,
  MapPin,
  Calendar,
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useUserAuth } from '../../contexts/UserAuthContext';

interface NavbarProps {
  onOpenInquiry?: () => void;
  onOpenAppointment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onOpenAppointment }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, projects } = useData();
  const { user, isAuthenticated, logout } = useUserAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const propTimerRef = useRef<NodeJS.Timeout | null>(null);
  const projTimerRef = useRef<NodeJS.Timeout | null>(null);
  const propMenuRef = useRef<HTMLDivElement | null>(null);
  const projMenuRef = useRef<HTMLDivElement | null>(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close user menu on route change
  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  const userInitials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/');
  };

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
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isHomepage = location.pathname === '/';

  // On the homepage when not scrolled, HeroSection renders its own hero navigation
  // But on all other pages (/properties, /projects, /about, /blogs, /contact), this navbar is ALWAYS rendered

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesDropdownOpen(false);
    setProjectsDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  if (isHomepage && !isScrolled) {
    return null;
  }

  const navBackgroundClass =
    'bg-[#002D1C]/95 backdrop-blur-md text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[#E6AA27]/25';

  const linkColorClass = 'text-white/90 hover:text-[#FFC83D]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBackgroundClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center group py-1.5">
              <img
                src="/assets/navbar-logo.png"
                alt="PESHAWARS REAL ESTATE"
                className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(230,198,120,0.3)]"
              />
            </Link>

            {/* Center: Desktop Navigation with Properties and Projects dropdowns */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
              <Link
                to="/"
                className={`transition-colors duration-200 ${
                  location.pathname === '/' ? 'text-[#D6A84F] font-bold' : linkColorClass
                }`}
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
                  className={`flex items-center space-x-1 py-1 transition-colors duration-200 focus:outline-none ${
                    location.pathname.startsWith('/properties')
                      ? 'text-[#D6A84F] font-bold'
                      : linkColorClass
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
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

                    <div className="bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 py-3 px-2.5 text-[#102A24] animate-in fade-in slide-in-from-top-1 duration-150">
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
                  className={`flex items-center space-x-1 py-1 transition-colors duration-200 focus:outline-none ${
                    location.pathname.startsWith('/projects')
                      ? 'text-[#D6A84F] font-bold'
                      : linkColorClass
                  }`}
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
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

                    <div className="bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 py-3 px-2.5 text-[#102A24] animate-in fade-in slide-in-from-top-1 duration-150">
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
                className={`transition-colors duration-200 ${
                  location.pathname === '/about' ? 'text-[#D6A84F] font-bold' : linkColorClass
                }`}
              >
                About
              </Link>

              <Link
                to="/blogs"
                className={`transition-colors duration-200 ${
                  location.pathname.startsWith('/blogs') ? 'text-[#D6A84F] font-bold' : linkColorClass
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className={`transition-colors duration-200 ${
                  location.pathname === '/contact' ? 'text-[#D6A84F] font-bold' : linkColorClass
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isHomepage && !isScrolled
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-gray-100 text-[#102A24]'
                }`}
                title="Search Properties"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Site Visit button */}
              {onOpenAppointment && (
                <button
                  onClick={onOpenAppointment}
                  className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                    isHomepage && !isScrolled
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : 'border-[#064E3B]/20 text-[#064E3B] hover:bg-[#ECFDF5]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>Book Site Visit</span>
                </button>
              )}

              {/* Get in Touch CTA (hide when logged in to save space) */}
              {!isAuthenticated && (
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D6A84F] to-[#B88628] text-[#022C22] font-heading text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Get In Touch
                </Link>
              )}

              {/* ── User Avatar / Login Button ── */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((p) => !p)}
                    className="flex items-center gap-2 group"
                    aria-label="User menu"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#D6A84F] shadow"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#064E3B] to-[#047857] border-2 border-[#D6A84F] flex items-center justify-center shadow">
                        <span className="text-white text-xs font-bold">{userInitials}</span>
                      </div>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} ${isHomepage && !isScrolled ? 'text-white' : 'text-[#64748B]'}`} />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-1 duration-150">
                      {/* User Info */}
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

                      {/* Menu Items */}
                      <div className="py-2">
                        {[
                          { to: '/user/dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
                          { to: '/user/properties', icon: Building2, label: 'My Properties' },
                          { to: '/user/saved-properties', icon: Heart, label: 'Saved Properties' },
                          { to: '/user/appointments', icon: CalendarCheck, label: 'My Appointments' },
                          { to: '/user/messages', icon: MessageSquare, label: 'Messages' },
                          { to: '/user/profile', icon: Settings, label: 'Profile Settings' },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#022C22] hover:bg-[#F8F6EA] transition-colors"
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
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                    isHomepage && !isScrolled
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : 'border-[#064E3B]/30 text-[#064E3B] hover:bg-[#ECFDF5]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg ${
                  isHomepage && !isScrolled ? 'text-white' : 'text-[#102A24]'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-lg ${
                  isHomepage && !isScrolled ? 'text-white' : 'text-[#102A24]'
                }`}
                aria-label="Open Menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Bar Dropdown */}
        {searchOpen && (
          <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-lg animate-in fade-in slide-in-from-top-1">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, project, or property type (e.g., Kalam, Hayatabad, 1 Kanal)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#064E3B] text-white rounded-lg text-sm font-semibold hover:bg-[#022C22] transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#022C22] text-white">
                <img
                  src="/assets/navbar-logo.png"
                  alt="PESHAWARS Logo"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-gray-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links: Home, Properties, Projects, About, Blogs, Contact */}
              <div className="px-4 py-6 space-y-2 text-[#102A24]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  Properties
                </Link>
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  About
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  Blogs
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg font-medium hover:bg-[#F8F6EA] text-sm"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-gray-100 bg-[#F8F6EA]/60 space-y-3">
              <a
                href={`tel:${settings.phonePrimary}`}
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg border border-[#064E3B] text-[#064E3B] font-semibold text-xs tracking-wider uppercase"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.phonePrimary}</span>
              </a>

              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/user/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#064E3B] text-white font-bold text-xs uppercase tracking-wider shadow"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-red-200 text-red-600 font-semibold text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full py-3 rounded-lg bg-gradient-to-r from-[#D6A84F] to-[#B88628] text-[#022C22] font-heading font-extrabold text-xs uppercase tracking-wider shadow"
                  >
                    Login / Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

