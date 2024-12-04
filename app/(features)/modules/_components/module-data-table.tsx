"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import moduleService from "@/services/module-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/ui/table/table-pagination"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<Module>
}

export default function ModuleDataTable({ swrResponse: { data, isLoading, pagination } }: ModuleDataTableProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openDisableDialog, setOpenDisableDialog] = useState<boolean>(false)

  function handlePageChange(page: number) {
    router.push(pathname + "?" + createQueryString("page", page.toString()))
  }

  function handleItemsPerPageChange(itemsPerPage: number) {
    router.push(pathname + "?" + createQueryString("size", itemsPerPage.toString()))
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
      await queryClient.invalidateQueries({ queryKey: ["modules"] })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleDisable(id: string) {
    try {
      await moduleService.disableModule(id)
      toast.success("Módulo desativado com sucesso.")
      await queryClient.invalidateQueries({ queryKey: ["modules"] })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao desativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleActivate(id: string) {
    try {
      await moduleService.activateModule(id)
      toast.success("Módulo ativado com sucesso.")
      await queryClient.invalidateQueries({ queryKey: ["modules"] })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao ativar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <>
      {!isLoading && data && (
        <React.Fragment>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4/6">Nome</TableHead>
                <TableHead className="w-1/6">Situação</TableHead>
                <TableHead className="w-1/6 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(module => (
                <TableRow key={module.id}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>
                    {module.active ? (
                      <Badge className="rounded-sm bg-green-500 hover:bg-green-500">Ativado</Badge>
                    ) : (
                      <Badge className="rounded-sm bg-red-500 hover:bg-red-500">Desativado</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Link
                      className={cn(buttonVariants({ variant: "default", size: "icon" }), "rounded-full")}
                      href={`/modules/${module.id}`}>
                      <Eye className="w-5" />
                    </Link>
                    <Link
                      className={cn(
                        buttonVariants({
                          variant: "default",
                          size: "icon",
                        }),
                        "rounded-full bg-purple-500 hover:bg-purple-600",
                      )}
                      href={`/modules/edit/${module.id}`}>
                      <Pencil className="w-5" />
                    </Link>
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
                        icon={<CirclePower color="white" />}
                        tooltip="Desativar"
                        type="disable">
                        <span>O módulo será desativado e deixará de ser exibido em outras partes do sistema.</span>
                      </ImprovedAlertDialog>
                    ) : (
                      <Button
                        variant="default"
                        size="icon"
                        className={cn(
                          buttonVariants({
                            variant: "default",
                            size: "icon",
                          }),
                          "rounded-full bg-green-500 hover:bg-green-600",
                        )}
                        onClick={() => handleActivate(module.id)}>
                        <Activity className="w-5" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
