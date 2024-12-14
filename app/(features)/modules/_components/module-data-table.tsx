"use client"

import React from "react"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"

import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Button } from "@/components/ui/button"
import DataTable, { DataTableColumn } from "@/components/ui/data-table/data-table"
import { FilterConfig, FilterOperationLabel } from "@/components/ui/data-table/data-table-filters"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/layout/status-badge"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<Module>
}

const columns: DataTableColumn[] = [
  { title: "Nome", field: "name", position: "left", className: "w-4/6" },
  { title: "Situação", field: "active", position: "center", className: "w-1/6" },
  { title: "Ações", position: "center", className: "w-1/6 text-center" },
]

const filterConfig: FilterConfig = {
  options: [
    {
      field: "name",
      label: "Nome",
      type: "string",
      operations: [
        { value: "eq", label: FilterOperationLabel.EQUALS },
        { value: "like", label: FilterOperationLabel.LIKE },
      ],
    },
    {
      field: "age",
      label: "Idade",
      type: "number",
      operations: [
        { value: "gt", label: FilterOperationLabel.GREATER_THAN },
        { value: "lt", label: FilterOperationLabel.LESS_THAN },
      ],
    },
    {
      field: "status",
      label: "Situação",
      type: "select",
      operations: [{ value: "eq", label: FilterOperationLabel.EQUALS }],
      options: [
        { value: "active", label: "Ativo" },
        { value: "inactive", label: "Desativado" },
      ],
    },
    {
      field: "createdAt",
      label: "Data de criação",
      type: "date",
      operations: [
        { value: "gt", label: FilterOperationLabel.GREATER_THAN },
        { value: "lt", label: FilterOperationLabel.LESS_THAN },
      ],
    },
  ],
}

export default function ModuleDataTable({ swrResponse }: ModuleDataTableProps) {
  async function handleDelete(id: string) {
    try {
      await moduleService.deleteModule(id)
      toast.success("Módulo deletado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await moduleService.disableModule(id)
      toast.success("Módulo desativado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await moduleService.activateModule(id)
      toast.success("Módulo ativado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <DataTable swrResponse={swrResponse} columns={columns} filterConfig={filterConfig}>
      {swrResponse.data.map(module => (
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
            <ImprovedAlertDialog confirmAction={() => handleDelete(module.id)} />
            {module.active ? (
              <ImprovedAlertDialog
                confirmAction={() => handleDisable(module.id)}
                confirmActionLabel="Desativar"
                icon={<CirclePower />}
                tooltip="Desativar"
                type="disable">
                <span>O módulo será desativado e deixará de ser exibido em outras partes do sistema.</span>
              </ImprovedAlertDialog>
            ) : (
              <Button
                variant="default"
                size="icon"
                className={actionButtoncolorClasses.green}
                onClick={() => handleActivate(module.id)}>
                <Activity className="w-5" />
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
