import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function CreateModulePage() {
  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: "/modules" }, { label: "Criar módulo" }]} />
      <PageTitle>Criar módulo</PageTitle>
    </div>
  )
}
