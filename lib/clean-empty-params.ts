import { DEFAULT_PAGEABLE } from '@/types'

export const cleanEmptyParams = <T extends Record<string, unknown>>(search: T) => {
    const newSearch = { ...search }
    Object.keys(newSearch).forEach(key => {
        const value = newSearch[key]
        if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) delete newSearch[key]
    })

    if (search.pageIndex === DEFAULT_PAGEABLE.page) delete newSearch.pageIndex
    if (search.pageSize === DEFAULT_PAGEABLE.size) delete newSearch.pageSize

    return newSearch
}
