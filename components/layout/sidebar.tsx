import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { ChevronRight, Gauge, House, Rocket } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"

export default function Sidebar() {
  const { isSidebarExpanded } = useSidebar()

  return (
    <Drawer.Root className={`${isSidebarExpanded ? "flex min-w-64 max-w-64" : "hidden min-w-7 max-w-7"} flex-col`}>
      <Drawer.Logo>
        <Rocket className="text-primary" /> {isSidebarExpanded && <h1>Logo</h1>}
      </Drawer.Logo>
      <Drawer.Menu.Root className="flex-1">
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          <Menu.Item href="#" icon={<House size={isSidebarExpanded ? 18 : 20} />}>
            Inicio
          </Menu.Item>
          <Menu.Item href="/dashboard" icon={<Gauge size={isSidebarExpanded ? 18 : 20} />}>
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon={<House size={isSidebarExpanded ? 18 : 20} />}
            subItems={[{ href: "/dashboard/profile", label: "Perfil" }]}>
            Configurações
          </Menu.Item>
        </Menu.List>
      </Drawer.Menu.Root>
      <Drawer.User>
        <div className={`flex w-full items-center gap-2 ${isSidebarExpanded ? "justify-start" : "justify-center"}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className={`${isSidebarExpanded ? "block" : "hidden"} text-sm font-medium text-white`}>
            Luan Coêlho
          </span>
        </div>
        <div className={`${isSidebarExpanded ? "block" : "hidden"} cursor-pointer rounded p-2 hover:bg-[#303030]`}>
          <ChevronRight size={16} />
        </div>
      </Drawer.User>
    </Drawer.Root>
  )
}
