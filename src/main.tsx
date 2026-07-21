import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/context/AuthProvider';
import { PageRouter } from './app/router/PageRouter';
import { ScrollToTop } from './app/router/ScrollToTop';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <PageRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
