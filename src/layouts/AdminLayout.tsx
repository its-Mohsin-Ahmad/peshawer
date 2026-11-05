import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import {
  LayoutDashboard,
  Building,
  Building2,
  Layers,
  FileSpreadsheet,
  Image as ImageIcon,
  Sliders,
  Inbox,
  Calendar,
  Mail,
  BookOpen,
  Star,
  Globe,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { inquiries, appointments, messages } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#022C22] flex items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#D6A84F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Strict route protection: unauthenticated users redirected to /dashboard/login
  if (!isAuthenticated || !user) {
    return <Navigate to="/dashboard/login" state={{ from: location }} replace />;
  }

  const unreadInquiries = inquiries.filter((i) => i.status === 'New').length;
  const pendingAppointments = appointments.filter((a) => a.status === 'Pending').length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Properties', path: '/dashboard/properties', icon: Building },
    { label: 'Development Projects', path: '/dashboard/projects', icon: Building2 },
    { label: 'Apartments & Units', path: '/dashboard/apartments', icon: Layers },
    { label: 'Payment Plans', path: '/dashboard/payment-plans', icon: FileSpreadsheet },
    { label: 'Hero Slides & Page Heroes', path: '/dashboard/hero-carousel', icon: Sliders },
    { label: 'Media Library', path: '/dashboard/media', icon: ImageIcon },
    {
      label: 'Inquiries',
      path: '/dashboard/inquiries',
      icon: Inbox,
      badge: unreadInquiries > 0 ? unreadInquiries : undefined,
    },
    {
      label: 'Site Appointments',
      path: '/dashboard/appointments',
      icon: Calendar,
      badge: pendingAppointments > 0 ? pendingAppointments : undefined,
    },
    {
      label: 'Contact Messages',
      path: '/dashboard/messages',
      icon: Mail,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
    { label: 'Blog Articles', path: '/dashboard/blogs', icon: BookOpen },
    { label: 'Testimonials', path: '/dashboard/testimonials', icon: Star },
    { label: 'Website CMS', path: '/dashboard/content', icon: Globe },
    { label: 'Analytics & Traffic', path: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Platform Settings', path: '/dashboard/settings', icon: Settings },
    { label: 'Security & Audit Logs', path: '/dashboard/security', icon: Shield },
  ];

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  return (
    <div
      className="h-screen h-[100dvh] max-h-screen bg-gray-50 flex overflow-hidden w-full"
      data-lenis-prevent
    >
      {/* Sidebar Desktop Fixed (Internal Scroll Only) */}
      <aside className="hidden lg:flex lg:flex-col w-72 h-screen h-[100dvh] bg-[#022C22] text-white shrink-0 border-r border-[#064E3B] select-none overflow-hidden">
        {/* Brand header */}
        <div className="p-6 border-b border-[#064E3B] flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#064E3B] p-1 border border-[#D6A84F]/40 flex items-center justify-center shrink-0">
              <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm tracking-wider uppercase text-white leading-tight">
                PESHAWER <span className="text-[#D6A84F]">REALTY</span>
              </div>
              <div className="text-[10px] text-[#ECFDF5]/60 uppercase tracking-widest font-mono">
                Administrator
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div
          className="flex-1 overflow-y-auto px-4 py-5 space-y-1 scrollbar-thin scrollbar-thumb-white/10 min-h-0"
          data-lenis-prevent
        >
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-[#D6A84F]">
            Platform Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-sm font-bold border-l-4 border-[#D6A84F]'
                    : 'text-[#ECFDF5]/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A84F]' : 'text-[#ECFDF5]/60'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D6A84F] text-[#022C22]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom user profile & logout */}
        <div className="p-4 border-t border-[#064E3B] bg-[#022C22]/90 flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-9 h-9 rounded-full bg-[#064E3B] text-[#D6A84F] font-bold text-xs flex items-center justify-center shrink-0">
              AD
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-[#ECFDF5]/60 truncate">{user.email}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            title="Log Out Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#064E3B]"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <span>Admin Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#064E3B] font-bold capitalize">
                {location.pathname.replace('/dashboard', '').replace('/', '') || 'Overview'}
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4">
            {/* Live website link */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-[#064E3B] hover:bg-[#ECFDF5] transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D6A84F]" />
            </Link>

            {/* Notification badge button */}
            <Link
              to="/dashboard/inquiries"
              className="relative p-2 text-gray-500 hover:text-[#064E3B] rounded-lg hover:bg-gray-100 transition-colors"
              title="Recent Inquiries"
            >
              <Bell className="w-5 h-5" />
              {(unreadInquiries > 0 || unreadMessages > 0) && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#D6A84F] ring-2 ring-white" />
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 min-h-0 h-full"
          data-lenis-prevent
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-[#022C22] text-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div className="p-5 border-b border-[#064E3B] flex items-center justify-between">
              <span className="font-heading font-extrabold text-sm uppercase text-white">
                ADMIN CONSOLE
              </span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0" data-lenis-prevent>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-[#D6A84F]" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6A84F] text-[#022C22]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-[#064E3B]">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

