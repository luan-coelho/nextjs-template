import { routes } from "@/routes"
import moduleService from "@/services/module-service"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleForm from "@/components/features/modules/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const modulez = await moduleService.fetchById(id)

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Editar" }]} />
      <PageTitle>Editar módulo</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <ModuleForm module={modulez} />
        </CardContent>
      </Card>
    </div>
  )
}
