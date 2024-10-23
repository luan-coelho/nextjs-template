import { Metadata } from "next"
import Link from "next/link"
import { Rocket } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { login } from "@/app/auth/actions"

export const metadata: Metadata = {
  title: "SignIn",
  description: "SignIn page",
}

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center sm:flex md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-blue-600" />
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
            <Rocket />
            <span>Logo</span>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <form action={login}>
                <button type="submit">Entrar com Google</button>
              </form>
              <Link
                href="/auth/register"
                className={cn(buttonVariants({ variant: "ghost" }), "absolute right-4 top-4 md:right-8 md:top-8")}>
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
