import React from 'react'
import { routes } from '@/routes'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ModuleForm from '@/components/features/modules/form'
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
                    <ModuleForm />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
