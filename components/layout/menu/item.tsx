"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-context"
import { ChevronDown } from "lucide-react"

interface ItemProps {
  icon?: ReactNode
  children: ReactNode
  href?: string
  subItems?: Array<{ href: string; label: string }>
}

export function Item({ icon, children, href, subItems }: ItemProps) {
  const { isSidebarExpanded } = useSidebar()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isActive = (path: string) => pathname === path

  function isParentOrChildActive(): boolean {
    if (isActive(href || "")) return true
    return subItems?.some(subItem => isActive(subItem.href)) || false
  }

  function toggleSubMenu(): void {
    setIsOpen(!isOpen)
  }

  const parentOrChildActive = isParentOrChildActive()

  return (
    <div className="w-full">
      <Link
        href={href || "#"}
        onClick={subItems ? toggleSubMenu : undefined}
        className={`flex h-11 cursor-pointer items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
          parentOrChildActive ? "border-r-4 border-[#1668dc] bg-[#ffffff0d] text-white" : ""
        } w-full delay-150 hover:bg-[#262626]`}>
        <div className={parentOrChildActive ? "text-[#1668dc]" : ""}>{icon}</div>
        {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
        {subItems && isSidebarExpanded && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </Link>

      {subItems && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
          {subItems.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`flex h-9 items-center justify-start gap-2.5 px-6 py-1.5 text-[#bfbfbf] ${
                isActive(subItem.href) ? "bg-[#ffffff0d] text-[#1668dc]" : ""
              } hover:bg-[#262626]`}>
              <span className="pl-7 text-sm">{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
