"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className={`min-h-11 bg-white px-6 py-4 shadow-sm transition-all duration-300`}>
      <div>
        <Menu size={20} onClick={toggleSidebar} className="cursor-pointer" />
      </div>
    </header>
  )
}
