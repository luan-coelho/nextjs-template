import { ApiError } from "@/types"

export const fetcher = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  })

  let errorBody: ApiError | undefined

  if (!res.ok) {
    try {
      // Tenta parsear o corpo do erro
      errorBody = await res.json()
    } catch {
      // Fallback para um erro genérico caso o parse falhe
      errorBody = {
        title: "Erro desconhecido",
        detail: res.statusText,
        status: res.status,
      }
    }

    // Lança o erro com a tipagem ApiError
    throw errorBody
  }

  return res.json()
}

export const fetcherWithoutResponse = async (endpoint: string, options?: RequestInit): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
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
}

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

class ApiClient {
  /**
   * Requisição para métodos sem body (GET, DELETE).
   */
  private async requestWithoutBody<T>(method: RequestMethod, endpoint: string, headers?: HeadersInit): Promise<T> {
    return fetcher<T>(endpoint, {
      method,
      headers,
    })
  }

  private async requestWithoutResponse(method: RequestMethod, endpoint: string, headers?: HeadersInit): Promise<void> {
    return fetcherWithoutResponse(endpoint, {
      method,
      headers,
    })
  }

  /**
   * Requisição para métodos com body (POST, PUT, PATCH).
   */
  private async requestWithBody<T>(
    method: RequestMethod,
    endpoint: string,
    body: any,
    headers?: HeadersInit,
  ): Promise<T> {
    return fetcher<T>(endpoint, {
      method,
      body: JSON.stringify(body),
      headers,
    })
  }

  // Métodos públicos para uso direto
  get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.requestWithoutBody<T>(RequestMethod.GET, endpoint, headers)
  }

  async delete(endpoint: string, headers?: HeadersInit): Promise<void> {
    await this.requestWithoutResponse(RequestMethod.DELETE, endpoint, headers)
  }

  post<T>(endpoint: string, body: any, headers?: HeadersInit): Promise<T> {
    return this.requestWithBody<T>(RequestMethod.POST, endpoint, body, headers)
  }

  put<T>(endpoint: string, body?: any, headers?: HeadersInit): Promise<T> {
    if (typeof body === "undefined") {
      return this.requestWithoutBody(RequestMethod.PUT, endpoint, headers)
    }
    return this.requestWithBody<T>(RequestMethod.PUT, endpoint, body, headers)
  }

  patch<T>(endpoint: string, body?: any, headers?: HeadersInit): Promise<T> {
    if (typeof body === "undefined") {
      return this.requestWithoutBody(RequestMethod.PATCH, endpoint, headers)
    }
    return this.requestWithBody<T>(RequestMethod.PATCH, endpoint, body, headers)
  }
}

const apiClient = new ApiClient()
export default apiClient
