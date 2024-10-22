import * as React from "react"
import { auth } from "@/auth"

export async function AuthenticatedUser() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
