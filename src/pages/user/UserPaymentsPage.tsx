import React from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { UserPaymentRecord } from '../../types/user';

type PayStatus = UserPaymentRecord['status'];

const statusConfig: Record<PayStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  'Verified': { label: 'Verified', color: 'text-green-700', bg: 'bg-green-50', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  'Pending Clearance': { label: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-50', icon: <Clock className="w-3.5 h-3.5" /> },
  'Overdue': { label: 'Overdue', color: 'text-red-700', bg: 'bg-red-50', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
};

export const UserPaymentsPage: React.FC = () => {
  const { paymentRecords } = useUserAuth();

  const formatPKR = (n: number) => 'PKR ' + n.toLocaleString('en-PK');

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Payment History</h1>
        <p className="text-[#64748B] mt-1">Track your property payment records</p>
      </div>

      {paymentRecords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h3 className="text-lg font-semibold text-[#022C22] mb-2">No payment records</h3>
          <p className="text-[#64748B]">Your payment history will appear here.</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Paid', value: formatPKR(paymentRecords.filter(p => p.status === 'Verified').reduce((s, p) => s + p.amountPKR, 0)), color: 'text-green-700' },
              { label: 'Pending', value: formatPKR(paymentRecords.filter(p => p.status === 'Pending Clearance').reduce((s, p) => s + p.amountPKR, 0)), color: 'text-yellow-700' },
              { label: 'Overdue', value: formatPKR(paymentRecords.filter(p => p.status === 'Overdue').reduce((s, p) => s + p.amountPKR, 0)), color: 'text-red-700' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs text-[#64748B] font-medium mb-1">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8F6EA] border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Reference</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Property</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Type</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Amount</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Date</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#022C22] uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paymentRecords.map((rec) => {
                    const st = statusConfig[rec.status] || statusConfig['Pending Clearance'];
                    return (
                      <tr key={rec.id} className="hover:bg-[#F8F6EA]/50 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-[#64748B]">{rec.referenceNumber}</td>
                        <td className="px-5 py-4 font-medium text-[#022C22] text-xs">{rec.propertyOrProjectTitle}</td>
                        <td className="px-5 py-4 text-xs text-[#64748B]">{rec.installmentType}</td>
                        <td className="px-5 py-4 font-bold text-[#047857] text-xs">{formatPKR(rec.amountPKR)}</td>
                        <td className="px-5 py-4 text-xs text-[#64748B]">
                          {new Date(rec.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg} ${st.color}`}>
                            {st.icon} {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPaymentsPage;
