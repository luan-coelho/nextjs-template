"use client"

import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxItem = {
  label: string
  value: string
}

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultItem: string
  items: ComboboxItem[]
  placeholder?: string
}

export default function Combobox({ defaultItem, items, placeholder, onChange, className }: ComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="dropdown"
            role="combobox"
            className={cn("flex justify-between gap-2", !defaultItem && "text-muted-foreground", className)}>
            {defaultItem ? items.find(item => item.value === defaultItem)?.label : placeholder || "Selecione"}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder || "Selecione"} />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    onChange ? onChange(item.value) : undefined
                  }}>
                  {item.label}
                  <Check className={cn("ml-auto", item.value === defaultItem ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
