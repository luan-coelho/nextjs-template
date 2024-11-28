export const fetcher = async <T>(endpoint: string): Promise<T> => {
  // const session = await getSession()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    /* headers: {
       Authorization: `Bearer ${session?.accessToken}`,
     },*/
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.statusText}`)
  }

  return res.json()
}
