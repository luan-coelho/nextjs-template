import moduleService from "@/services/module-service"
import { PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { buildQueryParams } from "@/lib/utils"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  if (!pageable) {
    pageable = PAGEABLE
  }

  const queryParams = buildQueryParams(pageable)
  const { data, isLoading, error } = useQuery({
    queryKey: ["modules", queryParams],
    queryFn: () => moduleService.fetchModules(pageable.page, pageable.size),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content,
    error,
    isLoading,
    pagination: data?.pagination,
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
