'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiRoutes, routes } from '@/routes'
import menuItemService from '@/services/menu-item-service'
import { ApiError } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { MenuItem } from '@/types/model-types'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import IconSelector from '@/components/features/menu-item/icon-selector'
import { MenuItemSchema, menuItemSchema } from '@/app/(features)/menu-items/schema'

export default function EditMenuItemForm({ menuItem }: { menuItem: MenuItem }) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<MenuItemSchema>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            label: menuItem.label,
            description: menuItem.description,
            route: menuItem.route,
            icon: menuItem.icon,
        },
    })

    const { handleSubmit, control } = form

    async function updateMenuItem(data: MenuItemSchema) {
        try {
            await menuItemService.updateById(menuItem.id, data)
            router.replace(routes.menuItems.show(menuItem.id))
            toast.success('Item de menu atualizado com sucesso.')
            await queryClient.invalidateQueries({
                queryKey: [apiRoutes.menuItems.index, apiRoutes.menuItems.show(menuItem.id)],
            })
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao atualizar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(updateMenuItem)} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe o label" {...field} showIcon />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={control}
                        name="route"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rota</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe a rota" {...field} showIcon />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12">
                    <FormField
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe a descrição" {...field} showIcon />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12">
                    <FormField
                        control={control}
                        name="icon"
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabel>Ícone</FormLabel>
                                <FormControl>
                                    <IconSelector name="icon" value={value} onSelect={icon => onChange(icon)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-12 flex items-center justify-end gap-2">
                    <Link className={buttonVariants({ variant: 'secondary' })} href={routes.menuItems.index}>
                        Cancelar
                    </Link>
                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </FormProvider>
    )
}
