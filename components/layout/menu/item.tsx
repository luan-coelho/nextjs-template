import { ReactNode } from "react"
import Link from "next/link"

interface MenuItemProps {
  icon?: ReactNode
  children: ReactNode
  href: string
}

export function Item({ icon, children, href }: MenuItemProps) {
  return (
    <li className="h-[30px] px-4 py-3 hover:bg-blue-600">
      <Link className="flex items-center justify-start gap-2" href={href}>
        {icon} {children}
      </Link>
    </li>
  )
}
