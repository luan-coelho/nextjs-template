import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import menuItemService from '@/services/menu-item-service'

import { MenuItem } from '@/types/model-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EditMenuItemForm from '@/components/features/menu-item/edit-form'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default async function EditMenuItemPage({ params }: { params: { id: string } }) {
    let menuItem: MenuItem | null = null

    try {
        menuItem = await menuItemService.fetchById(params.id)
    } catch (error) {
        return redirect(routes.menuItems.index)
    }

    return (
        <div>
            <BreadcrumbContent
                items={[{ label: 'Itens de Menu', href: routes.menuItems.index }, { label: 'Editar' }]}
            />
            <PageTitle>Editar Item de Menu</PageTitle>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditMenuItemForm menuItem={menuItem} />
                </CardContent>
            </Card>
        </div>
    )
}
