import { MenuItemsOrder } from '@/types/model-types'

// Adicione esta função ao seu serviço de módulo
async function updateMenuItemsOrder(moduleId: string, menuItemsOrder: MenuItemsOrder[]) {
    const response = await fetch(`/api/modules/${moduleId}/menu-items-order`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menuItemsOrder }),
    })

    if (!response.ok) {
        throw new Error('Falha ao atualizar a ordem dos itens de menu')
    }

    return await response.json()
}

// Certifique-se de exportar a nova função
const moduleService = {
    // ... existing code ...
    updateMenuItemsOrder,
    // ... existing code ...
}

export default moduleService
