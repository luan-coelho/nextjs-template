import React from "react"

import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { generatePaginationLinks } from "@/components/generate-pages"

type PaginatorProps = {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
  showPreviousNext: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
  className,
}: PaginatorProps) {
  return (
    <Pagination className={cn(className)}>
      <PaginationContent className="flex justify-end justify-items-end">
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage - 1 < 1} />
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage > totalPages - 1} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}
