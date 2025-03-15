'use client'

import { routes } from '@/routes'
import moduleService from '@/services/module-service'
import { ApiError, QueryResult } from '@/types'
import { Activity, CirclePower, Eye, Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { Module } from '@/types/model-types'
import { ActionButton, actionButtoncolorClasses } from '@/components/ui/action-button'
import DataTable, { DataTableColumn } from '@/components/ui/data-table/data-table'
import { TableCell, TableRow } from '@/components/ui/table'
import ToolTipButton from '@/components/ui/tool-tip-button'
import StatusBadge from '@/components/layout/status-badge'

const columns: DataTableColumn[] = [
    { title: 'Nome', field: 'name', position: 'left', className: 'w-4/6' },
    { title: 'Situação', field: 'active', position: 'center', className: 'w-1/6' },
    { title: 'Ações', position: 'center', className: 'w-1/6 text-center' },
]

export function ModuleDataTable({ queryResult }: { queryResult: QueryResult<Module> }) {
    const { data, pagination, mutate } = queryResult

    async function handleDelete(id: string) {
        try {
            await moduleService.deleteById(id)
            toast.success('Módulo deletado com sucesso.')
            await mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao deletar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    async function handleDisable(id: string) {
        try {
            await moduleService.disableById(id)
            toast.success('Módulo desativado com sucesso.')
            await mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao desativar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    async function handleActivate(id: string) {
        try {
            await moduleService.activateById(id)
            toast.success('Módulo ativado com sucesso.')
            await mutate()
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
            {data.map(module => (
                <TableRow key={module.id}>
                    <TableCell>{module.name}</TableCell>
                    <TableCell>
                        <div className="flex items-center justify-center gap-2">
                            <StatusBadge status={module.active} />
                        </div>
                    </TableCell>
                    <TableCell className="flex flex-row justify-center gap-2">
                        <ActionButton link={routes.modules.show(module.id)} color="blue" tooltip="Visualizar">
                            <Eye className="w-5" />
                        </ActionButton>
                        <ActionButton link={routes.modules.edit(module.id)} color="purple" tooltip="Editar">
                            <Pencil className="w-5" />
                        </ActionButton>
                        <ToolTipButton
                            onClick={() => handleDelete(module.id)}
                            className={actionButtoncolorClasses.red}
                            tooltipText="Deletar">
                            <Trash className="w-5" />
                        </ToolTipButton>
                        {module.active ? (
                            <ToolTipButton
                                onClick={() => handleDisable(module.id)}
                                className={actionButtoncolorClasses.red}
                                tooltipText="Desativar">
                                <CirclePower className="w-5" />
                            </ToolTipButton>
                        ) : (
                            <ToolTipButton
                                onClick={() => handleActivate(module.id)}
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
