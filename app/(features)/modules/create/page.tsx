"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import routes from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type CreateModuleSchema = z.infer<typeof schema>

export default function CreateModulePage() {
  const router = useRouter()

  const form = useForm<CreateModuleSchema>({
    resolver: zodResolver(schema),
  })

  async function createModule(data: CreateModuleSchema) {
    try {
      await moduleService.createModule(data)
      toast.success("Módulo cadastrado com sucesso.")
      router.push(routes.modules.index)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Cadastrar" }]} />
      <PageTitle>Cadastrar módulo</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(createModule)} className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <Form.Field>
                  <Form.Label htmlFor="name">Nome</Form.Label>
                  <Form.TextField name="name" />
                  <Form.ErrorMessage field="name" />
                </Form.Field>
              </div>
              <div className="col-span-12 flex items-center justify-end gap-2">
                <Link className={buttonVariants({ variant: "secondary" })} href={routes.modules.index}>
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
    </>
  )
}
