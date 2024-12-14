"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (date?: Date) => void
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
        <Select onValueChange={value => setDate(addDays(new Date(), parseInt(value)))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Hoje</SelectItem>
            <SelectItem value="1">Amanhã</SelectItem>
            <SelectItem value="3">Em 3 dias</SelectItem>
            <SelectItem value="7">Em uma semana</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} locale={ptBR} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
