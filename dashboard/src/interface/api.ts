export interface ApiEndpoints {
  private: {
    organization: {
      base: string;
      id: string;
    };
    network: {
      base: string;
      id: string;
    };
    customer: {
      base: string;
      id: string;
    };
    blockchain: {
      transaction: string;
      network: string;
      token: string;
      createToken: string;
    }
    auth: {
      logout: string;
      checkSession: string;
    },
    util: {
      currency: string;
    }
  };

  public: {
    login: string;
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
  accessControlAllowOrigin?: string;
}
