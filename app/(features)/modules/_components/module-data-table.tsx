"use client"

import React, { useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ApiError, DataPagination, Pagination, SWRDataPaginationResponse } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash } from "lucide-react"
import { toast } from "sonner"

import apiClient from "@/lib/api-client"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { TableCell, TableFooter, TableRow } from "@/components/ui/table"
import Paginator from "@/components/layout/pagination"

type ModuleDataTableProps = {
  swrResponse: SWRDataPaginationResponse<DataPagination<Module>>
}

export default function ModuleDataTable({ swrResponse }: ModuleDataTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data, isLoading, pagination, mutate } = swrResponse

  const columns: ColumnDef<Module>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "active",
      header: "Situação",
      cell: ({ getValue }) => (
        <>
          {getValue.name ? (
            <Badge className="rounded bg-green-600 hover:bg-green-600">Ativado</Badge>
          ) : (
            <Badge className="bg-red-600 hover:bg-red-600">Desativado</Badge>
          )}
        </>
      ),
    },
    {
      id: "actions", // Use um ID para colunas sem dados específicos
      header: "Ações",
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
            <AlertDialog>
              <AlertDialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "icon",
                  }),
                  "rounded-full bg-red-500 hover:bg-red-600",
                )}>
                <Trash className="w-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>Você pode desativar ou deletar este registro.</span>
                    <p className="mt-2">
                      <strong>
                        Caso deseje deletar, esta ação não poderá ser desfeita. Isso excluirá permanentemente este
                        registro.
                      </strong>
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(module.id)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
                    )}>
                    Deletar
                  </AlertDialogAction>
                  <AlertDialogAction onClick={() => handleDelete(module.id)} className="bg-red-500 hover:bg-red-600">
                    Desativar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
      await apiClient.delete(`/module/${id}`)
      toast.success("Módulo deletado com sucesso.")
      await mutate(function (dataPagination): DataPagination<Module> {
        return {
          content: (dataPagination?.content || []).filter(
            item => item.id !== id, // Remove o módulo com o ID correspondente
          ),
          pagination: dataPagination?.pagination || ({} as Pagination),
        }
      }, false)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao deletar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <>
      {!isLoading && data && <DataTable columns={columns} data={data} />}
      {!isLoading && pagination && pagination.totalPages > 1 && (
        <TableFooter>
          <TableRow>
            <TableCell className="mt-10" colSpan={12}>
              <Paginator
                className="my-1"
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={page => handlePageChange(page)}
                showPreviousNext
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  )
}