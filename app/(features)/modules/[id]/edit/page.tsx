import React from "react"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleForm from "@/components/features/modules/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  const modulez = await moduleService.fetchById(id)
  console.log(modulez)

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Editar" }]} />
      <PageTitle>Editar Módulo</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <ModuleForm module={modulez} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
