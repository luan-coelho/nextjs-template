import { useCallback, useState } from "react"

type FetcherFunction<T> = (...args: any[]) => Promise<T>

type UseFetchOptions = {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

type UseFetchResult<T, Args extends any[]> = {
  isLoading: boolean
  error: any | null
  data: T | null
  mutate: (...args: Args) => Promise<void>
}

export function useFetch<T = any, Args extends any[] = any[]>(
  key: string,
  fetcher: FetcherFunction<T>,
  options?: UseFetchOptions,
): UseFetchResult<T, Args> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const [data, setData] = useState<T | null>(null)

  const mutate = useCallback(
    async (...args: Args) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetcher(...args)
        setData(result)

        if (options?.onSuccess) {
          options.onSuccess(result)
        }
      } catch (err) {
        setError(err)
        if (options?.onError) {
          options.onError(err)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [fetcher, options],
  )

  return { isLoading, error, data, mutate }
}
