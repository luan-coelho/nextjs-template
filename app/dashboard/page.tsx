import React from "react"
import { auth } from "@/auth"
import { BreadcrumbContentItem } from "@/types"

import { Card, CardContent } from "@/components/ui/card"

export default async function DashboardHome() {
  const breadcrumbItems: BreadcrumbContentItem[] = [{ label: "Dashboard", href: "/dashboard" }, { label: "Cadastrar" }]

  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <>
      <div className="mt-4">
        <Card className="w-auto">
          <CardContent>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
