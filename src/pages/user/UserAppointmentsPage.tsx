import React from 'react';
import { Calendar, Clock, MapPin, Phone, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { Link } from 'react-router-dom';
import { UserAppointment } from '../../types/user';

type AptStatus = UserAppointment['status'];

const statusConfig: Record<AptStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  Pending: { label: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-50', icon: <AlertCircle className="w-3.5 h-3.5" /> },
  Confirmed: { label: 'Confirmed', color: 'text-green-700', bg: 'bg-green-50', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  Rescheduled: { label: 'Rescheduled', color: 'text-blue-700', bg: 'bg-blue-50', icon: <Clock className="w-3.5 h-3.5" /> },
  Completed: { label: 'Completed', color: 'text-gray-700', bg: 'bg-gray-100', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  Cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-50', icon: <X className="w-3.5 h-3.5" /> },
};

export const UserAppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment } = useUserAuth();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">My Appointments</h1>
        <p className="text-[#64748B] mt-1">Manage your property visit requests</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#022C22] mb-2">No appointments yet</h3>
          <p className="text-[#64748B] mb-6">Book a site visit to explore properties in person.</p>
          <Link
            to="/properties"
            className="inline-flex items-center px-6 py-3 bg-[#064E3B] text-white rounded-xl font-semibold hover:bg-[#047857] transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const st = statusConfig[apt.status] || statusConfig.Pending;
            return (
              <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg} ${st.color}`}>
                        {st.icon}
                        {st.label}
                      </span>
                      <span className="text-xs text-[#64748B] bg-gray-100 px-2 py-0.5 rounded-full">{apt.type}</span>
                    </div>
                    <h3 className="font-semibold text-[#022C22] text-base mb-2">{apt.propertyOrProjectTitle}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#047857]" />
                        {apt.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#047857]" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#047857]" />
                        {apt.time}
                      </span>
                      {apt.contactPhone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-[#047857]" />
                          {apt.contactPhone}
                        </span>
                      )}
                    </div>
                    {apt.message && (
                      <p className="mt-2 text-xs text-[#64748B] bg-[#F8F6EA] rounded-lg px-3 py-2 italic">
                        "{apt.message}"
                      </p>
                    )}
                  </div>
                  {apt.status === 'Pending' && (
                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="flex-shrink-0 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserAppointmentsPage;
