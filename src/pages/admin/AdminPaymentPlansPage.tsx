import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ApartmentPlan } from '../../types';
import { formatPKR, validatePaymentTotals } from '../../utils/formatters';
import { printPaymentPlan } from '../../utils/pdfGenerator';
import {
  FileSpreadsheet,
  Plus,
  Edit2,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';

export const AdminPaymentPlansPage: React.FC = () => {
  const { projects, addApartmentToProject, updateApartment, deleteApartment } = useData();

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAptId, setEditingAptId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('Executive Apartment');
  const [sizeSqFt, setSizeSqFt] = useState(500);
  const [totalPricePKR, setTotalPricePKR] = useState(5000000);
  const [bookingAmountPKR, setBookingAmountPKR] = useState(200000);
  const [monthlyInstallmentPKR, setMonthlyInstallmentPKR] = useState(40000);
  const [monthlyCount, setMonthlyCount] = useState(60);
  const [halfYearlyInstallmentPKR, setHalfYearlyInstallmentPKR] = useState(90000);
  const [halfYearlyCount, setHalfYearlyCount] = useState(10);
  const [possessionPaymentPKR, setPossessionPaymentPKR] = useState(1500000);
  const [floor, setFloor] = useState('2nd - 6th Floor');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const validation = validatePaymentTotals(
    bookingAmountPKR,
    monthlyInstallmentPKR,
    monthlyCount,
    halfYearlyInstallmentPKR,
    halfYearlyCount,
    possessionPaymentPKR,
    totalPricePKR
  );

  const openAddModal = () => {
    setEditingAptId(null);
    setTitle('Executive Suite');
    setSizeSqFt(500);
    setTotalPricePKR(5000000);
    setBookingAmountPKR(200000);
    setMonthlyInstallmentPKR(40000);
    setMonthlyCount(60);
    setHalfYearlyInstallmentPKR(90000);
    setHalfYearlyCount(10);
    setPossessionPaymentPKR(1500000);
    setFloor('2nd - 6th Floor');
    setBedrooms(1);
    setBathrooms(1);
    setModalOpen(true);
  };

  const openEditModal = (apt: ApartmentPlan) => {
    setEditingAptId(apt.id);
    setTitle(apt.title);
    setSizeSqFt(apt.sizeSqFt);
    setTotalPricePKR(apt.totalPricePKR);
    setBookingAmountPKR(apt.bookingAmountPKR);
    setMonthlyInstallmentPKR(apt.monthlyInstallmentPKR);
    setMonthlyCount(apt.monthlyCount);
    setHalfYearlyInstallmentPKR(apt.halfYearlyInstallmentPKR);
    setHalfYearlyCount(apt.halfYearlyCount);
    setPossessionPaymentPKR(apt.possessionPaymentPKR);
    setFloor(apt.floor || '');
    setBedrooms(apt.bedrooms);
    setBathrooms(apt.bathrooms);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const monthlyTotal = monthlyInstallmentPKR * monthlyCount;
    const halfYearlyTotal = halfYearlyInstallmentPKR * halfYearlyCount;
    const calculated = bookingAmountPKR + monthlyTotal + halfYearlyTotal + possessionPaymentPKR;
    const match = calculated === totalPricePKR;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingAptId) {
      updateApartment(currentProject.id, editingAptId, {
        title,
        slug,
        sizeSqFt: Number(sizeSqFt),
        totalPricePKR: Number(totalPricePKR),
        bookingAmountPKR: Number(bookingAmountPKR),
        monthlyInstallmentPKR: Number(monthlyInstallmentPKR),
        monthlyCount: Number(monthlyCount),
        monthlyTotalPKR: monthlyTotal,
        halfYearlyInstallmentPKR: Number(halfYearlyInstallmentPKR),
        halfYearlyCount: Number(halfYearlyCount),
        halfYearlyTotalPKR: halfYearlyTotal,
        possessionPaymentPKR: Number(possessionPaymentPKR),
        verifiedTotalsMatch: match,
        floor,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
      });
    } else {
      addApartmentToProject(currentProject.id, {
        title,
        slug,
        sizeSqFt: Number(sizeSqFt),
        totalPricePKR: Number(totalPricePKR),
        bookingAmountPKR: Number(bookingAmountPKR),
        monthlyInstallmentPKR: Number(monthlyInstallmentPKR),
        monthlyCount: Number(monthlyCount),
        monthlyTotalPKR: monthlyTotal,
        halfYearlyInstallmentPKR: Number(halfYearlyInstallmentPKR),
        halfYearlyCount: Number(halfYearlyCount),
        halfYearlyTotalPKR: halfYearlyTotal,
        possessionPaymentPKR: Number(possessionPaymentPKR),
        verifiedTotalsMatch: match,
        floor,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        featuredImage: '/assets/projects/glamorous-heights/interior/interior-1.jpg',
        benefits: [
          '5-Year Easy Installments',
          'TMA Approved Project',
          'Prime Location',
          'High Rental Yield',
        ],
        interiorGallery: [],
        exteriorGallery: [],
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            5-Year Payment Plans & Financing
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage apartment configurations, booking milestones, monthly/half-yearly tranches, and validate totals.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm hover:bg-[#022C22] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Plan</span>
        </button>
      </div>

      {/* Project Selector Bar */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        {projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setSelectedProjectId(proj.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
              proj.id === currentProject.id
                ? 'bg-[#064E3B] text-white shadow'
                : 'text-[#64748B] hover:text-[#064E3B] hover:bg-[#F8F6EA]'
            }`}
          >
            {proj.name} ({proj.apartments?.length || 0})
          </button>
        ))}
      </div>

      {/* Plans List Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-[#D6A84F]" />
            <h2 className="font-heading text-base font-bold text-[#022C22] uppercase tracking-wider">
              {currentProject.name} — Configured Payment Schedules
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F6EA] text-[#64748B] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Apartment Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Booking</th>
                <th className="py-3 px-4">Monthly Tranche</th>
                <th className="py-3 px-4">Half-Yearly</th>
                <th className="py-3 px-4">Possession</th>
                <th className="py-3 px-4 text-center">Totals Valid</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentProject.apartments?.map((apt) => {
                const check = validatePaymentTotals(
                  apt.bookingAmountPKR,
                  apt.monthlyInstallmentPKR,
                  apt.monthlyCount,
                  apt.halfYearlyInstallmentPKR,
                  apt.halfYearlyCount,
                  apt.possessionPaymentPKR,
                  apt.totalPricePKR
                );

                return (
                  <tr key={apt.id} className="hover:bg-gray-50/80">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#102A24]">{apt.title}</div>
                      <div className="text-[11px] text-[#64748B]">{apt.floor || 'Standard Floor'}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#022C22]">
                      {apt.sizeSqFt} Sq Ft
                    </td>
                    <td className="py-4 px-4 font-black text-[#064E3B] whitespace-nowrap">
                      {formatPKR(apt.totalPricePKR)}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">
                      {formatPKR(apt.bookingAmountPKR)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div>{formatPKR(apt.monthlyInstallmentPKR)}/mo</div>
                      <div className="text-[10px] text-gray-400">({apt.monthlyCount} Months)</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div>{formatPKR(apt.halfYearlyInstallmentPKR)}</div>
                      <div className="text-[10px] text-gray-400">({apt.halfYearlyCount} Payments)</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">
                      {formatPKR(apt.possessionPaymentPKR)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {check.isValid ? (
                        <span className="inline-flex items-center text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          <span>100% Match</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          <span>Diff: {formatPKR(check.difference)}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => printPaymentPlan(currentProject, apt)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#064E3B] hover:bg-gray-100"
                          title="Generate / Print PDF"
                        >
                          <Download className="w-4 h-4 text-[#D6A84F]" />
                        </button>
                        <button
                          onClick={() => openEditModal(apt)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#064E3B] hover:bg-gray-100"
                          title="Edit Plan"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove plan: "${apt.title}"?`)) {
                              deleteApartment(currentProject.id, apt.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">
                {editingAptId ? 'Edit Payment Plan' : 'Add New Payment Plan'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Apartment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Studio Apartment"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Size in Sq Ft
                  </label>
                  <input
                    type="number"
                    value={sizeSqFt}
                    onChange={(e) => setSizeSqFt(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Total Package Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={totalPricePKR}
                    onChange={(e) => setTotalPricePKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-[#064E3B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Booking Amount (PKR)
                  </label>
                  <input
                    type="number"
                    value={bookingAmountPKR}
                    onChange={(e) => setBookingAmountPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Final Possession Amount (PKR)
                  </label>
                  <input
                    type="number"
                    value={possessionPaymentPKR}
                    onChange={(e) => setPossessionPaymentPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Monthly Installment (PKR)
                  </label>
                  <input
                    type="number"
                    value={monthlyInstallmentPKR}
                    onChange={(e) => setMonthlyInstallmentPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Number of Months
                  </label>
                  <input
                    type="number"
                    value={monthlyCount}
                    onChange={(e) => setMonthlyCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Half-Yearly Installment (PKR)
                  </label>
                  <input
                    type="number"
                    value={halfYearlyInstallmentPKR}
                    onChange={(e) => setHalfYearlyInstallmentPKR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Half-Yearly Count
                  </label>
                  <input
                    type="number"
                    value={halfYearlyCount}
                    onChange={(e) => setHalfYearlyCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              </div>

              {/* Live validation summary */}
              <div
                className={`p-3.5 rounded-xl border text-xs ${
                  validation.isValid
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Calculated Total: {formatPKR(validation.calculatedTotal)}</span>
                  <span>Target: {formatPKR(totalPricePKR)}</span>
                </div>
                {!validation.isValid && (
                  <div className="text-[11px] mt-1 font-semibold">
                    Difference: {formatPKR(validation.difference)}. Please adjust monthly or possession tranches to balance.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Save Payment Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

