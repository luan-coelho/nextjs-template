'use client'

import { User } from '@/types/model-types'

import CreateUserForm from './create-form'
import EditUserForm from './edit-form'

export default function UserForm({ user }: { user?: User }) {
    if (user) {
        return <EditUserForm user={user} />
    }

    return <CreateUserForm />
}
