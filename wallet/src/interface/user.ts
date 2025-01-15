export interface User {
  email?: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_picture?: string | null;
  phone_number: string | null;
  birthday: Date | string | null;
}

export interface UserLogs {
  name: string;
  date: string;
}

export interface BlockchainAddress {
  blockchain_address: string;
}

export interface Mnemonic {
  mnemonic: string[];
}

export interface ChangeEmail {
  new_email: string;
}

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  token: string;
}

export interface SendOtpResponse {
  detail: string;
}

export interface DetailResponse {
  detail: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface CombinedTokenBalance {
  combined_balance: number;
}

export interface UserState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userInfo: User | null;
  setUserInfo: (user: User) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface UserLogsState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userLogs: UserLogs[] | null;
  setUserLogs: (userLogs: UserLogs[]) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface BlockchainAddressState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  blockchainAddress: BlockchainAddress | null;
  setBlockchainAddress: (blockchainAddress: BlockchainAddress) => void;
  error: string | null;
  setError: (error: string) => void;
  // fetchBlockchainAddress: () => Promise<void>;
}

export interface ChangeUserEmailState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  changeEmail: ChangeEmail | null;
  setChangeEmail: (changeEmail: ChangeEmail) => void;
  detail: DetailResponse | null;
  setDetail: (detail: DetailResponse) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface MnemonicState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  mnemonic: Mnemonic | null;
  setMnemonic: (mnemonic: Mnemonic) => void;
  error: string | null;
  setError: (error: string) => void;
}

export interface CombinedTokenBalanceState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  combinedTokenBalance: CombinedTokenBalance | null;
  setCombinedTokenBalance: (combinedTokenBalance: CombinedTokenBalance) => void;
  error: string | null;
  setError: (error: string) => void;
}