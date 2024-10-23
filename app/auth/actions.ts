"use server"

import { signIn, signOut } from "@/auth"

export async function login() {
  await signIn("google", { redirectTo: "/dashboard" })
}

export async function logout() {
  await signOut({ redirectTo: "/auth/login" })
}
