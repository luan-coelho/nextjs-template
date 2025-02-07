import React, { Suspense } from "react"
import { routes } from "@/routes"
import moduleService from "@/services/module-service"

import { orderMenuItems } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import Revisions from "@/components/layout/revisions"
import SpinnerLoading from "@/components/layout/spinner-loading"
import MenuItemDraggableList, { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export default async function ShowModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const modulez = await moduleService.fetchById(id)
  const revisions = await moduleService.fetchAllRevisions(id)

  function getMenuItems() {
    if (modulez.menuItemsOrder) {
      const menuItemsOrder: MenuItemsOrder[] = JSON.parse(modulez.menuItemsOrder)
      modulez.menuItems = orderMenuItems(modulez.menuItems, menuItemsOrder)
    }

    return <MenuItemDraggableList module={modulez} />
  }

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>
      <ButtonBack href={routes.modules.index} />

      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Módulo</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SpinnerLoading />}>{getMenuItems()}</Suspense>
        </CardContent>
      </Card>

      <Suspense fallback={<SpinnerLoading />}>
        <Revisions revisions={revisions} />
      </Suspense>
    </React.Fragment>
  )
}
