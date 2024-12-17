"use client"

import React, { useState } from "react"
import moduleService from "@/services/module-service"
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { toast } from "sonner"

import { MenuItem, Module } from "@/types/backend-model"
import { Button } from "@/components/ui/button"
import { SortableItem } from "@/components/sortable-item"

export type MenuItemsOrder = {
  order: number
  menuItemId: string
}

type MenuItemDraggableListProps = {
  module: Module
  initialMenuItems: MenuItem[]
}

export default function MenuItemDraggableList({ module, initialMenuItems }: MenuItemDraggableListProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [orderedItems, setOrderedItems] = useState<{ order: number; item: MenuItem }[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  function checkForChanges(updatedMenu: MenuItem[]) {
    const isEqual = JSON.stringify(updatedMenu) === JSON.stringify(initialMenuItems)
    setHasChanges(!isEqual)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = menuItems.findIndex(item => item.id === active.id)
      const newIndex = menuItems.findIndex(item => item.id === over?.id)

      const updatedMenu = arrayMove(menuItems, oldIndex, newIndex)
      setMenuItems(updatedMenu)

      const newOrderList = updatedMenu.map((item, index) => ({
        order: index + 1,
        item: item,
      }))

      setOrderedItems(newOrderList)
      checkForChanges(updatedMenu)
    }
  }

  async function handleSave() {
    console.log("Salvar nova ordem:", orderedItems)
    setHasChanges(false)
    const menuItemsOrder: MenuItemsOrder[] = orderedItems.map(menuItem => ({
      order: menuItem.order,
      menuItemId: menuItem.item.id,
    }))

    await moduleService.updateMenuItemsOrder(module.id, menuItemsOrder)
    toast.success("Ordem dos itens de menu atualizada com sucesso!")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={menuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <ul style={{ padding: 0, listStyle: "none", width: "300px" }}>
            {menuItems.map(item => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {hasChanges && <Button onClick={handleSave}>Atualizar ordem</Button>}
    </div>
  )
}
