export class ApiError extends Error {
  type?: string
  title: string | undefined
  status: number | undefined
  detail: string | undefined
  instance?: string
  errors?: Record<string, string[]>

  constructor(error: Partial<ApiError>) {
    super()
    Object.assign(this, error)
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  applyErrorsToForm<T>(setError: (name: keyof T, error: { type: string; message: string }) => void) {
    if (this.errors) {
      Object.entries(this.errors).forEach(([field, messages]) => {
        setError(field as keyof T, {
          type: "manual",
          message: messages.join(" "),
        })
      })
    }
  }
}
