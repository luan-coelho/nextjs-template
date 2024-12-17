"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rocket } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  login: z.string().min(1, "Login é obrigatório"),
  password: z.string().min(1, "Senha é obrigatório"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <React.Fragment>
      <div className="flex size-full items-center justify-center">
        <div className="relative hidden h-full bg-zinc-800 text-white md:block md:grow">
          <div className="absolute left-10 top-10 flex items-center gap-2 text-lg font-medium">
            <Rocket />
            <span>Logo</span>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-7 p-5 sm:p-10 md:w-[500px] lg:p-12">
          <h1 className="text-center text-2xl font-semibold tracking-tight">Faça login no APP</h1>
          <span className="text-center text-zinc-600">
            Bem-vindo ao APP, insira seus dados de login abaixo para usar o aplicativo.
          </span>
          <div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Informe o login"
                          {...field}
                          className="h-14 placeholder:text-base placeholder:text-zinc-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Informe a senha"
                          {...field}
                          className="h-14 placeholder:text-base placeholder:text-zinc-700"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="h-12 w-full" type="submit">
                  Entrar
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
