"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { useModule } from "@/hooks/use-modules"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function ShowModulePage() {
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  if (isLoading) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: "/modules" }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>

      <div className="flex items-center justify-end">
        <Link href="/modules/" className={buttonVariants()}>
          <ArrowLeft />
          Voltar
        </Link>
      </div>

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <span>Nome: </span>
              <span>{module?.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
