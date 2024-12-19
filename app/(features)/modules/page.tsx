import React, { Suspense } from "react"
import { routes } from "@/routes"
import { DEFAULT_PAGEABLE } from "@/types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ModuleDataTable from "@/components/features/modules/module-data-table"
import { CreateButtonLink } from "@/components/layout/create-button-link"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default async function ModulesPage({
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const page = Number(queryParams.page || DEFAULT_PAGEABLE.page)
  const size = Number(queryParams.size || DEFAULT_PAGEABLE.size)
  const sort = queryParams.sort || DEFAULT_PAGEABLE.sort
  const filters = queryParams.filters || DEFAULT_PAGEABLE.filters
  const pageable = { page, size, sort, filters }

  return (
    <React.Fragment>
      <PageTitle>Módulos</PageTitle>
      <CreateButtonLink href={routes.modules.create} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Listagem</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<SpinnerLoading />}>
            <ModuleDataTable pageable={pageable} />
          </Suspense>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
