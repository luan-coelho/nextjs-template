'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import menuItemService from '@/services/menu-item-service'
import moduleService from '@/services/module-service'
import { ChevronDown, ChevronUp, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'

import { MenuItem, MenuItemsOrder, Module } from '@/types/model-types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface MenuItemOrderListProps {
    module: Module
}

export default function MenuItemOrderList({ module }: MenuItemOrderListProps) {
    const router = useRouter()
    const [menuItems, setMenuItems] = useState<MenuItem[]>(module.menuItems || [])
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [availableMenuItems, setAvailableMenuItems] = useState<MenuItem[]>([])
    const [selectedMenuItemIds, setSelectedMenuItemIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

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
                console.error('Erro ao carregar itens de menu disponíveis:', error)
                toast.error('Não foi possível carregar a lista de itens de menu')
            } finally {
                setIsLoading(false)
            }
        }

        if (dialogOpen) {
            fetchAvailableMenuItems()
        }
    }, [dialogOpen, menuItems])

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

    const saveOrder = async () => {
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
            console.error('Erro ao salvar a ordem dos itens:', error)
            toast.error('Ocorreu um erro ao salvar a ordem dos itens de menu')
        } finally {
            setIsSaving(false)
        }
    }

    const toggleMenuItemSelection = (id: string) => {
        setSelectedMenuItemIds(prev => (prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]))
    }

    const addSelectedMenuItems = async () => {
        try {
            setIsSaving(true)

            // Buscar os detalhes completos dos itens selecionados
            const selectedItems = availableMenuItems.filter(item => selectedMenuItemIds.includes(item.id))

            // Adicionar itens ao módulo
            await moduleService.addMenuItemsToModule(module.id, selectedMenuItemIds)

            // Atualizar a lista local
            setMenuItems(prev => [...prev, ...selectedItems])

            toast.success('Itens de menu adicionados com sucesso')
            setDialogOpen(false)
            setSelectedMenuItemIds([])

            router.refresh()
        } catch (error) {
            console.error('Erro ao adicionar itens de menu:', error)
            toast.error('Ocorreu um erro ao adicionar os itens de menu')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="mb-4 flex justify-between">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <PlusCircle className="mr-2 size-4" /> Adicionar Itens de Menu
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Adicionar Itens de Menu</DialogTitle>
                        </DialogHeader>

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
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor={`item-${item.id}`}
                                                            className="block cursor-pointer font-medium">
                                                            {item.label}
                                                        </label>
                                                        {item.description && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}

                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={addSelectedMenuItems}
                                        disabled={selectedMenuItemIds.length === 0 || isSaving}>
                                        {isSaving ? 'Adicionando...' : 'Adicionar Itens'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveItem('up')}
                        disabled={!selectedItemId || isSaving}>
                        <ChevronUp className="mr-1 size-4" /> Mover para cima
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveItem('down')}
                        disabled={!selectedItemId || isSaving}>
                        <ChevronDown className="mr-1 size-4" /> Mover para baixo
                    </Button>
                    <Button onClick={saveOrder} disabled={isSaving}>
                        {isSaving ? 'Salvando...' : 'Salvar ordem'}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                {menuItems.map(item => (
                    <Card
                        key={item.id}
                        className={cn(
                            'cursor-pointer transition-colors',
                            selectedItemId === item.id ? 'border-primary' : '',
                        )}
                        onClick={() => handleSelectItem(item.id)}>
                        <CardContent className="p-4">
                            <div className="font-medium">{item.label}</div>
                            {item.description && (
                                <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {menuItems.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                    Nenhum item de menu encontrado para este módulo.
                </div>
            )}
        </div>
    )
}
