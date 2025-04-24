const BASE_CC_DASH_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const apiEndpoints = {
  private: {
    network: {
      base: `${BASE_CC_DASH_API_URL}/api/blockchain/networks`,
      id: `${BASE_CC_DASH_API_URL}/api/blockchain/networks/:networkId`,
    },
    customer: {
      base: `${BASE_CC_DASH_API_URL}/api/crm`,
      id: `${BASE_CC_DASH_API_URL}/api/crm/:customerId`,
    },
    blockchain: {
      transaction: `${BASE_CC_DASH_API_URL}/api/blockchain/transactions`,
      network: `${BASE_CC_DASH_API_URL}/api/blockchain/networks`,
      token: `${BASE_CC_DASH_API_URL}/api/blockchain/tokens`,
      createToken: `${BASE_CC_DASH_API_URL}/api/blockchain/create_token`,
    },
    auth: {
      logout: `${BASE_CC_DASH_API_URL}/api/users/logout`,
      checkSession: `${BASE_CC_DASH_API_URL}/api/users/checkSession`,
    },
  },
  public: {
    login: `${BASE_CC_DASH_API_URL}/api/users/login`,
    register: `${BASE_CC_DASH_API_URL}/api/users/register`,
  },
};
