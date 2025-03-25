'use server'

import { redirect } from 'next/navigation'
import naturalPersonService from '@/services/natural-person-service'
import { ApiError } from '@/types'
import { z } from 'zod'

import { User } from '@/types/model-types'
import { FormState } from '@/components/features/users/natural-person/create-form'

import { adminUserSchema } from '../../admin/schema'

function extractFields(formData: Record<string, any>) {
    const fields: Record<string, string> = {}

    for (const key of Object.keys(formData)) {
        fields[key] = formData[key].toString()
    }

    return fields
}

export async function createUser(_: FormState, payload: FormData) {
    const formData = Object.fromEntries(payload)
    try {
        const parsed = adminUserSchema.safeParse(formData)

        if (!parsed.success) {
            const fields = extractFields(formData)
            const errors = parsed.error.flatten().fieldErrors

            return {
                success: false,
                fields,
                errors: {
                    ...errors,
                    error: ['Validação de dados falhou'],
                },
            }
        }

        try {
            const createdUser: User = await naturalPersonService.create(parsed.data)
            redirect(`/users/natural-person/${createdUser.id}`)
        } catch (error) {
            console.log(error)
            const apiError = error as ApiError
            return {
                success: false,
                fields: extractFields(formData),
                errors: apiError.errors,
            }
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                fields: extractFields(formData),
                errors: error.flatten().fieldErrors,
            }
        }
    }
}
