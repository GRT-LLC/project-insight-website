import { useMarketingRouter } from './RouterContext';
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

export function PageRouter() {
  const { currentPage, isAuthenticated } = useMarketingRouter();

  // Auth pages don't show nav/footer
  const authPages: Array<'signin' | 'signup' | 'forgot-password'> = [
    'signin',
    'signup',
    'forgot-password',
  ];
  const isAuthPage = authPages.includes(currentPage as typeof authPages[number]);

  // If authenticated and trying to access auth pages, redirect to app
  if (isAuthenticated && isAuthPage) {
    return <AppDashboard />;
  }

  // If on app page, render app
  if (currentPage === 'app') {
    return isAuthenticated ? <AppDashboard /> : <SignInPage />;
  }

  // Auth pages render without nav/footer
  if (isAuthPage) {
    switch (currentPage) {
      case 'signin':
        return <SignInPage />;
      case 'signup':
        return <SignUpPage />;
      case 'forgot-password':
        return <ForgotPasswordPage />;
      default:
        return <SignInPage />;
    }
  }

  // Marketing pages render with nav/footer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Navigation />
      {renderPage()}
      <Footer />
    </>
  );
}
