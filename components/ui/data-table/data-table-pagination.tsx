import React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TablePaginationProps = {
  currentPage: number
  itemsPerPage: number
  itemsOnPage: number
  totalPages: number
  totalItems: number
  onPageChange: (pageNumber: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
} & React.HTMLAttributes<HTMLDivElement>

export function DataTablePagination({
  currentPage,
  itemsPerPage,
  itemsOnPage,
  totalPages,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: TablePaginationProps) {
  return (
    <React.Fragment>
      {totalItems > itemsPerPage && (
        <div className="flex flex-col items-center justify-end px-8 py-3 md:flex-row">
          <div className="flex-1 text-sm text-muted-foreground">
            {itemsOnPage} {itemsOnPage > 1 ? "itens" : "item"} de {totalItems}
          </div>
          <div className="flex items-end space-x-6 lg:space-x-8">
            <div className="flex flex-col items-center justify-end justify-items-end gap-1 space-x-2 md:flex-row">
              <p className="text-sm font-medium">Linhas por página</p>
              <Select
                value={`${itemsPerPage}`}
                onValueChange={value => {
                  onItemsPerPageChange(Number(value))
                }}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={`${itemsPerPage}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value={"10"}>10</SelectItem>
                  <SelectItem value={"25"}>25</SelectItem>
                  <SelectItem value={"50"}>50</SelectItem>
                  <SelectItem value={"100"}>100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center gap-1 md:mt-0 md:flex-row">
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden size-8 p-0 lg:flex"
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}>
                  <span className="sr-only">Ir para a primeira página</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}>
                  <span className="sr-only">Ir para a página anterior</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}>
                  <span className="sr-only">Ir para a próxima página</span>
                  <ChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 p-0 lg:flex"
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}>
                  <span className="sr-only">Ir para a última página</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
