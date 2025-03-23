import React from 'react'
import { routes } from '@/routes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CreateNaturalPersonForm from '@/components/features/users/natural-person/create-form'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default function CreateNaturalPersonPage() {
    return (
        <React.Fragment>
            <BreadcrumbContent
                items={[
                    { label: 'Usuários', href: routes.users.index },
                    { label: 'Pessoa Física', href: routes.users.naturalPerson.index },
                    { label: 'Cadastrar' },
                ]}
            />
            <PageTitle>Cadastrar Usuário Pessoa Física</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <ButtonBack href={routes.users.naturalPerson.index} className="col-start-6" />
            </div>

            <Card className="mt-2">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateNaturalPersonForm />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
