'use client'

import { useMemo } from 'react'
import { Service } from '@/services/service'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef, PaginationState } from '@tanstack/react-table'

import { sortByToState, stateToSortBy } from '@/lib/table-sort-mapper'
import { useFilters } from '@/hooks/use-filters'
import Table from '@/components/layout/table'

import { Button } from '../ui/button'

interface DataTableProps<T> {
    service: Service<T>
    queryKey: string
    columns: ColumnDef<T>[]
    defaultFilters?: Record<string, any>
    showResetFilter?: boolean
    showFilterCount?: boolean
}

export default function DataTable<T>({
    service,
    queryKey,
    columns,
    defaultFilters,
    showResetFilter = true,
    showFilterCount = true,
}: DataTableProps<T>) {
    const { filters, resetFilters, setFilters } = useFilters<any>(defaultFilters)

    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: () => service.fetchAllWithPagination(filters),
    })

    const paginationState: PaginationState = {
        pageIndex: (filters.pageIndex as number) ?? 1,
        pageSize: (filters.pageSize as number) ?? 10,
    }

    const sortingState = sortByToState(filters.sortBy as `${string}.asc` | `${string}.desc`)
    const memorizedColumns = useMemo(() => columns, [columns])

    return (
        <div className="flex flex-col gap-2 p-2">
            <Table
                data={data?.content ?? []}
                columns={memorizedColumns}
                pagination={paginationState}
                paginationOptions={{
                    onPaginationChange: pagination => {
                        setFilters(typeof pagination === 'function' ? pagination(paginationState) : pagination)
                    },
                    rowCount: data?.pagination.totalItems,
                }}
                filters={filters}
                onFilterChange={filters => setFilters(filters)}
                sorting={sortingState}
                onSortingChange={updaterOrValue => {
                    const newSortingState =
                        typeof updaterOrValue === 'function' ? updaterOrValue(sortingState) : updaterOrValue
                    return setFilters({ sortBy: stateToSortBy(newSortingState) })
                }}
            />

            <div className="flex items-center gap-2">
                {showFilterCount && data?.pagination.totalItems !== undefined && (
                    <span>{data.pagination.totalItems} itens encontrados</span>
                )}

                {showResetFilter && (
                    <Button
                        size="sm"
                        className="rounded border p-1 disabled:cursor-not-allowed disabled:text-gray-500"
                        onClick={resetFilters}
                        disabled={Object.keys(filters).length === 0}>
                        Resetar Filtros
                    </Button>
                )}
            </div>
        </div>
    )
}
