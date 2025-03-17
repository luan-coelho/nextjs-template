import { apiRoutes } from '@/routes'
import { Service } from '@/services/service'

import { MenuItemsOrder, Module } from '@/types/model-types'
import apiClient from '@/lib/api-client'

export class ModuleService extends Service<Module> {
    getUrl(): string {
        return apiRoutes.modules.index
    }

    async updateMenuItemsOrder(id: string, menuItemsOrder: MenuItemsOrder[]): Promise<Module> {
        return apiClient.patch(`${this.getUrl()}/${id}/update-menu-items-order`, menuItemsOrder)
    }

    async addMenuItem(id: string, menuItemId: string): Promise<Module> {
        return apiClient.patch(`${this.getUrl()}/${id}/add-menu-item/${menuItemId}`)
    }

    async removeMenuItem(id: string, menuItemId: string): Promise<Module> {
        return apiClient.patch(`${this.getUrl()}/${id}/remove-menu-item/${menuItemId}`)
    }
}

const moduleService = new ModuleService()
export default moduleService
