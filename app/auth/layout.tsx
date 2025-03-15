'use client'

import '@/styles/globals.css'

import { ReactNode } from 'react'
import NextTopLoader from 'nextjs-toploader'

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
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
    )
}
