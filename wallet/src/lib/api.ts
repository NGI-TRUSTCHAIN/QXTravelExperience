import { useAuthStore } from "@/hooks/use-auth";
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
  },
}: AxiosInstanceProps): AxiosInstance => {
  const { authToken, clearTokens } = useAuthStore.getState();
  const retryCounter: Record<string, number> = {};

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": headers.contentType,
      Accept: headers.accept,
      "Accept-Language": headers.acceptLanguage,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Set authorization token if the request is private
      if (isPrivate && authToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Token ${authToken}`;
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
      // Reset retry counter on successful response
      const requestKey = `${response.config.method}:${response.config.url}`;
      if (retryCounter[requestKey]) {
        delete retryCounter[requestKey];
      }
      return response;
    },
    (error) => {
      const requestKey = `${error.config.method}:${error.config.url}`;
      retryCounter[requestKey] = (retryCounter[requestKey] || 0) + 1;

      if (retryCounter[requestKey] > 3) {
        // Set a state or handle the retry limit exceeded case
        console.error(`Request to ${requestKey} failed more than 3 times. Aborting further attempts.`);
        return Promise.reject(new Error("Retry limit exceeded"));
      }

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // console.log("Unauthorized request. Logging out...");
        clearTokens();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};