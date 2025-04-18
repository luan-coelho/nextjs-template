import * as React from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

const WidgetCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'relative h-32 w-64 overflow-hidden rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-6 py-10',
                className,
            )}
            {...props}
        />
    ),
)
WidgetCard.displayName = 'WidgetCard'

const WidgetCardIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ImageProps>(
    ({ className, src, alt, ...props }, ref) => (
        <div ref={ref} className={cn('absolute -bottom-4 -left-4 opacity-70', className)} {...props}>
            <Image className="size-24" src={src} alt={alt} />
        </div>
    ),
)
WidgetCardIcon.displayName = 'WidgetCardIcon'

const WidgetCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('relative z-10 flex flex-col items-center justify-center', className)}
            {...props}
        />
    ),
)
WidgetCardContent.displayName = 'WidgetCardContent'

export { WidgetCard, WidgetCardIcon, WidgetCardContent }
