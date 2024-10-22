"use server"

import { redirect } from "next/navigation"
import { signIn, signOut } from "@/auth"

export async function login() {
  await signIn()
  redirect("/dashboard")
}

export async function logout() {
  redirect("/auth/signin")
  await signOut()
}
