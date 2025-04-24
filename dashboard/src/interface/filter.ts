import { DataSet, DataSetKeyEnum } from "./set";

export interface UseFilterProps<T> {
  dataSets: DataSet<T>[];
  searchTerm: string;
  handleSearchFilter: (item: T, searchTerm: string, dataSetKey: DataSetKeyEnum) => boolean;
  handleTabFilter?: (item: T, dataSetKey: DataSetKeyEnum) => boolean;
}

export interface UseFilterResult<T> {
  filteredDataSets: DataSet<T>[];
  setSearchTerm: (newSearchTerm: string) => void;
  currentSearchTerm: string;
}

  export interface SearchNotFoundMessageProps {
    title: string;
    description?: string;
    action: () => void;
    actionTitle: string;
    hasSearch: boolean;
  }