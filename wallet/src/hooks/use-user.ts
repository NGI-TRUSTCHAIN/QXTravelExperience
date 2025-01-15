import {
  BlockchainAddressState,
  ChangeEmail,
  ChangeUserEmailState,
  CombinedTokenBalance,
  CombinedTokenBalanceState,
  DetailResponse,
  Mnemonic,
  MnemonicState,
  User,
  UserLogs,
  UserLogsState,
  UserState
} from "@/interface/user";
import {
  changeUserEmail,
  getBlockchainAddress,
  getCombinedTokenBalance,
  getMnemonic,
  getUserInfo,
  getUserLogs,
  postUserInfo,
} from "@/services/user";
import React from "react";
import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { useLanguage } from "./use-language";

//TODO: CHANGE NAMING TO AVOID CONFUSION
const useUser = create<UserState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  userInfo: null,
  setUserInfo: (userInfo: User) => set({ userInfo }),
  error: null,
  setError: (error: string) => set({ error }),
}));

const useUserLogs = create<UserLogsState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  userLogs: null,
  setUserLogs: (userLogs: UserLogs[]) => set({ userLogs }),
  error: null,
  setError: (error: string) => set({ error }),
}));

export const useBlockchainAddress = create<BlockchainAddressState>()(
  persist(
    (set) => ({
      blockchainAddress: null,
      loading: false,
      error: null,
      setBlockchainAddress: (blockchainAddress) => set({ blockchainAddress }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      // fetchBlockchainAddress: async () => {
      //   const { language } = useLanguage();
      //   const state = get();
      //   if (state.blockchainAddress || state.loading) return;
      //   set({ loading: true, error: null });
      //   try {
      //     const data = await getBlockchainAddress({ language });
      //     set({ blockchainAddress: data });
      //   } catch (error) {
      //     set({ error: error instanceof Error ? error.message : "Error fetching blockchain address" });
      //   } finally {
      //     set({ loading: false });
      //   }
      // },
    }),
    {
      name: "blockchain-address-storage",
      partialize: (state) => ({ blockchainAddress: state.blockchainAddress }),
    }
  )
);

const useMnemonic = create<MnemonicState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  mnemonic: null,
  setMnemonic: (mnemonic: Mnemonic) => set({ mnemonic }),
  error: null,
  setError: (error: string) => set({ error }),
}));

const useChangeUserEmail = create<ChangeUserEmailState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  changeEmail: null,
  setChangeEmail: (changeEmail: ChangeEmail) => set({ changeEmail }),
  detail: null,
  setDetail: (detail: DetailResponse) => set({ detail }),
  error: null,
  setError: (error: string) => set({ error }),
}));

const useCombinedTokenBalance = create<CombinedTokenBalanceState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  combinedTokenBalance: null,
  setCombinedTokenBalance: (combinedTokenBalance: CombinedTokenBalance) =>
    set({ combinedTokenBalance }),
  error: null,
  setError: (error: string) => set({ error }),
}));

export const useFetchUserInfo = () => {
  const { language } = useLanguage();
  const { loading, setLoading, userInfo, setUserInfo, error, setError } =
    useUser();

  const fetchUserInfo = React.useCallback(async () => {
    if (userInfo || loading || error) return;
    try {
      setLoading(true);
      const data = await getUserInfo({ language });
      setUserInfo(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching user info"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUserInfo, setError, userInfo, language, loading, error]);

  return { fetchUserInfo, loading, userInfo, error };
};

export const useFetchUserLogs = () => {
  const { language } = useLanguage();
  const { loading, setLoading, userLogs, setUserLogs, error, setError } =
    useUserLogs();

  const fetchUserLogs = React.useCallback(async () => {
    if (userLogs || loading || error) return;
    try {
      setLoading(true);
      const data = await getUserLogs({ language });
      setUserLogs(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching user logs"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUserLogs, setError, userLogs, language, loading, error]);

  return { fetchUserLogs, loading, userLogs, error };
};

export const useFetchBlockchainAddress = () => {
  const { language } = useLanguage();
  const {
    loading,
    setLoading,
    blockchainAddress,
    setBlockchainAddress,
    error,
    setError,
  } = useBlockchainAddress();

  const fetchBlockchainAddress = React.useCallback(async () => {
    if (blockchainAddress || loading || error) return;
    try {
      setLoading(true);
      const data = await getBlockchainAddress({ language });
      setBlockchainAddress(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching user logs"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setBlockchainAddress, setError, blockchainAddress, language, loading, error]);

  return { fetchBlockchainAddress, loading, blockchainAddress, error };
};

export const useFetchMnemonic = () => {
  const { language } = useLanguage();
  const { loading, setLoading, mnemonic, setMnemonic, error, setError } =
    useMnemonic();

  const fetchMnemonic = React.useCallback(async () => {
    if (mnemonic || loading || error) return;
    try {
      setLoading(true);
      const data = await getMnemonic({ language });
      setMnemonic(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching user logs"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMnemonic, setError, mnemonic, language, loading, error]);

  return { fetchMnemonic, loading, mnemonic, error };
};

export const usePostUserInfo = () => {
  const { language } = useLanguage();
  const { loading, setLoading, userInfo, setUserInfo, error, setError } =
    useUser();
  const postUserInfoData = async ({ body }: { body: FormData }) => {
    if (!body || loading || error) return;
    try {
      setLoading(true);
      const data = await postUserInfo({ body, language });
      setUserInfo(data);
      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error posting user info"
      );
    } finally {
      setLoading(false);
    }
  };
  return { postUserInfoData, loading, userInfo, error };
};

export const useChangeEmail = () => {
  const { language } = useLanguage();
  const {
    loading,
    setLoading,
    detail,
    changeEmail,
    error,
    setError,
    setDetail,
  } = useChangeUserEmail();

  const postChangeUserEmail = async ({ body }: { body: ChangeEmail }) => {
    if (!body || loading || error) return;
    try {
      setLoading(true);
      const { detail } = await changeUserEmail({ language, body });
      setDetail({ detail });
      return detail
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error changing email");
    } finally {
      setLoading(false);
    }
  };

  return { postChangeUserEmail, loading, changeEmail, error, detail };
};

export const useFetchCombinedTokenBalance = () => {
  const { language } = useLanguage();
  const {
    loading,
    setLoading,
    combinedTokenBalance,
    setCombinedTokenBalance,
    error,
    setError,
  } = useCombinedTokenBalance();

  const fetchCombinedTokenBalance = React.useCallback(async () => {
    if (combinedTokenBalance || loading || error) return;
    try {
      setLoading(true);
      const data = await getCombinedTokenBalance({ language });
      setCombinedTokenBalance(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching combined token balance"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCombinedTokenBalance, setError, combinedTokenBalance, language, loading, error]);

  return { fetchCombinedTokenBalance, loading, combinedTokenBalance, error };
}