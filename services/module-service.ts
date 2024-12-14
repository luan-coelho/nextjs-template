import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"
import { DataPagination, Pageable } from "@/types"

import apiClient from "@/lib/api-client"

export interface Module {
  id: string
  name: string
  description: string
}

export class ModuleService extends Service {
  async fetchModules({ page, size, sort, filters }: Pageable): Promise<DataPagination<Module>> {
    return apiClient.get<DataPagination<Module>>(
      `${this.getUrl()}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`,
    )
  }

  async fetchModuleById(id: string): Promise<Module> {
    return apiClient.get<Module>(`${this.getUrl()}/${id}`)
  }

  async createModule(moduleData: Partial<Module>): Promise<Module> {
    return apiClient.post<Module>(this.getUrl(), moduleData)
  }

  async updateModule(id: string, moduleData: Partial<Module>): Promise<Module> {
    return apiClient.put<Module>(`${this.getUrl()}/${id}`, moduleData)
  }

  async deleteModule(id: string): Promise<void> {
    return apiClient.delete(`${this.getUrl()}/${id}`)
  }

  async activateModule(id: string): Promise<void> {
    return apiClient.patch(`${this.getUrl()}/${id}/activate`)
  }

  async disableModule(id: string): Promise<void> {
    return apiClient.patch(`${this.getUrl()}/${id}/disable`)
  }

  getUrl(): string {
    return apiRoutes.modules.index
  }
}

const moduleService = new ModuleService()
export default moduleService
