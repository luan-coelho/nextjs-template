import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Rocket } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/auth/register/user-auth-form"

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Cadastro de usuário",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center sm:flex md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 border-primary bg-transparent text-primary hover:bg-primary hover:text-white md:right-8 md:top-8",
          )}>
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
            <Rocket />
            <span>Logo</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Aqui eu vou colocar alguma imagem.&rdquo;</p>
              <footer className="text-sm">Luan Coêlho</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Crie uma conta</h1>
              <p className="text-sm text-muted-foreground">Digite seu e-mail abaixo para criar sua conta</p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
