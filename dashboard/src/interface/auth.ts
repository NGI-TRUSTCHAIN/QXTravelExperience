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

export interface LoginRequestProps {
    email: string;
    password: string;
}

export interface SessionResponseProps {
    success: boolean;
    token: string;
    user: UserProps;
}

export interface UserProps {
    _id: number;
    email: string;
}

export interface AuthResponseProps {
  success: boolean;
  msg: string;
}