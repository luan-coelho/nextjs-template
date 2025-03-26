'use client'

import React, { useMemo } from 'react'
import { routes } from '@/routes'
import naturalPersonService from '@/services/natural-person-service'

import { USER_COLUMNS } from '@/lib/user-columns'
import DataTable from '@/components/features/DataTable'
import { CreateButtonLink } from '@/components/layout/create-button-link'
import PageTitle from '@/components/layout/page-title'

export default function NaturalPersonPage() {
    const columns = useMemo(() => USER_COLUMNS, [])

    return (
        <React.Fragment>
            <PageTitle>Pessoas Físicas</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <CreateButtonLink className="col-start-6" href={routes.users.naturalPerson.create} />
            </div>

            <DataTable<any>
                service={naturalPersonService}
                queryKey="natural-persons"
                columns={columns}
                showResetFilter={true}
                showFilterCount={true}
            />
        </React.Fragment>
    )
}
