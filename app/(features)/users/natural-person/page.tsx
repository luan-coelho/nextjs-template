import React from 'react'
import { routes } from '@/routes'

import { CreateButtonLink } from '@/components/layout/create-button-link'
import PageTitle from '@/components/layout/page-title'

export default function NaturalPersonPage() {
    return (
        <React.Fragment>
            <PageTitle>Usuários Pessoa Física</PageTitle>

            <div className="grid grid-cols-6 gap-2">
                <CreateButtonLink className="col-start-6" href={routes.users.naturalPerson.create} />
            </div>
        </React.Fragment>
    )
}
