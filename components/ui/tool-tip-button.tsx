"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TooltipoButtonProps = {
  tooltipText?: string
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function ToolTipButton({ tooltipText, children, className, onClick }: TooltipoButtonProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger onClick={onClick} className={cn(buttonVariants({ size: "icon" }), className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-zinc-700">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
