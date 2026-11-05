import React from 'react';
import { PageHero } from '../../components/common/PageHero';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Unique subtle architectural background for Privacy Policy */}
      <PageHero
        title="Privacy Policy"
        subtitle="Transparent data principles safeguarding client personal inquiries and property registrations."
        image="/assets/projects/town-garden/hero.png"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-sm text-[#64748B] leading-relaxed space-y-6">
        <h2 className="font-heading text-xl font-bold text-[#022C22] uppercase">
          1. Data Collection & Property Inquiries
        </h2>
        <p>
          PESHAWER REAL ESTATE respects your privacy. When you submit inquiries, book site
          appointments, or download official payment schedules through our digital platform, we
          collect necessary contact information including your full name, telephone / WhatsApp number,
          email address, and specific property interests.
        </p>

        <h2 className="font-heading text-xl font-bold text-[#022C22] uppercase">
          2. Use of Information
        </h2>
        <p>
          Your information is solely used to coordinate official property viewings, furnish verified
          installment documentation, and facilitate regulatory transfers. We never sell, rent, or trade
          client contact information to third-party telemarketers or external entities.
        </p>

        <h2 className="font-heading text-xl font-bold text-[#022C22] uppercase">
          3. Security & Admin Storage
        </h2>
        <p>
          All submitted inquiries and site visit records are securely maintained in our centralized
          administrative database, accessible strictly by authorized real estate advisors.
        </p>

        <h2 className="font-heading text-xl font-bold text-[#022C22] uppercase">
          4. Contact Details
        </h2>
        <p>
          For questions regarding your stored information or to request removal from our notification
          list, please reach us directly at info@peshawerrealestate.com.
        </p>
      </div>
    </div>
  );
};

