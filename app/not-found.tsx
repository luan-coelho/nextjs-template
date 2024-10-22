"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CircleArrowLeft, House } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div>
        <Image src="/images/404.svg" alt="404 Error" width={500} height={500} className="h-72" />
      </div>
      <div className="w-4/5 text-center md:w-1/2">
        <h1 className="mt-8 text-3xl font-semibold text-gray-800">Que pena!</h1>
        <p className="mt-4 font-sans text-lg leading-7">Não encontramos a página que você procura :(</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row">
          <Button
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={router.back}>
            <CircleArrowLeft /> Voltar para a página anterior
          </Button>
          <Button asChild>
            <Link className="flex items-center justify-center gap-2" href="/dashboard/">
              <House /> Página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
