"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

export default function Header() {
  const { isSidebarExpanded, toggleSidebar } = useSidebar()

  return (
    <header
      className={`fixed ${isSidebarExpanded ? "left-[260px]" : "left-0"} right-0 top-0 z-10 min-h-11 bg-white px-6 py-4 shadow-sm transition-all duration-300`}>
      <div>
        <Menu size={20} onClick={toggleSidebar} className="cursor-pointer" />
      </div>
    </header>
  )
}
