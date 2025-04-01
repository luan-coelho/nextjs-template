"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import menuItemService from "@/services/menu-item-service"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useQuery } from "@tanstack/react-query"
import { CirclePlus } from "lucide-react"
import { toast } from "sonner"

import { MenuItem, Module } from "@/types/entities"
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
  const router = useRouter()
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
    try {
      if (!selectedMenuItem) {
        toast.warning("Selecione um item de menu para adicionar")
        return
      }
      await moduleService.addMenuItem(module.id, selectedMenuItem)
      router.refresh()
      toast.success("Item de menu adicionado com sucesso!")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleSave() {
    setHasChanges(false)
    const menuItemsOrder: MenuItemsOrder[] = orderedItems.map(menuItem => ({
      order: menuItem.order,
      menuItemId: menuItem.item.id,
    }))

    try {
      await moduleService.updateMenuItemsOrder(module.id, menuItemsOrder)
      router.refresh()
      toast.success("Ordem dos itens de menu atualizada com sucesso!")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function handleRemoveMenuItem(menuItemId: string) {
    try {
      await moduleService.removeMenuItem(module.id, menuItemId)
      router.refresh()
      toast.success("Item de menu removido com sucesso!")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  function getCombobox() {
    if (isLoading) {
      return <span>Carregando itens de menu do combobox</span>
    }

    if (!menuItems) {
      return <span>Não foi possível carregar os itens de menu</span>
    }

    const comboboxItems: ComboboxItem[] = menuItems.map(menuItem => ({
      label: menuItem.label,
      value: menuItem.id,
    }))

    return (
      <Combobox className="rounded-r-none border-zinc-400" items={comboboxItems} onSelectItem={setSelectedMenuItem} />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={modulesMenuItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <ul className="min-w-full space-y-2 p-0">
            {modulesMenuItems.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                position={index + 1}
                onRemove={handleRemoveMenuItem}
              />
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
