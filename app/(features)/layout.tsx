"use client"

import "@/styles/globals.css"

import React, { ReactNode } from "react"
import { Public_Sans as FontSans } from "next/font/google"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { Ban, CircleCheckBig, CircleEllipsis, Info, TriangleAlert } from "lucide-react"
import NextTopLoader from "nextjs-toploader"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import Content from "@/components/layout/content"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex min-h-screen bg-gray-100 font-sans antialiased", fontSans.variable)}>
        <SidebarProvider>
          <Sidebar />

          <div className="flex w-full flex-col">
            <NextTopLoader
              color="#1677FF"
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
            />
            <Header />
            <Content>{children}</Content>
            <Toaster
              toastOptions={{
                classNames: {
                  error: "bg-red-400",
                  success: "text-green-400",
                  warning: "text-yellow-400",
                  info: "bg-blue-400",
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
        </SidebarProvider>
      </body>
    </html>
  )
}
