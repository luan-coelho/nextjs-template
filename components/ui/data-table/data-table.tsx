"use client"

import React from "react"
import { DataTableProvider, useDataTableContext } from "@/contexts/data-table-context"
import { SWRDataPaginationResponse } from "@/types"
import { AlertCircle } from "lucide-react"
import { PulseLoader } from "react-spinners"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/ui/table/table-pagination"
import SpinnerLoading from "@/components/layout/spinner-loading"

type DataTableProps<T> = {
  swrResponse: SWRDataPaginationResponse<T>
  children?: React.ReactNode
}

function DataTableWithProvider<T>({ children, swrResponse: { isLoading, error, pagination } }: DataTableProps<T>) {
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
      <Table className="border border-gray-200">
        {isLoading && (
          <TableBody>
            <TableRow key={module.id}>
              <TableCell>
                <SpinnerLoading />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && children}
      </Table>
      {!isLoading && pagination.itemsOnPage === 0 && (
        <div className="mt-5 flex flex-col items-center justify-end px-2 md:flex-row">
          <div className="flex-1 text-sm text-muted-foreground">Nenhum registro encontrado</div>
        </div>
      )}
      <TablePagination
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

export default function DataTable<T>({ swrResponse, children }: DataTableProps<T>) {
  const { data, pagination } = swrResponse
  return (
    <DataTableProvider<T> initialData={data} pagination={pagination}>
      <DataTableWithProvider<T> swrResponse={swrResponse}>{children}</DataTableWithProvider>
    </DataTableProvider>
  )
}
