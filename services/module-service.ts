import { DataPagination, STANDARD_PAGE_SIZE } from "@/types"

import apiClient from "@/lib/api-client"

// Define a entidade Module
export interface Module {
  id: string
  name: string
  description: string
}

// Serviço específico para Module
export class ModuleService {
  // Busca módulos com paginação
  async fetchModules(page = 1, size = STANDARD_PAGE_SIZE): Promise<DataPagination<Module>> {
    return apiClient.get<DataPagination<Module>>(`/module?page=${page}&size=${size}`)
  }

  // Busca módulo por ID
  async fetchModuleById(id: string): Promise<Module> {
    return apiClient.get<Module>(`/module/${id}`)
  }

  // Cria um novo módulo
  async createModule(moduleData: Partial<Module>): Promise<Module> {
    return apiClient.post<Module>("/module", moduleData)
  }

  // Atualiza um módulo existente
  async updateModule(id: string, moduleData: Partial<Module>): Promise<Module> {
    return apiClient.put<Module>(`/module/${id}`, moduleData)
  }

  // Deleta um módulo por ID
  async deleteModule(id: string): Promise<void> {
    return apiClient.delete(`/module/${id}`)
  }
}

const moduleService = new ModuleService()
export default moduleService
