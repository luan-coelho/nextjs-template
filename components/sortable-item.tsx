import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { MenuItem } from "@/types/model-types"
import { LucideIcon } from "@/components/ui/lucide-icon"

interface SortableItemProps {
  id: string
  item: MenuItem
}

export function SortableItem({ id, item }: SortableItemProps) {
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
        "flex min-h-11 items-center justify-start gap-2.5 bg-[#262626] py-1.5 pl-10 text-[#bfbfbf] hover:bg-[#262626] hover:text-white"
      }>
      <div className="flex items-center justify-start gap-2.5">
        <LucideIcon name={item.icon} size={16} />
        <div className="text-sm font-normal leading-snug">{item.label}</div>
      </div>
    </li>
  )
}
