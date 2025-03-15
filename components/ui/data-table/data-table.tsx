'use client'

import React from 'react'
import { DataTableProvider, useDataTableContext } from '@/contexts/data-table-context'
import { DataPagination } from '@/types'

import FilterComponent, { FilterConfig } from '@/components/ui/data-table/data-table-filters'
import DataTableHeader from '@/components/ui/data-table/data-table-header'
import { DataTablePagination } from '@/components/ui/data-table/data-table-pagination'
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import EmptyData from '@/components/empty-data'

type DataTableProps<T> = {
    dataPagination: DataPagination<T>
    columns?: DataTableColumn[]
    filterConfig?: FilterConfig
    children?: React.ReactNode
}

export type DataTableColumn = {
    title: string
    field?: string
    className?: string
    position?: 'left' | 'center' | 'right'
    showSort?: boolean
}

function DataTableWithProvider<T>({ columns, filterConfig, dataPagination, children }: DataTableProps<T>) {
    const { handlePageChange, handleItemsPerPageChange, handleFilterChange } = useDataTableContext<T>()

    const handleApplyFilters = (filters: { field: string; operation: string; value: string }[]) => {
        const queryParam = filters.map(filter => `${filter.field};${filter.operation};${filter.value}`).join(',')
        handleFilterChange(queryParam)
    }

    return (
        <React.Fragment>
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
                onPageChange={page => handlePageChange(page)}
                onItemsPerPageChange={itemsPerPage => handleItemsPerPageChange(itemsPerPage)}
            />
        </React.Fragment>
    )
}

export default function DataTable<T>({ dataPagination, columns, filterConfig, children }: DataTableProps<T>) {
    return (
        <DataTableProvider<T> dataPagination={dataPagination}>
            <DataTableWithProvider<T> dataPagination={dataPagination} columns={columns} filterConfig={filterConfig}>
                {children}
            </DataTableWithProvider>
        </DataTableProvider>
    )
}
