import { DEFAULT_PAGEABLE, Pageable } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { MenuItem } from "@/types/model-types"
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
  const page = Number(searchParams.get("page")) || DEFAULT_PAGEABLE.page
  const size = Number(searchParams.get("size")) || DEFAULT_PAGEABLE.size
  const sort = searchParams.get("sort") || DEFAULT_PAGEABLE.sort
  let filters = searchParams.get("filters") || DEFAULT_PAGEABLE.filters
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

/**
 * Verifica se o CPF é válido
 * @param value CPF a ser validado
 */
export default function isValidCPF(value: string): boolean {
  // Remove todos os caracteres que não sejam números
  value = value.replace(/[^\d]+/g, "")

  // Se o CPF não tem 11 dígitos ou todos os dígitos são repetidos, o CPF é inválido
  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false
  }

  // Transforma de string para number[] com cada dígito sendo um número no array
  const digits = value.split("").map(el => +el)

  // Função que calcula o dígito verificador conforme a fórmula da Receita Federal
  function getVerifyingDigit(arr: number[]) {
    const reduced = arr.reduce((sum, digit, index) => sum + digit * (arr.length - index + 1), 0)
    return ((reduced * 10) % 11) % 10
  }

  // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
  return getVerifyingDigit(digits.slice(0, 9)) === digits[9] && getVerifyingDigit(digits.slice(0, 10)) === digits[10]
}
