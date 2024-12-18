"use client"

import React, { useState } from "react"
import menuItemService from "@/services/menu-item-service"
import moduleService from "@/services/module-service"
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useQuery } from "@tanstack/react-query"
import { CirclePlus } from "lucide-react"
import { toast } from "sonner"

import { MenuItem, Module } from "@/types/model-types"
import { useInvalidateQuery } from "@/hooks/use-invalidate-query"
import { Button } from "@/components/ui/button"
import Combobox, { ComboboxItem } from "@/components/combobox"
import { SortableItem } from "@/components/sortable-item"

export type MenuItemsOrder = {
  order: number
  menuItemId: string
}

type MenuItemDraggableListProps = {
  module: Module
}

export default function MenuItemDraggableList({ module }: MenuItemDraggableListProps) {
  const { invalidateQuery } = useInvalidateQuery()
  const [modulesMenuItems, setModulesMenuItems] = useState<MenuItem[]>(module.menuItems)
  const [orderedItems, setOrderedItems] = useState<{ order: number; item: MenuItem }[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>()
  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menuItems-combobox"],
    queryFn: () => menuItemService.fetchAll(),
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  function checkForChanges(updatedMenu: MenuItem[]) {
    const isEqual: boolean = JSON.stringify(updatedMenu) === JSON.stringify(module.menuItems)
    setHasChanges(!isEqual)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = modulesMenuItems.findIndex(item => item.id === active.id)
      const newIndex = modulesMenuItems.findIndex(item => item.id === over?.id)

      const updatedMenu = arrayMove(modulesMenuItems, oldIndex, newIndex)
      setModulesMenuItems(updatedMenu)

      const newOrderList = updatedMenu.map((item, index) => ({
        order: index + 1,
        item: item,
      }))

      setOrderedItems(newOrderList)
      checkForChanges(updatedMenu)
    }
  }

  async function handleAddMenuItem() {
    if (!selectedMenuItem) {
      toast.warning("Selecione um item de menu para adicionar")
      return
    }
    await moduleService.addMenuItem(module.id, selectedMenuItem)
    toast.success("Item de menu adicionado com sucesso!")
    await invalidateQuery(["module"])
  }

  async function handleSave() {
    setHasChanges(false)
    const menuItemsOrder: MenuItemsOrder[] = orderedItems.map(menuItem => ({
      order: menuItem.order,
      menuItemId: menuItem.item.id,
    }))

    await moduleService.updateMenuItemsOrder(module.id, menuItemsOrder)
    toast.success("Ordem dos itens de menu atualizada com sucesso!")
  }

  function getCombobox() {
    if (isLoading) {
      return <span>Caregando itens de menu do combobox</span>
    }

    if (!menuItems) {
      return <span>Não foi possível carregar os itens de menu</span>
    }

    const comboboxItems: ComboboxItem[] = menuItems.map(menuItem => ({
      label: menuItem.label,
      value: menuItem.id,
    }))

    return <Combobox className="rounded-r-none" items={comboboxItems} onSelectItem={setSelectedMenuItem} />
  }

  return (
    <div className="flex flex-col gap-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={modulesMenuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <ul style={{ padding: 0, listStyle: "none", width: "300px" }}>
            {modulesMenuItems.map(item => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {hasChanges && <Button onClick={handleSave}>Atualizar ordem</Button>}
      <div className="flex">
        {getCombobox()}
        <Button
          onClick={handleAddMenuItem}
          className="rounded-sm rounded-l-none border border-green-500 bg-green-200 p-4 text-green-500 hover:bg-green-200 hover:text-green-500"
          disabled={!selectedMenuItem}>
          <CirclePlus />
        </Button>
      </div>
    </div>
  )
}
