import React, { Suspense } from "react"
import Image from "next/image"
import ModuleImg from "@/public/images/module.png"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"

import { orderMenuItems } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyData from "@/components/empty-data"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"
import MenuItemDraggableList, { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export default async function ShowModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const revisions = await moduleService.fetchAllRevisions(id)

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>
      <ButtonBack href={routes.modules.index} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SpinnerLoading />}>
            <ModuleCardContent moduleId={id} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="mt-10">
        <CardHeader className="h-8 py-6">
          <CardTitle>Auditoria</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<SpinnerLoading />}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revisions.map(revision => (
                  <TableRow key={revision.revisionId}>
                    <TableCell className="font-medium">{revision.revisionId}</TableCell>
                    <TableCell>{revision.revisionType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Suspense>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

async function ModuleCardContent({ moduleId }: { moduleId: string }) {
  const modulez = await moduleService.fetchById(moduleId)

  function getMenuItems() {
    if (!modulez || !modulez.menuItems) {
      return <EmptyData>Nenhum item de menu encontrado</EmptyData>
    }

    if (modulez.menuItemsOrder) {
      const menuItemsOrder: MenuItemsOrder[] = JSON.parse(modulez.menuItemsOrder)
      modulez.menuItems = orderMenuItems(modulez.menuItems, menuItemsOrder)
    }

    return <MenuItemDraggableList module={modulez} />
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image src={ModuleImg} alt="Ícone de módulo" className="w-32" />
        <span className="text-xl font-medium">{modulez?.name}</span>
      </div>
      {getMenuItems()}
    </div>
  )
}
