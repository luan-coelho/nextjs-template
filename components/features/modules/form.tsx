'use client'

import { startTransition, useActionState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createModule } from '@/app/(features)/modules/actions'
import { ModuleSchema, schema } from '@/app/(features)/modules/schema'

export type FormState = {
    success: boolean
    fields?: Record<string, string>
    errors?: Record<string, string[]>
}

const initialState: FormState = {
    success: false,
    fields: {},
    errors: {},
}

export default function CreateModuleForm() {
    const [state, formAction, isPending] = useActionState(createModule, initialState)

    const form = useForm<ModuleSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    function onSubmit(data: ModuleSchema) {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        startTransition(() => {
            formAction(formData)
        })
    }

    if (state.success && state.fields?.id) {
        toast.success('Módulo cadastrado com sucesso.')
        redirect(routes.modules.show(state.fields.id))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <FormField
                        control={form.control}
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
                        control={form.control}
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
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Cadastrar'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
