import { UseMutationResult } from "@tanstack/react-query"

export interface BreadcrumbContentItem {
  label: string
  href?: string
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  itemsOnPage: number
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
  filters?: string
}

export interface ApiError {
  type?: string
  title: string
  status: number
  detail: string
  instance?: string
}

export type SWRDataPaginationResponse<T> = {
  data: T[]
  error: any
  isLoading: boolean
  pagination: Pagination
}

export const STANDARD_PAGE_SIZE = 25

export const PAGEABLE = { page: 1, size: STANDARD_PAGE_SIZE, sort: "id:desc", filters: " " } as Pageable
