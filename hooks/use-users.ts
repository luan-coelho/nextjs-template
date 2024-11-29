import { DataPagination, Pageable } from "@/types"
import useSWR from "swr"

import { fetcher } from "@/lib/api-client"
import { buildQueryParams } from "@/lib/utils"

export const useModules = (pageable?: Pageable) => {
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
    modules: data?.content,
    error,
    isLoading,
    pagination: data?.pagination,
    mutate,
  }
}
