export interface ApiEndpoints {
    private: {
        mnemonic: string;
        blockchainAddress: string;
        userInfo: string;
        userUpdate: string;
        userLogs: string;
        userDeleteAccount: string;
        userChangeEmail: string;
        combinedTokenBalance: string;
    };

    public: {
        sendOtp: string;
        verifyOtp: string;
    };
  }

  export interface AxiosInstanceProps {
    baseURL: string;
    isPrivate: boolean;
    headers: AxiosInstanceHeaders;
  }

  export interface AxiosInstanceHeaders {
    contentType?: string;
    accept?: string;
    acceptLanguage?: string;
    authorization?: string;
  }
