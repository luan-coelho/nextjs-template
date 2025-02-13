/**
 * Routes for the application
 */

const routes = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
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
  users: {
    index: "/users",
    admin: {
      index: "/users/admin",
      create: "/users/admin/create",
      edit: (id: string) => `/users/admin/${id}/edit`,
      show: (id: string) => `/users/admin/${id}`,
    },
    customer: {
      index: "/users/customer",
      create: "/users/customer/create",
      edit: (id: string) => `/users/customer/${id}/edit`,
      show: (id: string) => `/users/customer/${id}`,
    },
  },
}

/**
 * API routes
 */

const apiRoutes = {
  users: {
    all: "/users",
    create: "/users",
    edit: (id: string) => `/users/${id}`,
    show: (id: string) => `/users/${id}`,
    modules: (id: string) => `/users/${id}/modules`,
  },
  modules: {
    index: "/modules",
    all: "/modules/all",
    create: "/modules",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
    updateMenuItems: (id: string) => `/modules/${id}/update-menu-items-order`,
    addMenuItem: (id: string, menuItemId: string) => `/modules/${id}/add-menu-item/${menuItemId}`,
    revisions: (id: string) => `/modules/${id}/revisions`,
  },
  menuItems: {
    index: "/menu-items",
    all: "/menu-items/all",
    create: "/menu-items",
    edit: (id: string) => `/menu-items/${id}/edit`,
    show: (id: string) => `/menu-items/${id}`,
  },
}

export { routes, apiRoutes }
