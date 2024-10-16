"use client"

import Image from "next/image"
import Link from "next/link" // Usage: App router
import { useRouter } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:flex-row">
      <div className="w-4/5 text-left md:mr-8 md:w-1/2">
        <h1 className="mt-8 text-3xl font-semibold text-gray-800">Uh Ohh!</h1>
        <p className="mt-4 font-sans text-lg leading-7">Não encontramos a página que você procura :(</p>
        <div className="flex items-center gap-2">
          <Button onClick={router.back}>Voltar para a página anterior</Button>
          <Button asChild>
            <Link href="/dashboard/">Página inicial</Link>
          </Button>
        </div>
      </div>
      <div className="relative w-4/5 md:h-auto">
        <Image src="/404.png" alt="404 Error" width={500} height={500} className="h-72 md:h-auto" />
      </div>
    </div>
  )
}
