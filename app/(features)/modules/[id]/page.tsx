"use client"

import React from "react"
import { useParams } from "next/navigation"

import { useModule } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default function ShowModulePage() {
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: "/modules" }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>
      <ButtonBack href={"/modules"} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <SpinnerLoading />}
          {!isLoading && (
            <div>
              <span>Nome: </span>
              <span>{module?.name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
