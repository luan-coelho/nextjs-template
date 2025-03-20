'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiRoutes, routes } from '@/routes'
import moduleService from '@/services/module-service'
import { ApiError } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

import { Button, buttonVariants } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ModuleSchema, moduleSchema } from '@/app/(features)/modules/schema'

export default function CreateModuleForm() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<ModuleSchema>({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const { handleSubmit, control, formState } = form

    async function createModule(data: ModuleSchema) {
        try {
            const createdModule = await moduleService.create(data)
            router.replace(routes.modules.show(createdModule.id))
            toast.success('Módulo cadastrado com sucesso.')
            await queryClient.invalidateQueries({
                queryKey: [apiRoutes.modules.index],
            })
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao cadastrar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(createModule)} className="grid grid-cols-12 gap-4">
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
                    <Button type="submit" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? <ClipLoader color="#FFF" size={20} /> : 'Cadastrar'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
