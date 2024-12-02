"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import moduleService from "@/services/module-service"
import { DataPagination, STANDARD_PAGE_SIZE } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageTitle from "@/components/layout/page-title"
import ModuleDataTable from "@/app/(features)/modules/_components/module-data-table"

export default function ModulesPage() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 0
  const size = Number(searchParams.get("size")) || STANDARD_PAGE_SIZE
  const swrResponse = useQuery<DataPagination<Module>>({
    queryKey: ["modules"],
    queryFn: () => moduleService.fetchModules(page, size),
  })

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
          <ModuleDataTable swrResponse={swrResponse} />
        </CardContent>
      </Card>
    </>
  )
}
