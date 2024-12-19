import React from "react"
import { routes } from "@/routes"
import { PAGEABLE } from "@/types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleDataTable from "@/components/features/modules/module-data-table"
import { CreateButtonLink } from "@/components/layout/create-button-link"
import PageTitle from "@/components/layout/page-title"

export default async function ModulesPage({
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const page = (await searchParams).page || PAGEABLE.page
  const size = (await searchParams).size || PAGEABLE.size
  const sort = (await searchParams).sort || PAGEABLE.sort
  const filters = (await searchParams).filters || PAGEABLE.filters
  const pageable = { page, size, sort, filters }
  console.log(pageable)

  return (
    <React.Fragment>
      <PageTitle>Módulos</PageTitle>
      <CreateButtonLink href={routes.modules.create} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Listagem</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModuleDataTable pageable={PAGEABLE} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
