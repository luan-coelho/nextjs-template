"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { DownloadIcon, Settings2 } from "lucide-react"

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
        className="rounded-sm"
        variant="outline"
        onClick={() =>
          exportTableToCSV<TData>(table, {
            filename: "modules",
            excludeColumns: ["actions"],
          })
        }>
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Exportar CSV
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="hidden rounded-sm lg:flex">
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
                  {column.columnDef.header?.toString()}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
