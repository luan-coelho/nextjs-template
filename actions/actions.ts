"use server"

import { cookies } from "next/headers"

import { Module } from "@/types/entities"

export async function changeCurrentModuleCookie(module: Module) {
  const cookieStore = await cookies()
  cookieStore.set("CURRENT_MODULE", module.id)
}

export async function getCurrentModuleCookieId() {
  const cookieStore = await cookies()
  return cookieStore.get("CURRENT_MODULE")
}
