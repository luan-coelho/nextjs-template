'use client'

// Este precisa ser um Client Component devido à interatividade
import React from 'react'
import { DataTableProvider } from '@/contexts/data-table-context'
import { DataPagination } from '@/types'

import { DataTableColumn } from './data-table'
import { DataTableContent } from './data-table-content'
import { FilterConfig } from './data-table-filters'

type DataTableClientProps<T> = {
    dataPagination: DataPagination<T>
    columns?: DataTableColumn[]
    filterConfig?: FilterConfig
    children: React.ReactNode
}

export default function DataTableClient<T>({
    dataPagination,
    columns,
    filterConfig,
    children,
}: DataTableClientProps<T>) {
    return (
        <DataTableProvider<T> dataPagination={dataPagination}>
            <DataTableContent<T> dataPagination={dataPagination} columns={columns} filterConfig={filterConfig}>
                {children}
            </DataTableContent>
        </DataTableProvider>
    )
}
