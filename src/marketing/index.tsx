import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PageRouter } from './router/PageRouter';
import { ScrollToTop } from './router/ScrollToTop';

export function JarvisTravelMarketingApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PageRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}
