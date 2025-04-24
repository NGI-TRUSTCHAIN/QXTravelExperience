import { LocaleData } from "./language";
import { DataSetKeyEnum } from "./set";

export const Anonymous = "Anonymous";

export interface Customer {
  id: number;
  user_id: number;
  active: boolean;
  first_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  anonymous: boolean;
  phone_number: string | null;
  blockchain_address: string | null;
  reward_points: number;
  last_check_in: string | null;
  created_at: Date | string;
  updated_at: Date | string | null;
  gender?: string | null;
  email: string | null;
  birthday: string | null;
}

export interface CustomersState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    customers: Customer[] | null;
    setCustomers: (data: Customer[]) => void;
    updateCustomers: (data: Customer) => void;
    error: string | null;
    setError: (error: string) => void;
  }
export interface CustomerState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    customer: Customer | null;
    setCustomer: (data: Customer | null) => void;
    error: string | null;
    setError: (error: string) => void;
  }

export interface CustomerDataTableProps {
    customers: Customer[];
    customer: Customer | null;
    loading: boolean;
    onEdit: (item: Customer, dataSetKey: DataSetKeyEnum) => void;
    onChangeActiveStatus: (item: Customer, dataSetKey: DataSetKeyEnum) => void;
    itemsPerPage: number;
  }

  export interface CustomerColumnProps {
    onEdit: (item: Customer, dataSetKey: DataSetKeyEnum) => void,
    onChangeActiveStatus: (item: Customer, dataSetKey: DataSetKeyEnum) => void,
    languageData: LocaleData,
  }