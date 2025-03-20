'use client'

import React, { createContext, ReactNode, useCallback, useContext } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DataPagination } from '@/types'

interface DataTableContextType<T> {
    dataPagination: DataPagination<T>
    handlePageChange: (page: number) => void
    handleItemsPerPageChange: (itemsPerPage: number) => void
    handleFilterChange: (filter: string) => void
    handleSortChange: (sort: string | null) => void
}

interface DataTableProviderProps<T> {
    dataPagination: DataPagination<T>
    children: ReactNode
}

// Contexto com tipo genérico mais explícito
const DataTableContext = createContext<DataTableContextType<any> | undefined>(undefined)

export function useDataTableContext<T>(): DataTableContextType<T> {
    const context = useContext(DataTableContext)
    if (!context) {
        throw new Error('useDataTableContext deve ser usado dentro de um DataTableProvider')
    }
    return context as DataTableContextType<T>
}

export const DataTableProvider = <T,>({ children, dataPagination }: DataTableProviderProps<T>) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Função utilitária para criar strings de consulta
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams],
    )

    // Função para navegar com a nova string de consulta
    const navigateWithParams = useCallback(
        (name: string, value: string | null) => {
            if (value === null) {
                const params = new URLSearchParams(searchParams.toString())
                params.delete(name)
                router.replace(`${pathname}?${params.toString()}`)
            } else {
                router.replace(`${pathname}?${createQueryString(name, value)}`)
            }
        },
        [createQueryString, pathname, router, searchParams],
    )

    // Handlers simplificados
    const handlePageChange = useCallback(
        (page: number) => navigateWithParams('page', page.toString()),
        [navigateWithParams],
    )

    const handleItemsPerPageChange = useCallback(
        (itemsPerPage: number) => navigateWithParams('size', itemsPerPage.toString()),
        [navigateWithParams],
    )

    const handleFilterChange = useCallback(
        (filter: string) => navigateWithParams('filters', filter),
        [navigateWithParams],
    )

    const handleSortChange = useCallback(
        (sort: string | null) => navigateWithParams('sort', sort),
        [navigateWithParams],
    )

    const contextValue = {
        dataPagination,
        handlePageChange,
        handleItemsPerPageChange,
        handleFilterChange,
        handleSortChange,
    }

    return <DataTableContext.Provider value={contextValue}>{children}</DataTableContext.Provider>
}
