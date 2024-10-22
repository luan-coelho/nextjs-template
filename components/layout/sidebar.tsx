import * as React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { LucideIcon } from "@/utils/lucide-icon"
import { ChevronRight, Rocket } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
      <Drawer.User>
        <div className={`${isSidebarExpanded ? "justify-start" : "justify-center"} flex w-full items-center gap-2`}>
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
