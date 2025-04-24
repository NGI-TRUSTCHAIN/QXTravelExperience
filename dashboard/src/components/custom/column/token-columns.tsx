import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Token, TokenColumnProps } from "@/interface/blockchain"
import { formatDate3 } from "@/utils/format-date"
import { toast } from "@/hooks/use-sonner-toast"

export default function TokenColumns({
    networks,
    onNavigate,
    languageData,
}: TokenColumnProps
) {
    const columns: ColumnDef<Token>[] = [
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
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-2"
                    >
                        {languageData.TokenCardLabels.table.name}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="px-2">{row.getValue("name") ?? "N/A"}</div>,
        },
        {
            accessorKey: "network_id",
            header: `${languageData.TokenCardLabels.table.network}`,
            cell: ({ row }) => {
                const network = networks.find((network) => network.id === row.getValue("network_id"))
                return (
                    <div className="flex">
                        {network?.name ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "symbol",
            header: `${languageData.TokenCardLabels.table.symbol}`,
            cell: ({ row }) => {
                return (
                    <div className="flex">
                        {row.getValue("symbol") ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "total_supply",
            header: `${languageData.TokenCardLabels.table.totalSupply}`,
            cell: ({ row }) => {
                return (
                    <div className="flex">
                        {row.getValue("total_supply") ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "contract_address",
            header: `${languageData.TokenCardLabels.table.contractAddress}`,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                            {row.original.address ?? "N/A"}
                        </div>
                        {row.original.address && (
                            <Button 
                                variant="ghost" 
                                size="smIcon" 
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                    navigator.clipboard.writeText(row.original.address || "");
                                    toast({ title: "Address copied to clipboard" });
                                }}
                            >
                                <Copy className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: `${languageData.TokenCardLabels.table.createdAt}`,
            cell: ({ row }) => {
                return (
                    <div className="flex">
                        {formatDate3(row.getValue("created_at")) ?? "N/A"}
                    </div>
                )
            },
        },
        {
            accessorKey: "active",
            header: `${languageData.TableLabels.actions.status}`,
            cell: ({ row }) => {
                const isActive = row.getValue("active") ?? false;
                return (
                    <div className="">
                        <Badge variant={isActive ? "default" : "secondary"}>
                            {isActive ? languageData.TableLabels.actions.activate : languageData.TableLabels.actions.suspend}
                        </Badge>
                    </div>
                );
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
                            <DropdownMenuItem onClick={() => onNavigate(token)}>
                                {languageData.TableLabels.actions.view}
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