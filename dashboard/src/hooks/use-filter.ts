import { UseFilterProps, UseFilterResult } from "@/interface/filter";
import React from "react";

const useFilter = <T,>({
  dataSets,
  searchTerm,
  handleSearchFilter,
  handleTabFilter,
}: UseFilterProps<T>): UseFilterResult<T> => {
  const [currentSearchTerm, setCurrentSearchTerm] = React.useState<string>(searchTerm);

  const filteredDataSets = React.useMemo(() => {
    return dataSets.map(dataSet => ({
      key: dataSet.key,
      items: dataSet.items.filter(item => {
        const matchesSearchTerm = handleSearchFilter(item, currentSearchTerm, dataSet.key);
        const matchesAdditionalFilter = handleTabFilter ? handleTabFilter(item, dataSet.key) : true;
        return matchesSearchTerm && matchesAdditionalFilter;
      }),
      loading: dataSet.loading,
      isComponent: dataSet.isComponent,
      separatePagination: dataSet.separatePagination,
    }));
  }, [dataSets, currentSearchTerm, handleSearchFilter, handleTabFilter]);

  const setSearchTerm = React.useCallback((newSearchTerm: string) => {
    setCurrentSearchTerm(newSearchTerm);
  }, []);

  return {
    filteredDataSets,
    setSearchTerm,
    currentSearchTerm,
  };
};

export default useFilter;
