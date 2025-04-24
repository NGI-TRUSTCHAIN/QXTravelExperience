export enum DataSetKeyEnum {
    token = "token",
    transaction = "transaction",
    network = "network",
    customer = "customer",
}

export interface ItemComponentProps<T> {
    items: T[];
    loading: boolean;
    onEdit: (item: T, dataSetKey: string) => void;
    onChangeActiveStatus: (item: T, dataSetKey: string) => void;
    itemsPerPage: number;
    dataSetKey: string;
  }

  export interface DataSet<T> {
    items: T[];
    key: DataSetKeyEnum;
    separatePagination: boolean;
    isComponent: boolean;
    loading: boolean;
  }