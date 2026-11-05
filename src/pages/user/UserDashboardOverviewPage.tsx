import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Bookmark,
  Calendar,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  PieChart as PieIcon,
  Activity,
  MapPin,
  Heart,
  CheckCircle2,
  Star,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { formatPKR } from '../../utils/formatters';

export const UserDashboardOverviewPage: React.FC = () => {
  const { user, savedProperties, appointments, messages, userProperties, isPropertySaved, toggleSaveProperty } =
    useUserAuth();

  const [timeRange, setTimeRange] = useState('6months');

  // Activity Overview Chart Data matching reference
  const overviewData = [
    { month: 'May', views: 8, interactions: 5 },
    { month: 'Jun', views: 14, interactions: 8 },
    { month: 'Jul', views: 11, interactions: 9 },
    { month: 'Aug', views: 19, interactions: 14 },
    { month: 'Sep', views: 13, interactions: 10 },
    { month: 'Oct', views: 22, interactions: 16 },
  ];

  // Donut distribution data
  const distributionData = [
    { name: 'Owned', value: 70, color: '#064E3B' },
    { name: 'Saved', value: 20, color: '#D6A84F' },
    { name: 'Interested', value: 10, color: '#E2E8F0' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. WELCOME ARCHITECTURAL BANNER (Matching Reference Image) */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#022C22] via-[#043E2E] to-[#0A1A15] p-8 sm:p-12 shadow-2xl border border-[#D6A84F]/25 min-h-[220px] flex flex-col justify-center">
        {/* Background architectural image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero/home-clean.png"
            alt="Peshawer Luxury Living"
            className="w-full h-full object-cover object-right sm:object-center filter brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#022C22]/95 via-[#022C22]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl space-y-3">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Welcome Back, <br className="hidden sm:inline" />
            <span className="text-[#D6A84F]">{user?.fullName || 'Mohsin Ahmad'}</span>!
          </h1>
          <p className="text-white/85 text-sm sm:text-base font-normal leading-relaxed">
            Your real estate journey continues with Peshawer.
          </p>

          <div className="pt-2">
            <Link
              to="/properties"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#D6A84F] hover:bg-[#c49742] text-[#022C22] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#D6A84F]/30 hover:scale-[1.02]"
            >
              <span>Browse Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FOUR SUMMARY STATISTIC CARDS (Matching Reference Image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: My Properties */}
        <Link
          to="/user/properties"
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7 text-[#064E3B]" />
            </div>
            <div>
              <span className="font-heading text-3xl font-black text-[#022C22] block leading-none mb-1">
                {userProperties.length || 3}
              </span>
              <span className="text-xs text-[#64748B] font-bold">My Properties</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card 2: Saved Properties */}
        <Link
          to="/user/saved-properties"
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F8F6EA] text-[#B88628] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Bookmark className="w-7 h-7 text-[#D6A84F]" />
            </div>
            <div>
              <span className="font-heading text-3xl font-black text-[#022C22] block leading-none mb-1">
                {savedProperties.length || 5}
              </span>
              <span className="text-xs text-[#64748B] font-bold">Saved Properties</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#F8F6EA] text-[#B88628] flex items-center justify-center group-hover:bg-[#D6A84F] group-hover:text-[#022C22] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card 3: Appointments */}
        <Link
          to="/user/appointments"
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-[#047857]" />
            </div>
            <div>
              <span className="font-heading text-3xl font-black text-[#022C22] block leading-none mb-1">
                {appointments.length || 2}
              </span>
              <span className="text-xs text-[#64748B] font-bold">Appointments</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card 4: New Messages */}
        <Link
          to="/user/messages"
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F8F6EA] text-[#B88628] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7 text-[#D6A84F]" />
            </div>
            <div>
              <span className="font-heading text-3xl font-black text-[#022C22] block leading-none mb-1">
                {messages.length || 3}
              </span>
              <span className="text-xs text-[#64748B] font-bold">New Messages</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#F8F6EA] text-[#B88628] flex items-center justify-center group-hover:bg-[#D6A84F] group-hover:text-[#022C22] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* 3. CHARTS ROW (Property Overview + Property Distribution + Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Property Overview (6 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-[#ECFDF5] text-[#047857]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-sm text-[#022C22] uppercase tracking-wider">
                Property Overview
              </h3>
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:border-[#064E3B]"
            >
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#022C22',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#047857"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Property Distribution Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#F8F6EA] text-[#B88628]">
              <PieIcon className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-black text-sm text-[#022C22] uppercase tracking-wider">
              Distribution
            </h3>
          </div>

          <div className="relative h-44 w-full flex items-center justify-center my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-heading font-black text-lg text-[#022C22]">70%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Owned</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs font-semibold pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]" />
              <span className="text-gray-600">Owned (70%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6A84F]" />
              <span className="text-gray-600">Saved (20%)</span>
            </div>
          </div>
        </div>

        {/* List: Recent Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-[#ECFDF5] text-[#047857]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-sm text-[#022C22] uppercase tracking-wider">
                Recent Activity
              </h3>
            </div>
            <Link to="/user/appointments" className="text-xs font-bold text-[#047857] hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                <Bookmark className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#102A24]">You saved a property</p>
                <span className="text-[10px] text-gray-400">2 hours ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#102A24]">Appointment booked</p>
                <span className="text-[10px] text-gray-400">1 day ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#102A24]">New message from agent</p>
                <span className="text-[10px] text-gray-400">2 days ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#F8F6EA] text-[#B88628] flex items-center justify-center shrink-0 mt-0.5">
                <Star className="w-4 h-4 text-[#D6A84F]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#102A24]">You left a review</p>
                <span className="text-[10px] text-gray-400">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROW: YOUR PROPERTIES + BRANDING CONTACT CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#064E3B]" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] tracking-tight">
              Your Properties
            </h2>
          </div>

          <Link
            to="/user/properties"
            className="text-xs font-bold text-[#064E3B] hover:text-[#D6A84F] flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {userProperties.map((prop, idx) => {
            const isSaved = isPropertySaved(prop.id);
            const purposeLabel = idx === 1 ? 'For Rent' : 'For Sale';
            const priceVal = idx === 0 ? 25000000 : idx === 1 ? 18000000 : 15000000;

            return (
              <div
                key={prop.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={prop.featuredImage}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          purposeLabel === 'For Sale'
                            ? 'bg-[#064E3B] text-white'
                            : 'bg-[#D6A84F] text-[#022C22]'
                        }`}
                      >
                        {purposeLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveProperty(prop.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h4 className="font-heading text-sm font-black text-[#102A24] group-hover:text-[#064E3B] transition-colors truncate">
                      {prop.title.split('-')[0].trim()}
                    </h4>

                    <div className="flex items-center space-x-1 text-[11px] text-[#64748B] mt-1 mb-2">
                      <MapPin className="w-3 h-3 text-[#D6A84F]" />
                      <span className="truncate">{prop.city || prop.location.split(',')[0]}</span>
                    </div>

                    <p className="font-heading text-sm font-black text-[#047857]">
                      {formatPKR(priceVal)}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    to={`/properties/${prop.slug}`}
                    className="w-full py-2 rounded-xl bg-[#F8F6EA] hover:bg-[#064E3B] text-[#064E3B] hover:text-white text-xs font-bold uppercase tracking-wider text-center block transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 4th Column: Peshawer Real Estate Contact Card matching reference */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0A1A15] text-white flex flex-col justify-between border border-[#D6A84F]/30 shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <img
                src="/assets/peshawer-gold-logo.png"
                alt="PESHAWER REAL ESTATE"
                className="h-9 w-auto object-contain drop-shadow"
              />

              <h4 className="font-heading text-sm font-bold text-white/90 leading-snug">
                Building a Better Tomorrow
              </h4>

              <p className="text-[11px] text-gray-300 leading-relaxed">
                Connect with our advisory consultants for bespoke investments and luxury portfolios.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                to="/contact"
                className="w-full py-2.5 px-4 rounded-xl border border-[#D6A84F] hover:bg-[#D6A84F] text-[#D6A84F] hover:text-[#022C22] text-xs font-heading font-black uppercase tracking-wider text-center flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

