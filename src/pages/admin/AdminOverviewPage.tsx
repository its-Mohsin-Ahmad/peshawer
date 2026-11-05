import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  Building,
  Building2,
  Layers,
  Inbox,
  Calendar,
  Mail,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminOverviewPage: React.FC = () => {
  const { properties, projects, inquiries, appointments, messages, auditLogs } = useData();

  const totalProps = properties.length;
  const publishedProps = properties.filter((p) => p.published).length;
  const totalProjects = projects.length;
  const totalApartments = projects.reduce((acc, p) => acc + (p.apartments?.length || 0), 0);
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const pendingApts = appointments.filter((a) => a.status === 'Pending').length;
  const unreadMsgs = messages.filter((m) => !m.read).length;

  const kpis = [
    {
      label: 'Total Properties',
      value: totalProps,
      sub: `${publishedProps} Published Live`,
      icon: Building,
      color: 'bg-emerald-50 text-emerald-700',
      link: '/dashboard/properties',
    },
    {
      label: 'Signature Projects',
      value: totalProjects,
      sub: '4 Master Developments',
      icon: Building2,
      color: 'bg-amber-50 text-amber-700',
      link: '/dashboard/projects',
    },
    {
      label: 'Apartment Plans',
      value: totalApartments,
      sub: 'Verified 5-Yr Schedules',
      icon: Layers,
      color: 'bg-blue-50 text-blue-700',
      link: '/dashboard/payment-plans',
    },
    {
      label: 'New Inquiries',
      value: newInquiries,
      sub: 'Awaiting Follow-up',
      icon: Inbox,
      color: 'bg-rose-50 text-rose-700',
      link: '/dashboard/inquiries',
    },
    {
      label: 'Site Appointments',
      value: pendingApts,
      sub: 'Scheduled Guided Tours',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-700',
      link: '/dashboard/appointments',
    },
    {
      label: 'Contact Messages',
      value: unreadMsgs,
      sub: 'Unread General Enquiries',
      icon: Mail,
      color: 'bg-teal-50 text-teal-700',
      link: '/dashboard/messages',
    },
  ];

  // Chart data
  const trendData = [
    { month: 'Jun', inquiries: 14, listings: 4 },
    { month: 'Jul', inquiries: 22, listings: 5 },
    { month: 'Aug', inquiries: 31, listings: 6 },
    { month: 'Sep', inquiries: 45, listings: 7 },
    { month: 'Oct', inquiries: 58, listings: 8 },
  ];

  const categoryDistribution = [
    { name: 'House / Villa', count: properties.filter((p) => p.category === 'House' || p.category === 'Villa').length },
    { name: 'Apartment', count: properties.filter((p) => p.category === 'Apartment').length + totalApartments },
    { name: 'Plot & Land', count: properties.filter((p) => p.category === 'Plot').length },
    { name: 'Commercial', count: properties.filter((p) => p.category === 'Commercial').length },
    { name: 'Cottages', count: properties.filter((p) => p.category === 'Cottage').length + 1 },
  ];

  const COLORS = ['#064E3B', '#D6A84F', '#047857', '#022C22', '#64748B'];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-2xl font-black text-[#022C22] tracking-tight uppercase">
            Platform Master Console
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time management for properties, signature projects, payment schedules, and inquiries.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard/properties"
            className="px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#022C22] transition-colors"
          >
            + Add Property
          </Link>
          <Link
            to="/dashboard/payment-plans"
            className="px-4 py-2 rounded-xl bg-[#F8F6EA] text-[#064E3B] border border-[#D6A84F]/40 text-xs font-bold uppercase tracking-wider hover:bg-[#ECFDF5] transition-colors"
          >
            Manage Plans
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              to={kpi.link}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#064E3B] transition-colors" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#102A24] font-heading mb-0.5">
                  {kpi.value}
                </div>
                <div className="text-xs font-bold text-[#022C22] uppercase tracking-wider">
                  {kpi.label}
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 truncate">{kpi.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-premium">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
                Inquiry & Visitor Activity Trends
              </h2>
              <p className="text-xs text-[#64748B]">Monthly investor engagements across all listings</p>
            </div>
            <span className="text-xs font-bold text-[#047857] bg-[#ECFDF5] px-3 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+34% Growth</span>
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A84F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D6A84F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#022C22',
                    borderColor: '#D6A84F',
                    color: '#FFF',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#D6A84F"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorInq)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-premium flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider mb-1">
              Asset Distribution
            </h2>
            <p className="text-xs text-[#64748B] mb-4">Inventory categorized by asset classes</p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-gray-100">
            {categoryDistribution.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-gray-700">{cat.name}</span>
                </div>
                <span className="text-[#022C22]">{cat.count} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Inquiries & Live Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
              Recent Lead Submissions
            </h2>
            <Link to="/dashboard/inquiries" className="text-xs font-bold text-[#064E3B] hover:text-[#D6A84F]">
              View All ({inquiries.length})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Client</th>
                  <th className="py-2.5 px-3">Item / Project</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#102A24]">{inq.name}</div>
                      <div className="text-[11px] text-[#64748B] font-mono">{inq.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-[#102A24] font-medium truncate max-w-[150px]">
                      {inq.itemTitle}
                    </td>
                    <td className="py-3 px-3 capitalize text-[#047857] font-semibold">
                      {inq.preferredContact}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'New'
                            ? 'bg-rose-100 text-rose-800'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity & Audit Logs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
              System Audit & Actions
            </h2>
            <Link to="/dashboard/security" className="text-xs font-bold text-[#064E3B] hover:text-[#D6A84F]">
              Audit Log
            </Link>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin">
            {auditLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="flex items-start space-x-3 text-xs border-b border-gray-100 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#102A24]">{log.action}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

