"use client"

import { ReactNode } from "react"
import * as React from "react"
import { useSidebarContext } from "@/contexts/sidebar-context"

interface LabelProps {
  children: ReactNode
}

export function Label({ children }: LabelProps) {
  const { isSidebarExpanded } = useSidebarContext()

  return (
    <>
      {isSidebarExpanded && (
        <div className="inline-flex h-11 flex-col items-start justify-start gap-2.5 px-6 py-3">
          <div className="text-xs font-medium leading-tight text-[#8c8c8c]">{children}</div>
        </div>
      )}
    </>
  )
}
