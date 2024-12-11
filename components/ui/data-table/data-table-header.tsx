"use client"

import React, { HtmlHTMLAttributes, useState } from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TableHead } from "@/components/ui/table"

type DataTableHeaderProps = HtmlHTMLAttributes<"div"> & {
  title: string
  ordinatable?: boolean
  backendField?: string
}

export default function DataTableHeader({ title, ordinatable = false, className }: DataTableHeaderProps) {
  const [sort, setSort] = useState<string>("")

  function onChageSort() {
    if (sort === "desc") {
      setSort("asc")
    } else if (sort === "asc") {
      setSort("")
    } else {
      setSort("desc")
    }
  }

  if (!ordinatable) {
    return <TableHead className={className}>{title}</TableHead>
  }

  return (
    <TableHead className={cn("flex items-center px-5", className)}>
      <Button
        onClick={onChageSort}
        variant="ghost"
        size="sm"
        className="-ml-3 flex h-8 items-center justify-center data-[state=open]:bg-accent">
        <span className="text-xs font-bold uppercase">{title}</span>
        {sort === "desc" ? <ArrowDown /> : sort === "asc" ? <ArrowUp /> : <ChevronsUpDown />}
      </Button>
    </TableHead>
  )
}
