import { DateTime } from "@auth/core/providers/kakao"

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
  key?: string
  mutate: () => void | Promise<void>
}

export const STANDARD_PAGE_SIZE = 25

export const DEFAULT_PAGEABLE = { page: 1, size: STANDARD_PAGE_SIZE, sort: "id:desc", filters: " " } as Pageable

export enum RevisionType {
  ADD = "ADD",
  MOD = "MOD",
  DEL = "DEL",
}

export interface Revision<T> {
  revisionId: number
  revisionType: RevisionType
  revisionDate: Date
  username: string
  cpf: string
  entity: T
}
