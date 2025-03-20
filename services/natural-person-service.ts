import { apiRoutes } from '@/routes'
import { Service } from '@/services/service'

import { User } from '@/types/model-types'

export class NaturalPersonService extends Service<User> {
    getUrl(): string {
        return apiRoutes.users.naturalPerson.index
    }
}

const naturalPersonService = new NaturalPersonService()
export default naturalPersonService
