import { apiRoutes } from "@/routes"
import moduleService from "@/services/module-service"
import { DEFAULT_PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Module } from "@/types/model-types"

export function useModules(pageable: Pageable): SWRDataPaginationResponse<Module> {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: [apiRoutes.modules.index],
    queryFn: () => moduleService.fetchAllWithPagination(pageable || DEFAULT_PAGEABLE),
  })

  if (error) {
    error.message = "Falha ao buscar módulos"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || DEFAULT_PAGEABLE,
    mutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
      })
    },
  } as SWRDataPaginationResponse<Module>
}

export function useModule(id: string) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: [apiRoutes.modules.index, id],
    queryFn: () => moduleService.fetchById(id),
  })

  if (error) {
    error.message = "Falha ao buscar módulo"
  }

  return {
    data,
    error,
    isLoading,
    mutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index, id],
      })
    },
  }
}
