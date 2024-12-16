import React from "react"
import Link from "next/link"
import { routes } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import IconSelector from "@/components/features/menu-item/icon-selector"

const schema = z.object({
  label: z.string().min(1, "Label é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório"),
  route: z.string().min(1, "Rota é obrigatório"),
  icon: z.string().min(1, "Ícone é obrigatório"),
})

export type MenuItemSchema = z.infer<typeof schema>

type MenuItemFormProps = {
  menuItem?: MenuItemSchema
  onSubmit: (data: MenuItemSchema) => void
}

export default function MenuItemForm({ menuItem, onSubmit }: MenuItemFormProps) {
  const form = useForm<MenuItemSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      label: menuItem?.label || "",
      description: menuItem?.description || "",
      route: menuItem?.route || "",
      icon: menuItem?.icon || "",
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o label" {...field} />
                </FormControl>
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
                  <Input placeholder="Informe a rota" {...field} />
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
                  <Input placeholder="Informe a descrição" {...field} />
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
  )
}
