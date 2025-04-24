import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Transaction, TransactionColumnProps } from "@/interface/blockchain"
import { formatDate3 } from "@/utils/format-date"
import { toast } from "@/hooks/use-sonner-toast"

export default function TransactionColumns({
    tokens,
    languageData,
}: TransactionColumnProps
) {
    const columns: ColumnDef<Transaction>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label='Select all'
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label='Select row'
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        // {
        //     accessorKey: "id",
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //                 className="px-2"
        //             >
        //                 {languageData.NetworkCardLabels.table.id}
        //                 <ArrowUpDown className="ml-2 h-4 w-4" />
        //             </Button>
        //         )
        //     },
        //     cell: ({ row }) => <div className="px-2">{row.getValue("id")}</div>,
        // },
        {
            accessorKey: "tx_hash",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-2"
                    >
                        {languageData.TransactionCardLabels.table.txHash}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="px-2 max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">{row.getValue("tx_hash") ?? "N/A"}</div>,
        },
        {
            accessorKey: "token",
            header: `${languageData.TransactionCardLabels.table.token}`,
            cell: ({ row }) => {
                const token = tokens.find((token) => token.id === row.getValue("token"))
                return (
                    <div className="flex">
                        {token?.name ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "from_address",
            header: `${languageData.TransactionCardLabels.table.fromAddress}`,
            cell: ({ row }) => {
                return (
                    <div className="max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                        {row.getValue("from_address") ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "to_address",
            header: `${languageData.TransactionCardLabels.table.toAddress}`,
            cell: ({ row }) => {
                return (
                    <div className="max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                        {row.getValue("to_address") ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: `${languageData.TransactionCardLabels.table.createdAt}`,
            cell: ({ row }) => {
                return (
                    <div className="flex">
                        {formatDate3(row.getValue("created_at")) ?? "N/A"}
                    </div>
                )
            },
        },
        {
            id: "actions",
            header: `${languageData.TableLabels.actions.label}`,
            enableHiding: false,
            cell: ({ row }) => {
                const token = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">{languageData.TableLabels.actions.open}</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                {languageData.TableLabels.actions.label}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                toast({ title: "Copied to clipboard" })
                                navigator.clipboard.writeText(token.tx_hash)
                            }}>
                                {languageData.TransactionCardLabels.table.actions.copyTxHash}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => {
                                toast({ title: "Copied to clipboard" })
                                navigator.clipboard.writeText(token.from_address)
                            }}>
                                {languageData.TransactionCardLabels.table.actions.copyFromAddress}
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => {
                                toast({ title: "Copied to clipboard" })
                                navigator.clipboard.writeText(token.to_address)
                            }}>
                                {languageData.TransactionCardLabels.table.actions.copyToAddress}
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={() => onChangeActiveStatus(token)}>
                                {!token.active ?
                                    languageData.TableLabels.actions.activate :
                                    languageData.TableLabels.actions.suspend
                                }
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return columns
}