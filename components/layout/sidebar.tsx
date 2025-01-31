"use client"

import * as React from "react"
import { useEffect } from "react"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { Rocket } from "lucide-react"

import { MenuItem } from "@/types/model-types"
import { orderMenuItems } from "@/lib/utils"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { SidebarItem } from "@/components/layout/sidebar-item"
import { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export default function Sidebar() {
  const { isSidebarExpanded, currentModule: module, isLoading, toggleSidebar } = useSidebarContext()

  const size = isSidebarExpanded ? 18 : 20

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOutsideClick = (event: MouseEvent) => {
        const sidebar = document.getElementById("sidebar")
        const { innerWidth: width } = window
        if (width < 768 && sidebar && !sidebar.contains(event.target as Node)) {
          toggleSidebar()
        }
      }

      if (isSidebarExpanded) {
        document.addEventListener("mousedown", handleOutsideClick)
      } else {
        document.removeEventListener("mousedown", handleOutsideClick)
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    }
  }, [isSidebarExpanded, toggleSidebar])

  function getMenuItemsList() {
    if (module && module.menuItemsOrder) {
      const menuItemsOrder: MenuItemsOrder[] = JSON.parse(module.menuItemsOrder)
      module.menuItems = orderMenuItems(module.menuItems, menuItemsOrder)
    }

    return (
      <React.Fragment>
        {isSidebarExpanded && (
          <div className="inline-flex h-11 flex-col items-start justify-start gap-2.5 px-6 py-3">
            <div className="text-xs font-medium leading-tight text-[#8c8c8c]">Menu</div>
          </div>
        )}
        <ul>
          {module?.menuItems?.map((item: MenuItem, index: number) => (
            <SidebarItem key={index} href={item.route} icon={<LucideIcon name={item.icon} size={size} />}>
              {item.label}
            </SidebarItem>
          ))}
        </ul>
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

    return <div className="flex-1 bg-[#1E1E1E] text-white">{getMenuItemsList()}</div>
  }

  return (
    <aside
      id="sidebar"
      className={`fixed left-0 top-0 z-30 h-full bg-[#1E1E1E] text-white transition-all duration-300 ease-in-out ${isSidebarExpanded ? "w-64" : "hidden w-0 md:block md:w-[72px]"} ${isSidebarExpanded ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div
        className={`${
          isSidebarExpanded ? "justify-start" : "justify-center"
        } flex h-20 w-full items-center gap-3 border-b border-gray-800 px-6 text-xl font-semibold text-white`}>
        <Rocket className="text-primary" /> {isSidebarExpanded && <h1>Logo</h1>}
      </div>
      <div className="flex-1 overflow-hidden bg-[#1E1E1E] text-white">
        {getSidebarMenu()}
        {/*<Drawer.AuthenticatedUser />*/}
      </div>
    </aside>
  )
}
