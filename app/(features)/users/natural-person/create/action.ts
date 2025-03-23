'use server'

import naturalPersonService from '@/services/natural-person-service'
import { ApiError } from '@/types'
import { z } from 'zod'

import { User } from '@/types/model-types'
import { FormState } from '@/components/features/users/natural-person/create-form'

import { adminUserSchema } from '../../admin/schema'

export async function createUser(_: FormState, payload: FormData): Promise<FormState> {
    try {
        const formData = Object.fromEntries(payload)

        const parsed = adminUserSchema.safeParse(formData)

        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors
            const fields: Record<string, string> = {}

            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString()
            }

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
            return {
                success: true,
                fields: {
                    ...createdUser,
                },
                errors: {},
            }
        } catch (error) {
            const apiError = error as ApiError
            return {
                success: false,
                errors: apiError.errors,
            }
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.issues.reduce(
                    (acc, issue) => {
                        acc[issue.path.join('.')] = [issue.message]
                        return acc
                    },
                    {} as Record<string, string[]>,
                ),
            }
        }
    }
}
