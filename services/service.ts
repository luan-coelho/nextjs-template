import { DataPagination, Pageable } from "@/types"

import apiClient from "@/lib/api-client"

export abstract class Service<T> {
  abstract getUrl(): string

  async fetchAllWithPagination({ page, size, sort, filters }: Pageable): Promise<DataPagination<T>> {
    return apiClient.get<DataPagination<T>>(
      `${this.getUrl()}?page=${page}&size=${size}&sort=${sort}&filters=${filters}`,
    )
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
