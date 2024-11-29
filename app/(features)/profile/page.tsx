import React from "react"
import { BreadcrumbContentItem } from "@/types"

import BreadcrumbContent from "@/components/layout/content-breadcrumb"

export default function Profile() {
  const breadcrumbItems: BreadcrumbContentItem[] = [{ label: "Dashboard", href: "/dashboard" }, { label: "Perfil" }]

  return (
    <>
      <BreadcrumbContent items={breadcrumbItems} />

      <h1>Perfil</h1>
    </>
  )
}
