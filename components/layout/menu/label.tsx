import { ReactNode } from "react"
import * as React from "react"

interface MenuLabelProps {
  children: ReactNode
}

export function Label({ children }: MenuLabelProps) {
  return (
    <div className="inline-flex h-11 flex-col items-start justify-start gap-2.5 px-6 py-3">
      <div className="text-xs font-medium leading-tight text-[#8c8c8c]">{children}</div>
    </div>
  )
}
