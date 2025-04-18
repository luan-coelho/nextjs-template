'use client'

import React from 'react'
import { DataTableProvider } from '@/contexts/data-table-context'
import { DataPagination } from '@/types'

import { FilterConfig } from '@/components/ui/data-table/data-table-filters'

import { DataTableContent } from './data-table-content'

export type DataTableColumn = {
    title: string
    field?: string
    className?: string
    position?: 'left' | 'center' | 'right'
    showSort?: boolean
}

type DataTableProps<T> = {
    dataPagination: DataPagination<T>
    columns?: DataTableColumn[]
    filterConfig?: FilterConfig
    children?: React.ReactNode
}

// Componente principal
export default function DataTable<T>({ dataPagination, columns, filterConfig, children }: DataTableProps<T>) {
    return (
        <DataTableProvider<T> dataPagination={dataPagination}>
            <DataTableContent<T> dataPagination={dataPagination} columns={columns} filterConfig={filterConfig}>
                {children}
            </DataTableContent>
        </DataTableProvider>
    )
}
