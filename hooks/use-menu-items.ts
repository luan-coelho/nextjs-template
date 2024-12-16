import { apiRoutes } from "@/routes"
import { DataPagination, PAGEABLE, Pageable, SWRDataPaginationResponse } from "@/types"

import { MenuItem } from "@/types/backend-model"
import useNoCacheQuery from "@/lib/use-fetch"

export function useMenuItems(pageable: Pageable): SWRDataPaginationResponse<MenuItem> {
  const { page, size, sort, filters } = pageable || PAGEABLE
  const url = `${apiRoutes.menuItems.allWithPagination}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`

  const { data, isLoading, error, mutate } = useNoCacheQuery<DataPagination<MenuItem>>(url)

  if (error) {
    error.message = "Falha ao buscar items de menu"
  }

  return {
    data: data?.content || [],
    error,
    isLoading,
    pagination: data?.pagination || PAGEABLE,
    mutate,
  } as SWRDataPaginationResponse<MenuItem>
}

export function useMenuItem(id: string) {
  const { data, isLoading, error } = useNoCacheQuery<MenuItem>(apiRoutes.menuItems.show(id))

  if (error) {
    error.message = "Falha ao buscar item de menu"
  }

  return {
    data,
    error,
    isLoading,
  }
}
