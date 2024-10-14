import { ReactNode } from "react"
import * as React from "react"

interface MenuLabelProps {
  children: ReactNode
}

export function Label({ children }: MenuLabelProps) {
  return <span className="mb-6 text-xs">{children}</span>
}
