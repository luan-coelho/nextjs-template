export interface BaseEntity {
    id: string
    createdAt: Date
    updatedAt?: Date
    active: boolean
}

export interface Module extends BaseEntity {
    name: string
    description: string
    menuItems: MenuItem[]
    menuItemsOrder: MenuItemsOrder[]
}

export interface MenuItemsOrder {
    order: number
    menuItemId: string
}

export interface MenuItem extends BaseEntity {
    label: string
    description: string
    route: string
    icon: string
    subItems?: MenuItem[]
}

export interface User extends BaseEntity {
    name: string
    surname: string
    cpf: string
    email: string
    primaryPhone: string
    secondaryPhone?: string
    accessStartDate?: Date
    accessEndDate?: Date
}
