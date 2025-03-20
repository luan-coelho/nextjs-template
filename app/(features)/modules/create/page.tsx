import React from 'react'
import { routes } from '@/routes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CreateModuleForm from '@/components/features/modules/create-form'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default function CreateModulePage() {
    return (
        <React.Fragment>
            <BreadcrumbContent items={[{ label: 'Módulos', href: routes.modules.index }, { label: 'Cadastrar' }]} />
            <PageTitle>Cadastrar Módulo</PageTitle>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateModuleForm />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
