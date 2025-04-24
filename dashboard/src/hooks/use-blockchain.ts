import {
  NetworksState,
  TokensState,
  TokenState,
  TransactionsState,
} from "@/interface/blockchain";
import {
  createToken,
  getNetworks,
  getTokens,
  getTransactions,
} from "@/services/blockchain";
import React from "react";
import { create, registerStore } from "@/lib/store";
import { useLanguage } from "./use-language";

const useTransactions = create<TransactionsState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  transactions: null,
  setTransactions: (transactions) => set({ transactions }),
  error: null,
  setError: (error) => set({ error }),
}));

const useTokens = create<TokensState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  tokens: null,
  setTokens: (tokens) => set({ tokens }),
  error: null,
  setError: (error) => set({ error }),
}));

const useToken = create<TokenState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  token: null,
  setToken: (token) => set({ token }),
  resetToken: () => set({ token: null }),
  error: null,
  setError: (error) => set({ error }),
}));

const useNetworks = create<NetworksState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  networks: null,
  setNetworks: (networks) => set({ networks }),
  error: null,
  setError: (error) => set({ error }),
}));

registerStore(useTransactions);
registerStore(useTokens);
registerStore(useToken);
registerStore(useNetworks);

export const useFetchTransactions = () => {
  const {
    loading,
    setLoading,
    transactions,
    setTransactions,
    error,
    setError,
  } = useTransactions();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchTransactions = React.useCallback(
    async ({ tokenId }: { tokenId: string }) => {
      if (
        (transactions && language === prevLanguageRef.current) ||
        loading ||
        error
      )
        return;
      try {
        setLoading(true);
        const data = await getTransactions({ tokenId, language });
        setTransactions(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching transactions"
        );
      } finally {
        setLoading(false);
      }
      prevLanguageRef.current = language;
    },
    [
      setLoading,
      setTransactions,
      setError,
      transactions,
      language,
      loading,
      error,
    ]
  );

  return { fetchTransactions, loading, transactions, error };
};

export const useFetchTokens = () => {
  const { loading, setLoading, tokens, setTokens, error, setError } =
    useTokens();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchTokens = React.useCallback(async () => {
    if ((tokens && language === prevLanguageRef.current) || error)
      return;
    try {
      setLoading(true);
      const data = await getTokens({ language });
      setTokens(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching tokens"
      );
    } finally {
      setLoading(false);
    }
    prevLanguageRef.current = language;
  }, [setLoading, setTokens, setError, tokens, language, error]);

  return { fetchTokens, loading, tokens, error };
};

export const useTokenById = () => {
  const { loading, token, setToken, resetToken, error, } =
    useToken();
  const { tokens } = useTokens();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchToken = React.useCallback(
    async ({ tokenId }: { tokenId: string }) => {
      if (
        token &&
        token.id === Number(tokenId) &&
        language === prevLanguageRef.current
      )
        return;

      if (tokens) {
        const token = tokens.find((token) => token.id === Number(tokenId));
        if (token) {
          setToken(token);
          return;
        }
      }

      // try {
      //   if (token || error) return;
      //   setLoading(true);
      //   const tokenById = await getTokenById({
      //     tokenId,
      //     language,
      //   });
      //   setToken(tokenById);
      // } catch (error) {
      //   setError(
      //     error instanceof Error ? error.message : "Error fetching token"
      //   );
      // }
      // finally {
      //   setLoading(false);
      // }
      prevLanguageRef.current = language;
    },
    [setToken, token, tokens, language]
  );

  return { fetchToken, resetToken, loading, token, error };
};

export const useFetchNetworks = () => {
  const { loading, setLoading, networks, setNetworks, error, setError } =
    useNetworks();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchNetworks = React.useCallback(async () => {
    if ((networks && language === prevLanguageRef.current) || loading || error)
      return;
    try {
      setLoading(true);
      const data = await getNetworks({ language });
      setNetworks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching networks"
      );
    } finally {
      setLoading(false);
    }
    prevLanguageRef.current = language;
  }, [setLoading, setNetworks, setError, networks, language, loading, error]);

  return { fetchNetworks, loading, networks, error };
};

export const useUploadToken = () => {
  const { languageData, language } = useLanguage();
  const { tokens, setTokens } = useTokens();
  const { fetchTokens } = useFetchTokens();

  const uploadToken = React.useCallback(
    async ({ body }: { body: FormData }) => {
      const response = await createToken({
        language,
        languageData,
        body,
      });
      
      // If tokens exist, update the tokens list with the new token information
      if (tokens) {
        if (response.token && typeof response.token === 'object') {
          // If the API returned the complete token object
          const tokenExists = tokens.find(t => t.id === response.token!.id);
          if (tokenExists) {
            setTokens(tokens.map(t => t.id === response.token!.id ? response.token! : t));
          } else {
            setTokens([...tokens, response.token]);
          }
        } else {
          // If the API only returned token_id and address
          // Refresh the tokens list to get the complete token data
          fetchTokens();
        }
      }
      
      return response;
    },
    [languageData, language, tokens, setTokens, fetchTokens]
  );

  return { uploadToken };
};
