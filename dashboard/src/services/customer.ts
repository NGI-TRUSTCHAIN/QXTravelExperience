import { apiEndpoints } from "@/constants/api-endpoints";
import { LanguageEnum } from "@/interface/language";
import { Customer } from "@/interface/customer";
import { axiosInstance } from "@/lib/api";
import { showErrorToast } from "@/lib/api-errors";

export const getCustomers = async ({
  language,
}: {
  language: LanguageEnum;
}): Promise<Customer[]> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.customer.base,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.customer.base);
    return data;
  } catch (error) {
    console.error("Error fetching Customers:", error);
    throw error;
  }
};

export const getCustomerById = async ({
  customerId,
  language,
}: {
  customerId: string;
  language: LanguageEnum;
}) => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.customer.base,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).get(apiEndpoints.private.customer.id.replace(":customerId", customerId));
    return data;
  } catch (error) {
    console.error("Error fetching Customer:", error);
    throw error;
  }
};

export const createCustomer = async ({
  language,
  body,
}: {
  language: LanguageEnum;
  body: FormData;
}): Promise<Customer> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.customer.base,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).post(apiEndpoints.private.customer.base, body);
    return data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};

export const updateCustomer = async ({
  language,
  customerId,
  body,
}: {
  language: LanguageEnum;
  customerId: string;
  body: FormData;
}): Promise<Customer> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.customer.base,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).put(
      apiEndpoints.private.customer.id.replace(":customerId", customerId),
      body
    );
    return data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};

export const deleteCustomerById = async ({
  language,
  customerId,
}: {
  language: LanguageEnum;
  customerId: string;
}): Promise<void> => {
  try {
    await axiosInstance({
      baseURL: apiEndpoints.private.customer.base,
      isPrivate: true,
      headers: {
        acceptLanguage: language,
      },
    }).delete(apiEndpoints.private.customer.id.replace(":customerId", customerId));
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};
