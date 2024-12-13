"use client"

import React from "react"
import { useParams } from "next/navigation"
import routes from "@/routes"

import { useModule } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default function ShowModulePage() {
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>
      <ButtonBack href={routes.modules.index} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <SpinnerLoading />}
          {!isLoading && (
            <div className="form-group">
              <Label>Nome</Label>
              <span>{module?.name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
