import { UseMutationResult } from "@tanstack/react-query"

export interface BreadcrumbContentItem {
  label: string
  href?: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export interface DataPagination<T> {
  content: T[]
  pagination: Pagination
}

export interface Pageable {
  page?: number
  size?: number
  sort?: string
}

export interface ApiError {
  type?: string
  title: string
  status: number
  detail: string
  instance?: string
}

export type SWRDataPaginationResponse<T> = {
  data: T[] | undefined
  error: any
  isLoading: boolean
  pagination: Pagination | undefined
  mutate: UseMutationResult<T, Error, void, unknown>
}

export const STANDARD_PAGE_SIZE = 25

export const PAGEABLE = { page: 1, size: STANDARD_PAGE_SIZE, sort: "id,desc" } as Pageable
