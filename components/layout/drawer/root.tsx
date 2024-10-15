import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Root({ children, className }: RootProps) {
  return <aside className={cn("fixed inset-y-0 left-0 bg-[#1E1E1E] text-white", className)}>{children}</aside>
}
