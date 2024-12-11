"use client"

import React, { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import moduleService from "@/services/module-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { Activity, AlertCircle, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"
import { mutate } from "swr"

import { ActionButton, actionButtoncolorClasses } from "@/components/ui/action-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/ui/table/table-pagination"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<Module>
}

export default function ModuleDataTable({
  swrResponse: { data, isLoading, pagination, error, key },
}: ModuleDataTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openDisableDialog, setOpenDisableDialog] = useState<boolean>(false)

  function handlePageChange(page: number) {
    router.replace(pathname + "?" + createQueryString("page", page.toString()))
  }

  function handleItemsPerPageChange(itemsPerPage: number) {
    router.replace(pathname + "?" + createQueryString("size", itemsPerPage.toString()))
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  async function handleDelete(id: string) {
    try {
      await moduleService.deleteModule(id)
      toast.success("Módulo deletado com sucesso.")
      await mutate(key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await moduleService.disableModule(id)
      toast.success("Módulo desativado com sucesso.")
      await mutate(key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await moduleService.activateModule(id)
      toast.success("Módulo ativado com sucesso.")
      await mutate(key)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      {!isLoading && data && (
        <React.Fragment>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4/6">Nome</TableHead>
                <TableHead className="w-1/6 text-center">Situação</TableHead>
                <TableHead className="w-1/6 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(module => (
                <TableRow key={module.id}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {module.active ? (
                        <Badge className="rounded-sm bg-green-500 hover:bg-green-500">Ativado</Badge>
                      ) : (
                        <Badge className="rounded-sm bg-red-500 hover:bg-red-500">Desativado</Badge>
                      )}
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
          </Table>
          {!isLoading && pagination.itemsOnPage === 0 && (
            <div className="mt-5 flex flex-col items-center justify-end px-2 md:flex-row">
              <div className="flex-1 text-sm text-muted-foreground">Nenhum registro encontrado</div>
            </div>
          )}
          <TablePagination
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            itemsOnPage={pagination.itemsOnPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            onPageChange={page => handlePageChange(page)}
            onItemsPerPageChange={itemsPerPage => handleItemsPerPageChange(itemsPerPage)}
          />
        </React.Fragment>
      )}
    </>
  )
}
