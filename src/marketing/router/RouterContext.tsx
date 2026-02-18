import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type MarketingPage =
  | 'home'
  | 'features'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'app';

export interface MarketingUser {
  email: string;
  name: string;
}

interface RouterContextValue {
  currentPage: MarketingPage;
  navigate: (page: MarketingPage) => void;
  isAuthenticated: boolean;
  user: MarketingUser | null;
  login: (userData: MarketingUser) => void;
  logout: () => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentPage, setCurrentPage] = useState<MarketingPage>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<MarketingUser | null>(null);

  const navigate = useCallback((page: MarketingPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback((userData: MarketingUser) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigate('app');
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('home');
  }, [navigate]);

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        navigate,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useMarketingRouter(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useMarketingRouter must be used within a RouterProvider');
  }
  return context;
}

