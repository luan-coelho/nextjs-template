import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ActionLinkProps = {
  link: string
  tooltip?: string
  color?: "purple" | "red" | "blue" | "green"
  children: React.ReactNode
}

export const actionButtoncolorClasses = {
  purple:
    "border border-purple-500 bg-purple-100 text-purple-500 hover:border-purple-500 hover:bg-purple-100 hover:text-purple-500 rounded-full size-9",
  red: "border border-red-500 bg-red-100 text-red-500 hover:border-red-500 hover:bg-red-100 hover:text-red-500 rounded-full size-9",
  blue: "border border-blue-500 bg-blue-100 text-blue-500 hover:border-blue-500 hover:bg-blue-100 hover:text-blue-500 rounded-full size-9",
  green:
    "border border-green-500 bg-green-100 text-green-500 hover:border-green-500 hover:bg-green-100 hover:text-green-500 rounded-full size-9",
  gray: "border border-gray-500 bg-gray-200 text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-500 rounded-full size-9",
}

export function ActionButton({ link, tooltip, color = "purple", children }: ActionLinkProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                size: "icon",
              }),
              "rounded-full",
              actionButtoncolorClasses[color],
            )}
            href={link}>
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-zinc-700">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
