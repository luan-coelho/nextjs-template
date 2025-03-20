'use server'

import { redirect } from 'next/navigation'
import naturalPersonService from '@/services/natural-person-service'

export async function createUser(prevState: any, formData: FormData) {
    const naturalPerson = await naturalPersonService.create(formData)

    if (!naturalPerson) {
        return { message: 'Please enter a valid email' }
    }

    redirect('/dashboard')
}
