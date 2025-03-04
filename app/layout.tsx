import type { Metadata } from "next"

import "@/styles/globals.css"

import React from "react"
import { Roboto as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Template Next.js",
  description: "Template Next.js com Tailwind CSS",
}

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex min-h-screen bg-gray-100 font-sans antialiased", fontSans.variable)}>{children}</body>
    </html>
  )
}
