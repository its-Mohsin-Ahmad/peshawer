import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  Bookmark,
  Calendar,
  Mail,
  Star,
  Settings,
  CreditCard,
  Headphones,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  User as UserIcon,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { useUserAuth } from '../contexts/UserAuthContext';

export const UserDashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    messages,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
  } = useUserAuth();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'My Properties', path: '/user/properties', icon: Building },
    { name: 'Saved Properties', path: '/user/saved-properties', icon: Bookmark },
    { name: 'My Appointments', path: '/user/appointments', icon: Calendar },
    {
      name: 'Messages',
      path: '/user/messages',
      icon: Mail,
      badge: messages.filter((m) => !m.read).length || 3,
    },
    { name: 'Reviews', path: '/user/reviews', icon: Star },
    { name: 'Profile Settings', path: '/user/profile', icon: Settings },
    { name: 'Payment History', path: '/user/payments', icon: CreditCard },
    { name: 'Help & Support', path: '/user/support', icon: Headphones },
  ];

  const unreadMessagesCount = messages.filter((m) => !m.read).length || 3;

  return (
    <div
      className="h-screen h-[100dvh] max-h-screen bg-[#F8F7F2] text-[#102A24] flex flex-col lg:flex-row font-sans overflow-hidden w-full"
      data-lenis-prevent
    >
      {/* MOBILE HEADER */}
      <header className="lg:hidden bg-[#022C22] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-[#D6A84F]/20 shrink-0">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/navbar-logo.png"
            alt="PESHAWARS REAL ESTATE"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-full bg-white/10 text-white"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-white/10 text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* SIDEBAR (Desktop Fixed + Mobile Drawer, internal scroll only) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#03231A] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:h-screen lg:shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10" data-lenis-prevent>
          {/* Top Brand Logo */}
          <div className="px-3 mb-8 flex items-center justify-between">
            <Link to="/" className="inline-block group">
              <img
                src="/assets/navbar-logo.png"
                alt="PESHAWARS REAL ESTATE"
                className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_10px_rgba(214,168,79,0.35)]"
              />
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/user/dashboard'
                  ? location.pathname === '/user/dashboard'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#D6A84F] text-[#022C22] shadow-md font-black'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#022C22]' : 'text-white/70 group-hover:text-[#D6A84F]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive
                          ? 'bg-[#022C22] text-[#D6A84F]'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Switch to Admin Portal in User Sidebar */}
            <Link
              to="/dashboard"
              className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-[#003D25] to-[#002D1C] text-[#FFC83D] border border-[#E6AA27]/40 shadow-sm hover:border-[#FFC83D] transition-all my-2 group"
            >
              <span className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-[#FFC83D]" />
                <span>Admin Dashboard</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Logout Button in Menu */}
            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
              className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-xs font-heading font-bold uppercase tracking-wider text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors mt-2"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Promo Card at bottom of sidebar matching Reference Image */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-[#022C22] to-[#064E3B] p-4 border border-[#D6A84F]/30 shadow-lg group">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src="/assets/projects/town-garden/hero.png"
                  alt="Find Your Dream Property"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <h4 className="font-heading text-xs font-black text-white leading-snug">
                  Find Your Dream Property in Peshawar
                </h4>
                <Link
                  to="/properties"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#D6A84F] hover:bg-[#c49742] text-[#022C22] text-[10px] font-black uppercase tracking-wider transition-all"
                >
                  <span>Explore More</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div
        className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-y-auto"
        data-lenis-prevent
      >
        {/* DASHBOARD TOP NAVBAR */}
        <header className="bg-white border-b border-gray-200/80 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
          {/* Search properties input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2 bg-[#F8F7F2] rounded-full border border-gray-200 text-xs sm:text-sm text-[#102A24] placeholder-gray-400 focus:outline-none focus:border-[#064E3B] focus:bg-white transition-all"
              />
            </div>
          </form>

          {/* Right: Notifications & User Profile */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* View Public Website */}
            <Link
              to="/"
              className="hidden md:inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#ECFDF5] text-[#064E3B] text-xs font-bold hover:bg-[#064E3B] hover:text-white transition-colors"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-full bg-[#F8F7F2] hover:bg-gray-200 text-[#102A24] transition-colors focus:outline-none"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Popup */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                    <span className="font-heading font-black text-xs text-[#022C22] uppercase tracking-wider">
                      Notifications ({unreadNotificationsCount})
                    </span>
                    <button
                      type="button"
                      onClick={() => notifications.forEach((n) => markNotificationAsRead(n.id))}
                      className="text-[11px] text-[#047857] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 py-1">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.link) navigate(notif.link);
                          }}
                          className={`p-3 rounded-xl cursor-pointer hover:bg-[#F8F6EA] transition-colors ${
                            !notif.read ? 'bg-[#ECFDF5]/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-bold text-[#102A24]">{notif.title}</h5>
                            <span className="text-[10px] text-gray-400">{notif.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                            {notif.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-xs text-gray-400">
                        No notifications at this time
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill & Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#F8F7F2] transition-colors focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#064E3B] text-[#D6A84F] font-bold text-xs flex items-center justify-center border-2 border-[#D6A84F] shadow-sm">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {user?.fullName
                        ? user.fullName
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()
                        : 'U'}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#102A24] leading-tight">
                    {user?.fullName || 'Mohsin Ahmad'}
                  </span>
                  <span className="text-[10px] text-[#64748B]">Client Account</span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 text-[#102A24]">
                  {/* User Info Header */}
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-[#022C22]">{user?.fullName}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl bg-[#003D25] text-[#FFC83D] hover:bg-[#002D1C] transition-colors mb-1 shadow-xs border border-[#E6AA27]/30"
                    >
                      <span className="flex items-center space-x-2">
                        <Shield className="w-3.5 h-3.5 text-[#FFC83D]" />
                        <span>Admin Dashboard</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#FFC83D]" />
                    </Link>

                    <Link
                      to="/user/profile"
                      className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/user/settings"
                      className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                      <span>Account Security</span>
                    </Link>

                    <Link
                      to="/user/support"
                      className="flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-[#F8F6EA] hover:text-[#064E3B] transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={async () => {
                        await logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-bold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

