import { useCallback, useState } from "react"

import { fetcher } from "@/lib/api-client"

interface UseNoCacheQueryOptions {
  headers?: Record<string, string>
}

interface UseNoCacheQueryResult<T> {
  data: T
  error: Error | null
  isLoading: boolean
}

export default function useFetchs<T>(url: string, options: UseNoCacheQueryOptions = {}): UseNoCacheQueryResult<T> {
  const [data, setData] = useState<T>({} as T)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetcher<T>(url, options)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [url, options.headers])

  return { data, error, isLoading }
}
