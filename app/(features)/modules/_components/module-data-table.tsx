"use client"

import React, { useState } from "react"
import moduleService from "@/services/module-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"
import { mutate } from "swr"

import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/data-table/data-table"
import DataTableHeader from "@/components/ui/data-table/data-table-header"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/layout/status-badge"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<Module>
}

export default function ModuleDataTable({ swrResponse }: ModuleDataTableProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openDisableDialog, setOpenDisableDialog] = useState<boolean>(false)

  async function handleDelete(id: string) {
    try {
      await moduleService.deleteModule(id)
      toast.success("Módulo deletado com sucesso.")
      await mutate(swrResponse.key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await moduleService.disableModule(id)
      toast.success("Módulo desativado com sucesso.")
      await mutate(swrResponse.key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await moduleService.activateModule(id)
      toast.success("Módulo ativado com sucesso.")
      await mutate(swrResponse.key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <DataTable swrResponse={swrResponse}>
      <TableHeader>
        <TableRow>
          <DataTableHeader className="w-4/6" title="Nome" field="name" />
          <DataTableHeader className="w-1/6" title="Situação" field="active" position="center" />
          <TableHead className="w-1/6 text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {swrResponse.data.map(module => (
          <TableRow key={module.id}>
            <TableCell>{module.name}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <StatusBadge status={module.active} />
              </div>
            </TableCell>
            <TableCell className="flex flex-row justify-center gap-2">
              <ActionButton link={`/modules/${module.id}`} color="blue" tooltip="Visualizar">
                <Eye className="w-5" />
              </ActionButton>
              <ActionButton link={`/modules/${module.id}/edit`} color="purple" tooltip="Editar">
                <Pencil className="w-5" />
              </ActionButton>
              <ImprovedAlertDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                confirmAction={() => handleDelete(module.id)}
              />
              {module.active ? (
                <ImprovedAlertDialog
                  open={openDisableDialog}
                  onOpenChange={setOpenDisableDialog}
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
      </TableBody>
    </DataTable>
  )
}
