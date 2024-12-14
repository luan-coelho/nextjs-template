import { Pageable } from "@/types"
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
