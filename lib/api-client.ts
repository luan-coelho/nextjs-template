import { ApiError } from "@/types"

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

class ApiClient {
  async fetcher(endpoint: string, options?: RequestInit): Promise<Response> {
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
    return await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })
  }

  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    console.log(options?.body)
    const res = await this.fetcher(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    let errorBody: ApiError | undefined

    if (!res.ok) {
      try {
        errorBody = await res.json()
      } catch {
        errorBody = {
          title: "Erro desconhecido",
          detail: res.statusText,
          status: res.status,
        }
      }

      throw errorBody
    }

    return res.json()
  }

  async buildResponseError(res: Response): Promise<ApiError> {
    const errorBody: ApiError = {
      title: "Erro desconhecido",
      detail: res.statusText,
      status: res.status,
    }
    try {
      const json = await res.json()
      console.log(res)
      console.log(json)
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
