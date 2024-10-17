"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header
      className={`flex min-h-11 items-center justify-end bg-white px-6 py-4 shadow-sm transition-all duration-300 md:justify-start`}>
      <Menu size={20} onClick={toggleSidebar} className="cursor-pointer" />
    </header>
  )
}
