export interface Module {
    active: boolean
    id: string
    name: string
    description: string
    menuItemsOrder: MenuItemsOrder[] | null
    menuItems: MenuItem[]
    createdAt: Date
    updatedAt: Date
}
