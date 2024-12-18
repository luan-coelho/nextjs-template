"use client"

import * as React from "react"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { Rocket } from "lucide-react"

import { MenuItem } from "@/types/model-types"
import { orderMenuItems } from "@/lib/utils"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"
import { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export default function Sidebar() {
  const { isSidebarExpanded, currentModule: module, isLoading } = useSidebarContext()

  const size = isSidebarExpanded ? 18 : 20

  function getMenuItemsList() {
    if (module && module.menuItemsOrder) {
      const menuItemsOrder: MenuItemsOrder[] = JSON.parse(module.menuItemsOrder)
      module.menuItems = orderMenuItems(module.menuItems, menuItemsOrder)
    }

    return (
      <React.Fragment>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          {module?.menuItems?.map((item: MenuItem, index: number) => (
            <Menu.Item key={index} href={item.route} icon={<LucideIcon name={item.icon} size={size} />}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.List>
      </React.Fragment>
    )
  }

  function getSidebarMenu() {
    if (isLoading) {
      return <Skeleton className="h-11 w-full" />
    }

    if (!module || !module.menuItems) {
      return null
    }

    return <Drawer.Menu.Root>{getMenuItemsList()}</Drawer.Menu.Root>
  }

  return (
    <Drawer.Root className={`${isSidebarExpanded ? "flex min-w-64 max-w-64" : "hidden min-w-7 max-w-7"} z-50 flex-col`}>
      <Drawer.Logo className="sticky top-0">
        <Rocket className="text-primary" /> {isSidebarExpanded && <h1>Logo</h1>}
      </Drawer.Logo>
      {getSidebarMenu()}
      {/*<Drawer.AuthenticatedUser />*/}
    </Drawer.Root>
  )
}
