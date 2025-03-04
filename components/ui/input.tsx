import * as React from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showIcon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, className, type, showIcon = false, ...props }, ref) => {
    const { error } = useFormField()

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-none border border-input border-zinc-300 bg-transparent px-3 py-1 text-sm shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : value ? "border-green-500" : "border-zinc-300",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showIcon && value && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {error ? (
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

Input.displayName = "Input"

export { Input }
