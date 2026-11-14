import{a as e}from"./formatters-Dp3nPmN3.js";function d(i,t){const o=window.open("","_blank");if(!o){alert("Please allow popups to print/download the official payment plan.");return}const n=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${i.name} - ${t.title} Official Payment Schedule</title>
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
          margin-bottom: 24px;
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
          padding: 12px;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        .apt-badge {
          background: #F8F6EA;
          border: 1px solid #D6A84F;
          padding: 8px 16px;
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
          color: #B88628;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .project-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
          background: #F8F6EA;
          padding: 16px;
          border-radius: 6px;
        }
        .detail-item {
          font-size: 14px;
        }
        .detail-label {
          color: #64748B;
          font-weight: 500;
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
          padding: 10px 14px;
          text-align: left;
          font-size: 13px;
          text-transform: uppercase;
        }
        td {
          padding: 12px 14px;
          border-bottom: 1px solid #E5E7EB;
          font-size: 14px;
        }
        .tr-total {
          background: #ECFDF5;
          font-weight: 800;
          font-size: 16px;
          color: #064E3B;
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
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
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
        <button onclick="window.print()" style="background: #064E3B; color: #fff; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px;">Print / Save as PDF</button>
      </div>

      <div class="header">
        <div>
          <div class="brand-title">PESHAWER REAL ESTATE</div>
          <div class="brand-sub">Premium Real Estate & Signature Developments</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: #64748B;">Date Issued</div>
          <div style="font-weight: 700; color: #022C22;">${new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})}</div>
        </div>
      </div>

      <div class="banner">OFFICIAL PAYMENT PLAN SCHEDULE</div>

      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <div class="apt-badge">${t.title.toUpperCase()}</div>
        <div style="font-size: 14px; font-weight: 700; color: #064E3B;">Area: ${t.sizeSqFt} SQ FT</div>
      </div>

      <div class="project-details">
        <div class="detail-item">
          <span class="detail-label">Project:</span>
          <span class="detail-value">${i.name}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${i.location}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Approval Authority:</span>
          <span class="detail-value">${i.verifiedApproval||"TMA Approved"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Floor Range:</span>
          <span class="detail-value">${t.floor||"Executive Floors"}</span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Milestone / Payment Tranche</th>
            <th>Duration / Frequency</th>
            <th style="text-align: right;">Amount (PKR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Booking / Down Payment</strong></td>
            <td>At Time of Reservation</td>
            <td style="text-align: right; font-weight: 700;">${e(t.bookingAmountPKR)}</td>
          </tr>
          <tr>
            <td><strong>2. Monthly Installments</strong></td>
            <td>${t.monthlyCount} Months @ ${e(t.monthlyInstallmentPKR)}/mo</td>
            <td style="text-align: right; font-weight: 700;">${e(t.monthlyTotalPKR)}</td>
          </tr>
          <tr>
            <td><strong>3. Half-Yearly Installments</strong></td>
            <td>${t.halfYearlyCount} Installments @ ${e(t.halfYearlyInstallmentPKR)}</td>
            <td style="text-align: right; font-weight: 700;">${e(t.halfYearlyTotalPKR)}</td>
          </tr>
          <tr>
            <td><strong>4. Final Payment on Possession</strong></td>
            <td>Upon Keys & Unit Handover</td>
            <td style="text-align: right; font-weight: 700;">${e(t.possessionPaymentPKR)}</td>
          </tr>
          <tr class="tr-total">
            <td colspan="2">TOTAL PACKAGE AMOUNT</td>
            <td style="text-align: right; color: #064E3B;">${e(t.totalPricePKR)}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin: 0 0 10px 0; color: #022C22;">Key Project Advantages:</h4>
      <div class="benefits-grid">
        ${t.benefits.map(a=>`<div class="benefit-chip">${a}</div>`).join("")}
      </div>

      <div class="footer">
        <div>PESHAWARS REAL ESTATE • Head Office: Main University Road, Peshawar</div>
        <div>UAN: +92 91 5842100 • info@peshawars.com</div>
      </div>

      <script>
        window.onload = function() {
          // Autocall print after load
          // window.print();
        }
      <\/script>
    </body>
    </html>
  `;o.document.open(),o.document.write(n),o.document.close()}export{d as p};
