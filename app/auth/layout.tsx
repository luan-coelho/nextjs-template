"use client"

import "@/styles/globals.css"

import { ReactNode } from "react"
import { Public_Sans as FontSans } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex min-h-screen bg-white font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
