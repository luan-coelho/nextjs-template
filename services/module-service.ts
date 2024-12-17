import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import { Module } from "@/types/backend-model"
import apiClient from "@/lib/api-client"
import { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export class ModuleService extends Service<Module> {
  getUrl(): string {
    return apiRoutes.modules.allWithPagination
  }

  async updateMenuItemsOrder(id: string, menuItemsOrder: MenuItemsOrder[]): Promise<Module> {
    return apiClient.patch(`${this.getUrl()}/${id}/update-menu-items-order`, menuItemsOrder)
  }
}

const moduleService = new ModuleService()
export default moduleService
