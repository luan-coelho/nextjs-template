import { AccessorColumnDef, DisplayColumnDef, GroupColumnDef } from '@tanstack/react-table'
import { RowData } from '@tanstack/table-core/src/types'

export type ExtendedColumnDef<TData extends RowData, TValue = unknown> =
    | (DisplayColumnDef<TData, TValue> & { backendAccessorKey?: string; headerLabel?: string })
    | (GroupColumnDef<TData, TValue> & { backendAccessorKey?: string; headerLabel?: string })
    | (AccessorColumnDef<TData, TValue> & { backendAccessorKey?: string; headerLabel?: string })
