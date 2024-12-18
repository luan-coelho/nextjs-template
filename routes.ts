const routes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  home: "/",
  dashboard: "/dashboard",
  modules: {
    index: "/modules",
    create: "/modules/create",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
  },
  menuItems: {
    index: "/menu-items",
    create: "/menu-items/create",
    edit: (id: string) => `/menu-items/${id}/edit`,
    show: (id: string) => `/menu-items/${id}`,
  },
}

const apiRoutes = {
  users: {
    all: "/users",
    create: "/users",
    edit: (id: string) => `/users/${id}`,
    show: (id: string) => `/users/${id}`,
    modules: (id: string) => `/users/${id}/modules`,
  },
  modules: {
    allWithPagination: "/modules",
    all: "/modules/all",
    create: "/modules",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
    updateMenuItems: (id: string) => `/modules/${id}/update-menu-items-order`,
    addMenuItem: (id: string, menuItemId: string) => `/modules/${id}/add-menu-item/${menuItemId}`,
  },
  menuItems: {
    allWithPagination: "/menu-items",
    all: "/menu-items/all",
    create: "/menu-items",
    edit: (id: string) => `/menu-items/${id}/edit`,
    show: (id: string) => `/menu-items/${id}`,
  },
}

export { routes, apiRoutes }
