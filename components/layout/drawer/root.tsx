import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Root({ children, className }: RootProps) {
  return (
    <aside
      className={cn(
        "fixed min-h-screen bg-[#1E1E1E] text-white transition-all delay-100 duration-300 ease-in-out md:static",
        className,
      )}>
      {children}
    </aside>
  )
}
