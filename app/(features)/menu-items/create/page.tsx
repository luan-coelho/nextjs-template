"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { routes } from "@/routes"
import menuItemService from "@/services/menu-item-service"
import { ApiError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import IconSelector from "@/components/features/menu-item/icon-selector"
import BreadcrumbContent from "@/components/layout/content-breadcrumb"
import PageTitle from "@/components/layout/page-title"

const schema = z.object({
  label: z.string().min(1, "Label é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
  route: z.string().min(1, "Rota é obrigatório"),
  icon: z.string({ required_error: "Ícone é obrigatório" }).min(1, "Ícone é obrigatório"),
})

type CreateMenuItemSchema = z.infer<typeof schema>

export default function CreateMenuItemPage() {
  const router = useRouter()

  const form = useForm<CreateMenuItemSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  const { handleSubmit, control } = form

  async function createMenuItem(data: CreateMenuItemSchema) {
    try {
      await menuItemService.create(data)
      toast.success("Item de menu cadastrado com sucesso.")
      router.push(routes.menuItems.index)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(`Erro ao cadastrar: ${apiError.detail || "Erro inesperado. Tente novamente mais tarde."}`)
    }
  }

  return (
    <>
      <BreadcrumbContent items={[{ label: "Itens de menu", href: routes.menuItems.index }, { label: "Cadastrar" }]} />
      <PageTitle>Cadastrar Item de Menu</PageTitle>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(createMenuItem)} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="label">Label</Form.Label>
                  <Form.TextField name="label" />
                  <Form.ErrorMessage field="label" />
                </Form.Field>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Form.Field>
                  <Form.Label htmlFor="route">Rota</Form.Label>
                  <Form.TextField name="route" />
                  <Form.ErrorMessage field="route" />
                </Form.Field>
              </div>
              <div className="col-span-12">
                <Form.Field>
                  <Form.Label htmlFor="description">Descrição</Form.Label>
                  <Form.TextField name="description" />
                  <Form.ErrorMessage field="description" />
                </Form.Field>
              </div>
              <Controller
                control={control}
                name="icon"
                render={({ field: { onChange } }) => (
                  <div className="col-span-12 space-y-1">
                    <Form.Field>
                      <Form.Label htmlFor="icon">Ícone</Form.Label>
                      <IconSelector name="icon" onSelect={icon => onChange(icon)} />
                      <Form.ErrorMessage field="icon" />
                    </Form.Field>
                  </div>
                )}
              />
              <div className="col-span-12 flex items-center justify-end gap-2">
                <Link
                  className={cn("w-full md:w-auto", buttonVariants({ variant: "secondary" }))}
                  href={routes.menuItems.index}>
                  Cancelar
                </Link>
                <Button className="w-full md:w-auto" type="submit">
                  Cadastrar
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  )
}
