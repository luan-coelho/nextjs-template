import { Pagination } from "./pagination"

export type QueryResult<T> = {
  data: T[]
  error: any
  isLoading: boolean
  pagination: Pagination
  key?: string
  mutate: () => void | Promise<void>
}
