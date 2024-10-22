"use client"

import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { LucideIcon } from "@/utils/lucide-icon"
import { Rocket } from "lucide-react"

import { Drawer } from "@/components/layout/drawer"
import { Menu } from "@/components/layout/menu"

export default function Sidebar() {
  const { isSidebarExpanded } = useSidebar()

  const size = isSidebarExpanded ? 18 : 20
  const menuItems = [
    { label: "Inicio", href: "#", icon: "house" },
    { label: "Dashboard", href: "/dashboard", icon: "circle-gauge" },
    {
      label: "Configurações",
      icon: "settings",
      subItems: [
        { label: "Perfil", href: "/dashboard/profile", icon: "user-pen" },
        {
          label: "Conta",
          href: "#",
          icon: "briefcase-business",
        },
      ],
    },
    { label: "Notificações", href: "#", icon: "bell" },
  ]

  return (
    <Drawer.Root className={`${isSidebarExpanded ? "flex min-w-64 max-w-64" : "hidden min-w-7 max-w-7"} flex-col`}>
      <Drawer.Logo>
        <Rocket className="text-primary" /> {isSidebarExpanded && <h1>Logo</h1>}
      </Drawer.Logo>
      <Drawer.Menu.Root>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          {menuItems.map((item, index) => (
            <Menu.Item
              key={index}
              href={item.href}
              icon={<LucideIcon name={item.icon} size={size} />}
              items={item.subItems}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.List>
      </Drawer.Menu.Root>
      {/*<Drawer.AuthenticatedUser />*/}
    </Drawer.Root>
  )
}
