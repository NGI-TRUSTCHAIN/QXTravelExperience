export interface CurrencyPropsI {
    id: number;
    name: string;
    symbol: string;
}

export interface CurrencyState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currencies: CurrencyPropsI[] | null;
  setCurrencies: (data: CurrencyPropsI[]) => void;
  error: string | null;
  setError: (error: string) => void;
}
