'use client'

import { useActionState } from 'react'

import { createUser } from './action'

export type FormData = {
    name: string
}

export type State = {
    data: FormData
    message: string
    error: Record<string, string>
}

const initialState: State = {
    data: {
        name: '',
    },
    message: '',
    error: {},
}

export function Signup() {
    const [state, formAction, pending] = useActionState(createUser, initialState)

    return (
        <form action={formAction}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
            <p aria-live="polite">{state?.message}</p>
            <button disabled={pending}>Sign up</button>
        </form>
    )
}
