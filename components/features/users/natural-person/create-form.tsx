'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser } from '@/app/(features)/users/natural-person/create/action'

export type FormState = {
    success: boolean
    fields?: Record<string, any>
    errors?: Record<string, string[]>
}

const initialState: FormState = {
    success: false,
    fields: {},
    errors: {},
}

export default function CreateNaturalPersonForm() {
    const [state, formAction, isPending] = useActionState(createUser, initialState)
    const toastShownRef = useRef(false)

    useEffect(() => {
        if (state.success && !toastShownRef.current) {
            toast.success('Usuário cadastrado com sucesso')
            toastShownRef.current = true
        }
    }, [state.success])

    if (state.success) {
        return <div>Usuário cadastrado com sucesso</div>
    }

    return (
        <React.Fragment>
            {state.errors?.error?.[0] && (
                <Alert variant="destructive" className="mb-4 flex flex-col gap-2 bg-red-500 text-white">
                    <AlertCircle className="size-4" color="white" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{state.errors.error?.[0]}</AlertDescription>
                </Alert>
            )}

            <form action={formAction} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            defaultValue={state.fields?.name}
                        />
                        {state?.errors?.name && (
                            <p className="text-sm font-normal text-destructive">{state?.errors?.name}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="surname">Sobrenome</Label>
                        <Input name="surname" id="surname" type="text" defaultValue={state.fields?.surname} />
                        {state?.errors?.surname && (
                            <p className="text-sm font-normal text-destructive">{state?.errors?.surname}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" id="email" defaultValue={state.fields?.email} />
                        {state?.errors?.email && (
                            <p className="text-sm font-normal text-destructive">{state?.errors?.email}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input name="cpf" id="cpf" type="text" defaultValue={state.fields?.cpf} />
                        {state?.errors?.cpf && (
                            <p className="text-sm font-normal text-destructive">{state?.errors?.cpf}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="primaryPhone">Telefone Principal</Label>
                        <Input
                            name="primaryPhone"
                            id="primaryPhone"
                            type="text"
                            defaultValue={state.fields?.primaryPhone}
                        />
                        {state?.errors?.primaryPhone && (
                            <p className="text-sm font-normal text-destructive">{state?.errors?.primaryPhone}</p>
                        )}
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : 'Cadastrar'}
                </Button>
            </form>
        </React.Fragment>
    )
}
