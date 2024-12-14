import { useEffect } from "react"
import { apiRoutes } from "@/routes"
import { DataPagination, PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"

import useNoCacheQuery from "@/lib/use-fetch"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  const { page, size, sort, filters } = pageable || PAGEABLE
  const url = `${apiRoutes.modules.index}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`

  const { data, isLoading, error, mutate } = useNoCacheQuery<DataPagination<Module>>(url)

  useEffect(() => {
    mutate()
  }, [page, size, sort, filters, mutate])

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || PAGEABLE,
    mutate,
  } as SWRDataPaginationResponse<Module>
}

export function useModule(id: string) {
  const { data, isLoading, error } = useNoCacheQuery<Module>(apiRoutes.modules.show(id))

  if (error) {
    error.message = "Falha ao buscar módulo"
  }

  return {
    data,
    error,
    isLoading,
  }
}
