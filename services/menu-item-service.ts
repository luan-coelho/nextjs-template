import { apiRoutes } from '@/routes'
import { Service } from '@/services/service'

import { MenuItem } from '@/types/model-types'

export class MenuItemService extends Service<MenuItem> {
    getUrl(): string {
        return apiRoutes.menuItems.index
    }
}

const menuItemService = new MenuItemService()
export default menuItemService
