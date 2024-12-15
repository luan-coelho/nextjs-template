import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export function CreateButtonLink({ href }: { href: string }) {
  return (
    <div className="flex items-center justify-end">
      <Link className={buttonVariants({ variant: "default" })} href={href}>
        Cadastrar
      </Link>
    </div>
  )
}
