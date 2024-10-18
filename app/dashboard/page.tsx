import React from "react"
import { BreadcrumbContentItem } from "@/types"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"

export default function DashboardHome() {
  const breadcrumbItems: BreadcrumbContentItem[] = [{ label: "Dashboard", href: "/dashboard" }, { label: "Cadastrar" }]

  return (
    <>
      <BreadcrumbContent items={breadcrumbItems} />

      <div className="mt-4">
        <Card className="w-auto md:w-[350px]">
          <CardHeader>
            <CardTitle>Criando template para Next.js</CardTitle>
            <CardDescription>Template padrão que será usado em outros projetos.</CardDescription>
          </CardHeader>
          <CardContent>
            <span>Teste</span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
