"use client"

import React, { Fragment } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { routes } from "@/routes"
import { PAGEABLE } from "@/types"

import { useModules } from "@/hooks/use-modules"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageTitle from "@/components/layout/page-title"
import ModuleDataTable from "@/app/(features)/modules/_components/module-data-table"

export default function ModulesPage() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || PAGEABLE.page
  const size = Number(searchParams.get("size")) || PAGEABLE.size
  const sort = searchParams.get("sort") || PAGEABLE.sort
  let filters = searchParams.get("filters") || PAGEABLE.filters
  if (filters?.trim()) {
    filters = encodeURIComponent(filters)
  }
  const swrResponse = useModules({ page, size, sort, filters })

  return (
    <Fragment>
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
    </Fragment>
  )
}
