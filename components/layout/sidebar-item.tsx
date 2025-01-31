"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { ChevronDown } from "lucide-react"

import { LucideIcon } from "@/components/ui/lucide-icon"

interface SidebarItemProps {
  icon?: ReactNode
  href?: string
  items?: Array<{ label: string; href: string; icon: string }>
  children: ReactNode
}

export function SidebarItem({ icon, href, items, children }: SidebarItemProps) {
  const { isSidebarExpanded } = useSidebarContext()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isActive = (path: string) => pathname === path

  function isParentOrChildActive(): boolean {
    if (isActive(href || "")) return true
    return items?.some(subItem => isActive(subItem.href)) || false
  }

  function toggleSubMenu(): void {
    setIsOpen(!isOpen)
  }

  const parentOrChildActive = isParentOrChildActive()

  const size = isSidebarExpanded ? 18 : 20

  return (
    <li className="w-full">
      {items != undefined && items.length > 0 ? (
        <div
          onClick={items ? toggleSubMenu : undefined}
          className={`flex min-h-11 cursor-pointer items-center ${isSidebarExpanded ? "justify-between" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
            parentOrChildActive && !items ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""
          } ${parentOrChildActive && items ? "text-primary" : ""} w-full delay-150 hover:bg-[#262626]`}>
          <div className="flex items-center justify-start gap-2.5">
            <div className={parentOrChildActive ? "text-primary" : ""}>{icon}</div>
            {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
          </div>
          {items && isSidebarExpanded && (
            <ChevronDown
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              size={16}
            />
          )}
        </div>
      ) : (
        <Link
          href={href || "#"}
          onClick={items ? toggleSubMenu : undefined}
          className={`flex min-h-11 cursor-pointer items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
            parentOrChildActive ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""
          } w-full delay-150 hover:bg-[#262626]`}>
          <div className={parentOrChildActive ? "text-primary" : ""}>{icon}</div>
          {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
          {items && isSidebarExpanded && (
            <ChevronDown
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              size={16}
            />
          )}
        </Link>
      )}

      {isSidebarExpanded && items != undefined && items.length > 0 && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
          {items?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`flex min-h-11 items-center justify-start gap-2.5 py-1.5 pl-10 text-[#bfbfbf] ${
                isActive(subItem.href) ? "bg-[#ffffff0d] text-white" : ""
              } hover:bg-[#262626]`}>
              <div className="flex items-center justify-start gap-2.5">
                <LucideIcon name={subItem.icon} size={size} />
                {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{subItem.label}</div>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}
