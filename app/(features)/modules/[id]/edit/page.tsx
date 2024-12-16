"use client"

import { useParams } from "next/navigation"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { toast } from "sonner"

import { useModule } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleForm, { ModuleSchema } from "@/components/features/modules/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default function EditModulePage() {
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  async function onUpdate(data: ModuleSchema) {
    try {
      await moduleService.updateById(params.id, data)
      toast.success("Módulo atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  function getContent() {
    if (isLoading) {
      return <SpinnerLoading />
    }
    if (!module) {
      return <span>Erro ao carregar módulo</span>
    }
    return <ModuleForm module={module} onSubmit={onUpdate} />
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Editar" }]} />
      <PageTitle>Editar módulo</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </div>
  )
}
