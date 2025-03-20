import React from 'react'
import { routes } from '@/routes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CreateUserForm from '@/components/features/users/admin/create-form'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default function CreateUserPage() {
    return (
        <React.Fragment>
            <BreadcrumbContent
                items={[
                    { label: 'Usuários', href: routes.users.index },
                    {
                        label: 'Administração',
                        href: routes.users.administrator.index,
                    },
                    { label: 'Cadastrar' },
                ]}
            />
            <PageTitle>Cadastrar Usuário</PageTitle>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateUserForm />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
