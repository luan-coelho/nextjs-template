"use client"

import React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { routes } from "@/routes"

import { dateUtils } from "@/lib/date-utils"
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
        <div className="form-group">
          <Label>Label</Label>
          <span>{menuItem?.label}</span>
        </div>

        <div className="form-group">
          <Label>Rota</Label>
          <Link
            className="flex size-fit items-center justify-center gap-2 rounded-sm border border-primary bg-primary/5 px-2 py-1 text-xs font-semibold text-primary"
            href={menuItem?.route || "#"}
            target="_blank">
            <LucideIcon name="link" size={16} /> {menuItem?.route}
          </Link>
        </div>

        <div className="form-group">
          <Label>Descrição</Label>
          <span>{menuItem?.description || "-"}</span>
        </div>

        <div className="form-group col-span-12 md:col-span-4 lg:col-span-3">
          <Label>Ícone</Label>
          <div className="flex items-center gap-2">
            <LucideIcon name={menuItem?.icon || "x"} />
            <span>{menuItem?.icon}</span>
          </div>
        </div>

        <div className="col-span-6 flex size-fit flex-col gap-2 md:col-span-4 lg:col-span-3">
          <Label>Situação</Label>
          <StatusBadge status={menuItem?.active || false} />
        </div>

        <div className="form-group">
          <Label>Data de cadastro</Label>
          <span>{dateUtils.formatDateTime(menuItem?.createdAt)}</span>
        </div>

        <div className="form-group">
          <Label>Data da última modificação</Label>
          <span>{dateUtils.formatDateTime(menuItem?.updatedAt) || "-"}</span>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <BreadcrumbContent items={[{ label: "Itens de Menu", href: routes.menuItems.index }, { label: "Visualizar" }]} />
      <PageTitle>Visualizar Item de Menu</PageTitle>
      <ButtonBack href={routes.menuItems.index} />

      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">Item de Menu</CardTitle>
        </CardHeader>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </React.Fragment>
  )
}
