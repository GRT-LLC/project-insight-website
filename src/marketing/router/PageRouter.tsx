import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { HomePage } from '../pages/HomePage';
import { FeaturesPage } from '../pages/FeaturesPage';
import { PricingPage } from '../pages/PricingPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { AppDashboard } from '../pages/AppDashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/app" replace /> : null;
}

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

export function PageRouter() {
  return (
    <Routes>
      {/* Auth pages - no nav/footer */}
      <Route
        path="/signin"
        element={
          <>
            <AuthRedirect />
            <SignInPage />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <AuthRedirect />
            <SignUpPage />
          </>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <>
            <AuthRedirect />
            <ForgotPasswordPage />
          </>
        }
      />

      {/* Protected app route */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppDashboard />
          </ProtectedRoute>
        }
      />

      {/* Marketing pages - with nav/footer */}
      <Route
        path="/"
        element={
          <MarketingLayout>
            <HomePage />
          </MarketingLayout>
        }
      />
      <Route
        path="/features"
        element={
          <MarketingLayout>
            <FeaturesPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <MarketingLayout>
            <PricingPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MarketingLayout>
            <AboutPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MarketingLayout>
            <ContactPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <MarketingLayout>
            <PrivacyPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MarketingLayout>
            <TermsPage />
          </MarketingLayout>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
