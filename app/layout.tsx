"use client"

import "@/styles/globals.css"

import { ReactNode } from "react"
import { Public_Sans as FontSans } from "next/font/google"
import { SidebarProvider } from "@/contexts/sidebar-context"

import { cn } from "@/lib/utils"
import Content from "@/components/layout/content"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex min-h-screen flex-row bg-gray-100 font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <Sidebar />

            <div className="ml-[260px] flex w-full flex-col">
              <Header />
              <Content>{children}</Content>
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
