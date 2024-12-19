import React from "react"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError, Pageable } from "@/types"
import { AlertCircle, Eye, Pencil } from "lucide-react"

import { ActionButton } from "@/components/ui/action-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DataTable, { DataTableColumn } from "@/components/ui/data-table/data-table"
import { TableCell, TableRow } from "@/components/ui/table"
import StatusBadge from "@/components/layout/status-badge"

const columns: DataTableColumn[] = [
  { title: "Nome", field: "name", position: "left", className: "w-4/6" },
  { title: "Situação", field: "active", position: "center", className: "w-1/6" },
  { title: "Ações", position: "center", className: "w-1/6 text-center" },
]

export default async function ModuleDataTable({ pageable }: { pageable: Pageable }) {
  let dataPagination
  try {
    dataPagination = await moduleService.fetchAllWithPagination(pageable, {
      next: { tags: ["modules"] },
    })
  } catch (error) {
    const apiError = error as ApiError
    return (
      <Alert variant="destructive" className="rounded-none">
        <AlertCircle className="size-4" />
        <AlertTitle>{apiError.title}</AlertTitle>
        <AlertDescription>
          Motivo: {apiError.detail} - Não foi possível buscar os módulos. Tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    )
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
