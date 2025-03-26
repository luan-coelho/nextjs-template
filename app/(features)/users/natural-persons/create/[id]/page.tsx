import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { routes } from '@/routes'
import moduleService from '@/services/module-service'
import naturalPersonService from '@/services/natural-person-service'
import { AlertCircle } from 'lucide-react'

import { NaturalPerson } from '@/types/model-types'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ButtonBack from '@/components/layout/button-back'
import BreadcrumbContent from '@/components/layout/content-breadcrumb'
import PageTitle from '@/components/layout/page-title'
import Revisions from '@/components/layout/revisions'
import SpinnerLoading from '@/components/layout/spinner-loading'

export default async function ShowModuleNaturalPersonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let naturalPerson: NaturalPerson | null = null

    try {
        naturalPerson = await naturalPersonService.fetchById(id)
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

    return (
        <React.Fragment>
            <BreadcrumbContent
                items={[
                    { label: 'Usuários', href: routes.users.naturalPerson.index },
                    { label: 'Visualizar', href: routes.users.naturalPerson.show(id) },
                ]}
            />
            <PageTitle>Visualizar Usuário Natural</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <Button size="sm" className="col-start-5">
                    Revisões
                </Button>
                <ButtonBack href={routes.users.naturalPerson.index} className="col-start-6" />
            </div>

            <Card className="mt-2">
                <CardHeader>
                    <CardTitle>{naturalPerson?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<SpinnerLoading />}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <p>{naturalPerson?.name}</p>
                            </div>
                        </div>
                    </Suspense>
                </CardContent>
            </Card>

            <Suspense fallback={<SpinnerLoading />}>{await getRevisions()}</Suspense>
        </React.Fragment>
    )
}
