'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CircleArrowLeft, House } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <Image src="/images/404.svg" alt="404 Error" width={500} height={500} className="h-72 drop-shadow-lg" />
            </motion.div>
            <motion.div
                className="w-4/5 text-center md:w-1/2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}>
                <h1 className="mt-8 text-4xl font-bold text-zinc-800">Que pena!</h1>
                <p className="mt-4 font-sans text-lg leading-7 text-zinc-600">
                    Não encontramos a página que você procura :(
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                    <Button
                        className="flex w-full items-center justify-center gap-2 bg-zinc-700 shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg md:w-auto"
                        onClick={router.back}>
                        <CircleArrowLeft className="size-5" /> Voltar para a página anterior
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="w-full border-zinc-300 text-zinc-800 shadow-md transition-all hover:bg-zinc-100 hover:text-zinc-900 hover:shadow-lg md:w-auto">
                        <Link className="flex items-center justify-center gap-2" href="/">
                            <House className="size-5" /> Página inicial
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
