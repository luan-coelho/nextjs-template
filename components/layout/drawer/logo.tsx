import * as React from "react"
import { ReactNode } from "react"

interface LogoProps {
  children: ReactNode
}

export function Logo({ children }: LogoProps) {
  return (
    <div className="inline-flex h-20 w-full items-center justify-start gap-3 p-6 py-5 text-xl font-semibold text-white">
      {children}
    </div>
  )
}
