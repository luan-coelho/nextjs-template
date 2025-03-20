import React, { HTMLAttributes } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface ButtonBackProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string
    children?: React.ReactNode
    className?: string
}

export default function ButtonBack({ href, children, className }: ButtonBackProps) {
    return (
        <div className={className}>
            <Link
                href={href}
                className={cn(
                    buttonVariants({
                        size: 'sm',
                    }),
                    'w-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-200 hover:text-gray-600',
                    className,
                )}>
                <ArrowLeft />
                {children || 'Voltar'}
            </Link>
        </div>
    )
}
