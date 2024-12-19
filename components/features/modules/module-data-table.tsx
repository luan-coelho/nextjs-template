import React from "react"
import { apiRoutes, routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError, DataPagination, Pageable } from "@/types"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"

import { Module } from "@/types/model-types"
import { fetcher } from "@/lib/api-client"
import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Button } from "@/components/ui/button"
import DataTable, { DataTableColumn } from "@/components/ui/data-table/data-table"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/layout/status-badge"

const columns: DataTableColumn[] = [
  { title: "Nome", field: "name", position: "left", className: "w-4/6" },
  { title: "Situação", field: "active", position: "center", className: "w-1/6" },
  { title: "Ações", position: "center", className: "w-1/6 text-center" },
]

export default async function ModuleDataTable({ pageable }: { pageable: Pageable }) {
  console.log(pageable)
  const dataPagination = await fetcher<DataPagination<Module>>(apiRoutes.modules.index, { next: { tags: ["modules"] } })

  async function handleDelete(id: string) {
    try {
      await moduleService.deleteById(id)
      toast.success("Módulo deletado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await moduleService.disableById(id)
      toast.success("Módulo desativado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await moduleService.activateById(id)
      toast.success("Módulo ativado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      console.log(error)
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <DataTable dataPagination={dataPagination} columns={columns}>
      {dataPagination.content.map(module => (
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
            {/*<ImprovedAlertDialog confirmAction={() => handleDelete(module.id)} />
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
            )}*/}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
