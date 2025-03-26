import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    OnChangeFn,
    PaginationOptions,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as TableUI } from '@/components/ui/table'
import { DebouncedInput } from '@/components/layout/debounced-input'
import { Filters } from '@/app/types/types'

type Props<T> = {
    data: T[]
    columns: ColumnDef<T>[]
    pagination: PaginationState
    paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>
    filters: Filters<T>
    onFilterChange: (dataFilters: Partial<T>) => void
    sorting: SortingState
    onSortingChange: OnChangeFn<SortingState>
}

export default function Table<T>({
    data,
    columns,
    pagination,
    paginationOptions,
    filters,
    onFilterChange,
    sorting,
    onSortingChange,
}: Props<T>) {
    const table = useReactTable({
        data,
        columns,
        state: { pagination, sorting },
        onSortingChange,
        ...paginationOptions,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <TableUI className="border-b border-gray-200">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const fieldMeta = header.column.columnDef.meta
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'flex items-center gap-1 px-3 py-3 cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: <ArrowUpIcon className="size-4 text-black" />,
                                                        desc: <ArrowDownIcon className="size-4 text-black" />,
                                                        false: <ArrowUpDownIcon className="size-4 text-black" />,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {header.column.getCanFilter() && fieldMeta?.filterKey !== undefined ? (
                                                    <DebouncedInput
                                                        className="w-36 rounded border shadow"
                                                        onChange={value => {
                                                            onFilterChange({
                                                                [fieldMeta.filterKey as keyof T]: value,
                                                            } as Partial<T>)
                                                        }}
                                                        placeholder="Search..."
                                                        type={fieldMeta.filterVariant === 'number' ? 'number' : 'text'}
                                                        value={filters[fieldMeta.filterKey] as string}
                                                    />
                                                ) : null}
                                            </>
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </TableUI>
            <div className="my-2 flex items-center gap-2">
                <Button size="icon" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    <ChevronsLeftIcon />
                </Button>
                <Button size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeftIcon />
                </Button>
                <Button size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRightIcon />
                </Button>
                <Button
                    size="icon"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    <ChevronsRightIcon />
                </Button>
                <span className="flex items-center gap-1">
                    <div>Página</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    <div>Ir para a página:</div>
                    <input
                        type="number"
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="w-16 rounded border p-1"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}>
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Exibir {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
