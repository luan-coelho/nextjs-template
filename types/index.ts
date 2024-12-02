import { KeyedMutator } from "swr"

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

export const STANDARD_PAGE_SIZE = 25

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
  data: Module[] | undefined
  error: any
  isLoading: boolean
  pagination: Pagination | undefined
  mutate: KeyedMutator<T>
}
