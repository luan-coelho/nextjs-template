"use client"

import React from "react"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { getQueryClient } from "@/get-query-client"
import { QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  )
}
