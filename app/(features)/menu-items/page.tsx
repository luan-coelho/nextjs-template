'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { routes } from '@/routes'
import { Pageable } from '@/types'

import { extractPaginationQueryParams } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MenuItemDataTable from '@/components/features/menu-item/menu-item-data-table'
import { CreateButtonLink } from '@/components/layout/create-button-link'
import PageTitle from '@/components/layout/page-title'

export default function MenuItemPage() {
    const searchParams = useSearchParams()
    const pageable: Pageable = extractPaginationQueryParams(searchParams)

    return (
        <React.Fragment>
            <PageTitle>Itens de Menu</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <CreateButtonLink href={routes.menuItems.create} className="col-start-6" />
            </div>

            <Card className="mt-2">
                <CardHeader>
                    <CardTitle>Listagem</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <MenuItemDataTable pageable={pageable} />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
