import { DataPagination } from "@/types"
import useSWR from "swr"

import { fetcher } from "@/lib/api"

export const useModules = () => {
  const { data, error, isLoading } = useSWR<DataPagination<Module>>("/module", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    modules: data?.content,
    error,
    isLoading,
    pagination: data?.pagination,
  }
}
