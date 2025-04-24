import { donateFundsTypes } from "@/constants/form";
import { UseFormReturn } from "react-hook-form";
import { LocaleData } from "./language";

export interface CreateIdFormProps {
    createIdForm: UseFormReturn<{
        email: string;
    }>
    onSubmitCreateId: (data: { email: string }) => void;
    languageData: LocaleData;
}

export interface ChangeEmailFormProps {
    changeEmailForm: UseFormReturn<{
        new_email: string;
    }>;
    onSubmitChangeEmail: (data: { new_email: string }) => void;
    languageData: LocaleData;
}

export interface ChangeUserInfoProps {
    changeUserInfoForm: UseFormReturn<{
        first_name: string;
        last_name: string;
        profile_picture?: string;
        phone_number: string;
        birthday: Date;
    }>;
    onSubmitChangeUserInfo: (data: {
        first_name: string;
        last_name: string;
        profile_picture?: string;
        phone_number: string;
        birthday: Date;
    }) => void;
    languageData: LocaleData;
}

export interface DeleteIdFormProps {
    deleteIdForm: UseFormReturn<{
        delete: boolean;
    }>;
    onSubmitDeleteId: (data: { delete: boolean }) => void;
    languageData: LocaleData;
}

export interface DonateFundsFormProps {
    donateFundsForm: UseFormReturn<{
        type: donateFundsTypes;
    }>;
    onSubmitDonateFunds: (data: { type: donateFundsTypes }) => void;
    languageData: LocaleData;
}

export  interface CreateDIDFormProps {
    createDIDForm: UseFormReturn<{
        name: string;
        did: string;
    }>;
    onSubmitCreateDID: (data: { name: string; did: string }) => void;
    languageData: LocaleData;
}
