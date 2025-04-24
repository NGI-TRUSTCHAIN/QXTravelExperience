import { apiEndpoints } from "@/constants/api-endpoints";
import { toast } from "@/hooks/use-sonner-toast";
import {
  CreateTokenResponse,
  Network,
  Token,
  Transaction,
} from "@/interface/blockchain";
import { LanguageEnum, LocaleData } from "@/interface/language";
import { axiosInstance } from "@/lib/api";
import { showErrorToast } from "@/lib/api-errors";

export const getTransactions = async ({
  language,
  tokenId,
}: {
  language: LanguageEnum;
  tokenId: string;
}): Promise<Transaction[]> => {
  try {
    const query = new URLSearchParams({ token_id: tokenId.toString() });
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.blockchain.transaction,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(`${apiEndpoints.private.blockchain.transaction}?${query}`);

    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getNetworks = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<Network[]> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.blockchain.network,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.blockchain.network);
    return data;
  } catch (error) {
    console.error("Error fetching networks:", error);
    throw error;
  }
};

export const getTokens = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<Token[]> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.blockchain.token,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.blockchain.token);
    return data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

export const createToken = async ({
  language,
  languageData,
  body,
}: {
  language: LanguageEnum;
  languageData: LocaleData;
  body: FormData;
}): Promise<CreateTokenResponse> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.blockchain.createToken,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).post(apiEndpoints.private.blockchain.createToken, body);
    toast({
      title: languageData.ActionPromiseLabels.title.success,
      description: `${languageData.ActionPromiseLabels.description.success}
      ${" "}
      ${languageData.ActionPromiseLabels.description.token.create}`,
    });
    return data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};
