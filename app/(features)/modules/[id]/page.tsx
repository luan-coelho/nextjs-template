import React, { Suspense } from 'react'
import Link from 'next/link'
import db from '@/db'
import { routes } from '@/routes'
import moduleService from '@/services/module-service'
import { AlertCircle } from 'lucide-react'

import { MenuItem, Module } from '@/types/model-types'
import { orderMenuItems } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'
import Revisions from '@/components/layout/revisions'
import SpinnerLoading from '@/components/layout/spinner-loading'
import MenuItemDraggableList, { MenuItemsOrder } from '@/components/menu-item-draggable-list'

export default async function ShowModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const modulez = await db.query.modules.findFirst({
        where: (modules, { eq }) => eq(modules.id, id),
    })

    if (!modulez) {
        return <div>Módulo não encontrado</div>
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
        if (!modulez) return null

        if (modulez.menuItemsOrder) {
            const menuItemsOrder: MenuItemsOrder[] = modulez.menuItemsOrder as MenuItemsOrder[]
            modulez.menuItems = orderMenuItems(modulez.menuItems, menuItemsOrder) as MenuItem[]
        }

        return <MenuItemDraggableList module={modulez as Module} />
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
