import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
  } from "@tanstack/react-table"
  import { ChevronDown } from "lucide-react"
  import * as React from "react"

  import TransactionColumns from "@/components/custom/column/transaction-columns"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { useLanguage } from "@/hooks/use-language"
  import { TransactionDataTableProps } from "@/interface/blockchain"
  import { DataTableSkeleton } from "@/components/custom/layout/skeletons"

  export function TransactionDataTable({ transactions, tokens, loading, itemsPerPage }: TransactionDataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { languageData } = useLanguage()
    const columns = TransactionColumns({
      tokens,
      languageData,
    })
    const table = useReactTable({
      data: transactions,
      columns: columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
      initialState: {
        pagination: {
          pageSize: itemsPerPage,
        }
      }
    })

    return (
      <div className="w-full bg-muted-darker rounded-lg px-4 overflow-hidden max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full mx-auto shadow-xl border border-border">
        {loading ?
          <DataTableSkeleton length={6} /> :
          <>
            <div className="flex items-center py-4 justify-end gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-lg">
                    {languageData.TableLabels.columns}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id.replace(/_/g, " ").replace("id", "ID")}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-lg w-full">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full border rounded-lg">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </TableHead>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className={row.original.data ? "" : "grayscale"}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            {loading ?
                              languageData.TableLabels.loading :
                              languageData.TableLabels.noResults
                            }
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground lowercase">
                {table.getFilteredSelectedRowModel().rows.length}
                {" "}
                {languageData.TableLabels.of}
                {" "}
                {table.getFilteredRowModel().rows.length}
                {" "}
                {languageData.TableLabels.rowsSelected}
              </div>
            </div> */}
            <div className="p-2" />

          </>
        }
      </div>
    )
  }

  export default TransactionDataTable