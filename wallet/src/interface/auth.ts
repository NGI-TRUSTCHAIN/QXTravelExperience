import { RouteProps as ReactRouterRouteProps } from 'react-router-dom';
export interface AuthState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  authLoading: boolean;
  setAuthLoading: (authLoading: boolean) => void;
  loggedIn: boolean | null;
  setLoggedIn: (loggedIn: boolean) => void;
  emailToken: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setEmailToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthToken: (token: string) => void;
  getAuthToken: () => string | null;
  clearTokens: () => void;
  email: string | null;
  setEmail: (email: string) => void;
  expirationDate: number | Date | null;
  setExpirationDate: (date: number | Date) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface AuthStorage {
  authData: {
    token: string;
    expiration: string;
  }
}

export type ProtectedRouteProps = ReactRouterRouteProps & {
  isAuthenticated: boolean;
};