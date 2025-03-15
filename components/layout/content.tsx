import * as React from 'react'
import { ReactNode } from 'react'
import { useSidebarContext } from '@/contexts/sidebar-context'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function Content({ children }: { children: ReactNode }) {
    const { isSidebarExpanded } = useSidebarContext()

    return (
        <div
            id="main"
            className={`${isSidebarExpanded ? 'md:pl-64' : 'md:pl-[72px]'} min-h-screen w-full flex-col transition-all duration-300`}>
            <Header />
            <main className="flex-1 p-5 py-[40px] md:p-10">{children}</main>
            <Footer />
        </div>
    )
}
