"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { routes } from "@/routes"
import { Pageable } from "@/types"

import { extractPaginationQueryParams } from "@/lib/utils"
import { useModules } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleDataTable from "@/components/features/modules/module-data-table"
import { CreateButtonLink } from "@/components/layout/create-button-link"
import PageTitle from "@/components/layout/page-title"

export default function ModulesPage() {
  const searchParams = useSearchParams()
  const pageable: Pageable = extractPaginationQueryParams(searchParams)
  const swrResponse = useModules(pageable)

  return (
    <React.Fragment>
      <PageTitle>Módulos</PageTitle>
      <CreateButtonLink href={routes.modules.create} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Listagem</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModuleDataTable swrResponse={swrResponse} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
