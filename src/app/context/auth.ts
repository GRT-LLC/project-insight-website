import { createContext } from 'react';

export interface MarketingUser {
  email: string;
  name: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: MarketingUser | null;
  login: (userData: MarketingUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
