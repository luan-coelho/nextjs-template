import * as React from "react"
import { ReactNode } from "react"

export default function Content({ children }: { children: ReactNode }) {
  return <main className="mb-[40px] mt-[50px] w-full p-10">{children}</main>
}
