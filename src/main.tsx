import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthContext';
import { PageRouter } from './app/router/PageRouter';
import { ScrollToTop } from './app/router/ScrollToTop';
import { PlasmicRootProvider } from '@plasmicapp/loader-react';
import { PLASMIC } from './plasmic-init';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PlasmicRootProvider loader={PLASMIC}>
        <AuthProvider>
          <ScrollToTop />
          <PageRouter />
        </AuthProvider>
      </PlasmicRootProvider>
    </BrowserRouter>
  </StrictMode>
);
