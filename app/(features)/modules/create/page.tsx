"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ApiError, DataPagination, Pagination } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import apiClient from "@/lib/api-client"
import { useModules } from "@/hooks/use-modules"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type FormData = z.infer<typeof schema>

export default function CreateModulePage() {
  const { mutate } = useModules()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      const modulez = await apiClient.post<Module>("/module", data)
      toast.success("Módulo cadastrado com sucesso.")
      await mutate(function (dataPagination): DataPagination<Module> {
        return {
          content: [...(dataPagination?.content || []), modulez!],
          pagination: dataPagination?.pagination || ({} as Pagination),
        }
      }, false)
      router.push("/modules")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: "/modules" }, { label: "Cadastrar" }]} />
      <PageTitle>Cadastrar módulo</PageTitle>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <Form.Field>
                  <Form.Label htmlFor="name">Nome</Form.Label>
                  <Form.TextField name="name" />
                  <Form.ErrorMessage field="name" />
                </Form.Field>
              </div>
              <div className="col-span-12 flex items-center justify-end gap-2">
                <Link className={buttonVariants({ variant: "secondary" })} href="/modules">
                  Cancelar
                </Link>
                <Button className="w-full md:w-auto" type="submit">
                  Cadastrar
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
