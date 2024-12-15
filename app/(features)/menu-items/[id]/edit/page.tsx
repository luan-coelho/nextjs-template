"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useMenuItem } from "@/hooks/use-menu-items"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import IconSelector from "@/components/features/menu-item/icon-selector"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"
import SelectAutocomplete from "@/components/select-autocomplete"

const schema = z.object({
  label: z.string().min(1, "Label é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
  module: z.string().min(1, "Módulo é obrigatório"),
  route: z.string().min(1, "Rota é obrigatório"),
  icon: z.string().min(1, "Ícone é obrigatório"),
})

type UpdateMenuItem = z.infer<typeof schema>

export default function EditMenuItemPage() {
  const params = useParams<{ id: string }>()
  const { data: menuItem, isLoading } = useMenuItem(params.id)

  const form = useForm<UpdateMenuItem>({
    resolver: zodResolver(schema),
  })

  const { reset } = form

  useEffect(() => {
    reset(menuItem)
  }, [menuItem, reset])

  async function onUpdate(data: UpdateMenuItem) {
    try {
      await menuItemService.updateById(params.id, data)
      toast.success("Item de menu atualizado com sucesso.")
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao atualizar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  if (isLoading) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <BreadcrumbContent items={[{ label: "Itens de menu", href: routes.menuItems.index }, { label: "Editar" }]} />
      <PageTitle>Editar Item de Menu</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onUpdate)} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="label" {...field} />
                      </FormControl>
                      <FormDescription>Identificador que aparecerá no menu lateral</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="route"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rota</FormLabel>
                      <FormControl>
                        <Input placeholder="route" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="module"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="">
                      <FormLabel>Módulo</FormLabel>
                      <FormControl>
                        <SelectAutocomplete className="w-full" value={value} onChange={onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
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
                <Link className={buttonVariants({ variant: "secondary" })} href={routes.menuItems.index}>
                  Cancelar
                </Link>
                <Button className="w-full md:w-auto" type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
