import { ReactNode } from "react"
import Link from "next/link"

interface MenuItemProps {
  icon?: ReactNode
  children: ReactNode
  href: string
}

export function Item({ icon, children, href }: MenuItemProps) {
  return (
    <Link href={href} className="flex h-11 items-center justify-start gap-2.5 px-6 py-2.5">
      <div className="relative h-3.5">
        <div>{icon}</div>
      </div>
      <div className="text-sm font-normal leading-snug text-white">{children}</div>
    </Link>
  )
}
