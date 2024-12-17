import React, { HtmlHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type PageTitleProps = HtmlHTMLAttributes<"div"> & {
  children: React.ReactNode
}

export default function PageTitle({ children, className }: PageTitleProps) {
  return (
    <React.Fragment>
      <title>{children}</title>
      <div className={cn("flex items-center justify-between", className)}>
        <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
      </div>
    </React.Fragment>
  )
}
