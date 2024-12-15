import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import { Module } from "@/types/backend-model"

export class ModuleService extends Service<Module> {
  getUrl(): string {
    return apiRoutes.modules.index
  }
}

const moduleService = new ModuleService()
export default moduleService
