import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DEFAULT_PAGEABLE } from '@/types'

import { cleanEmptyParams } from '@/lib/clean-empty-params'

export function useFilters<T extends Record<string, any>>(defaultFilters?: T) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Converter params de string para o tipo apropriado
    const searchParamsEntries = Object.fromEntries(searchParams.entries())
    const parsedSearchParams: Record<string, any> = {}

    // Converter valores numéricos
    for (const [key, value] of Object.entries(searchParamsEntries)) {
        if (key === 'pageIndex' || key === 'pageSize') {
            parsedSearchParams[key] = value ? Number(value) : undefined
        } else {
            parsedSearchParams[key] = value
        }
    }

    const filters = {
        ...DEFAULT_PAGEABLE,
        ...(defaultFilters || {}),
        ...parsedSearchParams,
    } as T

    const setFilters = useCallback(
        (partialFilters: Partial<T>) => {
            const params = new URLSearchParams(searchParams.toString())

            const newParams = cleanEmptyParams({
                ...Object.fromEntries(params.entries()),
                ...partialFilters,
            })

            const queryString = new URLSearchParams(newParams).toString()
            router.push(`?${queryString}`)
        },
        [router, searchParams],
    )

    const resetFilters = useCallback(() => {
        // Usar os valores padrão ao invés de limpar completamente
        const defaultParams = new URLSearchParams()
        defaultParams.set('page', String(DEFAULT_PAGEABLE.page))
        defaultParams.set('size', String(DEFAULT_PAGEABLE.size))
        defaultParams.set('sort', DEFAULT_PAGEABLE.sort || '')

        if (defaultFilters) {
            Object.entries(defaultFilters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    defaultParams.set(key, String(value))
                }
            })
        }

        router.push(`?${defaultParams.toString()}`)
    }, [router, defaultFilters])

    return { filters, setFilters, resetFilters }
}
