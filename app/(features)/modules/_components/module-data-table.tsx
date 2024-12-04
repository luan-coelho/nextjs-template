"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import moduleService from "@/services/module-service"
import { ApiError, SWRDataPaginationResponse } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { Activity, CirclePower, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"

import { ExtendedColumnDef } from "@/types/types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/data-table"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import ImprovedAlertDialog from "@/components/ui/improved-alert-dialog"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<Module>
}

export default function ModuleDataTable({ swrResponse }: ModuleDataTableProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data, isLoading } = swrResponse
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openDisableDialog, setOpenDisableDialog] = useState<boolean>(false)

  const columns: ExtendedColumnDef<Module>[] = [
    {
      accessorKey: "name",
      backendAccessorKey: "name",
      headerLabel: "Nome",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      size: 6,
    },
    {
      accessorKey: "active",
      backendAccessorKey: "active",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Situação" />,
      headerLabel: "Situação",
      size: 4,
      cell: ({ row }) => (
        <>
          {row.original.active ? (
            <Badge className="rounded-sm bg-green-500 hover:bg-green-500">Ativado</Badge>
          ) : (
            <Badge className="rounded-sm bg-red-500 hover:bg-red-500">Desativado</Badge>
          )}
        </>
      ),
    },
    {
      id: "actions", // Use um ID para colunas sem dados específicos
      header: "Ações",
      size: 2,
      cell: ({ row }) => {
        const modulez = row.original // Dados da linha
        return (
          <div className="flex space-x-2">
            <Link
              className={cn(buttonVariants({ variant: "default", size: "icon" }), "rounded-full")}
              href={`/modules/${modulez.id}`}>
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
              href={`/modules/edit/${modulez.id}`}>
              <Pencil className="w-5" />
            </Link>
            <ImprovedAlertDialog
              open={openDeleteDialog}
              onOpenChange={setOpenDeleteDialog}
              confirmAction={() => handleDelete(modulez.id)}
            />
            {modulez.active ? (
              <ImprovedAlertDialog
                open={openDisableDialog}
                onOpenChange={setOpenDisableDialog}
                confirmAction={() => handleDisable(modulez.id)}
                confirmActionLabel="Desativar"
                icon={<CirclePower color="white" />}>
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
                onClick={() => handleActivate(modulez.id)}>
                <Activity className="w-5" />
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  function handlePageChange(page: number) {
    router.push(pathname + "?" + createQueryString("page", page.toString()))
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

  return <>{!isLoading && data && <DataTable columns={columns} data={data} />}</>
}
