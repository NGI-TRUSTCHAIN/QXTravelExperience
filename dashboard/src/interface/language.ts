export enum LanguageEnum {
  EN = "en",
}

export type LanguageType = keyof typeof LanguageEnum;

export interface LanguageStoreState {
  language: LanguageEnum;
  setLanguage: (language: LanguageEnum) => void;
  languageModal: LanguageEnum;
  setLanguageModal: (language: LanguageEnum) => void;
  languageData: LocaleData;
}

export interface ILanguageOptions {
  value: LanguageEnum;
  label: string;
  icon: JSX.Element;
  disabled: boolean;
}

export interface LocaleData {
  LoginLabels: LoginLabelProps;
  SideNavbarLabels: SideNavbarLabelProps;
  FilterGridLabels: FilterGridLabelProps;
  NetworkCardLabels: NetworkCardLabelProps;
  NetworkModalLabels: NetworkModalLabelProps;
  CustomerCardLabels: CustomerCardLabelProps;
  FormActionLabels: FormActionLabelProps;
  ActionPromiseLabels: ActionPromiseLabelProps;
  TableLabels: TableLabelProps;
  TokenModalLabels: TokenModalLabelProps;
  TokenCardLabels: TokenCardLabelProps;
  TransactionCardLabels: TransactionCardLabelProps;
  DeleteRecord: DeleteRecordProps;
  StatusModalLabels: StatusModalLabelProps;
  TimeAgo: TimeAgoProps;
  PaginationLabels: PaginationLabelProps;
}

export interface LoginLabelProps {
  title: string;
  description: string;
  email: InputProps;
  password: InputProps;
  newPassword: InputProps;
  confirmPassword: InputProps;
  rememberMe: string;
  register: string;
  login: string;
  backToLogin: string;
  sendMeEmail: string;
  submit: string;
  customer: {
    already: string;
    register: string;
    contact: string;
  };
  signIn: string;
  error: {
    email: string;
    password: string;
    wrongCredentials: string;
  };
}

interface InputProps {
  label: string;
  placeholder: string;
}

interface SideNavbarLabelProps {
  network: {
    title: string;
    label: string;
  };
  tokens: {
    title: string;
    label: string;
  };
  customers: {
    title: string;
    label: string;
  };
  back: {
    title: string;
    label: string;
  };
}

interface FilterGridLabelProps {
  partner: string;
  createNetwork: string;
  back: string;
  all: string;
  active: string;
  suspend: string;
  pending: string;
  denied: string;
  approved: string;
  search: string;
  welcomeMessage: string;
  clearFilters: string;
}


interface NetworkModalLabelProps {
  title: {
    add: string;
    edit: string;
  };
  active: string;
  name: {
    label: string;
    placeholder: string;
    required: string;
  };
  chainId: {
    label: string;
    placeholder: string;
    required: string;
  };
  rpcUrl: {
    label: string;
    placeholder: string;
    required: string;
  };
  currencySymbol: {
    label: string;
    placeholder: string;
    required: string;
  };
  save: string;
  cancel: string;
}

interface NetworkCardLabelProps {
  table: {
    columns: string;
    id: string;
    name: string;
  };
}

interface CustomerCardLabelProps {
  table: {
    columns: string;
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    blockchainAddress: string;
    rewardPoints: string;
    lastCheckIn: string;
    status: string;
    createdAt: string;
    actions: {
      open: string;
      label: string;
      view: string;
      copy: string;
      chat: string;
      edit: string;
    };
    loading: string;
    noResults: string;
    of: string;
    rowsSelected: string;
  };
  card: {
    contact: string;
    email: string;
    gender: string;
    birthday: string;
    rewardPoints: string;
    walletAddress: string;
  };
  customersNotFound: string;
}

interface TableLabelProps {
  actions: {
    open: string;
    label: string;
    view: string;
    activate: string;
    suspend: string;
    copy: string;
    chat: string;
    edit: string;
    status: string;
    delete: string;
  };
  columns: string;
  loading: string;
  noResults: string;
  of: string;
  rowsSelected: string;
  notFound: string;
}

interface FormActionLabelProps {
  save: string;
  cancel: string;
  contentLanguage: string;
  languages: string;
  available: string;
  modified: string;
  notAvailable: string;
}

interface ActionPromiseLabelProps {
  title: {
    success: string;
    error: string;
  };
  description: {
    success: string;
    error: string;
    customer: {
      create: string;
      update: string;
      delete: string;
    };
    token: {
      create: string;
      update: string;
      delete: string;
    };
  };
}

interface TokenModalLabelProps {
  title: {
    add: string;
    edit: string;
  };
  description: {
    add: string;
  };
  active: string;
  name: {
    label: string;
    placeholder: string;
  };
  symbol: {
    label: string;
    placeholder: string;
  };
  network: {
    label: string;
    placeholder: string;
  };
  mintable: {
    label: string;
    placeholder: string;
  };
  burnable: {
    label: string;
    placeholder: string;
  };
  transferable: {
    label: string;
    placeholder: string;
  };
  save: string;
  cancel: string;
}

interface TokenCardLabelProps {
  table: {
    columns: string;
    id: string;
    name: string;
    network: string;
    symbol: string;
    totalSupply: string;
    contractAddress: string;
    createdAt: string;
    active: string;
    actions: {
      open: string;
      label: string;
      view: string;
      copy: string;
      edit: string;
    };
    loading: string;
    noResults: string;
    of: string;
    rowsSelected: string;
  };
  notFound: string;
}

interface TransactionCardLabelProps {
  table: {
    columns: string;
    id: string;
    txHash: string;
    fromAddress: string;
    toAddress: string;
    token: string;
    createdAt: string;
    actions: {
      copyTxHash: string;
      copyFromAddress: string;
      copyToAddress: string;
    };
    loading: string;
    noResults: string;
    of: string;
    rowsSelected: string;
  };
  notFound: string;
}

interface DeleteRecordProps {
  title: string;
  description: string;
  confirm: string;
  cancel: string;
}

interface StatusModalLabelProps {
  title: string;
  cancel: string;
  description: string;
  approve: string;
  deny: string;
  pending: string;
}

interface TimeAgoProps {
  seconds: string;
  minute: string;
  minutes: string;
  hour: string;
  hours: string;
  day: string;
  days: string;
  week: string;
  weeks: string;
  month: string;
  months: string;
  year: string;
  years: string;
  now: string;
  ago: string;
  fromNow: string;
}

interface PaginationLabelProps {
  previous: string;
  next: string;
  page: string;
  of: string;
  rowsPerPage: string;
  showing: string;
  to: string;
  results: string;
}

