import React from 'react'
import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import moduleService from '@/services/module-service'

import { Module } from '@/types/model-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EditModuleForm from '@/components/features/modules/edit-form'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let modulez: Module | null = null

    try {
        modulez = await moduleService.fetchById(id)
    } catch (error) {
        return redirect(routes.modules.index)
    }

    return (
        <React.Fragment>
            <BreadcrumbContent items={[{ label: 'Módulos', href: routes.modules.index }, { label: 'Editar' }]} />
            <PageTitle>Editar Módulo</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <ButtonBack href={routes.modules.index} className="col-start-6" />
            </div>

            <Card className="mt-2">
                <CardHeader>
                    <CardTitle>Formulário</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditModuleForm module={modulez} />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
