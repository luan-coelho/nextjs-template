"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Eye, Pencil, Trash } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import apiClient from "@/lib/api-client"
import { cn } from "@/lib/utils"
import { useModules } from "@/hooks/use-users"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PageTitle from "@/components/layout/page-title"
import Paginator from "@/components/layout/pagination"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type FormData = z.infer<typeof schema>

export default function ModulesHome() {
  const [openRegistrationModal, setOpenRegistrationModal] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 0
  const size = Number(searchParams.get("size")) || 25
  const sort = searchParams.get("sort") ?? "id,desc"

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function handlePageChange(page: number) {
    router.push(pathname + "?" + createQueryString("page", page.toString()))
  }

  const { modules, isLoading, error, pagination, mutate } = useModules({ page, size, sort })

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    await apiClient.post("/module", data)
    toast.success("Módulo cadastrado com sucesso.")
    await mutate()
    setOpenRegistrationModal(false)
  }

  async function handleDelete(id: number) {
    await apiClient.delete(`/module/${id}`)
    toast.success("Módulo deletado com sucesso.")
    await mutate()
  }

  return (
    <>
      <PageTitle>Módulos</PageTitle>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem</CardTitle>
            <Dialog open={openRegistrationModal} onOpenChange={setOpenRegistrationModal}>
              <DialogTrigger asChild>
                <Button>Cadastrar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Módulo</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                  <form className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <Form.Field>
                        <Form.Label htmlFor="name">Nome</Form.Label>
                        <Form.TextField name="name" />
                        <Form.ErrorMessage field="name" />
                      </Form.Field>
                    </div>
                  </form>
                </FormProvider>
                <DialogFooter>
                  <Button onClick={form.handleSubmit(onSubmit)} className="w-full md:w-auto" type="submit">
                    Cadastrar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading...</p>}
          {error && (
            <Alert className="bg-red-500 text-white">
              <AlertCircle color="white" className="size-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription className="text-gray-200">{error.message}</AlertDescription>
            </Alert>
          )}
          {modules && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map(module => (
                    <TableRow key={module.id}>
                      <TableCell>{module.name}</TableCell>
                      <TableCell>
                        {module.active ? (
                          <Badge className="rounded bg-green-600 hover:bg-green-600">Ativado</Badge>
                        ) : (
                          <Badge className="bg-red-600 hover:bg-red-600"> Desativado</Badge>
                        )}
                      </TableCell>
                      <TableCell className="w-20">
                        <div className="flex gap-2">
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
                            href={`/modules/${module.id}`}>
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
                                  Esta ação não pode ser desfeita. Isso excluirá permanentemente este registro.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(module.id)}
                                  className="bg-red-500 hover:bg-red-600">
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Link href={`/modules/${module.id}`}></Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>
                      {!isLoading && pagination && (
                        <Paginator
                          currentPage={pagination.currentPage}
                          totalPages={pagination.totalPages}
                          onPageChange={page => handlePageChange(page)}
                          showPreviousNext
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
