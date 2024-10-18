import React from "react"
import Link from "next/link"
import { BreadcrumbContentItem } from "@/types"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbContentProps {
  items: BreadcrumbContentItem[]
}

export default function BreadcrumbContent({ items }: BreadcrumbContentProps) {
  return (
    <div className="mb-7">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            return (
              <>
                {index != items.length - 1 && (
                  <>
                    <BreadcrumbItem>
                      <Link
                        className="text-[var(--breadcrumb-link)] transition-colors hover:text-foreground"
                        href={item.href ? item.href : "#"}>
                        {item.label}
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}

                {index == items.length - 1 && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
