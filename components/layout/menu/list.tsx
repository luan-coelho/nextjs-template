import { ReactNode } from "react"

interface ListProps {
  children: ReactNode
}

export function List({ children }: ListProps) {
  return <ul>{children}</ul>
}
