import { RouteProps as ReactRouterRouteProps } from 'react-router-dom';

export interface AuthState {
    emailToken: string | null;
    authToken: string | null;
    isAuthenticated: boolean;
    setEmailToken: (token: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setAuthToken: (token: string) => void;
    clearTokens: () => void;
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