import {
  ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { StatusBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Customer, CustomerColumnProps } from "@/interface/customer"
import { DataSetKeyEnum } from "@/interface/set"
import { toast } from "@/hooks/use-sonner-toast"

export default function CustomerColumns({
  onEdit,
  onChangeActiveStatus,
  languageData,
}: CustomerColumnProps
) {
  const columns: ColumnDef<Customer>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label='Select all'
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label='Select row'
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-2"
          >
            {languageData.NetworkCardLabels.table.id}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="px-2">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-2"
          >
            {languageData.CustomerCardLabels.table.firstName}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="px-2">{row.getValue("first_name") ?? "N/A"}</div>,
    },
    {
      accessorKey: "last_name",
      header: `${languageData.CustomerCardLabels.table.lastName}`,
      cell: ({ row }) => <div>{row.getValue("last_name") ?? "N/A"}</div>,
    },
    {
      accessorKey: "phone_number",
      header: `${languageData.CustomerCardLabels.table.phoneNumber}`,
      cell: ({ row }) => <div>{row.getValue("phone_number") ?? "N/A"}</div>,
    },
    {
      accessorKey: "blockchain_address",
      header: `${languageData.CustomerCardLabels.table.blockchainAddress}`,
      cell: ({ row }) => <div className="max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">{row.getValue("blockchain_address") ?? "N/A"}</div>,
    },
    {
      accessorKey: "reward_points",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-2"
          >
            {languageData.CustomerCardLabels.table.rewardPoints}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="px-2">{row.getValue("reward_points")}</div>,
    },
    {
      accessorKey: "last_check_in",
      header: `${languageData.CustomerCardLabels.table.lastCheckIn}`,
      cell: ({ row }) => <div>{row.getValue("last_check_in") ? new Date(row.getValue("last_check_in")).toLocaleDateString("en-GB") : "N/A"}</div>,
    },
    {
      accessorKey: "active",
      header: `${languageData.CustomerCardLabels.table.status}`,
     cell: ({ row }) => <div className=""><StatusBadge active={row.getValue("active") ?? false} /></div>,
    },
    {
      id: "actions",
      header: `${languageData.CustomerCardLabels.table.actions.label}`,
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{languageData.CustomerCardLabels.table.actions.open}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {languageData.CustomerCardLabels.table.actions.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                toast({ title: "Copied to clipboard" })
                navigator.clipboard.writeText(customer.blockchain_address ?? "")
                }}>
                {languageData.CustomerCardLabels.table.actions.copy}
              </DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => onEdit(customer, DataSetKeyEnum.customer)}>
              {languageData.CustomerCardLabels.table.actions.edit}
            </DropdownMenuItem>
            <DropdownMenuItem disabled onClick={() => onChangeActiveStatus(customer, DataSetKeyEnum.customer)}>
              {!customer.active ?
                languageData.TableLabels.actions.activate :
                languageData.TableLabels.actions.suspend
              }
            </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu >
        )
},
    },
  ]

return columns
}