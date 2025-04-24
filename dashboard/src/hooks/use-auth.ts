import { routes } from "@/constants/routes";
import {
  AuthState,
  LoginRequestProps,
} from "@/interface/auth";
import { create, persist, resetAllStores } from "@/lib/store";
import {
  checkSession,
  login,
  logout,
  register,
} from "@/services/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "@/hooks/use-toast";
import { StorageEnum } from "@/interface/storage";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
      authLoading: false,
      setAuthLoading: (authLoading: boolean) => set({ authLoading }),
      loggedIn: null,
      setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
      emailToken: null,
      authToken: null,
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setEmailToken: (token: string) => set({ emailToken: token }),
      setAuthToken: (token: string) => {
        set({ authToken: token });
      },
      getAuthToken: (): string | null => {
        return useAuthStore.getState().authToken;
      },
      clearTokens: () => {
        set({
          emailToken: null,
          authToken: null,
          isAuthenticated: false,
          email: null,
        });
      },
      email: null,
      setEmail: (email: string) => set({ email }),
      expirationDate: null,
      setExpirationDate: (date: number | Date) => set({ expirationDate: date }),
      error: null,
      setError: (error: string) => set({ error }),
    }),
    {
      name: StorageEnum.auth,
      partialize: (state: AuthState) => ({
        authToken: state.authToken,
        emailToken: state.emailToken,
        isAuthenticated: state.isAuthenticated,
        email: state.email,
        expirationDate: state.expirationDate,
      }),
    }
  )
);

// registerStore(useAuthStore);


export const usePostLogin = () => {
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    setIsAuthenticated,
    setAuthToken,
    setExpirationDate,
    setEmail,
    error,
    setError,
    loggedIn,
    setLoggedIn,
  } = useAuthStore();
  const postLogin = async ({
    body,
    rememberMe,
  }: {
    body: Omit<LoginRequestProps, "rememberMe">;
    rememberMe: boolean;
  }) => {
    if (!body || loading) return;
    try {
      setLoading(true);
      const response = await login({ body });

      if (!response) return;

      if (!response.token) return;

      const expirationDate =
        Date.now() +
        (rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000); // 2 weeks or 1 day

      // Set the auth token and expiration date in the store
      setAuthToken(response.token);
      setIsAuthenticated(true);
      setEmail(response.user.email);
      setExpirationDate(expirationDate);
      setLoggedIn(true);

      navigate(routes.tokens.base);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Wrong Credentials");
    } finally {
      setLoading(false);
    }
  };

  return { postLogin, loading, error, loggedIn };
};

export const usePostRegister = () => {
  const { loading, setLoading, setError, error } = useAuthStore();
  const postRegister = async ({
    body,
  }: {
    body: { email: string; password: string };
  }) => {
    if (!body) return;
    try {
      setLoading(true);
      const response = await register({ body });
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return { postRegister, loading, error };
};

export const useCheckSession = () => {
  const { authToken, setAuthLoading, getAuthToken } = useAuthStore();
  const { handleLogout } = useLogout();

  const checkAuth = React.useCallback(async () => {
    if (authToken) {
      try {
        setAuthLoading(true);

        const authToken = getAuthToken();
        if (!authToken) return;

        const { success } = await checkSession({ authToken });
        if (!success) {
          handleLogout();
        }
      } catch (error) {
        console.error("Error checking session", error);
        handleLogout();
      } finally {
        setAuthLoading(false);
      }
    }
  }, [authToken, getAuthToken, handleLogout, setAuthLoading]);

  return { checkAuth };
};

export const useLogout = () => {
  const { languageData } = useLanguage();
  const { getAuthToken, clearTokens, loading, setLoading } = useAuthStore();
  // const navigate = useNavigate()
  const handleLogout = React.useCallback(async () => {
    const authToken = getAuthToken();
    try {
      setLoading(true);
      if (!authToken) return;
      const { success } = await logout({ authToken });
      if (success) {
        // navigate(routes.auth.base)
        clearTokens();
        resetAllStores();
      }
    } catch (error) {
      console.error("Error logging out", error);
      toast({
        title: languageData.LoginLabels.error.wrongCredentials,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, clearTokens, languageData, setLoading]);

  return { handleLogout, loading };
};
