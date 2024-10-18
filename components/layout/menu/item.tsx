"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-context"
import { Else, If, Then } from "@/utils/if"
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
    <li className="w-full">
      <If condition={subItems != undefined && subItems.length > 0}>
        <Then>
          <div
            onClick={subItems ? toggleSubMenu : undefined}
            className={`flex min-h-11 cursor-pointer items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
              parentOrChildActive && subItems == undefined ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""
            } ${
              parentOrChildActive && subItems != undefined ? "text-primary" : ""
            } w-full delay-150 hover:bg-[#262626]`}>
            <div className={parentOrChildActive ? "text-primary" : ""}>{icon}</div>
            {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
            {subItems && isSidebarExpanded && (
              <ChevronDown
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                size={16}
              />
            )}
          </div>
        </Then>
        <Else>
          <Link
            href={href || "#"}
            onClick={subItems ? toggleSubMenu : undefined}
            className={`flex min-h-11 cursor-pointer items-center ${isSidebarExpanded ? "justify-start" : "justify-center"} gap-2.5 px-6 py-2.5 text-[#bfbfbf] ${
              parentOrChildActive ? "border-r-4 border-primary bg-[#ffffff0d] text-white" : ""
            } w-full delay-150 hover:bg-[#262626]`}>
            <div className={parentOrChildActive ? "text-primary" : ""}>{icon}</div>
            {isSidebarExpanded && <div className="text-sm font-normal leading-snug">{children}</div>}
            {subItems && isSidebarExpanded && (
              <ChevronDown
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                size={16}
              />
            )}
          </Link>
        </Else>
      </If>

      <If condition={isSidebarExpanded && subItems != undefined && subItems.length > 0}>
        <Then>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
            {subItems?.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className={`flex min-h-11 items-center justify-start gap-2.5 px-6 py-1.5 text-[#bfbfbf] ${
                  isActive(subItem.href) ? "bg-[#ffffff0d] text-white" : ""
                } hover:bg-[#262626]`}>
                <span className="pl-7 text-sm">{subItem.label}</span>
              </Link>
            ))}
          </div>
        </Then>
      </If>
    </li>
  )
}
