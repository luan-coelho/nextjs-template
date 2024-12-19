import { apiRoutes } from "@/routes"
import { Service } from "@/services/service"

import { Module } from "@/types/model-types"
import apiClient from "@/lib/api-client"
import { MenuItemsOrder } from "@/components/menu-item-draggable-list"

export class ModuleService extends Service<Module> {
  private getUrl(): string {
    return apiRoutes.modules.index
  }

  async updateMenuItemsOrder(id: string, menuItemsOrder: MenuItemsOrder[]): Promise<Module> {
    return apiClient.patch(`${this.getUrl()}/${id}/update-menu-items-order`, menuItemsOrder)
  }

  async addMenuItem(id: string, menuItemId: string): Promise<Module> {
    return apiClient.patch(`${this.getUrl()}/${id}/add-menu-item/${menuItemId}`)
  }
}

const moduleService = new ModuleService()
export default moduleService
