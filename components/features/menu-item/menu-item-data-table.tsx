"use client"

import React from "react"
import { routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"

import { MenuItem } from "@/types/backend-model"
import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Button } from "@/components/ui/button"
import DataTable, { DataTableColumn } from "@/components/ui/data-table/data-table"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/layout/status-badge"

type MenuItemDataTableProps = {
  swrResponse: SWRDataPaginationResponse<MenuItem>
}

const columns: DataTableColumn[] = [
  { title: "Label", field: "label", position: "left", className: "w-2/12" },
  { title: "Descrição", field: "description", position: "left", className: "w-4/12" },
  { title: "Rota", field: "route", position: "center", className: "w-2/12" },
  { title: "Situação", field: "active", position: "center", className: "w-2/12 text-center" },
  { title: "Ações", position: "center", className: "w-2/12 text-center" },
]

export default function MenuItemDataTable({ swrResponse }: MenuItemDataTableProps) {
  async function handleDelete(id: string) {
    try {
      await menuItemService.deleteById(id)
      toast.success("Item de menu deletado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await menuItemService.disableById(id)
      toast.success("Item de menu desativado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await menuItemService.activateById(id)
      toast.success("Item de menu ativado com sucesso.")
      swrResponse.mutate()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <DataTable swrResponse={swrResponse} columns={columns}>
      {swrResponse.data?.map(menuItem => (
        <TableRow key={menuItem.id}>
          <TableCell>{menuItem.label}</TableCell>
          <TableCell>{menuItem.description}</TableCell>
          <TableCell className="text-center">{menuItem.route}</TableCell>
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
            <ImprovedAlertDialog confirmAction={() => handleDelete(menuItem.id)} />
            {menuItem.active ? (
              <ImprovedAlertDialog
                confirmAction={() => handleDisable(menuItem.id)}
                confirmActionLabel="Desativar"
                icon={<CirclePower />}
                tooltip="Desativar"
                type="disable">
                <span>O Item de menu será desativado e deixará de ser exibido em outras partes do sistema.</span>
              </ImprovedAlertDialog>
            ) : (
              <Button
                variant="default"
                size="icon"
                className={actionButtoncolorClasses.green}
                onClick={() => handleActivate(menuItem.id)}>
                <Activity className="w-5" />
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
