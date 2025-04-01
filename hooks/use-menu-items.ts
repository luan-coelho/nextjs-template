import { apiRoutes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { DEFAULT_PAGEABLE, Pageable, QueryResult } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { MenuItem } from "@/types/entities"

export function useMenuItems(pageable: Pageable): QueryResult<MenuItem> {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: [apiRoutes.menuItems.index],
    queryFn: () => menuItemService.fetchAllWithPagination(pageable || DEFAULT_PAGEABLE),
  })

  if (error) {
    error.message = "Falha ao buscar itens de menu"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || DEFAULT_PAGEABLE,
    mutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.menuItems.index],
      })
    },
  } as QueryResult<MenuItem>
}

export function useMenuItem(id: string) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: [apiRoutes.menuItems.index, id],
    queryFn: () => menuItemService.fetchById(id),
  })

  if (error) {
    error.message = "Falha ao buscar item de menu"
  }

  return {
    data,
    error,
    isLoading,
    mutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.menuItems.index, id],
      })
    },
  }
}
