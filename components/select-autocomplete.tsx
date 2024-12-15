"use client"

import React, { useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

interface SelectAutocompleteProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  placeholder?: string
  fn?: (value: string) => T[]
}

export default function SelectAutocomplete<T>({ value, onChange, placeholder, className }: SelectAutocompleteProps<T>) {
  const [inputValue, setInputValue] = React.useState<string>("")
  const [debouncedInputValue, setDebouncedInputValue] = React.useState<string>("")

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 500)
    return () => clearTimeout(delayInputTimeoutId)
  }, [inputValue, 500])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("flex justify-between gap-2", !value && "text-muted-foreground", className)}>
            {value ? languages.find(language => language.value === value)?.label : placeholder || "Selecione"}
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
              {languages.map(language => (
                <CommandItem
                  value={language.label}
                  key={language.value}
                  onSelect={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    onChange ? onChange(language.value) : undefined
                  }}>
                  {language.label}
                  <Check className={cn("ml-auto", language.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
