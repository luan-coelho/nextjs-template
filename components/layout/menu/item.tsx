"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { useSidebar } from "@/contexts/sidebar-context"

interface ItemProps {
  icon?: ReactNode
  children: ReactNode
  href: string
}

export function Item({ icon, children, href }: ItemProps) {
  const { isSidebarExpanded } = useSidebar()

  return (
    <Link
      href={href}
      className={`flex h-11 items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] delay-150 hover:bg-[#262626]`}>
      <div>{icon}</div>
      {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
    </Link>
  )
}
