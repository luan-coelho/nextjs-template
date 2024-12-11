import * as React from "react"
import { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface TableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function TableFacetedFilter<TData, TValue>({ column, title, options }: TableFacetedFilterProps<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-sm border-dashed border-primary text-primary hover:bg-transparent hover:text-primary">
          <PlusCircle />
          {title}
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge variant="secondary" className="rounded-sm px-1 font-normal text-primary lg:hidden">
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1 font-normal text-primary">
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter(option => selectedValues.has(option.value))
                  .map(option => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm bg-primary px-1 font-normal text-white hover:bg-primary hover:text-white">
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(filterValues.length ? filterValues : undefined)
                    }}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}>
                      <Check />
                    </div>
                    {option.icon && <option.icon className="mr-2 size-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center text-center">
                  Limpar filtros
                </CommandItem>
              </CommandGroup>
            </>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}