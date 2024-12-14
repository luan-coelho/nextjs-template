"use client"

import React from "react"
import Image from "next/image"
import { DataTableProvider, useDataTableContext } from "@/contexts/data-table-context"
import { SWRDataPaginationResponse } from "@/types"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import FilterComponent, { FilterConfig } from "@/components/ui/data-table/data-table-filters"
import DataTableHeader from "@/components/ui/data-table/data-table-header"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import SpinnerLoading from "@/components/layout/spinner-loading"

type DataTableProps<T> = {
  swrResponse: SWRDataPaginationResponse<T>
  columns?: DataTableColumn[]
  filterConfig: FilterConfig
  children?: React.ReactNode
}

export type DataTableColumn = {
  title: string
  field?: string
  className?: string
  position?: "left" | "center" | "right"
}

function DataTableWithProvider<T>({
  swrResponse: { isLoading, error, pagination },
  columns,
  filterConfig,
  children,
}: DataTableProps<T>) {
  const { handlePageChange, handleItemsPerPageChange, handleFilterChange } = useDataTableContext<T>()

  if (error) {
    return (
      <Alert variant="destructive" className="m-5 w-auto">
        <AlertCircle className="size-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    )
  }

  const handleApplyFilters = (filters: { field: string; operation: string; value: string }[]) => {
    const queryParam = filters.map(filter => `${filter.field};${filter.operation};${filter.value}`).join(",")
    handleFilterChange(queryParam)
  }

  return (
    <React.Fragment>
      <FilterComponent config={filterConfig} onApplyFilters={handleApplyFilters} />
      <Table className="border-b border-gray-200">
        <TableHeader>
          <TableRow>
            {columns?.map((column, index) => (
              <DataTableHeader
                key={index}
                className={column.className}
                title={column.title}
                field={column.field}
                position={column.position}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <SpinnerLoading />
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
      {!isLoading && pagination.itemsOnPage === 0 && (
        <div className="flex flex-col items-center justify-end gap-5 p-5 px-2">
          <Image src="images/no-data.svg" alt="Nenhum registro encontrado" width={100} height={100} />
          <div className="flex-1 text-center text-sm text-muted-foreground"> Nenhum registro encontrado</div>
        </div>
      )}
      <DataTablePagination
        currentPage={pagination.currentPage}
        itemsPerPage={pagination.itemsPerPage}
        itemsOnPage={pagination.itemsOnPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPageChange={page => handlePageChange(page)}
        onItemsPerPageChange={itemsPerPage => handleItemsPerPageChange(itemsPerPage)}
      />
    </React.Fragment>
  )
}

export default function DataTable<T>({ swrResponse, columns, filterConfig, children }: DataTableProps<T>) {
  const { data } = swrResponse
  return (
    <DataTableProvider<T> initialData={data} swrResponse={swrResponse}>
      <DataTableWithProvider<T> swrResponse={swrResponse} columns={columns} filterConfig={filterConfig}>
        {children}
      </DataTableWithProvider>
    </DataTableProvider>
  )
}
