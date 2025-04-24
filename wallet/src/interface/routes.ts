export interface Routes {
    wildcard: string;
    home: string;
    profile: string;
    preferences: string;
    wallet: string;
    policy: string;
    did: string;
    walletView: string;
    walletViewQuery: (email: string, token: string) => string;
}