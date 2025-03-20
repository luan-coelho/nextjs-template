import React from 'react'
import { routes } from '@/routes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CreateMenuItemForm from '@/components/features/menu-item/create-form'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default function CreateMenuItemPage() {
    return (
        <React.Fragment>
            <BreadcrumbContent
                items={[{ label: 'Itens de Menu', href: routes.menuItems.index }, { label: 'Cadastrar' }]}
            />
            <PageTitle>Cadastrar Item de Menu</PageTitle>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateMenuItemForm />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
