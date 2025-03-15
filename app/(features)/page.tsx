import { BreadcrumbContentItem } from '@/types'

import { Card, CardContent } from '@/components/ui/card'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'

export default async function DashboardHome() {
    const breadcrumbItems: BreadcrumbContentItem[] = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Cadastrar' },
    ]

    return (
        <>
            <BreadcrumbContent items={breadcrumbItems} />

            <Card className="mt-4">
                <CardContent>
                    <h1>TESTE</h1>
                </CardContent>
            </Card>
        </>
    )
}
