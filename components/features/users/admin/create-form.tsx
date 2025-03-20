'use client'

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

import { Button, buttonVariants } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { adminUserSchema, type AdminUserSchema } from '@/app/(features)/users/admin/schema'

export default function CreateUserForm() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<AdminUserSchema>({
        resolver: zodResolver(adminUserSchema),
        defaultValues: {
            name: '',
            surname: '',
            cpf: '',
            email: '',
            primaryPhone: '',
            secondaryPhone: '',
        },
    })

    const { handleSubmit, control } = form

    async function createUser(data: AdminUserSchema) {
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
            apiError.applyErrorsToForm<AdminUserSchema>(form.setError)
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
            <form onSubmit={handleSubmit(createUser)} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
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
                <div className="col-span-12 md:col-span-6">
                    <FormField
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
