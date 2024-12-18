import { InvalidateQueryFilters, QueryKey, useQueryClient } from "@tanstack/react-query"

export function useInvalidateQuery() {
  const queryClient = useQueryClient()

  /**
   * Função para invalidar queries
   * @param queryKey - Chave da query ou escopo
   * @param options - Opções adicionais para personalizar a invalidação
   */
  async function invalidateQuery(queryKey: QueryKey, options?: InvalidateQueryFilters) {
    await queryClient.invalidateQueries({ queryKey, ...options })
  }

  return { invalidateQuery }
}
