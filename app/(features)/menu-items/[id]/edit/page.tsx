"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useMenuItem } from "@/hooks/use-menu-items"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MenuItemForm, { MenuItemSchema } from "@/components/features/menu-item/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default function EditMenuItemPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { data: menuItem, isLoading } = useMenuItem(params.id)

  async function onUpdate(data: MenuItemSchema) {
    try {
      const menuItem = await menuItemService.updateById(params.id, data)
      router.replace(routes.menuItems.show(menuItem.id))
      toast.success("Item de menu atualizado com sucesso.")
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.menuItems.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  if (isLoading) {
    return <SpinnerLoading />
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Itens de Menu", href: routes.menuItems.index }, { label: "Editar" }]} />
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
