"use client"

import { useEffect } from "react"
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
import { Form } from "@/components/ui/form"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

const schema = z.object({
  label: z.string().min(1, "Label é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
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
              <div className="col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="label">Label</Form.Label>
                  <Form.TextField name="label" />
                  <Form.ErrorMessage field="label" />
                </Form.Field>
              </div>
              <div className="col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="description">Descrição</Form.Label>
                  <Form.TextField name="description" />
                  <Form.ErrorMessage field="description" />
                </Form.Field>
              </div>
              <div className="col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="route">Rota</Form.Label>
                  <Form.TextField name="route" />
                  <Form.ErrorMessage field="route" />
                </Form.Field>
              </div>
              <div className="col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="icon">Ícone</Form.Label>
                  <Form.TextField name="icon" />
                  <Form.ErrorMessage field="icon" />
                </Form.Field>
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
