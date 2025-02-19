import { Service } from "@/services/service"

import { Module, User } from "@/types/model-types"
import apiClient from "@/lib/api-client"

export class UserService extends Service<User> {
  getUrl(): string {
    return "/users"
  }

  getModulesByUserId(id: string): Promise<Module[]> {
    return apiClient.get<Module[]>(`users/${id}/modules`)
  }
}

const userService = new UserService()
export default userService
