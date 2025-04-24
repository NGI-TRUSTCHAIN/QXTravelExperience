import { Customer, CustomersState, CustomerState } from "@/interface/customer";
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "@/services/customer";
import React from "react";
import { create, registerStore } from "@/lib/store";
import { useLanguage } from "./use-language";
import { changeActiveStatus } from "@/services/generic";
import { apiEndpoints } from "@/constants/api-endpoints";
import { RoutesIdsEnum } from "@/constants/routes";

export const useCustomers = create<CustomersState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  customers: null,
  setCustomers: (customers) => set({ customers }),
  updateCustomers: (customer: Customer) => {
    set((state) => {
      if (!state.customers) return {};
      const updatedCustomers = state.customers.map((c) =>
        c.id === customer.id ? customer : c
      );
      if (!updatedCustomers.some((c) => c.id === customer.id)) {
        updatedCustomers.unshift(customer);
      }
      return { customers: updatedCustomers };
    });
  },
  error: null,
  setError: (error) => set({ error }),
}));

const useCustomer = create<CustomerState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  customer: null,
  setCustomer: (customer) => set({ customer }),
  error: null,
  setError: (error) => set({ error }),
}));

registerStore(useCustomers);
registerStore(useCustomer);

export const useFetchCustomers = () => {
  const {
    loading,
    setLoading,
    customers,
    setCustomers,
    updateCustomers,
    error,
    setError,
  } = useCustomers();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchCustomers = React.useCallback(async () => {
    if ((customers && language === prevLanguageRef.current) || loading || error)
      return;
    try {
      setLoading(true);
      const data = await getCustomers({ language });
      setCustomers(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching Customers"
      );
    } finally {
      setLoading(false);
    }
    prevLanguageRef.current = language;
  }, [setLoading, setCustomers, setError, customers, language, loading, error]);

  const updateActiveStatus = React.useCallback(
    async (customer: Customer) => {
      const data = await changeActiveStatus<Customer>({
        apiEndpoint: apiEndpoints.private.customer.id,
        id: customer.id,
        idPlaceholder: RoutesIdsEnum.customerId,
        body: { active: !customer.active },
      });
      updateCustomers(data);
    },
    [updateCustomers]
  );

  return {
    fetchCustomers,
    updateActiveStatus,
    loading,
    customers,
    error,
  };
};

export const useCustomerById = () => {
  const { loading, setLoading, customer, setCustomer, error, setError } =
    useCustomer();
  const { customers } = useCustomers();
  const { language } = useLanguage();
  const prevLanguageRef = React.useRef(language);

  const fetchCustomer = React.useCallback(
    async ({ customerId }: { customerId: string }) => {
      if (
        (customer &&
          customer.id === Number(customerId) &&
          language === prevLanguageRef.current) ||
        loading ||
        error
      )
        return;

      if (customers) {
        const customer = customers.find(
          (customer) => customer.id === Number(customerId)
        );
        if (customer) {
          setCustomer(customer);
          return;
        }
      }
      try {
        setLoading(true);
        const customerById = await getCustomerById({ customerId, language });
        setCustomer(customerById);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching Customer"
        );
      } finally {
        setLoading(false);
      }
      prevLanguageRef.current = language;
    },
    [
      setLoading,
      setCustomer,
      setError,
      customer,
      customers,
      language,
      loading,
      error,
    ]
  );

  const resetCustomer = React.useCallback(() => {
    if (customer) {
      setCustomer(null);
    }
  }, [customer, setCustomer]);

  return { fetchCustomer, resetCustomer, setCustomer, loading, customer, error };
};

export const useUploadCustomer = () => {
  const { language } = useLanguage();
  const { customers, setCustomers } = useCustomers();

  const uploadCustomer = React.useCallback(
    async ({
      initialData,
      body,
    }: {
      initialData: Customer | null;
      body: FormData;
    }) => {
      let data;
      if (initialData) {
        data = await updateCustomer({
          language,
          body,
          customerId: initialData.id.toString(),
        });
      } else {
        data = await createCustomer({ language, body });
      }
      if (customers && data) {
        const updatedCustomers = customers.map((customer) =>
          customer.id === data.id ? data : customer
        );
        if (!updatedCustomers.some((customer) => customer.id === data.id)) {
          updatedCustomers.unshift(data);
        }
        setCustomers(updatedCustomers);
      }
    },
    [customers, setCustomers, language]
  );

  return { uploadCustomer };
};

export const useDeleteCustomer = () => {
  const { language } = useLanguage();
  const { loading, error, customers, setCustomers } = useCustomers();

  const deleteCustomer = React.useCallback(
    async ({ customerId }: { customerId: string }) => {
      if (!customers || loading || error) return;
      await deleteCustomerById({
        language,
        customerId,
      });
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== Number(customerId)
      );
      setCustomers(updatedCustomers);
    },
    [customers, setCustomers, language, loading, error]
  );

  return { deleteCustomer };
};
