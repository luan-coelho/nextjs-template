"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange(date?: Date): void

  disabled: boolean
}

export default function DatePicker({ onDateChange, disabled }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  function handleDateChange(date?: Date): void {
    setDate(date)
    onDateChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn("h-10 justify-start text-left font-normal", !date && "text-muted-foreground")}>
          <CalendarIcon />
          {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <div className="rounded-sm border">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown-buttons"
            onSelect={handleDateChange}
            locale={ptBR}
            fromYear={2000}
            toYear={new Date().getFullYear()}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
