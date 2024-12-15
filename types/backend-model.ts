export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  active: boolean
}

export interface Module extends BaseEntity {
  name: string
  menuItems: MenuItem[]
}

export interface MenuItem extends BaseEntity {
  label: string
  description: string
  route: string
  icon: string
  // position: number
  subItems: MenuItem[]
}
