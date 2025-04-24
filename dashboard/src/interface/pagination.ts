export interface UsePaginationProps<T> {
    items: T[];
    itemsPerPage?: number;
  }

  export interface UsePaginationResult<T> {
    currentPageItems: T[];
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    firstNumberOfPages: number
    childrenPerPage: number
    itemsPerRow: number
  }

  export interface PaginationComponentProps<T> {
    children: React.ReactNode;
    items: T[];
    // length: number;
    // itemsPerPage: number;
    hasSeperatePagination: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    displaySecondPagination: boolean
    firstNumberOfPages: number
    isSmallScreen: boolean
    loading: boolean
  }