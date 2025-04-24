import { apiEndpoints } from "@/constants/api-endpoints";
import {
  AuthResponseProps,
  LoginRequestProps,
  SessionResponseProps,
} from "@/interface/auth";
import { axiosInstance } from "@/lib/api";
import { showErrorToast } from "@/lib/api-errors";

export const login = async ({
  body,
}: {
  body: LoginRequestProps;
}): Promise<SessionResponseProps> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.public.login,
      isPrivate: false,
      headers: {},
    }).post(apiEndpoints.public.login, body);
    return response.data;
  } catch (error) {
    const errorResponse = showErrorToast(error);
    throw errorResponse || error;
  }
};

export const register = async ({
  body,
}: {
  body: LoginRequestProps;
}): Promise<SessionResponseProps> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.public.register,
      isPrivate: false,
      headers: {},
    }).post(apiEndpoints.public.register, body);
    return response.data;
  } catch (error) {
    const errorResponse = showErrorToast(error);
    throw errorResponse || error;
  }
};

export const logout = async ({
  authToken,
}: {
  authToken: string;
}): Promise<AuthResponseProps> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.private.auth.logout,
      isPrivate: false,
      headers: {
        authorization: authToken ?? "",
      },
    }).post(apiEndpoints.private.auth.logout);
    return response.data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};

export const checkSession = async ({
  authToken,
}: {
  authToken: string;
}): Promise<SessionResponseProps> => {
  try {
    const response = await axiosInstance({
      baseURL: apiEndpoints.private.auth.checkSession,
      isPrivate: false,
      headers: {
        authorization: authToken,
      },
    }).post(apiEndpoints.private.auth.checkSession);
    return response.data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};