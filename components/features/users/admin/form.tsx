'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiRoutes, routes } from '@/routes'
import userService from '@/services/user-service'
import { ApiError } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import { z } from 'zod'

import { User } from '@/types/model-types'
import isValidCPF from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
    name: z.string().min(1, {
        message: 'O nome é obrigatório.',
    }),
    surname: z.string().min(1, {
        message: 'O sobrenome é obrigatório.',
    }),
    cpf: z
        .string({
            required_error: 'O CPF é obrigatório.',
        })
        .min(14, {
            message: 'O CPF é inválido.',
        })
        .refine(val => isValidCPF(val), {
            message: 'O CPF é inválido.',
        }),
    email: z.string({
        required_error: 'O e-mail é obrigatório.',
    }),
    primaryPhone: z
        .string({
            required_error: 'O telefone é obrigatório.',
        })
        .min(10, {
            message: 'O telefone é inválido.',
        }),
    secondaryPhone: z.string().optional(),
})

type UserSchema = z.infer<typeof schema>

export default function UserForm({ user }: { user?: User }) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<UserSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user?.name || '',
            surname: user?.surname || '',
            cpf: user?.cpf || '',
            email: user?.email || '',
            primaryPhone: user?.primaryPhone || '',
            secondaryPhone: user?.secondaryPhone || '',
        },
    })

    async function onSubmit(data: UserSchema) {
        if (user && user.id) {
            await updateUser(data)
        } else {
            await createUser(data)
        }
    }

    async function createUser(data: UserSchema) {
        try {
            const createdUser = await userService.createAdmin(data)
            router.replace(routes.users.administrator.show(createdUser.id))
            toast.success('Usuário cadastrado com sucesso.')
            await queryClient.invalidateQueries({
                queryKey: [apiRoutes.users.admin.index],
            })
        } catch (error) {
            const apiError = new ApiError(error as ApiError)
            toast.error(`Erro ao cadastrar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
            apiError.applyErrorsToForm<UserSchema>(form.setError)
        }
    }

    async function updateUser(data: UserSchema) {
        try {
            const updatedUser = await userService.updateById(user?.id ?? '', data)
            await queryClient.invalidateQueries({
                queryKey: [apiRoutes.users.admin.index],
                exact: false,
            })
            router.replace(routes.users.administrator.show(updatedUser.id))
            toast.success('Usuário atualizado com sucesso.')
        } catch (error) {
            const apiError = error as ApiError
            toast.error(`Erro ao atualizar: ${apiError.detail || 'Erro inesperado. Tente novamente mais tarde.'}`)
        }
    }

    const cpfMaskOptions = {
        mask: '___.___.___-__',
        replacement: { _: /\d/ },
    }

    const phoneMaskOptions = {
        mask: '(__) _________',
        replacement: { _: /\d/ },
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
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
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sobrenome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe o sobrenome" {...field} showIcon />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <InputMask
                                        {...cpfMaskOptions}
                                        placeholder="Informe o CPF"
                                        {...field}
                                        component={Input}
                                        showIcon
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Informe o e-mail" {...field} showIcon />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={form.control}
                        name="primaryPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone principal</FormLabel>
                                <FormControl>
                                    <InputMask
                                        {...phoneMaskOptions}
                                        placeholder="Informe seu telefone principal"
                                        {...field}
                                        showIcon
                                        component={Input}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={form.control}
                        name="secondaryPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone secundário</FormLabel>
                                <FormControl>
                                    <InputMask
                                        {...phoneMaskOptions}
                                        placeholder="Informe seu telefone secundário"
                                        {...field}
                                        showIcon
                                        component={Input}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 flex items-center justify-end gap-2">
                    <Link className={buttonVariants({ variant: 'secondary' })} href={routes.users.administrator.index}>
                        Cancelar
                    </Link>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? <ClipLoader color="#FFF" size={20} /> : 'Salvar'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
