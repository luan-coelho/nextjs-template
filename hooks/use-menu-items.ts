import { apiRoutes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { MenuItem } from "@/types/model-types"

export function useMenuItems(pageable: Pageable): SWRDataPaginationResponse<MenuItem> {
  const { data, isLoading, error } = useQuery({
    queryKey: [apiRoutes.menuItems.index],
    queryFn: () => menuItemService.fetchAllWithPagination(pageable || PAGEABLE),
  })

  if (error) {
    error.message = "Falha ao buscar items de menu"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || PAGEABLE,
  } as SWRDataPaginationResponse<MenuItem>
}

export function useMenuItem(id: string) {
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
  }
}
