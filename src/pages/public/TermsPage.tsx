import React from 'react';
import { PageHero } from '../../components/common/PageHero';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#002D1C] text-white min-h-screen">
      {/* Unique subtle architectural background for Terms and Conditions */}
      <PageHero
        title="Terms and Conditions"
        subtitle="Standard advisory terms governing reservations, schedules, and property documentation."
        image="/assets/projects/corner-apartments-kalam/hero.png"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-sm text-[#E8F3EC]/80 leading-relaxed space-y-6">
        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
          1. Digital Presentation & <span className="text-[#FFC83D]">Pricing</span>
        </h2>
        <p>
          Information published on PESHAWER REAL ESTATE reflects verified development specifications,
          TMA approved master plans, and official installment structures provided by project
          sponsors. All figures are presented in Pakistani Rupees (PKR).
        </p>

        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
          2. Installment Plans & <span className="text-[#FFC83D]">Booking</span>
        </h2>
        <p>
          Payment schedules, including those for Glamorous Heights, Town Garden, Kalam Cottages, and
          Corner Apartments Kalam, represent official developer milestone schedules. Final legal binding
          agreements are executed upon formal submission of the allotment application and clearance of the
          booking token.
        </p>

        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
          3. Architectural Walkthroughs & <span className="text-[#FFC83D]">Media</span>
        </h2>
        <p>
          Renders, photographs, and the Town Garden dedicated video are the intellectual property of
          PESHAWER REAL ESTATE and respective project partners. Unauthorized reproduction or scraping of
          architectural assets is strictly prohibited.
        </p>

        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
          4. <span className="text-[#FFC83D]">Jurisdiction</span>
        </h2>
        <p>
          Any disputes arising out of property transactions or platform advisory shall be subject to the
          exclusive jurisdiction of the courts of Peshawar, Khyber Pakhtunkhwa, Pakistan.
        </p>
      </div>
    </div>
  );
};

