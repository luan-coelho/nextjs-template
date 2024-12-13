"use client"

import React from "react"
import { DataTableProvider, useDataTableContext } from "@/contexts/data-table-context"
import { SWRDataPaginationResponse } from "@/types"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DataTableHeader from "@/components/ui/data-table/data-table-header"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import SpinnerLoading from "@/components/layout/spinner-loading"

type DataTableProps<T> = {
  swrResponse: SWRDataPaginationResponse<T>
  columns?: DataTableColumn[]
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
  children,
  columns,
}: DataTableProps<T>) {
  const { handlePageChange, handleItemsPerPageChange } = useDataTableContext<T>()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <React.Fragment>
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
        <div className="mt-5 flex flex-col items-center justify-end px-2 md:flex-row">
          <div className="flex-1 text-sm text-muted-foreground">Nenhum registro encontrado</div>
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

export default function DataTable<T>({ swrResponse, columns, children }: DataTableProps<T>) {
  const { data, pagination } = swrResponse
  return (
    <DataTableProvider<T> initialData={data} pagination={pagination}>
      <DataTableWithProvider<T> swrResponse={swrResponse} columns={columns}>
        {children}
      </DataTableWithProvider>
    </DataTableProvider>
  )
}
