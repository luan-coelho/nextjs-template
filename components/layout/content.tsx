import * as React from "react"
import { ReactNode } from "react"

export default function Content({ children }: { children: ReactNode }) {
  return <main className="flex-1 p-5 py-[40px] md:p-10">{children}</main>
}
