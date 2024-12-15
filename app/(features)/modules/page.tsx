"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { routes } from "@/routes"
import { Pageable } from "@/types"

import { extractPaginationQueryParams } from "@/lib/utils"
import { useModules } from "@/hooks/use-modules"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleDataTable from "@/components/features/modules/module-data-table"
import PageTitle from "@/components/layout/page-title"

export default function ModulesPage() {
  const searchParams = useSearchParams()
  const pageable: Pageable = extractPaginationQueryParams(searchParams)
  const swrResponse = useModules(pageable)

  return (
    <React.Fragment>
      <PageTitle>Módulos</PageTitle>
      <div className="flex items-center justify-end">
        <Link className={buttonVariants({ variant: "default" })} href={routes.modules.create}>
          Novo módulo
        </Link>
      </div>

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
