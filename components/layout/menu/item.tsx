import { ReactNode } from "react"
import Link from "next/link"

interface MenuItemProps {
  icon?: ReactNode
  children: ReactNode
  href: string
}

export function Item({ icon, children, href }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex h-11 items-center justify-start gap-2.5 px-6 py-2.5 text-[#bfbfbf] delay-150 hover:bg-red-400 hover:text-white">
      <div>{icon}</div>
      <div className="text-sm font-normal leading-snug">{children}</div>
    </Link>
  )
}
