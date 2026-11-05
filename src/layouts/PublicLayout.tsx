import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { InquiryModal } from '../components/common/InquiryModal';
import { AppointmentModal } from '../components/common/AppointmentModal';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { WhatsAppFloatingButton } from '../components/common/WhatsAppFloatingButton';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(() => {
    // Only show loading screen on very first load of the session
    return !sessionStorage.getItem('PESHAWER_LOADED');
  });
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLoaded = () => {
    sessionStorage.setItem('PESHAWER_LOADED', 'true');
    setInitialLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6EA] text-[#102A24] w-full max-w-full overflow-x-hidden">
      {initialLoading && (
        <LoadingScreen onLoaded={handleLoaded} />
      )}

      <Navbar
        onOpenInquiry={() => setInquiryModalOpen(true)}
        onOpenAppointment={() => setAppointmentModalOpen(true)}
      />

      <main key={location.pathname} className="flex-1 w-full max-w-full overflow-x-hidden page-enter-active animate-in fade-in duration-300">
        <Outlet
          context={{
            onOpenInquiry: (title?: string, id?: string) => setInquiryModalOpen(true),
            onOpenAppointment: (projectName?: string) => setAppointmentModalOpen(true),
          }}
        />
      </main>

      <Footer />

      {/* Global Inquiries & Appointments */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />

      {/* Permanently Visible Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

