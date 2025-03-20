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

// Constantes movidas para fora do componente
const COLUMNS: DataTableColumn[] = [
    { title: 'Nome', field: 'name', position: 'left', className: 'w-4/6' },
    { title: 'Descrição', field: 'description', position: 'center', className: 'w-1/6' },
    { title: 'Situação', field: 'active', position: 'center', className: 'w-1/6' },
    { title: 'Ações', position: 'center', className: 'w-1/6 text-center' },
]

// Componente de ação do módulo para reduzir a complexidade
type ModuleActionProps = {
    module: Module
    onDelete: (id: string) => Promise<void>
    onDisable: (id: string) => Promise<void>
    onActivate: (id: string) => Promise<void>
}

function ModuleActions({ module, onDelete, onDisable, onActivate }: ModuleActionProps) {
    return (
        <div className="flex flex-row justify-center gap-2">
            <ActionButton link={routes.modules.show(module.id)} color="blue" tooltip="Visualizar">
                <Eye className="w-5" />
            </ActionButton>
            <ActionButton link={routes.modules.edit(module.id)} color="purple" tooltip="Editar">
                <Pencil className="w-5" />
            </ActionButton>
            <ToolTipButton
                onClick={() => onDelete(module.id)}
                className={actionButtoncolorClasses.red}
                tooltipText="Deletar">
                <Trash className="w-5" />
            </ToolTipButton>
            {module.active ? (
                <ToolTipButton
                    onClick={() => onDisable(module.id)}
                    className={actionButtoncolorClasses.red}
                    tooltipText="Desativar">
                    <CirclePower className="w-5" />
                </ToolTipButton>
            ) : (
                <ToolTipButton
                    onClick={() => onActivate(module.id)}
                    className={actionButtoncolorClasses.green}
                    tooltipText="Ativar">
                    <Activity className="w-5" />
                </ToolTipButton>
            )}
        </div>
    )
}

export function ModuleDataTable({ queryResult }: { queryResult: QueryResult<Module> }) {
    const { data, pagination, mutate } = queryResult

    // Funções de manipulação com tratamento de erros simplificado
    async function performModuleAction(action: (id: string) => Promise<any>, id: string, successMessage: string) {
        try {
            await action(id)
            toast.success(successMessage)
            await mutate()
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    // Handlers simplificados usando a função genérica
    const handleDelete = (id: string) =>
        performModuleAction(moduleService.deleteById, id, 'Módulo deletado com sucesso.')

    const handleDisable = (id: string) =>
        performModuleAction(moduleService.disableById, id, 'Módulo desativado com sucesso.')

    const handleActivate = (id: string) =>
        performModuleAction(moduleService.activateById, id, 'Módulo ativado com sucesso.')

    return (
        <DataTable
            dataPagination={{
                content: data,
                pagination: pagination,
            }}
            columns={COLUMNS}>
            {data.map(module => (
                <TableRow key={module.id}>
                    <TableCell>{module.name}</TableCell>
                    <TableCell>{module.description}</TableCell>
                    <TableCell>
                        <div className="flex items-center justify-center gap-2">
                            <StatusBadge status={module.active} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <ModuleActions
                            module={module}
                            onDelete={handleDelete}
                            onDisable={handleDisable}
                            onActivate={handleActivate}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </DataTable>
    )
}
