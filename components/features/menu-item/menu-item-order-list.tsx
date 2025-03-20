'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import menuItemService from '@/services/menu-item-service'
import moduleService from '@/services/module-service'
import { ChevronDown, ChevronUp, Loader2, Save, Trash, X } from 'lucide-react'
import { toast } from 'sonner'

import { MenuItem, MenuItemsOrder, Module } from '@/types/model-types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MenuItemOrderListProps {
    module: Module
}

export default function MenuItemOrderList({ module }: MenuItemOrderListProps) {
    const router = useRouter()
    const [menuItems, setMenuItems] = useState<MenuItem[]>(module.menuItems || [])
    const [originalOrder, setOriginalOrder] = useState<string[]>([])
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [availableMenuItems, setAvailableMenuItems] = useState<MenuItem[]>([])
    const [selectedMenuItemIds, setSelectedMenuItemIds] = useState<string[]>([])
    const [itemsToRemove, setItemsToRemove] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('ordem')
    const [isRemoveMode, setIsRemoveMode] = useState(false)

    // Armazenar a ordem original dos itens quando o componente é montado
    useEffect(() => {
        if (module.menuItems) {
            setOriginalOrder(module.menuItems.map(item => item.id))
        }
    }, [module.menuItems])

    // Verificar se a ordem foi alterada
    const hasOrderChanged = () => {
        const currentOrder = menuItems.map(item => item.id)

        if (currentOrder.length !== originalOrder.length) return true

        return currentOrder.some((id, index) => id !== originalOrder[index])
    }

    // Buscar todos os itens de menu disponíveis
    useEffect(() => {
        const fetchAvailableMenuItems = async () => {
            try {
                setIsLoading(true)
                const items = await menuItemService.fetchAll()

                // Filtrar para remover itens que já estão no módulo
                const moduleItemIds = new Set(menuItems.map(item => item.id))
                const filteredItems = items.filter(item => !moduleItemIds.has(item.id))

                setAvailableMenuItems(filteredItems)
            } catch (error) {
                toast.error('Não foi possível carregar a lista de itens de menu')
            } finally {
                setIsLoading(false)
            }
        }

        if (activeTab === 'adicionar') {
            fetchAvailableMenuItems()
        }
    }, [activeTab, menuItems])

    const handleSelectItem = (id: string) => {
        setSelectedItemId(id === selectedItemId ? null : id)
    }

    const moveItem = (direction: 'up' | 'down') => {
        if (!selectedItemId) return

        const currentIndex = menuItems.findIndex(item => item.id === selectedItemId)
        if (currentIndex === -1) return

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

        // Verificar se o novo índice está dentro dos limites
        if (newIndex < 0 || newIndex >= menuItems.length) return

        // Criar uma cópia do array e trocar os itens de posição
        const newMenuItems = [...menuItems]
        const temp = newMenuItems[currentIndex]
        newMenuItems[currentIndex] = newMenuItems[newIndex]
        newMenuItems[newIndex] = temp

        setMenuItems(newMenuItems)
    }

    async function saveOrder() {
        try {
            setIsSaving(true)

            // Criar array de MenuItemsOrder com base na ordem atual
            const menuItemsOrder: MenuItemsOrder[] = menuItems.map((item, index) => ({
                order: index,
                menuItemId: item.id,
            }))

            // Chamar o serviço para salvar a ordem
            await moduleService.updateMenuItemsOrder(module.id, menuItemsOrder)

            toast.success('Ordem dos itens de menu atualizada com sucesso')

            router.refresh()
        } catch (error) {
            toast.error('Ocorreu um erro ao salvar a ordem dos itens de menu')
        } finally {
            setIsSaving(false)
        }
    }

    const toggleMenuItemSelection = (id: string) => {
        setSelectedMenuItemIds(prev => (prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]))
    }

    async function addSelectedMenuItems() {
        try {
            setIsSaving(true)

            // Buscar os detalhes completos dos itens selecionados
            const selectedItems = availableMenuItems.filter(item => selectedMenuItemIds.includes(item.id))

            // Adicionar itens ao módulo
            await moduleService.addMenuItems(module.id, selectedMenuItemIds)

            // Atualizar a lista local
            setMenuItems(prev => [...prev, ...selectedItems])

            toast.success('Itens de menu adicionados com sucesso')
            setActiveTab('ordem')
            setSelectedMenuItemIds([])

            router.refresh()
        } catch (error) {
            toast.error('Ocorreu um erro ao adicionar os itens de menu')
        } finally {
            setIsSaving(false)
        }
    }

    function toggleItemToRemove(id: string) {
        setItemsToRemove(prev => (prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]))
    }

    async function removeSelectedItems() {
        try {
            setIsSaving(true)

            // Chamar o serviço para remover os itens selecionados
            await moduleService.removeMenuItems(module.id, itemsToRemove)

            // Atualizar a lista local
            setMenuItems(prev => prev.filter(item => !itemsToRemove.includes(item.id)))

            toast.success('Itens de menu removidos com sucesso')
            setItemsToRemove([])
            setIsRemoveMode(false)

            router.refresh()
        } catch (error) {
            toast.error('Ocorreu um erro ao remover os itens de menu')
        } finally {
            setIsSaving(false)
        }
    }

    function cancelRemove() {
        setItemsToRemove([])
        setIsRemoveMode(false)
    }

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <TabsList className="grid w-full grid-cols-2 md:w-auto">
                        <TabsTrigger value="ordem">Ordenar Itens</TabsTrigger>
                        <TabsTrigger value="adicionar">Adicionar Itens</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="ordem">
                    <div className="flex flex-row gap-2">
                        <ScrollArea className="max-h-[60vh] w-full">
                            {menuItems.map(item => (
                                <Card
                                    key={item.id}
                                    className={cn(
                                        'w-full cursor-pointer border-t border-t-gray-200 transition-colors hover:bg-gray-50',
                                        selectedItemId === item.id && !isRemoveMode
                                            ? 'border-l-4 border-primary bg-primary/5'
                                            : 'border-l-4 border-l-transparent',
                                        itemsToRemove.includes(item.id)
                                            ? 'border-l-4 border-destructive bg-destructive/5'
                                            : '',
                                    )}
                                    onClick={() =>
                                        isRemoveMode ? toggleItemToRemove(item.id) : handleSelectItem(item.id)
                                    }>
                                    <CardContent className="p-3 sm:p-4">
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-1 items-center">
                                                {isRemoveMode && (
                                                    <Checkbox
                                                        className="mr-2"
                                                        checked={itemsToRemove.includes(item.id)}
                                                        onCheckedChange={() => toggleItemToRemove(item.id)}
                                                        onClick={e => e.stopPropagation()}
                                                    />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center font-medium">
                                                        <span
                                                            className={cn(
                                                                'mr-2 shrink-0 rounded px-2 py-1 text-xs font-semibold sm:text-sm',
                                                                selectedItemId === item.id && !isRemoveMode
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-gray-200 text-gray-700',
                                                            )}>
                                                            {menuItems.findIndex(mi => mi.id === item.id) + 1}
                                                        </span>
                                                        <span className="truncate">{item.label}</span>
                                                    </div>
                                                    {item.description && (
                                                        <div className="ml-0 mt-1 border-l-2 border-gray-200 pl-2 text-xs text-muted-foreground sm:ml-8 sm:text-sm">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </ScrollArea>
                        {menuItems.length > 0 && (
                            <div className="flex flex-col justify-start gap-2">
                                <Button
                                    size="icon"
                                    onClick={() => moveItem('up')}
                                    disabled={!selectedItemId || isSaving || isRemoveMode || menuItems.length <= 1}>
                                    <ChevronUp />
                                </Button>
                                <Button
                                    size="icon"
                                    onClick={() => moveItem('down')}
                                    disabled={!selectedItemId || isSaving || isRemoveMode || menuItems.length <= 1}>
                                    <ChevronDown />
                                </Button>
                                <Button
                                    className="bg-green-500 hover:bg-green-600"
                                    size="icon"
                                    onClick={saveOrder}
                                    disabled={isSaving || isRemoveMode || menuItems.length === 0 || !hasOrderChanged()}>
                                    {isSaving ? <Loader2 /> : <Save />}
                                </Button>

                                <div className="flex flex-wrap justify-end gap-2">
                                    {isRemoveMode ? (
                                        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                onClick={removeSelectedItems}
                                                disabled={itemsToRemove.length === 0 || isSaving}>
                                                {isSaving ? <Loader2 /> : <Trash />}
                                            </Button>
                                            <Button size="icon" variant="outline" onClick={cancelRemove}>
                                                <X />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            size="icon"
                                            className="border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                            onClick={() => setIsRemoveMode(true)}
                                            disabled={menuItems.length === 0}>
                                            <Trash />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {menuItems.length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">
                            Nenhum item de menu encontrado para este módulo.
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="adicionar">
                    <div className="mb-4">
                        {availableMenuItems.length > 0 && (
                            <h3 className="mb-2 text-center text-base font-medium">Itens de Menu Disponíveis</h3>
                        )}

                        {isLoading ? (
                            <div className="py-6 text-center">Carregando itens de menu...</div>
                        ) : (
                            <>
                                {availableMenuItems.length === 0 ? (
                                    <div className="py-6 text-center text-muted-foreground">
                                        Não há itens de menu disponíveis para adicionar.
                                    </div>
                                ) : (
                                    <ScrollArea className="max-h-[60vh]">
                                        <div className="space-y-2 p-2">
                                            {availableMenuItems.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center space-x-2 rounded-md border p-3">
                                                    <Checkbox
                                                        id={`item-${item.id}`}
                                                        checked={selectedMenuItemIds.includes(item.id)}
                                                        onCheckedChange={() => toggleMenuItemSelection(item.id)}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <label
                                                            htmlFor={`item-${item.id}`}
                                                            className="block cursor-pointer truncate font-medium">
                                                            {item.label}
                                                        </label>
                                                        {item.description && (
                                                            <p className="truncate text-xs text-muted-foreground sm:text-sm">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}

                                <div className="mt-4 flex flex-col justify-end gap-2 sm:flex-row">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setActiveTab('ordem')}
                                        className="w-full sm:w-auto">
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={addSelectedMenuItems}
                                        disabled={selectedMenuItemIds.length === 0 || isSaving}
                                        className="w-full sm:w-auto">
                                        {isSaving ? 'Adicionando...' : 'Adicionar Itens'}
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
