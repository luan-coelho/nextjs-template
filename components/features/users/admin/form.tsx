"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import administratorUserService from "@/services/administrator-user-service"
import { ApiError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputMask } from "@react-input/mask"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { User } from "@/types/model-types"
import isValidCPF from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
  surname: z.string().min(1, {
    message: "O sobrenome é obrigatório.",
  }),
  cpf: z
    .string({
      required_error: "O CPF é obrigatório.",
    })
    .min(14, {
      message: "O CPF é inválido.",
    })
    .refine(val => isValidCPF(val), {
      message: "O CPF é inválido.",
    }),
  email: z
    .string({
      required_error: "O e-mail é obrigatório.",
    })
    .email({
      message: "O e-mail é inválido.",
    }),
  primaryPhone: z
    .string({
      required_error: "O telefone é obrigatório.",
    })
    .min(10, {
      message: "O telefone é inválido.",
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
      name: user?.name || "",
      surname: user?.surname || "",
      cpf: user?.cpf || "",
      email: user?.email || "",
      primaryPhone: user?.primaryPhone || "",
      secondaryPhone: user?.secondaryPhone || "",
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
      const createdUser = await administratorUserService.create(data)
      router.replace(routes.users.administrator.show(createdUser.id))
      toast.success("Usuário cadastrado com sucesso.")
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.administratorUsers.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function updateUser(data: UserSchema) {
    try {
      const updatedUser = await administratorUserService.updateById(user?.id ?? "", data)
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.administratorUsers.index],
        exact: false,
      })
      router.replace(routes.users.administrator.show(updatedUser.id))
      toast.success("Usuário atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  const cpfMaskOptions = {
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  }

  const phoneMaskOptions = {
    mask: "(__) _________",
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
                  <Input placeholder="Informe o nome" {...field} />
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
                  <Input placeholder="Informe o sobrenome" {...field} />
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
                  <InputMask {...cpfMaskOptions} placeholder="Informe o CPF" {...field} component={Input} />
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
                  <Input placeholder="Informe o e-mail" {...field} />
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
                    component={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-12 flex items-center justify-end gap-2">
          <Link className={buttonVariants({ variant: "secondary" })} href={routes.users.administrator.index}>
            Cancelar
          </Link>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </FormProvider>
  )
}
