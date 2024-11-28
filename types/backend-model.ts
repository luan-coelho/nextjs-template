interface MenuItem {
  id: string
  label: string
  route: string
  icon: string
  position: number
  parent?: MenuItem
  active: boolean
}

interface Module {
  id: string
  name: string
  menuItems: MenuItem[]
  active: boolean
}
