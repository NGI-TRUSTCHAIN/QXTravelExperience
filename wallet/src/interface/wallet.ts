import { LocaleData } from "./language";

export interface WalletDrawerProps {
    languageData: LocaleData;
    handleBackupWalletKeys: () => void;
    mnemonic: string[];
    address: string;
}