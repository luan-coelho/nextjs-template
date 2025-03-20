'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiRoutes, routes } from '@/routes'
import moduleService from '@/services/module-service'
import { ApiError } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Module } from '@/types/model-types'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ModuleSchema, moduleSchema } from '@/app/(features)/modules/schema'

export default function EditModuleForm({ module }: { module: Module }) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<ModuleSchema>({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            name: module?.name || '',
            description: module?.description || '',
        },
    })

    React.useEffect(() => {
        if (module) {
            form.reset({
                name: module.name,
                description: module.description,
            })
        }
    }, [module, form])

    const { handleSubmit, control } = form

    async function updateModule(data: ModuleSchema) {
        try {
            const updatedModule = await moduleService.updateById(module.id, data)
            await queryClient.invalidateQueries({
                queryKey: [apiRoutes.modules.index],
                exact: false,
            })
            router.replace(routes.modules.show(updatedModule.id))
            toast.success('Módulo atualizado com sucesso.')
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao atualizar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(updateModule)} className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe o nome" {...field} showIcon />
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
                <div className="col-span-12 flex items-center justify-end gap-2">
                    <Link className={buttonVariants({ variant: 'secondary' })} href={routes.modules.index}>
                        Cancelar
                    </Link>
                    <Button type="submit">Atualizar</Button>
                </div>
            </form>
        </FormProvider>
    )
}
