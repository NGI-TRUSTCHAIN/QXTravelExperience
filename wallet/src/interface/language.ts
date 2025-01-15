export type LanguageEnum = "en";

export interface LanguageStoreState {
  language: LanguageEnum;
  setLanguage: (language: LanguageEnum) => void;
  languageData: LocaleData;
}

export interface LocaleData {
  CreateIdLabels: CreateIdLabelProps;
  CreateIdMediolanumLabels: CreateIdMediolanumLabelProps;
  AccountsLabels: AccountsIdLabelProps;
  ProfileLabels: ProfileLabelProps;
  PreferencesLabels: PreferencesLabelProps;
  WalletLabels: WalletLabelProps;
  PolicyLabels: PolicyLabelProps;
  ToastAlertLabels: ToastAlertLabelProps;
}

export interface CreateIdLabelProps {
  title: {
    start: string;
    information: string;
    form: string;
    success: string;
  };
  description: {
    start: string;
    information: string;
    form: string;
    success:  {
      email: string;
      verification: string;
    }
  };
  label: {
    form: string;
    placeholder: string;
  };
  button: {
    start: string;
    information: string;
    form: string;
    success: string;
  };
  error: {
    form: string;
  };
  helper: string;
  resetEmail: {
    title: string;
    description: string;
  };
}

export interface CreateIdMediolanumLabelProps {
  title: {
    id: string;
    email: string;
  };
  description: {
    id: string;
    email: string;
  };
  label: {
    id: string;
    input: string;
  };
  button: {
    id: string;
    email: string;
  };
  error: {
    email: string;
  };
  helper: string;
  resetEmail: {
    title: string;
    description: string;
    label: string;
    action: string;
  };
}

export interface AccountsIdLabelProps {
  active: {
    title: string;
    action: string;
    tokenDescription: string;
  };
}

export interface ProfileLabelProps {
  details: {
    title: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    phoneNumber: string;
    birthday: string;
    changeUserInfo: {
      title: string;
      description: string;
      firstName: {
        label: string;
        error: string;
      };
      lastName: {
        label: string;
        error: string;
      };
      profilePicture: {
        label: string;
      };
      phoneNumber: {
        label: string;
        error: string;
      };
      birthday: {
        label: string;
        error: string;
      };
      action: string;
    };
  };
  account: {
    title: string;
    email: string;
    walletKeys: string;
    privacyPolicy: string;
  };
  history: {
    title: string;
    transaction: string;
    registered: string;
    deleted: string;
  };
}

export interface PreferencesLabelProps {
  title: string;
  specialOffers: string;
  shareData: string;
  shareEmail: string;
  shareRewards: string;
  shareName: string;
}

export interface WalletLabelProps {
  title: string;
  description: string;
  address: string;
  action: string;
  modal: {
    title: string;
    description: {
      download: string;
      meta: string;
    };
  };
}

export interface PolicyLabelProps {
  title: string;
  date: string;
  introduction: {
    title: string;
    description: string;
  };
  privacy: {
    title: string;
    description: string;
  };
  dataControl: {
    title: string;
    description: string;
  };
  dataUsage: {
    title: string;
    description: string;
  };
  action: string;
  modal: {
    delete: {
      title: string;
      description: string;
      label: string;
    };
    funds: {
      title: string;
      description: string;
      network: string;
      charity: string;
      action: string;
    };
  };
}

export interface ToastAlertLabelProps {
  preferences: {
    title: string;
    error: string;
  };
  deleteId: {
    title: string;
    error: string;
  };
  changeEmail: {
    title: string;
    error: string;
  };
  changeUserInfo: {
    title: string;
    error: string;
  };
  backupWallet: {
    title: string;
    error: string;
  };
}
