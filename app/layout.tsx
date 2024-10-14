import "@/styles/globals.css"

import { ReactNode } from "react"
import { Public_Sans as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import Content from "@/components/layout/content"
import Drawer from "@/components/layout/drawer"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
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
          <Drawer />

          <div className="ml-[260px] flex w-full flex-col">
            <Header />
            <Content>{children}</Content>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
