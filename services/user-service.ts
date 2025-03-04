import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import { Module, User } from "@/types/model-types"
import apiClient from "@/lib/api-client"

export class UserService extends Service<User> {
  getUrl(): string {
    return "/users"
  }

  async createAdmin(data: Partial<User>): Promise<User> {
    return apiClient.post<User>(apiRoutes.users.admin.create, data)
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const data = await apiClient.get<any>(`${apiRoutes.users.admin.existsByCpf(cpf)}`)
    return data.exists
  }

  async existsByEmail(email: string): Promise<boolean> {
    const data = await apiClient.get<any>(`${apiRoutes.users.admin.existsByEmail(email)}`)
    return data.exists
  }

  getModulesByUserId(id: string): Promise<Module[]> {
    return apiClient.get<Module[]>(`/users/${id}/modules`)
  }
}

const userService = new UserService()
export default userService
