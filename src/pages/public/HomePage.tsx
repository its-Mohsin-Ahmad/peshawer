import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { SeoHead } from '../../components/common/SeoHead';
import { buildHomeFaqSchema, buildOrganizationAndWebsiteSchema } from '../../seo/seoConfig';
import { HeroSection } from '../../components/home/HeroSection';
import { SignatureProjects } from '../../components/home/SignatureProjects';
import { ProjectsProgressingSection } from '../../components/home/ProjectsProgressingSection';
import { PopularLocations } from '../../components/home/PopularLocations';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowItWorks } from '../../components/home/HowItWorks';
import { StatsSection } from '../../components/home/StatsSection';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { BlogSection } from '../../components/home/BlogSection';
import { NewsletterSection } from '../../components/home/NewsletterSection';

interface OutletContextType {
  onOpenInquiry?: (title?: string, id?: string) => void;
  onOpenAppointment?: (projectName?: string) => void;
}

export const HomePage: React.FC = () => {
  const context = useOutletContext<OutletContextType>();

  return (
    <div className="flex flex-col">
      <SeoHead
        title="Peshawars.com | PESHAWER REAL ESTATE — Buy, Sell & Invest in Peshawar & Kalam"
        description="PESHAWER REAL ESTATE (Peshawars.com) — Verified houses, luxury villas, DHA Peshawar plots, and TMA-approved projects in University Town Peshawar & Kalam Swat with 3 to 5 year installment plans."
        path="/"
        keywords="Peshawar real estate, Peshawars.com, property in Peshawar, houses for sale Peshawar, University Town Peshawar villas, DHA Peshawar plots, Glamorous Heights Kalam, Town Garden Peshawar, Kalam Cottages"
        jsonLd={[buildOrganizationAndWebsiteSchema(), buildHomeFaqSchema()]}
      />
      {/* 1. Cinematic Reference-Inspired Hero Section & Integrated Search Panel */}
      <HeroSection
        onOpenInquiry={() => context?.onOpenInquiry?.()}
        onOpenAppointment={() => context?.onOpenAppointment?.()}
      />

      {/* 2. Four Signature Development Projects */}
      <SignatureProjects />

      {/* 3. Our Projects Are Progressing — Real-Time Construction Tracker */}
      <ProjectsProgressingSection />

      {/* 4. Popular Locations */}
      <PopularLocations />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Verified Platform Statistics */}
      <StatsSection />

      {/* 8. Genuine Testimonials */}
      <TestimonialsSection />

      {/* 9. Real Estate Blog & Market Intelligence */}
      <BlogSection />

      {/* 10. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
