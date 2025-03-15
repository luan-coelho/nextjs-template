import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type ButtonBackProps = {
    href: string
    children?: React.ReactNode
}

export default function ButtonBack({ href, children }: ButtonBackProps) {
    return (
        <div className="mt-5 flex items-center justify-end sm:mt-0">
            <Link
                href={href}
                className={cn(
                    buttonVariants({
                        size: 'sm',
                    }),
                    'w-full rounded-none border border-blue-500 bg-blue-100 text-blue-500 hover:border-blue-500 hover:bg-blue-100 hover:text-blue-500 sm:w-auto',
                )}>
                <ArrowLeft />
                {children || 'Voltar'}
            </Link>
        </div>
    )
}
