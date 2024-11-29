import { Pageable } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildQueryParams(pageable: Pageable): string {
  const page = pageable?.page || 0
  const size = pageable?.size || 25
  const sort = pageable?.sort || "id,desc"

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
