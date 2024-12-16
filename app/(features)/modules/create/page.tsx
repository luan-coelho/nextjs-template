"use client"

import { useRouter } from "next/navigation"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleForm, { ModuleSchema } from "@/components/features/modules/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function CreateModulePage() {
  const router = useRouter()

  async function createModule(data: ModuleSchema) {
    try {
      await moduleService.create(data)
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
          <ModuleForm onSubmit={createModule} />
        </CardContent>
      </Card>
    </>
  )
}
