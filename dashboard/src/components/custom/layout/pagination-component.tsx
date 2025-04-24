import { PaginationSkeleton } from "@/components/custom/layout/skeletons"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationComponentProps } from "@/interface/pagination"

const PaginationComponent = <T,>({
    children,
    items,
    currentPage,
    totalPages,
    setCurrentPage,
    displaySecondPagination,
    hasSeperatePagination,
    // firstNumberOfPages,
    isSmallScreen,
    loading
}: PaginationComponentProps<T>) => {
    const renderPaginationItems = () => {
        const items: JSX.Element[] = []
        const totalVisibleItems = 7

        const addPageNumber = (pageNum: number) => {
            items.push(
                <PaginationItem key={pageNum} className={""}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === pageNum}
                        size={isSmallScreen ? "default" : "sm"}
                        onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(pageNum)
                        }}
                    >
                        {pageNum}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        const addEllipsis = () => {
            items.push(
                <PaginationItem key={`ellipsis-${items.length}`}>
                    <PaginationEllipsis />
                </PaginationItem>
            )
        }

        if (totalPages <= totalVisibleItems) {
            // If there are 7 or fewer pages, show all of them
            for (let i = 1; i <= totalPages; i++) {
                addPageNumber(i)
            }
        } else {
            // Always show first page
            addPageNumber(1)

            if (currentPage <= 4) {
                // Near the start
                for (let i = 2; i <= 5; i++) {
                    addPageNumber(i)
                }
                addEllipsis()
                addPageNumber(totalPages)
            } else if (currentPage >= totalPages - 3) {
                // Near the end
                addEllipsis()
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    addPageNumber(i)
                }
            } else {
                // Middle case
                addEllipsis()
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    addPageNumber(i)
                }
                addEllipsis()
                addPageNumber(totalPages)
            }
        }

        return items
    }

    const PaginationWrapper = () => (
        <div className="flex flex-col w-full justify-center items-center">
            {loading ?
                <PaginationSkeleton /> :
                items && items.length > 0 ?
                    <Pagination className="flex w-full">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    showText={isSmallScreen}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                                    }}
                                />
                            </PaginationItem>
                            {renderPaginationItems()}
                            <PaginationItem>
                                <PaginationNext
                                    showText={isSmallScreen}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination> :
                    null
            }
        </div>
    );

    return (
        <>
            {hasSeperatePagination ? children : (
                <div className="flex flex-col gap-6">
                    <PaginationWrapper />
                    {children}
                    {totalPages > 0 && displaySecondPagination ?
                        <PaginationWrapper />
                        : null
                    }
                </div>
            )
            }
        </>
    )
}

export default PaginationComponent