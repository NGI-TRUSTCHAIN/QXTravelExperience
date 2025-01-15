import { Routes } from "@/interface/routes";

export const routes : Routes = {
    wildcard: '*',
    home: '/',
    profile: '/profile',
    preferences: '/preferences',
    wallet: '/wallet',
    policy: '/policy',
    walletView: '/wallet-view/',
    walletViewQuery: (email: string, token: string) => `/wallet-view/?code=${token}&email=${email}`
}