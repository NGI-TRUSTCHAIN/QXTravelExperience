
import { useAuthStore } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { AxiosInstanceProps } from "@/interface/api";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Create axios instance with interceptor and more flexibility
export const axiosInstance = ({
  baseURL,
  isPrivate = false, // Defaults to false if not passed
  headers = {
    contentType: "application/json",
    accept: "*/*",
    acceptLanguage: "en", // Defaults to 'en'
    authorization: "", // Defaults to empty string
    accessControlAllowOrigin: "*", // Defaults to '*'
  },
}: AxiosInstanceProps): AxiosInstance => {
  const { getAuthToken, clearTokens } = useAuthStore.getState();
  const {language } = useLanguage.getState()
  const authToken = getAuthToken();

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": headers.contentType,
      "Accept": headers.accept,
      "Accept-Language": headers.acceptLanguage || language,
      "Authorization": headers.authorization,
      "Access-Control-Allow-Origin": headers.accessControlAllowOrigin,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Set authorization token if the request is private
      if (isPrivate && authToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        clearTokens();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
