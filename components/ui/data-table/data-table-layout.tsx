// Este pode ser um Server Component
import { DataPagination } from '@/types'

import { DataTableColumn } from './data-table'
import DataTableClient from './data-table-client'
import { FilterConfig } from './data-table-filters'

type DataTableLayoutProps<T> = {
    dataPagination: DataPagination<T>
    columns?: DataTableColumn[]
    filterConfig?: FilterConfig
    children: React.ReactNode
}

// Componente que pode ser renderizado no servidor
export default function DataTableLayout<T>({
    dataPagination,
    columns,
    filterConfig,
    children,
}: DataTableLayoutProps<T>) {
    return (
        <DataTableClient dataPagination={dataPagination} columns={columns} filterConfig={filterConfig}>
            {children}
        </DataTableClient>
    )
}
