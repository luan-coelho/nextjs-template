import React from 'react'
import { AlertCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface QueryResultAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string
    onRetry: () => void
}

export default function QueryResultAlert({ message, onRetry, className }: QueryResultAlertProps) {
    return (
        <Alert variant="destructive" className={cn('flex flex-col gap-2', className)}>
            <div className="flex items-center gap-2">
                <AlertCircle className="size-4" />
                <AlertTitle>Erro ao buscar módulos</AlertTitle>
            </div>
            <AlertDescription>
                Mensagem:{' '}
                <strong>
                    <i>{message}</i>
                </strong>
            </AlertDescription>
            <Button variant="destructive" onClick={onRetry} className="w-auto text-white">
                Tentar novamente
            </Button>
        </Alert>
    )
}
