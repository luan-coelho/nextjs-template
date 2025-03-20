import React from 'react'
import { routes } from '@/routes'

import { CreateButtonLink } from '@/components/layout/create-button-link'
import PageTitle from '@/components/layout/page-title'

export default async function AdminUsersPage() {
    return (
        <React.Fragment>
            <PageTitle>Usuários administradores</PageTitle>

            <CreateButtonLink href={routes.users.administrator.create} />
        </React.Fragment>
    )
}
