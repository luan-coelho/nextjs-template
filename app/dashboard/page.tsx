import Image from "next/image"
import { auth } from "@/auth"
import { BreadcrumbContentItem } from "@/types"

import { Card, CardContent } from "@/components/ui/card"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"

export default async function DashboardHome() {
  const breadcrumbItems: BreadcrumbContentItem[] = [{ label: "Dashboard", href: "/dashboard" }, { label: "Cadastrar" }]

  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <>
      <BreadcrumbContent items={breadcrumbItems} />

      <div className="mt-4">
        <Card className="w-auto">
          <CardContent>
            <pre>{JSON.stringify(session, null, 2)}</pre>

            {session.user?.name && (
              <Image src={session.user.image || ""} alt={session.user.name} width={100} height={100} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
