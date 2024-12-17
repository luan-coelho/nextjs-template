import { PAGEABLE, Pageable } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { MenuItem } from "@/types/backend-model"
import { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryParams({ page, size, sort }: Pageable): string {
  const params = new URLSearchParams()
  if (page) {
    params.append("page", page.toString())
  }
  if (size) {
    params.append("size", size.toString())
  }
  if (sort) {
    params.append("sort", sort)
  }
  return params.toString()
}

export function extractPaginationQueryParams(searchParams: URLSearchParams): Pageable {
  const page = Number(searchParams.get("page")) || PAGEABLE.page
  const size = Number(searchParams.get("size")) || PAGEABLE.size
  const sort = searchParams.get("sort") || PAGEABLE.sort
  let filters = searchParams.get("filters") || PAGEABLE.filters
  if (filters?.trim()) {
    filters = encodeURIComponent(filters)
  }
  return { page, size, sort, filters } as Pageable
}

/**
 * Ordena os itens de menu conforme a ordem definida na configuração do módulo
 * @param menuItems
 * @param menuItemsOrder
 */
export function orderMenuItems(menuItems: MenuItem[], menuItemsOrder: MenuItemsOrder[]): MenuItem[] {
  if (!menuItems || !menuItemsOrder) {
    return []
  }

  if (!menuItemsOrder.length) {
    return menuItems
  }

  const orderMap = new Map(menuItemsOrder.map(item => [item.menuItemId, item.order]))
  return [...menuItems].sort((a, b) => {
    const orderA = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER
    const orderB = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER
    return orderA - orderB
  })
}
