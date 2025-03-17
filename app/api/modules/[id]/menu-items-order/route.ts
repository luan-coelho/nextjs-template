import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
import { modules } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const moduleId = params.id
        const { menuItemsOrder } = await request.json()

        // Validar dados
        if (!Array.isArray(menuItemsOrder)) {
            return NextResponse.json({ error: 'menuItemsOrder deve ser um array' }, { status: 400 })
        }

        // Atualizar a ordem no banco de dados
        await db
            .update(modules)
            .set({
                menuItemsOrder: menuItemsOrder,
                updatedAt: new Date(),
            })
            .where(eq(modules.id, moduleId))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Erro ao atualizar a ordem dos itens de menu:', error)
        return NextResponse.json({ error: 'Erro ao processar a solicitação' }, { status: 500 })
    }
}
