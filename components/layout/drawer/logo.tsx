"use client"

import * as React from "react"
import { ReactNode } from "react"
import { useSidebarContext } from "@/contexts/sidebar-context"

import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Logo({ children, className }: LogoProps) {
  const { isSidebarExpanded } = useSidebarContext()

  return (
    <div
      className={cn(
        `inline-flex h-20 w-full items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-3 p-6 py-5 text-xl font-semibold text-white`,
        className,
      )}>
      {children}
    </div>
  )
}
