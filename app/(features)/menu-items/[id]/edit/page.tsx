"use client"

import React from "react"
import { useParams } from "next/navigation"
import { routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError } from "@/types"
import { toast } from "sonner"

import { useMenuItem } from "@/hooks/use-menu-items"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MenuItemForm, { MenuItemSchema } from "@/components/features/menu-item/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function EditMenuItemPage() {
  const params = useParams<{ id: string }>()
  const { data: menuItem, isLoading } = useMenuItem(params.id)

  async function onUpdate(data: MenuItemSchema) {
    try {
      await menuItemService.updateById(params.id, data)
      toast.success("Item de menu atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  if (isLoading) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Itens de menu", href: routes.menuItems.index }, { label: "Editar" }]} />
      <PageTitle>Editar Item de Menu</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <MenuItemForm menuItem={menuItem} onSubmit={onUpdate} />
        </CardContent>
      </Card>
    </div>
  )
}
