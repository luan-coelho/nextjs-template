"use client"

import React from "react"
import { useParams } from "next/navigation"
import { routes } from "@/routes"

import { useMenuItem } from "@/hooks/use-menu-items"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "@/components/ui/lucide-icon"
import ButtonBack from "@/components/layout/button-back"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SpinnerLoading from "@/components/layout/spinner-loading"
import StatusBadge from "@/components/layout/status-badge"

export default function ShowMenuItemPage() {
  const params = useParams<{ id: string }>()
  const { data: menuItem, isLoading } = useMenuItem(params.id)

  function getContent() {
    if (isLoading) {
      return <SpinnerLoading />
    }
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="form-group col-span-12 md:col-span-6">
          <Label>Label</Label>
          <span>{menuItem.label}</span>
        </div>

        <div className="form-group col-span-12 md:col-span-6">
          <Label>Rota</Label>
          <span>{menuItem.route}</span>
        </div>

        <div className="form-group col-span-12">
          <Label>Descrição</Label>
          <span>{menuItem.description}</span>
        </div>

        <div className="form-group col-span-6">
          <Label>Ícone</Label>
          <span>{menuItem.icon}</span>
          {/*<LucideIcon name={menuItem.icon} />*/}
        </div>

        <div className="form-group col-span-6">
          <Label>Situação</Label>
          <StatusBadge status={menuItem.active} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Itens de menu", href: routes.menuItems.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Item de Menu</PageTitle>
      <ButtonBack href={routes.menuItems.index} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">Item de Menu</CardTitle>
        </CardHeader>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </div>
  )
}
