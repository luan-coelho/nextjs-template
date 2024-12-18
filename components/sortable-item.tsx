import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Trash } from "lucide-react"

import { MenuItem } from "@/types/model-types"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"

interface SortableItemProps {
  id: string
  item: MenuItem
  position: number

  onRemove(id: string): void
}

export function SortableItem({ id, item, position, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={
        "flex min-h-11 w-full items-center justify-between gap-2.5 border-0 border-none bg-[#262626] pl-4 text-[#bfbfbf] hover:bg-[#262626] hover:text-white"
      }>
      <div className="flex w-full items-center justify-start gap-2.5 py-1.5">
        <span>{position}</span>
        <LucideIcon name={item.icon} size={16} />
        <div className="text-sm font-normal leading-snug">{item.label}</div>
      </div>
      <Button className="m-0 rounded-none bg-red-500 hover:bg-red-600" onClick={() => onRemove(id)}>
        <Trash size={16} />
      </Button>
    </li>
  )
}
