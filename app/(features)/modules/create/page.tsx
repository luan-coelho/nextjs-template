"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleForm, { ModuleSchema } from "@/components/features/modules/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function CreateModulePage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  async function createModule(data: ModuleSchema) {
    try {
      const createdModule = await moduleService.create(data)
      router.replace(routes.modules.show(createdModule.id))
      toast.success("Módulo cadastrado com sucesso.")
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Cadastrar" }]} />
      <PageTitle>Cadastrar Módulo</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <ModuleForm onSubmit={createModule} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
