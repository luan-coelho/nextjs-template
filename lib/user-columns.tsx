import { ColumnDef, RowData } from '@tanstack/react-table'

import { NaturalPerson } from '@/types/model-types'

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData
        filterVariant?: 'text' | 'number'
    }
}

export const USER_COLUMNS: ColumnDef<NaturalPerson>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'name',
        header: () => <span>Nome</span>,
        meta: { filterKey: 'user.name' },
    },
    {
        accessorKey: 'surname',
        header: () => <span>Sobrenome</span>,
        meta: { filterKey: 'user.surname' },
    },
    {
        accessorKey: 'email',
        header: () => 'Email',
        meta: { filterKey: 'user.email' },
    },
]
