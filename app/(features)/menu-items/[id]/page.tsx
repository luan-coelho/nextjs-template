import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import menuItemService from '@/services/menu-item-service'
import { Link } from 'lucide-react'

import { MenuItem } from '@/types/model-types'
import { dateUtils } from '@/lib/date-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { LucideIcon } from '@/components/ui/lucide-icon'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'
import SpinnerLoading from '@/components/layout/spinner-loading'
import StatusBadge from '@/components/layout/status-badge'

export default async function ShowMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    let menuItem: MenuItem | null = null
    try {
        menuItem = await menuItemService.fetchById(id)
    } catch (error) {
        return redirect(routes.menuItems.index)
    }

    return (
        <React.Fragment>
            <BreadcrumbContent
                items={[{ label: 'Itens de Menu', href: routes.menuItems.index }, { label: 'Visualizar' }]}
            />
            <PageTitle>Visualizar Item de Menu</PageTitle>
            <ButtonBack href={routes.menuItems.index} />

            <Card className="mt-2">
                <CardHeader>
                    <CardTitle className="flex items-start justify-between">{menuItem?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<SpinnerLoading />}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                                <Label className="text-sm font-medium text-muted-foreground">Rota</Label>
                                <div className="mt-1">
                                    {menuItem?.route ? (
                                        <Link
                                            to={menuItem.route}
                                            className="inline-flex items-center gap-1.5 rounded-md border border-primary bg-primary/5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                                            target="_blank">
                                            <LucideIcon name="link" size={16} /> {menuItem?.route}
                                        </Link>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
                                <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                                <p className="mt-1 text-base">{menuItem?.description || '-'}</p>
                            </div>

                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                                <Label className="text-sm font-medium text-muted-foreground">Ícone</Label>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                                        <LucideIcon name={menuItem?.icon || 'x'} className="text-primary" />
                                    </div>
                                    <span className="text-base">{menuItem?.icon || '-'}</span>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                                <Label className="text-sm font-medium text-muted-foreground">Situação</Label>
                                <div className="mt-1">
                                    <StatusBadge status={menuItem?.active || false} />
                                </div>
                            </div>

                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                                <Label className="text-sm font-medium text-muted-foreground">Data de cadastro</Label>
                                <p className="mt-1 text-base">{dateUtils.formatDateTime(menuItem?.createdAt) || '-'}</p>
                            </div>

                            <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Data da última modificação
                                </Label>
                                <p className="mt-1 text-base">{dateUtils.formatDateTime(menuItem?.updatedAt) || '-'}</p>
                            </div>
                        </div>
                    </Suspense>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
