"use client"

import React from "react"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { SWRConfig } from "swr"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnMount: true,
      }}>
      <SidebarProvider>{children}</SidebarProvider>
    </SWRConfig>
  )
}
