"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rocket } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

const schema = z.object({
  login: z.string().min(1, "Login é obrigatório"),
  password: z.string().min(1, "Senha é obrigatório"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="relative h-full w-4/6 bg-zinc-800 text-white">
          <div className="absolute left-10 top-10 flex items-center gap-2 text-lg font-medium">
            <Rocket />
            <span>Logo</span>
          </div>
        </div>
        <div className="w-2/6 lg:p-8">
          <div className="flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <Form.Field>
                    <Form.Label htmlFor="login">Login</Form.Label>
                    <Form.TextField name="login" />
                    <Form.ErrorMessage field="login" />
                  </Form.Field>
                  <Form.Field>
                    <Form.Label htmlFor="password">Senha</Form.Label>
                    <Form.TextField name="password" />
                    <Form.ErrorMessage field="password" />
                  </Form.Field>
                  <Button className="w-full" type="submit">
                    Entrar
                  </Button>
                </form>
              </FormProvider>
              <Link href="/auth/register" className={cn(buttonVariants({ variant: "ghost" }), "border-zinc-900")}>
                Criar Conta
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }))}>
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
