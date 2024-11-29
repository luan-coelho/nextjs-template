"use server"

import { cookies } from "next/headers"

export async function changeCurrentModuleCookie(module: Module) {
  const cookieStore = cookies()
  cookieStore.set("CURRENT_MODULE", module.id)
}

export async function getCurrentModuleCookieId() {
  const cookieStore = cookies()
  return cookieStore.get("CURRENT_MODULE")
}
