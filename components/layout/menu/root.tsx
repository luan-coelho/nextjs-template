import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Root({ children, className }: RootProps) {
  return <aside className={cn("flex-1 bg-[#1E1E1E] text-white", className)}>{children}</aside>
}
