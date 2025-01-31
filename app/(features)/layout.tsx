"use client"

import "@/styles/globals.css"

import React, { ReactNode } from "react"
import { Ban, CircleCheckBig, CircleEllipsis, Info, TriangleAlert } from "lucide-react"

import { Toaster } from "@/components/ui/sonner"
import Content from "@/components/layout/content"
import Sidebar from "@/components/layout/sidebar"
import Providers from "@/app/providers"

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <Sidebar />
      <Content>{children}</Content>
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
    </Providers>
  )
}
