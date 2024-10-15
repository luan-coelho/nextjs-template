import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { UsersRound } from "lucide-react"

import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"

export default function Sidebar() {
  const { isSidebarExpanded } = useSidebar()

  return (
    <Drawer.Root
      className={`${isSidebarExpanded ? "block w-[260px]" : "w-0 overflow-hidden"} transition-all duration-200 ease-in-out`}>
      <Drawer.Menu.Root
        className={`${isSidebarExpanded ? "block" : "hidden w-0 overflow-hidden"} transition-all duration-200 ease-in-out`}>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          <Menu.Item href="#" icon={<UsersRound size={16} />}>
            Dashboard
          </Menu.Item>
        </Menu.List>
      </Drawer.Menu.Root>
    </Drawer.Root>
  )
}
