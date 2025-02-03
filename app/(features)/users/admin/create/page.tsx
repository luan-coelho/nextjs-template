"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import userService from "@/services/user-service"
import { ApiError } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

export default function CreateUserPage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return (
    <React.Fragment>
      <BreadcrumbContent
        items={[
          { label: "Usuários", href: routes.users.index },
          {
            label: "Administração",
            href: routes.users.admin.index,
          },
          { label: "Cadastrar" },
        ]}
      />
      <PageTitle>Cadastrar Usuário</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>{/*<ModuleForm onSubmit={createUser} />*/}</CardContent>
      </Card>
    </React.Fragment>
  )
}
