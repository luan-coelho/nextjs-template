"use client"

import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxItem = {
  label: string
  value: string
}

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultItem?: string
  items: ComboboxItem[]
  placeholder?: string
  emptyMessage?: string

  onSelectItem(value: string): void
}

export default function Combobox({
  defaultItem,
  items,
  placeholder,
  emptyMessage,
  onSelectItem,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>(defaultItem || "")

  function handleSelect(currentValue: string) {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    onSelectItem(currentValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="dropdown"
          role="combobox"
          aria-expanded={open}
          className={cn("flex w-full justify-between gap-2", !defaultItem && "text-muted-foreground", className)}>
          {value ? items.find(item => item.value === value)?.label : placeholder || "Selecione"}
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder || "Selecione"} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem value={item.value} key={item.value} onSelect={handleSelect}>
                  {item.label}
                  <Check className={cn("ml-auto", item.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
