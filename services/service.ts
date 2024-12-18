import { DataPagination, Pageable } from "@/types"

import apiClient from "@/lib/api-client"

export abstract class Service<T> {
  abstract getUrl(): string

  /**
   * Busca todos os registros com paginação
   * @param page Página
   * @param size Tamanho de registros por página
   * @param sort Ordenação no formato campo:asc|desc
   * @param filters Filtros no formato campo;operador;valor
   */
  async fetchAllWithPagination({ page, size, sort, filters }: Pageable): Promise<DataPagination<T>> {
    return apiClient.get<DataPagination<T>>(
      `${this.getUrl()}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`,
    )
  }

  /**
   * Busca todos os registros sem paginação
   */
  async fetchAll(): Promise<T[]> {
    return apiClient.get<T[]>(`${this.getUrl()}/all`)
  }

  async fetchById(id: string): Promise<T> {
    return apiClient.get<T>(`${this.getUrl()}/${id}`)
  }

  async create(data: Partial<T>): Promise<T> {
    return apiClient.post<T>(this.getUrl(), data)
  }

  async updateById(id: string, data: Partial<T>): Promise<T> {
    return apiClient.put<T>(`${this.getUrl()}/${id}`, data)
  }

  async deleteById(id: string): Promise<void> {
    return apiClient.delete(`${this.getUrl()}/${id}`)
  }

  async activateById(id: string): Promise<void> {
    return apiClient.patch(`${this.getUrl()}/${id}/activate`)
  }

  async disableById(id: string): Promise<void> {
    return apiClient.patch(`${this.getUrl()}/${id}/disable`)
  }
}
