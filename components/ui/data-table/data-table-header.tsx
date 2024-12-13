"use client"

import React, { useState } from "react"
import { useDataTableContext } from "@/contexts/data-table-context"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { TableHead } from "@/components/ui/table"

export interface TableSortHeaderProps {
  title: string
  field?: string
  className?: string
  position?: "left" | "center" | "right"
}

export default function TableSortHeader({ title, field, className, position = "left" }: TableSortHeaderProps) {
  const { handleSortChange } = useDataTableContext()
  const [sort, setSort] = useState<"asc" | "desc" | null>(null)

  const positionClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  function handleChangeSort() {
    let newSort: "asc" | "desc" | null

    if (sort === null) {
      newSort = "asc"
    } else if (sort === "asc") {
      newSort = "desc"
    } else {
      newSort = null
    }

    const sortQueryParam = `${field}:${newSort}`
    console.log(sortQueryParam);
    handleSortChange(newSort ? sortQueryParam : null)
    setSort(newSort)
  }

  if (!field) {
    return <TableHead className={className}>{title}</TableHead>
  }

  const getSortIcon = () => {
    switch (sort) {
      case "desc":
        return <ArrowDown size={16} />
      case "asc":
        return <ArrowUp size={16} />
      default:
        return <ChevronsUpDown size={16} />
    }
  }

  return (
    <TableHead className={cn("cursor-pointer", className)}>
      <div className={cn("flex items-center gap-1 px-3 py-3", positionClass[position])} onClick={handleChangeSort}>
        <span>{title}</span>
        <div className="text-xs">{getSortIcon()}</div>
      </div>
    </TableHead>
  )
}
