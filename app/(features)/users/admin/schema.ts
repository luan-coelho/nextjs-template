import { z } from 'zod'

import isValidCPF from '@/lib/utils'

const adminUserSchema = z.object({
    name: z.string().min(1, {
        message: 'O nome é obrigatório',
    }),
    surname: z.string().min(1, {
        message: 'O sobrenome é obrigatório',
    }),
    cpf: z
        .string({
            required_error: 'O CPF é obrigatório',
        })
        .min(14, {
            message: 'O CPF é inválido',
        })
        .refine(val => isValidCPF(val), {
            message: 'O CPF é inválido',
        }),
    email: z
        .string({
            required_error: 'O e-mail é obrigatório',
        })
        .email({
            message: 'O e-mail é inválido',
        }),
    primaryPhone: z
        .string({
            required_error: 'O telefone é obrigatório',
        })
        .min(10, {
            message: 'O telefone é inválido',
        }),
    secondaryPhone: z.string().optional(),
})

type AdminUserSchema = z.infer<typeof adminUserSchema>

export { adminUserSchema, type AdminUserSchema }
