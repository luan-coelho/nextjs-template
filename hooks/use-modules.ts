import moduleService from "@/services/module-service"
import { DataPagination, PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import useSWR from "swr"

import { fetcher } from "@/lib/api-client"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  if (!pageable) {
    pageable = PAGEABLE
  }
  const { page, size, sort, filters } = pageable
  const url = moduleService.getUrl()
  const urlKey = `${url}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`
  const { data, isLoading, error } = useSWR<DataPagination<Module>>(urlKey, fetcher)

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || PAGEABLE,
    key: urlKey,
  } as SWRDataPaginationResponse<Module>
}

export function useModule(id: string) {
  const url = moduleService.getUrl()
  const urlKey = `${url}/${id}`
  const { data, isLoading, error } = useSWR<Module>(urlKey, fetcher)

  if (error) {
    error.message = "Falha ao buscar módulo"
  }

  return {
    data,
    error,
    isLoading,
    key: urlKey,
  }
}
