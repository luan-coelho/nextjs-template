"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { DownloadIcon, Settings2 } from "lucide-react"

import { ExtendedColumnDef } from "@/types/types"
import { exportTableToCSV } from "@/lib/export-table-csv"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex space-x-2">
      <Button
        className="min-w-[130px] rounded-sm border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground"
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV<TData>(table, {
            filename: "modules",
            excludeColumns: ["actions"],
          })
        }>
        <DownloadIcon className="size-4" aria-hidden="true" />
        Exportar CSV
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="hidden w-[130px] rounded-sm border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground lg:flex"
            variant="outline"
            size="sm">
            <Settings2 />
            Visualizar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(column => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(value)}>
                  {(column.columnDef as ExtendedColumnDef<TData>).headerLabel}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
