'use client'

import React from 'react'
import { routes } from '@/routes'
import menuItemService from '@/services/menu-item-service'
import { ApiError, Pageable } from '@/types'
import { Activity, AlertCircle, CirclePower, Eye, Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { useMenuItems } from '@/hooks/use-menu-items'
import { ActionButton, actionButtoncolorClasses } from '@/components/ui/action-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import DataTable, { DataTableColumn } from '@/components/ui/data-table/data-table'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { TableCell, TableRow } from '@/components/ui/table'
import ToolTipButton from '@/components/ui/tool-tip-button'
import StatusBadge from '@/components/layout/status-badge'

const columns: DataTableColumn[] = [
    { title: 'Label', field: 'label', position: 'left', className: 'w-2/12' },
    { title: 'Descrição', field: 'description', position: 'left', className: 'w-3/12' },
    { title: 'Rota', field: 'route', position: 'center', className: 'w-2/12' },
    { title: 'Ícone', field: 'icon', position: 'center', className: 'w-1/12', showSort: false },
    { title: 'Situação', field: 'active', position: 'center', className: 'w-2/12 text-center' },
    { title: 'Ações', position: 'center', className: 'w-2/12 text-center' },
]

export default function MenuItemDataTable({ pageable }: { pageable: Pageable }) {
    const { data, error, pagination, mutate } = useMenuItems(pageable)

    if (error) {
        return (
            <Alert variant="destructive" className="rounded-none">
                <AlertCircle className="size-4" />
                <AlertTitle>Erro ao buscar itens de menu</AlertTitle>
                <AlertDescription>Motivo: {error}</AlertDescription>
            </Alert>
        )
    }

    async function handleDelete(id: string) {
        try {
            await menuItemService.deleteById(id)
            toast.success('Item de menu deletado com sucesso.')
            mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao deletar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    async function handleDisable(id: string) {
        try {
            await menuItemService.disableById(id)
            toast.success('Item de menu desativado com sucesso.')
            mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao desativar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    async function handleActivate(id: string) {
        try {
            await menuItemService.activateById(id)
            toast.success('Item de menu ativado com sucesso.')
            mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao ativar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    return (
        <DataTable
            dataPagination={{
                content: data,
                pagination: pagination,
            }}
            columns={columns}>
            {data.map(menuItem => (
                <TableRow key={menuItem.id}>
                    <TableCell>{menuItem.label}</TableCell>
                    <TableCell>{menuItem.description || '-'}</TableCell>
                    <TableCell className="text-center">{menuItem.route}</TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <LucideIcon name={menuItem.icon} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center justify-center gap-2">
                            <StatusBadge status={menuItem.active} />
                        </div>
                    </TableCell>
                    <TableCell className="flex flex-row justify-center gap-2">
                        <ActionButton link={routes.menuItems.show(menuItem.id)} color="blue" tooltip="Visualizar">
                            <Eye className="w-5" />
                        </ActionButton>
                        <ActionButton link={routes.menuItems.edit(menuItem.id)} color="purple" tooltip="Editar">
                            <Pencil className="w-5" />
                        </ActionButton>
                        <ToolTipButton
                            onClick={() => handleDelete(menuItem.id)}
                            className={actionButtoncolorClasses.red}
                            tooltipText="Deletar">
                            <Trash className="w-5" />
                        </ToolTipButton>
                        {menuItem.active ? (
                            <ToolTipButton
                                onClick={() => handleDisable(menuItem.id)}
                                className={actionButtoncolorClasses.red}
                                tooltipText="Desativar">
                                <CirclePower className="w-5" />
                            </ToolTipButton>
                        ) : (
                            <ToolTipButton
                                onClick={() => handleActivate(menuItem.id)}
                                className={actionButtoncolorClasses.green}
                                tooltipText="Ativar">
                                <Activity className="w-5" />
                            </ToolTipButton>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </DataTable>
    )
}
