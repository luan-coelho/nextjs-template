"use client"

import { revalidateTag } from "next/cache"
import { routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError, Pageable } from "@/types"
import { Activity, AlertCircle, CirclePower, Eye, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"

import { useModules } from "@/hooks/use-modules"
import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DataTable, { DataTableColumn } from "@/components/ui/data-table/data-table"
import { TableCell, TableRow } from "@/components/ui/table"
import ToolTipButton from "@/components/ui/tool-tip-button"
import StatusBadge from "@/components/layout/status-badge"

const columns: DataTableColumn[] = [
  { title: "Nome", field: "name", position: "left", className: "w-4/6" },
  { title: "Situação", field: "active", position: "center", className: "w-1/6" },
  { title: "Ações", position: "center", className: "w-1/6 text-center" },
]

export function ModuleDataTable({ pageable }: { pageable: Pageable }) {
  const { data, error, pagination } = useModules(pageable)

  if (error) {
    return (
      <Alert variant="destructive" className="rounded-none">
        <AlertCircle className="size-4" />
        <AlertTitle>Erro ao buscar módulos</AlertTitle>
        <AlertDescription>Motivo: {error}</AlertDescription>
      </Alert>
    )
  }

  async function handleDelete(id: string) {
    try {
      await menuItemService.deleteById(id)
      toast.success("Módulo deletado com sucesso.")
      revalidateTag("modules")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await menuItemService.disableById(id)
      toast.success("Módulo desativado com sucesso.")
      revalidateTag("modules")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await menuItemService.activateById(id)
      toast.success("Módulo ativado com sucesso.")
      revalidateTag("modules")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
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
