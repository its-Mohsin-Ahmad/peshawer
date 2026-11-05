import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Inquiry, Appointment, ContactMessage } from '../../types';
import {
  Inbox,
  Calendar,
  Mail,
  Search,
  CheckCircle2,
  Phone,
  Trash2,
  Clock,
  Filter,
} from 'lucide-react';

interface AdminInquiriesPageProps {
  initialTab?: 'inquiries' | 'appointments' | 'messages';
}

export const AdminInquiriesPage: React.FC<AdminInquiriesPageProps> = ({ initialTab = 'inquiries' }) => {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    appointments,
    updateAppointmentStatus,
    messages,
    markMessageAsRead,
  } = useData();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'appointments' | 'messages'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'All' && inq.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.itemTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Inquiries & Communications
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Monitor client lead submissions, scheduled site inspections, and direct contact messages.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-1.5 bg-[#F8F6EA] p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'inquiries'
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#064E3B]'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'appointments'
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#064E3B]'
            }`}
          >
            Site Visits ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'messages'
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#064E3B]'
            }`}
          >
            Messages ({messages.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads by name, phone..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Interest Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50/80">
                    <td className="py-4 px-4 font-bold text-[#102A24]">
                      {inq.name}
                      <div className="text-[10px] text-gray-400 font-normal">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-mono text-[#064E3B] font-semibold">{inq.phone}</div>
                      <div className="text-[11px] text-gray-500">{inq.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#F8F6EA] text-[#064E3B] font-bold text-[10px] uppercase">
                        {inq.itemType}
                      </span>
                      <div className="font-semibold text-gray-800 mt-0.5">{inq.itemTitle}</div>
                    </td>
                    <td className="py-4 px-4 text-[#64748B] max-w-xs truncate">
                      {inq.message}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as Inquiry['status'])}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${
                          inq.status === 'New'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : inq.status === 'Qualified'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Appointments */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Project Requested</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/80">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#102A24]">{apt.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{apt.phone}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#064E3B]">
                      {apt.projectName}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-gray-800">{apt.preferredDate}</div>
                      <div className="text-[11px] text-gray-500">{apt.preferredTime}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {apt.notes || 'No special requirements.'}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as Appointment['status'])}
                        className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Contact Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-3xl border transition-all ${
                msg.read
                  ? 'bg-white border-gray-100'
                  : 'bg-[#ECFDF5]/50 border-[#047857]/30 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#064E3B] text-[#D6A84F] flex items-center justify-center font-bold text-xs">
                    {msg.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#102A24]">{msg.fullName}</div>
                    <div className="text-xs text-gray-500">
                      {msg.email} • {msg.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  {!msg.read && (
                    <button
                      onClick={() => markMessageAsRead(msg.id)}
                      className="text-xs font-bold text-[#047857] hover:underline"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>

              <div className="font-bold text-xs uppercase text-[#022C22] mb-1">
                Subject: {msg.subject}
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

