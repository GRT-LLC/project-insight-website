import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlasmicDataProvider } from './context/PlasmicDataContext';
import { PageRouter } from './router/PageRouter';
import { ScrollToTop } from './router/ScrollToTop';

export function JarvisTravelMarketingApp() {
  return (
    <PlasmicDataProvider>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <PageRouter />
        </AuthProvider>
      </BrowserRouter>
    </PlasmicDataProvider>
  );
}
