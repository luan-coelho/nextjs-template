import { HTMLAttributes } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type CreateButtonLinkProps = HTMLAttributes<HTMLDivElement> & {
    href: string
}

export function CreateButtonLink({ href, className }: CreateButtonLinkProps) {
    return (
        <Link
            className={cn(
                'flex w-auto items-center justify-end',
                className,
                buttonVariants({ variant: 'default', size: 'sm' }),
            )}
            href={href}>
            Cadastrar
        </Link>
    )
}
