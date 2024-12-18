import moduleService from "@/services/module-service"
import { PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { Module } from "@/types/model-types"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  const { data, isLoading, error } = useQuery({
    queryKey: ["modules"],
    queryFn: () => moduleService.fetchAllWithPagination(pageable || PAGEABLE),
  })

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
    queryKey: ["module"],
    queryFn: () => moduleService.fetchById(id),
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
