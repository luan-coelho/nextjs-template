import React from "react"
import BinessUsers from "@/public/images/business.svg"
import SystemUsers from "@/public/images/peoples.svg"
import SystemUsers2 from "@/public/images/peoples2.svg"

import PageTitle from "@/components/layout/page-title"
import { WidgetCard, WidgetCardContent, WidgetCardIcon } from "@/components/layout/widget-card"

export default async function UsersPage() {
  return (
    <React.Fragment>
      <PageTitle>Usuários por Categoria</PageTitle>

      <div className={"mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
        <WidgetCard className="w-auto bg-gradient-to-br from-blue-300 to-blue-600 text-white">
          <WidgetCardIcon src={SystemUsers} alt="Usuários Sistema" />
          <WidgetCardContent>
            <span className="text-3xl font-bold">Administração</span>
          </WidgetCardContent>
        </WidgetCard>

        <WidgetCard className="w-auto bg-gradient-to-br from-red-300 to-red-600 text-zinc-800">
          <WidgetCardIcon src={BinessUsers} alt="Usuários Pessoa Física" />
          <WidgetCardContent>
            <span className="mt-1 text-sm">Clientes</span>
            <span className="text-3xl font-bold">Pessoa Física</span>
          </WidgetCardContent>
        </WidgetCard>

        <WidgetCard className="w-auto bg-gradient-to-br from-yellow-300 to-yellow-600 text-white">
          <WidgetCardIcon className="size-24" src={SystemUsers2} alt="Usuários Sistema" />
          <WidgetCardContent>
            <span className="mt-1 text-sm">Clientes</span>
            <span className="text-3xl font-bold">Pessoa Jurídica</span>
          </WidgetCardContent>
        </WidgetCard>
      </div>
    </React.Fragment>
  )
}
