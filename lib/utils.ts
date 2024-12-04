import { PAGEABLE, Pageable } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
