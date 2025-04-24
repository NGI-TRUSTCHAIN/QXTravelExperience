import { apiEndpoints } from "@/constants/api";
import { LanguageEnum } from "@/interface/language";
import {
  ChangeEmail,
  CombinedTokenBalance,
  DetailResponse,
  Mnemonic,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/interface/user";

import { BlockchainAddress, User, UserLogs } from "@/interface/user";
import { axiosInstance } from "@/lib/api";

// TODO: ADD ERROR HANDLING
export const sendOtp = async ({
  body,
}: {
  body: SendOtpRequest;
}): Promise<SendOtpResponse> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.public.sendOtp,
      isPrivate: false,
      headers: {},
    }).post(apiEndpoints.public.sendOtp, body);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtp = async ({
  body,
}: {
  body: VerifyOtpRequest;
}): Promise<VerifyOtpResponse> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.public.verifyOtp,
      isPrivate: false,
      headers: {},
    }).post(apiEndpoints.public.verifyOtp, body);

    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const getUserInfo = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<User> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.userInfo,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.userInfo);
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const getUserLogs = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<UserLogs[]> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.userLogs,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.userLogs);
    return data;
  } catch (error) {
    console.error("Error fetching user logs:", error);
    throw error;
  }
};

export const postUserInfo = async ({
  language,
  body,
}: {
  language: LanguageEnum;
  body: FormData;
}): Promise<User> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.userUpdate,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).post(apiEndpoints.private.userUpdate, body);
    return data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

export const getMnemonic = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<Mnemonic> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.mnemonic,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.mnemonic);
    return data;
  } catch (error) {
    console.error("Error fetching mnemonic:", error);
    throw error;
  }
};

export const getBlockchainAddress = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<BlockchainAddress> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.blockchainAddress,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.blockchainAddress);
    return data;
  } catch (error) {
    console.error("Error fetching blockchain address:", error);
    throw error;
  }
};

export const changeUserEmail = async ({
  language,
  body,
}: {
  language: LanguageEnum;
  body: ChangeEmail;
}): Promise<DetailResponse> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.userChangeEmail,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).post(apiEndpoints.private.userChangeEmail, body);
    return data;
  } catch (error) {
    console.error("Error changing email:", error);
    throw error;
  }
};

export const deleteUserAccount = async (): Promise<DetailResponse> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.userDeleteAccount,
      isPrivate: true,
      headers: {},
    }).post(apiEndpoints.private.userDeleteAccount);
    return data;
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
};

export const getCombinedTokenBalance = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<CombinedTokenBalance> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.combinedTokenBalance,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.combinedTokenBalance);
    return data;
  } catch (error) {
    console.error("Error fetching combined token balance:", error);
    throw error;
  }
};
