import { BaseEntity, User } from "@/types/model-types"

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

export interface Revision<T extends BaseEntity> {
  id: number
  type: RevisionType
  date: Date
  user: User
  entity: T extends BaseEntity ? T : BaseEntity
}

export interface RevisionComparison<T extends BaseEntity> {
  revision: Revision<T>
  fieldChanges: FieldChange[]
}

interface FieldChange {
  name: string
  label: string
  oldValue: any
  newValue: any
  order: number
  subFieldChanges: FieldChange[]
}
