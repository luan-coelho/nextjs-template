"use client"

import { useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BreadcrumbContentItem } from "@/types"

import { cn } from "@/lib/utils"
import { useModules } from "@/hooks/use-users"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import Paginator from "@/components/layout/pagination"

export default function ModulesHome() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 0
  const size = Number(searchParams.get("size")) || 25
  const sort = searchParams.get("sort") ?? "id,desc"

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function handlePageChange(page: number) {
    router.push(pathname + "?" + createQueryString("page", page.toString()))
  }

  const { modules, isLoading, error, pagination } = useModules({ page, size, sort })

  return (
    <>
      <PageTitle>Módulos</PageTitle>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem</CardTitle>
            <Link href="/modules/create" className={cn(buttonVariants({ variant: "default" }))}>
              Criar Módulo
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {modules && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map(module => (
                    <TableRow key={module.id}>
                      <TableCell>{module.name}</TableCell>
                      <TableCell className="w-1/4">
                        {module.active ? (
                          <Badge className="rounded bg-green-600 hover:bg-green-600">Ativado</Badge>
                        ) : (
                          <Badge className="bg-red-600 hover:bg-red-600"> Desativado</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>
                      {!isLoading && pagination && (
                        <Paginator
                          currentPage={pagination.currentPage}
                          totalPages={pagination.totalPages}
                          onPageChange={page => handlePageChange(page)}
                          showPreviousNext
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
