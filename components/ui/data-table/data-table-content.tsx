'use client'

import React from 'react'
import { useDataTableContext } from '@/contexts/data-table-context'
import { DataPagination } from '@/types'

import FilterComponent, { FilterConfig } from '@/components/ui/data-table/data-table-filters'
import DataTableHeader from '@/components/ui/data-table/data-table-header'
import { DataTablePagination } from '@/components/ui/data-table/data-table-pagination'
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import EmptyData from '@/components/empty-data'

import { DataTableColumn } from './data-table'

type DataTableContentProps<T> = {
    dataPagination: DataPagination<T>
    columns?: DataTableColumn[]
    filterConfig?: FilterConfig
    children?: React.ReactNode
}

export function DataTableContent<T>({ columns, filterConfig, dataPagination, children }: DataTableContentProps<T>) {
    const { handlePageChange, handleItemsPerPageChange, handleFilterChange } = useDataTableContext<T>()

    const handleApplyFilters = (filters: { field: string; operation: string; value: string }[]) => {
        const queryParam = filters.map(filter => `${filter.field};${filter.operation};${filter.value}`).join(',')
        handleFilterChange(queryParam)
    }

    return (
        <>
            {filterConfig && <FilterComponent config={filterConfig} onApplyFilters={handleApplyFilters} />}
            <Table className="border-b border-gray-200">
                <TableHeader>
                    <TableRow>
                        {columns?.map((column, index) => (
                            <DataTableHeader
                                key={index}
                                className={column.className}
                                title={column.title}
                                field={column.field}
                                position={column.position}
                                showSort={column.showSort}
                            />
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>{children}</TableBody>
            </Table>
            {dataPagination.pagination.itemsOnPage === 0 && <EmptyData />}
            <DataTablePagination
                currentPage={dataPagination.pagination.currentPage}
                itemsPerPage={dataPagination.pagination.itemsPerPage}
                itemsOnPage={dataPagination.pagination.itemsOnPage}
                totalPages={dataPagination.pagination.totalPages}
                totalItems={dataPagination.pagination.totalItems}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        </>
    )
}
