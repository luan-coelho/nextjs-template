import React, { createContext, ReactNode, useCallback, useContext, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SWRDataPaginationResponse } from "@/types"

interface DataTableContextType<T> {
  data: T[]
  setData: React.Dispatch<React.SetStateAction<T[]>>
  swrResponse: SWRDataPaginationResponse<T>
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (itemsPerPage: number) => void
  handleFilterChange: (filter: string) => void
  handleSortChange: (sort: string | null) => void
}

interface DataTableProviderProps<T> {
  children: ReactNode
  initialData?: T[]
  swrResponse: SWRDataPaginationResponse<T>
}

export const DataTableProvider = <T,>({ children, initialData = [], swrResponse }: DataTableProviderProps<T>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [data, setData] = useState<T[]>(initialData)

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
        data,
        setData,
        swrResponse,
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
