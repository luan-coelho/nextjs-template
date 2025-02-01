"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MenuItemForm, { MenuItemSchema } from "@/components/features/menu-item/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function CreateMenuItemPage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  async function createMenuItem(data: MenuItemSchema) {
    try {
      const menuItem = await menuItemService.create(data)
      toast.success("Item de menu cadastrado com sucesso.")
      router.replace(routes.menuItems.show(menuItem.id))
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.menuItems.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Itens de Menu", href: routes.menuItems.index }, { label: "Cadastrar" }]} />
      <PageTitle>Cadastrar Item de Menu</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <MenuItemForm onSubmit={createMenuItem} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
