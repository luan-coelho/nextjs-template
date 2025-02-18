"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiRoutes, routes } from "@/routes"
import moduleService from "@/services/module-service"
import { ApiError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { User } from "@/types/model-types"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
  cpf: z
    .string({
      required_error: "O CPF é obrigatório.",
    })
    .min(11, {
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
  secondaryPhone: z.string(),
})

type UserSchema = z.infer<typeof schema>

export default function UserForm({ user }: { user?: User }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<UserSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
    },
  })

  async function onSubmit(data: UserSchema) {
    if (module && module.id) {
      await updateUser(data)
    } else {
      await createUser(data)
    }
  }

  async function createUser(data: UserSchema) {
    try {
      const createdUser = await moduleService.create(data)
      router.replace(routes.modules.show(createdUser.id))
      toast.success("Usuário cadastrado com sucesso.")
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function updateUser(data: UserSchema) {
    try {
      const updatedUser = await moduleService.updateById(module?.id ?? "", data)
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
        exact: false,
      })
      router.replace(routes.modules.show(updatedUser.id))
      toast.success("Usuário atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
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
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o CPF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-12">
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
                  <Input placeholder="Informe o telefone" {...field} />
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
                  <Input placeholder="Informe o telefone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-12 flex items-center justify-end gap-2">
          <Link className={buttonVariants({ variant: "secondary" })} href={routes.modules.index}>
            Cancelar
          </Link>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </FormProvider>
  )
}
