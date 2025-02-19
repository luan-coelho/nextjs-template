import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import { User } from "@/types/model-types"

export class AdministratorUserService extends Service<User> {
  getUrl(): string {
    return apiRoutes.administratorUsers.index
  }
}

const administratorUserService = new AdministratorUserService()
export default administratorUserService
