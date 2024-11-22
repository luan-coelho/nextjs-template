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
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index != items.length - 1 ? (
                    <>
                      <Link
                        className="text-[var(--breadcrumb-link)] transition-colors hover:text-foreground"
                        href={item.href || "#"}>
                        {item.label}
                      </Link>
                    </>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index != items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
