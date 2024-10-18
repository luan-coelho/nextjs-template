import React, { ReactNode, useEffect } from "react"
import { useSidebar } from "@/contexts/sidebar-context"

import { cn } from "@/lib/utils"

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Root({ children, className }: RootProps) {
  const { isSidebarExpanded, toggleSidebar } = useSidebar()

  useEffect(() => {
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
  }, [isSidebarExpanded, toggleSidebar])

  return (
    <aside
      id="sidebar"
      className={cn(
        `${isSidebarExpanded ? "flex min-w-64" : "hidden min-w-7"} fixed min-h-screen flex-col bg-[#1E1E1E] text-white transition-all delay-100 duration-300 ease-in-out md:static`,
        className,
      )}>
      {children}
    </aside>
  )
}
