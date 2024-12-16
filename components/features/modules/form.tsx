"use client"

import Link from "next/link"
import { routes } from "@/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
})

export type ModuleSchema = z.infer<typeof schema>

type ModuleFormProps = {
  module?: ModuleSchema
  onSubmit: (data: ModuleSchema) => void
}

export default function ModuleForm({ module, onSubmit }: ModuleFormProps) {
  const form = useForm<ModuleSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: module?.name || "",
    },
  })

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
                  <Input placeholder="Informe o nome" {...field} />
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
          <Button className="w-full md:w-auto" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
