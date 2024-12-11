"use client"

import React, { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SWRDataPaginationResponse } from "@/types"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table } from "@/components/ui/table"
import { TablePagination } from "@/components/ui/table/table-pagination"

type DataTableProps<T> = {
  swrResponse: SWRDataPaginationResponse<T>
  children?: React.ReactNode
}

export default function DataTable<T>({
  children,
  swrResponse: { data, isLoading, error, pagination },
}: DataTableProps<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handlePageChange(page: number) {
    router.replace(pathname + "?" + createQueryString("page", page.toString()))
  }

  function handleItemsPerPageChange(itemsPerPage: number) {
    router.replace(pathname + "?" + createQueryString("size", itemsPerPage.toString()))
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  if (isLoading) {
    return <span>Carregando...</span>
  }

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
      {data && (
        <React.Fragment>
          <Table>{children}</Table>
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
      )}
    </React.Fragment>
  )
}
