"use server"

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export async function changeCurrentModuleCookie(module: Module) {
  const cookieStore = cookies()
  cookieStore.set("CURRENT_MODULE", module.id, {
    httpOnly: true,
  })
}

/*
export async function getCurrentModuleCookieId(): Promise<RequestCookie | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get("CURRENT_MODULE")
}
*/
