import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserAuthProvider } from './contexts/UserAuthContext';

import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserDashboardLayout } from './layouts/UserDashboardLayout';
import { UserProtectedRoute } from './components/auth/UserProtectedRoute';
import { SparkleTrail } from './components/common/SparkleTrail';
import { ScrollEnhancements } from './components/common/ScrollEnhancements';

// Synchronous Homepage for Instant First-Paint
import { HomePage } from './pages/public/HomePage';

// Code-split Public Pages (loaded on demand)
const PropertiesPage = lazy(() => import('./pages/public/PropertiesPage').then(m => ({ default: m.PropertiesPage })));
const PropertyDetailPage = lazy(() => import('./pages/public/PropertyDetailPage').then(m => ({ default: m.PropertyDetailPage })));
const ProjectsPage = lazy(() => import('./pages/public/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./pages/public/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const AboutPage = lazy(() => import('./pages/public/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogsPage = lazy(() => import('./pages/public/BlogsPage').then(m => ({ default: m.BlogsPage })));
const BlogDetailPage = lazy(() => import('./pages/public/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/public/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/public/TermsPage').then(m => ({ default: m.TermsPage })));

// Code-split User Auth Pages
const UserLoginPage = lazy(() => import('./pages/public/UserLoginPage').then(m => ({ default: m.UserLoginPage })));
const UserSignupPage = lazy(() => import('./pages/public/UserSignupPage').then(m => ({ default: m.UserSignupPage })));
const UserForgotPasswordPage = lazy(() => import('./pages/public/UserForgotPasswordPage').then(m => ({ default: m.UserForgotPasswordPage })));
const AuthCallbackPage = lazy(() => import('./pages/public/AuthCallbackPage').then(m => ({ default: m.AuthCallbackPage })));

// Code-split User Dashboard Pages
const UserDashboardOverviewPage = lazy(() => import('./pages/user/UserDashboardOverviewPage').then(m => ({ default: m.UserDashboardOverviewPage })));
const UserMyPropertiesPage = lazy(() => import('./pages/user/UserMyPropertiesPage').then(m => ({ default: m.UserMyPropertiesPage })));
const UserSavedPropertiesPage = lazy(() => import('./pages/user/UserSavedPropertiesPage').then(m => ({ default: m.UserSavedPropertiesPage })));
const UserAppointmentsPage = lazy(() => import('./pages/user/UserAppointmentsPage').then(m => ({ default: m.UserAppointmentsPage })));
const UserMessagesPage = lazy(() => import('./pages/user/UserMessagesPage').then(m => ({ default: m.UserMessagesPage })));
const UserReviewsPage = lazy(() => import('./pages/user/UserReviewsPage').then(m => ({ default: m.UserReviewsPage })));
const UserProfilePage = lazy(() => import('./pages/user/UserProfilePage').then(m => ({ default: m.UserProfilePage })));
const UserSettingsPage = lazy(() => import('./pages/user/UserSettingsPage').then(m => ({ default: m.UserSettingsPage })));
const UserPaymentsPage = lazy(() => import('./pages/user/UserPaymentsPage').then(m => ({ default: m.UserPaymentsPage })));
const UserSupportPage = lazy(() => import('./pages/user/UserSupportPage').then(m => ({ default: m.UserSupportPage })));

// Code-split Heavy Admin Pages & Charts
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminOverviewPage = lazy(() => import('./pages/admin/AdminOverviewPage').then(m => ({ default: m.AdminOverviewPage })));
const AdminPropertiesPage = lazy(() => import('./pages/admin/AdminPropertiesPage').then(m => ({ default: m.AdminPropertiesPage })));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage').then(m => ({ default: m.AdminProjectsPage })));
const AdminPaymentPlansPage = lazy(() => import('./pages/admin/AdminPaymentPlansPage').then(m => ({ default: m.AdminPaymentPlansPage })));
const AdminHeroManagerPage = lazy(() => import('./pages/admin/AdminHeroManagerPage').then(m => ({ default: m.AdminHeroManagerPage })));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage').then(m => ({ default: m.AdminInquiriesPage })));
const AdminMediaPage = lazy(() => import('./pages/admin/AdminMediaPage').then(m => ({ default: m.AdminMediaPage })));
const AdminBlogsPage = lazy(() => import('./pages/admin/AdminBlogsPage').then(m => ({ default: m.AdminBlogsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })));

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
      duration: 1.25, // Creamy luxurious inertia momentum glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15, // Responsive authoritative wheel control
      touchMultiplier: 1.0, // 1:1 responsive native touch handling
      syncTouch: true,
      infinite: false,
    });

    (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: typeof lenis }).__lenis;
    };
  }, [location.pathname]);

  return null;
};

export function App() {
  return (
    <HashRouter>
      <DocumentTitleAndFaviconManager />
      <SmoothScrollManager />
      <SparkleTrail />
      <ScrollEnhancements />
      <DataProvider>
        <AuthProvider>
          <UserAuthProvider>
            <Suspense fallback={<div className="min-h-screen bg-[#003D25]" />}>
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
          </Suspense>
        </UserAuthProvider>
        </AuthProvider>
      </DataProvider>
    </HashRouter>
  );
}

export default App;
