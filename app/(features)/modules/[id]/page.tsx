"use client"

import React from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import ModuleImg from "@/public/images/module.png"
import { routes } from "@/routes"

import { orderMenuItems } from "@/lib/utils"
import { useModule } from "@/hooks/use-modules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    if (!module || !module.menuItems) {
      return <EmptyData>Nenhum item de menu encontrado</EmptyData>
    }

    if (module.menuItemsOrder) {
      const menuItemsOrder: MenuItemsOrder[] = JSON.parse(module.menuItemsOrder)
      module.menuItems = orderMenuItems(module.menuItems, menuItemsOrder)
    }

    return <MenuItemDraggableList module={module} />
  }

  function getCardContent() {
    if (isLoading) {
      return <SpinnerLoading />
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3">
          <Image src={ModuleImg} alt="Ícone de módulo" className="w-32" />
          <span className="text-xl font-medium">{module?.name}</span>
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
          <CardTitle>Módulo</CardTitle>
        </CardHeader>
        <CardContent>{getCardContent()}</CardContent>
      </Card>
    </div>
  )
}
