import { DataPagination, Pageable, SWRDataPaginationResponse } from "@/types"
import useSWR from "swr"

import { fetcher } from "@/lib/api-client"
import { buildQueryParams } from "@/lib/utils"

export function useModules(pageable?: Pageable): SWRDataPaginationResponse<DataPagination<Module>> {
  if (!pageable) {
    pageable = { page: 0, size: 25 }
  }
  const queryParams = buildQueryParams(pageable)
  const { data, error, isLoading, mutate } = useSWR<DataPagination<Module>>(`/module?${queryParams}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content,
    error,
    isLoading,
    pagination: data?.pagination,
    mutate,
  } as SWRDataPaginationResponse<DataPagination<Module>>
}

export function useModule(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Module>(`/module/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) {
    error.message = "Falha ao buscar módulo"
  }

  return {
    module: data,
    error,
    isLoading,
    mutate,
  }
}
