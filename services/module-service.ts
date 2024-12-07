import { DataPagination, Pageable, STANDARD_PAGE_SIZE } from "@/types"

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
  async fetchModules({ page, size, sort, filters }: Pageable): Promise<DataPagination<Module>> {
    return apiClient.get<DataPagination<Module>>(`/module?page=${page}&size=${size}&sort=${sort}&filters=${filters}`)
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

  async activateModule(id: string): Promise<void> {
    return apiClient.patch(`/module/${id}/activate`)
  }

  async disableModule(id: string): Promise<void> {
    return apiClient.patch(`/module/${id}/disable`)
  }
}

const moduleService = new ModuleService()
export default moduleService
