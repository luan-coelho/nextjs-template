/**
 * Routes for the application
 */

const routes = {
    home: '/',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    dashboard: '/dashboard',
    modules: {
        index: '/modules',
        create: '/modules/create',
        edit: (id: string) => `/modules/${id}/edit`,
        show: (id: string) => `/modules/${id}`,
    },
    menuItems: {
        index: '/menu-items',
        create: '/menu-items/create',
        edit: (id: string) => `/menu-items/${id}/edit`,
        show: (id: string) => `/menu-items/${id}`,
    },
    users: {
        index: '/users',
        administrator: {
            index: '/users/admin',
            create: '/users/admin/create',
            edit: (id: string) => `/users/admin/${id}/edit`,
            show: (id: string) => `/users/admin/${id}`,
        },
        naturalPerson: {
            index: '/users/natural-persons',
            create: '/users/natural-persons/create',
            edit: (id: string) => `/users/natural-persons/${id}/edit`,
            show: (id: string) => `/users/natural-persons/${id}`,
        },
        legalPerson: {
            index: '/users/legal-person',
            create: '/users/legal-person/create',
            edit: (id: string) => `/users/legal-person/${id}/edit`,
            show: (id: string) => `/users/legal-person/${id}`,
        },
    },
}

/**
 * API routes
 */

const apiRoutes = {
    users: {
        admin: {
            index: '/users/admin',
            all: '/users/admin/all',
            create: '/users/admin',
            edit: (id: string) => `/users/admin/${id}/edit`,
            show: (id: string) => `/users/admin/${id}`,
            existsByCpf: (cpf: string) => `/users/admin/exists/cpf/${cpf}`,
            existsByEmail: (email: string) => `/users/admin/exists/email/${email}`,
        },
        naturalPerson: {
            index: '/users/natural-persons',
            all: '/users/natural-persons/all',
            create: '/users/natural-persons',
            edit: (id: string) => `/users/natural-persons/${id}/edit`,
            show: (id: string) => `/users/natural-persons/${id}`,
        },
    },
    modules: {
        index: '/modules',
        all: '/modules/all',
        create: '/modules',
        edit: (id: string) => `/modules/${id}/edit`,
        show: (id: string) => `/modules/${id}`,
        updateMenuItems: (id: string) => `/modules/${id}/update-menu-items-order`,
        addMenuItem: (id: string, menuItemId: string) => `/modules/${id}/add-menu-item/${menuItemId}`,
        revisions: (id: string) => `/modules/${id}/revisions`,
    },
    menuItems: {
        index: '/menu-items',
        all: '/menu-items/all',
        create: '/menu-items',
        edit: (id: string) => `/menu-items/${id}/edit`,
        show: (id: string) => `/menu-items/${id}`,
    },
}

export { routes, apiRoutes }
