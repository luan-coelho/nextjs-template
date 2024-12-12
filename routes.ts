const routes = {
  home: "/",
  modules: {
    index: "/modules",
    create: "/modules/create",
    edit: (id: string) => `/modules/${id}/edit`,
    show: (id: string) => `/modules/${id}`,
  },
} as const

export default routes
