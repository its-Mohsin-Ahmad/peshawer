import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserAuthProvider } from './contexts/UserAuthContext';

import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserDashboardLayout } from './layouts/UserDashboardLayout';
import { UserProtectedRoute } from './components/auth/UserProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { PropertiesPage } from './pages/public/PropertiesPage';
import { PropertyDetailPage } from './pages/public/PropertyDetailPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { BlogsPage } from './pages/public/BlogsPage';
import { BlogDetailPage } from './pages/public/BlogDetailPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsPage } from './pages/public/TermsPage';

// User Auth Pages
import { UserLoginPage } from './pages/public/UserLoginPage';
import { UserSignupPage } from './pages/public/UserSignupPage';
import { UserForgotPasswordPage } from './pages/public/UserForgotPasswordPage';
import { AuthCallbackPage } from './pages/public/AuthCallbackPage';

// User Dashboard Pages
import { UserDashboardOverviewPage } from './pages/user/UserDashboardOverviewPage';
import { UserMyPropertiesPage } from './pages/user/UserMyPropertiesPage';
import { UserSavedPropertiesPage } from './pages/user/UserSavedPropertiesPage';
import { UserAppointmentsPage } from './pages/user/UserAppointmentsPage';
import { UserMessagesPage } from './pages/user/UserMessagesPage';
import { UserReviewsPage } from './pages/user/UserReviewsPage';
import { UserProfilePage } from './pages/user/UserProfilePage';
import { UserSettingsPage } from './pages/user/UserSettingsPage';
import { UserPaymentsPage } from './pages/user/UserPaymentsPage';
import { UserSupportPage } from './pages/user/UserSupportPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminPaymentPlansPage } from './pages/admin/AdminPaymentPlansPage';
import { AdminHeroManagerPage } from './pages/admin/AdminHeroManagerPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

const DocumentTitleAndFaviconManager: React.FC = () => {
  useEffect(() => {
    // Strictly enforce browser window title as requested
    document.title = 'Peshawars.com';

    // Dynamically inject/refresh favicon with cache-busting version so all browser windows reflect the 3D gold emblem
    try {
      const v = '7';
      const existingIcons = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
      existingIcons.forEach((el) => el.remove());

      const head = document.head || document.getElementsByTagName('head')[0];

      const pngIcon = document.createElement('link');
      pngIcon.rel = 'icon';
      pngIcon.type = 'image/png';
      pngIcon.setAttribute('sizes', '32x32');
      pngIcon.href = `./favicon.png?v=${v}`;
      head.appendChild(pngIcon);

      const shortcut = document.createElement('link');
      shortcut.rel = 'shortcut icon';
      shortcut.type = 'image/png';
      shortcut.href = `./favicon.png?v=${v}`;
      head.appendChild(shortcut);

      const apple = document.createElement('link');
      apple.rel = 'apple-touch-icon';
      apple.href = `./apple-touch-icon.png?v=${v}`;
      head.appendChild(apple);
    } catch {
      // fallback safe
    }
  }, []);

  return null;
};

const SmoothScrollManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run Lenis smooth scroll on public website pages.
    // In dashboards (/dashboard, /user) and standalone auth, disable Lenis so native scrolling operates without interception.
    const isDashboardOrAuth =
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/user') ||
      location.pathname === '/login' ||
      location.pathname === '/signup';

    if (isDashboardOrAuth) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return null;
};

export function App() {
  return (
    <HashRouter>
      <DocumentTitleAndFaviconManager />
      <SmoothScrollManager />
      <DataProvider>
        <AuthProvider>
          <UserAuthProvider>
            <Routes>
              {/* ─── User Auth Routes (standalone, no PublicLayout) ─── */}
              <Route path="/login" element={<UserLoginPage />} />
              <Route path="/signup" element={<UserSignupPage />} />
              <Route path="/forgot-password" element={<UserForgotPasswordPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />

              {/* ─── User Dashboard Routes (protected) ─── */}
              <Route
                path="/user"
                element={
                  <UserProtectedRoute>
                    <UserDashboardLayout />
                  </UserProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/user/dashboard" replace />} />
                <Route path="dashboard" element={<UserDashboardOverviewPage />} />
                <Route path="properties" element={<UserMyPropertiesPage />} />
                <Route path="saved-properties" element={<UserSavedPropertiesPage />} />
                <Route path="appointments" element={<UserAppointmentsPage />} />
                <Route path="messages" element={<UserMessagesPage />} />
                <Route path="reviews" element={<UserReviewsPage />} />
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="settings" element={<UserSettingsPage />} />
                <Route path="payments" element={<UserPaymentsPage />} />
                <Route path="support" element={<UserSupportPage />} />
              </Route>

              {/* ─── Public Website Routes ─── */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />

                {/* Property Marketplace with unique heroes */}
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/buy" element={<PropertiesPage forcedPurpose="Buy" />} />
                <Route path="/properties/rent" element={<PropertiesPage forcedPurpose="Rent" />} />
                <Route path="/properties/commercial" element={<PropertiesPage forcedCategory="Commercial" />} />
                <Route path="/properties/plots" element={<PropertiesPage forcedCategory="Plot" />} />
                <Route path="/properties/:propertyId" element={<PropertyDetailPage />} />

                {/* Signature Development Projects */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectSlug" element={<ProjectDetailPage />} />
                <Route path="/projects/:projectSlug/apartments/:apartmentId" element={<ProjectDetailPage />} />

                {/* Supporting Public Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
              </Route>

              {/* ─── Admin Authentication Login & Aliases ─── */}
              <Route path="/dashboard/login" element={<AdminLoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/*" element={<AdminLoginPage />} />

              {/* ─── SINGLE ADMIN DASHBOARD at /dashboard ─── */}
              <Route path="/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="properties" element={<AdminPropertiesPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="apartments" element={<AdminPaymentPlansPage />} />
                <Route path="payment-plans" element={<AdminPaymentPlansPage />} />
                <Route path="hero-carousel" element={<AdminHeroManagerPage />} />
                <Route path="hero-images" element={<AdminHeroManagerPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="inquiries" element={<AdminInquiriesPage initialTab="inquiries" />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="appointments" element={<AdminInquiriesPage initialTab="appointments" />} />
                <Route path="messages" element={<AdminInquiriesPage initialTab="messages" />} />
                <Route path="blogs" element={<AdminBlogsPage />} />
                <Route path="testimonials" element={<AdminInquiriesPage initialTab="inquiries" />} />
                <Route path="content" element={<AdminHeroManagerPage />} />
                <Route path="analytics" element={<AdminOverviewPage />} />
                <Route path="notifications" element={<AdminInquiriesPage initialTab="inquiries" />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="security" element={<AdminSettingsPage />} />
              </Route>

              {/* ─── Catch-all Redirect ─── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </UserAuthProvider>
        </AuthProvider>
      </DataProvider>
    </HashRouter>
  );
}

export default App;
