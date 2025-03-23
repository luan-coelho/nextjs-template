import * as React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    showIcon?: boolean
    error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, className, type, showIcon = false, error, ...props }, ref) => {
        const hasValue = value !== undefined && value !== null && value.toString().trim().length > 0 && showIcon
        const hasError = error !== undefined && error !== null

        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-none border border-input border-zinc-300 bg-transparent px-3 py-1 text-sm shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
                        hasError ? 'border-destructive' : hasValue ? 'border-green-500' : 'border-zinc-300',
                        className,
                    )}
                    value={value}
                    ref={ref}
                    {...props}
                />
                {showIcon && hasValue && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {hasError ? (
                            <AlertCircle className="size-4 text-destructive" />
                        ) : (
                            <CheckCircle className="size-4 text-green-500" />
                        )}
                    </div>
                )}
            </div>
        )
    },
)

Input.displayName = 'Input'

export { Input }
