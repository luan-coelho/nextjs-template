/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSIgnoredPromiseFromCall

import { useCallback, useEffect, useRef, useState } from "react"

import { fetcher } from "@/lib/api-client"

interface UseNoCacheQueryOptions {
  headers?: Record<string, string>
}

interface UseNoCacheQueryResult<T> {
  data: T
  error: Error | null
  isLoading: boolean
  mutate: () => void
}

function useNoCacheQuery<T>(url: string, options: UseNoCacheQueryOptions = {}): UseNoCacheQueryResult<T> {
  const [data, setData] = useState<T>({} as T)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const hasFetched = useRef(false)

  const fetchData = useCallback(async () => {
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
  }, [url, options.headers])

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchData()
    }
  }, [fetchData])

  const mutate = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, error, isLoading, mutate }
}

export default useNoCacheQuery
