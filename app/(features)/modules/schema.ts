import { z } from 'zod'

const moduleSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: 'O nome é obrigatório.',
        })
        .max(100, {
            message: 'O nome deve ter no máximo 100 caracteres.',
        }),
    description: z
        .string()
        .min(1, {
            message: 'A descrição é obrigatória.',
        })
        .max(255, {
            message: 'A descrição deve ter no máximo 255 caracteres.',
        }),
})

type ModuleSchema = z.infer<typeof moduleSchema>

export { moduleSchema as schema, type ModuleSchema }
