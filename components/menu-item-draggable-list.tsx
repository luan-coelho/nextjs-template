"use client"

import React, { useState } from "react"
import { apiRoutes } from "@/routes"
import moduleService from "@/services/module-service"
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CirclePlus } from "lucide-react"
import { toast } from "sonner"

import { MenuItem, Module } from "@/types/backend-model"
import useNoCacheQuery from "@/lib/use-fetch"
import { Button } from "@/components/ui/button"
import Combobox, { ComboboxItem } from "@/components/combobox"
import SpinnerLoading from "@/components/layout/spinner-loading"
import { SortableItem } from "@/components/sortable-item"

export type MenuItemsOrder = {
  order: number
  menuItemId: string
}

type MenuItemDraggableListProps = {
  module: Module
}

export default function MenuItemDraggableList({ module }: MenuItemDraggableListProps) {
  const [modulesMenuItems, setModulesMenuItems] = useState<MenuItem[]>(module.menuItems)
  const [orderedItems, setOrderedItems] = useState<{ order: number; item: MenuItem }[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const { data: menuItems, isLoading: isLoadingMenuItemsFetch } = useNoCacheQuery<MenuItem[]>(apiRoutes.menuItems.all)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  function checkForChanges(updatedMenu: MenuItem[]) {
    const isEqual = JSON.stringify(updatedMenu) === JSON.stringify(module.menuItems)
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

  function handleSelectItem(item: string) {
    console.log(item)
  }

  function getCombobox() {
    if (isLoadingMenuItemsFetch) {
      return <SpinnerLoading />
    }

    const comboboxItems: ComboboxItem[] = menuItems?.map(menuItem => ({
      label: `${menuItem.label} - ${menuItem.route}`,
      value: menuItem.id,
    }))

    return <Combobox items={comboboxItems} onSelectItem={handleSelectItem} />
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
        <SortableContext items={modulesMenuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <ul style={{ padding: 0, listStyle: "none", width: "300px" }}>
            {modulesMenuItems.map(item => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {hasChanges && <Button onClick={handleSave}>Atualizar ordem</Button>}
      <div className="space-y-3">
        {getCombobox()}
        <Button className="rounded-sm border border-green-500 bg-green-200 p-4 text-green-500 hover:bg-green-200 hover:text-green-500">
          <CirclePlus /> Adicionar item de menu
        </Button>
      </div>
    </div>
  )
}
