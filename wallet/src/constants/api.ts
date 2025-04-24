import { ApiEndpoints } from "@/interface/api";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const apiEndpoints: ApiEndpoints = {
  private: {
    mnemonic: `${BASE_API_URL}/api/blockchain/mnemonic`,
    blockchainAddress: `${BASE_API_URL}/api/blockchain/blockchain_address`,
    combinedTokenBalance: `${BASE_API_URL}/api/blockchain/token_balance_combined`,
    userInfo: `${BASE_API_URL}/api/user/info`,
    userUpdate: `${BASE_API_URL}/api/user/info-update`,
    userLogs: `${BASE_API_URL}/api/user/logs`,
    userDeleteAccount: `${BASE_API_URL}/api/user/delete-account`,
    userChangeEmail: `${BASE_API_URL}/api/user/change-email`,
    did: {
      create: `${BASE_API_URL}/api/blockchain/add_did`,
      get: `${BASE_API_URL}/api/blockchain/dids`,
    }
  },
  public: {
    sendOtp: `${BASE_API_URL}/api/customer/auth/email/`,
    verifyOtp: `${BASE_API_URL}/api/customer/auth/token/`,
  },
};
