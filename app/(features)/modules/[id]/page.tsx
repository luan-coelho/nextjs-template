"use client"

import React from "react"
import { useParams } from "next/navigation"
import { routes } from "@/routes"

import { orderMenuItems } from "@/lib/utils"
import { useModule } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import EmptyData from "@/components/empty-data"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"
import MenuItemDraggableList, { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export default function ShowModulePage() {
  const params = useParams<{ id: string }>()
  const { data: module, isLoading } = useModule(params.id)

  function getMenuItems() {
    if (!module == undefined || module.menuItems == undefined || module.menuItems.length == 0) {
      return <EmptyData>Nenhum item de menu encontrado</EmptyData>
    }

    const menuItemsOrder: MenuItemsOrder[] = JSON.parse(module.menuItemsOrder)
    const orderedMenuItems = orderMenuItems(module.menuItems, menuItemsOrder)
    return (
      <React.Fragment>
        <Separator className="my-4 sm:hidden" />
        <div className="form-group justify-center space-y-3">
          <Label className="text-center">Itens de menu</Label>
          <MenuItemDraggableList module={module} initialMenuItems={orderedMenuItems} />
        </div>
      </React.Fragment>
    )
  }

  function getCardContent() {
    if (isLoading) {
      return <SpinnerLoading />
    }

    return (
      <div className="space-y-4">
        <div className="form-group">
          <Label>Nome</Label>
          <span>{module?.name}</span>
        </div>
        {getMenuItems()}
      </div>
    )
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Módulos", href: routes.modules.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Módulo</PageTitle>
      <ButtonBack href={routes.modules.index} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">Módulo</CardTitle>
        </CardHeader>
        <CardContent>{getCardContent()}</CardContent>
      </Card>
    </div>
  )
}
