"use client"

import { Table } from "@tanstack/react-table"
import { Activity, CheckCircle, Circle, CircleOff, CircleSlash2, HelpCircle, Timer, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: "Ativado",
    value: "true",
    icon: Activity,
  },
  {
    label: "Desativado",
    value: "false",
    icon: CircleSlash2,
  },
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-3 md:flex-row md:gap-0">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("name") && (
          <DataTableFacetedFilter column={table.getColumn("name")} title="Nome" options={statuses} />
        )}
        {table.getColumn("active") && (
          <DataTableFacetedFilter column={table.getColumn("active")} title="Situação" options={priorities} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Resetar
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
