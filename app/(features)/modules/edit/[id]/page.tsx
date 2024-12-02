"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ApiError, PAGEABLE } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import apiClient from "@/lib/api-client"
import { buildQueryParams } from "@/lib/utils"
import { useModule } from "@/hooks/use-modules"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type UpdateModule = z.infer<typeof schema>

export default function EditModulePage() {
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  const form = useForm<UpdateModule>({
    resolver: zodResolver(schema),
    defaultValues: module,
  })

  const { setValue } = form

  useEffect(() => {
    if (module) {
      Object.keys(module).forEach(key => {
        setValue(key as keyof UpdateModule, module[key as keyof UpdateModule])
      })
    }
  }, [module, setValue])

  async function onUpdate(data: UpdateModule) {
    try {
      await apiClient.put<Module>(`/module/${params.id}`, data)
      const queryParams = buildQueryParams(PAGEABLE)
      await queryClient.invalidateQueries({ queryKey: ["modules", queryParams] })
      toast.success("Módulo atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  if (isLoading) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: "/modules" }, { label: "Editar" }]} />
      <PageTitle>Editar módulo</PageTitle>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onUpdate)} className="grid grid-cols-12 gap-4">
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
                  Salvar
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
