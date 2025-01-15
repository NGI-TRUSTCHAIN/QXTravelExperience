import { AuthState } from "@/interface/auth";
import localStorageHelper from "@/utils/local-storage";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  emailToken: null,
  authToken: localStorageHelper.exists("auth-data")
    ? localStorageHelper.getItem<{ token: string; expirationDate: number }>(
        "auth-data"
      )?.token || null
    : null,
  isAuthenticated: localStorageHelper.exists("auth-data"),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setEmailToken: (token) => set({ emailToken: token }),
  setAuthToken: (token) => {
    const authData = { token, expirationDate: Date.now() + 3600 * 1000 };
    localStorageHelper.setItem("auth-data", authData);
    set({ authToken: token });
  },
  clearTokens: () => {
    localStorageHelper.removeItem("auth-data");
    set({ emailToken: null, authToken: null });
  },
}));
