import React, { createContext, ReactNode, useCallback, useContext } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DataPagination } from "@/types"

interface DataTableContextType<T> {
  dataPagination: DataPagination<T>
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (itemsPerPage: number) => void
  handleFilterChange: (filter: string) => void
  handleSortChange: (sort: string | null) => void
}

interface DataTableProviderProps<T> {
  dataPagination: DataPagination<T>
  children: ReactNode
}

export const DataTableProvider = <T,>({ children, dataPagination }: DataTableProviderProps<T>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handlePageChange(page: number) {
    router.replace(pathname + "?" + createQueryString("page", page.toString()))
  }

  function handleItemsPerPageChange(itemsPerPage: number) {
    router.replace(pathname + "?" + createQueryString("size", itemsPerPage.toString()))
  }

  function handleFilterChange(filter: string) {
    router.replace(pathname + "?" + createQueryString("filters", filter))
  }

  function handleSortChange(sort: string | null) {
    if (sort) {
      router.replace(pathname + "?" + createQueryString("sort", sort))
    } else {
      router.replace(pathname)
    }
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <DataTableContext.Provider
      value={{
        dataPagination,
        handlePageChange,
        handleItemsPerPageChange,
        handleFilterChange,
        handleSortChange,
      }}>
      {children}
    </DataTableContext.Provider>
  )
}

const DataTableContext = createContext<DataTableContextType<any> | undefined>(undefined)

export function useDataTableContext<T>(): DataTableContextType<T> {
  const context = useContext(DataTableContext)
  if (!context) {
    throw new Error("useDataTableContext deve ser usado dentro de um DataTableProvider")
  }
  return context as DataTableContextType<T>
}
