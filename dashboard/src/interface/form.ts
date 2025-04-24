import { UseFormReturn } from "react-hook-form";
import { LanguageEnum, LocaleData } from "./language";
import { AuthCardFormTypeEnum } from "@/constants/form";
import { Network, Token } from "./blockchain";

export interface MultilingualField {
    value: string;
    language: LanguageEnum;
    isDirty: boolean;
}

export interface AuthFormProps {
  authCardFormType?: AuthCardFormTypeEnum;
  handleAuthCardFormTypeChange: (type: AuthCardFormTypeEnum) => void;
}

export interface NetworkFormProps {
  networkForm: UseFormReturn<{
    name: string;
    chain_id: string;
    rpc_url: string;
    currency_symbol: string;
  }>;
  onSubmitNetwork: (data: {
    name: string;
    chain_id: string;
    rpc_url: string;
    currency_symbol: string;
  }) => void;
  languageData: LocaleData;
  initialValues: Network | null;
  handleCloseModal: () => void;
}

export interface TokenFormProps {
  tokenForm: UseFormReturn<{
    name: string;
    symbol: string;
    active: boolean;
    network_id: number;
  }>;
  onSubmitToken: (data: {
    name: string;
    symbol: string;
    active: boolean;
    network_id: number;
  }) => void;
  languageData: LocaleData;
  initialValues: Token | null;
  handleCloseModal: () => void;
  networks: Network[] | null;
}
