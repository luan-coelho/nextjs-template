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
  home: "/",
  modules: {
    allWithPagination: "/modules",
    all: "/modules/all",
    create: "/modules/create",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
  },
  menuItems: {
    allWithPagination: "/menu-items",
    all: "/menu-items/all",
    create: "/menu-items/create",
    edit: (id: string) => `/menu-items/${id}/edit`,
    show: (id: string) => `/menu-items/${id}`,
  },
}

export { routes, apiRoutes }
