"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-context"

interface ItemProps {
  icon?: ReactNode
  children: ReactNode
  href: string
}

export function Item({ icon, children, href }: ItemProps) {
  const { isSidebarExpanded } = useSidebar()
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <Link
      href={href}
      className={`flex h-11 items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${isActive(href) ? "border-r-4 border-[#1668dc] bg-[#ffffff0d] text-white" : ""} delay-150 hover:bg-[#262626]`}>
      <div className={isActive(href) ? "text-[#1668dc]" : ""}>{icon}</div>
      {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
    </Link>
  )
}
