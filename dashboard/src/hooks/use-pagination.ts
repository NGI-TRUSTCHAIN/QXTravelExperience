import {
  UsePaginationProps,
  UsePaginationResult,
} from "@/interface/pagination";
import React from "react";
import { useMediaQuerySize } from "./use-media-query";

const usePagination = <T>({
  items,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationResult<T> => {
  const { isExtraLargeScreen, isLargeScreen, isMediumScreen, isSmallScreen } =
    useMediaQuerySize();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const getItemsPerPage = React.useCallback(() => {
    if (isExtraLargeScreen) return 12; // xl
    if (isLargeScreen) return 9; // lg
    if (isMediumScreen) return 8; // md
    return 6; // sm
  }, [isExtraLargeScreen, isLargeScreen, isMediumScreen]);

  const itemsPerPageMemo = React.useMemo(
    () => getItemsPerPage(),
    [getItemsPerPage]
  );

  const getFirstNumberOfPages = React.useCallback(() => {
    if (isExtraLargeScreen) return 12; // xl
    if (isLargeScreen) return 8; // lg
    if (isMediumScreen) return 6; // md
    if (isSmallScreen) return 5; // sm
    return 2; // xs
  }, [isExtraLargeScreen, isLargeScreen, isMediumScreen, isSmallScreen]);

  const firstNumberOfPagesMemo = React.useMemo(
    () => getFirstNumberOfPages(),
    [getFirstNumberOfPages]
  );

  const getItemsPerRow = React.useCallback(() => {
    if (isExtraLargeScreen) return 4; // xl
    if (isLargeScreen) return 3; // lg
    if (isMediumScreen) return 2; // md
    if (isSmallScreen) return 2; // sm
    return 1; // xs
  }, [isExtraLargeScreen, isLargeScreen, isMediumScreen, isSmallScreen]);

  const itemsPerRowMemo = React.useMemo(
    () => getItemsPerRow(),
    [getItemsPerRow]
  );

  const childrenPerPage = itemsPerPage ?? itemsPerPageMemo;

  const totalPages: number = Math.max(1, Math.ceil((items?.length || 0) / childrenPerPage));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const getCurrentPageItems = React.useCallback((): T[] => {
    if (!items || items.length === 0) return [];
    const startIndex = (currentPage - 1) * childrenPerPage;
    const endIndex = startIndex + childrenPerPage;
    return items.slice(startIndex, endIndex);
  }, [currentPage, items, childrenPerPage]);

  const currentPageItems: T[] = React.useMemo(
    () => getCurrentPageItems(),
    [getCurrentPageItems]
  );

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  return {
    currentPageItems,
    currentPage,
    totalPages,
    setCurrentPage,
    childrenPerPage,
    firstNumberOfPages: firstNumberOfPagesMemo,
    itemsPerRow: itemsPerRowMemo,
  };
};

export default usePagination;
