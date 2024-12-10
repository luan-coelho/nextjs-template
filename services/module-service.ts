import { DataPagination, Pageable } from "@/types"

import apiClient from "@/lib/api-client"

export interface Module {
  id: string
  name: string
  description: string
}

export class ModuleService {
  async fetchModules({ page, size, sort, filters }: Pageable): Promise<DataPagination<Module>> {
    return apiClient.get<DataPagination<Module>>(`/modules?page=${page}&size=${size}&sort=${sort}&filters=${filters}`)
  }

  async fetchModuleById(id: string): Promise<Module> {
    return apiClient.get<Module>(`/modules/${id}`)
  }

  async createModule(moduleData: Partial<Module>): Promise<Module> {
    return apiClient.post<Module>("/modules", moduleData)
  }

  async updateModule(id: string, moduleData: Partial<Module>): Promise<Module> {
    return apiClient.put<Module>(`/modules/${id}`, moduleData)
  }

  async deleteModule(id: string): Promise<void> {
    return apiClient.delete(`/modules/${id}`)
  }

  async activateModule(id: string): Promise<void> {
    return apiClient.patch(`/modules/${id}/activate`)
  }

  async disableModule(id: string): Promise<void> {
    return apiClient.patch(`/modules/${id}/disable`)
  }
}

const moduleService = new ModuleService()
export default moduleService
