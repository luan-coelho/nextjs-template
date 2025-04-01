export interface Pagination {
  currentPage: number
  itemsPerPage: number
  itemsOnPage: number
  totalPages: number
  totalItems: number
}

export interface Pageable {
  page?: number
  size?: number
  sort?: string
  filters?: string
}

export interface DataPagination<T> {
  content: T[]
  pageable: {
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export const STANDARD_PAGE_SIZE = 25

export const DEFAULT_PAGEABLE = { page: 1, size: STANDARD_PAGE_SIZE, sort: "id:desc", filters: " " } as Pageable
