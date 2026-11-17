import { ApartmentPlan, Project } from '../types';
import { formatPKR } from './formatters';

export function printPaymentPlan(project: Project, apartment: ApartmentPlan) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print/download the official payment plan.');
    return;
  }

  const projectCity =
    project.id === 'proj-4' || project.slug === 'glamorous-heights'
      ? 'KALAM SWAT'
      : (project.city ? project.city.toUpperCase() : 'PESHAWAR');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${project.name.toUpperCase()} — ${projectCity} | ${apartment.title} Official Payment Plan</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
          color: #102A24;
          background: #FFFFFF;
          margin: 0;
          padding: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #D6A84F;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }
        .brand-title {
          font-size: 24px;
          font-weight: 800;
          color: #064E3B;
          letter-spacing: 1px;
        }
        .brand-sub {
          font-size: 12px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .banner {
          background: #064E3B;
          color: #FFFFFF;
          text-align: center;
          padding: 14px 16px;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 1.5px;
          border-radius: 6px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .sub-banner {
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          color: #B88628;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .apt-badge {
          background: #F8F6EA;
          border: 1px solid #D6A84F;
          padding: 8px 16px;
          display: inline-block;
          font-size: 16px;
          font-weight: 800;
          color: #064E3B;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .project-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
          background: #F8F6EA;
          padding: 16px;
          border-radius: 6px;
          border: 1px solid #E6D5B8;
        }
        .detail-item {
          font-size: 14px;
        }
        .detail-label {
          color: #64748B;
          font-weight: 600;
        }
        .detail-value {
          font-weight: 700;
          color: #022C22;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th {
          background: #022C22;
          color: #FFFFFF;
          padding: 12px 16px;
          text-align: left;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #E5E7EB;
          font-size: 14px;
        }
        .tr-total {
          background: #ECFDF5;
          font-weight: 800;
          font-size: 16px;
          color: #064E3B;
          border-top: 2px solid #064E3B;
          border-bottom: 2px solid #064E3B;
        }
        .section-title {
          font-size: 14px;
          font-weight: 800;
          color: #022C22;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 12px 0;
          padding-bottom: 6px;
          border-bottom: 1px solid #E5E7EB;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .benefit-chip {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #064E3B;
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .benefit-chip::before {
          content: '✔';
          color: #047857;
          margin-right: 8px;
          font-weight: bold;
        }
        .footer {
          border-top: 1px solid #E5E7EB;
          padding-top: 16px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #64748B;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="background: #064E3B; color: #fff; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">Print / Save as PDF</button>
      </div>

      <div class="header">
        <div>
          <div class="brand-title">PESHAWER REAL ESTATE</div>
          <div class="brand-sub">Premium Real Estate & Signature Developments</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: #64748B;">Date Issued</div>
          <div style="font-weight: 700; color: #022C22;">${new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div class="banner">${project.name.toUpperCase()} — ${projectCity}</div>
      <div class="sub-banner">Official Payment Plan Details</div>

      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px;">
        <div class="apt-badge">${apartment.title.toUpperCase()}</div>
        <div style="font-size: 15px; font-weight: 800; color: #064E3B;">
          Apartment Size: <span style="color: #022C22;">${apartment.sizeSqFt} sq ft</span>
        </div>
      </div>

      <div class="project-details">
        <div class="detail-item">
          <span class="detail-label">Project:</span>
          <span class="detail-value">${project.name}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${project.location}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Approval Authority:</span>
          <span class="detail-value">${project.verifiedApproval || 'TMA Approved Project'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Floor Range:</span>
          <span class="detail-value">${apartment.floor || 'Executive Floors'}</span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 55%;">Payment Details</th>
            <th style="width: 45%; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Price</td>
            <td style="text-align: right; font-weight: 700;">${formatPKR(apartment.totalPricePKR)}</td>
          </tr>
          <tr>
            <td>Booking</td>
            <td style="text-align: right; font-weight: 700;">${formatPKR(apartment.bookingAmountPKR)}</td>
          </tr>
          <tr>
            <td>Monthly Installments</td>
            <td style="text-align: right; font-weight: 600;">${formatPKR(apartment.monthlyInstallmentPKR)} × ${apartment.monthlyCount} months</td>
          </tr>
          <tr>
            <td>Monthly Installments Total</td>
            <td style="text-align: right; font-weight: 700;">${formatPKR(apartment.monthlyTotalPKR)}</td>
          </tr>
          <tr>
            <td>Half-Yearly Installments</td>
            <td style="text-align: right; font-weight: 600;">${formatPKR(apartment.halfYearlyInstallmentPKR)} × ${apartment.halfYearlyCount}</td>
          </tr>
          <tr>
            <td>Half-Yearly Installments Total</td>
            <td style="text-align: right; font-weight: 700;">${formatPKR(apartment.halfYearlyTotalPKR)}</td>
          </tr>
          <tr>
            <td>Final Payment / Possession</td>
            <td style="text-align: right; font-weight: 700;">${formatPKR(apartment.possessionPaymentPKR)}</td>
          </tr>
          <tr class="tr-total">
            <td style="font-weight: 800; font-size: 15px;">TOTAL AMOUNT</td>
            <td style="text-align: right; font-weight: 800; font-size: 16px; color: #064E3B;">${formatPKR(apartment.totalPricePKR)}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">PROJECT BENEFITS DISPLAYED IN THE REFERENCE</div>
      <div class="benefits-grid">
        ${apartment.benefits.map((b) => `<div class="benefit-chip">${b}</div>`).join('')}
      </div>

      <div class="footer">
        <div>PESHAWARS REAL ESTATE • Head Office: Main University Road, Peshawar</div>
        <div>UAN: 03117000900 • info@peshawars.com</div>
      </div>

      <script>
        window.onload = function() {
          // Autocall print after load
          // window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

