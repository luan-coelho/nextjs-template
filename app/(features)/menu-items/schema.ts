import { z } from 'zod'

const menuItemSchema = z.object({
    label: z.string().min(1, 'Label é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatório'),
    route: z.string().min(1, 'Rota é obrigatório'),
    icon: z.string().min(1, 'Ícone é obrigatório'),
})

type MenuItemSchema = z.infer<typeof menuItemSchema>

export { menuItemSchema, type MenuItemSchema }
