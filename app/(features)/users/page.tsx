import React from "react"
import BinessUsers from "@/public/images/business.svg"
import SystemUsers from "@/public/images/peoples.svg"

import PageTitle from "@/components/layout/page-title"
import { WidgetCard, WidgetCardContent, WidgetCardIcon } from "@/components/layout/widget-card"

export default async function UsersPage() {
  return (
    <React.Fragment>
      <PageTitle>Usuários</PageTitle>

      <div className={"mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}>
        <WidgetCard className="bg-green-400 text-white">
          <WidgetCardIcon src={SystemUsers} alt="Usuários Sistema" />
          <WidgetCardContent>
            <span className="mt-1 text-sm">Usuários</span>
            <span className="text-3xl font-bold">Sistema</span>
          </WidgetCardContent>
        </WidgetCard>

        <WidgetCard className="bg-red-400 text-white">
          <WidgetCardIcon src={BinessUsers} alt="Usuários Sistema" />
          <WidgetCardContent>
            <span className="mt-1 text-sm">Usuários</span>
            <span className="text-3xl font-bold">Empresas</span>
          </WidgetCardContent>
        </WidgetCard>
      </div>
    </React.Fragment>
  )
}
