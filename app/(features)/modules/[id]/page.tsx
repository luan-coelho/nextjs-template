import React, { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import moduleService from '@/services/module-service'
import { AlertCircle } from 'lucide-react'

import { Module } from '@/types/model-types'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MenuItemOrderList from '@/components/features/menu-item/menu-item-order-list'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'
import Revisions from '@/components/layout/revisions'
import SpinnerLoading from '@/components/layout/spinner-loading'

export default async function ShowModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let modulez: Module | null = null

    try {
        modulez = await moduleService.fetchById(id)
    } catch (error) {
        return redirect(routes.modules.index)
    }

    async function getRevisions() {
        try {
            const revisionsComparasion = await moduleService.fetchAllRevisionComparisons(id)
            if (!revisionsComparasion.length) {
                return null
            }
            return <Revisions revisionsComparasion={revisionsComparasion} />
        } catch (error) {
            return (
                <Alert className={'mt-3'} variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>Ocorreu um erro ao buscar as revisões do módulo</AlertDescription>
                </Alert>
            )
        }
    }

    function getMenuItems() {
        if (!modulez) {
            return null
        }

        return <MenuItemOrderList module={modulez as unknown as Module} />
    }

    return (
        <React.Fragment>
            <BreadcrumbContent items={[{ label: 'Módulos', href: routes.modules.index }, { label: 'Visualizar' }]} />
            <PageTitle>Visualizar Módulo</PageTitle>
            <ButtonBack href={routes.modules.index} />

            <Card className="mt-3">
                <CardHeader>
                    <CardTitle>Módulo</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<SpinnerLoading />}>
                        {getMenuItems()}
                        <div className="mt-3 flex justify-end">
                            <Link className={buttonVariants()} href={routes.modules.edit(id)}>
                                Editar
                            </Link>
                        </div>
                    </Suspense>
                </CardContent>
            </Card>

            <Suspense fallback={<SpinnerLoading />}>{await getRevisions()}</Suspense>
        </React.Fragment>
    )
}
