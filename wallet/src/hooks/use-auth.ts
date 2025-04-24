import { AuthState } from "@/interface/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
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
      name: "auth-data",
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
