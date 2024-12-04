"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Pageable } from "@/types"

import { extractPaginationQueryParams } from "@/lib/utils"
import { useModules } from "@/hooks/use-modules"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageTitle from "@/components/layout/page-title"
import ModuleDataTable from "@/app/(features)/modules/_components/module-data-table"

export default function ModulesPage() {
  const searchParams = useSearchParams()
  const pageable: Pageable = extractPaginationQueryParams(searchParams)
  const swrResponse = useModules(pageable)

  const { error } = swrResponse

  return (
    <>
      <PageTitle>Módulos</PageTitle>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem</CardTitle>
            <Link className={buttonVariants({ variant: "default" })} href="/modules/create">
              Novo módulo
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {error && <span className="mt-1 text-start text-sm text-red-500">{error.message}</span>}
          <ModuleDataTable swrResponse={swrResponse} />
        </CardContent>
      </Card>
    </>
  )
}
