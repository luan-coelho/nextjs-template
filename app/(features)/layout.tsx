"use client"

import "@/styles/globals.css"

import React, { ReactNode, Suspense } from "react"
import { Public_Sans as FontSans } from "next/font/google"
import { Ban, CircleCheckBig, CircleEllipsis, Info, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import Content from "@/components/layout/content"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import Providers from "@/app/providers"

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex min-h-screen bg-gray-100 font-sans antialiased", fontSans.variable)}>
        <Providers>
          <Sidebar />

          <div className="flex w-full flex-col">
            <Header />
            <Suspense>
              <Content>{children}</Content>
            </Suspense>
            <Toaster
              toastOptions={{
                duration: 5000,
                classNames: {
                  error: "bg-red-500 text-white border border-red-500",
                  success: "bg-green-500 text-white border border-green-500",
                  warning: "bg-yellow-400 text-black border border-yellow-400",
                  info: "bg-blue-500 text-white border border-blue-500",
                },
              }}
              icons={{
                success: <CircleCheckBig />,
                info: <Info />,
                warning: <TriangleAlert />,
                error: <Ban />,
                loading: <CircleEllipsis />,
              }}
              position="top-right"
              theme="dark"
            />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
