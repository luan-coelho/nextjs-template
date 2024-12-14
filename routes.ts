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
}

const apiRoutes = {
  home: "/",
  modules: {
    index: "/modules",
    create: "/modules/create",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
  },
}

export { routes, apiRoutes }
