import * as React from "react"
import { ReactNode } from "react"

export default function Content({ children }: { children: ReactNode }) {
  return <main className="w-full p-10 py-[40px]">{children}</main>
}
