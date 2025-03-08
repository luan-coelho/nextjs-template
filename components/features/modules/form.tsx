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

import { Module } from "@/types/model-types"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
})

type ModuleSchema = z.infer<typeof schema>

export default function ModuleForm({ module }: { module?: Module }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<ModuleSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: module?.name || "",
    },
  })

  async function onSubmit(data: ModuleSchema) {
    if (module && module.id) {
      await updateModule(data)
    } else {
      await createModule(data)
    }
  }

  async function createModule(data: ModuleSchema) {
    try {
      const createdModule = await moduleService.create(data)
      router.replace(routes.modules.show(createdModule.id))
      toast.success("Módulo cadastrado com sucesso.")
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
      })
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  async function updateModule(data: ModuleSchema) {
    try {
      const updatedModule = await moduleService.updateById(module?.id ?? "", data)
      await queryClient.invalidateQueries({
        queryKey: [apiRoutes.modules.index],
        exact: false,
      })
      router.replace(routes.modules.show(updatedModule.id))
      toast.success("Módulo atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <FormProvider {...form}>
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
