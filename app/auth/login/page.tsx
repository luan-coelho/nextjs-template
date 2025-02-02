"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Rocket } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  rememberMe: z.boolean().default(false),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Formulário */}
      <div className="mx-auto flex w-1/2 max-w-md flex-col justify-center p-8">
        {/* Cabeçalho */}
        <h1 className="mb-2 text-center text-2xl font-bold">Bem-vindo de volta!</h1>
        <p className="mb-8 text-center text-gray-600">Entre para ter acesso ilimitado aos dados e informações.</p>

        {/* Formulário */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu endereço de email" {...field} className="h-10" />
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
                  <FormLabel>
                    Senha<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        {...field}
                        className="h-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-600">Lembrar-me</FormLabel>
                  </FormItem>
                )}
              />
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Form>
      </div>

      {/* Lado direito - Arte decorativa */}
      <div className="relative w-1/2 overflow-hidden bg-indigo-600">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 size-64 rounded-tl-full bg-indigo-500"></div>
          <div className="absolute left-20 top-20 size-20 bg-teal-400"></div>
          <div className="absolute right-40 top-40 size-16 rotate-45 bg-yellow-400"></div>
        </div>
      </div>
    </div>
  )
}
