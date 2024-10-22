"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { LogOut, Menu } from "lucide-react"

import { logout } from "@/components/layout/menu/actions"

export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header
      className={`flex min-h-11 items-center justify-between bg-white px-4 py-3 shadow-sm transition-all duration-300`}>
      <div onClick={toggleSidebar} className="cursor-pointer rounded p-2 hover:bg-[#f5f5f5]">
        <Menu size={18} />
      </div>
      <div onClick={() => logout()} className="cursor-pointer rounded p-2 hover:bg-[#f5f5f5]">
        <LogOut size={18} />
      </div>
    </header>
  )
}
