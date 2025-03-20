import { ApiError } from '@/types'

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

class ApiClient {
    async fetcher(endpoint: string, options?: RequestInit): Promise<Response> {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
        return fetch(url, options)
    }

    async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const headers: Headers = new Headers(options?.headers)
        const body = options?.body

        const isPlainObject =
            typeof body === 'object' &&
            body !== null &&
            !(body instanceof FormData) &&
            !(body instanceof Blob) &&
            !(body instanceof ArrayBuffer) &&
            !(body instanceof URLSearchParams) &&
            !(body instanceof File) &&
            !(body instanceof ReadableStream) &&
            !(body instanceof Array) &&
            !(body instanceof Set) &&
            !(body instanceof Map) &&
            !(body instanceof Promise) &&
            !(body instanceof RegExp) &&
            !(body instanceof Date) &&
            !(body instanceof Error) &&
            !(body instanceof Promise) &&
            !(body instanceof Map) &&
            !(body instanceof WeakMap) &&
            !(body instanceof WeakSet) &&
            !(body instanceof Symbol) &&
            !(body instanceof BigInt) &&
            body.constructor === Object

        if (isPlainObject) {
            options = {
                ...options,
                body: JSON.stringify(body),
            }

            if (!headers.has('Content-Type')) {
                headers.set('Content-Type', 'application/json')
            }
        } else if (body instanceof FormData) {
            headers.delete('Content-Type')
        }

        const res: Response = await this.fetcher(endpoint, {
            ...options,
            headers,
        })

        let errorBody: ApiError | undefined

        if (!res.ok) {
            errorBody = await this.buildResponseError(res)
            throw errorBody
        }

        return res.json()
    }

    async buildResponseError(res: Response): Promise<ApiError> {
        const errorBody: ApiError = new ApiError({
            title: 'Erro desconhecido',
            detail: res.statusText,
            status: res.status,
        })
        try {
            const json = await res.json()
            return json as ApiError
        } catch {
            return errorBody
        }
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.fetch<T>(endpoint, { method: RequestMethod.GET, ...options })
    }

    async delete(endpoint: string, options?: RequestInit): Promise<void> {
        await this.fetch(endpoint, { method: RequestMethod.DELETE, ...options })
    }

    async post<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
        return this.fetch(endpoint, { method: RequestMethod.POST, body, ...options })
    }

    async put<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
        return this.fetch(endpoint, { method: RequestMethod.PUT, body, ...options })
    }

    async patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
        return this.fetch(endpoint, { method: RequestMethod.PATCH, body, ...options })
    }
}

const apiClient = new ApiClient()
export default apiClient
