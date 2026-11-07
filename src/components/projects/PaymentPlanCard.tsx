import React from 'react';
import { Check, Download, Send, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { ApartmentPlan, Project } from '../../types';
import { formatPKR, validatePaymentTotals } from '../../utils/formatters';
import { printPaymentPlan } from '../../utils/pdfGenerator';
import { getApartmentWhatsAppUrl } from '../../utils/whatsapp';

interface PaymentPlanCardProps {
  project: Project;
  apartment: ApartmentPlan;
  onInquire: (apartment: ApartmentPlan) => void;
}

export const PaymentPlanCard: React.FC<PaymentPlanCardProps> = ({
  project,
  apartment,
  onInquire,
}) => {
  // Validate totals in real-time
  const validation = validatePaymentTotals(
    apartment.bookingAmountPKR,
    apartment.monthlyInstallmentPKR,
    apartment.monthlyCount,
    apartment.halfYearlyInstallmentPKR,
    apartment.halfYearlyCount,
    apartment.possessionPaymentPKR,
    apartment.totalPricePKR
  );

  return (
    <div className="bg-[#002D1C] rounded-3xl overflow-hidden border border-[#E6AA27]/30 shadow-2xl hover:border-[#E6AA27]/60 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner: PAYMENT PLAN */}
      <div>
        <div className="bg-[#002417] text-white text-center py-4 px-6 border-b-2 border-[#FFC83D] relative">
          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FFC83D] mb-0.5">
            {project.name.toUpperCase()}
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-extrabold tracking-wider uppercase text-white">
            PAYMENT PLAN
          </h3>
        </div>

        {/* Apartment Type Header */}
        <div className="p-6 pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-md bg-[#003D25] text-[#FFC83D] font-heading font-extrabold text-xs uppercase tracking-wider border border-[#FFC83D]/40 mb-1">
                {apartment.title}
              </span>
              <div className="text-xs text-[#E8F3EC]/70 font-semibold">
                Area: <strong className="text-white">{apartment.sizeSqFt} Sq Ft</strong>
                {apartment.floor && ` • ${apartment.floor}`}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#E8F3EC]/70 block">Total Price</span>
              <span className="font-heading text-xl sm:text-2xl font-black text-[#FFC83D] tracking-tight">
                {formatPKR(apartment.totalPricePKR)}
              </span>
            </div>
          </div>

          {/* Validation Notice if any mismatch */}
          {!validation.isValid && (
            <div className="mb-4 p-2.5 bg-amber-900/30 border border-amber-400 text-amber-200 text-xs rounded-xl flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Calculated: {formatPKR(validation.calculatedTotal)} (Difference: {formatPKR(validation.difference)})</span>
            </div>
          )}

          {/* Emerald Payment Information Card with Numbered Circles */}
          <div className="bg-[#003D25]/90 rounded-2xl p-5 border border-[#E6AA27]/25 shadow-sm space-y-4">
            {/* Step 1: Booking */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#FFC83D] text-[#002D1C] flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    Booking Amount
                  </div>
                  <div className="text-[11px] text-[#E8F3EC]/70">Initial reservation deposit</div>
                </div>
              </div>
              <div className="font-heading font-extrabold text-sm text-[#FFC83D]">
                {formatPKR(apartment.bookingAmountPKR)}
              </div>
            </div>

            {/* Step 2: Monthly Installments */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#FFC83D] text-[#002D1C] flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    Monthly Installments
                  </div>
                  <div className="text-[11px] text-[#E8F3EC]/70">
                    {formatPKR(apartment.monthlyInstallmentPKR)} × {apartment.monthlyCount} Months
                  </div>
                </div>
              </div>
              <div className="font-heading font-extrabold text-sm text-[#FFC83D]">
                {formatPKR(apartment.monthlyTotalPKR)}
              </div>
            </div>

            {/* Step 3: Half-Yearly Installments */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#FFC83D] text-[#002D1C] flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    Half-Yearly Installments
                  </div>
                  <div className="text-[11px] text-[#E8F3EC]/70">
                    {formatPKR(apartment.halfYearlyInstallmentPKR)} × {apartment.halfYearlyCount} Payments
                  </div>
                </div>
              </div>
              <div className="font-heading font-extrabold text-sm text-[#FFC83D]">
                {formatPKR(apartment.halfYearlyTotalPKR)}
              </div>
            </div>

            {/* Step 4: Final Payment on Possession */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#FFC83D] text-[#002D1C] flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    On Possession
                  </div>
                  <div className="text-[11px] text-[#E8F3EC]/70">Keys and handover milestone</div>
                </div>
              </div>
              <div className="font-heading font-extrabold text-sm text-[#FFC83D]">
                {formatPKR(apartment.possessionPaymentPKR)}
              </div>
            </div>
          </div>

          {/* Large Gold / Emerald Total Amount Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-[#004B2E] border border-[#E6AA27]/30 text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#FFC83D] font-bold block">
                Total Package Price
              </span>
              <span className="text-xs text-[#E8F3EC]/80 font-medium">5-Year Easy Plan</span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-black text-[#FFC83D]">
              {formatPKR(apartment.totalPricePKR)}
            </div>
          </div>

          {/* Key Advantages Checklist */}
          {apartment.benefits && apartment.benefits.length > 0 && (
            <div className="mt-5 space-y-2">
              {apartment.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs font-medium text-[#E8F3EC]">
                  <div className="w-4 h-4 rounded-full bg-[#003D25] border border-[#FFC83D]/40 text-[#FFC83D] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-3 border-t border-[#E6AA27]/20 bg-[#002417] space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => printPaymentPlan(project, apartment)}
            className="py-2.5 px-3 rounded-xl bg-[#003D25] hover:bg-[#004B2E] border border-[#E6AA27]/30 text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#FFC83D]" />
            <span>PDF Plan</span>
          </button>

          <button
            type="button"
            onClick={() => onInquire(apartment)}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E6AA27] to-[#FFC83D] hover:from-[#FFC83D] hover:to-[#E6AA27] text-[#002D1C] text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </button>
        </div>

        {/* Dedicated WhatsApp Plan Inquiry Button */}
        <a
          href={getApartmentWhatsAppUrl(project, apartment)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-sm"
        >
          <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current">
            <path d="M16.002 0.05c-8.815 0-15.952 7.14-15.952 15.955 0 2.822 0.738 5.568 2.14 7.994l-2.274 8.307 8.525-2.235c2.348 1.28 4.996 1.954 7.558 1.954 8.818 0 15.955-7.14 15.955-15.955s-7.137-15.92-15.952-15.92zM16.002 29.35c-2.392 0-4.737-0.644-6.787-1.862l-0.487-0.288-5.048 1.323 1.347-4.921-0.316-0.503c-1.339-2.13-2.046-4.606-2.046-7.144 0-7.319 5.955-13.275 13.278-13.275 3.548 0 6.883 1.383 9.387 3.89 2.508 2.508 3.89 5.845 3.89 9.39 0 7.322-5.957 13.28-13.284 13.28zM23.277 19.344c-0.398-0.2-2.358-1.163-2.723-1.296s-0.631-0.2-0.897 0.2c-0.266 0.398-1.031 1.296-1.263 1.562s-0.465 0.299-0.864 0.1c-0.398-0.2-1.683-0.62-3.204-1.977-1.184-1.055-1.984-2.358-2.217-2.757s-0.025-0.615 0.174-0.814c0.18-.179 0.398-0.465 0.598-0.697s0.266-0.398 0.398-0.665c0.133-0.266 0.066-0.498-0.033-0.697s-0.897-2.16-1.23-2.957c-0.324-0.776-0.653-0.67-0.897-0.683-0.232-0.012-0.498-0.015-0.764-0.015s-0.697 0.1-1.063 0.498c-0.365 0.398-1.395 1.362-1.395 3.322s1.428 3.854 1.628 4.12c0.2 0.266 2.81 4.29 6.808 6.015 0.951 0.411 1.693 0.656 2.272 0.84 0.955 0.304 1.825 0.261 2.512 0.158 0.766-0.114 2.358-0.963 2.69-1.894s0.332-1.727 0.232-1.894c-0.099-0.165-0.365-0.264-0.764-0.464z" />
          </svg>
          <span>WhatsApp Inquiry</span>
        </a>
      </div>
    </div>
  );
};

