import moduleService from "@/services/module-service"
import { DataPagination, PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"
import useSWR from "swr"

import { fetcher } from "@/lib/api-client"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  if (!pageable) {
    pageable = PAGEABLE
  }
  const { page, size, sort, filters } = pageable
  const { data, isLoading, error } = useSWR<DataPagination<Module>>(
    `/module?page=${page}&size=${size}&sort=${sort}&filters=${filters}`,
    fetcher,
  )

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || PAGEABLE,
  } as SWRDataPaginationResponse<Module>
}

export function useModule(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["module", id],
    queryFn: () => moduleService.fetchModuleById(id),
  })

  if (error) {
    error.message = "Falha ao buscar módulo"
  }

  return {
    data,
    error,
    isLoading,
  }
}
