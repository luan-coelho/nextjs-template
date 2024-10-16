import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { Gauge, Rocket, UsersRound } from "lucide-react"

import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"

export default function Sidebar() {
  const { isSidebarExpanded } = useSidebar()

  return (
    <Drawer.Root
      className={`${isSidebarExpanded ? "min-w-64" : "min-w-7"} transition-all delay-100 duration-300 ease-in-out`}>
      <Drawer.Logo>
        <Rocket /> {isSidebarExpanded && <h1>Logo</h1>}
      </Drawer.Logo>
      <Drawer.Menu.Root>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          <Menu.Item href="#" icon={<Gauge size={isSidebarExpanded ? 16 : 20} />}>
            Dashboard
          </Menu.Item>
          <Menu.Item href="#" icon={<UsersRound size={isSidebarExpanded ? 16 : 20} />}>
            Users
          </Menu.Item>
        </Menu.List>
      </Drawer.Menu.Root>
    </Drawer.Root>
  )
}
