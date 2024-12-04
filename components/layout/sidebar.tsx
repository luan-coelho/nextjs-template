"use client"

import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { Rocket } from "lucide-react"

import { LucideIcon } from "@/components/ui/lucide-icon"
import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"

export default function Sidebar() {
  const { isSidebarExpanded, currentModule: module } = useSidebar()

  const size = isSidebarExpanded ? 18 : 20

  return (
    <Drawer.Root
      className={`${isSidebarExpanded ? "flex min-w-64 max-w-64" : "hidden min-w-7 max-w-7"} sticky top-0 z-50 flex-col`}>
      <Drawer.Logo>
        <Rocket className="text-primary" /> {isSidebarExpanded && <h1>Logo</h1>}
      </Drawer.Logo>
      <Drawer.Menu.Root>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          {module != undefined &&
            module.menuItems != undefined &&
            module.menuItems.map((item, index) => (
              <Menu.Item key={index} href={item.route} icon={<LucideIcon name={item.icon} size={size} />}>
                {item.label}
              </Menu.Item>
            ))}
        </Menu.List>
      </Drawer.Menu.Root>
      {/*<Drawer.AuthenticatedUser />*/}
    </Drawer.Root>
  )
}
