'use server'

import db from '@/db'
import { modules } from '@/db/schema/module.schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { FormState } from '@/components/features/modules/form'

import { ModuleSchema } from './schema'

export async function createModule(prevState: FormState, formData: FormData) {
    const schema = z.object({
        name: z.string().min(1),
        description: z.string().min(1),
    })

    const validatedFields = schema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            ...prevState,
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const createdModule = await db
        .insert(modules)
        .values({
            name: validatedFields.data.name,
            description: validatedFields.data.description,
        })
        .returning()

    return {
        ...prevState,
        success: true,
        fields: {
            id: createdModule[0].id,
            name: validatedFields.data.name,
            description: validatedFields.data.description,
        },
    }
}

export async function updateModule(module: ModuleSchema, id: string) {
    const schema = z.object({
        name: z.string().min(1),
        description: z.string().min(1),
    })

    const validatedFields = schema.safeParse(module)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }

    const updatedModule = await db
        .update(modules)
        .set({
            name: validatedFields.data.name,
            description: validatedFields.data.description,
        })
        .where(eq(modules.id, id))
        .returning()

    return updatedModule[0]
}
