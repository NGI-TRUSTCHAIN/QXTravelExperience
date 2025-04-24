import { LocaleData } from "./language";

export interface Transaction {
  id: number;
  tx_hash: string;
  from_address: string;
  to_address: string;
  value: number;
  gas_price: number;
  gas_used: number;
  status: boolean;
  data: string;
  token: number;
  reward: number | null;
  customer: number;
  created_at: string | Date;
}

export interface Network {
  id: number;
  name: string;
  rpc_url: string;
  chain_id: number;
  currency_symbol: string;
}

export interface Token {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
  mintable: boolean;
  burnable: boolean;
  transferable: boolean;
  active: boolean;
  network_id: number;
  address?: string;
  created_at: string | Date;
  updated_at: string | Date | null;
}

export interface CreateTokenRequest {
  token_name: string;
  token_symbol: string;
}

export interface CreateTokenResponse {
  token_id: number;
  address: string;
  token?: Token;
}

export interface TransactionsState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  transactions: Transaction[] | null;
  setTransactions: (data: Transaction[]) => void;
  error: string | null;
  setError: (error: string) => void;
}
export interface TokensState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  tokens: Token[] | null;
  setTokens: (data: Token[]) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface TokenState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  token: Token | null;
  setToken: (data: Token | null) => void;
  resetToken: () => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface NetworksState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  networks: Network[] | null;
  setNetworks: (data: Network[]) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface TokenDataTableProps {
  tokens: Token[];
  networks: Network[];
  onNavigate: (token: Token) => void;
  loading: boolean;
  itemsPerPage: number;
}

export interface TokenColumnProps {
  networks: Network[];
  onNavigate: (token: Token) => void;
  languageData: LocaleData;
}

export interface TransactionDataTableProps {
  transactions: Transaction[];
  tokens: Token[];
  loading: boolean;
  itemsPerPage: number;
}

export interface TransactionColumnProps {
  tokens: Token[];
  languageData: LocaleData;
}
